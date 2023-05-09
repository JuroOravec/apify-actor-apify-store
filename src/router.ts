import type { PlaywrightCrawlingContext } from 'crawlee';
import {
  PushDataOptions,
  RouteHandler,
  createPlaywrightRouteMatchers,
  pushData,
} from 'apify-actor-utils';

import { RouteLabel, ApifyActorStoreItem } from './types';
import type { ActorInput } from './config';
import { storePageActions, storePageMethods } from './pageActions/store';
import { CATEGORIES } from './constants';

export const routes = createPlaywrightRouteMatchers<PlaywrightCrawlingContext, RouteLabel>([
  {
    name: 'LISTING',
    handlerLabel: 'LISTING',
    // Eg https://apify.com/store
    match: (url) => url.includes('apify.com'),
  },
]);

export const createHandlers = <Ctx extends PlaywrightCrawlingContext>(
  input: ActorInput
): Record<RouteLabel, RouteHandler<Ctx>> => {
  const {
    listingFilterQuery,
    listingFilterCategory,
    listingFilterMaxCount,
    includePersonalData,
    outputPickFields,
    outputDatasetIdOrName,
    outputRenameFields,
  } = input;

  const pushDataOptions = {
    includeMetadata: true,
    showPrivate: includePersonalData,
    pickKeys: outputPickFields,
    datasetIdOrName: outputDatasetIdOrName,
    remapKeys: outputRenameFields,
  } satisfies Omit<PushDataOptions<any>, 'privacyMask'>;

  return {
    LISTING: async (ctx) => {
      const { page, log } = ctx;

      const categLocators = await storePageActions.getCategories({
        page,
        categoriesByText: listingFilterCategory ? [listingFilterCategory] : undefined,
        log,
      });

      // 1) The request that fetches ALL items on the store page doesn't
      // include info on actor CATEGORIES.
      // 2) When we visit a category, a network request is made to fetch items
      // belonging ONLY to that category.
      // 3) HENCE, to deal with 1), we visit all categories, fetch items from the categories,
      // and then assign the categories to the items based on which datasets
      // we found the items in.
      const allItemsById: Record<string, ApifyActorStoreItem> = {};

      const processItem = (item: ApifyActorStoreItem, category: string) => {
        // Add category to the already-seen item
        if (allItemsById[item.objectID]) {
          allItemsById[item.objectID].categories!.push(category);
          return;
        } else {
          // Remember the item
          allItemsById[item.objectID] = item;
          item.categories = [category];
        }
      };
      let isDoneProcessing = false;

      // With given approach (intercepting requests) there can be a race condition between:
      // 1) The time we start "waiting for response" from the intercepted network request
      // 2) When the response actually arrives.
      //
      // In other words, if response comes back BEFORE we start waiting for response, we get stuck.
      //
      // HENCE, we use this state to know which network requests (for which categories)
      // have already been intercepted.
      const { waitForCategoryIntercepted, setCategoryAsIntercepted } = storePageMethods.categoryInterceptState({ log }); // prettier-ignore

      // And hence, we set up a network request interception, and when we come across
      // a request made for specific category, we fetch all it's items.
      const disposeIntercept = await storePageActions.setupCategoriesIntercept({
        page,
        log,

        // If, whilst navigating the store page:
        // 1) We find a network request that fetches store items for a specific category
        // AND 2) We've not scraped that category YET
        // THEN, fetch all items of that category.
        onDetectedCategory: async ({ url, payload, headers }) => {
          const category = payload.filters?.split(':')[1];

          // Remember that we've visited this category
          setCategoryAsIntercepted(category!);

          await storePageActions.fetchStoreItems({
            fetchOptions: { url, headers },
            // Insert our custom query from actor input
            payload: listingFilterQuery ? { ...payload, query: listingFilterQuery } : payload,
            log,
            onData: async (data) => {
              data.hits?.forEach((d) => processItem(d, category!));

              // Check if we should continue or quit
              const didReachMaxCount =
                typeof listingFilterMaxCount === 'number' &&
                Object.values(allItemsById).length >= listingFilterMaxCount;

              // If we do not continue, stop interception, and set all categories as done
              if (didReachMaxCount) {
                await disposeIntercept();
                CATEGORIES.forEach((c) => setCategoryAsIntercepted(c.filter));
                isDoneProcessing = true;
              }
            },
          });
        },
      });

      let cookieConsentClicked = false;
      const cookieConsentBtnLoc = page.locator('#onetrust-accept-btn-handler');

      // To trigger the network requests to fetch items by categories,
      // we manually visit individual categories.
      for (const categLocator of categLocators) {
        // Cookie content overlay may stand in our way
        log.info('Checking presence of cookie consent window');
        if (!cookieConsentClicked && (await cookieConsentBtnLoc.count())) {
          log.info('Clicking away cookie consent window');
          await cookieConsentBtnLoc.click({ timeout: 5000 });
          log.info('Clicking away cookie consent window DONE');
          cookieConsentClicked = true;
        } else {
          log.info('Cookie consent window not found');
        }

        const categText = (await categLocator.textContent())?.trim();

        // Click on a category button and wait till it loads
        log.info(`Clicking on category "${categText}"`);
        await categLocator.click();

        // Wait for the network request we want to intercept
        log.info(`Waiting for response for category "${categText}"`);
        await Promise.race([
          // Either wait for network response
          page.waitForResponse((res) => storePageActions.urlIsItemsQuery(res.url())),
          // Or, if the network response has already arrived while we were setting this up,
          // then also regularly check if we've already visited this category
          waitForCategoryIntercepted({ text: categText! }),
        ]);
        log.info(`DONE Waiting for response for category "${categText}"`);

        // Exit early if we've hit our max entries count
        if (isDoneProcessing) break;

        await new Promise((res) => setTimeout(res, 500));
      }

      await pushData(Object.values(allItemsById), ctx, {
        ...pushDataOptions,
        privacyMask: {},
      });

      // Cleanup
      await disposeIntercept();
    },
  };
};

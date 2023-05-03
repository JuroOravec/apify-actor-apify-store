import { Actor } from 'apify';
import {
  PlaywrightCrawler,
  PlaywrightCrawlerOptions,
  PlaywrightCrawlingContext,
  createPlaywrightRouter,
} from 'crawlee';
import {
  createApifyActor,
  createErrorHandler,
  createHttpCrawlerOptions,
  logLevelHandlerWrapper,
  setupSentry,
} from 'apify-actor-utils';

import type { ActorInput } from './config';
import type { RouteLabel } from './types';
import { createHandlers, routes } from './router';
import { validateInput } from './validation';
import { getPackageJsonInfo } from './utils/package';

/** Crawler options that **may** be overriden by user input */
const defaultCrawlerOptions: PlaywrightCrawlerOptions = {
  maxRequestsPerMinute: 120,
  requestHandlerTimeoutSecs: 60 * 3,
  headless: true,
  // maxRequestsPerCrawl: 20,

  // SHOULD I USE THESE?
  // See https://docs.apify.com/academy/expert-scraping-with-apify/solutions/rotating-proxies
  // useSessionPool: true,
  // sessionPoolOptions: {},
};

export const run = async (crawlerConfig?: PlaywrightCrawlerOptions): Promise<void> => {
  const pkgJson = getPackageJsonInfo(module, ['name']);
  setupSentry({ sentryOptions: { serverName: pkgJson.name } });

  // See docs:
  // - https://docs.apify.com/sdk/js/
  // - https://docs.apify.com/academy/deploying-your-code/inputs-outputs#accepting-input-with-the-apify-sdk
  // - https://docs.apify.com/sdk/js/docs/upgrading/upgrading-to-v3#apify-sdk
  await Actor.main(
    async () => {
      const actor = await createApifyActor<PlaywrightCrawlingContext, RouteLabel, ActorInput>({
        validateInput,
        router: createPlaywrightRouter(),
        routes,
        routeHandlers: ({ input }) => createHandlers(input!),
        handlerWrappers: ({ input }) => [
          logLevelHandlerWrapper<PlaywrightCrawlingContext<any>>(input?.logLevel ?? 'info'),
        ],
        createCrawler: ({ router, proxy, input }) => {
          const options = createHttpCrawlerOptions<PlaywrightCrawlerOptions, ActorInput>({
            input,
            defaults: defaultCrawlerOptions,
            overrides: {
              requestHandler: router,
              proxyConfiguration: proxy,
              // Capture errors as a separate Apify/Actor dataset and pass errors to Sentry
              failedRequestHandler: createErrorHandler({
                reportingDatasetId: 'REPORTING',
                sendToSentry: true,
              }),
              ...crawlerConfig,
            },
          });
          return new PlaywrightCrawler(options);
        },
      });

      await actor.crawler.run(actor.input?.startUrls);
    },
    { statusMessage: 'Crawling finished!' }
  );
};

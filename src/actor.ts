import { PlaywrightCrawlerOptions } from 'crawlee';
import { createAndRunApifyActor } from 'apify-actor-utils';

import { createHandlers, routes } from './router';
import { validateInput } from './validation';
import { getPackageJsonInfo } from './utils/package';

/** Crawler options that **may** be overriden by user input */
const crawlerConfigDefaults: PlaywrightCrawlerOptions = {
  maxRequestsPerMinute: 120,
  requestHandlerTimeoutSecs: 60 * 3,
  headless: true,
  // maxRequestsPerCrawl: 20,

  // SHOULD I USE THESE?
  // See https://docs.apify.com/academy/expert-scraping-with-apify/solutions/rotating-proxies
  // useSessionPool: true,
  // sessionPoolOptions: {},
};

export const run = async (crawlerConfigOverrides?: PlaywrightCrawlerOptions): Promise<void> => {
  const pkgJson = getPackageJsonInfo(module, ['name']);

  await createAndRunApifyActor({
    actorType: 'playwright',
    actorName: pkgJson.name,
    actorConfig: {
      validateInput,
      routes,
      routeHandlers: ({ input }) => createHandlers(input!),
    },
    crawlerConfigDefaults,
    crawlerConfigOverrides,
    onActorReady: async (actor) => {
      await actor.runActor(actor.input?.startUrls);
    },
  });
};

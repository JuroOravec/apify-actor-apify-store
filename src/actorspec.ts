import type { DatasetFeatures } from 'actor-spec';
import type { ApifyScraperActorSpec } from 'apify-actor-utils';

const filters = ['search query', 'category'];

const datasetFeatures = {
  limitResultsCount: true,
  usesBrowser: true,
  proxySupport: true,
  configurable: true,
  regularlyTested: true,
  privacyCompliance: true,
  errorMonitoring: true,
  changeMonitoring: false,
  downstreamAutomation: true,
} satisfies DatasetFeatures;

const actorId = 'apify-store-scraper';
const authorId = 'jurooravec';

const actorSpec = {
  actorspecVersion: 1,
  actor: {
    title: 'Apify Store Scraper',
    publicUrl: `https://apify.com/${authorId}/${actorId}`,
    shortDesc:
      'Extract all Actors from the Apify Store. Includes cost, trial minutes, number of users, number of builds, version, author, and more',
    datasetOverviewImgUrl: './public/imgs/apify-store-actor-dataset-overview.png',
  },
  platform: {
    name: 'apify',
    url: 'https://apify.com',
    authorId,
    authorProfileUrl: `https://apify.com/${authorId}`,
    actorId,
    socials: {
      discord: 'https://discord.com/channels/801163717915574323',
    },
  },
  authors: [
    {
      name: 'Juro Oravec',
      email: 'juraj.oravec.josefson@gmail.com',
      authorUrl: 'https://jurora.vc',
    },
  ],
  websites: [
    {
      name: 'Apify Store',
      url: 'https://apify.com/store',
    },
  ],
  pricing: {
    pricingType: 'monthly fee',
    value: 0,
    currency: 'eur',
    period: 1,
    periodUnit: 'month',
  },
  datasets: [
    {
      name: 'actors',
      shortDesc: 'All actors in Apify store',
      url: 'https://apify.com/store',
      size: 1140,
      isDefault: true,
      filters,
      filterCompleteness: 'full',
      modes: [],
      features: datasetFeatures,
      faultTolerance: {
        dataLossScope: 'batch',
        timeLostAvgSec: 2,
        timeLostMaxSec: 20,
      },
      perfTable: 'default',
      // prettier-ignore
      perfStats: [
        { rowId: 'default', colId: 'fullRun', mode: null, count: 1140, costUsd: 0.032, timeSec: 57 },
      ],
      privacy: {
        personalDataFields: [],
        isPersonalDataRedacted: true,
        personalDataSubjects: [],
      },
      output: {
        exampleEntry: {
          title: 'Apify Store Scraper',
          name: 'apify-store-scraper',
          username: 'jurooravec',
          stats: {
            totalBuilds: 20,
            totalRuns: 51,
            totalUsers: 6,
            totalUsers7Days: 3,
            totalUsers30Days: 6,
            totalUsers90Days: 6,
            lastRunStartedAt: '2023-05-03T05:13:02.783Z',
          },
          description:
            'Extract all Actors from the Apify Store. Includes cost, trial minutes, number of users, number of builds, version, author, and more. Optionally filter by category or search term. Download as JSON, JSONL, XML, CSV, Excel, or HTML formats.',
          pictureUrl:
            'https://apify-image-uploads-prod.s3.amazonaws.com/zilMadT09bsBek1EW/5rR2RB2CgRswk3fHt-24586296.png',
          notice: 'NONE',
          userPictureUrl:
            'https://images.apifyusercontent.com/z1BN8NTIk-JX7H5vxqGVeXjFxwKTNTeLeX85-u5SwjU/rs:fill:32:32/aHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzI1OTg2Nzgy',
          userFullName: 'Juro Oravec',
          currentPricingInfo: {
            pricingModel: 'FLAT_PRICE_PER_MONTH',
            pricePerUnitUsd: 25,
            trialMinutes: 1440,
            createdAt: '2022-08-08T03:09:01.327Z',
            startedAt: '2022-08-08T03:09:01.327Z',
            apifyMarginPercentage: 0,
          },
          objectID: 'zilMadT09bsBek1EW',
          categories: ['AUTOMATION', 'BUSINESS', 'DEVELOPER_TOOLS'],
        },
        exampleEntryComments: {
          currentPricingInfo: 'This field is `null` if the actor is not monetized',
        },
      },
    },
  ],
} satisfies ApifyScraperActorSpec;

export default actorSpec;

import { ApifyReadmeTemplatesOverrides, renderReadme } from 'apify-actor-utils';

import actorSpec from './actorspec';

const templates = {
  input: {
    maxCount: 'listingFilterMaxCount',
    privacyName: 'Include personal data',
  },

  perfTables: {
    // Table for small datasets where multiple cols don't make sense
    default: {
      rows: [{ rowId: 'default', template: 'Run' }],
      cols: [
        { colId: 'fullRun', template: 'Full run (~ <%~ it.fn.millify(it.dataset.size) %> results)' }, // prettier-ignore
      ],
    },
  },

  exampleInputs: [
    {
      title: `Get all actors from Apify Store`,
      inputData: {
        startUrls: ['https://apify.com/store'],
      },
    },
    {
      title: `Get E-commerce "Facebook" actors`,
      inputData: {
        startUrls: ['https://apify.com/store'],
        query: 'facebook',
        category: 'E-COMMERCE',
      },
      inputDataComments: {
        category: 'See details on inputs for available categories',
      },
    },
  ],

  hooks: {
    useCases: `
- Analyze the Apify Actor ecosystem and identify popular actors
- Monitor newly released actors and updates
- Discover new actors for your web scraping needs
- Conduct market research on web scraping and automation tools`,
  },
} satisfies ApifyReadmeTemplatesOverrides;

renderReadme({ filepath: './.actor/README.md', actorSpec, templates });

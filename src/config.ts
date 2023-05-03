import { capitalize } from 'lodash';
import {
  createActorConfig,
  createActorInputSchema,
  createStringField,
  createArrayField,
  Field,
  ActorInputSchema,
  createActorOutputSchema,
} from 'apify-actor-config';
import {
  CrawlerConfigActorInput,
  LoggingActorInput,
  PrivacyActorInput,
  ProxyActorInput,
  crawlerInput,
  loggingInput,
  privacyInput,
  proxyInput,
} from 'apify-actor-utils';

import { CATEGORIES } from './constants';
import { Category } from './types';
import actorSpec from './actorspec';

export interface CustomActorInput {
  /** URLs to start with */
  startUrls?: string[];
  /** If given, only actors matching the query will be retrieved */
  query?: string;
  /** If given, only actors from this category will be retried */
  category?: Category;
}

/** Shape of the data passed to the actor from Apify */
export interface ActorInput
  // Include the common fields in input
  extends CrawlerConfigActorInput,
    LoggingActorInput,
    ProxyActorInput,
    PrivacyActorInput,
    CustomActorInput {}

const customActorInput: Record<keyof CustomActorInput, Field> = {
  startUrls: createArrayField({
    title: 'Start URLs',
    type: 'array',
    description: `Select specific URLs to scrape.`,
    example: [{ url: 'https://apify.com/store' }],
    prefill: [{ url: 'https://apify.com/store' }],
    default: [{ url: 'https://apify.com/store' }],
    editor: 'requestListSources',
  }),
  query: createStringField({
    type: 'string',
    title: 'Search query',
    description: 'If given, only actors matching the query will be retrieved',
    example: 'facebook',
    editor: 'textfield',
  }),
  category: createStringField<Category>({
    type: 'string',
    title: 'Actor category',
    description: 'If given, only actors from this category will be retried',
    example: 'facebook',
    editor: 'select',
    enum: CATEGORIES.map((c) => c.text),
    enumTitles: CATEGORIES.map((c) => capitalize(c.text)),
    nullable: true,
  }),
};

// Customize the default options
crawlerInput.requestHandlerTimeoutSecs.prefill = 60 * 3;

const inputSchema = createActorInputSchema<ActorInputSchema<Record<keyof ActorInput, Field>>>({
  schemaVersion: 1,
  title: actorSpec.actor.title,
  description: `Configure the ${actorSpec.actor.title}.`,
  type: 'object',
  properties: {
    ...customActorInput,
    // Include the common fields in input
    ...proxyInput,
    ...privacyInput,
    ...crawlerInput,
    ...loggingInput,
  },
  required: ['startUrls'],
});

const outputSchema = createActorOutputSchema({
  actorSpecification: 1,
  fields: {},
  views: {
    overview: {
      title: 'Overview',
      transformation: {
        fields: [
          'pictureUrl',
          'title',
          'name',
          'description',
          'categories',
          'notice',

          'userPictureUrl',
          'username',
          'userFullName',

          'stats.totalBuilds',
          'stats.totalRuns',
          'stats.totalUsers',
          'stats.totalUsers7Days',
          'stats.totalUsers30Days',
          'stats.totalUsers90Days',
          'stats.lastRunStartedAt',

          'currentPricingInfo.pricingModel',
          'currentPricingInfo.pricePerUnitUsd',
          'currentPricingInfo.apifyMarginPercentage',
          'currentPricingInfo.createdAt',
          'currentPricingInfo.startedAt',
          'currentPricingInfo.trialMinutes',
        ],
        flatten: ['stats', 'currentPricingInfo'],
      },
      display: {
        component: 'table',
        properties: {
          pictureUrl: {
            label: 'Picture',
            format: 'image',
          },
          userPictureUrl: {
            label: 'User picture',
            format: 'image',
          },
        },
      },
    },
  },
});

const config = createActorConfig({
  actorSpecification: 1,
  name: actorSpec.platform.actorId,
  title: actorSpec.actor.title,
  description: actorSpec.actor.shortDesc,
  version: '1.0',
  dockerfile: './Dockerfile',
  input: inputSchema,
  storages: {
    dataset: outputSchema,
  },
});

export default config;

import Joi from 'joi';
import {
  crawlerInputValidationFields,
  loggingInputValidationFields,
  outputInputValidationFields,
  privacyInputValidationFields,
  proxyInputValidationFields,
} from 'apify-actor-utils';

import { CATEGORY } from './types';
import type { ActorInput } from './config';

const inputValidationSchema = Joi.object<ActorInput>({
  ...crawlerInputValidationFields,
  ...proxyInputValidationFields,
  ...loggingInputValidationFields,
  ...outputInputValidationFields,
  ...privacyInputValidationFields,

  startUrls: Joi.array().optional(),
  listingFilterCategory: Joi.string().valid(...CATEGORY).optional(), // prettier-ignore
  listingFilterQuery: Joi.string().optional(),
  listingFilterMaxCount: Joi.number().integer().min(1).optional(),
} satisfies Record<keyof ActorInput, Joi.Schema>);

export const validateInput = (input: ActorInput | null) => {
  Joi.assert(input, inputValidationSchema);

  if (!input?.startUrls) {
    throw Error(
      `Missing instruction for scraping - startUrls MUST be specified. INPUT: ${JSON.stringify(
        input
      )}`
    );
  }
};

import Joi from 'joi';
import {
  crawlerInputValidationFields,
  loggingInputValidationFields,
  privacyInputValidationFields,
  proxyInputValidationFields,
} from 'apify-actor-utils';

import { CATEGORY } from './types';
import type { ActorInput } from './config';

const inputValidationSchema = Joi.object<ActorInput>({
  ...crawlerInputValidationFields,
  ...proxyInputValidationFields,
  ...loggingInputValidationFields,
  ...privacyInputValidationFields,

  startUrls: Joi.array().optional(),
  category: Joi.string().valid(...CATEGORY).optional(), // prettier-ignore
  query: Joi.string().optional(),
});

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

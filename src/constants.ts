import { keyBy } from 'lodash';

/**
 * Mapping of categories as show in the web and the filter option for network request
 *
 * We have to keep this here, so we can answer these questions:
 * - When we receive a response for a network request with a certain category filter,
 *   which category button in the UI does it correspond to?
 * - Do we have to wait for a network response after clicking on a button?
 *
 * This is unfortunate as it means we have to keep it up-to-date manually.
 */
export const CATEGORIES = [
  { text: 'ai', filter: 'AI' },
  { text: 'automation', filter: 'AUTOMATION' },
  { text: 'business', filter: 'BUSINESS' },
  { text: 'covid-19', filter: 'COVID_19' },
  { text: 'developer examples', filter: 'DEVELOPER_EXAMPLES' },
  { text: 'developer tools', filter: 'DEVELOPER_TOOLS' },
  { text: 'e-commerce', filter: 'ECOMMERCE' },
  { text: 'games', filter: 'GAMES' },
  { text: 'jobs', filter: 'JOBS' },
  { text: 'marketing', filter: 'MARKETING' },
  { text: 'news', filter: 'NEWS' },
  { text: 'seo tools', filter: 'SEO_TOOLS' },
  { text: 'social media', filter: 'SOCIAL_MEDIA' },
  { text: 'travel', filter: 'TRAVEL' },
  { text: 'videos', filter: 'VIDEOS' },
  { text: 'real estate', filter: 'REAL_ESTATE' },
  { text: 'sports', filter: 'SPORTS' },
  { text: 'education', filter: 'EDUCATION' },
  { text: 'other', filter: 'OTHER' },
];
export const CATEGORIES_BY_TEXT = keyBy(CATEGORIES, (c) => c.text);
export const CATEGORIES_BY_FILTER = keyBy(CATEGORIES, (c) => c.filter);

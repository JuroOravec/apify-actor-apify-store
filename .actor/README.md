
Apify Store Scraper
===============================

Extract all Actors from the Apify Store. Includes cost, trial minutes, number of users, number of builds, version, author, and more

## What is Apify Store Scraper and how it works?



With Apify Store Scraper, you can extract:

- [All actors in Apify store]( https://apify.com/store )


See the [outputs section](#outputs) for a detailed description.

The data can be downloaded in JSON, JSONL, XML, CSV, Excel, or HTML formats.



## Features



This actor is a robust production-grade solution suitable for businesses and those that need reliability.

- **Filter support**
  
  - Filter the results by search query or category.
  - Limit the number of results.


- **Proxy support**
  
  - You can use Apify's proxy, or your own, via Input.

- **Custom crawler configuration**
  
  - For advanced needs, you can pass Crawler configuration via Input.

- **Tested daily for high reliability**
  
  - The actor is regularly tested end-to-end to minimize the risk of a broken integration.

- **Privacy-compliant (GDPR)**
  
  - By default, personal data is redacted to avoid privacy issues. You can opt-in to include un-censored data.

- **Error monitoring**
  
  - Errors from your runs are captured and surfaced in the `REPORTING` dataset. (See Storage > Dataset > Select dropdown).
  - Errors are also automatically reported to [Sentry](https://sentry.io/).





## How can you use the data scraped from Apify Store? (Examples)


- Analyze the Apify Actor ecosystem and identify popular actors
- Monitor newly released actors and updates
- Discover new actors for your web scraping needs
- Conduct market research on web scraping and automation tools

## How to use Apify Store Scraper



1. Create a free Apify account using your email
2. Open Apify Store Scraper
3. In Input, select the dataset to scrape, and filters to apply.
4. Click "Start" and wait for the data to be extracted.
5. Download your data in JSON, JSONL, XML, CSV, Excel, or HTML format.

For details and examples for all input fields, please visit the [Input tab](https://apify.com/jurooravec/apify-store-scraper/input-schema).



## How much does it cost to scrape Apify Store?



### Actors

<table>
  <thead>
    <tr>
      <td></td>
            <td><strong>
        Full run (~ 1.1K results)
      </strong></td>
          </tr>
  </thead>

  <tbody>
        <tr>
      <td>
        Run
      </td>
            <td>
        $0.032 in   57s
      </td>
          </tr>
      </tbody>
</table>


<br/>



Remember that with the [Apify Free plan](https://apify.com/pricing), you have $5 free usage per month.



## Input options



For details and examples for all input fields, please visit the [Input tab](https://apify.com/jurooravec/apify-store-scraper/input-schema).



### Filter options



You can run Apify Store Scraper as is, with the default options, to get a sample of the 
actors entries.

Otherwise, you can filter by:

  - Search query
  - Category



### Limit options



To limit how many results you get, set `listingFilterMaxCount` to desired amount.



### Input examples




#### Example 1: Get all actors from Apify Store

```json
{
  "startUrls": [
    "https://apify.com/store"
  ],
}
```


#### Example 2: Get E-commerce "Facebook" actors

```json
{
  "startUrls": [
    "https://apify.com/store"
  ],
  "query": "facebook",
  // See details on inputs for available categories
  "category": "E-COMMERCE",
}
```





## Outputs



Once the actor is done, you can see the overview of results in the Output tab.

To export the data, head over to the Storage tab.

![Apify Store Scraper dataset overview](./public/imgs/apify-store-actor-dataset-overview.png)



## Sample output from Apify Store Scraper



### Actors output

```json
{
  "title": "Apify Store Scraper",
  "name": "apify-store-scraper",
  "username": "jurooravec",
  "stats": {
    "totalBuilds": 20,
    "totalRuns": 51,
    "totalUsers": 6,
    "totalUsers7Days": 3,
    "totalUsers30Days": 6,
    "totalUsers90Days": 6,
    "lastRunStartedAt": "2023-05-03T05:13:02.783Z"
  },
  "description": "Extract all Actors from the Apify Store. Includes cost, trial minutes, number of users, number of builds, version, author, and more. Optionally filter by category or search term. Download as JSON, JSONL, XML, CSV, Excel, or HTML formats.",
  "pictureUrl": "https://apify-image-uploads-prod.s3.amazonaws.com/zilMadT09bsBek1EW/5rR2RB2CgRswk3fHt-24586296.png",
  "notice": "NONE",
  "userPictureUrl": "https://images.apifyusercontent.com/z1BN8NTIk-JX7H5vxqGVeXjFxwKTNTeLeX85-u5SwjU/rs:fill:32:32/aHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzI1OTg2Nzgy",
  "userFullName": "Juro Oravec",
  // This field is `null` if the actor is not monetized
  "currentPricingInfo": {
    "pricingModel": "FLAT_PRICE_PER_MONTH",
    "pricePerUnitUsd": 25,
    "trialMinutes": 1440,
    "createdAt": "2022-08-08T03:09:01.327Z",
    "startedAt": "2022-08-08T03:09:01.327Z",
    "apifyMarginPercentage": 0
  },
  "objectID": "zilMadT09bsBek1EW",
  "categories": [
    "AUTOMATION",
    "BUSINESS",
    "DEVELOPER_TOOLS"
  ],
}
```




## How to integrate Apify Store Scraper with other services, APIs or Actors



You can connect the actor with many of the
[integrations on the Apify platform](https://apify.com/integrations).
You can integrate with Make, Zapier, Slack, Airbyte, GitHub, Google Sheets, Google Drive,
[and more](https://docs.apify.com/integrations).
Or you can use
[webhooks](https://docs.apify.com/integrations/webhooks)
to carry out an action whenever an event occurs, e.g. get a notification whenever
Instagram API Scraper successfully finishes a run.



## Use Apify Store Scraper with Apify API



The Apify API gives you programmatic access to the Apify platform.
The API is organized around RESTful HTTP endpoints that enable you to manage,
schedule and run Apify actors. The API also lets you access any datasets,
monitor actor performance, fetch results, create and update versions, and more.

To access the API using Node.js, use the `apify-client` NPM package.
To access the API using Python, use the `apify-client` PyPI package.

Check out the [Apify API reference](https://docs.apify.com/api/v2) docs
for full details or click on the
[API tab](https://apify.com/jurooravec/apify-store-scraper/api)
for code examples.



## Is it legal to scrape Apify Store?



It is legal to scrape publicly available data such as product descriptions,
prices, or ratings. Read Apify's blog post on
[the legality of web scraping](https://blog.apify.com/is-web-scraping-legal/)
to learn more.




## Who can I contact for issues with Apify Store actor?



To report issues and find help,
head over to the
[Discord community](https://discord.com/channels/801163717915574323), or email me at juraj[dot]oravec[dot]josefson[at]gmail[dot]com



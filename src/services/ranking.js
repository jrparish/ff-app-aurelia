import { HttpClient } from 'aurelia-http-client';

const BASE_URL = 'https://draftaid-api.herokuapp.com/';

let client = new HttpClient();

export const RankingService = {

  get(format, week) {
    return client.createRequest('rankings')
      .asGet()
      .withBaseUrl(BASE_URL)
      .withParams({ format, week })
      .send()
      .then(result => result.content);
  }

};

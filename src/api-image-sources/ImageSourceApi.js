/* eslint-disable max-classes-per-file */

import { getImageFromCatApi, getImageFromCatassApi } from '../api/cat';

export class ImageSourceApi {
  static getRandomCatUrl() {
    console.log('базовый getUrl');
  }
}

export class CatApi extends ImageSourceApi {
  static getRandomCatUrl = async () => {
    const result = await getImageFromCatApi();
    const { url } = result[0];

    console.log(`cat getUrl: ${url}`);

    return url;
  };
}

export class CatassApi extends ImageSourceApi {
  static getRandomCatUrl = async () => {
    const result = await getImageFromCatassApi();
    const url = `${process.env.CATASS_API_URL}/${result.url}`;

    console.log(`catass getUrl${result}`);
    return url;
  };
}

import get from './methods/get';

export const getImageFromCatApi = async () => {
  const result = await get({
    url: `${process.env.CAT_API_URL}`,
    params: `api_key=${process.env.CAT_API_KEY}`,
  });

  return result;
};

export const getImageFromCatassApi = async () => {
  const result = await get({
    url: `${process.env.CATASS_API_URL}/cat`,
    params: 'json=true',
  });

  return result;
};

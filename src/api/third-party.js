import * as ApiUrls from '../constants/Api';
import axios from 'axios';

export const getNews = params =>
  axios.get(`${ApiUrls.NEWS_API_URL}`, {
    params: {
      token: ApiUrls.NEWS_API_KEY,
      ...params,
    },
  });

export const mapAccount = (payload, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  return axios
    .post(ApiUrls.ACCOUNT_MAPPING + '/mapAccount', payload, config)
    .then(response => {
      return response.data;
    });
};

export const accountMappingChallenge = (payload, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  return axios
    .post(ApiUrls.ACCOUNT_MAPPING + '/challenge', payload, config)
    .then(response => {
      return response.data;
    });
};

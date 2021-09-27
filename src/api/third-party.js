import * as ApiUrls from '../constants/Api';
import axios from 'axios';

export const getNews = params =>
  axios.get(`${ApiUrls.NEWS_API_URL}`, {
    params: {
      token: ApiUrls.NEWS_API_KEY,
      ...params,
    },
  });

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { EventActions } from '../../../store/actions/event';

export function useNewsFeed(event) {
  const dispatch = useDispatch();

  const tags = event?.tags.map(tag => tag.name) || [];
  const uniqueKeywords = Array.from(new Set([event?.category, ...tags]));

  // adding "" (inverted commas) per tag to search for the phrase
  // added OR to get more results
  const queries = uniqueKeywords.length
    ? `"${uniqueKeywords.join('" OR "')}"`
    : [];

  // API docs: https://gnews.io/docs/v4#top-headlines-endpoint
  const params = {
    q: queries,
    max: 8,
    lang: 'en',
  };

  useEffect(() => {
    if (event?.type === 'non-streamed')
      dispatch(EventActions.initiateFetchNewsData(params));
  }, [event]);

  return {};
}

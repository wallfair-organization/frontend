import {
  useLocation,
  useParams,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import Routes from 'constants/Routes';

export function useRouteHandling(eventType) {
  const location = useLocation();
  const { category } = useParams();
  const routeMatch = useRouteMatch();
  const history = useHistory();

  if (!routeMatch.params.category && history.action.toLowerCase() === 'push') {
    history.push(
      Routes.getRouteWithParameters(
        eventType === 'streamed' ? Routes.liveEvents : Routes.events,
        {
          category: 'all',
        }
      )
    );
  }

  return {
    location,
    category,
  };
}

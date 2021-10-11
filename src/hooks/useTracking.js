import { useEffect } from 'react';
import { trackPageView } from 'config/gtm';
import { useLocation } from 'react-router';

export const useTracking = value => {
  const location = useLocation();

  useEffect(() => {
    trackPageView({
      // pageTitle: location.pathname,
    });
  }, [location]);

  return null;
};

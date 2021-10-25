// using documentation https://reactrouter.com/web/guides/scroll-restoration

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    //we are not using body for scrolling, so window not working in that case, but can stay in case we will at some pages
    document.getElementById('main-scroll-container').scrollTo(0, 0);
  }, [pathname]);

  return null;
}

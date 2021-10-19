import { useCallback, useState } from 'react';

const useHideMobileScrollingMenu = () => {
  const [hideNavbar, setHideNavbar] = useState(true);

  const onScroll = useCallback(
    event => {
      const { scrollTop } = event.target;

      if (scrollTop > 0 && hideNavbar) {
        setHideNavbar(false);
      } else if (scrollTop === 0) {
        setHideNavbar(true);
      }
    },
    [hideNavbar]
  );

  return { onScroll, hideNavbar };
};

export default useHideMobileScrollingMenu;

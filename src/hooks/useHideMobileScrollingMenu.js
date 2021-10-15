import { useCallback, useState } from 'react';

const useHideMobileScrollingMenu = () => {
  const [hideNavbar, setHideNavbar] = useState(false);

  const onScroll = useCallback(
    event => {
      const { scrollTop } = event.target;

      // when user scrolls down and the navbar is not hidden
      if (scrollTop > 0 && !hideNavbar) {
        setHideNavbar(true);
        // if the user is on the top of the screen
      } else if (scrollTop === 0) {
        setHideNavbar(false);
      }
    },
    [hideNavbar]
  );

  return { onScroll, hideNavbar };
};

export default useHideMobileScrollingMenu;

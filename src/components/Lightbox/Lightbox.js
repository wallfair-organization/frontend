import { ReactComponent as CloseButtonIcon } from '../../data/images/lightbox/close.svg';

// Imports for styling
import styled from 'styled-components';

import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import gsap from 'gsap';
import { Tween } from 'react-gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import TpadSmoke from '../../data/images/lightbox/tpad-smoke.png';

gsap.registerPlugin(ScrollTrigger);

const states = {
  HIDDEN: 'hidden',
  CLOSEDBYUSER: 'closedbyuser',
  ACTIVE: 'active',
};

const Lightbox = ({ className, children, lightboxHidePaths = [] }) => {
  const { pathname } = useLocation();

  const [state, setState] = useState(states.ACTIVE);

  const handleClick = useCallback(async () => {
    setState(states.CLOSEDBYUSER);
  }, []);

  useEffect(() => {
    if (state !== states.CLOSEDBYUSER) {
      const newState = lightboxHidePaths.includes(pathname)
        ? states.HIDDEN
        : states.ACTIVE;
      setState(newState);
    }
  }, [pathname, lightboxHidePaths, state]);

  return (
    <Tween
      from={{ scale: '0.5', alpha: 0 }}
      to={{
        scale: '1',
        alpha: 1,
        delay: 1,
      }}
      duration={0.5}
    >
      <LightboxContainer
        path={pathname}
        className={`${className ?? ''} ${
          state !== states.ACTIVE ? 'hidden' : 'active'
        }`}
      >
        <LightboxBackground>
          <StyledCloseButtonIcon onClick={handleClick} />
          <LightboxContent>{children}</LightboxContent>
        </LightboxBackground>

        {/* <div style={{position: "relative", top: 0, left: 0}}> */}

        {/* </div> */}
      </LightboxContainer>
    </Tween>
  );
};

// Styled components
const LightboxContainer = styled.div`
  /* position: absolute; */
  /* top: 0; */
  width: 100%;
  margin: 0 auto;
  padding: 0 0px 0 0px;
  margin-bottom: ${props => (props.path === '/' ? '0' : '50px')};
  color: white;
  z-index: 999;

  &.hidden {
    display: none;
  }

  @media (orientation: portrait) {
    margin-bottom: ${props => (props.path === '/' ? '20px' : '50px')};
    /* max-height: 380px;
    padding: 0 20px 0 20px;
    h1 {
      font-size: 24px;
    } */

    /* display:none; //TEMPORARY */
  }
  @media (max-width: 1000px) and (orientation: landscape) {
    /* display: none; */
  }
`;

const LightboxBackground = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  /* max-height: 90px; */
  padding: 10px 10px 10px 10px;
  border-radius: 5px;
  // background: #17153c;
  // background: url(${TpadSmoke}) no-repeat center;
  background: #ff007a;
  background-size: cover;
  position: relative;

  @media (orientation: portrait) {
    /* max-height: 380px; */
    h1 {
      font-size: 24px;
    }
  }
`;

const LightboxContent = styled.div`
  padding: 10px 10px 10px 10px;
`;

const StyledCloseButtonIcon = styled(CloseButtonIcon)`
  position: absolute;
  cursor: pointer;
  top: 10px;
  right: 10px;
  width: 25px;
  height: 25px;

  & path {
    fill: rgba(255, 255, 255, 0.2);
  }
`;

export default Lightbox;

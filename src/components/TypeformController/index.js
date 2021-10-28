import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

const TypeformController = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.includes('elon-game')) {
      console.log('NOT ELON');
      document.getElementById('game-feedback-elon').style = 'display: none';
      document.getElementById('typeform-feedback').style = 'display: block';
      return;
    }

    document.getElementById('game-feedback-elon').style = 'display: block';
    document.getElementById('typeform-feedback').style = 'display: none';
  }, [pathname]);

  return null;
};

export default TypeformController;

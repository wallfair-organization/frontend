import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useBetPreviousLocation() {
  const location = useLocation();
  const [currentFromLocation, setCurrentFromLocation] = useState({
    pathname: '/',
  });

  useEffect(() => {
    setCurrentFromLocation(location.state?.fromLocation);
  }, []);

  return currentFromLocation;
}

import { useSelector } from 'react-redux';
import {
  selectLastCrashes,
  selectInGameBets,
  selectCashedOut,
  selectHasStarted,
} from 'store/selectors/rosi-game';

const useRosiData = () => {
  const lastCrashes = useSelector(selectLastCrashes);
  const inGameBets = useSelector(selectInGameBets);
  const cashedOut = useSelector(selectCashedOut);
  const hasStarted = useSelector(selectCashedOut);

  return {
    lastCrashes,
    inGameBets,
    cashedOut,
    hasStarted,
  };
};

export default useRosiData;

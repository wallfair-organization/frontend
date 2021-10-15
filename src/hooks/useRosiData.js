import { useSelector } from 'react-redux';
import {
  selectLastCrashes,
  selectInGameBets,
  selectCashedOut,
  selectHasStarted,
  selectEndgame,
} from 'store/selectors/rosi-game';

const useRosiData = () => {
  const lastCrashes = useSelector(selectLastCrashes);
  const inGameBets = useSelector(selectInGameBets);
  const cashedOut = useSelector(selectCashedOut);
  const hasStarted = useSelector(selectHasStarted);
  const isEndgame = useSelector(selectEndgame);
  return {
    lastCrashes,
    inGameBets,
    cashedOut,
    hasStarted,
    isEndgame,
  };
};

export default useRosiData;

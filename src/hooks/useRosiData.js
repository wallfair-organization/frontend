import { useSelector } from 'react-redux';
import {
  selectLastCrashes,
  selectInGameBets,
  selectCashedOut,
  selectHasStarted,
  selectEndgame,
  selectHighData,
  selectLuckyData,
} from 'store/selectors/rosi-game';

const useRosiData = () => {
  const lastCrashes = useSelector(selectLastCrashes);
  const inGameBets = useSelector(selectInGameBets);
  const cashedOut = useSelector(selectCashedOut);
  const hasStarted = useSelector(selectHasStarted);
  const isEndgame = useSelector(selectEndgame);
  const highData = useSelector(selectHighData);
  const luckyData = useSelector(selectLuckyData);
  return {
    lastCrashes,
    inGameBets,
    cashedOut,
    hasStarted,
    isEndgame,
    highData,
    luckyData,
  };
};

export default useRosiData;

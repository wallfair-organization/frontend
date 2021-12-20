import { useSelector } from 'react-redux';
import {
  selectLastCrashes,
  selectInGameBets,
  selectCashedOut,
  selectHasStarted,
  selectEndgame,
  selectHighData,
  selectLuckyData,
  selectLastCrash,
  selectNextGameAt,
  selectTimeStarted,
  selectIsMute,
  selectVolumeLevel,
  selectMusicIndex,
  selectIsSynced,
  selectAnimationIndex,
  selectIsConnected,
  selectMyBetsData,
} from 'store/selectors/rosi-game';

const useRosiData = () => {
  const lastCrashes = useSelector(selectLastCrashes);
  const inGameBets = useSelector(selectInGameBets);
  const cashedOut = useSelector(selectCashedOut);
  const hasStarted = useSelector(selectHasStarted);
  const isEndgame = useSelector(selectEndgame);
  const highData = useSelector(selectHighData);
  const luckyData = useSelector(selectLuckyData);
  const lastCrashValue = useSelector(selectLastCrash);
  const nextGameAtTimeStamp = useSelector(selectNextGameAt);
  const gameStartedTimeStamp = useSelector(selectTimeStarted);
  const isMute = useSelector(selectIsMute);
  const volumeLevel = useSelector(selectVolumeLevel);
  const musicIndex = useSelector(selectMusicIndex);
  const isSynced = useSelector(selectIsSynced);
  const animationIndex = useSelector(selectAnimationIndex);
  const isConnected = useSelector(selectIsConnected);
  const myBetsData = useSelector(selectMyBetsData);

  return {
    lastCrashes,
    inGameBets,
    cashedOut,
    hasStarted,
    isEndgame,
    highData,
    luckyData,
    lastCrashValue,
    nextGameAtTimeStamp,
    gameStartedTimeStamp,
    isMute,
    volumeLevel,
    musicIndex,
    isSynced,
    animationIndex,
    isConnected,
    myBetsData,
  };
};

export default useRosiData;

import styles from './styles.module.scss';
import LogoSplash from '../../data/images/wfair-logo-splash.png';
import { connect } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import moment from 'moment';
import { getSingleGameDetailById } from '../../api/casino-games';
import PopupTheme from '../Popup/PopupTheme';
import classNames from 'classnames';
import _ from "lodash";

import InputBox from '../InputBox';
import InputBoxTheme from '../InputBox/InputBoxTheme';

import mineImg from '../../data/images/singleGameDetails/mines/mine.jpg';
import coinImg from '../../data/images/singleGameDetails/mines/coin.jpg';

import { TOKEN_NAME } from '../../constants/Token';
import {GAMES} from '../../constants/Games';
import { roundToTwo } from '../../helper/FormatNumbers';
import { currencyDisplay } from 'helper/Currency';

const GameCurrency = (props) => {
  return <div>
    <b>Game currency:</b>{' '}
    <span>{currencyDisplay(props?.value)}</span>
  </div>
}

const AlpacannonDetails = ({resData}) => {
  const profit = resData?.profit.toFixed(2);

  return  <>
    <div>
      <b>Multiplier:</b>{' '}
      <span>{roundToTwo(resData?.crashFactor)}</span>
    </div>
    <div>
      <b>Selected factor:</b>{' '}
      <span>{resData?.riskFactor}</span>
    </div>
    <div>
      <b>Game Hash:</b>{' '}
      <span>{resData?.gameHash}</span>
    </div>
    <div>
      <b>Staked amount:</b>{' '}
      <span>{resData?.stakedAmount}</span>
    </div>
    <GameCurrency value={resData?.gamesCurrency}/>
    <div>
      <b>Profit:</b>{' '}
      <span className={profit > 0 ? 'global-cashout-profit' : 'global-cashout-loss'}>{profit > 0 ? '+' + profit : profit}</span>
    </div>
    <div>
      <b>Outcome factor:</b>{' '} <br />
      <div className={styles.alpaCannonRollValue}>{resData?.rollValue}</div>
    </div>
  </>
}

const PlinkoDetails = ({resData}) => {
  const profit = resData?.profit.toFixed(2);
  const winIndex = resData?.winIndex;
  const riskFactor = resData?.riskFactor;
  const outcomesByRisk = GAMES.plinko.outcomesByRisk[parseInt(riskFactor)-1];

  const renderBuckets = () => {
    return <div className={styles.plinkoBucketContainer}>
      {outcomesByRisk.map((cell, index)=> {
        if(index === winIndex) {
          return <div className={classNames(styles.plinkoBucket, styles.plinkoWinBucket)}>x{cell}</div>
        }

        return <div className={styles.plinkoBucket}>x{cell}</div>;
      })}
    </div>
  }

  return  <>
    <div>
      <b>Multiplier:</b>{' '}
      <span>{roundToTwo(resData?.crashFactor)}</span>
    </div>
    <div>
      <b>Risk factor:</b>{' '}
      <span>{resData?.riskFactor}</span>
    </div>
    <div>
      <b>Game Hash:</b>{' '}
      <span>{resData?.gameHash}</span>
    </div>
    <div>
      <b>Staked amount:</b>{' '}
      <span>{resData?.stakedAmount}</span>
    </div>
    <GameCurrency value={resData?.gamesCurrency}/>
    <div>
      <b>Profit:</b>{' '}
      <span className={profit > 0 ? 'global-cashout-profit' : 'global-cashout-loss'}>{profit > 0 ? '+' + profit : profit}</span>
    </div>
    <div>
      <b>Buckets:</b>{' '}
      {renderBuckets()}
    </div>
  </>
}

const WheelDetails = ({resData}) => {
    const profit = resData?.profit.toFixed(2);

    return  <>
        <div>
            <b>Multiplier:</b>{' '}
            <span>{roundToTwo(resData?.crashFactor)}</span>
        </div>
        <div>
            <b>Risk factor:</b>{' '}
            <span>{resData?.riskFactor}</span>
        </div>
        <div>
            <b>Game Hash:</b>{' '}
            <span>{resData?.gameHash}</span>
        </div>
        <div>
            <b>Staked amount:</b>{' '}
            <span>{resData?.stakedAmount}</span>
        </div>
        <GameCurrency value={resData?.gamesCurrency}/>
        <div>
            <b>Profit:</b>{' '}
            <span className={profit > 0 ? 'global-cashout-profit' : 'global-cashout-loss'}>{profit > 0 ? '+' + profit : profit}</span>
        </div>
    </>
}

const MinesDetails = ({resData}) => {
    const profit = resData?.profit.toFixed(2);
    const board = resData?.board || [];

    return  <>
        <div>
            <b>Multiplier:</b>{' '}
            <span>{roundToTwo(resData?.crashFactor)}</span>
        </div>
        <div>
            <b>Mines count:</b>{' '}
            <span>{resData?.minesCount}</span>
        </div>
        <div>
            <b>Game Hash:</b>{' '}
            <span>{resData?.gameHash}</span>
        </div>
        <div>
            <b>Staked amount:</b>{' '}
            <span>{resData?.stakedAmount}</span>
        </div>
        <GameCurrency value={resData?.gamesCurrency}/>
        <div>
            <b>Profit:</b>{' '}
            <span className={profit > 0 ? 'global-cashout-profit' : 'global-cashout-loss'}>{profit > 0 ? '+' + profit : profit}</span>
        </div>
        <div>
            <b>Revealed board:</b>
            <div className={styles.minesGameBoard}>
                {board.map((cell)=> {
                    const parsed = parseInt(cell);
                    if(parsed === 1) {
                        return <img src={mineImg}/>;
                    } else {
                        return <img src={coinImg}/>;
                    }


                })}
            </div>
        </div>
    </>
}

const renderDetails = (game, resData) => {
    if(game.name === "Alpaca Wheel") {
        return <WheelDetails resData={resData} />;
    }

    if(game.name === "Mines") {
        return <MinesDetails resData={resData} />;
    }

    if(game.name === "Plinko") {
        return <PlinkoDetails resData={resData} />;
    }

    if(game.name === "Alpacannon") {
        return <AlpacannonDetails resData={resData} />;
    }
}

const SingleGameDetailPopup = ({ hidePopup, showPopup, data }) => {
  const { game, resData } = data;

  const matchDate = resData?.created_at;

  const date = matchDate
    ? moment(matchDate).format('HH:mm:ss | DD/MM/YYYY')
    : '---';

  const handleCrashFactorChange = async (gameHash, type) => {
    const response = await getSingleGameDetailById(gameHash, game.id, type).catch(err => {
      console.error('getGameDetailById err', err);
    });
    const nextPrevResData = response?.data || null;

    if (nextPrevResData?.gameHash) {
      showPopup(PopupTheme.singleGamesDetail, {
        maxWidth: true,
        data: {
          resData: nextPrevResData,
          game
        },
      });
    } else {
      hidePopup();
    }
  };

  const hashed = _.has(resData, 'hashedServerSeed');
  const gameHash = resData?.gameHash;

  return (
    <div className={styles.gameDetails}>
      <img src={LogoSplash} className={styles.logo} />
      <div className={styles.title}>
        Game details
        <div
          className={styles.nextGame}
          onClick={() => {
            handleCrashFactorChange(gameHash, 'next');
          }}
        >
          {'<'} Next
        </div>
        <div
          className={styles.prevGame}
          onClick={() => {
            handleCrashFactorChange(gameHash, 'prev');
          }}
        >
          Prev {'>'}
        </div>
      </div>
      <div className={styles.separator}></div>
        <div className={styles.gameDate}>
            <span>{date}</span>
        </div>
      <div className={styles.content}>
        <div className={classNames("global-link-style", styles.verificationTool)}><a href={game?.verificationTool} target={"_blank"} rel="noreferrer"><b>{game?.name} - Verification Tool</b></a></div>

          <div className={styles.detailsByGameBlock}>
              {renderDetails(game, resData)}
          </div>

          <div className={styles.copyInputBlock}>
              <label className={hashed && styles.disabled}>Server seed ({hashed ? "Hashed - please rotate your seeds pair to reveal it" : "Revealed"})</label>
              <InputBox
                  type={'text'}
                  value={hashed ? resData.hashedServerSeed : resData.serverSeed}
                  setValue={_.noop}
                  className={hashed && styles.disabled}
                  theme={InputBoxTheme.copyToClipboardInput}
                  onClick={(e, val) => {
                      // e.currentTarget.style.backgroundColor = '#c0f1c0';
                      // document.getSelection().removeAllRanges();
                  }}
              />
          </div>

          <div className={styles.copyInputBlock}>
              <label>Client seed</label>
              <InputBox
                  type={'text'}
                  value={resData.clientSeed}
                  setValue={_.noop}
                  theme={InputBoxTheme.copyToClipboardInput}
                  onClick={(e, val) => {}}
              />
          </div>

          <div className={styles.copyInputBlock}>
              <label>Game Nonce (Bet number using this pair)</label>
              <InputBox
                  type={'text'}
                  value={resData.nonce}
                  setValue={_.noop}
                  theme={InputBoxTheme.copyToClipboardInput}
                  onClick={(e, val) => {
                      // setCopied(true);
                      // e.currentTarget.style.backgroundColor = '#c0f1c0';
                      // document.getSelection().removeAllRanges();
                  }}
              />
          </div>

      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(null, mapDispatchToProps)(SingleGameDetailPopup);

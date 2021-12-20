import styles from './styles.module.scss';
import LogoSplash from '../../data/images/wfair-logo-splash.png';
import {connect, useDispatch} from 'react-redux';
import {PopupActions} from 'store/actions/popup';
import moment from 'moment';
import {GameApi} from '../../api/casino-games';
import PopupTheme from '../Popup/PopupTheme';
import classNames from 'classnames';
import React, {useState, useEffect} from "react";

import Icon from '../Icon';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';

import CryptoJS from 'crypto-js';
import {AlertActions} from "../../store/actions/alert";
import Button from 'components/Button';

const roundToTwo = num => {
  return +(Math.round(num + 'e+2') + 'e-2');
};

const FairnessPopup = ({hidePopup, showPopup, data}) => {
  const dispatch = useDispatch();
  const {game, token} = data;
  const Api = new GameApi(game.url, token);

  const [newClientSeed, setNewClientSeed] = useState();
  const [activeSeeds, setActiveSeeds] = useState({});
  const [rotated, setRotated] = useState(false);

  const generateNewClientSeed = () => {
    const randomClientSeed = CryptoJS.lib.WordArray.random(12).toString();
    setNewClientSeed(randomClientSeed);
  }

  const handleRotateSeeds = async () => {
    const response = await Api.updateCurrentFairnessByGame(game.id, {
      clientSeed: newClientSeed
    }).catch(error => {
      dispatch(AlertActions.showError(error.message));
    });
    const resData = response?.data?.data || null;

    setRotated(true);

    setActiveSeeds({
      clientSeed: newClientSeed,
      nonce: 0,
      hashedServerSeed: resData?.hashedServerSeed,
      hashedNextServerSeed: resData?.hashedNextServerSeed
    });
  }

  useEffect(()=> {
    (async () => {
      const response = await Api.getCurrentFairnessByGame(game.id).catch(err => {
        console.error('getGameDetailById err', err);
      });
      const resData = response?.data || null;

      if(resData) {
        const {clientSeed, nonce, hashedServerSeed, hashedNextServerSeed} = resData;
        setActiveSeeds({
          clientSeed, nonce, hashedServerSeed, hashedNextServerSeed
        });
      }

      generateNewClientSeed();
    })().catch(error => {
      dispatch(AlertActions.showError(error.message));
    });
  }, [])

  useEffect(()=> {
    if(rotated) {
      setTimeout(()=> {
        hidePopup()
      }, 2000)
    }
  }, [rotated])

  return (
    <div className={styles.gameDetails}>
      <img src={LogoSplash} className={styles.logo}/>
      <div className={styles.title}>
        <Icon
          className={styles.balanceIcon}
          iconType={IconType.balanceScaleSolid}
          iconTheme={IconTheme.black}
          height={18}
          width={18}
        /> Fairness
      </div>
      <div className={styles.separator}></div>
      <div className={styles.content}>
        <div className={classNames(styles.seedsCurrentForm)}>
          <div>
            <label>
              Active Client Seed
            </label>
            <input
              className={styles.profileInput}
              value={activeSeeds.clientSeed}
              disabled={true}
              // onChange={''}
            />
          </div>

          <div>
            <label>
              Active Server Seed (Hashed by SHA-256)
            </label>
            <input
              className={styles.profileInput}
              value={activeSeeds?.hashedServerSeed}
              disabled={true}
              // onChange={''}
            />
          </div>

          <div>
            <label>
              Bets made with pair
            </label>
            <input
              className={styles.profileInput}
              value={activeSeeds.nonce}
              disabled={true}
            />
          </div>
        </div>

        <h3 className={classNames(styles.seedsRotateTitle)}>Rotate seed pair</h3>

        <div className={classNames(styles.seedsRotateForm)}>
          <div>
            <label>
              New Client Seed (editable)
            </label>
            <input
              className={styles.profileInput}
              value={newClientSeed}
              onChange={(e)=> setNewClientSeed(e.target.value)}
            />
          </div>

          <div>
            <label>
              Next Server Seed (Hashed by SHA-256)
            </label>
            <input
              className={styles.profileInput}
              value={activeSeeds.hashedNextServerSeed}
              disabled={true}
            />
          </div>

          <Button
            className={classNames(styles.button)}
            onClick={handleRotateSeeds}
          >
            {rotated ? "Rotated succesfully" : "Rotate"}
          </Button>

        </div>

        <div>
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

export default connect(null, mapDispatchToProps)(FairnessPopup);

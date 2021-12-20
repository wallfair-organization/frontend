import React, { useState } from 'react'
import styles from './styles.module.scss'
import { Grid } from '@material-ui/core';
import IceCreamImg from '../../data/images/alpaca-verse/ice-cream.png';
import SocialImg from '../../data/images/alpaca-verse/social-img.png';
import GemsImg from '../../data/images/alpaca-verse/gems.png';
import FairImg from '../../data/images/alpaca-verse/fair-img.png';
import StarImg from '../../data/images/alpaca-verse/star.png';
import DecentralImg from '../../data/images/alpaca-verse/decentral-img.png';
import { TOKEN_NAME } from 'constants/Token';

const GameContentCards = () => {
    const [expandSocial, setExpandSocial] = useState(false);
    const [expandFair, setExpandFair] = useState(false);
    const [expandDecentral, setExpandDecentral] = useState(false);

    const handleExpandSocial = () => {
      setExpandSocial(!expandSocial);
    };
    const handleExpandFair = () => {
      setExpandFair(!expandFair);
    };
    const handleExpandDecentral = () => {
      setExpandDecentral(!expandDecentral);
    };

  return (
    <div className={styles.cardBox}>
      <Grid container spacing={2}>
        <Grid item lg={4} md={6} xs={12}>
          <div className={styles.card}>
            <div className={styles.thumbnail}>
              <img src={IceCreamImg} alt="" />
            </div>
            <div className={styles.detail}>
              <h3>SOCIAL</h3>
              {!expandSocial ? (
                <p>
                  It’s simple: Alpacas are social animals = Alpacasino is a
                  social Betwork. Alpacas from all over the world meet to chat
                  ...
                </p>
              ) : (
                <p>
                  It’s simple: Alpacas are social animals = Alpacasino is a
                  social Betwork. Alpacas from all over the world meet to chat,
                  follow, interact and game together. You can customize and
                  upgrade your Alpaca or check out any Alpacas activity history
                  and copy bets, see other Alpacas activity in real time and
                  chat / follow. Your alpaca grows with tokens owned and you
                  will be able to battle or gang up with other alpacas in the
                  future. Some cool NFT applications and skins might be on their
                  way too ;)
                </p>
              )}
              <button onClick={handleExpandSocial}>
                {!expandSocial ? 'READ MORE' : 'LESS'}
              </button>
            </div>
            <div className={styles.thumbnailLast}>
              <img src={SocialImg} alt="" />
            </div>
          </div>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <div className={styles.card}>
            <div className={styles.thumbnail}>
              <img src={GemsImg} alt="" />
            </div>
            <div className={styles.detail}>
              <h3>FAIR</h3>
              {!expandFair ? (
                <p>
                  Alpacas are sometimes funny and misbehaving but always fair.
                  We believe in a maximum of transparency ...
                </p>
              ) : (
                <p>
                  Alpacas are sometimes funny and misbehaving but always fair.
                  We believe in a maximum of transparency and blockchain allows
                  for a technical implementation. This way every algorithm and
                  maths behind the games and market makers are transparent from
                  s ource code to unlimited history of outcomes. Every activity
                  of every user and game is transparent. This is a much better
                  approach than unknown and secret algorithms or “random” picks
                  in traditional worlds.
                </p>
              )}
              <button onClick={handleExpandFair}>
                {!expandFair ? 'READ MORE' : 'LESS'}
              </button>
            </div>
            <div className={styles.thumbnailLast}>
              <img src={FairImg} alt="" />
            </div>
          </div>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <div className={styles.card}>
            <div className={styles.thumbnail}>
              <img src={StarImg} alt="" />
            </div>
            <div className={styles.detail}>
              <h3>DECENTRAL</h3>
              {!expandDecentral ? (
                <p>
                  Alpacas are self governing animals. Wallfair is a combination
                  of smart contracts running on decentralized Polygon blockchain
                  ...
                </p>
              ) : (
                <p>
                  Alpacas are self governing animals. Wallfair is a combination
                  of smart contracts running on decentralized Polygon blockchain
                  as well an ERC 20 utility token. It’s a decentralized
                  technology that allows any game provider to upload games, any
                  user to create new games, events or battles and licensed
                  casino operators to use this open-source, non profit
                  technology. Wallfair is striving to become a fully
                  decentralized autonomous organation (DAO) that is fully
                  governed by the voting of every {TOKEN_NAME} token holder.
                  <br />
                  <br />
                  Every {TOKEN_NAME} holder participates in the growth of the network
                  as {TOKEN_NAME} is the currency used for any interaction, e.g. users
                  signin up / depositing / betting in external applications.
                </p>
              )}
              <button onClick={handleExpandDecentral}>
                {!expandDecentral ? 'READ MORE' : 'LESS'}
              </button>
            </div>
            <div className={styles.thumbnailLast}>
              <img src={DecentralImg} alt="" />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default GameContentCards

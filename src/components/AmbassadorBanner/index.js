import { useEffect, useState, memo } from 'react';
import styles from './styles.module.scss';
import { ReactComponent as ThreeStars }  from '../../data/icons/homepage/3stars.svg';
import { ReactComponent as TwoStars } from '../../data/icons/homepage/2stars.svg';
import { ReactComponent as OneStar } from '../../data/icons/homepage/1star.svg';
import AlpacaWithShavolImage from '../../data/images/home/alpaca-with-shavol.png'

const AmbassadorBanner = () => {

    const descriptionCard = (
      <div className={styles.descriptionCardContainer}>
        <div className={styles.descriptionCard}>
          <h1>How does it work?</h1>
          <p>
            1. Register on Alpacasino.io, top up your wallet with any amount and
            play at least once in one of our house games.
          </p>
          <p>
            2. Do it faster than others to get the higher referral bonus and
            gain your badge!
          </p>
          <p>
            3. Share the link among your friends. The more they game the more
            money will come into your account. You will get % of all their bets
            minus their winnings. So simple!
          </p>
          <p className={styles.highlighted}>
            We will soon turn your Badge into an NFT and will disclose all the
            detail about features and abilities of your badge!!
          </p>
          <p class={styles.checkTC}>
            *Please check our T&amp;C for all details!
          </p>
        </div>
      </div>
    );

    return (
      <>
        <div className={styles.ambassadorBannerContainer}>
          <div className={styles.container}>
            <div className={styles.firstColumn}>
              <div>
                <div className={styles.whiteBox}>
                  <p>
                    Founders offer - <span>Limited Time</span>
                  </p>
                </div>
                <img src={AlpacaWithShavolImage} alt="alpaca with shavol" />
              </div>
            </div>
            <div className={styles.secondColumn}>
              <div className={styles.ambassadorBannerTitle}>
                <p>
                  Become our ambassador and earn up to 20,000,000 WFAIR / month
                </p>
              </div>
              <div className={styles.ambassadorItemsWrapper}>
                <div className={styles.ambassadorInfoItem}>
                  <ThreeStars />
                  <div className={styles.textContainer}>
                    <p>
                      Galaxy Alpaca Badge<br />
                      <span className={styles.whiteText}>
                        First 150 registered players
                      </span>
                    </p>
                    <p className={styles.whiteSubText}>
                      20% referral lifetime bonus up to 20 000 000 WFAIRs / month
                    </p>
                  </div>
                </div>
                <div className={styles.ambassadorInfoItem}>
                  <TwoStars />
                  <div className={styles.textContainer}>
                    <p>
                      Star Alpaca Badge<br />
                      <span className={styles.whiteText}>
                        Players 151 - 300
                      </span>
                    </p>
                    <p className={styles.whiteSubText}>
                      20% referral lifetime bonus up to 10 000 000 WFAIRs / month
                    </p>
                  </div>
                </div>
                <div className={styles.ambassadorInfoItem}>
                  <OneStar />
                  <div className={styles.textContainer}>
                    <p>
                      Moon Alpaca Badge<br />
                      <span className={styles.whiteText}>
                        Players 301 - 500
                      </span>
                    </p>
                    <p className={styles.whiteSubText}>
                      15% GGR referral lifetime bonus up to 3 000 000 WFAIRs / month
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.descriptionWrapper}>{descriptionCard}</div>
            </div>
          </div>
        </div>
        <div className={styles.descriptionWrapperXLDown}>{descriptionCard}</div>
      </>
    );
}

export default memo(AmbassadorBanner);
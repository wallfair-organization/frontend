import React from 'react'
import styles from './styles.module.scss'
import PhoneAlpacaImage from '../../data/images/home/phone-alpaca.png'
import PhoneCoinAlpacaImage from '../../data/images/home/phone-coin-alpaca.png';

const NftBanner = props => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <img src={PhoneCoinAlpacaImage} alt="phone alpaca" />
          <img src={PhoneAlpacaImage} alt="phone coin alpaca" />
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.whiteWrapper}>
            <div className={styles.whiteContainer}>
              <p>Coming soon:</p>
              <p className={styles.nft}>NFT</p>
            </div>
          </div>
          <div className={styles.content}>
            <h2>ALPACAS IN CASINO</h2>
            <p>
              To start, let's create your own Alpaca Avatar. Then, very soon, we
              will convert it into NFT with multiple unique capabilities and
              valuable skills!
              <br />
              <br />
              {/* Content for the general referral link: */}
            </p>
            {/* <div className={styles.buttonWrapper}>
              <button>Start</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NftBanner

import { connect } from 'react-redux';
import styles from './styles.module.scss';
import * as ApiUrls from 'constants/Api';
import { useEffect, useState } from 'react';
import Button from 'components/Button';

const KycStatus = ({
  user = {},
}) => {

  const [userId, setUserId] = useState({...user?.userId});
  const [userKyc, setUserKyc] = useState({...user?.kyc});
  useEffect(() => {
    setUserKyc(user?.kyc);
    setUserId(user?.userId);
  }, [user]);

  const openFractal = () => {
    const kycUrl = ApiUrls.BACKEND_URL + ApiUrls.KYC_START_FOR_USER.replace(':userId', userId);
    window.open(kycUrl, "fractal", "width=480,height=700,top=150,left=150");
  }

  const getStatusDescription = () => {
    switch(userKyc?.status){
      case 'pending': return "KYC Verification in progress...";
      case 'approved': return "KYC Verified";
      case 'rejected': return "KYC Verification failed";
      case 'error': return "KYC Verification failed";
      default: return "Get KYC Verified";
    }
  };

  const isKycStarted = () => userKyc && userKyc.status;
  const showStartButton = () => !isKycStarted() || userKyc.status === 'error' || userKyc.status === 'rejected';

  const renderKycStatus = () => (
    <>
      <div className={styles.group}>
        <label>Your current status:</label>
        <p className={styles[userKyc.status]}>{getStatusDescription()}</p>
      </div>
      <div className={styles.group}>
        <label>Last updated on:</label>
        <p>{userKyc.date && new Date(userKyc.date).toUTCString()}</p>
      </div>
      <div className={styles.group}>
        <label>Reference:</label>
        <p>{userKyc.uid}</p>
      </div>
    </>
  );


  return user && (
    <div className={styles.kycInfoContainer}>
      {!isKycStarted()
        ? <>
          <p>In order to withdraw your funds or make larger deposits, you must perform a "Know Your Customer" (KYC) checks.</p>
          <p>We perform KYC operations via our partner Fractal.</p>
          </>
        : renderKycStatus()}
      {showStartButton() &&
        <Button
          className={styles.button}
          onClick={openFractal}
          >
          Continue with Fractal
      </Button>}
    </div>
  );
};


const mapStateToProps = state => {
  return {
    user: state.authentication,
  };
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(KycStatus);


import _ from 'lodash';
import React, { useEffect } from 'react';
import Routes from '../../constants/Routes';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthenticationActions } from '../../store/actions/authentication';
import { trackSignup } from '../../config/gtm';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EmailVerification = ({ emailVerificationState, verifyEmail }) => {
  const history = useHistory();
  const userId = useQuery().get('userId');
  const code = useQuery().get('code');

  useEffect(async () => {
    await verifyEmail(userId, code);

    trackSignup({ method: 'Email' });

    history.push({
      pathname: Routes.home,
      query: { emailVerified: emailVerificationState },
    });
  }, [userId, code]);

  return null;
};

const mapStateToProps = state => {
  const emailVerificationState = state.authentication.emailVerificationState;

  return {
    emailVerificationState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyEmail: (userId, code) => {
      dispatch(AuthenticationActions.verifyEmail({ userId, code }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);

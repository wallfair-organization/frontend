import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Routes from 'constants/Routes';

const GuestRoute = ({ component: Component, isGuestUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isGuestUser ? <Component {...props} /> : <Redirect to={Routes.home} />
      }
    />
  );
};

function mapStateToProps(state) {
  return {
    isGuestUser: state.authentication.authState !== 'LOGGED_IN',
  };
}

export default connect(mapStateToProps)(GuestRoute);

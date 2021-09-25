import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Routes from 'constants/Routes';

const PrivateRoute = ({ component: Component, userLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        userLoggedIn ? <Component {...props} /> : <Redirect to={Routes.home} />
      }
    />
  );
};

function mapStateToProps(state) {
  return {
    userLoggedIn: state.authentication.authState === 'LOGGED_IN',
  };
}

export default connect(mapStateToProps)(PrivateRoute);

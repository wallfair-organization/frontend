import './styles.module.scss';
import AlertBox from './components/AlertBox';
import Bet from './screens/Bet';
import Home from './screens/Home';
import Logout from './screens/Logout';
import Popup from './components/Popup';
import PrivacyPolicy from './screens/PrivacyPolicy';
import Routes from './constants/Routes';
import configStore from './store';
import TermsAndConditions from './screens/TermsAndConditions';
import EmailVerification from './screens/EmailVerification';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import Navbar from 'components/Navbar';
import NavbarFooter from 'components/NavbarFooter';
import NavbarFooterAction from 'components/NavbarFooterAction';
import IconType from 'components/Icon/IconType';
import Events from './screens/Events';
import LiveEvents from './screens/LiveEvents';
import RosiGame from './screens/RosiGame';
import { PersistGate } from 'redux-persist/integration/react';
import Games from './screens/Games';
import Rewards from './screens/Rewards';
import ResetPassword from './screens/ResetPassword';
import initTagManager from './config/gtm';
import AudioContent from "./components/AudioContent";

const { store, persistor } = configStore();

initTagManager();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConnectedRouter history={history}>
          <Navbar skipRoutes={[]} />
          <AlertBox />
          <Popup />
          <AudioContent/>
          <Switch>
            <Route exact path={Routes.logout} component={Logout} />
            <Route
              exact
              path={Routes.termsAndConditions}
              component={TermsAndConditions}
            />
            <Route
              exact
              path={Routes.privacyPolicy}
              component={PrivacyPolicy}
            />
            <Route exact path={Routes.home} component={Home} />
            <Route exact path={Routes.bet} component={Bet} />
            <Route exact path={Routes.betApproveDirect} component={Home} />
            <Route exact path={Routes.liveEvents} component={LiveEvents} />
            <Route exact path={Routes.events} component={Events} />
            <Route exact path={Routes.rosiGame} component={RosiGame} />
            <Route path={Routes.verify} component={EmailVerification} />
            <Route path={Routes.games} component={Games} />
            <Route path={Routes.resetPassword} component={ResetPassword} />
            {/* <PrivateRoute path={Routes.rewards} component={Rewards} /> */}
            <Redirect to={Routes.home} />
          </Switch>
          <NavbarFooter skipRoutes={[Routes.bet, Routes.verify]}>
            <NavbarFooterAction
              route={Routes.home}
              iconType={IconType.home}
              text="Home"
            />
            <NavbarFooterAction
              route={`/live-events`}
              iconType={IconType.camera}
              text="Live Stream"
            />
            <NavbarFooterAction
              route={`/events`}
              iconType={IconType.bet2}
              text="Events"
            />
            <NavbarFooterAction
              route={Routes.games}
              iconType={IconType.shuttle}
              text="Games"
            />
          </NavbarFooter>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};

// Recalculating after resizing screen
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;

  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

export default App;

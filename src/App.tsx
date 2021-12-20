import './styles.module.scss';
import AlertBox from './components/AlertBox';
import Home from './screens/Home';
import Logout from './screens/Logout';
import Popup from './components/Popup';
import Routes from './constants/Routes';
import configStore from './store';
import EmailVerification from './screens/EmailVerification';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import Navbar from 'components/Navbar';
import NavbarFooter from 'components/NavbarFooter';
import NavbarFooterAction from 'components/NavbarFooterAction';
import IconType from 'components/Icon/IconType';
import Events from './screens/Events';
// import LiveEvents from './screens/LiveEvents';
import RosiGame from './screens/RosiGame';
import PlinkoGame from './screens/PlinkoGame';
import AlpacannonGame from './screens/AlpacannonGame';
import RouletteGame from './screens/RouletteGame';
import MinesGame from './screens/MinesGame';
import { PersistGate } from 'redux-persist/integration/react';
import Games from './screens/Games';
import UserWallet from './screens/UserWallet'
import Activities from './screens/Activities';
import ResetPassword from './screens/ResetPassword';
import UserProfile from './screens/UserProfile';
import ExternalGames from './screens/ExternalGames';
import ExternalGame from './screens/ExternalGame';
import LeaderboardPage from 'screens/LeaderboardPage';
import { initTagManager } from './config/gtm';
import AudioContent from './components/AudioContent';
import ScrollToTop from 'utils/ScrollToTop';
import DisclaimerPopupContainer from 'components/DisclaimerPopupContainer';
import PageTracker from 'components/PageTracker';
import EventRouter from 'components/Events/EventRouter';
// import TypeformController from 'components/TypeformController';
import ElonWallPaper from 'screens/ElonWallPaper';
import Fair from 'screens/Fair';
import TermsConditions from 'screens/TermsConditions';
import ResponsibleGambling from 'screens/ResponsibleGambling';
import KYCPolicy from 'screens/KYCPolicy';
import Imprint from 'screens/Imprint';
import PrivacyPolicy from 'screens/PrivacyPolicy';
import PrivateRoute from 'components/PrivateRoute';

const { store, persistor } = configStore();

initTagManager();

const App = () => {
  return (
    <div id={'main-scroll-container'}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ConnectedRouter history={history}>
            <PageTracker />
            <Navbar skipRoutes={[]} />
            <AlertBox />
            <Popup />
            <AudioContent />
            {/* <DisclaimerPopupContainer /> */}
            {/* <TypeformController /> */}
            <Switch>
              <Route exact path={Routes.logout} component={Logout} />
              <Route exact path={Routes.home} component={Home} />
              {/* <Route exact path={Routes.bet} component={Bet} /> */}
              {/* <Route exact path={Routes.bet} component={BetVTwo} /> */}
              <Route exact path={Routes.bet} component={EventRouter} />
              <Route exact path={Routes.betApproveDirect} component={Home} />
              {/*<Route exact path={Routes.liveEvents} component={LiveEvents} />*/}
              <Route exact path={Routes.events} component={Events} />
              <Route
                exact
                path={Routes.elonWallpaper}
                component={ElonWallPaper}
              />
              <Route
                exact
                path={Routes.rouletteGame}
                component={RouletteGame}
              />
              <Route exact path={Routes.minesGame} component={MinesGame} />
              <Route exact path={Routes.plinkoGame} component={PlinkoGame} />
              <Route exact path={Routes.alpacannonGame} component={AlpacannonGame} />
              <Route exact path={Routes.rosiGame} component={RosiGame} />
              <Route exact path={Routes.activities} component={Activities} />
              <Route path={Routes.verify} component={EmailVerification} />
              <Route path={Routes.games} component={Games} />
              <Route path={Routes.resetPassword} component={ResetPassword} />
              <Route exact path={Routes.user} component={UserProfile} />
              <Route exact path={Routes.leaderboard} component={LeaderboardPage} />
              <Route exact path={Routes.oauth} component={Home} />
              <Route exact path={Routes.externalGames} component={ExternalGames} />
              <Route exact path={Routes.externalGame} component={ExternalGame} />
              {/* <PrivateRoute path={Routes.rewards} component={Rewards} /> */}
              <Route exact path={Routes.provablyfair} component={Fair} />
              <Route exact path={Routes.terms} component={TermsConditions} />
              <Route exact path={Routes.responsibleGambling} component={ResponsibleGambling} />
              <Route exact path={Routes.kyc} component={KYCPolicy} />
              <Route exact path={Routes.imprint} component={Imprint} />
              <Route exact path={Routes.privacy} component={PrivacyPolicy} />
              <PrivateRoute exact path={Routes.wallet} component={UserWallet} />
              <Redirect to={Routes.home} />
            </Switch>
            <ScrollToTop />
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </div>
  );
};

// Recalculating after resizing screen
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

export default App;

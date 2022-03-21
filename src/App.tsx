import './styles.module.scss';
import { useEffect, useState } from 'react';
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
import Events from './screens/Events';
// import LiveEvents from './screens/LiveEvents';
import RosiGame from './screens/RosiGame';
// import PlinkoGame from './screens/PlinkoGame';
// import AlpacannonGame from './screens/AlpacannonGame';
// import RouletteGame from './screens/RouletteGame';
// import MinesGame from './screens/MinesGame';
import { PersistGate } from 'redux-persist/integration/react';
import Games from './screens/Games';
import UserWallet from './screens/UserWallet'
import Activities from './screens/Activities';
import ResetPassword from './screens/ResetPassword';
import UserProfile from './screens/UserProfile';
import ExternalGames from './screens/ExternalGames';
import EvoplayGame from './screens/EvoplayGame';
import SoftswissGame from './screens/SoftswissGame';
import ExternalGame from './screens/ExternalGame';
import LeaderboardPage from 'screens/LeaderboardPage';
import { initTagManager } from './config/gtm';
import AudioContent from './components/AudioContent';
import ScrollToTop from 'utils/ScrollToTop';
// import DisclaimerPopupContainer from 'components/DisclaimerPopupContainer';
import PageTracker from 'components/PageTracker';
import EventRouter from 'components/Events/EventRouter';
// import TypeformController from 'components/TypeformController';
import ElonWallPaper from 'screens/ElonWallPaper';
import Fair from 'screens/Fair';
import TermsConditions from 'screens/TermsConditions';
import ResponsibleGambling from 'screens/ResponsibleGambling';
// import KYCPolicy from 'screens/KYCPolicy';
import Imprint from 'screens/Imprint';
import PrivacyPolicy from 'screens/PrivacyPolicy';
import PrivateRoute from 'components/PrivateRoute';
// import LandingPageV2 from 'screens/LandingPageV2';
import PlayMoneyWallet from 'screens/PlayMoneyWallet';
import Winners from 'screens/Winners';
import HowItWorks from 'screens/HowItWorks';
import Web3Listener from './components/Web3Listener';
import AMLPolicy from 'screens/AMLPolicy';

const { store, persistor } = configStore();

initTagManager();

const showUpcoming = process.env.REACT_APP_SHOW_UPCOMING_FEATURES || 'false';
const realMoneyOnly = process.env.REACT_APP_PLAYMONEY !== 'true';

const App = () => {
  const [isLoading, setLoading] = useState(true);

  const handleRefPersistent = () => {
    const locationSearch = window.location.search;
    const urlParams = new URLSearchParams(locationSearch);
    const ref = urlParams.get('ref');

    if (ref) {
      console.log(`persisting referral id ${ref}`);
      localStorage.setItem('urlParam_ref', ref);
    }
  };

  const handleVoluumPersistent = () => {
    const locationSearch = window.location.search;
    const urlParams = new URLSearchParams(locationSearch);
    const sid = urlParams.get('sid');
    const cid = urlParams.get('cid');

    if (sid) {
      console.log(`persisting sid id ${sid}`);
      localStorage.setItem('urlParam_sid', sid);
    }

    if (cid) {
      console.log(`persisting cid id ${cid}`);
      localStorage.setItem('urlParam_cid', cid);
    }
  };

  useEffect(() => {
    handleRefPersistent();
    handleVoluumPersistent();
  }, []);

  useEffect(() => {
    const el = document.querySelector(".preloader");
    if (el) {
      el.remove();
      setLoading(!isLoading);
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <div id={'main-scroll-container'}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ConnectedRouter history={history}>
            <PageTracker />
            <Web3Listener />
            <Navbar skipRoutes={[]} />
            <AlertBox />
            <Popup />
            <AudioContent />
            {/* <DisclaimerPopupContainer /> */}
            {/* <TypeformController /> */}
            <Switch>
              <Route exact path={Routes.logout} component={Logout} />
              <Route exact path={Routes.home} component={Home} />
              <Route exact path={Routes.oauth} component={Home} />
              <Route exact path={Routes.event} component={EventRouter} />
              <Route exact path={Routes.betApproveDirect} component={Home} />
              {/*<Route exact path={Routes.liveEvents} component={LiveEvents} />*/}
              <Route exact path={Routes.events} component={Events} />
              <Route exact path={Routes.elonWallpaper} component={ElonWallPaper} />
              <Route exact path={Routes.rosiGame} component={RosiGame} />
              <Route exact path={Routes.activities} component={Activities} />
              <Route exact path={Routes.winners} component={Winners} />
              <Route path={Routes.verify} component={EmailVerification} />
              <Route path={Routes.resetPassword} component={ResetPassword} />
              <Route exact path={Routes.user} component={UserProfile} />
              <Route exact path={Routes.leaderboard} component={LeaderboardPage} />
              {showUpcoming && <Route exact path={Routes.externalGames} component={ExternalGames} />}
              {/* <PrivateRoute path={Routes.rewards} component={Rewards} /> */}
              <Route exact path={Routes.provablyfair} component={Fair} />
              <Route exact path={Routes.terms} component={TermsConditions} />
              <Route exact path={Routes.aml} component={AMLPolicy} />
              <Route exact path={Routes.imprint} component={Imprint} />
              <Route exact path={Routes.privacy} component={PrivacyPolicy} />
              <PrivateRoute exact path={Routes.wallet} component={realMoneyOnly ? UserWallet : PlayMoneyWallet} />
              <Route exact path={Routes.howItWorks} component={HowItWorks} />

              {realMoneyOnly && <>
                <Route path={Routes.games} component={Games} />
                {/* <Route exact path={Routes.rouletteGame} component={RouletteGame} /> */}
                {/* <Route exact path={Routes.minesGame} component={MinesGame} /> */}
                {/* <Route exact path={Routes.plinkoGame} component={PlinkoGame} /> */}
                {/* <Route exact path={Routes.alpacannonGame} component={AlpacannonGame} /> */}
                <Route exact path={Routes.evoplayGame} component={EvoplayGame} />
                <Route exact path={Routes.softswissGame} component={SoftswissGame} />
                <Route exact path={Routes.externalGame} component={ExternalGame} />
                <Route exact path={Routes.responsibleGambling} component={ResponsibleGambling} />
                {/* <Route exact path={Routes.kyc} component={KYCPolicy} /> */}
              </>}

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

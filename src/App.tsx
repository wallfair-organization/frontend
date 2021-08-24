import "./styles.module.scss";
import { YMInitializer } from "react-yandex-metrika";
import AlertBox from "./components/AlertBox";
import Bet from "./screens/Bet";
import Home from "./screens/Home";
import Logout from "./screens/Logout";
import Popup from "./components/Popup";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import Routes from "./constants/Routes";
import WalletDeposit from "./screens/WalletDeposit";
import store from "./store";
import TermsAndConditions from "./screens/TermsAndConditions";
import PaymentConfirmation from "./screens/PaymentConfirmation";
import Wallet from "./screens/Wallet";
import BetOverview from "./screens/BetOverview";
import Join from "./screens/Join";
import EmailVerification from "./screens/EmailVerification";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./store";
import { Provider } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "components/Navbar";
import NavbarFooter from "components/NavbarFooter";
import NavbarFooterAction from "components/NavbarFooterAction";
import IconType from "components/Icon/IconType";
import Events from "./screens/Events";
import LiveEvents from "./screens/LiveEvents";
import RosiGame from "./screens/RosiGame";

const configuredStore = store();

const App = () => {
    return (
            <Provider store={configuredStore}>
                <ConnectedRouter history={history}>
                    <Navbar skipRoutes={[Routes.join]} />
                    <AlertBox />
                    <Popup />
                    <YMInitializer
                        accounts={[82927219]}
                        options={{
                            clickmap: true,
                            trackLinks: true,
                            accurateTrackBounce: true,
                            webvisor: true,
                        }}
                    />
                    <Switch>
                        <Route exact path={Routes.logout} component={Logout} />
                        <Route exact path={Routes.join} component={Join} />
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
                        <Route
                            exact
                            path={Routes.walletDeposit}
                            component={WalletDeposit}
                        />
                        <Route
                            exact
                            path={Routes.walletConfirmation}
                            component={PaymentConfirmation}
                        />
                        <Route
                            exact
                            path={Routes.liveEvents}
                            component={LiveEvents}
                        />
                        <Route exact path={Routes.events} component={Events} />
                        <Route exact path={Routes.rosiGame} component={RosiGame} />
                        <Route path={Routes.wallet} component={Wallet} />
                        <Route path={Routes.betOverview} component={BetOverview} />
                        <Route path={Routes.verify} component={EmailVerification} />
                        <Redirect to={Routes.home} />
                    </Switch>
                    <NavbarFooter
                        skipRoutes={[Routes.bet, Routes.join, Routes.verify]}
                    >
                        <NavbarFooterAction
                            route={Routes.home}
                            iconType={IconType.home}
                            text="Home"
                        />
                        <NavbarFooterAction
                            route={Routes.liveEvents}
                            iconType={IconType.camera}
                            text="Live Stream"
                        />
                        <NavbarFooterAction
                            route={Routes.events}
                            iconType={IconType.bet2}
                            text="Events"
                        />
                        <NavbarFooterAction
                            route={Routes.rosiGame}
                            iconType={IconType.shuttle}
                            text="Rosi Game"
                        />
                    </NavbarFooter>
                </ConnectedRouter>
            </Provider>
    );
};

// Recalculating after resizing screen
window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty("--vh", `${vh}px`);
});

export default App;

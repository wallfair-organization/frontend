import styles from './styles.module.scss';
import LogoDemo from '../../data/images/logo-demo.svg';
import _ from 'lodash';
import { connect } from 'react-redux';
import BaseContainerWithNavbar from '../../components/BaseContainerWithNavbar';
import FixedEventCreationIconButton from '../../components/FixedEventCreationIconButton';
import Header from '../../components/Header/index';
import EventsCarouselContainer from '../../components/EventsCarouselContainer';
import Leaderboard from '../../components/Leaderboard';
import CategoryList from '../../components/CategoryList';
import { EVENT_CATEGORIES } from '../../constants/EventCategories';
import { Link } from 'react-router-dom';
import { LeaderboardActions } from '../../store/actions/leaderboard';
import { EventActions } from 'store/actions/event';
import { useIsMount } from 'components/hoc/useIsMount';
import { useEffect } from 'react';
import Routes from 'constants/Routes';
import { LOGGED_IN } from 'constants/AuthState';

const Home = ({ events, tags, openDrawer, user, fetchTags }) => {
    const isMount = useIsMount();

    useEffect(() => {
        if (isMount) {
            fetchTags();
        }
    }, []);

    const renderEventCreationButton = () => {
        return <FixedEventCreationIconButton />;
    };

    const onSeeLeaderboard = () => {
        window.scrollTo(0, 0);
        openDrawer();
    };

    const renderTags = () => {
        return (
            <div className={styles.tags}>
                {tags &&
                    tags.map(tag => {
                        return <div className={styles.tag}>#{tag}</div>;
                    })}
            </div>
        );
    };

    const renderRosiBanner = () => {
        return (
            <Link to={Routes.rosiGame}>
                <div className={styles.banner}>
                    <div className={styles.title}>
                        Play the
                        <br />
                        Rosi Game
                    </div>
                </div>
            </Link>
        );
    };

    const renderCategoriesAndLeaderboard = () => {
        return (
            <div className={styles.bottomWrapper}>
                <div className={styles.categories}>
                    <div className={styles.headline}>Discover Categories</div>
                    <CategoryList categories={EVENT_CATEGORIES} />
                    {renderTags()}
                </div>
                <div className={styles.leaderboard}>
                    <div className={styles.headline}>
                        Community Leaderboard
                        {user.authState == LOGGED_IN && (
                            <div
                                className={styles.leaderboardLink}
                                onClick={onSeeLeaderboard}
                            >
                                See Leaderboard
                            </div>
                        )}
                    </div>
                    <Leaderboard fetch={true} small={true} />
                </div>
            </div>
        );
    };

    const renderFooter = () => {
        return (
            <div className={styles.footer}>
                <img src={LogoDemo} width={150} alt={'Wallfair'} />
                <div className={styles.links}>
                    <span>Copyright 2021 Wallfair</span>
                    <Link to={'/privacy-policy'}>Imprint</Link>
                    <Link to={'/terms-and-conditions'}>
                        {'Terms & Conditions'}
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <BaseContainerWithNavbar>
            <Header events={events} />
            <div className={styles.containerWrapper}>
                <div className={styles.container}>
                    <EventsCarouselContainer eventType="streamed" />
                    <EventsCarouselContainer eventType="non-streamed" />
                    {renderRosiBanner()}
                    {renderCategoriesAndLeaderboard()}
                    {renderFooter()}
                </div>
            </div>
            {/* {renderEventCreationButton()} -> TODO: Check if needed */}
        </BaseContainerWithNavbar>
    );
};

const mapStateToProps = state => {
    return {
        events: state.event.events,
        tags: state.event.tags,
        user: state.authentication,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        openDrawer: () => {
            dispatch(LeaderboardActions.handleDrawer({ open: true }));
        },
        fetchTags: () => {
            dispatch(EventActions.fetchTags());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

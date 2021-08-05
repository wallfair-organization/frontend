import _                  from 'lodash';
import styles             from './styles.module.scss';
import { connect }        from 'react-redux';
import { getDefaultUser } from '../../helper/Profile';
import TimeLeftCounter              from 'components/TimeLeftCounter';
import Icon from 'components/Icon';
import StateBadge from 'components/StateBadge';

const RelatedBetCard = ({ onClick, bet }) => {
    const renderFooter = () => {    
        return (
            <div className={styles.pillFooter}>
                <div className={styles.timeLeftCounterContainer}>
                    <span>
                        Event ends in:
                    </span>
                    <TimeLeftCounter endDate={bet.endDate} />
                </div>
            </div>
        );
    };

    return (
        <div
            className={styles.relatedBetCard}
            onClick={onClick}
        >
            <div className={styles.relatedBetCardContainer}>
                <div className={styles.relatedBetCardHeader}>
                    <span className={styles.title}>
                        {bet.marketQuestion}
                    </span>

                    <span className={styles.menuIcon}>
                        <Icon iconType={ 'threeDotMenu' }/>
                    </span>
                </div>
                <div className={styles.stateBadgeContainer}>
                    <StateBadge state={_.get(bet, 'status')} />
                </div>
            </div>
            {renderFooter()}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const { userId } = ownProps;
    let user         = getDefaultUser();

    if (userId) {
        user = _.get(
            state.user.users,
            userId,
        );
    }

    return {
        user: user,
    };
};

export default connect(
    mapStateToProps,
    null,
)(RelatedBetCard);

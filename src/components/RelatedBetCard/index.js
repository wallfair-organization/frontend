import _                  from 'lodash';
import styles             from './styles.module.scss';
import { connect }        from 'react-redux';
import { getDefaultUser } from '../../helper/Profile';
import TimeLeftCounter    from 'components/TimeLeftCounter';
import StateBadge         from 'components/StateBadge';
import Icon               from 'components/Icon';

const RelatedBetCard = ({ onClick, title, bet }) => {

    const renderFooter = () => {
        const tradeEnd = new Date(_.get(bet, 'endDate'));

        return (
            <div className={styles.relatedBetCardFooter}>
                <div className={styles.timeLeftCounterContainer}>
                    <span>
                        End of Trade:
                    </span>
                    <TimeLeftCounter endDate={tradeEnd} />
                </div>
            </div>
        );
    };

    return (
            <div
                className={styles.relatedBetCard}
                onClick={onClick}
            >
                <div className={styles.relatedBetCardContent}>

                    <span className={styles.title}>
                        {title}
                    </span>

                    <span className={styles.menuIcon}>
                        <Icon iconType={'threeDotMenu'} />
                    </span>

                    <StateBadge state={_.get(bet, 'status')} />
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

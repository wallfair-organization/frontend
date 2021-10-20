import style from './styles.module.scss';
import { LeaderboardActions } from '../../store/actions/leaderboard';
import _ from 'lodash';
import LeaderboardItem from '../LeaderboardItem';
import { connect, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { LOGGED_IN } from 'constants/AuthState';
import { selectLeaderboard } from 'store/selectors/leaderboard';
import { selectUser } from 'store/selectors/authentication';
import classNames from 'classnames';

const Leaderboard = ({
  fetchLeaderboard,
  fetchByUser,
  fetch = false,
  setMissingAmount = () => {},
  small = false,
  headingClass,
  userRef,
}) => {
  const LIMIT = small ? 5 : 10;
  const SKIP_FOR_CURRENT = small ? 1 : 3;
  const LIMIT_FOR_CURRENT = 5;

  const [fetched, setFetched] = useState(false);

  const leaderboard = useSelector(selectLeaderboard);

  const users = _.get(leaderboard, 'users', []);
  const usersWithCurrent = _.get(leaderboard, 'usersWithCurrent', []);
  const usersWithSelected = _.get(leaderboard, 'usersWithSelected', []);
  const user = useSelector(selectUser);

  const isLoggedIn = () => user.authState === LOGGED_IN;

  useEffect(() => {
    if (fetch && !fetched && !userRef) {
      fetchLeaderboard(
        0,
        LIMIT,
        isLoggedIn(),
        SKIP_FOR_CURRENT,
        small ? 1 : LIMIT_FOR_CURRENT
      );
      setMissingAmount(getMissingWinnerAmount());
      setFetched(true);
    }
  }, [fetch, fetched]);

  useEffect(() => {
    if (userRef) {
      fetchByUser(userRef.rank > 6 ? userRef.rank - 6 : 0, 11);
    }
  }, [userRef, fetchByUser]);

  const getMissingWinnerAmount = () => {
    const first = users[0];
    if (users.length === 0 || first._id === user.userId) return 0;
    return first.amountWon - user.amountWon;
  };

  const onLeaderboardLoad = () => {
    fetchLeaderboard(
      users.length,
      LIMIT,
      false,
      SKIP_FOR_CURRENT,
      LIMIT_FOR_CURRENT
    );
  };

  const onAfterCurrentLeaderboardLoad = () => {
    const last = usersWithCurrent[usersWithCurrent.length - 1];
    const skip =
      small && usersWithCurrent.length === 1 ? last.rank : last.rank - 1;
    fetchLeaderboard(skip, 0, true, SKIP_FOR_CURRENT, LIMIT_FOR_CURRENT);
  };

  const onSelectedUserLoad = () => {
    fetchByUser(usersWithSelected[usersWithSelected.length - 1].rank, 10, true);
  };

  const renderItems = (list, user, onLoad) => {
    return list.map(u => {
      return (
        <LeaderboardItem
          user={u}
          isCurrentUser={u._id === user.userId}
          key={u.rank}
          showLoadButton={list[list.length - 1] === u}
          onLoad={onLoad}
          skipUsernameSuffix={userRef}
        />
      );
    });
  };

  return (
    <div className={style.leaderboardTable}>
      <div className={classNames(style.tableHeadings, headingClass)}>
        <p className={style.rankingHeading}>RANKING</p>
        <p className={style.userHeading}>USER</p>
        <p className={style.tokenHeading}>TOKENS WON</p>
      </div>
      <div className={style.leaderboardRanking}>
        {!userRef &&
          users &&
          renderItems(users, user, () => onLeaderboardLoad())}

        {!userRef &&
          isLoggedIn() &&
          usersWithCurrent &&
          renderItems(usersWithCurrent, user, () =>
            onAfterCurrentLeaderboardLoad()
          )}

        {userRef &&
          usersWithSelected &&
          renderItems(usersWithSelected, userRef, () => onSelectedUserLoad())}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLeaderboard: (
      skip,
      limit,
      fetchAfterCurrent = false,
      skipForCurrent,
      limitForCurrent
    ) => {
      dispatch(
        LeaderboardActions.fetchAll({
          skip,
          limit,
          fetchAfterCurrent,
          skipForCurrent,
          limitForCurrent,
        })
      );
    },
    fetchByUser: (skip, limit, paginate = false) => {
      dispatch(LeaderboardActions.fetchByUser({ skip, limit, paginate }));
    },
  };
};

export default connect(null, mapDispatchToProps)(Leaderboard);

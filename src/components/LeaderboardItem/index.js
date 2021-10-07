import { Link } from 'react-router-dom';
import style from './styles.module.scss';
import medalGold from '../../data/icons/medal-gold.png';
import medalSilver from '../../data/icons/medal-silver.png';
import medalBronze from '../../data/icons/medal-bronze.png';
import { formatToFixed } from 'helper/FormatNumbers';
import classNames from 'classnames';

const LeaderboardItem = ({
  user,
  isCurrentUser = false,
  showLoadButton = false,
  onLoad,
}) => {
  const renderLoadButton = () => {
    return (
      <>
        <div className={style.placeSeperate} />
        <div className={style.tableEntryHolder}>
          <div className={style.loadButton} onClick={onLoad}>
            Load more
          </div>
        </div>
      </>
    );
  };

  const getUsername = () => {
    let formattedUsername = user.username;

    if (formattedUsername.length > 20) {
      formattedUsername = formattedUsername.substring(0, 17) + '...';
    }

    if (isCurrentUser) return formattedUsername + ' (You)';
    return formattedUsername;
  };

  return (
    <>
      {user.rank === 1 ? (
        <>
          <div className={style.placeSeperate} />
          <div className={style.tableFirst}>
            <p className={style.firstRank}>
              #{user.rank} <img src={medalGold} alt="medal" />
            </p>
            <p className={style.firstName}>
              <Link to={`/user/${user._id}`}>{getUsername(user.username)}</Link>
            </p>
            <p className={style.firstBalance}>
              {formatToFixed(user.amountWon)}
            </p>
          </div>
        </>
      ) : user.rank === 2 ? (
        <>
          <div className={style.placeSeperate} />
          <div className={style.tableSecond}>
            <p className={style.secondRank}>
              #{user.rank} <img src={medalSilver} alt="medal" />
            </p>
            <p className={style.secondName}>
              <Link to={`/user/${user._id}`}>{getUsername(user.username)}</Link>
            </p>
            <p className={style.secondBalance}>
              {formatToFixed(user.amountWon)}
            </p>
          </div>
        </>
      ) : user.rank === 3 ? (
        <>
          <div className={style.placeSeperate} />
          <div className={style.tableThird}>
            <p className={style.thirdRank}>
              #{user.rank} <img src={medalBronze} alt="medal" />
            </p>
            <p className={style.thirdName}>
              <Link to={`/user/${user._id}`}>{getUsername(user.username)}</Link>
            </p>
            <p className={style.thirdBalance}>
              {formatToFixed(user.amountWon)}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className={style.placeSeperate} />
          <div
            className={classNames(
              style.tableEntryHolder,
              isCurrentUser && style.tableCurrentUser
            )}
          >
            <p className={style.entryRank}>#{user.rank}</p>
            <p className={style.entryName}>
              <Link to={`/user/${user._id}`}>{getUsername(user.username)}</Link>
            </p>
            <p className={style.entryBalance}>
              {formatToFixed(user.amountWon)}
            </p>
          </div>
          {showLoadButton && renderLoadButton()}
        </>
      )}
    </>
  );
};

export default LeaderboardItem;

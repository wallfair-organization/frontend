import _ from 'lodash';
import { Link } from 'react-router-dom';
import style from './styles.module.scss';
import medalGold from '../../data/icons/medal-first.png';
import medalSilver from '../../data/icons/medal-second.png';
import medalBronze from '../../data/icons/medal-third.png';
import medalCoin from '../../data/icons/medal-coin.png';
import { formatToFixed } from 'helper/FormatNumbers';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { REWARD_TOKEN_NAME } from '../../constants/Token';

const topRewards = {
  1: 6200,
  2: 4450,
  3: 3750,
  4: 2970,
  5: 2400,
  6: 1980,
  7: 1500,
  8: 1000,
  9: 500,
  10: 250,
};

const LeaderboardItem = ({
  user,
  isCurrentUser = false,
  showLoadButton = false,
  skipUsernameSuffix = false,
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

    if (isCurrentUser && !skipUsernameSuffix)
      return formattedUsername + ' (You)';

    return formattedUsername;
  };

  return (
    <>
      <ReactTooltip
        id="userRankingTooltip"
        place="top"
        effect="solid"
        className={style.rankingTooltip}
      ></ReactTooltip>

      {user.rank === 1 ? (
        <>
          <div
            className={classNames(
              style.tableFirst,
              isCurrentUser && style.tableCurrentUser
            )}
          >
            <p className={style.firstRank}>
              #{user.rank}{' '}
              <img
                data-for={'userRankingTooltip'}
                data-tip={`Reward: ${_.get(
                  topRewards,
                  user.rank
                )} ${REWARD_TOKEN_NAME}`}
                src={medalGold}
                alt="medal"
              />
            </p>
            <p className={style.firstName}>
              <Link to={`/user/${user._id}`}>{getUsername(user.username)}</Link>
            </p>
            <p className={style.firstBalance}>
              {formatToFixed(user.amountWon, 0, true)}
            </p>
          </div>
        </>
      ) : user.rank === 2 ? (
        <>
          <div className={style.placeSeperate} />
          <div
            className={classNames(
              style.tableSecond,
              isCurrentUser && style.tableCurrentUser
            )}
          >
            <p className={style.secondRank}>
              #{user.rank}{' '}
              <img
                data-for={'userRankingTooltip'}
                data-tip={`Reward: ${_.get(
                  topRewards,
                  user.rank
                )} ${REWARD_TOKEN_NAME}`}
                src={medalSilver}
                alt="medal"
              />
            </p>
            <p className={style.secondName}>
              <Link to={`/user/${user._id}`}>{getUsername(user.username)}</Link>
            </p>
            <p className={style.secondBalance}>
              {formatToFixed(user.amountWon, 0, true)}
            </p>
          </div>
        </>
      ) : user.rank === 3 ? (
        <>
          <div className={style.placeSeperate} />
          <div
            className={classNames(
              style.tableThird,
              isCurrentUser && style.tableCurrentUser
            )}
          >
            <p className={style.thirdRank}>
              #{user.rank}{' '}
              <img
                data-for={'userRankingTooltip'}
                data-tip={`Reward: ${_.get(
                  topRewards,
                  user.rank
                )} ${REWARD_TOKEN_NAME}`}
                src={medalBronze}
                alt="medal"
              />
            </p>
            <p className={style.thirdName}>
              <Link to={`/user/${user._id}`}>{getUsername(user.username)}</Link>
            </p>
            <p className={style.thirdBalance}>
              {formatToFixed(user.amountWon, 0, true)}
            </p>
          </div>
        </>
      ) : user.rank <= 9 ? (
        <>
          <div className={style.placeSeperate} />
          <div
            className={classNames(
              style.tableThird,
              isCurrentUser && style.tableCurrentUser
            )}
          >
            <p className={style.fourthRank}>
              #{user.rank}{' '}
              <img
                data-for={'userRankingTooltip'}
                data-tip={`Reward: ${_.get(
                  topRewards,
                  user.rank
                )} ${REWARD_TOKEN_NAME}`}
                src={medalCoin}
                alt="medal"
              />
            </p>
            <p className={style.thirdName}>
              <Link to={`/user/${user._id}`}>{getUsername(user.username)}</Link>
            </p>
            <p className={style.thirdBalance}>
              {formatToFixed(user.amountWon, 0, true)}
            </p>
          </div>
          {showLoadButton && renderLoadButton()}
        </>
      ) : (
        <>
          <div className={style.placeSeperate} />
          <div
            className={classNames(
              style.tableEntryHolder,
              isCurrentUser && style.tableCurrentUser,
              user.rank <= 10 && style.tableThird
            )}
          >
            {user.rank <= 10 ? (
              <p className={style.fourthRank}>
                #{user.rank}{' '}
                <img
                  data-for={'userRankingTooltip'}
                  data-tip={`Reward: ${_.get(
                    topRewards,
                    user.rank
                  )} ${REWARD_TOKEN_NAME}`}
                  src={medalCoin}
                  alt="medal"
                />
              </p>
            ) : (
              <p className={style.entryRank}>#{user.rank}</p>
            )}
            <p className={style.entryName}>
              <Link to={`/user/${user._id}`}>{getUsername(user.username)}</Link>
            </p>
            <p className={style.entryBalance}>
              {formatToFixed(user.amountWon, 0, true)}
            </p>
          </div>
          {showLoadButton && renderLoadButton()}
        </>
      )}
    </>
  );
};

export default LeaderboardItem;

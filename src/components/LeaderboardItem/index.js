import _ from 'lodash';
import { Link } from 'react-router-dom';
import style from './styles.module.scss';
import medalGold from '../../data/icons/medal-first.png';
import medalSilver from '../../data/icons/medal-second.png';
import medalBronze from '../../data/icons/medal-third.png';
import medalCoin from '../../data/icons/medal-coin.png';
import { formatToFixed } from 'helper/FormatNumbers';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectPrices } from 'store/selectors/info-channel';
import { selectUser } from 'store/selectors/authentication';
import { convertAmount, currencyDisplay } from 'helper/Currency';
import { TOKEN_NAME } from 'constants/Token';

const LeaderboardItem = ({
  user,
  isCurrentUser = false,
  showLoadButton = false,
  skipUsernameSuffix = false,
  onLoad,
  loadMore = true,
}) => {

  const prices = useSelector(selectPrices);
  const { gamesCurrency: userCurrency } = useSelector(selectUser);

  const amountWonUserCurrency = userCurrency === currencyDisplay(TOKEN_NAME) 
  ? `${formatToFixed(user?.amountWon, 0, true)} ${currencyDisplay(TOKEN_NAME)}`
  : `${formatToFixed(convertAmount(user?.amountWon, prices[userCurrency]), 2, true)} ${userCurrency}`;

  
  const renderLoadButton = () => {
    return (
      <>
        {/* <div className={style.placeSeperate} /> */}
        <div className={style.tableEntryHolder}>
          <span className={style.loadButton} onClick={onLoad}>
            Load more
          </span>
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
      {user.rank === 1 ? (
        <>
          <div
            className={classNames(
              style.tableFirst,
              isCurrentUser && style.tableCurrentUser
            )}
          >
            <p className={style.firstRank}>
              #{user.rank} <img src={medalGold} alt="medal" />
            </p>
            <p className={style.firstName}>
              <Link to={`/user/${user._id}`}>{getUsername(user.username)}</Link>
            </p>
            <p className={style.firstBalance}>
              {amountWonUserCurrency}
            </p>
          </div>
        </>
      ) : user.rank === 2 ? (
        <>
          {/* <div className={style.placeSeperate} /> */}
          <div
            className={classNames(
              style.tableSecond,
              isCurrentUser && style.tableCurrentUser
            )}
          >
            <p className={style.secondRank}>
              #{user.rank} <img src={medalSilver} alt="medal" />
            </p>
            <p className={style.secondName}>
              <Link to={`/user/${user._id}`}>{getUsername(user.username)}</Link>
            </p>
            <p className={style.secondBalance}>
              {amountWonUserCurrency}
            </p>
          </div>
        </>
      ) : user.rank === 3 ? (
        <>
          {/* <div className={style.placeSeperate} /> */}
          <div
            className={classNames(
              style.tableThird,
              isCurrentUser && style.tableCurrentUser
            )}
          >
            <p className={style.thirdRank}>
              #{user.rank} <img src={medalBronze} alt="medal" />
            </p>
            <p className={style.thirdName}>
              <Link to={`/user/${user._id}`}>{getUsername(user.username)}</Link>
            </p>
            <p className={style.thirdBalance}>
              {amountWonUserCurrency}
            </p>
          </div>
        </>
      ) : user.rank <= 9 ? (
        <>
          {/* <div className={style.placeSeperate} /> */}
          <div
            className={classNames(
              style.tableThird,
              isCurrentUser && style.tableCurrentUser
            )}
          >
            <p className={style.fourthRank}>
              #{user.rank} <img src={medalCoin} alt="medal" />
            </p>
            <p className={style.thirdName}>
              <Link to={`/user/${user._id}`}>{getUsername(user.username)}</Link>
            </p>
            <p className={style.thirdBalance}>
              {amountWonUserCurrency}
            </p>
          </div>
          {showLoadButton && loadMore && renderLoadButton()}
        </>
      ) : (
        <>
          {/* <div className={style.placeSeperate} /> */}
          <div
            className={classNames(
              style.tableEntryHolder,
              isCurrentUser && style.tableCurrentUser,
              user.rank <= 10 && style.tableThird
            )}
          >
            {user.rank <= 10 ? (
              <p className={style.fourthRank}>
                #{user.rank} <img src={medalCoin} alt="medal" />
              </p>
            ) : (
              <p className={style.entryRank}>#{user.rank}</p>
            )}
            <p className={style.entryName}>
              <Link to={`/user/${user._id}`}>{getUsername(user.username)}</Link>
            </p>
            <p className={style.entryBalance}>
              {amountWonUserCurrency}
            </p>
          </div>
          {showLoadButton && loadMore && renderLoadButton()}
        </>
      )}
    </>
  );
};

export default LeaderboardItem;

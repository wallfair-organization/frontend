import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { formatToFixed } from 'helper/FormatNumbers';
import { getLeaderboard } from 'api';
import Link from 'components/Link';
import WfairTokenEmblem from 'data/images/token/wfair_token_emblem.png';
import JackpotImg from 'data/images/carousel/jackpot.png';
import Loader from 'components/Loader/Loader';

const LeaderboardJackpot = ({ fetch = false }) => {
  const LEADERBOARD_TYPE = 'jackpot_winners';
  const [jackpotUsers, setJackpotUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const prizeType = [
    'Highest cashout from Events',
    'Highest cashout from Games',
    'Event creator with highest volume',
  ]

  useEffect(() => {
    if (fetch) {
      setLoading(true);
      getLeaderboard(LEADERBOARD_TYPE, 0, 3)
        .then(res => {
          setJackpotUsers(res.data.users);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [fetch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        jackpotUsers.length > 0 && (
          <div className={styles.jackpotContainer}>
            <div className={styles.jackpotInfo}>
              <div className={styles.header}>
                <h3>Jackpot winners</h3>
                <h3>of yesterday</h3>
              </div>

              <div className={styles.infoList}>
                {jackpotUsers.map((user, index) => {
                  return (
                    <div className={styles.userContainer}>
                      <span>{prizeType[index]}</span>
                      <div className={styles.userInfo}>
                        <div className={styles.imgs}>
                          <img
                            src={user.profilePicture || WfairTokenEmblem}
                            alt=""
                            className={styles.profilePicture}
                          />
                        </div>
                        <Link
                          className={styles.username}
                          to={`/user/${user._id}`}
                        >
                          {user.username}
                        </Link>
                        <div className={styles.amoun}>
                          {formatToFixed(user.amountWon, 0, true)} <b>PFAIR</b>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <img src={JackpotImg} alt="" className={styles.jackpotImage} />
          </div>
        )
      )}
    </>
  );
};

export default LeaderboardJackpot;

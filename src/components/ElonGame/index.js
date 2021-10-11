import React from 'react';

import styles from './styles.module.scss';
import ElonInSpace from '../../data/backgrounds/elon/elon-in-space.png';
import { ELON_GAME_STEPS } from 'constants/ElonGame';
import Routes from 'constants/Routes';
import { Link } from 'react-router-dom';
import YellowButton from 'components/YellowButton';

const ElonGame = props => {
  return (
    <div className={styles.elonGameWrapper}>
      <div className={styles.headerTitle}>Elon Game</div>
      <Link data-tracking-id="games-play-elon" to={Routes.rosiGame}>
        <div className={styles.elonGameContainer}>
          <div className={styles.leftColumn}>
            <div className={styles.imgWrapper}>
              <img src={ElonInSpace} alt="elon" />
            </div>
            <div className={styles.buttonWrapper}>
              <YellowButton>Play now</YellowButton>
            </div>
          </div>

          <div className={styles.rightColumn}>
            {ELON_GAME_STEPS.map(step => (
              <div className={styles.stepContainer} key={step.number}>
                <div className={styles.numberStep}>{step.number}</div>
                <div
                  className={styles.textContainer}
                  style={{ marginLeft: step.marginLeftText }}
                >
                  <div className={styles.title}>{step.title}</div>
                  <div className={styles.description}>{step.description}</div>
                </div>
                <div className={styles.imageContainer}>
                  {step.imageText && (
                    <div className={styles.imageText}>{step.imageText}</div>
                  )}
                  {step.svg}
                  <img src={step.image} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ElonGame;

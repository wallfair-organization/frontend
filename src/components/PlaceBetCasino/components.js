import styles from './styles.module.scss';
import classNames from 'classnames';
import Input from '../Input';
import { TOKEN_NAME } from 'constants/Token';
import { currencyDisplay } from 'helper/Currency';


export const RiskInput = ({risk, setRisk, number, disable}) => {
  return(
    <div className={styles.inputContainer}>
      <label
        className={styles.label}
      >
        Choose Risk Level
      </label>
      <div className={styles.riskSelection}>
        {Array.from({length: number}).map((level, index) =>
          <button
            key={index}
            style={{opacity: disable && 0.5, cursor: disable && 'not-allowed'}}
            data-tracking-id={`alpacawheel-change-risk-${index+1}`}
            className={risk === (index + 1) ? styles.selected : undefined}
            onClick={() => !disable && setRisk(index+1)}
          >
            <span>{index+1}</span>
          </button>
        )}
      </div>
    </div>
  )
}

export const NgamesInput = ({ngame, setNgame, game, text}) => {
  return(
    <div className={styles.inputContainer}>
      <label
        className={styles.label}
      >
        {text}
      </label>
      <div
        className={classNames(
          styles.cashedOutInputContainer,
          styles.demoInput
        )}
      >
        <Input
          className={classNames(styles.input)}
          type={'number'}
          value={ngame}
          onChange={(e) => setNgame(Math.floor(e.target.value) > 0 ? Math.floor(e.target.value) : 1)}
          step={1}
          min="1"
          max={'100'}
        />
        <span className={styles.eventTokenLabel}>
          <span>Spins</span>
        </span>
        <div className={styles.buttonWrapper}>
          <span
            className={styles.buttonItem}
            data-tracking-id="alpacawheel-change-spins-minus"
            onClick={() => ngame > 0 && setNgame(ngame - 1)}
          >
            -
          </span>
          <span
            className={styles.buttonItem}
            data-tracking-id="alpacawheel-change-spins-plus"
            onClick={() => ngame < 100 && setNgame(ngame + 1)}
          >
            +
          </span>
          <span
            className={styles.buttonItem}
            data-tracking-id="alpacawheel-change-spins-max"
            onClick={() => setNgame(10)}
          >
            10
          </span>
        </div>
      </div>
      {game.ngame > 0 &&
        <div className={styles.spinsleft}>
          {game.ngame} spins left
        </div>
      }
    </div>
  )
}

export const StandardInput = ({setValue, value, title, currency = TOKEN_NAME}) => {
  return(
    <div className={styles.inputContainer}>
      <label
        className={styles.label}
      >
        {title}
      </label>
      <div
        className={classNames(
          styles.cashedOutInputContainer,
          styles.demoInput
        )}
      >
        <Input
          className={styles.input}
          type={'number'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          step={1}
          min="1"
          max={'100'}
        />
        <span className={styles.eventTokenLabel}>
          <span>{currencyDisplay(currency)}</span>
        </span>
      </div>
    </div>
  )
}

export const ToggleInput = ({setValue, value, setToggle, toggle, title}) => {
  return(
    <div className={styles.inputContainer}>
      <label
        className={classNames(
          styles.label,
        )}
      >
        {title}
      </label>
      <div
        className={classNames(
          styles.cashedOutInputContainer,
          styles.demoInput
        )}
      >
        <div className={styles.toggleButton}>
          <span className={styles.toggleLabel} style={{ marginLeft: toggle ? 1 : '44.2%', width: !toggle && '55%'}}></span>
          <span
            className={classNames(styles.buttonItem, toggle && styles.selected)}
            onClick={() => setToggle(true)}
          >
            Reset
          </span>
          <span
            className={classNames(styles.buttonItem, !toggle && styles.selected)}
            onClick={() => setToggle(false)}
          >
            Increase
          </span>
        </div>
        <Input
          className={classNames(styles.input)}
          type={'number'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          step={1}
          min="0"
          max={'100'}
        />
        <span className={styles.eventTokenLabel}>
          <span>%</span>
        </span>
      </div>
    </div>
  )
}

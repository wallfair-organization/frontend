import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import styles from './styles.module.scss';

const TSlider = withStyles({
  root: {
    color: '#6751EC',
    height: 6,
  },
  thumb: {
    height: 33,
    width: 33,
    backgroundColor: '#fff',
    border: '8px solid currentColor',
    marginTop: -14,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50%)',
    top: -32,
    '& *': {
      background: 'transparent',
      color: '#000',
      fontFamily: 'PlusJakarta-Regular',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: 700,
      letterSpacing: 0,
      textAlign: 'left',
    },
  },
  track: {
    height: 6,
    borderRadius: 3,
  },
  rail: {
    height: 6,
    borderRadius: 3,
    color: '#6751EC',
    opacity: 1,
  },
  mark: {
    width: 6,
    height: 6,
    backgroundColor: '#fff',
    borderRadius: '50%',
  },
  markLabel: {
    top: -15,
    fontFamily: 'PlusJakarta-Regular',
    fontSize: 11,
    fontStyle: 'normal',
    fontWeight: 400,
    letterSpacing: 0,
    textAlign: 'left',
    marginLeft: -1,
  },
})(Slider);

const TokenSlider = ({ value, setValue, maxValue, ...props }) => {
  if (maxValue < 1) {
    maxValue = 2800;
  }

  const marks = [
    {
      value: 0,
      label: '0%',
    },
    {
      value: 0.25 * maxValue,
      label: '25%',
    },
    {
      value: 0.5 * maxValue,
      label: '50%',
    },
    {
      value: 0.75 * maxValue,
      label: '75%',
    },
    {
      value: maxValue,
      label: '100%',
    },
  ];

  const valuetext = value => {
    return `${value}%`;
  };

  return (
    <TSlider
      valueLabelDisplay="off"
      aria-label="Restricted values"
      min={1}
      max={maxValue}
      value={value}
      getAriaValueText={valuetext}
      onChange={(event, v) => {
        setValue(v);
      }}
      className={styles.tokenSlider}
      marks={marks}
      step={null}
    />
  );
};
export default TokenSlider;

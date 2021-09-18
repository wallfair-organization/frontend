import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import styles from './styles.module.scss';

const TSlider = withStyles({
  root: {
    color: '#6751EC',
    height: 6,
    opacity: '0.6',
  },
  thumb: {
    height: 30,
    width: 30,
    marginTop: -14,
    marginLeft: -12,
    backgroundColor: '#fff',
    border: '3px solid currentColor',
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-10%)',
    top: -32,
    '& *': {
      background: 'transparent',
      color: '#000',
      fontFamily: 'PlusJakarta-Regular',
      fontSize: 12,
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
    width: 10,
    height: 10,
    borderRadius: '50%',
    color: '#6751EC !important',
    marginTop: -2,
    marginLeft: -4,
  },
  markLabel: {
    top: -5,
    fontFamily: 'PlusJakarta-Regular',
    fontSize: 11,
    fontStyle: 'normal',
    fontWeight: 400,
    letterSpacing: 0,
    textAlign: 'left',
    // marginLeft: -1,
  },
})(Slider);

const TokenSlider = ({ value, setValue, maxValue, ...props }) => {
  if (maxValue < 1) {
    maxValue = 2800;
  }

  const marks = [
    {
      value: maxValue * 0.0,
      label: '0%',
    },
    {
      value: maxValue * 0.25,
      label: '25%',
    },
    {
      value: maxValue * 0.5,
      label: '50%',
    },
    {
      value: maxValue * 0.75,
      label: '75%',
    },
    {
      value: maxValue * 1.0,
      label: '100%',
    },
  ];

  return (
    <TSlider
      valueLabelDisplay="auto"
      aria-label="pretto slider"
      min={1}
      max={maxValue}
      value={value}
      onChange={(event, v) => {
        setValue(v);
      }}
      valueLabelDisplay="on"
      valueLabelFormat={val => `${((val * 100) / maxValue).toFixed(2)}%`}
      className={styles.tokenSlider}
      marks={marks}
    />
  );
};
export default TokenSlider;

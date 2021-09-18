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
    width: 0,
    height: 0,
  },
  markLabel: {
    top: -5,
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

  value = (value / maxValue) * 100;

  const marks = [
    { value: 0, label: '0%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
  ];

  function valueLabelFormat(value) {
    return parseInt(value) + '%';
  }

  return (
    <TSlider
      valueLabelDisplay="auto"
      aria-label="pretto slider"
      min={0}
      max={100}
      value={value}
      onChange={(event, v) => {
        const newValue = (maxValue * v) / 100;
        setValue(newValue);
      }}
      valueLabelDisplay="on"
      valueLabelFormat={valueLabelFormat}
      className={styles.tokenSlider}
      marks={marks}
    />
  );
};
export default TokenSlider;

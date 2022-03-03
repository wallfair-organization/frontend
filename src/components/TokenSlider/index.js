import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import styles from './styles.module.scss';
import _ from 'lodash';

const TSlider = withStyles({
  root: {
    color: '#6751EC',
    height: 6,
  },
  thumb: {
    height: 33,
    width: 33,
    backgroundColor: '#fff',
    border: '8px solid #acc4ff',
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
      fontFamily: 'DM Sans',
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
    color: '#e6edff',
  },
  rail: {
    height: 6,
    borderRadius: 3,
    color: '#e6edff',
    opacity: 1,
  },
  mark: {
    width: 15,
    height: 15,
    borderRadius: '50px',
    marginTop: '-4px',
    background: '#e6edff',
    border: '2px solid #fff',
  },
  markLabel: {
    top: -9,
    fontFamily: 'DM Sans',
    fontSize: 11,
    fontStyle: 'normal',
    fontWeight: 400,
    letterSpacing: 0,
    textAlign: 'left',
    marginLeft: 7,
  },
})(Slider);

const TokenSlider = ({
  value,
  setValue,
  maxValue,
  minValue,
  decimalPlaces,
  ...props
}) => {
  if (maxValue < 1) {
    maxValue = 2800;
  }

  const marks = [
    {
      value: 1,
      label: '1%',
    },
    {
      value: maxValue / 4,
      label: `25%`,
    },
    {
      value: maxValue / 2,
      label: `50%`,
    },
    {
      value: maxValue * 0.75,
      label: `75%`,
    },
    {
      value: maxValue,
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
        if (minValue && v < _.toNumber(minValue)) {
          v = minValue;
        }

        if (decimalPlaces || (decimalPlaces === 0 && !v.length)) {
          v = _.floor(v, decimalPlaces);
        }
        setValue(v);
      }}
      valueLabelFormat={`${
        parseInt((value * 100) / maxValue) < 2
          ? 1
          : parseInt((value * 100) / maxValue)
      }%`}
      valueLabelDisplay="off"
      className={styles.tokenSlider}
      marks={marks}
    />
  );
};
export default TokenSlider;

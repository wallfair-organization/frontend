import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';

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
    height: 4,
    marginTop: 1,
    borderRadius: 3,
    color: '#6751EC',
    opacity: 1,
  },
  mark: {
    // width: '14px',
    // height: '14px',
    // border: '2px solid #fff',
    // borderRadius: '50%',
    // backgroundColor: '#6751ec',
    // top: '50%',
    // transform: 'translateY(-50%)',
    // '&:nth-last-of-type(1)': {
    //   display: 'none !important'
    // },
    display: 'none',
  },
  markLabel: {
    top: '50%',
    transform: 'translateY(-50%)',
    '& > span': {
      display: 'block',
      width: '15px',
      height: '15px',
      border: '2px solid #fff',
      borderRadius: '50%',
      backgroundColor: '#6751ec',
      '& > span': {
        display: 'block',
        transform: 'translateY(-100%)',
      },
    },
    '& .mark--small': {
      width: '12px',
      height: '12px',
    },
    '& .mark--last': {
      right: 0,
      left: 'unset',
      transform: 'translateX(-50%)',

      '& > span': {
        display: 'block',
        position: 'absolute',
        right: 0,
      },
    },
    // top: -5,
    // fontFamily: 'PlusJakarta-Regular',
    // fontSize: 11,
    // fontStyle: 'normal',
    // fontWeight: 400,
    // letterSpacing: 0,
    // textAlign: 'left',
    // marginLeft: -1,
  },
})(Slider);

const TokenSlider = ({ maxValue, setValue, ...props }) => {
  const [sliderValue, setSliderValue] = useState(1);
  const minValue = 0;
  if (maxValue < 1) {
    maxValue = 2800;
  }

  useEffect(() => {
    setValue((sliderValue / 100) * (maxValue - minValue));
  }, [sliderValue]);

  // const marks = [
  //   {
  //     value: 1,
  //     label: 1,
  //   },
  //   {
  //     value: maxValue,
  //     label: maxValue,
  //   },
  // ];
  const points = [0, 25, 50, 75, 100];
  const marks = points.map((point, pointIndex) => ({
    value: point,
    label: (
      <span
        className={`${[25, 75].includes(point) ? 'mark--small' : ''} 
          ${pointIndex === points.length - 1 ? 'mark--last' : ''}
        `}
      >
        <span>{[0, 100].includes(point) && `${point}%`}</span>
      </span>
    ),
  }));

  return (
    <TSlider
      valueLabelDisplay="auto"
      aria-label="pretto slider"
      min={1}
      max={100}
      value={sliderValue}
      onChange={(event, v) => {
        setSliderValue(v);
      }}
      valueLabelDisplay="on"
      className={styles.tokenSlider}
      marks={marks}
      step={1}
      components={{
        Mark: 'div',
      }}
      getAriaLabel={() => 'getAriaLabel'}
      valueLabelFormat={value => `${value}%`}
    />
  );
};
export default TokenSlider;

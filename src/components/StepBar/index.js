import classNames from 'classnames';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import React, { Fragment } from 'react';
import style from './styles.module.scss';

const StepBar = ({ size, step }) => {
  const renderStepBarItemComplete = () => {
    return (
      <div className={style.stepBarItemComplete}>
        <Icon className={style.stepCompleteItem} iconType={IconType.checked} />
      </div>
    );
  };

  const renderStepBarItemIncomplete = (index, step) => {
    return (
      index === step ? (
        <div className={classNames(style.stepBarItemIncomplete, style.stepBarItemActive)}>
          <span
            className={classNames(style.stepBarItem, style.stepBarActiveItem)}
          >
            {index + 1}
          </span>
        </div>
      ) : (
        <div className={style.stepBarItemIncomplete}>
        <span
          className={classNames(style.stepBarItem, style.stepBarInactiveItem)}
        >
          {index + 1}
        </span>
        </div>
      )
    );
  };

  return (
    <div className={style.stepBar}>
      <div className={style.stepBarLine}></div>
      {[...Array(size)].map((arr, index) => (
        <Fragment key={index}>
          {index < step
            ? renderStepBarItemComplete()
            : renderStepBarItemIncomplete(index, step)}
        </Fragment>
      ))}
    </div>
  );
};

export default StepBar;

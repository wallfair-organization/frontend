import ButtonTheme from './ButtonTheme';
import classNames from 'classnames';
import React from 'react';
import SelectionHelper from '../../helper/SelectionHelper';
import style from './styles.module.scss';
import Highlight from '../Highlight';

import {ReactComponent as ButtonS} from '../../data/backgrounds/buttons/button-s.svg';
import {ReactComponent as ButtonM} from '../../data/backgrounds/buttons/button-m.svg';
import {ReactComponent as ButtonL} from '../../data/backgrounds/buttons/button-l.svg';
import {ReactComponent as ButtonXL} from '../../data/backgrounds/buttons/button-xl.svg';

const Button = ({
  children,
  highlightType,
  highlightTheme,
  className,
  theme = ButtonTheme.primaryButton,
  onClick,
  disabled,
  withoutPadding = false,
  dataTrackingId,
}) => {

  const buttonBackground = {
    [ButtonTheme.primaryButtonS]: <ButtonS />,
    [ButtonTheme.primaryButtonM]: <ButtonM />,
    [ButtonTheme.primaryButtonL]: <ButtonL />,
    [ButtonTheme.primaryButtonXL]: <ButtonXL />,
  }

  const renderHighlight = () => {
    if (highlightType) {
      return (
        <Highlight
          className={style.highlight}
          highlightType={highlightType}
          highlightTheme={highlightTheme}
        />
      );
    }

    return null;
  };

  const renderPrimaryButton = () => {
    return (
      <span
        className={classNames(
          className,
          style.primaryButton,
          style[theme],
          disabled ? style.disabled : null,
        )}
        disabled={disabled}
        onClick={disabled ? null : onClick}
        data-tracking-id={dataTrackingId}
      > 
        {buttonBackground[theme]}
        <span className={style.buttonContent}>{children}</span>
      </span> 
    )
  }

  const renderSecondaryButton = () => {
    return (
      <span
        className={classNames(
          className,
          style.secondaryButton,
          style[theme],
          disabled ? style.disabled : null,
        )}
        disabled={disabled}
        onClick={disabled ? null : onClick}
        data-tracking-id={dataTrackingId}
      > 
        <span className={style.buttonContent}>{children}</span>
      </span> 
    )
  }

  return (
    <>
      { [
        ButtonTheme.primaryButton, 
        ButtonTheme.primaryButtonS,
        ButtonTheme.primaryButtonM,
        ButtonTheme.primaryButtonL,
        ButtonTheme.primaryButtonXL,
      ].includes(theme) ?
        renderPrimaryButton()

        : [
          ButtonTheme.secondaryButton,
          ButtonTheme.secondaryButtonLight
         ] ?
          renderSecondaryButton()

        : theme === ButtonTheme.alternativeButton ?
        <span
          className={classNames(
            className,
            style.alternativeButton,
            disabled ? style.disabled : null,
          )}
          disabled={disabled}
          onClick={disabled ? null : onClick}
          data-tracking-id={dataTrackingId}
        > 
          {children}
        </span> 

        : theme === ButtonTheme.redButton ?
        <span
          className={classNames(
            className,
            style.redButton,
            disabled ? style.disabled : null,
          )}
          disabled={disabled}
          onClick={disabled ? null : onClick}
          data-tracking-id={dataTrackingId}
        > 
          {!withoutPadding && <div className={style.buttonPattern}/> }
          <div className={style.buttonInnerBackground}>
            <div className={style.butonSecondInnerBackground}>
              <div className={classNames(style.buttonThirdInnerBackground, withoutPadding && style.withoutPadding)}>
                <span>{children}</span>
              </div>
            </div>
          </div>
        </span> :
        <span
          className={classNames(
            className,
            style.loginButton,
            disabled ? style.disabled : null,
          )}
          disabled={disabled}
          onClick={disabled ? null : onClick}
          data-tracking-id={dataTrackingId}
        >
          {children}
        </span>
      }
    </>
  );
};

export default Button;

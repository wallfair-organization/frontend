import ButtonTheme from './ButtonTheme';
import classNames from 'classnames';
import React from 'react';
import SelectionHelper from '../../helper/SelectionHelper';
import style from './styles.module.scss';
import Highlight from '../Highlight';

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
  const PrimaryButton = () => (
    <span
      className={classNames(
        className,
        style.primaryButton,
        disabled ? style.disabled : null,
      )}
      disabled={disabled}
      onClick={disabled ? null : onClick}
      data-tracking-id={dataTrackingId}
    > 
      <div className={style.buttonInnerBackground}>
        {!withoutPadding && <div className={style.buttonPattern}/> }
        <div className={style.butonSecondInnerBackground}>
          <div className={classNames(style.buttonThirdInnerBackground, withoutPadding && style.withoutPadding)}>
            <span>{children}</span>
          </div>
        </div>
      </div>
    </span>
  );

  const SecondaryButton = () => (
    <span
      className={classNames(
        className,
        style.secondaryButton,
        disabled ? style.disabled : null,
      )}
      disabled={disabled}
      onClick={disabled ? null : onClick}
      data-tracking-id={dataTrackingId}
    > 
      <div className={style.buttonInnerBackground}>
        {!withoutPadding && <div className={style.buttonPattern}/> }
        <div className={style.butonSecondInnerBackground}>
          <div className={classNames(style.buttonThirdInnerBackground, withoutPadding && style.withoutPadding)}>
            <span>{children}</span>
          </div>
        </div>
      </div>
    </span>
  );

  const LoginButton = () => (
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
  );

  return (
    <>
      { theme === ButtonTheme.primaryButton ?
        <span
          className={classNames(
            className,
            style.primaryButton,
            disabled ? style.disabled : null,
          )}
          disabled={disabled}
          onClick={disabled ? null : onClick}
          data-tracking-id={dataTrackingId}
        > 
          {children}
        </span> : theme === ButtonTheme.secondaryButton ?
        <span
          className={classNames(
            className,
            style.secondaryButton,
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

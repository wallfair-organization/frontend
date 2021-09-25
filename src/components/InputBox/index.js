import Icon from '../Icon';
import IconType from '../Icon/IconType';
import Input from '../Input';
import PhoneInput from '../PhoneInput';
import styles from './styles.module.scss';
import IconTheme from '../Icon/IconTheme';
import InputBoxTheme from './InputBoxTheme';
import classNames from 'classnames';
import SelectionHelper from '../../helper/SelectionHelper';
import MomentUtils from '@date-io/moment';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardTimePicker } from '@material-ui/pickers';
import ErrorHint from '../ErrorHint';
import _ from 'lodash';
import { useRef } from 'react';

const InputBox = ({
  onClick,
  type = 'text',
  placeholder,
  invitationText,
  errorText,
  country,
  setCountry,
  hasCountry,
  value,
  setValue = _.noop,
  min,
  max,
  theme = InputBoxTheme.defaultInput,
  className,
  containerClassName,
  onConfirm,
  showDeleteIcon = true,
  disabled = false,
}) => {
  const inputRef = useRef(null);

  const renderInvitationText = () => {
    if (invitationText) {
      return <span>{invitationText}</span>;
    }

    return null;
  };

  const renderPhoneInput = () => {
    if (hasCountry) {
      return (
        <PhoneInput
          value={country}
          inputProps={{ name: 'phoneNumber' }}
          onChange={country => setCountry(country)}
          onConfirm={onConfirm}
          enableClickOutside={true}
          enableSearch={true}
        />
      );
    }

    return null;
  };

  const renderInput = () => {
    if (type === 'date') {
      return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant={'inline'}
            format={'MM/DD/yyyy'}
            value={value}
            onChange={setValue}
            keyboardIcon={
              <Icon
                iconType={IconType.calendar}
                iconTheme={IconTheme.primary}
              />
            }
          />
        </MuiPickersUtilsProvider>
      );
    } else if (type === 'time') {
      return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardTimePicker
            value={value}
            onChange={setValue}
            keyboardIcon={
              <Icon iconType={IconType.time} iconTheme={IconTheme.primary} />
            }
          />
        </MuiPickersUtilsProvider>
      );
    }

    return (
      <Input
        className={styles.input}
        placeholder={placeholder}
        type={type}
        value={value}
        min={min}
        max={max}
        onChange={event => setValue(event.target.value)}
        onSubmit={onConfirm}
        reference={inputRef}
        disabled={disabled}
      />
    );
  };

  const copyToClipboard = e => {
    navigator.clipboard.writeText(value);

    const currentInputRef = inputRef.current;

    if (currentInputRef) {
      currentInputRef.select();
    }

    if (typeof onClick === 'function') {
      onClick(e, value);
    }
  };

  const renderIcon = () => {
    if (theme === InputBoxTheme.copyToClipboardInput) {
      return (
        <div
          className={styles.inputDeleteIconContainer}
          onClick={copyToClipboard}
        >
          <Icon iconTheme={IconTheme.black} iconType={IconType.copy} />
        </div>
      );
    }

    if (theme === InputBoxTheme.copyToClipboardInputWhite) {
      return (
        <div
          className={styles.inputDeleteIconContainer}
          onClick={copyToClipboard}
        >
          <Icon iconTheme={IconTheme.white} iconType={IconType.copy} />
        </div>
      );
    }

    if (showDeleteIcon) {
      return (
        <div
          className={styles.inputDeleteIconContainer}
          onClick={() => {
            setValue('');
          }}
        >
          <Icon
            iconTheme={IconTheme.primaryLightTransparent}
            iconType={IconType.deleteInput}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className={classNames(styles.inputBoxContainer, containerClassName)}>
      {renderInvitationText()}
      <div
        className={classNames(
          styles.inputBox,
          SelectionHelper.get(theme, {
            [InputBoxTheme.defaultInput]: styles.defaultInputBox,
            [InputBoxTheme.copyToClipboardInput]:
              styles.copyToClipboardInputBox,
            [InputBoxTheme.copyToClipboardInputWhite]:
              styles.copyToClipboardInputBoxWhite,
            [InputBoxTheme.coloredBorderMint]: styles.coloredBorderMint,
            [InputBoxTheme.coloredBorderLightPurple]:
              styles.coloredBorderLightPurple,
            [InputBoxTheme.dashedBorderTransparent]:
              styles.dashedBorderTransparent,
            [InputBoxTheme.modalInput]: styles.modalInput,
          }),
          className
        )}
        onClick={
          theme === InputBoxTheme.copyToClipboardInput ? copyToClipboard : null
        }
      >
        {renderPhoneInput()}
        {renderInput()}
        {renderIcon()}
      </div>
      <ErrorHint errorText={errorText} />
    </div>
  );
};

export default InputBox;

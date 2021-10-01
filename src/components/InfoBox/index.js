import classNames from 'classnames';
import { useOutsideClick } from 'hooks/useOutsideClick';
import React, { useCallback, useState } from 'react';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import styles from './styles.module.scss';

const POSITIONS = {
  topLeft: 'topLeft',
  topRight: 'topRight',
  bottomLeft: 'bottomLeft',
  bottomRight: 'bottomRight',
};

const InfoBox = ({
  children,
  position = POSITIONS.topLeft,
  iconType = IconType.info,
  iconClassName = ``,
  autoWidth = false,
}) => {
  const [showContent, setShowContent] = useState(false);

  const element = useOutsideClick(() => {
    setShowContent(false);
  });

  const renderInfoIcon = () => {
    return (
      <Icon
        className={classNames(styles.infoIcon, styles[iconClassName])}
        iconType={iconType}
        onClick={onHandleClick}
      />
    );
  };

  const onHandleClick = useCallback(
    event => {
      setShowContent(!showContent);
    },
    [showContent]
  );

  return (
    <div ref={element} className={styles.infoBoxContainer}>
      {renderInfoIcon()}
      {showContent && (
        <div
          className={classNames(
            styles.infoBoxContentContainer,
            autoWidth ? styles.autoWidth : null,
            styles[position]
          )}
        >
          <div className={styles.infoBoxContent}>{children}</div>
        </div>
      )}
    </div>
  );
};

export default InfoBox;

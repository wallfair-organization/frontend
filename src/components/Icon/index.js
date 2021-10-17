import classNames from 'classnames';
import IconTheme from './IconTheme';
import IconType from './IconType';
import React from 'react';
import SelectionHelper from '../../helper/SelectionHelper';
import styles from './styles.module.scss';
import { ReactComponent as IconActivities } from '../../data/icons/activities.svg';
import { ReactComponent as IconAddBet } from '../../data/icons/add-bet.svg';
import { ReactComponent as IconAddYellow } from '../../data/icons/add-yellow.svg';
import { ReactComponent as IconArrow } from '../../data/icons/arrow.svg';
import { ReactComponent as IconArrowButtonRight } from '../../data/icons/arrow-button-right.svg';
import { ReactComponent as IconArrowDown } from '../../data/icons/arrow-down.svg';
import { ReactComponent as IconArrowLeft } from '../../data/icons/arrow-left.svg';
import { ReactComponent as IconArrowRight } from '../../data/icons/arrow-right.svg';
import { ReactComponent as IconArrowSmallDown } from '../../data/icons/arrow-small-down.svg';
import { ReactComponent as IconArrowSmallRight } from '../../data/icons/arrow-small-right.svg';
import { ReactComponent as IconArrowTopRight } from '../../data/icons/arrow-top-right.svg';
import { ReactComponent as IconAttention } from '../../data/icons/attention.svg';
import { ReactComponent as IconAvatarUpload } from '../../data/icons/avatar-upload.svg';
import { ReactComponent as IconBell } from '../../data/icons/bell.svg';
import { ReactComponent as IconBet } from '../../data/icons/bet.svg';
import { ReactComponent as IconBet2 } from '../../data/icons/bet-2.svg';
import { ReactComponent as IconCalendar } from '../../data/icons/calendar.svg';
import { ReactComponent as IconCamera } from '../../data/icons/camera.svg';
import { ReactComponent as IconChat } from '../../data/icons/chat.svg';
import { ReactComponent as IconChat2 } from '../../data/icons/chat2.svg';
import { ReactComponent as IconChecked } from '../../data/icons/checked.svg';
import { ReactComponent as IconCollapseSidebar } from '../../data/icons/collapse-sidebar.svg';
import { ReactComponent as IconConfettiLeft } from '../../data/icons/confetti-left.svg';
import { ReactComponent as IconConfettiRight } from '../../data/icons/confetti-right.svg';
import { ReactComponent as IconCopy } from '../../data/icons/copy.svg';
import { ReactComponent as IconCross } from '../../data/icons/cross.svg';
import { ReactComponent as IconDeleteInput } from '../../data/icons/delete-input.svg';
import { ReactComponent as IconDeposit } from '../../data/icons/deposit.svg';
import { ReactComponent as IconEdit } from '../../data/icons/edit.svg';
import { ReactComponent as IconHome } from '../../data/icons/home.svg';
import { ReactComponent as IconHourglass } from '../../data/icons/hourglass.svg';
import { ReactComponent as IconInfo } from '../../data/icons/info.svg';
import { ReactComponent as IconInfoReverse } from '../../data/icons/info-reverse.svg';
import { ReactComponent as IconLogoSmall } from '../../data/icons/logo-small.svg';
import { ReactComponent as IconLogout } from '../../data/icons/logout.svg';
import { ReactComponent as IconMailAddress } from '../../data/icons/mail-address.svg';
import { ReactComponent as IconMainMenu } from '../../data/icons/main-menu.svg';
import { ReactComponent as IconMenu } from '../../data/icons/menu.svg';
import { ReactComponent as IconNotification } from '../../data/icons/notification.svg';
import { ReactComponent as IconPhoneNumber } from '../../data/icons/phone-number.svg';
import { ReactComponent as IconRefresh } from '../../data/icons/refresh.svg';
import { ReactComponent as IconSearch } from '../../data/icons/search.svg';
import { ReactComponent as IconSettings } from '../../data/icons/settings.svg';
import { ReactComponent as IconShuttle } from '../../data/icons/shuttle.svg';
import { ReactComponent as IconSuccess } from '../../data/icons/success.svg';
import { ReactComponent as IconSupport } from '../../data/icons/support.svg';
import { ReactComponent as IconSwitcher } from '../../data/icons/switcher.svg';
import { ReactComponent as IconThreeDotMenu } from '../../data/icons/three-dot-menu.svg';
import { ReactComponent as IconThumbUp } from '../../data/icons/thumb-up.svg';
import { ReactComponent as IconTime } from '../../data/icons/time.svg';
import { ReactComponent as IconQuestion } from '../../data/icons/question.svg';
import { ReactComponent as IconTwitch } from '../../data/icons/twitch.svg';
import { ReactComponent as IconWallet } from '../../data/icons/wallet.svg';
import { ReactComponent as IconWallet2 } from '../../data/icons/wallet-2.svg';
import { ReactComponent as IconWithdrawal } from '../../data/icons/withdrawal.svg';
import { ReactComponent as NewsIcon } from '../../data/icons/news-icon.svg';
import { ReactComponent as ShareIcon } from '../../data/icons/share-solid-fa.svg';
import { ReactComponent as IconTrash } from '../../data/icons/trash.svg';
import { ReactComponent as IconStar } from '../../data/icons/star-1.svg';
import { ReactComponent as IconStarFull } from '../../data/icons/star-2.svg';

const Icon = ({
  className,
  iconType,
  iconTheme = IconTheme.white,
  circle,
  width,
  height,
  onClick,
  children,
  style,
}) => {
  const renderIcon = () => {
    return SelectionHelper.get(iconType, {
      [IconType.activities]: <IconActivities />,
      [IconType.addBet]: <IconAddBet />,
      [IconType.addYellow]: <IconAddYellow />,
      [IconType.arrow]: <IconArrow />,
      [IconType.arrowButtonRight]: <IconArrowButtonRight />,
      [IconType.arrowUp]: (
        <IconArrowDown style={{ transform: 'rotate(180deg)' }} />
      ),
      [IconType.arrowDown]: <IconArrowDown />,
      [IconType.arrowLeft]: <IconArrowLeft />,
      [IconType.arrowRight]: <IconArrowRight />,
      [IconType.arrowSmallDown]: <IconArrowSmallDown />,
      [IconType.arrowSmallRight]: <IconArrowSmallRight />,
      [IconType.arrowTopRight]: <IconArrowTopRight />,
      [IconType.attention]: <IconAttention />,
      [IconType.avatarUpload]: <IconAvatarUpload />,
      [IconType.bell]: <IconBell />,
      [IconType.bet]: <IconBet />,
      [IconType.bet2]: <IconBet2 />,
      [IconType.calendar]: <IconCalendar />,
      [IconType.camera]: <IconCamera style={{ transform: 'rotate(-10deg)' }} />,
      [IconType.chat]: <IconChat />,
      [IconType.chat2]: <IconChat2 />,
      [IconType.checked]: <IconChecked />,
      [IconType.collapseSidebar]: <IconCollapseSidebar />,
      [IconType.confettiLeft]: <IconConfettiLeft />,
      [IconType.confettiRight]: <IconConfettiRight />,
      [IconType.copy]: <IconCopy />,
      [IconType.cross]: <IconCross />,
      [IconType.deleteInput]: <IconDeleteInput />,
      [IconType.deposit]: <IconDeposit />,
      [IconType.home]: <IconHome />,
      [IconType.logoSmall]: <IconLogoSmall />,
      [IconType.logout]: <IconLogout />,
      [IconType.mailAddress]: <IconMailAddress />,
      [IconType.mainMenu]: <IconMainMenu />,
      [IconType.menu]: <IconMenu />,
      [IconType.notification]: <IconNotification />,
      [IconType.phoneNumber]: <IconPhoneNumber />,
      [IconType.refresh]: <IconRefresh />,
      [IconType.search]: <IconSearch />,
      [IconType.settings]: <IconSettings />,
      [IconType.shuttle]: <IconShuttle />,
      [IconType.support]: <IconSupport />,
      [IconType.switcher]: <IconSwitcher />,
      [IconType.threeDotMenu]: <IconThreeDotMenu />,
      [IconType.thumbUp]: <IconThumbUp />,
      [IconType.time]: <IconTime />,
      [IconType.question]: <IconQuestion />,
      [IconType.twitch]: <IconTwitch />,
      [IconType.wallet]: <IconWallet />,
      [IconType.wallet2]: <IconWallet2 />,
      [IconType.info]: <IconInfo />,
      [IconType.infoReverse]: <IconInfoReverse />,
      [IconType.success]: <IconSuccess />,
      [IconType.withdrawal]: <IconWithdrawal />,
      [IconType.newsIcon]: <NewsIcon />,
      [IconType.shareLink]: <ShareIcon />,
      [IconType.edit]: <IconEdit />,
      [IconType.hourglass]: <IconHourglass />,
      [IconType.trash]: <IconTrash />,
      [IconType.star]: <IconStar />,
      [IconType.starFull]: <IconStarFull />,
    });
  };

  const getIconStyle = (style = {}) => {
    return {
      width: width,
      height: height,
      ...style,
    };
  };

  return (
    <span
      style={getIconStyle(style)}
      className={classNames(
        styles.icon,
        className,
        SelectionHelper.get(iconTheme, {
          [IconTheme.black]: styles.iconBlack,
          [IconTheme.primary]: styles.iconPrimary,
          [IconTheme.primaryLightTransparent]:
            styles.iconPrimaryLightTransparent,
          [IconTheme.white]: styles.iconWhite,
          [IconTheme.notification]: styles.notificationCheckbox,
          [IconTheme.favorite]: styles.iconFavorite,
        }),
        circle === true ? styles.iconCircled : null
      )}
      onClick={onClick}
    >
      {renderIcon()}
      {children}
    </span>
  );
};

export default Icon;

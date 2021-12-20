import styles from "./styles.module.scss";
import CloseButton from "../../data/icons/cross-red.svg";

const Modal = ({
  isOpen,
  onDismiss = null,
  minHeight = false,
  maxHeight = 90,
  children,
  header,
  footer,
  showCloseButton = true,
}) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          {header && <div className={styles.modalHeaderContent}>{header}</div>}
          {showCloseButton && (
            <div className={styles.modalClose} onClick={onDismiss}>
              <img src={CloseButton} alt={`Close`} />
            </div>
          )}
        </div>
        <div className={styles.modalBody}>{children}</div>
        {footer && <div className={styles.modalfooter}></div>}
      </div>
      <div className={styles.modalBg} onClick={onDismiss} />
    </div>
  );
};

export default Modal;

import Waiting from "./Waiting";
import Success from "./Success";
import Error from "./Error";
import { connect } from "react-redux";
import PopupTheme from "components/Popup/PopupTheme";
import { PopupActions } from "store/actions/popup";

const TxModal = ({
  hash,
  action,
  blocked,
  success,
  hidePopup,
  notActiveNetwork,
  transactionAmmount,
  canAddToken = false,
}) => {
  const getModalContent = () => {
    if (blocked) return <Waiting hash={hash} action={action} notActiveNetwork={notActiveNetwork} />;
    if (!blocked) {
      if (success) {
        return (
          <Success
            hash={hash}
            setModalOpen={hidePopup}
            canAddToken={canAddToken}
            notActiveNetwork={notActiveNetwork}
            transactionAmmount={transactionAmmount}
          />
        );
      } else {
        return <Error setModalOpen={hidePopup} hash={hash} notActiveNetwork={notActiveNetwork} />;
      }
    }
  };
  return getModalContent();
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

const mapStateToProps = state => {
  return {
    visible:
      state.popup.popupType === PopupTheme.txModal &&
      state.popup.visible,
    hash: state.txProps.hash,
    action: state.txProps.action,
    success: state.txProps.TXSuccess,
    blocked: state.txProps.blocked,
    notActiveNetwork: state.txProps.notActiveNetwork,
    transactionAmmount: state.txProps.transactionAmmount
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TxModal);

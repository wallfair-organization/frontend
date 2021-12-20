import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationModal } from "./consts";
import { selectOpenModal, setOpenModal } from "./slice";

export const useModalOpen = (modal) => {
  const openModal = useSelector(selectOpenModal);
  return openModal === modal;
};

export const useToggleModal = (modal) => {
  const open = useModalOpen(modal);
  const dispatch = useDispatch();
  return useCallback(
    () => dispatch(setOpenModal(open ? null : modal)),
    [dispatch, modal, open]
  );
};

export const useWalletModalToggle = () => {
  return useToggleModal(ApplicationModal.WALLET);
};

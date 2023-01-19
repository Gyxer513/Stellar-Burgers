/* cSpell:disable */
import React, { useEffect, FC } from "react";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IModalProps } from "../../services/types/types";


const Modal: FC<IModalProps> = ({ onClose, children }) => {
  useEffect(() => {
    document.addEventListener("keydown", handleEscKeydown);

    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, []);
  const modalsContainer = document.querySelector("#modals") as HTMLElement;
  const handleEscKeydown = (e: { key: string }) => {
    e.key === "Escape" && onClose();
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <button
          onClick={onClose}
          type="button"
          className={`${styles.modal__closeButton}`}
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalsContainer
  );
};

export default Modal;


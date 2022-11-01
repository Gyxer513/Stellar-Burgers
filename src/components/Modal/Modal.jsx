import React, { useEffect } from "react";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalsContainer = document.querySelector("#modals");

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    document.addEventListener("keydown", handleEscKeydown);

    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, []);

  const handleEscKeydown = (e) => {
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
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

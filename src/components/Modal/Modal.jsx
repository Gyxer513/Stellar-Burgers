import React, {useEffect} from "react";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

const modalsContainer = document.querySelector("#modals");

const Modal = ({ title, onOverlayClick, onEscKeydown, children }) => {
  useEffect(() => {
    document.addEventListener("keydown", onEscKeydown);

    return () => {
      document.removeEventListener("keydown", onEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <h3>{title}</h3>
        {children}
      </div>
      <ModalOverlay onClick={onOverlayClick} />
    </>,
    modalsContainer
  );
};

export default Modal
Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onOverlayClick: PropTypes.func.isRequired,
  onEscKeydown: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

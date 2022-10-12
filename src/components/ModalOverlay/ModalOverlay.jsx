import PropTypes from "prop-types";
import styles from "./modalOverlay.module.css";

const ModalOverlay = ({ onClick }) => {
  return <div className={styles.modalOverlay} onClick={onClick}></div>;
};

export default ModalOverlay;

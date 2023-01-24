import PropTypes from "prop-types";
import styles from "./modalOverlay.module.css";
import { IModalOverlay } from "../../services/types/types";
import React, { FC } from "react";

const ModalOverlay: FC<IModalOverlay>  = ({ onClick }) => {
  return <div className={styles.modalOverlay} onClick={onClick}></div>;
};
ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default ModalOverlay;

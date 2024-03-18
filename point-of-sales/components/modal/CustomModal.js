import React from "react";
import { Modal, Paper } from "@mui/material";
import styles from "./CustomModal.module.scss";

const CustomModal = ({ openModal, children }) => {
  return (
    <Modal open={openModal} onClose={() => {}}>
      <Paper className={styles.paper}>{children}</Paper>
    </Modal>
  );
};

export default CustomModal;

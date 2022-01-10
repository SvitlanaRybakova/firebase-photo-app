import React from "react";
import { Modal, Alert } from "react-bootstrap";

const ConfirmModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Alert variant="success">The new album has been created</Alert>
    </Modal>
  );
};

export default ConfirmModal;

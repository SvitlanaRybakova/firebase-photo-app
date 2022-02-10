import React from "react";
import { Modal, Alert } from "react-bootstrap";

const ConfirmModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Alert variant="success" className="p-4 m-0">
        The new album has been created
      </Alert>
    </Modal>
  );
};

export default ConfirmModal;

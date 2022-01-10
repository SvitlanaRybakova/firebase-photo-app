import React from "react";
import { Modal, Button } from "react-bootstrap";

const LinkToShare = ({ show, handleClose}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Link to share </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ overflow: "scroll" }}>
        <p>{window.location.href}</p>
        </Modal.Body>
      <Modal.Footer>
        <Button
          className="my-3 text-right"
          variant="outline-dark"
          onClick={handleClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LinkToShare;

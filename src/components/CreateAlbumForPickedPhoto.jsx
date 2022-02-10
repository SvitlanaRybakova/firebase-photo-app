import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Alert, Modal, Form } from "react-bootstrap";
import useCreateAlbumForPickedPhoto from "../hooks/useCreateAlbumForPickedPhoto";
import { useAuthContext } from "../contexts/AuthContext";
import ConfirmModal from "./ConfirmModal";

const CreateAlbumForPickedPhoto = ({
  show,
  handleClose,
  data,
  setPickedPhoto,
}) => {
  const newAlbumNameRef = useRef();
  const { currentUser } = useAuthContext();
  const {
    error,
    isError,
    isMutating,
    isSuccess,
    mutate,
  } = useCreateAlbumForPickedPhoto();
  const navigate = useNavigate();

  //confirm modal
  const [showConfirm, setShowConfirm] = useState(true);
  const handleConfirmClose = () => setShowConfirm(false);
  const handleConfirmShow = () => setShowConfirm(true);

  const handleClick = () => {
    mutate(data, newAlbumNameRef.current.value);
    if (currentUser) {
      setPickedPhoto([]);
      handleClose();
      navigate("/");
    }
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Type the album name </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "90%" }}>
          <Form.Control
            ref={newAlbumNameRef}
            type="text"
            placeholder="Write a new name..."
            id="inputAlbumTitle"
            aria-describedby="albumTitle"
            required
            className={
              !newAlbumNameRef.current?.value
                ? "border border-danger"
                : "border border-secondary"
            }
          />
          <div
            style={{
              height: "60px",
              margin: "0 1rem  1rem  1rem",
              padding: "10px",
            }}
          >
            {isError && <Alert variant="danger">{error}</Alert>}
            {isMutating && (
              <div style={{ position: "absolute", top: "75px", right: "55%" }}>
                <PuffLoader color={"#888"} size={50} />{" "}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="my-3 text-right"
            variant="outline-dark"
            onClick={handleClick}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {isSuccess && (
        <ConfirmModal show={showConfirm} handleClose={handleConfirmClose} />
      )}
    </>
  );
};

export default CreateAlbumForPickedPhoto;

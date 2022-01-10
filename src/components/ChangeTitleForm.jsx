import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Alert, Modal, Form } from "react-bootstrap";
import { PuffLoader } from "react-spinners";
import { useAuthContext } from "../contexts/AuthContext";
import { usePhotosContext } from "../contexts/PhotosContext";
import useChangeAlbumName from "../hooks/useChangeAlbumName";

const ChangeTitle = ({ show, handleClose, data }) => {
  const albumNameRef = useRef();
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const { changeAlbumName, error, isError, isMutating } = useChangeAlbumName();
  const { setPickedPhoto } = usePhotosContext();

  const handleChangeTitleClick = (newName, data) => {
    if (!newName) {
      return;
    }
    changeAlbumName(newName, data);
    navigate(`/${currentUser.uid}/${newName}`);
    setPickedPhoto([]);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Type the album name </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ width: "90%" }}>
        <Form.Control
          ref={albumNameRef}
          type="text"
          placeholder="Write a new name..."
          id="inputAlbumTitle"
          aria-describedby="albumTitle"
          required
          className={
            !albumNameRef.current?.value
              ? "border border-danger"
              : "border border-secondary"
          }
        />
        <div style={{ height: "60px", margin: "0 1rem  1rem  1rem" }}>
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
          onClick={() =>
            handleChangeTitleClick(albumNameRef.current.value, data)
          }
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeTitle;

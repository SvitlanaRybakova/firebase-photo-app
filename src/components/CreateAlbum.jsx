import React, { useRef, useCallback } from "react";
import { Button, Modal, Form, ProgressBar } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import useUploadPhoto from "../hooks/useUploadPhoto";

const CreateAlbum = ({ show, handleClose }) => {
  const albumNameRef = useRef();

  const { mutate, progress } = useUploadPhoto();

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) {
      return;
    }
    // check if albomName has a string title (use is for full storage path)
    if (!albumNameRef.current.value) {
      return;
    }
    //upload a photo to storage
    mutate(acceptedFiles[0], albumNameRef.current.value);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/gif, image/jpeg, image/png, image/webp",
    maxFiles: 1,
    onDrop,
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "90%" }}>
          <Form.Control
            ref={albumNameRef}
            type="text"
            placeholder="Write the name of the albom..."
            id="inputAlbomTitle"
            aria-describedby="albomTitle"
            required
            className={
              !albumNameRef.current?.value
                ? "border border-danger"
                : "border border-secondary"
            }
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Uploaded 3 photo(s)</h5>
        <ProgressBar striped variant="success" animated now={progress} />
        <div
          {...getRootProps()}
          id="dropzone-wrapper"
          className={`${isDragAccept ? "drag-accept" : ""}${
            isDragReject ? "drag-reject" : ""
          }`}
        >
          <input {...getInputProps()} disabled={!albumNameRef.current?.value} />
          {isDragActive ? (
            isDragAccept ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Sorry, wrong file type...</p>
            )
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* <Button variant="success" onClick={handleClose}>
          Create
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default CreateAlbum;

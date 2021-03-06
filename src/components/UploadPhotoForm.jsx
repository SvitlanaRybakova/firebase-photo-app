import React, { useRef, useCallback, useState } from "react";
import { Modal, Form, Alert } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
// import useUploadPhoto from "../hooks/useUploadPhoto";
import useUploadPhoto from "../hooks/useUploadPhoto";

const UploadPhotoForm = ({ albumTitle, show, handleClose }) => {
  const albumNameRef = useRef();
  const { mutate, error, isError, isSuccess } = useUploadPhoto();

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) {
      return;
    }

    if(albumTitle){
       mutate(acceptedFiles, albumTitle);
    }
    // check if albomName has a string title (use is for full storage path)
    if (albumNameRef.current?.value) {
      //upload a photo to storage and db
      mutate(acceptedFiles, albumNameRef.current.value);
    }
  
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/gif, image/jpeg, image/png, image/webp",
    maxFiles: 10,
    onDrop,
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "90%" }}>
          {albumTitle ? (
            albumTitle
          ) : (
            <Form.Control
              ref={albumNameRef}
              type="text"
              placeholder="Write the name of the album..."
              id="inputAlbumTitle"
              aria-describedby="albumTitle"
              required
              className={
                !albumNameRef.current?.value
                  ? "border border-danger"
                  : "border border-secondary"
              }
            />
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          {...getRootProps()}
          id="dropzone-wrapper"
          className={`${isDragAccept ? "drag-accept" : ""}${
            isDragReject ? "drag-reject" : ""
          }`}
        >
          <input {...getInputProps()} disabled={!albumNameRef.current?.value &&!albumTitle} />
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
      <div style={{ height: "60px", margin: "0 1rem  1rem  1rem" }}>
        {isSuccess && (
          <Alert variant="success">The photo has been uploaded</Alert>
        )}
        {isError && <Alert variant="danger">{error}</Alert>}
      </div>
    </Modal>
  );
};

export default UploadPhotoForm;

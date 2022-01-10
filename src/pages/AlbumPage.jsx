import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { PuffLoader } from "react-spinners";
import { BsFillShareFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { SRLWrapper } from "simple-react-lightbox";
import { v4 as uuidv4 } from "uuid";

import useGetPhotosFromAlbum from "../hooks/useGetPhotosFromAlbum";
import { useAuthContext } from "../contexts/AuthContext";
import { usePhotosContext } from "../contexts/PhotosContext";
import PhotoCard from "../components/PhotoCard";
import UploadPhotoForm from "../components/UploadPhotoForm";
import ChangeTitleForm from "../components/ChangeTitleForm";
import LinkToChare from "../components/LinkToShare";

const AlbumPage = () => {
  const { title } = useParams();
  const { data, isLoading, isError } = useGetPhotosFromAlbum(title);
  const { currentUser } = useAuthContext();

  const { pickedPhotos } = usePhotosContext();

  useEffect(() => {
    renderAuthUserButton();
  }, [pickedPhotos]);

  // create a new album from selected photos
  const handleCreateAlbumClick = () => {
    handleTitleFormShow();
  };

  //  if photos were selected renders the button for creating a new album
  // if photos weren't selected renders the button for adding o new photos
  const renderAuthUserButton = () => {
    if (pickedPhotos.length <= 0) {
      return (
        <Button variant="outline-dark" onClick={handleUploadFormShow}>
          Add photo
        </Button>
      );
    } else {
      return (
        <Button
          variant="outline-dark"
          onClick={(e) => handleCreateAlbumClick(e)}
        >
          Create a new Album
        </Button>
      );
    }
  };
  // modal upload photo
  const [showUploadForm, setShowUploadForm] = useState(false);
  const handleUploadFormClose = () => setShowUploadForm(false);
  const handleUploadFormShow = () => setShowUploadForm(true);

  // modal title
  const [showTitleForm, setShowTitleForm] = useState(false);
  const handleTitleFormClose = () => setShowTitleForm(false);
  const handleTitleFormShow = () => setShowTitleForm(true);

  // modal share link
  const [showLinkToShare, setShowLinkToShare] = useState(false);
  const handleLinkToShareClose = () => setShowLinkToShare(false);
  const handleLinkToShareShow = () => setShowLinkToShare(true);

  const options = {
    settings: {
      overlayColor: "#6c757df9",
      autoplaySpeed: 1500,
      transitionSpeed: 900,
    },
    buttons: {
      backgroundColor: "#49505",
      iconColor: "#495057",
    },
    caption: {
      captionColor: "#dee2e6",
      captionFontFamily: "Raleway, sans-serif",
      captionFontWeight: "300",
      captionTextTransform: "uppercase",
    },
  };

  return (
    <>
      <Container>
        <Row className="my-4 align-items-center">
          <Col sm={12} md={9} className="d-flex align-items-center">
            <h1>
              {title}
              <span className="fs-6 text-secondary">
                {data && `(${data.length} photos)`}
              </span>
            </h1>
            {currentUser && (
              <div style={{ cursor: "pointer", marginLeft: "60px" }}>
                <AiFillEdit
                  style={{ marginRight: "30px" }}
                  onClick={handleTitleFormShow}
                  color={"gray"}
                  size={20}
                />
                <BsFillShareFill
                  onClick={handleLinkToShareShow}
                  color={"gray"}
                />
              </div>
            )}
          </Col>
          <Col sm={12} md={3} className="text-end">
            {currentUser && renderAuthUserButton()}
          </Col>
        </Row>
        <hr />
        {isLoading && (
          <div style={{ position: "absolute", top: "205px", right: "55%" }}>
            <PuffLoader color={"#888"} size={50} />{" "}
          </div>
        )}
        {isError && !data && (
          <Alert variant="warning">{"This album has been not found"}</Alert>
        )}

        <SRLWrapper options={options}>
          <Row className="my-5">
            {data &&
              data.map((photo) => (
                <PhotoCard
                  url={photo.url}
                  name={photo.name}
                  id={photo._id}
                  key={uuidv4()}
                />
              ))}
          </Row>
        </SRLWrapper>
      </Container>
      {/* modals */}
      <UploadPhotoForm
        show={showUploadForm}
        handleClose={handleUploadFormClose}
        albumTitle={title}
      />
      <ChangeTitleForm
        show={showTitleForm}
        handleClose={handleTitleFormClose}
        data={
          pickedPhotos.length <= 0
            ? data
            : pickedPhotos.map((id) => {
                return { _id: id };
              })
        }
      />
      <LinkToChare
        show={showLinkToShare}
        handleClose={handleLinkToShareClose}
      />
    </>
  );
};

export default AlbumPage;

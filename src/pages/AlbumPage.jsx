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
import CreateAlbumForPickedPhoto from "../components/CreateAlbumForPickedPhoto";
import { options } from "../servises/srlWrapperOptions";

const AlbumPage = () => {
  const { title } = useParams();
  const { data, isLoading, isError } = useGetPhotosFromAlbum(title);
  const { currentUser } = useAuthContext();
  const { setPickedPhoto, pickedPhotos } = usePhotosContext();

  useEffect(() => {
    renderAuthUserButton();
  }, [pickedPhotos]);

  // create a new album from selected photos
  const handleCreateAlbumClick = () => {
    handleCreateNewAlbumShow();
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
        <Button variant="outline-dark" onClick={handleCreateAlbumClick}>
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

  // modal create a new Album
  const [showCreateNewAlbum, setShowCreateNewAlbum] = useState(false);
  const handleCreateNewAlbumClose = () => setShowCreateNewAlbum(false);
  const handleCreateNewAlbumShow = () => setShowCreateNewAlbum(true);

  return (
    <>
      <Container>
        <Row className="my-4 align-items-center">
          <Col sm={12} md={9} className="d-flex align-items-center">
            <h1 className="album-name">
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
            {/* button send photo back to photographer. Renders only if user rated all photos  */}
            {!currentUser &&
              data?.length > 0 &&
              data?.filter((photo) => photo.isLike === true).length > 0 &&
              data?.filter((photo) => photo.isLike === null).length <= 0 && (
                <Button variant="outline-dark" onClick={handleCreateAlbumClick}>
                  Create a new Album
                </Button>
              )}
            {!currentUser &&
              data?.filter((photo) => photo.isLike === null).length > 0 && (
                <span className="text-danger">You should rate all photos</span>
              )}
            {!currentUser &&
              data?.filter((photo) => photo.isLike === null).length === 0 &&
              data?.filter((photo) => photo.isLike === true).length === 0 && (
                <span className="text-danger">
                  You should choose one photo at least
                </span>
              )}
          </Col>
        </Row>
        <hr />
        <Row className="text-center" style={{ height: "30px" }}>
          {!currentUser &&
            data?.filter((photo) => photo.isLike === true).length > 0 && (
              <span>
                Selected&nbsp;
                {data?.filter((photo) => photo.isLike === true).length}
                &nbsp;photo(s) from&nbsp;
                {data.length}
              </span>
            )}
        </Row>
        {isLoading && (
          <div style={{ position: "absolute", top: "205px", right: "55%" }}>
            <PuffLoader color={"#888"} size={50} />{" "}
          </div>
        )}
        {isError && !data && (
          <Alert variant="warning">{"This album has been not found"}</Alert>
        )}

        {data?.length <= 0 && (
          <Alert variant="warning">{"This album has been not found"}</Alert>
        )}
        <SRLWrapper options={options}>
          <Row>
            {data &&
              data.map((photo) => (
                <PhotoCard
                  url={photo.url}
                  name={photo.name}
                  id={photo._id}
                  isLike={photo.isLike}
                  path={photo.path}
                  size={photo.size}
                  type={photo.type}
                  key={uuidv4()}
                />
              ))}
          </Row>
        </SRLWrapper>
      </Container>
      {/* modals */}
      {/* add photo */}
      <UploadPhotoForm
        show={showUploadForm}
        handleClose={handleUploadFormClose}
        albumTitle={title}
      />
      {/* change album name (only for users!) */}
      {currentUser && (
        <ChangeTitleForm
          show={showTitleForm}
          handleClose={handleTitleFormClose}
          data={data}
          title={title}
        />
      )}
      {/* create album for picked photo (copy photo to another album) */}
      <CreateAlbumForPickedPhoto
        show={showCreateNewAlbum}
        handleClose={handleCreateNewAlbumClose}
        data={
          currentUser
            ? pickedPhotos
            : data?.filter((photo) => photo.isLike === true)
        }
        setPickedPhoto={currentUser && setPickedPhoto}
      />
      <LinkToChare
        show={showLinkToShare}
        handleClose={handleLinkToShareClose}
      />
    </>
  );
};

export default AlbumPage;

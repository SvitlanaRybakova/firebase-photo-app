import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Alert, Card } from "react-bootstrap";
import { PuffLoader } from "react-spinners";
import { BsFillShareFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import useGetPhotosFromAlbum from "../hooks/useGetPhotosFromAlbum";

import UploadPhotoForm from "../components/UploadPhotoForm";
import ChangeTitleForm from "../components/ChangeTitleForm";
import LinkToChare from "../components/LinkToShare";

const AlbumPage = () => {
  const { title } = useParams();
  const { data, isLoading, error, isError } = useGetPhotosFromAlbum(title);
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

  return (
    <>
      <Container>
        <Row className="my-4 align-items-center">
          <Col md={8} className="d-flex align-items-center">
            <h1 className="">
              {title}{" "}
              <span className="fs-6 text-secondary">
                {data && `(${data.length} photos)`}
              </span>
            </h1>
            <div style={{ cursor: "pointer", marginLeft: "60px" }}>
              <AiFillEdit
                style={{ marginRight: "30px" }}
                onClick={handleTitleFormShow}
                color={"gray"}
                size={20}
              />
              <BsFillShareFill onClick={handleLinkToShareShow} color={"gray"} />
            </div>
          </Col>
          <Col className="text-end">
            <Button variant="outline-dark" onClick={handleUploadFormShow}>
              Add photo
            </Button>
          </Col>
        </Row>
        <hr />
        {isLoading && (
          <div style={{ position: "absolute", top: "175px", right: "55%" }}>
            <PuffLoader color={"#888"} size={50} />{" "}
          </div>
        )}
        {isError && <Alert variant="warning">{error.message}</Alert>}

        <Row className="my-5">
          {data &&
            data.map((photo) => (
              <Card style={{ width: "10rem" }} className="m-1" key={uuidv4()}>
                <figure className="figure">
                  <img
                    src={photo.url}
                    className="figure-img img-fluid rounded"
                    alt={photo.name}
                  />
                  <figcaption className="figure-caption">
                    {photo.name}
                  </figcaption>
                </figure>
              </Card>
            ))}
        </Row>
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
        data={data}
      />
      <LinkToChare
        show={showLinkToShare}
        handleClose={handleLinkToShareClose}
      />
    </>
  );
};

export default AlbumPage;

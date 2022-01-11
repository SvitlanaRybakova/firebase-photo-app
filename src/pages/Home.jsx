import React, { useState } from "react";
import { Container, Button, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import UploadPhotoForm from "../components/UploadPhotoForm";
import useGetAllAlbums from "../hooks/useGetAllAlbums";

import AlbumGrid from "../components/AlbumGrid";

const Home = () => {
  const data = useGetAllAlbums();
  // modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container>
        <Button
          onClick={handleShow}
          variant="outline-dark"
          className="my-3 d-flex align-items-center"
        >
          <AiOutlinePlus />
          <span className="mx-3">Add a new album</span>
        </Button>
        <h1>Here are all your photo albums</h1>
        <Row >
          {data && <AlbumGrid data={data} />}
        </Row>
        <UploadPhotoForm show={show} handleClose={handleClose} />
      </Container>
    </>
  );
};

export default Home;

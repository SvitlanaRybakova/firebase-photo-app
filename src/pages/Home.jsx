import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import CreateAlbum from "../components/CreateAlbum";
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
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          {data && <AlbumGrid data={data} />}
        </div>
        <CreateAlbum show={show} handleClose={handleClose} />
      </Container>
    </>
  );
};

export default Home;

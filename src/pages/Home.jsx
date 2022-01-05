import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { AiOutlinePlus } from "react-icons/ai";
import CreateAlbum from "../components/CreateAlbum";
import useGetAlbum from '../hooks/useGetAlbum'

const Home = () => {
  // modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {data} = useGetAlbum()
// console.log('data from db', data);

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
        <h1>This is Home page</h1>
        <CreateAlbum show={show} handleClose={handleClose}/>
      </Container>
    </>
  );
};

export default Home;

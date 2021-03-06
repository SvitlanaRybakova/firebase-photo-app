import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { firebaseTimestampToString } from "../servises/time";
import { useAuthContext } from "../contexts/AuthContext";

const AlbumGrid = ({ data}) => {
  const {currentUser} = useAuthContext()
  const navigation = useNavigate();

  return data.map((album) => (
    <Card style={{ width: "12rem" }} className="m-2 p-0" key={uuidv4()}>
      <Card.Img style={{ height: "9rem" }} className="album-photo" variant="top" src={album.url} />
      <Card.Body>
        <Card.Title>{album.album}</Card.Title>
        <Button
          onClick={() => navigation(`/${currentUser.uid}/${album.album}`)}
          variant="light"
          className="btn-outline-dark"
        >
          Go to all photo
        </Button>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          Last updated <br /> {firebaseTimestampToString(album.created)}
        </small>
      </Card.Footer>
    </Card>
  ));
};

export default AlbumGrid;

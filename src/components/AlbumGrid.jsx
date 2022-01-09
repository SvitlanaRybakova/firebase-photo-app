import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { firebaseTimestampToString } from "../servises/time";
import { useAuthContext } from "../contexts/AuthContext";

const AlbumGrid = ({ data}) => {
  const {currentUser} = useAuthContext()
  const navigation = useNavigate();

  console.log(data);
  return data.map((album) => (
    <Card style={{ width: "10rem" }} className="my-3" key={uuidv4()}>
      <Card.Img style={{ height: "9rem" }} variant="top" src={album.url} />
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

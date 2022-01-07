import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Alert, Card } from "react-bootstrap";
import { PuffLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";
import useGetPhotosFromAlbum from "../hooks/useGetPhotosFromAlbum";
import { firebaseTimestampToString } from "../servises/time";

const AlbumPage = () => {
  const { title } = useParams();
  const { data, isLoading, error, isError } = useGetPhotosFromAlbum(title);

  console.log(data);
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1 className="">{title}</h1>
        </Col>
        <Col>
          <Button variant="outline-dark">Change Album Name</Button>
        </Col>
        <Col>
          <Button variant="outline-dark">Add photo</Button>
        </Col>
      </Row>
      {isLoading && <PuffLoader color={"#888"} size={50} />}
      {isError && <Alert variant="warning">{error.message}</Alert>}
      <Row>
        {data &&
          data.map((photo) => (
            <Card style={{ width: "10rem" }} className="m-1" key={uuidv4()}>
              <figure class="figure">
                <img
                  src={photo.url}
                  class="figure-img img-fluid rounded"
                  alt={photo.name}
                />
                <figcaption class="figure-caption">{photo.name}</figcaption>
              </figure>
              {/* <Card.Footer>
                <small className="text-muted">
                  Last updated {firebaseTimestampToString(photo.created)}
                </small>
              </Card.Footer> */}
            </Card>
          ))}
      </Row>
    </Container>
  );
};

export default AlbumPage;

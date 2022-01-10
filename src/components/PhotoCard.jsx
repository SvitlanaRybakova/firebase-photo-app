import React from "react";
import { Card } from "react-bootstrap";
import { GiCheckMark } from "react-icons/gi";
import { usePhotosContext } from "../contexts/PhotosContext";

const PhotoCard = ({ url, name, id }) => {
  const { setPickedPhoto, pickedPhotos } = usePhotosContext();

  const handleOnChange = (id) => {
    // delete existing id
    if (pickedPhotos.includes(id)) {
      setPickedPhoto(pickedPhotos.filter((existingId) => existingId != id));
      // add the photo if id is unique
    } else {
      setPickedPhoto((prevState) => [...prevState, id]);
    }
  };

  return (
    <Card className="photo-card">
      <div
        className="check-box"
        onClick={() => handleOnChange(id)}
      >
        {pickedPhotos.includes(id) ? (
          <GiCheckMark className="mb-3" color={"green"} />
        ) : (
          ""
        )}
      </div>
      <figure className="figure">
        <img src={url} className="figure-img img-fluid rounded" alt={name} />
        <figcaption className="figure-caption">{name}</figcaption>
      </figure>
    </Card>
  );
};

export default PhotoCard;

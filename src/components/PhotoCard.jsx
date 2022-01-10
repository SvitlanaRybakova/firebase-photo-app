import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { GiCheckMark } from "react-icons/gi";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { usePhotosContext } from "../contexts/PhotosContext";
import { useAuthContext } from "../contexts/AuthContext";
import { set } from "lodash";

const PhotoCard = ({ url, name, id }) => {
  const { setPickedPhoto, pickedPhotos } = usePhotosContext();
  const { currentUser } = useAuthContext();

  const [like, setLike] = useState(null);
  const [dislike, setDislike] = useState(null);

  const likePhoto = () => {
    setLike(true);
    setDislike(false);
  };

  const dislikePhoto = () => {
    setDislike(true);
    setLike(false);
  };
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
      {currentUser && (
        <div className="check-box" onClick={() => handleOnChange(id)}>
          {pickedPhotos.includes(id) ? (
            <GiCheckMark className="mb-3" color={"green"} />
          ) : (
            ""
          )}
        </div>
      )}
      <figure className="figure">
        <img src={url} className="figure-img img-fluid rounded" alt={name} />
        <figcaption className="figure-caption">{name}</figcaption>
      </figure>
      {!currentUser && (
        <Card.Footer className="d-flex justify-content-around">
          <div onClick={likePhoto}>
            {like ? <AiFillLike size={20} /> : <BiLike size={20} />}
          </div>
          <div onClick={dislikePhoto}>
            {dislike ? <AiFillDislike size={20} /> : <BiDislike size={20} />}
          </div>
        </Card.Footer>
      )}
    </Card>
  );
};

export default PhotoCard;

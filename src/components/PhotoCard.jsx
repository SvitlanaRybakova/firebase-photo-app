import React from "react";
import { Card } from "react-bootstrap";
import { GiCheckMark } from "react-icons/gi";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { usePhotosContext } from "../contexts/PhotosContext";
import { useAuthContext } from "../contexts/AuthContext";
import useLike from "../hooks/useLike";

const PhotoCard = ({ url, name, id, isLike, path, size, type }) => {
  const { pickedPhotos, handleOnChange } = usePhotosContext();
  const { currentUser } = useAuthContext();
  const { likeMutate } = useLike();

  // set like/dislike in db
  const toggleLike = (id, isLike) => {
    likeMutate(id, isLike);
  };

  const photo = {
    url,
    name,
    id,
    path,
    size,
    type,
  };

  const renderCheckBox = () => {
    return pickedPhotos.map((el) => {
      if (el.id === id) {
        return (
          <GiCheckMark key={el.id} className="check-mark" color={"green"} />
        );
      }
    });
  };

  return (
    <Card className="photo-card">
      {/* render checkbox for auth user */}
      {currentUser && (
        <div className="check-box" onClick={() => handleOnChange(id, photo)}>
          {renderCheckBox()}
        </div>
      )}
      <figure className="figure">
        <img src={url} className="figure-img img-fluid rounded" alt={name} />
        <figcaption className="figure-caption">{name}</figcaption>
      </figure>
      {/* render like btn for unauth user */}
      {!currentUser && (
        <Card.Footer
          className="d-flex justify-content-around "
          style={{ backgroundColor: "transparent" }}
        >
          <button
            className="like-button"
            onClick={() => toggleLike(id, true)}
            disabled={isLike === true}
          >
            {isLike === null && <BiLike size={20} />}
            {isLike === false && <BiLike size={20} />}
            {isLike === true && <AiFillLike size={20} color={"#094a09bd"} />}
          </button>
          <button
            className="like-button"
            onClick={() => toggleLike(id, false)}
            disabled={isLike === false}
          >
            {isLike === null && <BiDislike size={20} />}
            {isLike === true && <BiDislike size={20} />}
            {isLike === false && <AiFillDislike size={20} color={"#af3b3b"} />}
          </button>
        </Card.Footer>
      )}
    </Card>
  );
};

export default PhotoCard;

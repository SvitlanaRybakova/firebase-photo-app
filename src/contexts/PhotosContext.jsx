import React, { createContext, useContext, useState } from "react";

const PhotosContext = createContext();

const usePhotosContext = () => {
  return useContext(PhotosContext);
};
const PhotosContextProvider = ({ children }) => {
  const [pickedPhotos, setPickedPhoto] = useState([]);

  const handleOnChange = (id) => {
    // delete existing id
    if (pickedPhotos.includes(id)) {
      setPickedPhoto(pickedPhotos.filter((existingId) => existingId != id));
      // add the photo if id is unique
    } else {
      setPickedPhoto((prevState) => [...prevState, id]);
    }
  };

  const values = {
    pickedPhotos,
    setPickedPhoto,
    handleOnChange,
  };
  return (
    <PhotosContext.Provider value={values}>{children}</PhotosContext.Provider>
  );
};

export { usePhotosContext, PhotosContextProvider as default };

import React, { createContext, useContext, useState } from "react";

const PhotosContext = createContext();

const usePhotosContext = () => {
  return useContext(PhotosContext);
};
const PhotosContextProvider = ({ children }) => {
  const [pickedPhotos, setPickedPhoto] = useState([]);

  const handleOnChange = (id, photo) => {
    if (pickedPhotos.length <= 0) {
      setPickedPhoto([photo]);
    } else {
      const existingPhoto = pickedPhotos.find((el) => el.id == id);
      if (existingPhoto != undefined) {
        setPickedPhoto(pickedPhotos.filter((el) => el.id != id));
      } else {
        setPickedPhoto((prevState) => [...prevState, photo]);
      }
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

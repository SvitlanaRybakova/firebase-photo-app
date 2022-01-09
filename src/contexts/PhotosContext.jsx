import React, { createContext, useContext, useState } from "react";

const PhotosContext = createContext();

const usePhotosContext = () => {
  return useContext(PhotosContext);
};
const PhotosContextProvider = ({ children }) => {
  const [pickedPhotos, setPickedPhoto] = useState([]);

  const values = {
    pickedPhotos,
    setPickedPhoto,
  };
  return (
    <PhotosContext.Provider value={values}>{children}</PhotosContext.Provider>
  );
};

export { usePhotosContext, PhotosContextProvider as default };

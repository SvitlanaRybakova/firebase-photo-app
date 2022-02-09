import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../firebase";
import { findUserId } from "../servises/user";

const useCreateAlbumForPickedPhoto = () => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isMutating, setIsMutating] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  const { currentUser } = useAuthContext();

  useEffect(() => {
    // hide messages
    setTimeout(() => {
      setIsError(null);
      setIsSuccess(null);
    }, 3000);
  }, [isError, isSuccess]);

  // *** SAVE IN STORAGE and DB ***
  const uploadImage = async (photo, albumName) => {
    // save in db
    // create reference to db-collection related to user.id
    const collectionRef = collection(
      db,
      `${currentUser ? currentUser.uid : findUserId()}`
    );

    // create document in db for the uploaded photo
    await addDoc(collectionRef, {
      created: serverTimestamp(),
      album: albumName,
      name: photo.name,
      owner: `${currentUser ? currentUser.uid : findUserId()}`,
      path: photo.path,
      size: photo.size,
      type: photo.type,
      isLike: null,
      url: photo.url,
    });
  };

  const mutate = async (photos, albumName) => {
    setError(null);
    setIsError(null);
    setIsSuccess(null);
    setIsMutating(true);
    try {
      photos.forEach(async (photo) => {
        // check for right extension
        if (!photo instanceof File) {
          setError("That is no file");
          setIsError(true);
          setIsMutating(false);
          return;
        }
        // uppload every photo from array
        await uploadImage(photo, albumName);
      });
    } catch (e) {
      setError(e.message);
      setIsError(true);
      setIsMutating(false);
      setIsSuccess(false);
    }

    setIsSuccess(true);
    setIsMutating(false);
  };

  return {
    error,
    isError,
    isMutating,
    isSuccess,
    mutate,
  };
};

export default useCreateAlbumForPickedPhoto;

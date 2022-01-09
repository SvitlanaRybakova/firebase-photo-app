import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useAuthContext } from "../contexts/AuthContext";
import { db, storage } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const useUploadPhoto = () => {
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
    // save in storage
    // construct filename to save photo in db
    const storageFilename = `${Date.now()}-${photo.name}`;

    // construct full path in storage to save image as
    const storageFullPath = `${currentUser.uid}/${albumName}/${storageFilename}`;
    // create a reference in storage to upload image to
    const storageRef = ref(storage, storageFullPath);

    // start upload of image
    const uploadTask = uploadBytesResumable(storageRef, photo);

    // wait for upload to be completed
    await uploadTask.then();

    // get download url to uploaded image
    const url = await getDownloadURL(storageRef);

    // save in db
    // create reference to db-collection related to user.id
    const collectionRef = collection(db, `${currentUser.uid}`);
   

    // create document in db for the uploaded photo
    await addDoc(collectionRef, {
      created: serverTimestamp(),
      album: albumName,
      name: photo.name,
      owner: currentUser.uid,
      path: storageRef.fullPath,
      size: photo.size,
      type: photo.type,
      url,
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

export default useUploadPhoto;

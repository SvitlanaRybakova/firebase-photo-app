import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useAuthContext } from "../contexts/AuthContext";
import { db, storage } from "../firebase";
import useGetAlbum from "./useGetAlbum";

const useUploadPhoto = () => {
  const {
    setAlbumName,
    albumFirestoreId,
    totalPhotosInFirestore,
    photosInFirestore,
  } = useGetAlbum();

  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isMutating, setIsMutating] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [progress, setProgress] = useState(null);

  const { currentUser } = useAuthContext();

  const mutate = async (photo, albumName) => {
    setAlbumName(albumName);
    // reset internal state
    setError(null);
    setIsError(null);
    setIsSuccess(null);
    setIsMutating(true);

    // check for right extantion
    if (!photo instanceof File) {
      setError("That is no file");
      setIsError(true);
      setIsMutating(false);
      return;
    }

    // construct filename to save image as
    const storageFilename = `${Date.now()}-${photo.name}`;

    // construct full path in storage to save image as
    // const storageFullPath = `memes/${currentUser.uid}/${storageFilename}`;
    const storageFullPath = `${currentUser.uid}/${albumName}/${storageFilename}`;

    try {
      // create a reference in storage to upload image to
      const storageRef = ref(storage, storageFullPath);

      // start upload of image
      const uploadTask = uploadBytesResumable(storageRef, photo);

      // attach upload observer
      uploadTask.on("state_changed", (uploadTaskSnapshot) => {
        // update progress
        setProgress(
          Math.round(
            (uploadTaskSnapshot.bytesTransferred /
              uploadTaskSnapshot.totalBytes) *
              1000
          ) / 10
        );
      });

      // wait for upload to be completed
      await uploadTask.then();

      //todo need url to albom!  get download url to uploaded image
      const url = await getDownloadURL(storageRef);

      // **** STORED IN DB ****

      // check if this albom has been already created albomFirestoreId
      if (albumFirestoreId) {
        console.log("album exist", albumFirestoreId);
        const albumDocRef = doc(db, `${currentUser.uid}`, albumFirestoreId);
        await updateDoc(albumDocRef, {
          album: albumName,
          created: serverTimestamp(),
          totalPhotos: totalPhotosInFirestore + 1,
          path: `${currentUser.uid}/${albomName}`,
          photos: arrayUnion({
            name: photo.name,
            owner: currentUser.uid,
            size: photo.size,
            type: photo.type,
            url,
          }),
        });
      }
      // create new albom
      if (!albumFirestoreId) {
        console.log("new albom", albumFirestoreId);
        try {
          const collectionRef = collection(db, `${currentUser.uid}`);
          await addDoc(collectionRef, {
            album: albumName,
            created: serverTimestamp(),
            path: `${currentUser.uid}/${albumName}`,
            totalPhotos: 1,
            photos: [
              {
                name: photo.name,
                owner: currentUser.uid,
                size: photo.size,
                type: photo.type,
                url,
              },
            ],
          });
        } catch (e) {
          console.log(e.message);
        }
      }

      setProgress(null);
      setIsSuccess(true);
      setIsMutating(false);
    } catch (e) {
      console.log("ERROR!", e);

      setError(e.message);
      setIsError(true);
      setIsMutating(false);
      setIsSuccess(false);
    }
  };
  return {
    error,
    isError,
    isMutating,
    isSuccess,
    mutate,
    progress,
  };
};

export default useUploadPhoto;

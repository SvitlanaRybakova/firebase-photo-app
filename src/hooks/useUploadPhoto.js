import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useAuthContext } from "../contexts/AuthContext";
import { db, storage } from "../firebase";

const useUploadPhoto = () => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isMutating, setIsMutating] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [progress, setProgress] = useState(null);

  const [totalPhotos, setTotalPhotos] = useState(null);

  const { currentUser } = useAuthContext();

  useEffect(() => {
    // hide messages
    setTimeout(() => {
      setIsError(null);
      setIsSuccess(null);
    }, 3000);
  }, [isError, isSuccess]);

  const findAlbum = async (albumName) => {
    //  find the current album in db (get all collection due to don't know album id)
    const ref = collection(db, `${currentUser.uid}`);
    const q = query(ref, where("album", "==", albumName));
    const querySnapshot = await getDocs(q);

    const docs = querySnapshot.docs;
    if (docs.length > 0) {
      return {
        id: docs[0].id,
        ...docs[0].data(),
      };
    } else {
      return null;
    }
  };

  const mutate = async (photo, albumName) => {
    // checks that the current album is exists in the database
    const album = await findAlbum(albumName);

    setError(null);
    setIsError(null);
    setIsSuccess(null);
    setIsMutating(true);

    // check for right extension
    if (!photo instanceof File) {
      setError("That is no file");
      setIsError(true);
      setIsMutating(false);
      return;
    }

    // *** SAVE IN STORAGE ***
    // construct filename to save photo
    const storageFilename = `${Date.now()}-${photo.name}`;

    // construct full path in storage to save photo
    const storageFullPath = `${currentUser.uid}/${albumName}/${storageFilename}`;

    try {
      // create a reference in storage to upload photo
      const storageRef = ref(storage, storageFullPath);

      // start upload of photo
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

      const url = await getDownloadURL(storageRef);

      // **** SAVE IN DB ****
      // check if this albom has been already created albomFirestoreId
      if (album?.id) {
        const albumDocRef = doc(db, `${currentUser.uid}`, album.id);
        await updateDoc(albumDocRef, {
          // album: albumName,
          created: serverTimestamp(),
          totalPhotos: album.totalPhotos + 1,
          path: `${currentUser.uid}/${albumName}`,
          photos: arrayUnion({
            name: photo.name,
            owner: currentUser.uid,
            size: photo.size,
            type: photo.type,
            url,
          }),
        });
        // create new albom
      } else {
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
      }
      setTotalPhotos(album ? album.totalPhotos + 1 : 1);
      setProgress(null);
      setIsSuccess(true);
      setIsMutating(false);
    } catch (e) {
      console.warn("Error when uploading the photo", e.message);
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
    totalPhotos,
  };
};

export default useUploadPhoto;

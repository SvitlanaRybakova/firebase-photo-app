import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import useGetPhotosFromAlbum from "./useGetPhotosFromAlbum";

const useChangeAlbumName = (currentAlbumName) => {
  const { currentUser } = useAuthContext();
  // const { data } = useGetPhotosFromAlbum(currentAlbumName);

  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isMutating, setIsMutating] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  const mutate = async (id, newTitle) => {
    console.log("id", id, currentUser);
    const ref = doc(db, `${currentUser.uid}`, `${id}`);
    await updateDoc(ref, {
      album: newTitle,
    });
  };

  const changeAlbumName = async (newTitle, data) => {
    setError(null);
    setIsError(null);
    setIsSuccess(null);
    setIsMutating(true);
    try {
      data.forEach(async (photo) => {
        console.log(photo, photo._id);
        await mutate(photo._id, newTitle);
      });
    } catch (e) {
      console.warn("ERROR!", e);

      setError(e.message);
      setIsError(true);
      setIsMutating(false);
      setIsSuccess(false);
    }
  };

  return {
    changeAlbumName,
    error,
    isError,
    isMutating,
    isSuccess,
  };
};

export default useChangeAlbumName;

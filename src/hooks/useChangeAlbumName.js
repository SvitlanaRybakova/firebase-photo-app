import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import { findUserId } from "../servises/user";

const useChangeAlbumName = () => {
  const { currentUser } = useAuthContext();

  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isMutating, setIsMutating] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  const mutate = async (id, newTitle) => {
    const ref = doc(
      db,
      `${currentUser ? currentUser.uid : findUserId()}`,
      `${id}`
    );
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

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { findUserId } from "../servises/user";

const useLike = () => {
  const likeMutate = async (id, isLike) => {
    try {
      const ref = doc(db, `${findUserId()}`, `${id}`);
      await updateDoc(ref, {
        isLike: isLike,
      });
    } catch (e) {
      console.warn("New Error!", e);
    }
  };

  return { likeMutate };
};

export default useLike;

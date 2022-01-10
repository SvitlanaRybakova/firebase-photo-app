import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import { findUserId } from "../servises/user";


const useGetPhotosFromAlbum = (title) => {
  const { currentUser } = useAuthContext();
  const queryRef = query(
    collection(db, `${currentUser ? currentUser.uid : findUserId()}`),
    where("album", "==", title),
    orderBy("created", "desc")
  );
  const photosQuery = useFirestoreQueryData(
    ["photos", title],
    queryRef,
    {
      idField: "_id",
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );
  return photosQuery;
};
export default useGetPhotosFromAlbum;

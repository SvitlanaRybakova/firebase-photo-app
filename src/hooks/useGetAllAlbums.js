import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";

const useGetAllAlbums = () => {
  const { currentUser } = useAuthContext();

  const queryRef = query(
    collection(db, `${currentUser.uid}`),
    orderBy("created", "desc")
  );

  const albumsQuery = useFirestoreQueryData(
    ["albums"],
    queryRef,
    {
      idField: "_id",
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );
  return albumsQuery;
};

export default useGetAllAlbums;

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import { groupBy } from "lodash";

const useGetAllAlbums = () => {
  const { currentUser } = useAuthContext();
  const [data, setData] = useState();

  useEffect(async () => {
    const queryRef = query(
      collection(db, `${currentUser.uid}`),
      orderBy("created", "desc")
    );

    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      // group all photos in album
      const albums = Object.entries(groupBy(data, "album")).map(
        ([, v]) => v[0]
      );

      setData(albums);
    });
    return unsubscribe;
  }, []);

  return data;
};

export default useGetAllAlbums;

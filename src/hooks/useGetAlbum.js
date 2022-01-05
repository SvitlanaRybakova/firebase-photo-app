import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";

const useGetAlbum = () => {
  const { currentUser } = useAuthContext();


  const [albumName, setAlbumName] = useState(null);
  const [albumFirestoreId, setAlbumFirestoreId] = useState(null);
  const [totalPhotosInFirestore, setPhotosInFirestore] = useState(null);
  const [photosInFirestore, setPhotoInFirestore] = useState(null);

  useEffect(() => {
    if (albumName) {
      const ref = collection(db, `${currentUser.uid}`);

      const q = query(ref, where("album", "==", albumName));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        //  got an array because of the collection - method (firebase API). Requires iteration to get the values of interest Can't use doc due to id is unknown
        if (data) {
          console.log("inside");
          data.map((album) => {
            if (album.album === albumName) {
              console.log(
                "album.album === albumName",
                album.album === albumName
              );
              setAlbumFirestoreId(album.id);
              setPhotosInFirestore(album.totalPhotos);
              setPhotoInFirestore([...album.photos]);
            } else {
              setAlbomExistInFirestore(false);
            }
          });
        }
      });
      return unsubscribe;
    }
  }, [albumName]);

  return {
    setAlbumName,
    albumFirestoreId,
    totalPhotosInFirestore,
    photosInFirestore,
  };
};

export default useGetAlbum;

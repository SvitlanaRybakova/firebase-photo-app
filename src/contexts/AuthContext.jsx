import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { PuffLoader } from "react-spinners";
import { auth } from "../firebase";

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  
  // add auth-state-observer (listen for auth-state changes)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const values = {
    // here be everything the children needs/should be able to use
    currentUser,
    loading,
    login,
    logout,
    signup,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={values}>
      {loading && (
        <div id="spinner">
          <PuffLoader color={"#888"} size={50} />
        </div>
      )}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthContextProvider as default };

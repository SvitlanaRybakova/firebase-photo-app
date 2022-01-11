import React, { useState, useRef } from "react";
import { useNavigate} from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";
import RegistrationForm from "../components/RegistrationForm";

const Login = () => {
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const loginFields = [
    {
      id: "email",
      label: "Email",
      type: "email",
      ref: emailRef,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      ref: passwordRef,
    },
  ];

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    console.warn(emailRef.current.value, passwordRef.current.value);
    // login
    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
      // throw an error at login
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <RegistrationForm
      title={"Log In"}
      fields={loginFields}
      handleSubmit={handleLoginSubmit}
      error={error}
      loading={loading}
    />
  );
};

export default Login;

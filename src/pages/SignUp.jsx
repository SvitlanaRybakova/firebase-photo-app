import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import RegistrationForm from "../components/RegistrationForm";

const SignUp = () => {
  const { signup } = useAuthContext();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const signUpFields = [
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
    {
      id: "confirm-password",
      label: "Confirm Password",
      type: "password",
      ref: confirmPasswordRef,
    },
  ];

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (passwordRef.current.value == confirmPasswordRef.current.value) {
      try {
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value);

        navigate("/");
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    } else {
      setError("The passwords does not match");
    }
  };
  return (
    <RegistrationForm
      title={"Sign Up"}
      fields={signUpFields}
      handleSubmit={handleSignUpSubmit}
      error={error}
      loading={loading}
    />
  );
};

export default SignUp;

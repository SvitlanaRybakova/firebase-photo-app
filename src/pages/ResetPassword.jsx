import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import RegistrationForm from "../components/RegistrationForm";

const ResetPassword = () => {
  const emailRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuthContext();
  const navigate = useNavigate();

  const resetPasswordFields = [
    {
      id: "email",
      label: "Email",
      type: "email",
      ref: emailRef,
    },
  ];
  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      await resetPassword(emailRef.current.value);
      navigate("/");
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
      <RegistrationForm
        title={"Reset Password"}
        fields={resetPasswordFields}
        handleSubmit={handleResetPasswordSubmit}
        error={error}
        loading={loading}
      />
  
  );
};

export default ResetPassword;

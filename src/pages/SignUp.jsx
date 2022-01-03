import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Col, Row, Card, Form, Button, Alert } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../contexts/AuthContext";

const SignUp = () => {
  const { signup, setDisplayName, currentUser } = useAuthContext();
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
      ref: emailRef,
    },
    {
      id: "password",
      label: "Password",
      ref: passwordRef,
    },
    {
      id: "confirm-password",
      label: "Confirm Password",
      ref: confirmPasswordRef,
    },
  ];

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (passwordRef.current.value == confirmPasswordRef.current.value) {
      try {
        setLoading(true);
        signup(emailRef.current.value, passwordRef.current.value);

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
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="my-4">
          <Card>
            <Card.Body>
              <Card.Title className="mb-3 text-center">Sign Up</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSignUpSubmit}>
                {signUpFields.map((field) => (
                  <Form.Group id={field.id} className="mb-3" key={uuidv4()}>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control type="email" ref={field.ref} required />
                  </Form.Group>
                ))}
                <Button disabled={loading} type="submit" variant="dark">
                  Sign Up
                </Button>
              </Form>

              <div className="text-center mt-3">
                <Link to="/reset-password">Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>

          <div className="text-center mt-3">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SignUp;

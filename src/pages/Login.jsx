import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Col, Row, Card, Form, Button, Alert } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import {useAuthContext} from "../contexts/AuthContext";

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
      ref: emailRef,
    },
    {
      id: "password",
      label: "Password",
      ref: passwordRef,
    },
  ];

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
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
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="my-4">
          <Card>
            <Card.Body>
              <Card.Title className="mb-3 text-center">Log In</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleLoginSubmit}>
                {loginFields.map((field) => (
                  <Form.Group id={field.id} className="mb-3" key={uuidv4()}>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control type="email" ref={field.ref} required />
                  </Form.Group>
                ))}
                <Button disabled={loading} type="submit" variant="dark">
                  Log In
                </Button>
              </Form>

              <div className="text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>

          <div className="text-center mt-3">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Login;

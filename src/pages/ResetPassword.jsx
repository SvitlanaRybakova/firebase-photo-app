import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const ResetPassword = () => {
  const emailRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="my-4 text-center">
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">Reset Password</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>

                <Button disabled={loading} type="submit" variant="dark">
                  Reset password
                </Button>
              </Form>

              <div className="text-center mt-3">
                <Link to="/login">Login</Link>
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

export default ResetPassword;

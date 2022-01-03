import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Col, Row, Card, Form, Button, Alert } from "react-bootstrap";

const RegistrationForm = ({ fields, handleSubmit, error, title, loading }) => {
  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="my-4">
          <Card>
            <Card.Body>
              <Card.Title className="mb-3 text-center">{title}</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                {fields.map((field) => (
                  <Form.Group id={field.id} className="mb-3" key={uuidv4()}>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control type={field.type} ref={field.ref} required />
                  </Form.Group>
                ))}
                <Button disabled={loading} type="submit" variant="dark">
                  {title}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <Link to="/reset-password">Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>

          <div className="text-center mt-3">
            {title === "Sign Up" ? (
              <>
                Already have an account? <Link to="/login">Log In</Link>
              </>
            ) : (
              <>
                Need an account? <Link to="/signup">Sign Up</Link>{" "}
              </>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default RegistrationForm;

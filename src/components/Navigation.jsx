import React, { useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const Navigation = () => {
  const [error, setError] = useState()
  const { currentUser, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogOutClick = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await logout();
      navigate("/");

      /* Catch error */
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/" className="navbar-brand">
          Photo
        </Link>

        <Nav className="me-auto">
          {currentUser ? (
            <>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <p className="text-light">
                Hello, {currentUser.displayName || currentUser.email}
              </p>
              <Button variant="light" onClick={handleLogOutClick}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
              <NavLink to="/signup" className="nav-link">
                Signup
              </NavLink>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;

import React, { useState } from "react";
import { Navbar, Container, Nav, Button, NavDropdown} from "react-bootstrap";
import { Link, NavLink, useNavigate  } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const Navigation = () => {
  const [error, setError] = useState();
  const { currentUser, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogOutClick = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await logout();
      navigate("/");

      /* Catch error */
    } catch (err) {
      setError(err.message);
      console.warn("Log Out error", error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Link to="/" className="navbar-brand">
          Photo
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-between" style={{ width: "100%" }}>
            {currentUser ? (
              <>
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <div className="d-flex flex-column flex-md-row  align-baseline align-items-md-center">
                  <span className="text-light" style={{ marginRight: "1rem" }}>
                    Hello, {currentUser.displayName || currentUser.email}
                  </span>
                  <Button variant="light" onClick={handleLogOutClick}>
                    Log Out
                  </Button>
                </div>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

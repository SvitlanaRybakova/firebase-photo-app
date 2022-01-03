import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">Photo</Link>
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;

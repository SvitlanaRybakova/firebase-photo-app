import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
      
          <Link to="/" className="navbar-brand">
            Photo
          </Link>
        

        <Nav className="me-auto">
        
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
         
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;

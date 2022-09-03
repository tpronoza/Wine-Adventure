/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Wine Adventure</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            <Link passHref href="/">
              <Nav.Link>Recommendations</Nav.Link>
            </Link>
            <Link passHref href="/wine/new">
              <Nav.Link>Add New Wine</Nav.Link>
            </Link>
            <Link passHref href="/wine101">
              <Nav.Link>Wine 101</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>Profile</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// NavBar.propTypes = {
//   user: PropTypes.shape({
//     displayName: PropTypes.string,
//     photoURL: PropTypes.string,
//   }).isRequired,
// };

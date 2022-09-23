/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, NavDropdown,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
// import SearchBar from './SearchBar';
// import { getWines } from '../api/wineData';
// import { useAuth } from '../utils/context/authContext';
// import WineCard from './WineCard';

export default function NavBar() {
  // const [wines, setWines] = useState([]);
  // const { user } = useAuth();

  // const [filteredResults, setFilteredResults] = useState([]);
  // const [searchInput, setSearchInput] = useState('');

  // const getAllTheWines = () => {
  //   getWines(user.uid).then(setWines);
  // };

  // useEffect(() => {
  //   getAllTheWines();
  // }, []);

  // const searchItems = (searchValue) => {
  //   setSearchInput(searchValue);
  //   if (searchInput !== '') {
  //     const filteredData = wines.filter((question) => Object.values(question).join('').toLowerCase().includes(searchInput.toLowerCase()));
  //     setFilteredResults(filteredData);
  //   } else { setFilteredResults(wines); }
  // };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Wine Adventure</Navbar.Brand>
        </Link>
        {/* <SearchBar>
          <form className="d-flex search-me" role="search">
            <input className="form-control me-2" type="search" placeholder="&#128269; Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </SearchBar> */}

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
            {/* <Link passHref href="/profile">
              <Nav.Link>Profile</Nav.Link>
            </Link> */}
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="More"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/favorite">
                Favorite
              </NavDropdown.Item>
              <NavDropdown.Item href="/wishList">Wish List</NavDropdown.Item>
              <NavDropdown.Item href="/wineList">
                Wine List
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Button type="button" className="btn btn-secondary btn-sml copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </Navbar>
  );
}

// NavBar.propTypes = {
//   user: PropTypes.shape({
//     displayName: PropTypes.string,
//     photoURL: PropTypes.string,
//   }).isRequired,
// };

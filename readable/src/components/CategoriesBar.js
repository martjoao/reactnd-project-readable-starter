import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';


const CategoriesBar = props => (
  <Navbar inverse fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Readable</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      {props.categories.map(category => (
        <LinkContainer key={category} to={`/${category}`}>
          <NavItem>{category}</NavItem>
        </LinkContainer>
      ))}
    </Nav>
  </Navbar>
);

CategoriesBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
};

CategoriesBar.defaultProps = {
  categories: [],
};

export default CategoriesBar;

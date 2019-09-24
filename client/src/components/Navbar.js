import React, {Component, Fragment} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
  //NavLink
} from 'reactstrap';

import RegisterModal from './auth/RegisterModal';
import ItemModal from './ItemModal';

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  render() {
    return (
      <Fragment>
        <Navbar className='mb-3' color='dark' dark expand='sm'>
          <NavbarBrand href='/'>Shopping List</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink
                  exact
                  to='/'
                  className='nav-link'
                  activeClassName='active'
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  exact
                  to='/items'
                  className='nav-link'
                  activeClassName='active'
                >
                  List Items
                </NavLink>
              </NavItem>
              <NavItem>
                <ItemModal />
              </NavItem>
              <NavItem>
                <RegisterModal />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Fragment>
    );
  }
}

export default AppNavbar;

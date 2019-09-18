import React, {Component, Fragment} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

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
                <NavLink href='https://github.com/reactstrap/reactstrap'>
                  GitHub
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Fragment>
    );
  }
}

export default AppNavbar;

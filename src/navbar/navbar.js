import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import Signin from '../signin/signin';
import Signup from '../signup/signup';
import "./navbar.css";
import axios from 'axios';

export default class Navbar2 extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.signIn=this.signIn.bind(this)
    this.state = {
      isOpen: false,
      test:"test"
    };
  }
  signIn() {
    axios.post('/signInData', { username: this.state.username, password: this.state.password }).then((result) => {
      this.setState({
        signInMessage: result.data,
        nestedModal: !this.state.nestedModal,
        closeAll: false,
        userData: {
          username: '',
          password: ''
        }
      });
    })
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">Biking Hector</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu >
                  <DropdownItem>
                    <Signup/>
                  </DropdownItem>
                  <DropdownItem>
                    <Signin signIn = {this.props.signIn} signInCheck={this.props.signInCheck}/>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
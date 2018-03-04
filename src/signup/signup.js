/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";
import "./signup.css";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false,
      username: '',
      password: '',
      password2: "",
      message: "placeholder",
      style: {
        color: "black"
      }
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleNested() {
    if (this.state.password === this.state.password2) {
      if (this.state.nestedModal === false) {
        axios.post('/signUpData', { username: this.state.username, password: this.state.password }).then((result) => {
          this.setState({
            message: result.data,
            style: {
              color: "black"
            },
            nestedModal: !this.state.nestedModal,
            closeAll: false,
            userData: {
              username: '',
              password: '',
            }
          });
        })
      } else {
        this.setState({
          nestedModal: !this.state.nestedModal,
          closeAll: false,
          userData: {
            username: '',
            password: '',
          }
        });
      }
    } else {
      this.setState({
        message: "Passwords must match",
        style: {
          color: "red"
        },
        nestedModal: !this.state.nestedModal,
        closeAll: false,
        userData: {
          username: '',
          password: '',
        },
      });
    }
  }

  toggleAll() {
    if (this.state.message === "Passwords must match") {
      this.setState({
        nestedModal: !this.state.nestedModal,
        closeAll: false,
      });
    } else {
      this.setState({
        nestedModal: !this.state.nestedModal,
        closeAll: true,
      });
    }
  }

  onUserChange = (e) => {
    this.setState({
      username: (e.target.value)
    });
  }

  onPasswordChange = (e) => {
    this.setState({
      password: (e.target.value)
    });
  }

  onPassword2Change = (e) => {
    this.setState({
      password2: (e.target.value)
    });
  }

  render() {
    return (
      <div >
        <Button id="signUpBtn" onClick={this.toggle}>Sign Up{this.props.buttonLabel}</Button>
        <Modal id="signUpModal" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Welcome!</ModalHeader>
          <ModalBody>
            <div id="inputFieldSignUp">
              <b className="usernameText">Username:</b><br />
              <input id="usernameInput" type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.onUserChange} />
              <br />
              <br />
              <b>Password:</b>
              <br />
              <input id="passwordInput" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
              <br />
              <input id="password2Input" type="password" name="password2" placeholder="Re-enter password" value={this.state.password2} onChange={this.onPassword2Change} />
              <br />
            </div>
            <Modal style={this.state.style} isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
              <ModalHeader>{this.state.message}</ModalHeader>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggleAll}>Ok</Button>
              </ModalFooter>
            </Modal>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggleNested}>Sign Up</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

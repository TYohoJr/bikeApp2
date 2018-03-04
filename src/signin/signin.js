/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./signin.css";

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false,
      username: '',
      password: '',
      signInMessage: "",
      signInCheck: false,
      passwordType: "password"
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.showPassword = this.showPassword.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleNested() {
    this.props.signIn(this.state.username, this.state.password).then((result) => {
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

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
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

  showPassword(){
    if(this.state.passwordType === "password"){
      this.setState({
        passwordType: "text"
      })
    } else {
      this.setState({
        passwordType: "password"
      })
    }
  }

  render() {
    return (
      <div>
        <Button id="signInBtn" onClick={this.toggle}>Sign In{this.props.buttonLabel}
        </Button>
        <Modal id="signInModal" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Welcome!</ModalHeader>
          <ModalBody>
            <div id="inputFieldsSignIn">
              <b className="usernameText">Username:</b><br />
              <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.onUserChange} />
              <br />
              <br />
              <b>Password:</b>
              <br />
              <input type={this.state.passwordType} name="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
              <br />
              <p><input type="checkbox" onClick={this.showPassword}/> Show password</p>
            </div>
            {/* <Button color="success" onClick={this.toggleNested}>Sign In</Button> */}
            <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
              <ModalHeader>{this.state.signInMessage}</ModalHeader>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggleAll}>Ok</Button>
              </ModalFooter>
            </Modal>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggleNested}>Sign In</Button>
            {/* <Button color="secondary" onClick={this.toggle}>Cancel</Button> */}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

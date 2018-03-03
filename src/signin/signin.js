/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";
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
      signInCheck: false
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
    // axios.post('/signInData', { username: this.state.username, password: this.state.password }).then((result) => {
     this.props.signIn(this.state.username, this.state.password).then((result)=>{
      this.setState({
        signInMessage: result.data.message,
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

  render() {
    console.log(this.props.signInCheck)
    return (
      <div>
        <Button onClick={this.toggle}>Sign In{this.props.buttonLabel}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Welcome!</ModalHeader>
          <ModalBody>
            <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.onUserChange} />
            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
            <br />
            <Button color="success" onClick={this.toggleNested}>Sign In</Button>
            <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
              <ModalHeader>{this.state.signInMessage}</ModalHeader>
              {/* <ModalBody>Stuff and things</ModalBody> */}
              <ModalFooter>
                {/* <Button color="primary" onClick={this.toggleNested}>Done</Button>{' '} */}
                <Button color="secondary" onClick={this.toggleAll}>Ok</Button>
              </ModalFooter>
            </Modal>
          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

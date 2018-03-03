/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";
import "./signup.css";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false,
      username: '',
      password: '',
      message: "",
      work: ""
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onWorkChange = this.onWorkChange.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleNested() {
    if (this.state.nestedModal === false) {
      axios.post('/signUpData', { username: this.state.username, password: this.state.password, work: this.state.work }).then((result) => {
        this.setState({
          message: result.data,
          nestedModal: !this.state.nestedModal,
          closeAll: false,
          userData: {
            username: '',
            password: '',
            work:""
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
          work:""
        }
      });
    }


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

  onWorkChange = (e) => {
    this.setState({
      work: (e.target.value)
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle}>Sign Up{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Welcome!</ModalHeader>
          <ModalBody>
            <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.onUserChange} />
            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
            <input type="text" name="work" placeholder="Work Address" value={this.state.work} onChange={this.onWorkChange} />

            <br />
            <Button color="success" onClick={this.toggleNested}>Sign Up</Button>
            <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
              <ModalHeader>{this.state.message}</ModalHeader>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggleAll}>Ok</Button>
              </ModalFooter>
            </Modal>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Signup;

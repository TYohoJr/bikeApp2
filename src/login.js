import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


export default class Login extends Component {
  render() {
    return (
      <div className="Login">
        <header className="Login-header">
          <img src={logo} className="Login-logo" alt="logo" />
          <h1 className="Login-title">Welcome to Login</h1>
        </header>
        <p className="Login-intro">
        </p>
      </div>
    );
  }
}


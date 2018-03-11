import React, { Component } from 'react';
import './App.css';
import Map from "./maps/maps.js";
import Navbar2 from "./navbar/navbar";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super();
    this.signIn = this.signIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.state = {
      signInCheck: 'hidden',
      isMapPresent: false
    }
  }

  signIn(username, password) {
    return new Promise((resolve, reject) => {
      axios.post('/signInData', { username: username, password: password }).then((result) => {
        if (result.data.message === 'Login successful!') {
          localStorage.setItem('token', result.data.myToken);
          this.setState({
            isMapPresent: true,
          })
        } else {
          this.setState({
            username:""
          })
        }
        resolve(result)
      })
    })
  }

  logOut() {
    localStorage.clear();
    this.setState({
      isMapPresent:false
    })
    // window.location.href = '/xx'
  }

  render() {
    var map
    if (this.state.isMapPresent === true) {
      map = <Map />
      document.getElementById("signInText").innerHTML = "";
    } else {
      map = ""
    }
    return (
      <div>
        <Navbar2 signIn={this.signIn} signInCheck={this.state.signInCheck} logOut={this.logOut}/>
        <div className="App">
          <header className="App-header">
            <img src={'http://twentynineinches.com/wp-content/uploads/2011/01/drive_train.image.+media+images+cycling+products+bikecomponents+CS+CS-M980_1200x900_v1_m56577569830716976_dot_png.bm.800.0.png'} className="App-logo" alt="logo" />
            <h1 className="App-title">The Healthier Way to Ride to Work</h1>
          </header>
          <p className="App-intro" id="signInText">
            Please sign in above to get started
          </p>
          <div>
            {map}
          </div>
        </div>
      </div>
    );
  }
}

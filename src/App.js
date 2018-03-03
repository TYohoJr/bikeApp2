import React, { Component } from 'react';
import './App.css';
import Map from "./maps/maps.js";
import Navbar2 from "./navbar/navbar";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.signIn = this.signIn.bind(this)
    this.state = {
      signInCheck: 'hidden',
      isMapPresent: false,
      userWork: "bozeman"
    }
  }
  signIn(username, password) {
    return new Promise((resolve, reject) => {
      axios.post('/signInData', { username: username, password: password}).then((result) => {
        if (result.data.message === 'Login successful!') {
          console.log(result)
          this.setState({
           isMapPresent: true,
           userWork:result.data.user.work
          })
        }
          resolve(result)
        })
    })
  }

  render() {
    var map
    if (this.state.isMapPresent === true) {
      map = <Map userWork = {this.state.userWork}/>
    } 

    return (
      <div>
        <Navbar2 signIn={this.signIn} signInCheck={this.state.signInCheck} />
        <div className="App">
          <header className="App-header">
            <img src={'http://twentynineinches.com/wp-content/uploads/2011/01/drive_train.image.+media+images+cycling+products+bikecomponents+CS+CS-M980_1200x900_v1_m56577569830716976_dot_png.bm.800.0.png'} className="App-logo" alt="logo" />
            <h1 className="App-title">The Healthier Way to Ride to Work</h1>
          </header>
          <p className="App-intro">
            Click on links above to get started.
          </p>
          <div>
            {map}
          </div>
        </div>
      </div>
    );
  }
}

export default App; 
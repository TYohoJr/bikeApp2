import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './login.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./login.js";
import Map from "./maps.js";
import Navbar2 from "./navbar";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import Signin from './popup'






const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);



const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/About">About</Link>
        </li>
      </ul>

      <hr />

    <Route exact path="/" component={Home} />
      <Route path="/About" component={About} />
    </div>
  </Router>
);

class App extends Component {

  componentDidMount(){
    axios.post("/insertUser").then((data)=>{
      console.log(data);
    })
  }

  render() {
    return (
      <div><Navbar2 />
      <div className="App">
        <header className="App-header">
          <img src={'http://twentynineinches.com/wp-content/uploads/2011/01/drive_train.image.+media+images+cycling+products+bikecomponents+CS+CS-M980_1200x900_v1_m56577569830716976_dot_png.bm.800.0.png'} className="App-logo" alt="logo" />
          <h1 className="App-title">The Healthier Way to Ride to Work</h1>
        </header>
        <p className="App-intro">
          Click on links above to get started.
        </p>
        <div>
          <Map />
          <BasicExample /> 
          <Signin />
        </div>
        </div>
      </div>
    );
  }
}

export default App; 
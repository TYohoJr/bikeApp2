import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './login.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./login.js";
import Map from "./maps.js";





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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <Map />
          <BasicExample />
        </div>
      </div>
    );
  }
}

export default App; 
import React, { Component } from 'react';
import "./maps.css";
import axios from 'axios';

const google = window.google;
var map, infoWindow;
var pos

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      work: '',
    }

    this.findRoute = this.findRoute.bind(this);
    this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();

  }

  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: { lat: pos.lat, lng: pos.lng },
      destination: document.getElementById('end').value,
      travelMode: 'BICYCLING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  componentDidMount() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: { lat: 45.676998, lng: -111.042931 }
    });
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
    this.directionsDisplay.setMap(map);

    var onChangeHandler = function () {
      this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
      var bikeLayer = new google.maps.BicyclingLayer();
      bikeLayer.setMap(map);
    };
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);



  }

  findRoute() {
    axios.post('/findRoute', { token: localStorage.getItem("token") }).then((result) => {
      this.setState({
        work: result.data[0].work
      })
      document.getElementById('end').value = this.state.work;
      this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay)
    })
  }

  render() {
    infoWindow = new google.maps.InfoWindow();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('You are here, possibly.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }

    return (
      <div>
        <div id="floating-panel">
          <button onClick={this.findRoute}>Get me to work!</button>
          <b>Start: </b>
          <p id="start">Your Location</p>
          <b>End: </b><br />
          <p id="end">{this.state.work}</p>
        </div>
        <div id="map"></div>
      </div>
    )
  }
}


import React, { Component } from 'react';
import "./maps.css"

const google = window.google;
var map, infoWindow;
var pos

export default class Map extends Component {
  componentDidMount() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: { lat: 41.85, lng: -87.65 }
    });
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
    directionsDisplay.setMap(map);

    var onChangeHandler = function () {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
      var bikeLayer = new google.maps.BicyclingLayer();
      bikeLayer.setMap(map);
    };
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
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
          <b>Start: </b>
          <p id="start">Your Location</p>
          <b>End: </b><br/>
          <input id="end" type="text" placeholder="Enter your work" />
        </div>
        <div id="map"></div>
      </div>
    )
  }
}


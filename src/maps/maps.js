import React, { Component } from 'react';
import "./maps.css"

const google = window.google;

export default class Map extends Component {  
  componentDidMount(){
    var uluru = {lat: 45.676998, lng: -111.042934};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map});
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
  }

  render() {
    return(
      <div>
        <div id="map">
        </div>
      </div>
    )
  }
}


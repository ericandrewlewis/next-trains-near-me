import React, { Component } from "react";
import Geolocation from "react-geolocation";
import SubwayDeparturesPage from '../SubwayDeparturesPage';
import "./style.css";
const locations = [
  {
    lat: 40.6872257,
    long: -73.9737066
  },
  {
    lat: 40.7359,
    long: -73.9911
  },
  // Franklin Ave Shuttle
  {
    lat: 40.678211,
    long: -73.9596304
  },
  // Times Square
  {
    lat: 40.7542647,
    long: -73.98682
  },
  // Flushing Main St
  {
    lat: 40.7595582,
    long: -73.8321161
  },
  // Rockaway
  {
    lat: 40.5805469,
    long: -73.8396189
  },
];

class App extends Component {
  render() {
    return (
      <div className="app">
        <Geolocation
          onSuccess={console.log}
          maximumAge={120}
          render={({
            fetchingPosition,
            position: { coords: { latitude, longitude } = {} } = {},
            error,
            getCurrentPosition
          }) =>
            <div>
              <h1 className="website-title">Next Trains 🚈 🌎 ⏱</h1>
              {error &&
                <div>
                  {error.message}
                </div>}
              {fetchingPosition &&
                <div>
                  <h2 className="loading-message">Determining your location...</h2>
                  <h2 className="loading-message">🌍🌎🌏</h2>
                </div>
              }
              {!fetchingPosition && !error && process.env.NODE_ENV === 'development' && <SubwayDeparturesPage
                latitude={locations[5].lat}
                longitude={locations[5].long}
              />}
              {!fetchingPosition && !error && process.env.NODE_ENV === 'production' && <SubwayDeparturesPage
                latitude={latitude}
                longitude={longitude}
              />}
            </div>}
          />
      </div>
    );
  }
}

export default App;

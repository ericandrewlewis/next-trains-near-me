import React, { Component } from "react";
import Geolocation from "react-geolocation";
import SubwayDeparturesPage from '../SubwayDeparturesPage';
import "./style.css";

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
                latitude={40.7359}
                longitude={-73.9911}
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

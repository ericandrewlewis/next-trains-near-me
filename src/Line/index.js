import React, { Component } from "react";
import Departure from '../Departure';
import './style.css';

class Line extends Component {
  render() {
    return (
      <div className="line">
        <h2 class="line-name">{this.props.name}</h2>
        <div className="northbound-southbound-wrapper">
          <div className="northbound">
            <h3 className="northbound-heading">Northbound</h3>
            {this.props.departures.N.slice(0, 5).map(departure => {
              return <Departure time={departure.time} routeId={departure.routeId} />;
            })}
          </div>
          <div className="southbound">
            <h3 className="southbound-heading">Southbound</h3>
            {this.props.departures.S.slice(0, 5).map(departure => {
              return <Departure time={departure.time} routeId={departure.routeId} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Line;
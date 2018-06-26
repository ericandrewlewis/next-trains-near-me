import React, { Component } from "react";
import moment from 'moment-timezone';
import './style.css';

class Line extends Component {
  render() {
    return (
      <div className="line">
        <h2>{this.props.name}</h2>
        <div className="northbound-southbound-wrapper">
          <div className="northbound">
            <h3>Northbound</h3>
            {this.props.departures.N.slice(0, 5).map(departure => {
              const time = moment.unix(departure.time).fromNow(true);
              return (<div>{departure.routeId} {time}</div>);
            })}
          </div>
          <div className="southbound">
            <h3>Southbound</h3>
            {this.props.departures.S.slice(0, 5).map(departure => {
              const time = moment.unix(departure.time).fromNow(true);
              return (<div>{departure.routeId} {time}</div>);
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Line;
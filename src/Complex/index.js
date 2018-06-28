import React, { Component } from "react";
import Line from '../Line';
import './style.css';

class Complex extends Component {
  render() {
    const { id, name, lines, latitude, longitude } = this.props;
    return (
      <div className="complex">
        <h2 className="complex-name">{name}</h2>
        {lines.map(line => {
          return <Line
            key={line.name}
            complexId={id}
            name={line.name}
            latitude={latitude}
            longitude={longitude}
            departures={line.departures}
          />
        })}
      </div>
    );
  }
}

export default Complex;
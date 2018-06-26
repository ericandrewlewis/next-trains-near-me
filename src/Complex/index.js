import React, { Component } from "react";
import Line from '../Line';
import './style.css';

class Complex extends Component {
  render() {
    return (
      <div className="complex">
        <h2 className="complex-name">{this.props.name}</h2>
        {this.props.lines.map(line => {
          return <Line
            key={line.name}
            name={line.name}
            departures={line.departures}
          />
        })}
      </div>
    );
  }
}

export default Complex;
import React, { Component } from "react";
import Departure from '../Departure';
import './style.css';

const lineToBoundsMap = {
  Jamaica: {
    N: 'Manhattan',
    S: 'Queens'
  },
  ['6th Av - Culver']: {
    N: 'Northbound',
    S: 'Southbound'
  },
  Canarsie: {
    N: '8 Av',
    S: 'Brooklyn'
  },
  ['Lexington Av']: {
    N: 'Bronx',
    S: 'Brooklyn'
  },
  ['Broadway - Brighton']: {
    N: 'Uptown',
    S: 'Brooklyn'
  }
}

const getLineBound = (lineName, direction) => {
  if (lineToBoundsMap[lineName]) {
    return lineToBoundsMap[lineName][direction];
  }
  if (direction === 'N') {
    return 'Northbound';
  }
  return 'Southbound';
}


class Line extends Component {
  render() {
    const NBoundName = getLineBound(this.props.name, 'N');
    const SBoundName = getLineBound(this.props.name, 'S');
    return (
      <div className="line">
        {/* <h2 class="line-name">{this.props.name} line</h2> */}
        <div className="northbound-southbound-wrapper">
          <div className="northbound">
            <h3 className="northbound-heading">{NBoundName}</h3>
            {this.props.departures.N.slice(0, 5).map(departure => {
              return <Departure time={departure.time} routeId={departure.routeId} />;
            })}
          </div>
          <div className="southbound">
            <h3 className="southbound-heading">{SBoundName}</h3>
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
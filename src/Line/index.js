import React, { Component } from "react";
import Departure from '../Departure';
import './style.css';
import subwayStations from 'mta-subway-stations';
import unique from 'array-unique';
import complexes from 'mta-subway-complexes';

const getDestinationInfos = (departures) => {
  const uniqueDepartures = departures.reduce((items, departure) => {
    if (!items.find(item => item.destinationStationId === departure.destinationStationId)) {
      items.push(departure);
    }
    return items;
  }, []);

  return uniqueDepartures.map(departure => {
    const station = subwayStations.find(station => station['Station ID'] === departure.destinationStationId);

    if (!station) {
      return null;
    }
    return {
      routeId: departure.routeId,
      station
    }
    // Filter the stations next because we don't have a map for every three-character
    // subway abbreviation and station ID.
    // I should probably log misses somewhere.
  }).filter(value => value !== null);
}

const boroughMap = {
  M: 'Manhattan',
  Bk: 'Brooklyn',
  Q: 'Queens',
  Bx: 'Bronx'
};

const expandBorough = borough => boroughMap[borough];

const getBoundTitle = ({ currentBorough, departures, direction }) => {
  const destinationInfos = getDestinationInfos(departures);
  let titles = destinationInfos.reduce((titles, destinationInfo) => {
    const { station } = destinationInfo;
    if (currentBorough === 'M') {
      if (destinationInfo['routeId'] === 'J') {
        if (station['Borough'] === 'Q') {
          titles.boroughs.push('Brooklyn');
          return titles;
        }
      }
      if (destinationInfo['routeId'] === 'M') {
        if (station['Station ID'] === '108') {
          titles.boroughs.push('Brooklyn');
          return titles;
        }
      }
      if (destinationInfo['routeId'] === 'A') {
        if (station['Borough'] === 'Q') {
          titles.boroughs.push('Brooklyn');
          return titles;
        }
      }
    }
    if (station['Borough'] === currentBorough) {
      titles.stops.push(station['Stop Name']);
    } else {
      titles.boroughs.push(expandBorough(station['Borough']));
    }
    return titles;
  }, { stops: [], boroughs: [] });
  if (titles.stops.length > 1) {
    titles.stops = [expandBorough(currentBorough)];
  }
  titles = titles.stops.concat(unique(titles.boroughs));
  if (titles.length === 0) {
    return direction;
  }
  return titles.join(' / ');
}

class Line extends Component {
  render() {
    const { complexId, departures } = this.props;
    const complex = complexes[complexId];
    const nBoundTitle = getBoundTitle({ currentBorough: complex.borough, departures: departures.N, direction: 'Northbound' });
    const sBoundTitle = getBoundTitle({ currentBorough: complex.borough, departures: departures.S, direction: 'Southbound' });

    return (
      <div className="line">
        {/* <h2 class="line-name">{this.props.name} line</h2> */}
        <div className="northbound-southbound-wrapper">
          <div className="northbound">
            <h3 className="northbound-heading">{nBoundTitle}</h3>
            {this.props.departures.N.slice(0, 5).map(departure => {
              const station = subwayStations.find(station => station['Station ID'] === departure.destinationStationId);
              let destination = '';
              if (station) {
                destination = station['Stop Name'];
              }
              return <Departure
                time={departure.time}
                routeId={departure.routeId}
                destination={destination}
              />;
            })}
          </div>
          <div className="southbound">
            <h3 className="southbound-heading">{sBoundTitle}</h3>
            {this.props.departures.S.slice(0, 5).map(departure => {
              const station = subwayStations.find(station => station['Station ID'] === departure.destinationStationId);
              let destination = '';
              if (station) {
                destination = station['Stop Name'];
              }
              return <Departure
                time={departure.time}
                routeId={departure.routeId}
                destination={destination}
              />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Line;
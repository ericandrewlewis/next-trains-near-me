import React, { Component } from "react";
import Departure from '../Departure';
import './style.css';
import inside from 'point-in-polygon';
import subwayStations from 'mta-subway-stations';
import unique from 'array-unique';
import complexes from 'mta-subway-complexes';

const downtownManhattan = [
  [40.69780325538994, -74.01532834504394],
  [40.705611598265115, -73.99696057770996],
  [40.708344302016926, -73.97653287385253],
  [40.72916122003479, -73.96588986848144],
  [40.7439893024874, -73.96571820710449],
  [40.761024508986516, -74.01241010163574],
  [40.711207014247464, -74.02614301179199],
  [40.701967818833936, -74.02373975251464],
];

const inDowntownManhattan = (lat, long) => {
  return inside([lat, long], downtownManhattan);
}

const getDestinationStations = (departures) => {
  const destinationIds = unique(
    departures.map(departure => departure.destinationStationId)
  );
  return destinationIds.map(destinationId => {
    return subwayStations.find(station => station['Station ID'] === destinationId);
  // Filter the stations next because we don't have a map for every three-character
  // subway abbreviation and station ID.
  // I should probably log misses somewhere.
  }).filter(value => value !== undefined);
}

const boroughMap = {
  M: 'Manhattan',
  Bk: 'Brooklyn',
  Q: 'Queens',
  Bx: 'Bronx'
};

const expandBorough = borough => boroughMap[borough];

const getBoundTitle = ({currentBorough, departures, direction}) => {
  const destinationStations = getDestinationStations(departures);
  let titles = destinationStations.reduce((titles, station) => {
    if (station['Borough'] === currentBorough) {
      titles.stops.push(station['Stop Name']);
    } else {
      titles.boroughs.push(expandBorough(station['Borough']));
    }
    return titles;
  }, {stops: [], boroughs: []});
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
    const { complexId, name, latitude, longitude, departures } = this.props;
    const complex = complexes[complexId];
    const nBoundTitle = getBoundTitle({currentBorough: complex.borough, departures: departures.N, direction: 'Northbound'});
    const sBoundTitle = getBoundTitle({currentBorough: complex.borough, departures: departures.S, direction: 'Southbound'});

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
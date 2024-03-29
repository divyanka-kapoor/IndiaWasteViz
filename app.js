// /* global window */
// import React, {Component} from 'react';
// import {render} from 'react-dom';
// import {StaticMap} from 'react-map-gl';
// import {PhongMaterial} from '@luma.gl/core';
// import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';
// import {HexagonLayer} from '@deck.gl/aggregation-layers';
// import DeckGL from '@deck.gl/react';
// import {MapStylePicker} from './controls';
//
// // Set your mapbox token here
// // const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line
// const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGl2eWFua2EiLCJhIjoiY2swb3RqNmw5MDd0bjNqbXhpZGJxY2NuNyJ9.iRP40a17mVtZaadWnR8oBg';
// // Source data CSV
// const DATA_URL = 'dataindia.csv'; // eslint-disable-line
// // const DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'
//
// const ambientLight = new AmbientLight({
//   color: [255, 255, 255],
//   intensity: 1.0
// });
//
// const pointLight1 = new PointLight({
//   color: [255, 255, 255],
//   intensity: 0.8,
//   position: [-0.144528, 49.739968, 80000]
// });
//
// const pointLight2 = new PointLight({
//   color: [255, 255, 255],
//   intensity: 0.8,
//   position: [-3.807751, 54.104682, 8000]
// });
//
// const lightingEffect = new LightingEffect({ambientLight, pointLight1, pointLight2});
//
// const material = new PhongMaterial({
//   ambient: 0.64,
//   diffuse: 0.6,
//   shininess: 32,
//   specularColor: [51, 51, 51]
// });
//
// const INITIAL_VIEW_STATE = {
//   longitude: 78.9629,
//   latitude: 20.5937,
//   zoom: 6,
//   minZoom: 5,
//   maxZoom: 15,
//   pitch: 40.5,
//   bearing: -27.396674584323023
// };
//
// const colorRange = [
//   [1, 152, 189],
//   [73, 227, 206],
//   [216, 254, 181],
//   [254, 237, 177],
//   [254, 173, 84],
//   [209, 55, 78]
// ];
//
// const OPTIONS = ['radius', 'coverage', 'upperPercentile'];
//
// const elevationScale = {min: 1, max: 50};
//
// const getColorValue = points => average(points.map(p => p.msw_gen_tpd_2011));
//
// /* eslint-disable react/no-deprecated */
// export class App extends Component {
//   static get defaultColorRange() {
//     return colorRange;
//   }
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       elevationScale: elevationScale.min,
//        style: 'mapbox://styles/mapbox/light-v9',
//     };
//
//     this.startAnimationTimer = null;
//     this.intervalTimer = null;
//
//     this._startAnimate = this._startAnimate.bind(this);
//     this._animateHeight = this._animateHeight.bind(this);
//     this.onStyleChange = this.onStyleChange.bind(this);
//   }
//
//   componentDidMount() {
//     this._animate();
//   }
//
//   componentDidUpdate(nextProps) {
//     if (nextProps.data && this.props.data && nextProps.data.msw_gen_tpd_2011 !== this.props.data.msw_gen_tpd_2011) {
//       this._animate();
//     }
//   }
//
//   componentWillUnmount() {
//     this._stopAnimate();
//   }
//
//   _animate() {
//     this._stopAnimate();
//
//     // wait 1.5 secs to start animation so that all data are loaded
//     this.startAnimationTimer = window.setTimeout(this._startAnimate, 1500);
//   }
//
//   _startAnimate() {
//     this.intervalTimer = window.setInterval(this._animateHeight, 20);
//   }
//
//   _stopAnimate() {
//     window.clearTimeout(this.startAnimationTimer);
//     window.clearTimeout(this.intervalTimer);
//   }
//
//   _animateHeight() {
//     if (this.state.elevationScale === elevationScale.max) {
//       this._stopAnimate();
//     } else {
//       this.setState({elevationScale: this.state.elevationScale + 1});
//     }
//   }
//
//   onStyleChange(style) {
//     this.setState({style: this.state.style});
//   }
//
//   _renderLayers() {
//     const {data, radius = 1000, upperPercentile = 100, coverage = 1} = this.props;
//     // const csvData = d3.csv(DATA_URL);
//     // var dataArr =  this.props.data;
//     // console.log(dataArr.forEach( emotion => console.log(emotion) ));
//     return [
//       new HexagonLayer({
//         id: 'heatmap',
//         colorDomain: [0, 50],
//         colorRange,
//         coverage,
//         data,
//         elevationRange: [0, 3000],
//         elevationScale: data ? 50: 0,
//         // elevationScale: data && data[0].msw_gen_tpd_2011 ? 50 : 0,
//         // elevationScale: 25,
//         // getElevationValue: points => Number(points[0].msw_gen_tpd_2001),
//         extruded: true,
//         getPosition: d => d.position,
//         onHover: this.props.onHover,
//         opacity: 1,
//         pickable: Boolean(this.props.onHover),
//         radius,
//         upperPercentile,
//         material,
//         transitions: {
//          elevationScale: 3000
//        }
//      })
//
//
//     ];
//   }
//
//   render() {
//     const {mapStyle = 'mapbox://styles/mapbox/navigation-preview-night-v4'} = this.props;
//
//     return (
//
//       <DeckGL
//         layers={this._renderLayers()}
//         effects={[lightingEffect]}
//         initialViewState={INITIAL_VIEW_STATE}
//         controller={true}
//       >
//         <MapStylePicker onStyleChange={this.onStyleChange} currentStyle={this.state.style}/>
//
//         <StaticMap
//           reuseMaps
//           mapStyle={mapStyle}
//           preventStyleDiffing={true}
//           mapboxApiAccessToken={MAPBOX_TOKEN}
//         />
//       </DeckGL>
//     );
//   }
// }
//
// export function renderToDOM(container) {
//   render(<App />, container);
//
//   require('d3-request').csv(DATA_URL, (error, response) => {
//     if (!error) {
//       const data = response.map(d => [Number(d.lng), Number(d.lat)]);
//       // , Number(d.pop_2001), Number(d.per_capita_2001), Number(d.msw_gen_tpd_2001), Number(d.pop_2011),Number(d.per_capita_2011),Number(d.msw_gen_tpd_2011),d.city]);
//       render(<App data={data} />, container);
//     }
//   });
// }

import React, {Component} from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import {PhongMaterial} from '@luma.gl/core';
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import DeckGL from '@deck.gl/react';

// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGl2eWFua2EiLCJhIjoiY2swb3RqNmw5MDd0bjNqbXhpZGJxY2NuNyJ9.iRP40a17mVtZaadWnR8oBg'; // eslint-disable-line

// Source data CSV
const DATA_URL = 'newdatatest.csv'; // eslint-disable-line
// const DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv';

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000]
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000]
});

const lightingEffect = new LightingEffect({ambientLight, pointLight1, pointLight2});

const material = new PhongMaterial({
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51]
});

const INITIAL_VIEW_STATE = {
  longitude: 78.9629,
  latitude: 20.5937,
  zoom: 6.6,
  minZoom: 5,
  maxZoom: 15,
  pitch: 40.5,
  bearing: -27.396674584323023
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const elevationScale = {min: 1, max: 50};

/* eslint-disable react/no-deprecated */
export class App extends Component {
  static get defaultColorRange() {
    return colorRange;
  }

  constructor(props) {
    super(props);
    this.state = {
      elevationScale: elevationScale.min
    };
  }

  _renderLayers() {
    const {data, radius = 35000, upperPercentile = 100, coverage = 1} = this.props;

    return [
      new HexagonLayer({
        id: 'heatmap',
        colorRange,
        coverage,
        data,
        elevationRange: [0, 3000],
        elevationScale: data && data.length ? 150 : 0,
        extruded: true,
        getPosition: d => d,
        onHover: this.props.onHover,
        opacity: 1,
        pickable: Boolean(this.props.onHover),
        radius,
        upperPercentile,
        material,

        transitions: {
          elevationScale: 3000
        }
      })
    ];
  }

  render() {
    const {mapStyle = 'mapbox://styles/mapbox/dark-v9'} = this.props;

    return (
      <DeckGL
        layers={this._renderLayers()}
        effects={[lightingEffect]}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
      >
        <StaticMap
          reuseMaps
          mapStyle={mapStyle}
          preventStyleDiffing={true}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      </DeckGL>
    );
  }
}

export function renderToDOM(container) {
  render(<App />, container);

  require('d3-request').csv(DATA_URL, (error, response) => {
    if (!error) {
      const data = response.map(d => [Number(d.lng), Number(d.lat)]);
      render(<App data={data} />, container);
    }
  });
}

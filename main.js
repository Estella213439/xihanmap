

// import 'ol/ol.css';
// import {fromLonLat} from 'ol/proj';
// import {Map, View} from 'ol';
// import {Vector as VectorLayer, Tile as TileLayer} from 'ol/layer';
// import {Vector as VectorSource, Stamen} from 'ol/source';
// import Feature from 'ol/Feature';
// import Point from 'ol/geom/Point';


//Leaflet

var container = L.DomUtil.get('mapid');
if(container != null){
container._leaflet_id = null;
}

var mymap = L.map('mapid').setView([30, 120], 5);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXN0ZWxsYTIxMzQzOSIsImEiOiJjanJ1eTRndHgzMDY2M3lsYXMwaHVqNGVuIn0.-NQ2jPS_wCAxQ2bCVbsabA'
}).addTo(mymap);

function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.name) {
      layer.bindPopup(feature.properties.name);
  }
}

var geojson = new L.GeoJSON.AJAX("test.geojson");
geojson.on('data:loaded', function(){
geojson.addTo(mymap);
});


// var circle = L.circle([51.508, -0.11], {
//   color: 'red',
//   fillColor: '#f03',
//   fillOpacity: 0.5,
//   radius: 500
// }).addTo(mymap);

// var polygon = L.polygon([
//   [51.509, -0.08],
//   [51.503, -0.06],
//   [51.51, -0.047]
// ]).addTo(mymap);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");

// var popup = L.popup()
//     .setLatLng([51.5, -0.09])
//     .setContent("I am a standalone popup.")
//     .openOn(mymap);



// function onMapClick(e) {
//       alert("You clicked the map at " + e.latlng);
//   }
  
//   mymap.on('click', onMapClick);    

//   var popup = L.popup();

// function onMapClick(e) {
//       popup
//           .setLatLng(e.latlng)
//           .setContent("You clicked the map at " + e.latlng.toString())
//           .openOn(mymap);
//   }
  
//   mymap.on('click', onMapClick);


//OpenLayer
// const washingtonLonLat = [116, 35.895];
// const washingtonWebMercator = fromLonLat(washingtonLonLat);


// const source = new VectorSource();

// const client = new XMLHttpRequest();
// client.open('GET', 'data/meteorites.csv');
// client.onload = function() {
//   const csv = client.responseText;
//   const features = [];

//   let prevIndex = csv.indexOf('\n') + 1; // scan past the header line

//   let curIndex;
//   while ((curIndex = csv.indexOf('\n', prevIndex)) != -1) {
//     const line = csv.substr(prevIndex, curIndex - prevIndex).split(',');
//     prevIndex = curIndex + 1;

//     const coords = fromLonLat([parseFloat(line[4]), parseFloat(line[3])]);
//     if (isNaN(coords[0]) || isNaN(coords[1])) {
//       // guard against bad data
//       continue;
//     }

//     features.push(new Feature({
//       mass: parseFloat(line[1]) || 0,
//       year: parseInt(line[2]) || 0,
//       geometry: new Point(coords)
//     }));
//   }
//   source.addFeatures(features);
// };
// client.send();


// new Map({
//   target: 'map-container',
//   layers: [
//     new TileLayer({
//       source: new Stamen({
//         layer: 'toner'
//       })
//     }),
//     new VectorLayer({
//       source: source
//     })
//   ],
//   view: new View({
//     center: washingtonWebMercator,
//     zoom: 5
//   })
// });
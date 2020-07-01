//IMPORT TILES

var myIcon;
var mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
var mURL = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXN0ZWxsYTIxMzQzOSIsImEiOiJjanJ1eTRndHgzMDY2M3lsYXMwaHVqNGVuIn0.-NQ2jPS_wCAxQ2bCVbsabA';
var satellite = L.tileLayer(mURL, {id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution,}),
    streets   = L.tileLayer(mURL, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution}),
    topography = L.tileLayer(mURL, {id: 'estella213439/ck76lx6r4010e1iqztwsspjl5', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});



//TIME SLIDER

var slider = L.timelineSliderControl({
  formatOutput: function(date){
    return moment(date).format("YYYY");
  }
});


var domainPoint = new L.timeline(markers1, {
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(popup(feature));
    },
  filter: function(feature, layer) {
    if (feature.properties.type == "domain"){
      return true;
    }
    else{
      return false;
    } 
  }}
);
var originPoint = new L.timeline(markers1, {
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(popup(feature));
    },
  filter: function(feature, layer) {
    if (feature.properties.type == "origin"){
      return true;
    }
    else{
      return false;
    } 
  }});
var tombPoint = new L.timeline(markers1, {
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(popup(feature));
    },
  filter: function(feature, layer) {
    if (feature.properties.type == "tomb"){
      return true;
    }
    else{
      return false;
    } 
  }});

  //CREATE MAP
  var mymap = L.map('mapid', {
    zoom: 6,
    center: new L.latLng(35, 115),
    layers: [topography]
  });

  mymap.addControl(slider);
// var pointTimeline = L.timeline(markers1, {
//   onEachFeature: function(feature, layer) {
//   layer.bindTooltip(popup(feature));
//   }
//     // pointToLayer: function(feature, latlng) {
//   //   return L.marker(latlng,{icon: myIcon})
// });
slider.addTimelines(domainPoint,originPoint,tombPoint);

//POPUP

function popup(feature){
  var popup;
  if (feature.properties.type == "domain") {
    popup = "<strong style='color: #84b819'>" +  feature.properties.domain_en +' '+ feature.properties.domain_ch +" </strong><br>" +'<b>Name:</b> '+ feature.properties.name_en + ' '+feature.properties.name_ch + '<br/><b>Regnal Year: </b>'+feature.properties.start_ori + ' B.C.';
    // myIcon = myIconDomain;
  }
  else if (feature.properties.type == "tomb") {
    popup = "<strong style='color: #84b819'>" +  feature.properties.domain_en +' '+ feature.properties.domain_ch + "</strong><br>" +'<b>Name:</b> '+ feature.properties.name_en + ' '+feature.properties.name_ch + '<br/><b>Regnal Year: </b>'+feature.properties.start_ori +' B.C.';
    // myIcon = myIconTomb;
  }
  else if (feature.properties.type == "origin"){
    // myIcon = myIconOthers;
    popup = "<strong style='color: #84b819'>" +  feature.properties.domain_en +' '+ feature.properties.domain_ch + " (Place of Origin)</strong><br>" +'<b>Name:</b> '+ feature.properties.name_en + ' '+feature.properties.name_ch+ '<br/><b>Regnal Year: </b>'+feature.properties.start_ori +' B.C.';
  }
  else if (feature.properties.Type == "County"){
    popup = "<strong style='color: #84b819'>" +  feature.properties.Name_en +' '+ feature.properties.Name + " (Place of Origin)</strong><br>" +'<b>Name:</b> '+ feature.properties.name_en + ' '+feature.properties.name_ch+ '<br/><b>Regnal Year: </b>'+feature.properties.start_ori +' B.C.';
  }
  return popup;
}


//DOMAIN POLYGON

var poly = L.geoJSON(polygon1,{
  onEachFeature: function(feature, layer) {
    layer.bindTooltip("<style='color: #84b819'>" +  feature.properties.Name_en +' '+ feature.properties.Name +"</style='color: #84b819'>")
    },
  style: function(feature) {
    switch (feature.properties.type) {
        case 'County': return {color: "#9544ED"};
        case 'Domain':   return {color: "#E78520"};
    }
  }}).addTo(mymap);


//ALL POINTS

var geoJsonLayer = L.geoJSON(markers1,{
  onEachFeature: function(feature, layer) {
        layer.bindPopup(popup(feature))
        ;
  }
    // pointToLayer: function(feature, latlng) {
  //   return L.marker(latlng,{icon: myIcon})
})
var cluster = L.markerClusterGroup();
cluster.addLayer(geoJsonLayer);

//SEARCH BAR

var controlSearch_domain = new L.Control.Search({
  position:'topleft',    // where do you want the search bar?
  layer: cluster,  // name of the layer
  initial: false,
  propertyName: 'domain_en',
  zoom: 12,        // set zoom to found location when searched
  marker: false,
  textPlaceholder: 'search...',
  minLength: 0, // placeholder while nothing is searched
});
mymap.addControl(controlSearch_domain);

var controlSearch_name = new L.Control.Search({
  position:'topright',    // where do you want the search bar?
  layer: cluster,  // name of the layer
  initial: false,
  propertyName: 'name_en',
  zoom: 12,        // set zoom to found location when searched
  marker: false,
  textPlaceholder: 'search...', // placeholder while nothing is searched
  minLength: 0, // Show full list when no text is typed,
 });

mymap.addControl(controlSearch_name);

// var c = [];
// var line;

controlSearch_name.on('search:locationfound', function(e) {
  var marker =  e.layer;
  marker.setIcon(myIconDomain)
  // mymap.addLayer(marker);
  // mymap.removeLayer(cluster)
  // var x = marker._latlng.lat;
  // var y = marker._latlng.lng;
  // c.push([x, y]);
})
.on('search:collapsed', function(e) {
  var marker =  e.layer;
  marker.setIcon(L.Icon.Default)
  // e.target.setIcon(new myIconDomain);
});

controlSearch_domain.on('search:locationfound', function(e) {
  var marker =  e.layer;
  marker.setIcon(myIconDomain)
})

// function link(c) {
//   line = L.polyline(c).addTo(mymap)
// }

// L.easyButton('origin.svg', function(btn, map){
//   link(c);
// }).addTo(mymap);



var myIconDomain = L.icon({
  iconUrl: "/data/china.svg",
  iconSize: [30, 30],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

// // var myIconTomb = L.icon({
// //   iconUrl: '/data/tomb.svg',
// //   iconSize: [30, 30],
// //   iconAnchor: [9, 21],
// //   popupAnchor: [0, -14]
// // });

// // var myIconOthers = L.icon({
// //   iconUrl: '/data/origin.svg',
// //   iconSize: [30, 30],
// //   iconAnchor: [9, 21],
// //   popupAnchor: [0, -14]
// // });

//POPULATION

function style (feature) {
  return {
  radius: getPop(parseInt(feature.properties.start_ori)),
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
  }
};

function getPop(d) {
  console.log(d)
  return d > 200 ? 10 :
         d > 100 ? 5 :
                  3;
}

var population = L.geoJSON(markers1, {
  pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {style: style});
  },
  onEachFeature: function(feature, layer) 
  { 
    var z = document.createElement('p');
    z.innerHTML =  feature.properties.start_ori
    layer.bindTooltip(z);
    }
}).addTo(mymap);


// TOGGOLE LAYERS

var baseLayers = {
  "Satellite": satellite,
  "Streets": streets,
  "Topography":topography
};
var overlayMaps = {
  // "All Points": cluster,
  // "timeline":pointTimeline,
  "All Points(Search)":cluster,
  "Domain(Timeline)":domainPoint,
  "Origin(Timeline)":originPoint,
  "Tomb(Timeline)":tombPoint,
  "Kingdoms":poly,
  "Population": population
};

L.control.layers(baseLayers, overlayMaps).addTo(mymap);
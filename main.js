var myIcon;

var mymap = L.map('mapid', {
  zoom: 6,
  center: new L.latLng(35, 115)
}),
geojsonOpts = {
  style: function (feature) {
    return {color: feature.properties.color};
  },

  // onEachFeature: function (feature, layer) {
    
  // },
  // pointToLayer: function(feature, latlng) {
  //   return L.marker(latlng,{icon: myIcon})
  // }
}

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'estella213439/ck76lx6r4010e1iqztwsspjl5',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXN0ZWxsYTIxMzQzOSIsImEiOiJjanJ1eTRndHgzMDY2M3lsYXMwaHVqNGVuIn0.-NQ2jPS_wCAxQ2bCVbsabA'
}).addTo(mymap);

var myIconDomain = L.icon({
  iconUrl: "/data/china.svg",
  iconSize: [30, 30],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

var myIconTomb = L.icon({
  iconUrl: '/data/tomb.svg',
  iconSize: [30, 30],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

var myIconOthers = L.icon({
  iconUrl: '/data/origin.svg',
  iconSize: [30, 30],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

// var geoJsonLayer = L.geoJson(markers, geojsonOpts);

// var cluster = L.markerClusterGroup();
// cluster.addLayer(geoJsonLayer);
// mymap.addLayer(cluster);

// var controlSearch_domain = new L.Control.Search({
//   position:'topleft',    // where do you want the search bar?
//   layer: cluster,  // name of the layer
//   initial: false,
//   propertyName: 'domain_en',
//   zoom: 12,        // set zoom to found location when searched
//   marker: false,
//   textPlaceholder: 'search...',
//   minLength: 0, // placeholder while nothing is searched
// });

// mymap.addControl(controlSearch_domain);

// var controlSearch_name = new L.Control.Search({
//   position:'topright',    // where do you want the search bar?
//   layer: cluster,  // name of the layer
//   initial: false,
//   propertyName: 'name_en',
//   zoom: 12,        // set zoom to found location when searched
//   marker: false,
//   textPlaceholder: 'search...', // placeholder while nothing is searched
//   minLength: 0 // Show full list when no text is typed,
//  });

// mymap.addControl(controlSearch_name);

// var c = [];
// var line;

// controlSearch_name.on('search:locationfound', function(e) {
//   var marker =  e.layer;
//   mymap.addLayer(marker);
//   mymap.removeLayer(cluster)
//   console.log(marker);
//   var x = marker._latlng.lat;
//   var y = marker._latlng.lng;
//   c.push([x, y]);``

// })
// .on('search:collapsed', function(e) {
//   //unselect all markers
//   // mymap.removeLayer(marker)
//   mymap.setView([35, 115], 6);
//   mymap.addLayer(cluster);
//   if (e.layer != undefined) {
//     mymap.removeLayer(e.layer);
//   };
//   mymap.removeLayer(geoJsonLayer)
// });

var slider = L.timelineSliderControl({
  formatOutput: function(date){
    return moment(date).format("YYYY-MM-DD");
  }
});
mymap.addControl(slider);

var pointTimeline = L.timeline(markers1, {
  
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(popup(feature));
  }
});
pointTimeline.addTo(mymap);
slider.addTimelines(pointTimeline);

function popup(feature){
  var popup;
  if (feature.properties.type == "domain") {
    popup = "<strong style='color: #84b819'>" +  feature.properties.domain_en +' '+ feature.properties.domain_ch +" </strong><br>" +'<b>Name:</b> '+ feature.properties.name_en + ' '+feature.properties.name_ch + '<br/><b>Regnal Year: </b>'+feature.properties.start_ori + ' B.C.';
    myIcon = myIconDomain;
  }
  else if (feature.properties.type == "tomb") {
    popup = "<strong style='color: #84b819'>" +  feature.properties.domain_en +' '+ feature.properties.domain_ch + "</strong><br>" +'<b>Name:</b> '+ feature.properties.name_en + ' '+feature.properties.name_ch + '<br/><b>Regnal Year: </b>'+feature.properties.start_ori +' B.C.';
    myIcon = myIconTomb;
  }
  else {
    myIcon = myIconOthers;
    var popup = "<strong style='color: #84b819'>" +  feature.properties.domain_en +' '+ feature.properties.domain_ch + " (Place of Origin)</strong><br>" +'<b>Name:</b> '+ feature.properties.name_en + ' '+feature.properties.name_ch+ '<br/><b>Regnal Year: </b>'+feature.properties.start_ori +' B.C.';
  }
  return popup;
}

// function link(c) {
//   line = L.polyline(c).addTo(mymap)
// }

// L.easyButton('origin.svg', function(btn, map){
//   link(c);
// }).addTo(mymap);








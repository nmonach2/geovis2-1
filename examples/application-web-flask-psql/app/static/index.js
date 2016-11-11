var map;

function main() {
  
  map = L.map('map', {
    maxBounds: [[45.75, 5.8], [47.85, 10.55]],
    minZoom: 7
  });

  var p = 0.5; // padding that we accept is not visible on map in favour of closer zoom level
  map.fitBounds([[45.75+p, 5.8+p], [47.85-p, 10.55-p]]);
  
  L.tileLayer('https://api.mapbox.com/styles/v1/ckaiser/cisivjz9i00ax2xp8zrx1ik6q/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2thaXNlciIsImEiOiJaS2cxcmVzIn0.IVsFCwYP0dpDlCdpsAGEcQ', {
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
  }).addTo(map);

  // Ask for the GeoJSON of the cantons, using jQuery's getJson function
  // Careful: there is a function getJSON in jQuery, and geoJson in Lefalet;
  //          note the difference get/geo. jQuery's function is not specific
  //          to geo, it is for all JSON files.
  $.getJSON('/cantons/4326', function(d){
    // In callback function, add GeoJson file
    L.geoJson(d, {style: styleFn}).addTo(map);
  });

}


// Adapted from http://leafletjs.com/examples/choropleth/
function getColor(d) {
    return d > 200000 ? '#800026' :
           d > 140000 ? '#bd0026' :
           d > 100000 ? '#e31a1c' :
           d > 60000  ? '#fc4e2a' :
           d > 50000  ? '#fd8d3c' :
           d > 20000  ? '#feb24c' :
           d > 10000  ? '#fed976' :
                        '#ffeda0';
}


// Adapted from http://leafletjs.com/examples/choropleth/
function styleFn(feature) {
    return {
        fillColor: getColor(feature.properties.superficie),
        weight: 1,
        opacity: 1,
        color: '#fff',
        fillOpacity: 0.7
    };
}


$(main);
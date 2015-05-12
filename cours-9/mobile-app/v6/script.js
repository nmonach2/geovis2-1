var map = null;

function initMap(){
    if (map != null) return;
    map = L.map('mapdiv').setView([46.5, 6.8], 8);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(map);
    
    setTimeout(function(){
        map.invalidateSize();   // fixes a problem with map display
    }, 100);
    
    map.locate({setView: true, maxZoom: 10});
    map.on('locationfound', onLocationFound);
    
    insererHotels();
}


function onLocationFound(e) {
    var currentLocationIcon = L.icon({
        iconUrl: 'img/current-location.png',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -35]
    });
    L.marker(e.latlng, {
        icon: currentLocationIcon
    }).addTo(map);
    var radius = e.accuracy / 2;
    L.circle(e.latlng, radius).addTo(map);
}


function insererHotels(){
    var hotelIcon = L.icon({
        iconUrl: 'img/plain-red-hotel.png',
        iconSize: [32, 41],
        iconAnchor: [16, 40],
        popupAnchor: [0, -40]
    });
    for (var i=0; i < hotels.features.length; i++){
        var coords = hotels.features[i].geometry.coordinates;
        var marker = L.marker([coords[1], coords[0]], {
            icon: hotelIcon
        }).addTo(map);
        hotels.features[i].marker = marker;
        var p = hotels.features[i].properties;
        marker.bindPopup('<h1><a href="#hotel-'+p.id+'">'+p.name+'</a></h1>');
    }
}


$(document).on('pageshow', '#map', initMap);
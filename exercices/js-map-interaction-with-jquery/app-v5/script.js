
// définition des variables globales
var map = null;
var hotels = null;


// Fonction "main" est notre point d'entrée dans le script.
// La fonction est appelée au moment où le document est prêt.
// La définition correspondante à ce déclenchement d'événement
// est à la fin du script.
function main(){
    buildMap();
    $('button').on('click', filtrerHotels);
    $.getJSON('hotels.json', insererDonneesJson);
}


function buildMap(){
    map = L.map('map').setView([46.5, 6.8], 8);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);
}

function filtrerHotels(){
    var region = $('#region').val();
    var minprix = parseInt($('#minprix').val());
    var maxprix = parseInt($('#maxprix').val());
    var cat_ville = $('#cat_ville')[0].checked;
    var cat_rural = $('#cat_rural')[0].checked;
    var cat_montagne = $('#cat_montagne')[0].checked;

    O = {
        region: region, minprix: minprix, maxprix: maxprix,
        cat_ville: cat_ville, cat_rural: cat_rural, cat_montagne: cat_montagne
    }
    for (var i=0; i < hotels.features.length; i++){
        var h = hotels.features[i];
        
        // afficher d'abord l'entrée dans la liste et le marker
        $('#hotel-div-' + h.properties.id).removeClass('hide');
        h.marker.setOpacity(1);
        
        if (region != '' && h.properties.region != region) {
            $('#hotel-div-' + h.properties.id).addClass('hide');
            h.marker.setOpacity(0);
        }
        
        if (h.properties.prix < minprix || h.properties.prix > maxprix) {
            $('#hotel-div-' + h.properties.id).addClass('hide');
            h.marker.setOpacity(0);
        }
        
        if (cat_ville == false && h.properties.categorie == 'Ville') {
            $('#hotel-div-' + h.properties.id).addClass('hide');
            h.marker.setOpacity(0);
        }
        if (cat_rural == false && h.properties.categorie == 'Rural') {
            $('#hotel-div-' + h.properties.id).addClass('hide');
            h.marker.setOpacity(0);
        }
        if (cat_montagne == false && h.properties.categorie == 'Montagne') {
            $('#hotel-div-' + h.properties.id).addClass('hide');
            h.marker.setOpacity(0);
        }
        
    }
}

function insererDonneesJson(data){
    hotels = data;  // garder les hotels en mémoire
    var html = '';
    for (var i=0; i < hotels.features.length; i++){
        var h = hotels.features[i];
        html += '<div class="hoteldiv" id="hotel-div-'+h.properties.id+'">';
        html +=     '<h3>'+h.properties.name+'</h3>';
        html +=     '<p>Catégorie: '+h.properties.categorie+'</p>';
        html +=     '<p>Prix: '+h.properties.prix+' CHF</p>';
        html += '</div>';
    }
    // insérer dans la liste
    $('#hotels-liste').html(html);
    
    $('.hoteldiv').on('mouseover', showHotelsDetails);
    
    // insérer les marqueurs
    for (var i=0; i < hotels.features.length; i++){
        var coords = hotels.features[i].geometry.coordinates;
        var marker = L.marker([coords[1], coords[0]]).addTo(map);
        hotels.features[i].marker = marker;
        marker.on('mouseover', showHotelsDetailsMarker);
    }
}


function highlightHotel(hotelId){
    // marker pour l'hôtel sélectionné
    var redHotelIcon = L.icon({
        iconUrl: 'https://github.com/christiankaiser/map-marker-icons/raw/master/icons/plain-red-hotel.png',
        iconSize: [32, 41],
        iconAnchor:   [16, 40],
        popupAnchor:  [0, -40]
    });
    
    // chercher l'hôtel dans la liste
    var hotel = null;
    for (var i=0; i < hotels.features.length; i++){
        if (hotels.features[i].properties.id == hotelId){
            hotel = hotels.features[i].properties;
            hotels.features[i].marker.setIcon(redHotelIcon);
        } else {
            hotels.features[i].marker.setIcon(new L.Icon.Default());
        }
    }

    // afficher les détails
    var h = '<div id="hotel-details-'+hotel.id+'">';
    h += '<h3>'+hotel.name+'</h3>';
    h += '<p>Catégorie: '+hotel.categorie+'</p>';
    h += '<p>Région: '+hotel.region+'</p>';
    h += '<p>Description:<br>'+hotel.description+'</p>';
    h += '<p>Prix: '+hotel.prix+' CHF</p>';
    h += '<p><button id="hotelZoom" class="btn btn-default btn-xs">Montrer sur la carte</button></p>';
    h += '</div>';
    $('#details').html(h);
    $('#hotelZoom').on('click', hotelZoom);
}

function showHotelsDetailsMarker(evt){
    // trouver l'id de l'hôtel
    var m = evt.target;
    var hotelId = null;
    for (var i=0; i < hotels.features.length; i++){
        if (m == hotels.features[i].marker){
            hotelId = hotels.features[i].properties.id;
        }
    }
    highlightHotel(hotelId);
}

function showHotelsDetails(evt){
    // extraire l'id de l'hôtel
    var divId = $(evt.target).attr('id');
    if ($(evt.target).hasClass('hoteldiv') == false){
        divId = $(evt.target).parents('.hoteldiv').attr('id');
    }
    var hotelId = divId.replace("hotel-div-", "");
    highlightHotel(hotelId);
}

function hotelZoom(evt){
    var hotelId = $(evt.target).parents('div').attr('id').replace('hotel-details-', '');
    
    // chercher les coordonnées de l'hôtel
    var coords = null;
    for (var i=0; i < hotels.features.length; i++){
        if (hotels.features[i].properties.id == hotelId){
            coords = hotels.features[i].geometry.coordinates;
        }
    }
    
    // Centrer la carte sur l'hôtel, et augmenter le zoom si le niveau et inférieur à 10
    var z = map.getZoom() < 10 ? 10 : map.getZoom();
    map.setView([coords[1], coords[0]], z);
    
}

// une fois que le document est prêt, on lance le script:
$(document).on('ready', main);
// même chose que:
//    $(document).ready(main);
// ou encore:
//    $(main);

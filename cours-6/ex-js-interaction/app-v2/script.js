
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
    var map = L.map('map').setView([46.5, 6.8], 8);
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

    // contrôler le contenu des variables p.ex. comme ça:
    console.log( [region, minprix, maxprix, cat_ville, cat_rural, cat_montagne] );

    // suite du filtre...
}

function insererDonneesJson(data){
    hotels = data;  // garder les hotels en mémoire
    var html = '';
    for (var i=0; i < hotels.features.length; i++){
        var h = hotels.features[i];
        html += '<div id="hotel-div-'+h.properties.id+'">';
        html +=     '<h3>'+h.properties.name+'</h3>';
        html +=     '<p>Catégorie: '+h.properties.categorie+'</p>';
        html +=     '<p>Prix: '+h.properties.prix+' CHF</p>';
        html += '</div>';
        html += '<hr>';
    }
    // insérer dans la liste
    $('#hotels-liste').html(html);
}

// une fois que le document est prêt, on lance le script:
$(document).on('ready', main);
// même chose que:
//    $(document).ready(main);
// ou encore:
//    $(main);

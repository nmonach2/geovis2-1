
// définition des variables globales
var map = null;


// Fonction "main" est notre point d'entrée dans le script.
// La fonction est appelée au moment où le document est prêt.
// La définition correspondante à ce déclenchement d'événement
// est à la fin du script.
function main(){
    buildMap();
    $('button').on('click', filtrerHotels);
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


// une fois que le document est prêt, on lance le script:
$(document).on('ready', main);
// même chose que:
//    $(document).ready(main);
// ou encore:
//    $(main);

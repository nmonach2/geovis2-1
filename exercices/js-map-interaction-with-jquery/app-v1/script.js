
// définition des variables globales
var map = null;


// Fonction "main" est notre point d'entrée dans le script.
// La fonction est appelée au moment où le document est prêt.
// La définition correspondante à ce déclenchement d'événement
// est à la fin du script.
function main(){
    buildMap();
}


function buildMap(){
    var map = L.map('map').setView([46.5, 6.8], 8);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);
}



// une fois que le document est prêt, on lance le script:
$(document).on('ready', main);
// même chose que:
//    $(document).ready(main);
// ou encore:
//    $(main);

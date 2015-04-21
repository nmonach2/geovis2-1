
# Exercice: Interaction avec Javascript (partie 2)


Le début de l'exercice est disponible à l'URL [http://christiankaiser.github.io/geovis2/ex-js-interaction.html](http://christiankaiser.github.io/geovis2/ex-js-interaction.html).

L'objectif de cette deuxième partie de l'exercice est de reprendre l'application [app-v2](https://github.com/christiankaiser/geovis2/tree/master/cours-6/ex-js-interaction/app-v2) et d'implémenter l'intégralité de l'interaction Javascript.



---

## 1. Afficher les détails de l'hôtel

Nous avons actuellement la liste des hôtels qui s'affiche dans la liste. Cependant, nous aimerions encore afficher les détails pour chaque hôtel à droite sous la carte. Dans notre cas, nous allons afficher notamment la description de l'hôtel en plus.

Avant d'écrire le code pour afficher ces détails, nous changeons un peu le style de la liste pour avoir un effet visuel sur le passage de la souris. Pour cela, nous modifions d'abord légèrement le code de la fonction `insererDonneesJson` pour définir une class CSS pour les différents `div` contenant les informations sur les hôtels. La nouvelle fonction se présente comme suit:

     1  function insererDonneesJson(data){
     2      hotels = data;  // garder les hotels en mémoire
     3      var html = '';
     4      for (var i=0; i < hotels.features.length; i++){
     5          var h = hotels.features[i];
     6          html += '<div class="hoteldiv" id="hotel-div-'+h.properties.id+'">';
     7          html +=     '<h3>'+h.properties.name+'</h3>';
     8          html +=     '<p>Catégorie: '+h.properties.categorie+'</p>';
     9          html +=     '<p>Prix: '+h.properties.prix+' CHF</p>';
    10          html += '</div>';
    11      }
    12      // insérer dans la liste
    13      $('#hotels-liste').html(html);
    14  }

Le changement concerne la ligne 6 du script. Nous avons ajouté la class CSS `hoteldiv` pour chaque containeur d'un hôtel. A noter aussi que l'ancienne ligne 11 `html += '<hr>';` a été supprimée.

Nous pouvons également créer un fichier `style.css` pour y mettre nos classes CSS. Nous devons inclure ce fichier dans le `head` de notre fichier `index.html`:

    <link rel="stylesheet" href="style.css" />

Voici un exemple de classe CSS pour la liste des hôtels:

    .hoteldiv {
      padding: 2px 10px 5px 15px;
      border: 1px solid #eee;
    }
    
    .hoteldiv:hover {
      background-color: #f0f0f0;
    }

Nous pouvons désormais **ajouter l'événement Javascript `mouseover`** qui déclenche l'affichage des détails de l'hôtel actuel. Il suffit de rajouter la ligne suivante à la fin de la fonction `insererDonneesJson`:

    $('.hoteldiv').on('mouseover', showHotelsDetails);

... et il faut encore écrire la fonction `showHotelsDetails`... Nous commençons par écrire une fonction vide:

    function showHotelsDetails(evt){
        // la suite ici
    }

Cette fonction prend un argument `evt` (évidemment vous l'appelez comme vous voulez) qui représente l'événement Javascript. Nous avons besoin de cet événement pour trouver l'identifiant du `div` qui à son tour nous permet de savoir de quel hôtel il s'agit. Pour cela il faut comprendre que les informations détaillées sur les hôtels se trouvent toujours dans la variable `hotels` qui a été créée sur la première ligne de la fonction `insererDonneesJson` et qui contient la `FeatureCollection` (c'est-à-dire grosso modo le fichier Shape). Nous devons chercher les informations détaillées dans cette variable, et pour cela nous devons connaître l'identifiant interne de l'hôtel qui se trouve dans l'`id` du `div` de l'hôtel. Alors comment extraire cet `id` de l'événement Javascript? Voici les étapes:

a. la variable `evt.target` contient l'élément HTML qui se trouve sous la souris. Ça peut être le `div` lui-même, ou n'importe quel élément HTML à l'intérieur du `div`, donc par exemple le `h3` avec le nom de l'hôtel.
b. nous regardons si notre `evt.target` contient la classe CSS `hoteldiv`. C'est une façon simple de savoir si l'élément HTML que nous avons est le `div` de l'hôtel, ou un des éléments à l'intérieur. Nous pouvons faire ceci avec `$(evt.target).hasClass('hoteldiv')`.
c. si notre «target» n'est pas le `div` de l'hôtel, nous devons le trouver. Ceci peut se faire grâce à la fonction jQuery de recherche de parents (les parents sont tous les éléments HTML à l'extérieur de l'élément actuel; un élément HTML à l'intérieur serait dans cette terminologie un enfant). Plus spécifiquement, nous cherchons un parent qui a comme class CSS `hoteldiv`, ce qui se présente comme suit: $(evt.target).parents('.hoteldiv').

Nous pouvons extraire l'`id` du `div` de l'hôtel avec le code suivant:

    function showHotelsDetails(evt){
        var divId = $(evt.target).attr('id');
        if ($(evt.target).hasClass('hoteldiv') == false){
            divId = $(evt.target).parents('.hoteldiv').attr('id');
        }
        // contrôle du fonctionnement:
        console.log(divId);
    }

Il est une bonne pratique de tester en permanence l'avancement de notre projet en écrivant des valeurs dans notre console Javascript. Si nous exécutons notre application et passons avec la souris sur la liste des hôtels, la console Javascript doit contenir les identifiants des `div`. 

L'identifiant de l'hôtel est uniquement la dernière partie de l'identifiant du `div`, c'est-à-dire le chiffre à la fin. Nous pouvons extraire cette valeur en remplaçant "hotel-div-" par rien:

    var hotelId = divId.replace("hotel-div-", "");

Il y a ici comme souvent d'autres manières de faire la même chose. Une des alternatives est d'extraire une partie de la chaîne de caractère, c'est-à-dire la partie qui commence à partir du caractère 11 (=index 10):

    var hotelId = divId.substr(10);

Il est maintenant temps de chercher l'hôtel avec cet identifiant dans la variable `hotels`. Pour cela, nous utilisons une méthode un peu rudimentaire: regarder un hôtel après l'autre pour voir si l'identifiant correspond. Et si c'est le cas, on mémorise cet identifiant. Ça peut paraître très inefficace de chercher dans l'ensemble de la liste des hôtels, surtout si nous avions 10'000 hôtels. Cependant, il s'avère qu'un téléphone mobile est en mesure d'exécuter environ 1.4 milliard d'instructions par seconde (à peu près 1500 fois plus rapide qu'un [Commodore 64 de 1982](http://fr.wikipedia.org/wiki/Commodore_64)), ce qui est amplément suffisant pour chercher dans la liste entière de quelques hôtels... Un ordinateur est à peu près 2 fois plus vite que le téléphone. Voici le code qui passe à travers l'ensemble des hôtels pour trouver l'hôtel avec l'identifiant cherché:

    var hotel = null;
    for (var i=0; i < hotels.features.length; i++){
        if (hotels.features[i].properties.id == hotelId){
            hotel = hotels.features[i];
        }
    }

Nous pouvons maintenant afficher les détails de l'hôtel. Pour cela, nous donnons un identifiant `id="details"` au `div` qui contiendra ces détails. Par la suite, voici un exemple de code qui permet d'afficher l'ensemble des informations disponibles sur un hôtel:

    var h = '<div id="hotel-details-'+hotel.id+'">';
    h += '<h3>'+hotel.name+'</h3>';
    h += '<p>Catégorie: '+hotel.categorie+'</p>';
    h += '<p>Région: '+hotel.region+'</p>';
    h += '<p>Description:<br>'+hotel.description+'</p>';
    h += '<p>Prix: '+hotel.prix+' CHF';
    h += '</div>';
    $('#details').html(h);

L'application complète jusqu'à cette étape se trouve dans le dossier [app-v3](https://github.com/christiankaiser/geovis2/tree/master/cours-7/ex-js-interaction/app-v3).


---

## 2. Hôtels sur la carte

Un problème évident pour le moment est que les hôtels ne sont pas présentes sur la carte. Ce n'est pas trop compliqué de rajouter un marqueur. Nous ajoutons le marqueur au moment où nous avons reçu les données du fichier JSON, dans la fonction `insererDonneesJson`:

    for (var i=0; i < hotels.features.length; i++){
        var coords = hotels.features[i].geometry.coordinates;
        var marker = L.marker([coords[1], coords[0]]).addTo(map);
    }    

Nous allons également garder en mémoire le marqueur pour chaque hôtel, pour pouvoir l'utiliser plus tard. Il suffit d'ajour une ligne dans la boucle ci-dessus pour sauvegarder le marqueur à l'intérieur de la variable `hotels`:

    hotels.features[i].marker = marker;

Maintenant, on aimerait mettre en évidence le marqueur de l'hôtel de la liste sur lequel se trouve le curseur. Pour ce faire, nous allons remplacer simplement l'icône du marqueur. Ceci peut se faire à l'intérieur de la fonction `showHotelsDetails`. Tout d'abord, nous créons une nouvelle icône de marqueur, p.ex.

    var redHotelIcon = L.icon({
        iconUrl: 'https://github.com/christiankaiser/map-marker-icons/raw/master/icons/plain-red-hotel.png',
        iconSize: [32, 41],
        iconAnchor:   [16, 40],
        popupAnchor:  [0, -40]
    });

... et puis pour remplacer l'icône d'un hôtel:

    hotel.marker.setIcon(redHotelIcon);

Evidemment, il faut aussi remettre l'icône normale pour les autres marqueurs, sinon, ils gardent l'icône de remplacement pour toujours. Pour remettre l'icône par défaut, on peut écrire:

    hotel.marker.setIcon(new L.Icon.Default());

Si on met ensemble les pièces du puzzle, la boucle à travers l'ensemble des hôtels dans la fonction `showHotelsDetails` peut être écrite comme suit:

    ...
    
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
    
    ...


Naturellement, nous aimerions aussi que les détails de l'hôtel soit affichés également si on passe avec la souris sur un des marqueurs. Pour cela, il faut attacher un événement au marqueur, au moment où on insère le marqueur sur la carte:

    marker.on('mouseover', showHotelsDetailsMarker);

La fonction `showHotelsDetailsMarker` est similaire à la fonction `showHotelsDetails`, mais pas identique. La façon de trouver de quel hôtel il s'agit est très différente. En fait, le «target» de l'événement est le marqueur et non un `div` ou un autre élément HTML. Du coup, la recherche de l'hôtel dans la liste se fait un peu différemment:

    function showHotelsDetailsMarker(evt){
        // trouver l'id de l'hôtel
        var m = evt.target;
        var hotelId = null;
        for (var i=0; i < hotels.features.length; i++){
            if (m == hotels.features[i].marker){
                hotelId = hotels.features[i].properties.id;
            }
        }
        
        // la suite ici ...
    }

A partir de cet endroit, les deux fonctions sont strictement identiques. Une des règles d'or dans la programmation dit qu'il ne faut pas écrire deux fois le même code, car sinon il faut corriger une erreur potentielle deux fois ou plus. Nous pouvons facilement restructurer un peu notre code pour sortir la partie commune de la fonction `showHotelsDetails` dans une fonction à part, et appeler cette nouvelle fonction depuis les deux fonctions `showHotelsDetails` et `showHotelsDetailsMarker`, ce qui peut donner quelque chose comme:

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
        h += '<p>Prix: '+hotel.prix+' CHF';
        h += '</div>';
        $('#details').html(h);
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


---

## 3. Zoom sur un hôtel


---


## 4. Filtrer les hôtels



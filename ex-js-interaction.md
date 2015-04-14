# Exercice: Interaction avec Javascript

L'objectif de cet exercice est de nous familiariser avec les possibilités d'interaction dans une application de Webmapping, à travers l'utilisation de Javascript.

Dans le cadre de l'exercice, nous allons construire une petite application interactive pour trouver des hôtels de rêve, dont voici un brouillon de l'interface:

![Maquette de l'application interactive](figures/maquette.png)

L'application contient un titre sur la largeur de la page. Dessous, nous trouvons une mise en page en **3 colonnes**:

1. la colonne de gauche contient les **options de recherche et filtres**. On peut notamment appliquer des filtres par région, catégorie, et prix.

2. la colonne du milieu contient la **liste des hôtels** correspondant à nos filtres.

3. la colonne de droite contient **en haut une carte** avec la localisation des hôtels, et **en bas les détails de l'hôtel sélectionné**.

---

## 1. Architecture de base

L'application est construite à l'aide des libraires [Bootstrap](http://getbootstrap.com/), [jQuery](http://jquery.com/) et [Leaflet](http://leafletjs.com/).

Le dossier [app-v1](https://github.com/christiankaiser/geovis2/tree/master/cours-6/ex-js-interaction/app-v1) contient une première ébauche de l'application. Le fichier [index.html](https://github.com/christiankaiser/geovis2/blob/master/cours-6/ex-js-interaction/app-v1/index.html) contient la structure, tandis que l'ensemble du code Javascript a été placé dans le fichier [script.js](https://github.com/christiankaiser/geovis2/blob/master/cours-6/ex-js-interaction/app-v1/script.js).

Au niveau des filtres, pour des fins d'illustration, nous avons un menu déroulant, des cases à cocher, des boîtes de texte (ou plutôt des «boîtes de chiffres») ainsi qu'un bouton pour déclencher les filtres. Voici les détails de ces différents éléments:

### a. Menu déroulant

Le menu déroulant est appelé un `select` en HTML, et on donne l'ensemble des options possible dans le code HTML. Voici un exemple de menu en HTML:

    <select id="region">
        <option value="">Aucune région choisie</option>
        <option value="FR">Fribourg</option>
        <option value="GE" selected>Genève</option>
    </select>
 
Le menu déroulant commence avec `<select>` et se termine avec `</select>`. Entre deux, il y a toutes les options possibles entre des balises `<option>` et `</option>`. L'attribut `value` associe une valeur à chaque option, valeur qui est utilisée uniquement «en interne», à l'intérieur du code; elle n'est pas visible pour l'utilisateur de l'application. Le texte entre les deux balises est quant à lui visible pour l'utilisateur, mais ne joue pas vraiment un rôle à l'intérieur du code. L'attribut `id` dans la balise `<select>` donne un identifiant au menu qui doit être unique à travers l'ensemble du code HTML. L'attribut ´selected´ à l'intérieur de l'option «Genève» définit l'élément sélectionné au départ.

Voici le rendu du code ci-dessus:
<select id="region">
    <option value="">Aucune région choisie</option>
    <option value="FR">Fribourg</option>
    <option value="GE" selected>Genève</option>
</select>


### b. Boutons radio

Les boutons radio sont une alternative au menu déroulant si le nombre d'options est limité. Tout comme pour le menu déroulant, il y a une seule option sélectionné. Voici l'exemple de menu déroulant présenté ci-dessus sous forme de boutons radios:

<p>
<input type="radio" name="region" value=""> Aucune région choisie<br>
<input type="radio" name="region" value="FR"> Fribourg<br>
<input type="radio" name="region" value="GE" checked> Genève<br>
</p>

Les boutons radio prennent un peu plus de place, mais l'utilisateur voit sur un coup d'oeil l'ensemble des options. Si la place le permet et le nombre d'option ne dépasse pas 6-7 éléments, les boutons radio sont généralement à favoriser.

Voici le code de l'exemple ci-dessus:

    <p>
        <input type="radio" name="region" value=""> Aucune région choisie<br>
        <input type="radio" name="region" value="FR"> Fribourg<br>
        <input type="radio" name="region" value="GE" checked> Genève<br>
    </p>

Le fait que les trois ´input´ possèdent le même nom (´region´) définit que ce sont des boutons radio associés et qu'il ne puisse y avoir qu'une seule sélection.


### c. Cases à cocher (et labels)

Si plus d'une option peut être choisie à la fois, on utilise des cases à cocher («checkboxes») à la place des boutons radio:

<p>
<input type="checkbox" value="VD" checked> Vaud<br>
<input type="checkbox" value="FR"> Fribourg<br>
<input type="checkbox" value="GE" checked> Genève<br>
</p>

Et voici le code:

    <p>
        <input type="checkbox" value="VD" checked> Vaud<br>
        <input type="checkbox" value="FR"> Fribourg<br>
        <input type="checkbox" value="GE" checked> Genève<br>
    </p>

La seule différence notable par rapport aux boutons radio est le changement du type.

Le seul problème que nous avons avec ces exemples de boutons radio et cases à cocher, que bon nombre d'utilisateurs aimeraient bien cliquer sur le texte correspondant pour sélectionner une des options. Pour l'instant, dans notre code, cette association n'est pas faite, le texte de l'option et la case à cocher ou le bouton radio sont des éléments indépendants au niveau du code. Pour ce changer, nous devons avoir recours à des ***labels***. Il y a deux variantes possibles:

1. La première option est en utilisant un identifiant unique qui est définit dans l'attribut `id` de la balise `input` et qui est répété dans l'attribut ´for` de la balise ´label´:

        <input id="vd" type="checkbox" value="VD"> <label for="vd">Vaud</label>
   ce qui donne (essayez de cliquer sur le nom plutôt que la case à cocher):  
   <input id="vd" type="checkbox" value="VD"> <label for="vd">Vaud</label>
 
2. La deuxième option est d'insérer la balise `input` directement à l'intérieur de la balise `label`:

        <label><input type="checkbox" value="VD"> Vaud</label>
    ce qui donne à l'écran la même chose:  
    <label><input type="checkbox" value="VD"> Vaud</label>


### Boîtes de texte

Une boîte de texte est simplement un ´input´ de type texte:

    <input type="text" value="contenu">
    
ce qui donne:  
<input type="text" value="contenu">

ou avec un label:

    <label>Prix maximum: <input type="text" value="0"></label>

ce qui donne:  
<label>Prix maximum: <input type="text" value="0"></label>

Si le texte ne peut être qu'un chiffre, il est possible de changer le type en `number`:

<label>Prix maximum: <input type="number" value="0"></label>

ce qui donne:  
<label>Prix maximum: <input type="number" value="0"></label>


### Boutons

Un bouton peut être simplement inséré avec:

    <button>Cliquer ici</button>

ci qui donne:
<button>Cliquer ici</button>

Il est à noter que le bouton n'exécute aucune action par défaut. L'action devra être définie dans le code Javascript.


### Style des éléments

[Bootstrap](http://getbootstrap.com) définit toute une série de ***classes CSS*** pour donner une représentation familière aux différents éléments. Les filtres définies dans [app-v1](https://github.com/christiankaiser/geovis2/tree/master/cours-6/ex-js-interaction/app-v1) en font un usage extensif, d'où la présence de plusieurs éléments HTML (notamment des `div`, mais pas seulement) qui ne semblent à première vue pas nécessaires.


---

## 2. Le DOM: Document Object Model

Un fichier HTML contient l'ensemble de la structure hiérarchique d'une page Web, y compris contenu et formatage. Le navigateur Web charge le fichier HTML dans sa mémoire et produit la représentation graphique de la page Web. Par la suite, l'utilisateur peut avoir la **possibilité d'interagir avec la page Web**, p.ex. à travers des menus déroulants, boutons, etc. Nous avons vu que l'option sélectionné d'un menu déroulant, ou le texte contenu dans une boîte de texte figure déjà dans le code HTML. Cependant, le navigateur Web ne va naturellement pas modifier le fichier HTML de départ. Le navigateur Web modifie uniquement la représentation interne du code HTML pour refléter les changements sur la page. Cette représentation interne du code HTML à l'intérieur du navigateur Web est appelé le **Document Object Model**, ou tout cour le **DOM**. Le DOM actuel d'une page Web peut être visualisé en mode développement du navigateur Web:

![Le DOM dans le navigateur (exemple avec Google Chrome)](figures/browser-dom.png)

Pour simplifier, on peut dire qu'**une interaction avec une page Web passe généralement par une modification à la volée du DOM.** Afin de rendre interactif notre page Web, nous devons donc étudier les possibilités de modifier le DOM à l'aide de code Javascript. La libraire [jQuery](http://jquery.com) permet, entre autres, de modifier le DOM de manière relativement facile.


---

## 3. jQuery et le DOM

La première tâche de jQuery est généralement de `sélectionner` à l'aide de code Javascript un élément particulier sur la page Web, afin d'effectuer une manipulation sur l'élément sélectionné. La sélection d'un élément se fait à l'aide de la fonction jQuery `$` (c'est le nom de la fonction, tout comme p.ex. `main`, `alert`, etc.), suivi de ce qu'on appelle un **identificateur** d'élément. jQuery nous retournera l'ensemble des éléments qui correspondent à l'identificateur donné. Nous pouvons sélectionner par exemple l'ensemble des balises `input` à l'aide du code suivant (le résultat est attribué à la variable `mes_inputs`):

    mes_inputs = $('input');

La chaîne de caractère `'input'` est alors l'identificateur.  Il est possible d'exécuter ce code dans la console Javascript d'un navigateur Web pour tester l'expression:

![Sélection de l'ensemble des balises input dans le navigateur](figures/browser-console.png)

Voici un aperçu de quelques identificateurs fréquents:

- `$('input')` sélectionne toutes les balises `input`
- `$('#region')` sélectionne tous les éléments dont l'attribut `id` contient la valeur `region` (notez que le dièse ne fait pas partie de l'ID, mais de l'identificateur jQuery)
- `$('.form-group)` sélectionne tous les éléments dont l'attribut `class` contient la valeur `form-group`. L'attribut `class` contient la **classe CSS** d'un élément. Il est à noter qu'un élément peut avoir plusieurs classes CSS en même temps; elles sont alors séparées par des espaces (un nom de classe ne peut pas contenir d'espace).
- `$('[name=region]')` sélectionne l'ensemble des éléments dont l'attribut `name` est égal à `region`.

Une fois un ou plusieurs éléments sélectionnés, il est possible d'effectuer des manipulations diverses, interroger les valeurs des attributs, modifier le contenu etc. Ci-dessous quelques exemples.

**Changement du style**: il est possible de modifier le style en utilisant la fonction `css`, p.ex.:

    ds = $('.form-group');
    ds.css('background-color', '#f00');

attribue la valeur `#f00` à la propriété CSS `background-color`. Vous pouvez essayer l'exemple sur l'exemple [app-v1](https://github.com/christiankaiser/geovis2/tree/master/cours-6/ex-js-interaction/app-v1), dans la console Javascript. Le résultat n'est pas très beau... Pour revenir en arrière, il suffit de passer une valeur vide:

    ds.css('background-color', '');

 Il est possible d'ajouter ou d'enlever une class CSS:
 
    $('button').removeClass('btn-success');
    $('button').addClass('btn-primary');

Ou encore, en une seule instruction:

    $('.col-sm-3').addClass('col-sm-2').removeClass('col-sm-3')

ce qui permet de redimensionner des colonnes à la volée...

Cette méthode permet de modifier très facilement l'apparence d'un ou plusieurs éléments.

Nous pouvons également modifier le contenu d'un élément:

    colonneDuMilieu = $('.col-sm-4');
    colonneDuMilieu.html('<h1>Hôtels</h1><p>Liste de tous les hôtels...</p>');

Nous pouvons donc modifier l'ensemble du contenu de la page Web avec quelques manipulations relativement simples...


---

## 4. Événements

Les événements sont un élément clé pour l'interactivité sur une page Web. En effet, ce sont les déclencheurs de nos actions, elles permettent de lancer un code Javascript. Le nombre d'événements possibles est grand, et nous allons regarder ici juste quelques-uns. Parmi les événements les plus fréquents, on trouve (avec les noms des événements entre parenthèses):

- un clic de souris (`click`)
- l'entrée de la souris dans un élément HTML (`mousenter`)
- la sortie de la souris dans un élément HTML (`mouseout`)
- le changement de statut d'un menu déroulant, d'une case à cocher, d'un bouton radio, etc. (`change`)
- le changement du contenu d'un champ texte (`change`)
- le clic sur un bouton (`click`)
- le scroll (`scroll`)
- le mouvement de la souris (`mousemove`)

et aussi, d'un style un peu différent:

- la fin de la chargement de la page HTML par le navigateur (`load`)
- la fin de la construction du DOM par le navgiateur (`ready`)
- le changement de la taille de la fenêtre (`resize`)

Une action (fonction Javascript) peut être «attachée» à un de ces événements, à l'aide de la fonction jQuery `on` avec comme arguments le nom de l'événement et la fonction à exécuter. Regardons ce code comme exemple:

    function ouf(){
    	alert('ouf!');    }
    $('.page-header').on('click', ouf);

Ce code «attache» la fonction `ouf` à l'événement `click` du `div` contenant le titre de la page. Si on exécute ce code dans la console du projet [app-v1](https://github.com/christiankaiser/geovis2/tree/master/cours-6/ex-js-interaction/app-v1), et on clique par la suite sur le titre, la fonction `ouf` est exécutée à chaque fois.

En plus, il est possible de retarder l'exécution d'une action, à l'aide de la fonction `setTimeout` qui prend la fonction à exécuter ainsi que le nombre de millisecondes à attendre:

    function ouf(){
        alert('ouf!');    }
    function waitForOuf(){
        setTimeout(ouf, 2000);    }
    $('.page-header').on('click', waitForOuf);

Ces deux mécanismes sont responsables pour l'interactivité dans beaucoup de situations. Il y a par exemple un événement `ready` qui est déclenché par la page Web (le `document`) une fois que le DOM est construit et qu'il est possible d'interagir correctement avec le DOM à l'aide de fonctions Javascript. Le code Javascript du projet [app-v1](https://github.com/christiankaiser/geovis2/tree/master/cours-6/ex-js-interaction/app-v1) dans [script.js](https://github.com/christiankaiser/geovis2/blob/master/cours-6/ex-js-interaction/app-v1/script.js) utilise exactement ce mécanisme pour construire la carte sur la page. La carte est construite dans la fonction `buildMap`, qui est appelée depuis la fonction `main`. Cette fonction `main` quant à elle est exécutée automatiquement au moment ou la page Web est prête, ce qui est définie par l'instruction:

    $(document).on('ready', main);

La documentation jQuery contient la [liste de tous les événements](https://api.jquery.com/category/events/), avec une description.


### Exemple: lancer le filtre des hôtels

Pour montrer un court exemple d'un événement, nous illustrons ici comment le filtre des hôtels dans le projet [app-v1](https://github.com/christiankaiser/geovis2/tree/master/cours-6/ex-js-interaction/app-v1) peut être implémentée. A l'intérieur du [script.js](https://github.com/christiankaiser/geovis2/blob/master/cours-6/ex-js-interaction/app-v1/script.js), dans la fonction `main`, nous pouvons attacher une fonction à l'événement ´click´ du bouton «Chercher»:

    $('button').on('click', filtrerHotels);

Ceci nécessite évidemment de disposer d'une fonction `filtrerHotels`, ce qui n'est pas encore notre cas. Il suffit de la rajouter dans le fichier [script.js](https://github.com/christiankaiser/geovis2/blob/master/cours-6/ex-js-interaction/app-v1/script.js):

    function filtrerHotels(){
    	// suite du code ici..    }

En insérant une instruction `console.log('filtrerHotels')` on peut vérifier si la fonction est bel et bien exécutée après un clic sur le bouton. Toujours utile de savoir si on a tout fait juste jusqu'à maintenant... `console.log` écrit le contenu donné dans la console Javascript, qui est invisible pour l'utilisateur moyen. On peut aussi y écrire des variables pour vérifier si elle contient une valeur attendue ou non. Très utile pour trouver les nombreuses erreurs.

Par la suite, dans la fonction `filtrerHotels`, il faut récupérer les valeurs des différents champs (région, catégorie, prix minimum et maximum). Là aussi, jQuery est d'une grande utilité, surtout la fonction `val` qui permet de récupérer la valeur actuelle:

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

La fonction `parseInt` permet de transformer une chaîne de caractères en nombre entier. La vérification si les cases à cocher sont cochées ou non est un peu différentes, mais nous renseigne simplement si une case à cocher précise est cochée (`true`) ou non (`false`). Par la suite, on peut afficher les hôtels correspondants à ces critères, et cacher les autres. Au moins, si on avait une liste d'hôtels... Cacher un élément n'est pas le problème:

    $('.col-sm-4').addClass('hide');
    
... fait efficacement disparaître une des colonnes, et ...

    $('.col-sm-4').removeClass('hide');

... permet de la récupérer à nouveau. `hide` est par ailleurs une classe CSS qui est définie par Bootstrap.


## 5. Récupérer des données JSON avec Javascript

Nous allons récupérer les données sur les hôtels depuis un fichier externe qui est en format JSON. Ce fichier peut provenir ou non d'une base de données. Le format JSON permet d'enregistrer des données d'une manière qui est relativement facile à comprendre par l'humain et l'ordinateur, ce qui s'avère très pratique. Un fichier JSON est composé de dictionnaires, arrays, nombre entiers et décimales, et des chaînes de caractères, très similaire à ce que pourrait être un bout de code Javascript. Voici un exemple simple:

    {
        "nom": "Einstein",
        "prénom": "Albert",
        "naissance": 1879,
        "deces": 1955,
        "publications": [
            {"title": "E=mc2", "year": 1905},
            {"title": "Newton's apple", "year": 1906},
            {"title": "Schroedinger's cat", "year": 1907}
        ]
    }

Les espaces et retours à la ligne ne sont pas nécessaires, mais facilitent évidemment la lecture du fichier.

Il est possible de représenter par exemple un fichier ESRI Shape sous forme de JSON; le nom du format est alors GeoJSON. Voici un exemple d'un tel fichier:

	{
		"type": "FeatureCollection",                                  
		"features": [
			{
				"type": "Feature",
				"properties": { "id": 1, "name": "Bern" }, 
				"geometry": { "type": "Point", "coordinates": [ 7.45, 46.96 ] }
			}, { 
				"type": "Feature", 
				"properties": { "id": 2, "name": "Basel" }, 
				"geometry": { "type": "Point", "coordinates": [ 7.60, 47.56 ] }
			}, { 
				"type": "Feature", 
				"properties": { "id": 3, "name": "Lausanne" }, 
				"geometry": { "type": "Point", "coordinates": [ 6.60, 46.53 ] }
			}
		]
	}
Un fichier GeoJSON peut être généré avec QGIS depuis un fichier Shape, ce qui est intéressant pour le lire par la suite dans notre application Web.

Bien évidemment, il est possible de définir notre propre fichier JSON qui contient les informations nécessaires pour notre projet.

La lecture d'un fichier JSON dans une application Web peut se faire facilement avec jQuery:

    $.getJSON( url, callback_function );

où `callback_function` est une fonction que nous avons défini auparavant et qui reçoit le contenu du fichier JSON. C'est à l'intérieur de cette fonction que nous pourrons faire utilisation de ces données. Un aspect important qui porte souvent à confusion est l'ordre d'exécution. Considérons par exemple le code suivant:


    function insererDonneesJson(data) {
        alert('1 - insérer les données du fichier JSON');
    }
    
    $.getJSON('hotels.json', insererDonneesJson);
    alert('2 - appel du fichier JSON terminé');

La fonction `$.getJSON` demande un fichier JSON depuis le Web, et puis il est censé appeler avec le contenu la fonction `insererDonneesJson`. Cette fonction affiche simplement une boîte d'alerte. Et après la demande du fichier JSON, une autre boîte d'alerte est affichée à l'écran. Il peut être surprenant d'apprendre que généralement l'alerte '1 - insérer les données...' s'affiche après l'alerte '2 - appel du fichier ...'. Il est probablement encore plus surprenant d'apprendre qu'en fait, l'ordre d'exécution n'est simplement pas défini! Le problème vient du fait que **demander un fichier depuis le Web prend du temps**, beaucoup de temps à l'échelle de la vitesse d'exécution d'un programme informatique. Du coup, au lieu d'attendre une éternité informatique pour que le fichier arrive, l'ordinateur continue simplement à exécuter la suite du script. Ce qui est tout à fait ok vu que nous avons fourni une fonction qui sera exécuté automatiquement une fois que le fichier est arrivé, c'est-à-dire après une éternité...

Avec ces connaissances, nous pouvons maintenant demander les données sur les hôtels à insérer, et les insérer dans la liste. Nous pouvons par exemple insérer la ligne

    $.getJSON('hotels.json', insererDonneesJson);

à la fin de la fonction `main`, et insérer la fonction `insererDonnesJson` un peu plus bas:

    function insererDonneesJson(data){
        console.log(data);
    }

Si on recharge maintenant notre application, on sera déçu car ça ne fonctionne généralement pas. Dans Google Chrome, nous aurons une erreur mystérieuse dans la console:

<p style="margin: 0 20px; color: #f00;"><i>XMLHttpRequest cannot load file:///Users/.../hotels.json. Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https, chrome-extension-resource.</i></p>

Le problème est que la fonction `$.getJSON` fonctionne uniquement à travers un serveur Web, et nous n'avons pour l'heure pas de serveur... Le plus simple est: faire tourner un serveur Web. Pour cela, il y a de nombreuses options. Sur Windows, on peut par exemple installer l'environnement [WAMP](http://www.wampserver.com/). Sur Linux et MacOS X, il suffit de suivre les étapes suivantes:

1. ouvrir le Terminal
2. `cd dossier/avec/fichiers/html/et/json`
3. taper `python -m SimpleHTTPServer`
4. se rendre à l'URL [http://127.0.0.1:8000](http://127.0.0.1:8000) ce qui est l'adresse de notre serveur Web que nous venons de démarrer à l'étape précédente

Nous pouvons maintenant insérer les différents hôtels dans la liste. Pour cela, nous devons faire une boucle à travers l'ensemble des hôtels, et construire le code HTML que nous pouvons insérer dans le `div` prévu pour la liste. La fonction `insererDonneesJson` du [script.js](https://github.com/christiankaiser/geovis2/blob/master/cours-6/ex-js-interaction/app-v2/script.js) du projet [app-v2](https://github.com/christiankaiser/geovis2/tree/master/cours-6/ex-js-interaction/app-v2) contient le code qui permet de le faire.





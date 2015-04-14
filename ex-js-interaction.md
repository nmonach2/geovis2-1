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


---

## 2. Le DOM: Document Object Model

Un fichier HTML contient l'ensemble de la structure hiérarchique d'une page Web, y compris contenu et formatage. Le navigateur Web charge le fichier HTML dans sa mémoire et produit la représentation graphique de la page Web. Par la suite, l'utilisateur peut avoir la **possibilité d'interagir avec la page Web**, p.ex. à travers des menus déroulants, boutons, etc. Nous avons vu que l'option sélectionné d'un menu déroulant, ou le texte contenu dans une boîte de texte figure déjà dans le code HTML. Cependant, le navigateur Web ne va naturellement pas modifier le fichier HTML de départ. Le navigateur Web modifie uniquement la représentation interne du code HTML pour refléter les changements sur la page. Cette représentation interne du code HTML à l'intérieur du navigateur Web est appelé le **Document Object Model**, ou tout cour le **DOM**. Le DOM actuel d'une page Web peut être visualisé en mode développement du navigateur Web:

![Le DOM dans le navigateur (exemple avec Google Chrome)](figures/browser-dom.png)

Pour simplifier, on peut dire qu'**une interaction avec une page Web passe généralement par une modification à la volée du DOM.** Afin de rendre interactif notre page Web, nous devons donc étudier les possibilités de modifier le DOM à l'aide de code Javascript. La libraire [jQuery](http://jquery.com) permet, entre autres, de modifier le DOM de manière relativement facile.


---

## 3. jQuery et le DOM

La première tâche de jQuery est généralement de `sélectionner` à l'aide de code Javascript un élément particulier sur la page Web, afin d'effectuer une manipulation sur l'élément sélectionné. La sélection d'un élément se fait à l'aide de la fonction jQuery `$` (c'est le nom de la fonction, tout comme p.ex. `main`, `alert`, etc.), suivi de ce qu'on appelle un **identificateur** d'élément. jQuery nous retournera l'ensemble des éléments qui correspondent à l'identificateur donné. Nous pouvons sélectionner par exemple l'ensemble des balises `p` à l'aide du code suivant (le résultat est attribué à la variable `mes_paragraphes`):

    mes_paragraphes = $('p');


---

## 4. Événements


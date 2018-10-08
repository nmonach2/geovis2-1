# Créer une maquette pour un projet de géovisualisation

La maquette d'un projet de géovisualisation permet de clarifier notre idée, de la mettre sur papier et obtenir une première idée comment notre projet se présentera à la fin. En plus de mettre les idées au clair, cela nous permet de nous échanger avec d'autres personnes et de valider une première fois notre idée avant d'investir beaucoup de travail.

La maquette part d'un problème ou d'une question où une visualisation interactive pourrait contribuer à une solution ou réponse. Le processus peut être en gros défini comme suit:

## 1. Définir le problème

Quel est le problème à résoudre? Quelle est la question à laquelle je cherche une réponse? Il faut tenter d'être aussi précis que possible. Une bonne pratique qui facilite cette étape est de décrire des **scénarios**. On peut inventer une ou plusieurs personnes-types, et décrire quel est leur problème très spécifiquement. Ceci permet en même temps de répondre à la question quel est le **public-cible**. On peut alors distinguer de problèmes qui nécessitent plutôt une **exploration** et d'autres plutôt une **commuication**.

## 2. Contribution attendue d'une visualisation interactive

Est-ce que le problème que nous tentons de résoudre peut profiter d'une visualisation interactive? Dans quelle mesure la visualisation peut contribuer?

## 3. Stratégie de validation du projet

Le but de cette étape est de limiter nos efforts à ce qui est vraiment utile, et dont notre public-cible pourra effectivement tirer profit. L'idée derrière cette étape est que nous allons acquérir des connaissances tout le long de notre projet, et que nous devons valider (tester) ces nouvelles connaissances. Nous devons donc définir comment nous pouvons valider notre idée de départ? Comment nous allons nous assurer que notre contribution permettra effectivement d'en tirer profit?

Cette validation doit se faire à la fois de manière analytique (Est-ce qu'il est possible de répondre à la question initialement posée? Est-ce que c'est la meilleure approche possible? Est-ce qu'il y a des alternatives?) et de manière empirique (demander l'avis d'autres personnes, faire fréquemment des tests).

## 4. Esquisse de notre projet de géovisualisation

Nous faisons une première esquisse comme nous voyons notre projet de géovisualisation. Il s'agit en fait de notre toute première maquette. Le plus simple est souvent de prendre papier et crayon et commencer à dessiner les différents écrans, l'agencement des différents éléments, les différentes pages et de montrer la séquence typique d'utilisation de notre visualisation interactive.

Voici à quoi pourrait ressembler une toute première esquisse:

<img src="figures/maquette1.png" style="max-width: 100%" />

Cette première esquisse nous permet de revenir sur notre problème de départ et la contribution attendue, ainsi que de discuter avec d'autres personnes.

Par la suite, il s'agit de l'améliorer petit à petit jusqu'à ce que nous avons tous les éléments sur la page.

Dans ce processus, nous pouvons aussi passer à un document informatique pour voir le tout à l'écran où les proportions peuvent être mieux évaluées. Nous pouvons faire cette maquette informatique avec un logiciel de dessin vectoriel tel qu'Illustrator ou Inkscape, ou recourir à un logiciel spécifique pour créer ce genre de prototype.

Dans l'idéal, pour ce projet de géovisualisation, il est recommandé de choisir un logiciel de dessin vectoriel qui permet de générer des fichiers SVG. Le format SVG a l'avantage qu'il peut être simplement visualisé dans le navigateur Web et que nous pouvons partir de ce fichier pour construire notre application étape par étape.

Voici quelques logiciels possibles:

- [**Adobe Illustrator**](http://www.adobe.com/products/illustrator.html). Le logiciel classique de dessin vectoriel, mais payant (et assez cher). Illustrator permet d'ouvrir et d'enregistrer des fichiers SVG.

- [**Inkscape**](https://inkscape.org). L'équivalent open-source à Illustrator, mais pour le moment pas encore aussi puissant. Par contre, il est gratuit. Le format de fichier natif d'Inkscape est une variante du format SVG, et il permet évidemment de créer des fichiers SVG standard.

- [**Method Draw**](http://editor.method.ac). Un éditeur de fichiers SVG en ligne. Possibilité d'importer et exporter du SVG et de créer des dessins simples de manière rapide et facile sans logiciel lourd.

- [**Balsamiq**](https://balsamiq.com). Un logiciel de prototypage qui imite un peu le style dessiné à la main.

- [**Justinmind**](http://justinmind.com). Un logiciel de prototypage d'applications Web et mobiles. Ce logiciel permet d'intégrer une certaine interactivité (passer d'une page à l'autre après un clic sur un bouton par exemple).


**Remarque pour les applications mobiles:** Nous allons traiter les applications mobiles sur le plan technique de la même manière qu'une application desktop. En effet, la seule différence étant l'utilisation d'une autre libraire pour créer l'interface HTML ([jQuery Mobile](http://jquerymobile.com) au lieu de [Bootstrap](http://getbootstrap.com) ou [Semantic UI](http://semantic-ui.com)). Par la suite, l'application mobile peut être générée à partir du code HTML / Javascript (avec [Apache Cordova](https://cordova.apache.org)). Par ailleurs, il y a des environnement de programmation d'applications Web qui supportent en même temps aussi les applications Web, comme par exemple [Meteor](https://www.meteor.com).


# Exercice

Faire le prototype d'une application de géovisualisation interactive en suivant le processus ci-dessus. Le but est d'arriver à un fichier SVG qui peut être visualisé dans le navigateur Web.


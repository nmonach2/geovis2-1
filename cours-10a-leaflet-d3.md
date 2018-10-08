# Carte Leaflet avec couche d3

Il est possible d'utiliser d3 pour créer une couche dans Leaflet. d3 a également la possibilité de lire un fichier GeoJSON ou encore TopoJSON.

Ainsi, il devient très intéressant à combiner d3 avec Leaflet. Ainsi, nous pouvons profiter de Leaflet pour les fonctions de zoom et de pan, ainsi que les couches de type tuiles XYZ disponibles sur le Web.

Pour pouvoir combiner d3 avec Leaflet, un plugin Leaflet est nécessaire. Le plugin [Leaflet.D3SvgOverlay](https://github.com/christiankaiser/Leaflet.D3SvgOverlay) sert à cela.

Dans le répertoire du plugin il y a deux exemples, l'un avec des symboles proportionnels, l'autre avec une couche TopoJSON.

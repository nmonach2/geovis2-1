# Routing

Le routing permet d'effectuer des opérations de calculs sur des réseaux de transport. L'utilisation la plus commune est le calcul du chemin le plus court ou le plus rapide entre deux endroits, en utilisant un ou plusieurs modes de transports donnés (p.ex. la voiture, ou les transports publics). Le routing peut aussi être utilisé p.ex. pour calculer des isochrones à partir d'un lieu donné.

De nombreux logiciels existent pour faire du routing, souvent avec des champs d'application un peu différentes. Voici quelques logiciels qui permettent de faire du routing:

- [**pgRouting**](https://pgrouting.org/) est un plugin pour PostGIS
- **Network Analyst** dans ArcGIS
- [**OSRM**](http://project-osrm.org/) pour le calcul du chemin le plus court sur la route.
- [**OpenTripPlanner**](http://www.opentripplanner.org) est un serveur de calcul pour le routing multi-modal.
- [**nx_spatial**](https://bitbucket.org/gallipoli/nx_spatial/wiki/Home) est une libraire Python pour le routing basé sur une libraire de graphes.
- [**Flowmap**](http://flowmap.geo.uu.nl/i) est un logiciel pour différents calculs réseaux.
- **Network Analysis** est un module QGIS à utiliser en Python, un peu similaire au Network Analyst dans ArcGIS.

Nous allons montrer ici comment utiliser OpenTripPlanner (OTP). Pour d'autres types de calcul, p.ex. si on doit manipuler les coûts manuellement, pgRouting est une bonne alternative.


## Installer OTP

OTP est une application écrite en Java. Elle tourne en principe sous forme de serveur, et l'utilisation se fait par une API en faisant des requêtes HTTP.

Un tutoriel de base est disponible ici: [http://docs.opentripplanner.org/en/latest/Basic-Tutorial/](http://docs.opentripplanner.org/en/latest/Basic-Tutorial/).

Sur le principe, on peut télécharger le logiciel sous forme d'un fichier JAR. La version actuelle est [disponible ici](https://repo1.maven.org/maven2/org/opentripplanner/otp/1.3.0/) (il s'agit du fichier otp-1.3.0-shaded.jar).

Ce fichier est utilisable directement à condition d'avoir installé Java 8. La version de Java peut être trouvée à travers le Terminal en tapant `java -version`.

La dernière version de OTP ne fonctionne cependant pas avec les données de l'horaire CFF suisse disponibles en format GTFS depuis [opendata.swiss](https://opendata.swiss/fr/) ou encore [opentransportdata.swiss/](https://opentransportdata.swiss/fr/). Le problème vient d'une partie d'une utilisation peu commune d'un code pour les télésièges par les CFFs, et d'une limitation au niveau des taxis par OTP. La mise à jour du logiciel OTP pour tenir compte de ces spécificités est actuellement en cours et sera si possible disponible dans la version 1.4 de OTP.

En attendant, il faut compiler OTP manuellement. Pour faciliter la tâche, une version précompilée est disponible ici: [https://igd.unil.ch/cours/geovis2/otp.zip](https://igd.unil.ch/cours/geovis2/otp.zip). Ce fichier contient également le graphe précalculé pour la Suisse. En conséquence, la taille du fichier à télécharger est d'environ 1.2 Go.

## Construire le graphe OTP

Pour fonctionner, OTP construit un graphe de routing à partir des données OSM et GTFS.

Le fichier [otp.zip](https://igd.unil.ch/cours/geovis2/otp.zip) contient déjà le graphe calculé.

Les données OSM en format PBF peuvent être téléchargés depuis [Geofabrik](http://download.geofabrik.de/). Il est possible d'extraire des données OSM pour une région avec l'utilitaire [osmconvert](https://wiki.openstreetmap.org/wiki/Osmconvert). 

L'ensemble des fichiers sont à déposer dans un dossier `graphs` et dans un sous-dossier qu'on peut nommer comme on veut (ce sera le nom du *router*), p.ex. `ch` pour un graphe sur la Suisse.

Pour construire le graphe, il faut lancer OTP une première fois:
```bash
java -Xmx12G -jar otp-1.3.0-shaded.jar --build graphs/ch
```
ou si on utilise une version compilée par nos soins:
```bash
java -Xmx12G -Xverify:none -jar otp-1.4.0-SNAPSHOT-shaded.jar "$@" --build graphs/ch
```

Notez le paramètre `-Xmx12G` qui règle la mémoire RAM disponible pour OTP. Le calcul du graphe pour la Suisse nécessite environ 12 Go de RAM et dure environ 45 minutes (dépendant de la machine évidemment).

## Tourner le serveur OTP

Une fois le graphe construit, on peut faire tourner le serveur avec la commande suivante:

```bash
java -Xmx12G -Xverify:none -jar otp-1.4.0-SNAPSHOT-shaded.jar "$@" --router ch --graphs graphs --server
```
Notez que là aussi il faut environ 12 Go de RAM!

Un service déjà configuré est disponible actuellement à l'URL [http://130.223.67.145:8080](http://130.223.67.145:8080), accessible uniquement depuis l'UNIL.


## Utiliser l'API OTP

Une interface Web intégrée dans OTP est disponible directement à l'URL du serveur OTP:  [http://130.223.67.145:8080](http://130.223.67.145:8080).

Mais l'API OTP peut aussi être consultée par l'intermédiaire de requêtes HTTP. Voici l'example d'un **calcul d'une route**:  
[http://130.223.67.145:8080/otp/routers/ch/plan?fromPlace=46.6274,10.4462&toPlace=46.5264,6.57996&mode=TRANSIT,WALK](http://130.223.67.145:8080/otp/routers/ch/plan?fromPlace=46.6274,10.4462&toPlace=46.5264,6.57996&mode=TRANSIT,WALK)

L'entier du calcul est configuré avec des paramètres dans l'URL. Ces paramètres commencent après le point d'interrogation (`.../plan?`) et chaque paramètre est composé du nom suivi de la valeur, plusieurs paramètres étant séparés d'un point-virgule. Les paramètres sont décrits dans la [documentation de OTP](http://dev.opentripplanner.org/apidoc/1.0.0/). Les paramètres pour les routes sont [disponibles ici](http://dev.opentripplanner.org/apidoc/1.0.0/resource_PlannerResource.html).

La réponse peut se faire en XML ou JSON en ajustant le paramètre `Accept` de l'entête de la requête.

Un **exemple de calcul de route** avec OTP et Leaflet est [disponible ici](https://github.com/christiankaiser/otp-route-leaflet).

Le **calcul d'isochrones** est également possible facilement avec le même type de requête HTTP:  
[http://130.223.67.145:8080/otp/routers/ch/isochrone?fromPlace=47.243,8.7774&mode=WALK,TRANSIT&date=11-14-2018&time=8:00am&maxWalkDistance=1500&cutoffSec=1800&cutoffSec=3600](http://130.223.67.145:8080/otp/routers/ch/isochrone?fromPlace=47.243,8.7774&mode=WALK,TRANSIT&date=11-14-2018&time=8:00am&maxWalkDistance=1500&cutoffSec=1800&cutoffSec=3600)

Un **exemple de calcul d'isochrones** avec OTP et Leaflet est [disponible ici](https://github.com/christiankaiser/otp-isochrones-leaflet).

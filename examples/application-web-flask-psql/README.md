# Application Web Flask avec PostGIS



Cet exemple montre une application Web simple avec Flask/Python et une interaction avec PostgreSQL / PostGIS.

Du côté client, nous avons une application Web en HTML et Javascript, avec Leaflet comme librairie pour la cartographie interactive. Cette application HTML est statique, mais elle lit les données de cette application à travers des fichiers JSON générés de manière dynamique avec Flask, en tirant les données de la base de données PostGIS.



## 1. Prérequisites

Cet exemple nécessite l'installation des logiciels suivants:

1. PostgreSQL et PostGIS
2. Python avec setuptools et pip (nous utiliserons Python 2.7)



## 2. Préparation de la base de données PostGIS

Avant de commencer vraiment, nous devons avoir une base de données PostGIS et y charger quelques données.

Créer une nouvelle base de données sur notre système. Nous allons appeler la base de données `ofs_themakart` puisque nous allons charger des données correspondantes, mais souvent on donnera le nom de l'application Web (p.ex. `eatlas_dev` pour la base de données de développement pour l'eAtlas, et `eatlas_prod` pour la BD de production).

```bash
createdb ofs_themakart
```

On doit pouvoir nous connecter à la base de données avec:

```bash
psql ofs_themakart
```

et il est maintenant possible d'activer PostGIS pour notre base de données:

```sql
CREATE EXTENSION postgis;
```

et puis quitter Postgres avec `^D ` (ctrl-D).

Nous allons importer la couche Shape des cantons suisses dans `ofs-ck-cantons-veg`. Pour ce faire, nous utilisons l'utilitaire shp2pgsql:

```shell
cd geodata/ofs-k4-cantons-veg
shp2pgsql -s 21781 -I -W latin1 k4kant19970101vf_ch2007poly.shp k4_cantons_vf > k4_cantons_vf.sql
```

(lancer `shp2pgsql --help` pour avoir une aide pour l'utilitaire).

Puis nous pouvons importer le fichier généré `k4_cantons_vf.sql` dans PostGIS:

```shell
psql ofs_themakart < k4_cantons_vf.sql
```

La BD ofs_themakart devrait maintenant avoir une table ´k4_cantons_vf´ avec une colonne ´id1´ qui contient les noms des cantons, et une colonne `geom` avec les géométries. La requête suivante devrait nous donner la superficie en hectares, en ordre descendant:

```sql
SELECT id1 AS canton, ROUND(ST_AREA(geom) / 10000) superficie 
FROM k4_cantons_vf
ORDER BY superficie DESC;
```

Quel est le canton avec la plus grande superficie? Notez que la couche contient uniquement les surfaces potentiellement productives...



## 3. L'application Flask

L'application Flask est dans le dossier `app`. Avant de pouvoir lancer l'app, il faut mettre en place l'environnement Python.

---

*Optionnel*: Pour avoir un environnement propre, nous pouvons utiliser `virtualenv`:

```bash
cd app
virtualenv venv
source venv/bin/activate
```

Ceci met en place une nouvelle copie d'un environnement Python qui n'a pas de modules installés. Ceci nous permet de partir avec un environnement vierge et l'environnement Python principal ne sera pas affecté par nos éventuelles bêtises.

---

Il faut installer les modules Python nécessaires:

```shell
pip install -r requirements.txt
```

(ou manuellement `pip install Flask` puis `pip install psycopg2`).

Ceci nous installe tout ce qui est nécessaire (en l'occurence Flask pour le serveur Web, et pyscopg2 qui permet de se connecter à PostgreSQL depuis Python).

L'application Web fait trois choses:

- Depuis l'URL de base (`/`), elle renvoie le fichier `index.html` principal.
- Depuis l'URL `/cantons`, elle renvoie le contenu de la table `k4_cantons_vf` depuis la base de données PostGIS, en format GeoJSON, en SRS WGS84, et en faisant le calcul de la superficie des cantons (en hectares).
- Depuis l'URL `/cantons/xxx`, elle renvoie les mêmes cantons avec un SRS différent, où `xxx` correspond au code ESPG. Donc p.ex. `/cantons/2056` renvoie la couche en CH1903/LV95.

L'application cartographique se trouve dans le fichier `index.html`, respectivement dans `static/index.js` et `static/main.css`.




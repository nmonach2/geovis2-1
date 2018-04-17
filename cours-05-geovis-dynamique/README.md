# Application Géovis dynamique

Cette semaine nous allons construire une application Géovis qui charge les données depuis une base de données PostGIS et qui les affiche dans le navigateur Web.

Pour cela, nous allons utiliser le langage Python et le framework Web [Flask](http://flask.pocoo.org). En plus, nous allons utiliser Git pour garder tout sous contrôle.


## Site Web statique et application dynamique...

Il y a de nombreuses façons de construire une application Web. La "plus simple" est de construire une application dite "statique". **Dans une application Web statique, le code de l'application (HTML, Javascript etc.) ne change pas en fonction du contenu.** Le terme statique se réfère donc au DOM resp. au code et non à l'expérience utilisateur; en effet, une application Web statique peut paraître très dynamique à l'écran, avec plein d'effets écrits en Javascript et avec des interactions.

Pour une application Web statique, il suffit d'avoir un serveur Web qui envoie les fichiers HTML, JS, CSS etc. tel quel sans modification. Par exemple le serveur lancé avec `python -m SimpleHTTPServer` (ou `python -m http.server` avec Python 3) est un serveur Web qui permet de le faire. Autre variante: déposer les fichiers sur Github et utiliser [Rawgit](http://rawgit.com) pour les envoyer sous forme de fichiers d'un site Web.


**Une application Web dynamique fait tourner un code du côté du serveur pour produire un contenu adapté.** C'est-à-dire le contenu des fichiers HTML, JS etc. n'est pas le même en fonction de l'utilisateur ou de la demande. Plusieurs opérations entrent dans cette catégorie d'application:

- faire un login sur un site Web
- envoyer des données sur un serveur et les enregistrer dans une base de données pour les récupérer plus tard
- une recherche dans des documents déposées dans une base de données
- ...

Une application Web dynamique nécessite donc d'exécuter du code du côté du serveur, et donc avant cela, d'écrire ce code... Nous avons donc la possibilité d'exécuter du code du côté du client et du côté du serveur. Cependant, du côté du client (donc le navigateur Web), nous sommes limités à l'utilisation de Javascript. Du côté du serveur, il y a beaucoup plus de possibilités. Ainsi, il est par exemple possible d'utiliser des langages tel que le Java, Python, PHP, Ruby et aussi du Javascript.

En principe, on utilise toujours un ***framework Web*** pour créer une application Web dynamique. Seule exception à cela est peut-être PHP qu'il est possible d'utiliser sans framework Web, même si ceci est généralement une mauvaise pratique.

Le framework Web s'occupe typiquement des tâches les plus basiques, comme par exemple de lier l'URL de l'application à une fonction particulière de notre code. Chaque framework Web est écrit dans un langage spécifique et présente ses avantages et inconvénients. Voici les noms de quelques framework (ce n'est pas grave si vous n'en avez jamais entendu parler):

- [**Ruby on Rails**](http://rubyonrails.org) (RoR): le framework est Rails, tandis que le langage est Ruby, qui est un langage un peu passe-partout comme Python. RoR est très populaire et certainement un des meilleurs frameworks Web qui existent.

- [**Django**](http://djangoproject.com): framework sur la base de Python. Très populaire aussi.

- [**Flask**](http://flask.pocoo.org) est un autre framework sur la base de Python. Il est très modulaire et flexible. Nous allons utiliser ce framework parce qu'il permet de rester très simple, et ceci sans nous limiter dans nos possibilités.

- [**Symfony**](http://symfony.com) est un des framework PHP les plus populaires, tout comme [**Zend framework**](http://framework.zend.com).

- [**Play framework**](https://playframework.com) est un des derniers framework Web pour Java et pour Scala qui est un autre langage pour la machine virtuelle Java.

- [**Node.js**](http://nodejs.org) est un environnement qui permet de faire tourner efficacement des programmes Javascript sur un serveur. [**Express**](http://expressjs.com) est un framework Web sur la base de Node.js, tout comme [**Meteor**](http://meteor.com) qui est déstiné principalement aux applications en temps réel mais qui se prête aussi très bien pour faire des applications Web et mobiles très puissantes, et il est relativement facile à apprendre et bien documenté. [**Sails**](https://sailsjs.com) est un framework Web basé sur Express et du coup Node.js.

Nous allons regarder ici **Flask**, pour les raisons suivantes:

- Flask tourne en Python, ce qui permet d'utiliser tous les outils notamment pour le traitement et analyse de données déjà disponibles dans ce langage.

- Flask est très simple pour commencer. En fait, nous pouvons écrire une application Web avec une dizaine de lignes de code déjà...

- Flask est un framework moderne qui fait attention notamment aux problèmes potentiels de sécurité.

- On peut faire tourner une application Flask sur de nombreux serveurs Web. Ainsi, il est possible de l'intégrer dans un serveur Web Apache, ou encore d'héberger l'application sur [Heroku](http://heroku.com) ou [Google App Engine](https://cloud.google.com/appengine/).

Par contre, Flask est très modulaire et il peut être difficile de voir à travers tous les modules, de voir comment structurer au mieux une application etc. Pour celui qui veut construire une application un peu plus conséquente, il est probablement plus facile de commencer avec [**Django**](http://djangoproject.com) ou pour les adeptes de Javascript [**Meteor**](https://www.meteor.com) qui proposent des framework Web très complets déjà à la base. Et on sera toujours ravi de l'interface admin Django.

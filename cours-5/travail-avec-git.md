# Créer un nouveau répo Git sur Bitbucket

1. Dossier sur notre ordinateur
2. Créer un fichier dans notre dossier (p.ex. `test.md`)
3. Avec le Terminal, `cd` dans le dossier du projet
4. `git init`
5. Ajouter le fichier `test.md` sur le *"stage"*: `git add test.md`
6. Faire le commit de la première étape: `git commit -m "first commit"`
- Créer le répo sur Bitbucket
- Suivre les instructions du répo Bitbucket (*"I have an existing project"*)

        git remote add origin git@bitbucket.org:chkaiser/geovis2-test.git
        git push -u origin --all
        git push origin --tags


# Télécharger un répo existant

1. Dans le Terminal:

        cd /chemin/vers/dossier/où/on/clone/le/projet
        git clone git@bitbucket.org:chkaiser/geovis2-test.git
        cd geovis2-test

    L'URL peut être obtenue dans Bitbucket.


# Une étape de travail avec modification de fichiers (travail seul)

1.  `cd /dossier/du/projet`
-  On met à jour notre projet depuis le serveur: `git pull`
- On fait notre travail, on modifie des fichiers, on en ajoute etc.
- Mémoriser un fichier pour un commit: `git add mon/fichier/nouveau`. Alternativement, on peut ajouter tous les fichiers modifiés en même temps: `git add -A`
- Faire le commit: `git commit -m "mon message"`
- Envoyer le tout sur le serveur: `git push`

Si on arrive dans l'éditeur de texte en mode `-- INSERT --` (dans `vim`):
1. Entrer le message
2. Taper sur `esc`
3. Taper `:wq`


# Travail à plusieurs

1. Créer une nouvelle branche: `git checkout -b nouvelleBranche`
2. On travaille normalement: `git add -A` et `git commit -m "..."`, mais sans `git push`
3. On revient sur la branche `master`: `git checkout master`
4. On fusionne le travaille: `git merge nouvelleBranche`
5. On envoie le tout: `git push`

`git branch` permet d'afficher l'ensemble des branches, et voir sur laquelle on est.


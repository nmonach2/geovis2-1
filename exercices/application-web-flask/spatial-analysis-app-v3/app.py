# -*- coding: utf-8 -*-
import flask
from random import choice

app = flask.Flask(__name__)
app.debug = True

@app.route('/')
def index():
    return flask.render_template(
        'index.html', 
        random=choice(range(1,46))
    )


def lire_fichier_donnees():
    f = open('data/donnees-cantons.txt')
    h = f.readline().strip().split('\t')
    donnees = {}
    pop = {}
    for l in f:
        v = l.strip().split('\t')
        donnees[v[2]] = [float(v[3]), float(v[4]), float(v[5]), float(v[6]), float(v[7]), float(v[8])]
        pop[v[2]] = int(v[9])
    return (donnees, pop)


@app.route('/data')
def data():
    v, pop = lire_fichier_donnees()
    cantons = {}
    for abbr in v:
        cantons[abbr] = {
            'accidents_1000hab': v[abbr][0],
            'rapport_gde_petites_entreprises': v[abbr][1],
            'rapport_temporaire_100permanent': v[abbr][2],
            'rapport_nonhab_100hab': v[abbr][3],
            'votation_immigration_masse_2014': v[abbr][4],
            'votation_fonds_ferroviaire_2014': v[abbr][5],
        }
    return flask.jsonify(cantons=cantons)


if __name__ == '__main__':
    app.run()

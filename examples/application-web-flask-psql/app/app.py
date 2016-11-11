# -*- coding: utf-8 -*-
import flask
import psycopg2 as db
import json


app = flask.Flask(__name__)
app.debug = True

# Connect to PostGIS database
conn = db.connect("dbname='ofs_themakart' user='ck' host='localhost' password=''")


@app.route('/')
def index():
    return flask.send_from_directory('static', 'index.html')


@app.route('/cantons')
def cantons(epsg=4326):
    cur = conn.cursor()     # get a query cursor
    # our SQL query:
    sql = """SELECT id0 AS fid, id1 AS canton, 
                ST_AsGeoJson(ST_Transform(geom, %i), 7) AS geom, 
                ROUND(ST_AREA(geom) / 10000) superficie 
             FROM k4_cantons_vf""" % epsg
    cur.execute(sql)
    # retrieve the query result
    rows = cur.fetchall()
    # build the features array with GeoJSON structure
    # see file geodata/ofs-k4-cantons/k4-cantons-vf.geojson 
    # as reference for the GeoJSON file structure
    features = []
    for row in rows:
        features.append({ 
            "type": "Feature", 
            "properties": { 
                "geocode": row[0], 
                "nom": row[1],
                "superficie": row[3]
            },
            "geometry": json.loads(row[2])
        })
    feature_collection = {
        "type": "FeatureCollection",
        "features": features
    }
    return flask.jsonify(feature_collection)


@app.route('/cantons/<int:epsg>')
def cantons_epsg(epsg):
    return cantons(epsg)


if __name__ == '__main__':
    app.run()

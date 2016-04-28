var map = new Datamap({
    geographyConfig: {
        dataUrl: 'ch_cantons.topo.json'
    },
    scope: 'che',
    element: document.getElementById('map1'),
    setProjection: function (element) {
        var projection = d3.geo.mercator()
            .center([8.215, 45.875])
            .scale(10000)
            .translate([400, 500]);
        var path = d3.geo.path()
            .projection(projection);

        return { path: path, projection: projection };
    },
    fills: {
      defaultFill: '#cccccc',
      lt50: '#e50050',
      gt55to60: '#92c362',
      gt60to65: '#3aa935',
      gt65to75: '#008d36',
      gt75: '#006532'
    },
    data: {
        'ZH': { "fillKey": "gt65to75", "tx_oui": 71.3, "tx_non": 28.7, "canton": "ZH", "electeurs": 886472, "votants": 408538, "tx_participation": 46.09, "oui": 284689, "non": 114796 },
        'BE': { "fillKey": "gt65to75", "tx_oui": 66.8, "tx_non": 33.2, "canton": "BE", "electeurs": 720085, "votants": 312620, "tx_participation": 43.41, "oui": 204651, "non": 101564 },
        'LU': { "fillKey": "gt65to75", "tx_oui": 68.1, "tx_non": 31.9, "canton": "LU", "electeurs": 263813, "votants": 121791, "tx_participation": 46.17, "oui": 81369, "non": 38161 },
        'UR': { "fillKey": "gt55to60", "tx_oui": 55.9, "tx_non": 44.1, "canton": "UR", "electeurs": 26214, "votants": 10764, "tx_participation": 41.06, "oui": 5887, "non": 4638 },
        'SZ': { "fillKey": "gt55to60", "tx_oui": 56.6, "tx_non": 43.4, "canton": "SZ", "electeurs": 99707, "votants": 48830, "tx_participation": 48.97, "oui": 27325, "non": 20920 },
        'OW': { "fillKey": "gt55to60", "tx_oui": 56.3, "tx_non": 43.7, "canton": "OW", "electeurs": 25521, "votants": 13173, "tx_participation": 51.62, "oui": 7062, "non": 5483 },
        'NW': { "fillKey": "gt55to60", "tx_oui": 59.1, "tx_non": 40.9, "canton": "NW", "electeurs": 30567, "votants": 14999, "tx_participation": 49.07, "oui": 8617, "non": 5958 },
        'GL': { "fillKey": "gt65to75", "tx_oui": 66.6, "tx_non": 33.4, "canton": "GL", "electeurs": 26096, "votants": 9418, "tx_participation": 36.09, "oui": 6166, "non": 3093 },
        'ZG': { "fillKey": "gt65to75", "tx_oui": 71.4, "tx_non": 28.6, "canton": "ZG", "electeurs": 72663, "votants": 37585, "tx_participation": 51.73, "oui": 26520, "non": 10620 },
        'FR': { "fillKey": "gt60to65", "tx_oui": 62.9, "tx_non": 37.1, "canton": "FR", "electeurs": 189179, "votants": 84016, "tx_participation": 44.41, "oui": 51728, "non": 30549 },
        'SO': { "fillKey": "gt65to75", "tx_oui": 69.5, "tx_non": 30.5, "canton": "SO", "electeurs": 174869, "votants": 84731, "tx_participation": 48.45, "oui": 58055, "non": 25524 },
        'BL': { "fillKey": "gt75", "tx_oui": 78.1, "tx_non": 21.9, "canton": "BL", "electeurs": 113966, "votants": 56052, "tx_participation": 49.18, "oui": 42626, "non": 11946 },
        'BS': { "fillKey": "gt65to75", "tx_oui": 70.3, "tx_non": 29.7, "canton": "BS", "electeurs": 186367, "votants": 83190, "tx_participation": 44.64, "oui": 57051, "non": 24051 },
        'SH': { "fillKey": "gt60to65", "tx_oui": 63.2, "tx_non": 36.8, "canton": "SH", "electeurs": 50483, "votants": 32749, "tx_participation": 64.87, "oui": 18934, "non": 11031 },
        'AR': { "fillKey": "gt65to75", "tx_oui": 66.0, "tx_non": 34.0, "canton": "AR", "electeurs": 37738, "votants": 19402, "tx_participation": 51.41, "oui": 12668, "non": 6535 },
        'AI': { "fillKey": "gt55to60", "tx_oui": 55.4, "tx_non": 44.6, "canton": "AI", "electeurs": 11421, "votants": 4771, "tx_participation": 41.77, "oui": 2556, "non": 2061 },
        'SG': { "fillKey": "gt60to65", "tx_oui": 64.3, "tx_non": 35.7, "canton": "SG", "electeurs": 312962, "votants": 137044, "tx_participation": 43.79, "oui": 87170, "non": 48308 },
        'GR': { "fillKey": "gt60to65", "tx_oui": 61.5, "tx_non": 38.5, "canton": "GR", "electeurs": 136186, "votants": 75979, "tx_participation": 55.79, "oui": 45088, "non": 28254 },
        'AG': { "fillKey": "gt65to75", "tx_oui": 66.9, "tx_non": 33.1, "canton": "AG", "electeurs": 404017, "votants": 177825, "tx_participation": 44.01, "oui": 116983, "non": 57921 },
        'TG': { "fillKey": "gt65to75", "tx_oui": 68.6, "tx_non": 31.4, "canton": "TG", "electeurs": 163158, "votants": 70260, "tx_participation": 43.06, "oui": 46858, "non": 21478 },
        'TI': { "fillKey": "gt55to60", "tx_oui": 55.3, "tx_non": 44.7, "canton": "TI", "electeurs": 214297, "votants": 88949, "tx_participation": 41.51, "oui": 47507, "non": 38376 },
        'VD': { "fillKey": "gt55to60", "tx_oui": 56.4, "tx_non": 43.6, "canton": "VD", "electeurs": 415536, "votants": 192672, "tx_participation": 46.37, "oui": 105371, "non": 81299 },
        'VS': { "fillKey": "lt50", "tx_oui": 19.6, "tx_non": 80.4, "canton": "VS", "electeurs": 209276, "votants": 141794, "tx_participation": 67.75, "oui": 27331, "non": 111785 },
        'NE': { "fillKey": "gt65to75", "tx_oui": 67.7, "tx_non": 32.3, "canton": "NE", "electeurs": 110240, "votants": 46235, "tx_participation": 41.94, "oui": 30446, "non": 14547 },
        'GE': { "fillKey": "gt55to60", "tx_oui": 57.7, "tx_non": 42.3, "canton": "GE", "electeurs": 242800, "votants": 112946, "tx_participation": 46.52, "oui": 61801, "non": 45222 },
        'JU': { "fillKey": "gt60to65", "tx_oui": 62.8, "tx_non": 37.2, "canton": "JU", "electeurs": 51047, "votants": 20454, "tx_participation": 40.07, "oui": 12483, "non": 7394 }
    }

});

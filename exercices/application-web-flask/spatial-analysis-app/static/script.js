
data = null;
pop = null;
acp = null;
clusters = null;
cantons = null;

function main() {
    
    dessinerSqueletteGraphique();
    
    // Charger toutes les données depuis le serveur
    $.getJSON('/pop', function(d){
        pop = d.population;
        
        // faire liste des cantons
        cantons = [];
        for (var c in pop) {
            cantons.push(c);
        }
        
        // dessiner les cercles une fois que toutes les données sont chargées
        if (data != null && pop != null && acp != null && clusters != null) {
            dessinerCercles();
        }
    });
    
    $.getJSON('/data', function(d){
        data = d.cantons;
        if (data != null && pop != null && acp != null && clusters != null) {
            dessinerCercles();
        }
    });
    
    $.getJSON('/acp', function(d){
        acp = d.acp;
        if (data != null && pop != null && acp != null && clusters != null) {
            dessinerCercles();
        }
    });
    
    $.getJSON('/clusters', function(d){
        clusters = d.clusters;
        if (data != null && pop != null && acp != null && clusters != null) {
            dessinerCercles();
        }
    });
    
}


function dessinerSqueletteGraphique() {
    paper = Raphael($('#graphique')[0], 370, 330);
    
    // Axe des X
    var axeX = paper.path("M90 265L340 265").attr({
        'fill': 'none', 'stroke': '#9d9c9c', 'stroke-width': 0.5
    });
    var labelX = paper.text(210, 305, "Composante 1").attr({
        'font-size': '10px', 'font-family': 'Helvetica, sans-serif', 'text-anchor': 'middle'
    });
    
    // axe des x = composante 1; min = -50 , max = 20
    xmin = -50, xmax = 20, xstep = 10;
    var nxsteps = (xmax - xmin) / xstep;
    var val = xmin;
    for (var x=90; x <= 330; x += (330-90)/nxsteps) {
        var markerX = paper.path('M'+x+' 265L'+x+' 272').attr({
            'fill': 'none', 'stroke': '#9d9c9c', 'stroke-width': 0.5
        });
        if (val % 20 == 0) {
            var labelX = paper.text(x, 282, val).attr({
                'font-size': '10px', 'font-family': 'Helvetica, sans-serif', 'text-anchor': 'middle'
            });
        }
        val += 10;
    }
    
    // Axe des Y
    var axeY = paper.path("M90 265L90 15").attr({
        'fill': 'none', 'stroke': '#9d9c9c', 'stroke-width': 0.5
    });
    var labelY = paper.text(40, 145, "Composante 2").attr({
        'font-size': '10px', 'font-family': 'Helvetica, sans-serif', 'text-anchor': 'middle'
    }).transform('R-90,40,145');
    
    // axe des y = composante 2; min = -30 , max = 20
    ymin = -30, ymax = 20, ystep = 10;
    var nysteps = (ymax - ymin) / ystep;
    var val = ymax;
    for (var y=25; y <= 265; y += (265-25)/nysteps) {
        var markerY = paper.path('M90 '+y+'L83 '+y).attr({
            'fill': 'none', 'stroke': '#9d9c9c', 'stroke-width': 0.5
        });
        if (val % 20 == 0) {
            var labelY = paper.text(80, y+3, val).attr({
                'font-size': '10px', 'font-family': 'Helvetica, sans-serif', 'text-anchor': 'end'
            });
        }
        val -= 10;
    }
    
}

function dessinerCercles(){
    
    // Trier d'abord les cantons en fonction de la population...
    var sortable = [];
    for (var canton in pop) {
        sortable.push([canton, pop[canton]]);
    }
    sortable.sort(function(a, b) {return a[1] - b[1]});
    var cantons_tries = [];
    for (var i=0; i < sortable.length; i++) {
        cantons_tries.push(sortable[i][0]);
    }
    
    // Définir les couleurs pour les différents clusters
    var couleurs = ['#00ff00', '#ff0000', '#0000ff', '#666600', '#00aaaa', '#660066'];
    
    // Cercles proportionnels
    for (var i=cantons_tries.length-1; i >= 0 ; i--) {
        var canton = cantons_tries[i];
        var cx = ((acp.transform[canton][0] - xmin) / (xmax-xmin)) * (330-90) + 90;
        var cy = 265 - (acp.transform[canton][1] - ymin) / (ymax-ymin) * (265-25) + 25;
        var r = Math.pow(pop[canton], 0.57) / 200;
        var fill = couleurs[clusters[canton]-1];
        var c = paper.circle(cx, cy, r).attr({'fill': fill, 'stroke': '#ffffff', 'stroke-width': 0.5});
        c.data('canton', canton)
        graphiqueAddCircleEvents(c);
    }
}


function graphiqueAddCircleEvents(c) {
    c.hover(function(){
        var d = c.data('canton');
        c.attr({'stroke': '#000000', 'stroke-width': 2});
        $('#infos').html(
            '<h2>'+d+'</h2>'
        );
    }, function(){
        c.attr({'stroke': '#ffffff', 'stroke-width': 0.5});
        $('#infos').html('');
    });
}


$(main);

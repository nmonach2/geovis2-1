function main() {
    
    paper = Raphael($('#graphique')[0], 370, 330);
    
    // Axe des X
    var axeX = paper.path("M90 265L340 265").attr({
        'fill': 'none', 'stroke': '#9d9c9c', 'stroke-width': 0.5
    });
    var labelX = paper.text(210, 305, "Pourcentage de oui pour la vignette à 100 francs").attr({
        'font-size': '10px', 'font-family': 'Helvetica, sans-serif', 'text-anchor': 'middle'
    });
    
    var prct = 20;
    for (var x=90; x <= 330; x += 60) {
        var markerX = paper.path('M'+x+' 265L'+x+' 272').attr({
            'fill': 'none', 'stroke': '#9d9c9c', 'stroke-width': 0.5
        });
        if (prct % 20 == 0) {
            var labelX = paper.text(x, 282, prct+'%').attr({
                'font-size': '10px', 'font-family': 'Helvetica, sans-serif', 'text-anchor': 'middle'
            });
        }
        prct += 10;
    }
    
    // Axe des Y
    var axeX = paper.path("M90 265L90 15").attr({
        'fill': 'none', 'stroke': '#9d9c9c', 'stroke-width': 0.5
    });
    var labelX = paper.text(40, 145, "Pourcentage de oui pour l'initative 1:12").attr({
        'font-size': '10px', 'font-family': 'Helvetica, sans-serif', 'text-anchor': 'middle'
    }).transform('R-90,40,145');
    
    var prct = 60;
    for (var y=25; y <= 265; y += 60) {
        var markerY = paper.path('M90 '+y+'L83 '+y).attr({
            'fill': 'none', 'stroke': '#9d9c9c', 'stroke-width': 0.5
        });
        if (prct % 20 == 0) {
            var labelY = paper.text(80, y+3, prct+'%').attr({
                'font-size': '10px', 'font-family': 'Helvetica, sans-serif', 'text-anchor': 'end'
            });
        }
        prct -= 10;
    }
    
    // Cercles proportionnels
    for (var i=0; i < data_cantons.length; i++) {
        var cx = (data_cantons[i].p_oui_vignette - 0.2) * 600 + 90;
        var cy = 265 - (data_cantons[i].p_oui_1_12 - 0.2) * 600;
        var r = Math.pow(data_cantons[i].pop2012, 0.57) / 200;
        var fill = '#00ff00';
        if (data_cantons[i].langue == 'D') fill = '#ff0000';
        if (data_cantons[i].langue == 'F') fill = '#0000ff';
        var c = paper.circle(cx, cy, r).attr({'fill': fill, 'stroke': '#ffffff', 'stroke-width': 0.5});
        c.data('canton', data_cantons[i])
        graphiqueAddCircleEvents(c);
    }
    
}


function graphiqueAddCircleEvents(c) {
    c.hover(function(){
        var d = c.data('canton');
        c.attr({'stroke': '#000000', 'stroke-width': 2});
        $('#infos').html(
            '<h2>'+d.canton+'</h2>' + 
            '<p>Pourcentage de oui pour la vignette de 100 francs: ' + Math.round(d.p_oui_vignette * 1000)/10 + '%</p>' +
            "<p>Pourcentage de oui pour l'initative 1:12: " + Math.round(d.p_oui_1_12 * 1000)/10 + '%</p>' +
            '<p>Population résidente en 2012: ' + d.pop2012 +'</p>'
        );
    }, function(){
        c.attr({'stroke': '#ffffff', 'stroke-width': 0.5});
        $('#infos').html('');
    });
}


$(main);

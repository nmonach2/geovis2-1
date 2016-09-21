
// All our functions and data will be stored in APP.
// This is to avoid problems with other libraries, code etc.
APP = {};

APP.data = {
  domains: [
    {name: 'Population', themes: ['Âge', 'Classes socio-professionnelles', 'Niveau de formation']},
    {name: 'Économie', themes: ['Emplois', "Secteur d'activité", "Taille d'entreprise"]},
    {name: 'Tourisme', themes: ['Nombre de nuitées', "Nombre d'établissements"]}
  ],
  ncantons: 6
};


// Entry point to our application
APP.main = function(){
    APP.buildDomainDropdown();
    APP.buildGraph();
};


APP.buildDomainDropdown = function(){
  d3.select('#dropdown-domains')
      .append('select')
      .attr('class', 'form-control')
      .on('change', APP.updateThemeDropdown)
      .selectAll('option')
      .data(APP.data.domains)
      .enter()
      .append('option')
      .attr('value', function(d,i){ return i; })
      .text(function(d){ return d.name; })
  
  APP.buildThemeDropdown();
};


APP.buildThemeDropdown = function(){
  
  // Create the theme dropdown and add a onChange event handler
  menuItems = d3.select('#dropdown-themes')
      .append('select')
      .attr('class', 'form-control')
      .on('change', APP.updateChart);

  // Update the content of the dropdown
  APP.updateThemeDropdown();
};


APP.updateThemeDropdown = function(){
  // Get first the currently selected value from the domain dropdown:
  var selectedDomain = d3.select('#dropdown-domains select').property('value');

  // Update the menu if there is already one.
  var menuItems = d3.select('#dropdown-themes select')
      .selectAll('option')
      .data(APP.data.domains[selectedDomain].themes)
      .attr('value', function(d,i){ return i; })
      .text(function(d){ return d; });

  // Define what to do in case of new data (add a new menu item)
  menuItems
      .enter()
      .append('option')
      .attr('value', function(d,i){ return i; })
      .text(function(d){ return d; });

  // Define what to do in case of data removal (remove a menu item)
  menuItems
      .exit()
      .remove();

  // Update our chart because changing the theme dropdown might change
  // the selected theme also.
  APP.updateChart();
};


APP.updateChart = function(){

  // Check which domain and theme is currently selected.
  var selectedDomain = d3.select('#dropdown-domains select').property('value');
  var selectedTheme = d3.select('#dropdown-themes select').property('value');

  // Get our data according to the domain and theme directly from the server
  // (it is just a static JSON file in our case, but could be a query to a 
  // dynamic Web app with database and everything fancy)
  var dataUrl = 'data/domain'+selectedDomain+'-theme'+selectedTheme+'.json';
  d3.json(dataUrl, function(d){
      console.log(['data from '+dataUrl+' loaded: ', d]);
      APP.data.current = d;     // store data for reference

      var svg = d3.select('#chart-view svg');

      var bars = svg.selectAll('rect')
          .data(d.data);

      bars.enter()
          .append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 0)
          .attr('height', 29)
          .attr('class', 'chart bar')
          .on('mouseover', APP.displayBarInfo);

      bars.transition(1000)
          .attr('y', function(d, i){ return i*30; })
          .attr('width', function(d){ return d.value / 2; });

      var barLabels = svg.selectAll('text')
          .data(d.data);

      barLabels.enter()
          .append('text')
          .attr('x', 0)
          .attr('y', function(d,i){ return i*30 + 20; })
          .attr('text-anchor', 'end');

      barLabels
          .transition(1000)
          .text(function(d){ return d.canton +': '+ d.value; })
          .attr('x', function(d){ return (d.value / 2) - 10; });

  });

};


APP.displayBarInfo = function(d){
  // Update the infobox according to the currently hovered bar.
  // This can also be done using jQuery as shown here:
  $('#infobox').html("<p>Canton: "+d.canton+"<br>Valeur: "+d.value+"</p>");
};



APP.buildGraph = function(){
  sigma.parsers.gexf(
    'data/codeminer.gexf',
    { container: 'network-view' },
    function(s) {

      S = s;
      s.graph.nodes().forEach(function(n) {
        n.originalColor = n.color;
      });
      s.graph.edges().forEach(function(e) {
        e.originalColor = e.color;
      });

      s.bind('clickNode', function(e) {
        var selectedNode = e.data.node;
        var selectedNeighbours = s.graph.neighborhood(selectedNode.id);
        s.graph.nodes().forEach(function(n) {
          if (n == selectedNode || $.inArray(n, selectedNeighbours.nodes) >= 0){
            n.color = n.originalColor;
          } else {
            n.color = '#eee';
          }
        });
        s.refresh();

        // Update the bar chart to show interaction between two visualisations.
        // Here we just select a random bar of the chart.
        var min = 0, max = APP.data.ncantons - 1;
        var selectedBar = Math.floor(Math.random()*(APP.data.ncantons-1));
        APP.highlightBar(selectedBar);
      });

      s.bind('clickStage', function(e) {
        s.graph.nodes().forEach(function(n) {
          n.color = n.originalColor;
        });
        s.refresh();

        // Remove bar chart highlighting
        APP.unhighlightBars();
      });
    }
  );
};


APP.highlightBar = function(idx){
  // Highlight the bar by adding a class 'active' and appropriate CSS (using jQuery)
  // Remove class active of all rectangles in chart (to deselect previous selection)
  APP.unhighlightBars();
  // Select the bar with index idx, and add class 'active' to it.
  $($('#chart-view svg rect')[idx]).addClass('active');
};

APP.unhighlightBars = function(){
  $('#chart-view svg rect').removeClass('active');
}

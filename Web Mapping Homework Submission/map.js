// API endpoint
var link1 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var link2 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"

// Perform a GET request 
d3.json(link1, function(data) {
  // When response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {


  // Popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
      "</h3><hr><p>Magnitude: " + feature.properties.mag + "</p>");
  }

  // GeoJSON layer containing the features related to the earthquakeData object
  // Run the onEachFeature function once for each dataset
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      var color;
      var r = 255;
      var g = Math.floor(255-80*feature.properties.mag);
      var b = Math.floor(255-80*feature.properties.mag);
      color= "rgb("+r+" ,"+g+","+ b+")"
      
      var geojsonMarkerOptions = {
        radius: 4*feature.properties.mag,
        fillColor: color,
        color: "black",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  });


  // Earthquakes layer to the createMap function
  createMap(earthquakes);
  
}

function createMap(earthquakes) {

  // Streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoibXZzYXlld2ljaCIsImEiOiJjanM1Y2hnYmUwZWJkM3lxcDY2b21sOWlxIn0.jQ-xVGhBjMfJK3bq9Bpl-A." +
    "T6YbdDixkOBWH_k9GbS8JQ");

  // BaseMaps object to hold our layers
  var baseMaps = {
    "Street Map": streetmap
  };

  // Overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create function for streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });


  function getColor(d) {
      return d < 1 ? 'rgb(242,240,145)' :
            d < 2  ? 'rgb(232,229,92)' :
            d < 3  ? 'rgb(239,235,2)' :
            d < 4  ? 'rgb(249,166,117)' :
            d < 5  ? 'rgb(249,134,67)' :
            d < 6  ? 'rgb(255,105,105)' :
            d < 7  ? 'rgb(255,75,75)' :
            d < 8  ? 'rgb(255,45,45)' :
            d < 9  ? 'rgb(255,15,15)' :
                        'rgb(255,0,0)';
  }

  // Legend to display information about our map
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 1, 2, 3, 4, 5, 6, 7, 8],
      labels = [];

      div.innerHTML+='Magnitude<br><hr>'
  
      // loop through the density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }
  
  return div;
  };
  
  legend.addTo(myMap);

}
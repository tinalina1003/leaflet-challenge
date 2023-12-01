// create my map

let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4
  });
  
  // Adding a tile layer (the background map image) to our map:

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);




// extract info from geojson using d3

let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

d3.json(url).then(function(data){

    // access the features property
    let features = data.features

    // L.geoJSON(features).addTo(myMap) only creates markers in this case since it doesn't support circles.. can support polygons though just
    // like in the NYC borough example

    // access each of the features to obtain and marker the coordinates
    for (i=0; i<features.length; i++){

        // used to extract the locations of the events
        let eqMarker = features[i].geometry;
        
        // used to extract the properties used for pop up events
        let eqProperties = features[i].properties;

        if (eqMarker) {
            // create the circles using the json coordinates
            L.circle([eqMarker.coordinates[1], eqMarker.coordinates[0]], {
                stroke: true, // outline of the circles
                weight: 0.5, // thickness of the circles
                fillOpacity: 0.75,
                color: 'black', // colour of the outline
                fillColor: circleColours(eqMarker.coordinates[2]), 
                radius: eqProperties.mag*10000
       
            }
            // pop up event information
        ).bindPopup(`<h3>${eqProperties.place}</h3><hr><p>
        Event Date: ${new Date(eqProperties.time)}<p>
        Magnitude: ${eqProperties.mag}<p>
        Depth: ${eqMarker.coordinates[2]}km<p>`)
        .addTo(myMap);

        }

    }

    // legend
    // set legend bottom right
    let legend = L.control({ position: "bottomright"});

    legend.onAdd = function () {
      let div = L.DomUtil.create("div", "info legend");
      
      let colors = ["#98ee00", "#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"]
      let depthRange = [-10, 10, 30, 50, 70, 90];
    
      //loop through each range and create label with color
      for (let i = 0; i < depthRange.length; i++) {
        div.innerHTML += 
        "<i style='background: " + colors[i] + " '></i>"  + 
        depthRange[i] + (depthRange[i + 1] ? "&ndash;" + depthRange[i + 1] + "<br>" : "+");
      }
        return div;
    };
    
    //Add legend to map
    legend.addTo(myMap);

});


function circleColours(depth){

    // create empty color
    var color = "";

    if (depth >= -10 && depth <= 10) {
        return color = '#A3F600';
    }

    else if (depth > 10 && depth <= 30){
        return color = '#DCF400';
    }

    else if (depth > 30 && depth <= 50){
        return color = '#F7DB11';
    }

    else if (depth > 50 && depth <= 70) {
        return color = '#FDB72A';
    }

    else if (depth > 70 && depth <= 90) {
        return color = '#FCA35D';
    }

    else {
        return color = '#FF5F65';
    }

}


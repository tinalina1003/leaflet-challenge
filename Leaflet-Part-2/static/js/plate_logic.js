/////////////////////////////////////////////
//////// EXTRACT TECTONIC PLATES DATA////////
/////////////////////////////////////////////

// tectonic plates layer
let plateLayer = L.layerGroup();

// extract plate data from github json provided
let plateUrl = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json'

d3.json(plateUrl).then(function(plateData){

    // Because of the nature of GeoJSON data, every Feature Object is spatially bounded, meaning the shape type and 
    // coordinates are listed within the Geometry Property of the Feature Object.
    
    L.geoJSON(plateData, {
        fillOpacity: 0,
        color: 'orange',
        onEachFeature: onEachPlateFeature //The onEachFeature is able to read all the properties within the features of the GeoJSON object.

    }).addTo(plateLayer)

});

// note that onEachFeature automatically reads features.. thats why I don't have to create
// data.features to access
function onEachPlateFeature(feature, layer) {

    layer.bindPopup(`<h3>${feature.properties.PlateName} Plate</h3>`)
};


/////////////////////////////////////////////////////////
//////// CREATE STREET, TOPO, AND SATELITE MAPS//////////
/////////////////////////////////////////////////////////


// Adding a tile layer (the background map image) to our map:

let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// google satellite map
let sat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
});


////////////////////////////////
////// CREATE BASE LAYERS //////
////////////////////////////////

// Only one base layer can be shown at a time.
let baseMaps = {
    Satellite: sat,
    Street: street,
    Topography: topo
}


////////////////////////////////////////////////////
/// extract earthquake info from geojson using d3///
////////////////////////////////////////////////////

let earthquakeLayer = new L.layerGroup(); // create a new layer for earthquake markers

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
            // did not use geojson here because the geometry type for each of these individual features (earthquakes) is "Point", so no polygons/circles
            L.circle([eqMarker.coordinates[1], eqMarker.coordinates[0]], {
                stroke: true, // outline of the circles
                weight: 0.5, // thickness of the circles
                fillOpacity: 0.75,
                color: 'black', // colour of the outline
                fillColor: circleColours(eqMarker.coordinates[2]), 
                radius: eqProperties.mag*50000
       
            }
            // pop up event information
        ).bindPopup(`<h3>${eqProperties.place}</h3><hr><p>
        Event Date: ${new Date(eqProperties.time)}<p>
        Magnitude: ${eqProperties.mag}<p>
        Depth: ${eqMarker.coordinates[2]}km<p>`)
        .addTo(earthquakeLayer); // note we add this to the earthquake layer so we can toggle on and off

        }

    }

    
// colours I needed for depth
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

};

    ///////////////////////////////
    /////// CREATE LEGEND /////////
    ///////////////////////////////

    // legend
    // set legend bottom right
    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function(){

        // The method creates a new HTML element with the specified tag name and optional class names
        let div = L.DomUtil.create("div", "info legend");

        // set the ranges and colours
        let depthRange = [-10, 10, 30, 50, 70, 90];
        let colours = ['#A3F600', '#DCF400', '#F7DB11','#FDB72A', '#FCA35D', '#FF5F65'];

        // set title
        div.innerHTML = "<h4>Depth of Quake<br> (km)</h4>";

        // create the legend contents
        for (i=0; i< depthRange.length; i++){

            div.innerHTML += "<i style = 'background: "+ colours[i] + " '></i>"+
                            depthRange[i] + (depthRange[i+1] ? "&ndash;" + depthRange[i+1] + "<br>" : "+");

            }   

            return div;

    }

    legend.addTo(myMap)

});

//////////////////////////////////////
////// AGGREGATE ALL MAP LAYERS///////
//////////////////////////////////////

// layer that I want to be toggled on and off
let overlayMaps = {
    
    'Tectonic Plates' : plateLayer,
    'Earthquake': earthquakeLayer
}

// my actual map

let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4,
    layers: [sat, plateLayer, earthquakeLayer] // these are default layers... I cannot put overlayMaps because it's not a layer
  });

// this is the top right hand controller.. includes the baselayers and overlaylayers I want to toggle
// note this is NOT the earthquakeLayer.. but the COLLECTION of layers
L.control.layers(baseMaps, overlayMaps, {
    collapsed:false // so the lil menu bar at the top does not collapse into smaller menu
}).addTo(myMap)



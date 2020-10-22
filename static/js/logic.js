//Initialize and create 5 layer groups
var comingSoon= new L.LayerGroup();
var emptyStations= new L.LayerGroup();
var outofOrder= new L.LayerGroup();
var lowStations= new L.LayerGroup();
var healthyStations= new L.LayerGroup();

//Add tile layers
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "streets-v11",
    accessToken: API_KEY
});

var outdoorMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 18,
id: "outdoors-v9",
accessToken: API_KEY
});

// Create a baseMaps object to hold all the tile(map) layers
var baseMaps = {
    "Street Map": lightmap,
    "Outdoor Map":outdoorMap
};

//Create the base map to load everyting
var myMap = L.map("map", {
    center: [40.6976701,-74.2598667],
    zoom: 4,
    //initial the page with the following
    layers: [lightmap,healthyStations]
});

//URL to get endpoint json file for bike information
const url="https://gbfs.citibikenyc.com/gbfs/en/station_information.json";

d3.json(url,function(data) {

    console.log(data);


});
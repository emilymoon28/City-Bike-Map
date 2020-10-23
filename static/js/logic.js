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
id: "light-v10",
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
    "Outdoor Map":outdoorMap,
    "Light Map": lightmap,
};

var myMap= L.map("map-id",{
    center: [40.782346,-73.9621082],
    zoom: 15,

    //initial the page with the following
    layers:[outdoorMap,healthyStations]
});


//URL to get endpoint json file for bike information
const info_url="https://gbfs.citibikenyc.com/gbfs/en/station_information.json";
const status_url="https://gbfs.citibikenyc.com/gbfs/en/station_status.json";

d3.json(info_url,function(info_data) {

    d3.json(status_url,function(status_data){
        //get array of stations
        var infoData=info_data.data.stations;
        var statusData=status_data.data.stations;
        var updateTime=infoData.last_updated;

        // Create an object to keep of the number of markers in each layer
        var stationCount = {
            COMING_SOON: 0,
            EMPTY: 0,
            LOW: 0,
            NORMAL: 0,
            OUT_OF_ORDER: 0
        };
  
        //loop through both datasets
        for (var i=0; i < infoData.length; i++){

            // Create a new station object with properties of both station objects since both array line up the same
            var station = Object.assign({}, infoData[i], statusData[i]);

            var cor=[station.lat,station.lon]

            if (station.is_installed===0) {
                stationCount.COMING_SOON +=1;
                L.marker(cor)
                  .bindPopup("<h2>Coming Soon</h2><hr><h3>"+station.name+"</h3><h3> Station ID: "+station.station_id+"</h3>")
                  .addTo(comingSoon);
            }
            else if (station.num_bikes_available===0){
                stationCount.EMPTY +=1;
                L.marker(cor)
                .bindPopup("<h2>Empty Station</h2><hr><h3>"+station.name+"</h3><h3> Station ID: "+station.station_id+"</h3>")
                .addTo(emptyStations)
            }
            else if (station.is_installed===1 && station.is_renting===0){
                stationCount.OUT_OF_ORDER +=1;
                L.marker(cor)
                .bindPopup("<h2>Out of Order</h2><hr><h3>"+station.name+"</h3><h3> Station ID: "+station.station_id+"</h3>")
                .addTo(outofOrder)
            }
            else if (station.num_bikes_available < 5){
                stationCount.LOW+=1;
                L.marker(cor)
                .bindPopup("<h2>Less Than 5 Available</h2><hr><h3>"+station.name+"</h3><h3> Station ID: "+station.station_id+"</h3>")
                .addTo(lowStations)
            }
            else {
                stationCount.NORMAL +=1;
                L.marker(cor)
                .bindPopup("<h3>"+station.name+"</h3><h3> Station ID: "+station.station_id+"</h3>")
                .addTo(healthyStations)
            }
        
        };

        console.log(stationCount);
   });

});

var overlayMaps = {
    "Healthy Stations":healthyStations,
    "Low Availability": lowStations,
    "Empty Statioin": emptyStations,
    "Out of order":outofOrder,
    "Coming Soon": comingSoon
};
//#################################################Create Legend with Stations Count and Time of Update#############################################
// Create a legend to display information about our map
var info = L.control({
    position: "bottomright"
  });

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };

//add the info legend to the map
info.addTo(myMap);
  
  
// Initialize an object containing icons for each layer group
var icons = {
    COMING_SOON: L.ExtraMarkers.icon({
      icon: "ion-settings",
      iconColor: "white",
      markerColor: "yellow",
      shape: "star"
    }),
    EMPTY: L.ExtraMarkers.icon({
      icon: "ion-android-bicycle",
      iconColor: "white",
      markerColor: "red",
      shape: "circle"
    }),
    OUT_OF_ORDER: L.ExtraMarkers.icon({
      icon: "ion-minus-circled",
      iconColor: "white",
      markerColor: "blue-dark",
      shape: "penta"
    }),
    LOW: L.ExtraMarkers.icon({
      icon: "ion-android-bicycle",
      iconColor: "white",
      markerColor: "orange",
      shape: "circle"
    }),
    NORMAL: L.ExtraMarkers.icon({
      icon: "ion-android-bicycle",
      iconColor: "white",
      markerColor: "green",
      shape: "circle"
    })
  };
  
L.control.layers(baseMaps,overlayMaps, {
    collapsed:false
}).addTo(myMap);

L.control.scale().addTo(myMap);
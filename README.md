# citi-bike-map
This geomap visualization provides live bike station status

1. Utilized two citi bike apis:<br>
<ul>
<li>bike station information: https://gbfs.citibikenyc.com/gbfs/en/station_information.json</li>
<li>station status:https://gbfs.citibikenyc.com/gbfs/en/station_status.json</li>
</ul>

2. Categorized stations by the number of bike available and status (renting or not, installed or not, etc,.)

3. Color-coded and applied special markers to each category of stations.

4. Created legend with matching colors to the map and the number of each station.

Note: You would need your own MapBox token in order to load the base map. The file location for inputting token is static > js > config.js
<br>

Here's a snapshot of the visualization.
<img src="final_product.png">

# leaflet-challenge
This is my bootcamp Module 15 Assignment, Leaflet Challenge

Leaflet Part 1 contains code that creates earthquake data from the last 7 days. It contains circle events with popup features that state the location, date, and magnitude.

Optionally, I also did Leaflet Part 2 which contains code of the plates with satellite layer as well as the aforementioned part 1 included as well i.e.) it has all the earthquake data from the past week.

JavaScript mapping with Leaflet and D3
  <div class="description user_content "><div id="bootcamp">
<img style="display: none;" src="https://static.bc-edx.com/data/dl-1-2/m15/lms/img/banner.jpg" alt="lesson banner">
    <h3>Background</h3>
    <p>The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.</p>
    <p>The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.</p>
    <h3>Before You Begin</h3>
    <ol>
        <li>
            <p>Create a new repository for this project called <code>leaflet-challenge</code>. <strong>Do not add this Challenge to an existing repository</strong>.</p>
        </li>
        <li>
            <p>Clone the new repository to your computer.</p>
        </li>
        <li>
            <p>Inside your local git repository, create a directory for the Leaflet challenge. Use the folder names to correspond to the challenges: <strong>Leaflet-Part-1</strong> and <strong>Leaflet-Part-2</strong>.</p>
        </li>
        <li>
            <p>This Challenge uses both <strong>HTML</strong> and <strong>JavaScript</strong>, so be sure to add all the necessary files. These will be the main files to run for analysis.</p>
        </li>
        <li>
            <p>Push the above changes to GitHub.</p>
        </li>
    </ol>
    <h3>Files</h3>
    <p>Download the following files to help you get started:</p>
    <p><a href="https://static.bc-edx.com/data/dl-1-2/m15/lms/starter/Starter_Code.zip">Module 15 Challenge files</a></p>
    <h3>Instructions</h3>
    <p>The instructions for this activity are broken into two parts:</p>
    <ul>
        <li>
            <p>Part 1: Create the Earthquake Visualization</p>
        </li>
        <li>
            <p>Part 2: Gather and Plot More Data (Optional with no extra points earning)</p>
        </li>
    </ul>
    <h3>Part 1: Create the Earthquake Visualization</h3>
    <p><img src="https://static.bc-edx.com/data/dl-1-2/m15/lms/img/2-BasicMap.jpg" alt="2-BasicMap"></p>
    <p>Your first task is to visualize an earthquake dataset. Complete the following steps:</p>
    <ol>
        <li>
            <p>Get your dataset. To do so, follow these steps:</p>
            <ul>
                <li>The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the <a href="http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php">USGS GeoJSON Feed</a> page and choose a dataset to visualize. The following image is an example screenshot of what appears when you visit this link:</li>
            </ul>
            <p><img src="https://static.bc-edx.com/data/dl-1-2/m15/lms/img/3-Data.jpg" alt="3-Data"></p>
            <ul>
                <li>When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization. The following image is a sampling of earthquake data in JSON format:</li>
            </ul>
            <p><img src="https://static.bc-edx.com/data/dl-1-2/m15/lms/img/4-JSON.jpg" alt="4-JSON"></p>
        </li>
        <li>
            <p>Import and visualize the data by doing the following:</p>
            <ul>
                <li>
                    <p>Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.</p>
                    <ul>
                        <li>
                            <p>Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.</p>
                        </li>
                        <li>
                            <p><strong>Hint:</strong> The depth of the earth can be found as the third coordinate for each earthquake.</p>
                        </li>
                    </ul>
                </li>
                <li>
                    <p>Include popups that provide additional information about the earthquake when its associated marker is clicked.</p>
                </li>
                <li>
                    <p>Create a legend that will provide context for your map data.</p>
                </li>
                <li>
                    <p>Your visualization should look something like the preceding map.</p>
                </li>
            </ul>
        </li>
    </ol>
    <hr>
    <h3>Part 2: Gather and Plot More Data (Optional with no extra points earning)</h3>
    <p>Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in this dataset and visualize it alongside your original data. Data on tectonic plates can be found at <a href="https://github.com/fraxen/tectonicplates">https://github.com/fraxen/tectonicplates</a>.</p>
    <p>This part is completely optional; you can complete this part as a way to challenge yourself and boost your new skills.</p>
    <p>The following image is an example screenshot of what you should produce:</p>
    <p><img src="https://static.bc-edx.com/data/dl-1-2/m15/lms/img/5-Advanced.jpg" alt="5-Advanced"></p>
    <p>Perform the following tasks:</p>
    <ul>
        <li>
            <p>Plot the tectonic plates dataset on the map in addition to the earthquakes.</p>
        </li>
        <li>
            <p>Add other base maps to choose from.</p>
        </li>
        <li>
            <p>Put each dataset into separate overlays that can be turned on and off independently.</p>
        </li>
        <li>
            <p>Add layer controls to your map.</p>
        </li>
    </ul>
    <h3>Requirements</h3>
    <p>These requirements apply only to "Part 1: Create the Earthquake Visualization" as "Part 2" is optional with no extra points earning.</p>
    <h4>Map (60 points)</h4>
    <ul>
        <li>
            <p>TileLayer loads without error (20 points)</p>
        </li>
        <li>
            <p>Connects to geojson API using D3 without error (20 points)</p>
        </li>
        <li>
            <p>Markers with size corresponding to earthquake magnitude (10 points)</p>
        </li>
        <li>
            <p>A legend showing the depth and their corresponding color (10 points)</p>
        </li>
    </ul>
    <h4>Data Points (40 points)</h4>
    <ul>
        <li>
            <p>Data points scale with magnitude level (10 points)</p>
        </li>
        <li>
            <p>Data points colors change with depth level (10 points)</p>
        </li>
        <li>
            <p>Each point has a tooltip with the Magnitude, the location and depth (10 points)</p>
        </li>
        <li>
            <p>All data points load in the correct locations (10 points)</p>
        </li>
    </ul>


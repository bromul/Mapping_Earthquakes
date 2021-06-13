# Mapping Earthquakes

## Overview 

Using [USGS data on earthquakes in the past 7 days](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson), this project sought to create a map that plots each earthquake event along with information on its magnitude and location. Additionally, with data from [this GitHub repository](https://github.com/fraxen/tectonicplates) we were able to plot the boundaries of the tectonic plates in relation to earthquake events. Finally, using more USGS data on [major earthquakes in the past 7 days](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson) (earthquakes whose magnitudes are 4.5+), we added a layer of only these events.


## Functionality

The created map has added functionality to enhance the user experience as they look into the earthquake data, including different map modes and toggleable map layers.

### Map Modes

Our map has 4 map modes the user can switch between:
- Satellite
- Streets
- Dark Mode
- Light Mode


### Map Layers 

There are 3 map layers the user can toggle on/off:
- Earthquakes
  - Plots all earthquakes from the past 7 days
- Tectonic Plates
  - Plots the boundaries of tectonic plates
- Major Earthquakes
  - Only plot earthquakes from the past 7 days whose magnitudes are 4.5 or greater

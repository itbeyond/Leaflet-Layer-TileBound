# Leaflet-Layer-TileBound
15th March 2016 - Updated to include native zoom level support
Specifically targetted to mobile offline use this option to specify
an additonal option as nativeZooms: [1,3,5,7,9,11,13], this will then show each of the native zooms
and scale the tiles for the missing zoom levels.

# Usage

````
var BoundLayer = new L.tileBoundLayer(URL, {
  showbounds: [[-8.9, 154.1], [-44, 112.8]],
  boundsTileUrl: '//site.com/images/OutsideBounds_256.png',
  nativeZooms: [2,4,6,8],
});
````


Adds TileBound Layer support to Leaflet by extending L.TileLayer

This allows you to set tile bounds and implement an out of bounds image.
Used for support of tile servers that only emit tiles in certain geographical bounds.

# Usage

````
var BoundLayer = new L.tileBoundLayer(URL, {
  showbounds: [[-8.9, 154.1], [-44, 112.8]],
  boundsTileUrl: '//site.com/images/OutsideBounds_256.png' 
});
````

showbounds: specify the geographical bounds of the tile server

boundsTileURL: the url to the image to render when outside of the speficied bounds in showbounds.

Added support for bower

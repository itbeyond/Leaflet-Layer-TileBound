# Leaflet-Layer-TileBound
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

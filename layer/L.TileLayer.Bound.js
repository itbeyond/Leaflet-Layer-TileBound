L.TileLayer.Bound = L.TileLayer.extend({
    options: { nativeZooms: []},

    getTileUrl: function (tilePoint) {
        if (this._shouldtileLoad(tilePoint)) {
            return L.Util.template(this._url, L.extend({
                r: L.Browser.retina ? '@2x' : '',
                s: this._getSubdomain(tilePoint),
                x: tilePoint.x,
                y: this.options.tms ? this._globalTileRange.max.y - tilePoint.y : tilePoint.y,
                z: this._getZoomForUrl()
            }, this.options));
        } else {
            return this.options.boundsTileUrl;
}
    },

    _shouldtileLoad: function (tilePoint) {
        if (this.options.showbounds) {
            this.options.showbounds = L.latLngBounds(this.options.showbounds);
            var tileSize = this.options.tileSize;
            if (this.options.detectRetina && L.Browser.retina && this.options.maxZoom > 0) { tileSize = tileSize * 2 }
            nwPoint = tilePoint.multiplyBy(tileSize);
            sePoint = nwPoint.add(new L.Point(tileSize, tileSize));
            nw = this._map.unproject(nwPoint, tilePoint.z);
            se = this._map.unproject(sePoint, tilePoint.z);
            bounds = new L.LatLngBounds([nw, se]);
 
            if (!this.options.showbounds.intersects(bounds)) {
                return false;
            }
        }
        return true;
    },
   _getTileSize: function () {
        var map = this._map,
		    zoom = map.getZoom() + this.options.zoomOffset,
		    zoomN = this.options.maxNativeZoom,
		    zoomsN = this.options.nativeZooms,
		    tileSize = this.options.tileSize;

        var nativeZoom = this._mapNativeZoom(zoom);

        return nativeZoom == zoom ? tileSize :
			Math.round(map.getZoomScale(zoom) / map.getZoomScale(nativeZoom) * tileSize);
    },
    _getZoomForUrl: function () {
		var options = this.options,
		    zoom = this._map.getZoom();

		if (options.zoomReverse) {
			zoom = options.maxZoom - zoom;
		}

		zoom += options.zoomOffset;

		return this._mapNativeZoom(zoom);
	},

	_mapNativeZoom: function (zoom) {
		var zoomN = this.options.maxNativeZoom,
		    zoomsN = this.options.nativeZooms,
		    result = zoom;

		if (zoomsN && zoomsN.length > 0) {
			var prevZoom = -1, minZoom = 100, i;
			for (i = 0; i < zoomsN.length; i++) {
				if( zoomsN[i] <= zoom && zoomsN[i] > prevZoom )
					prevZoom = zoomsN[i];
				if( zoomsN[i] < minZoom )
					minZoom = zoomsN[i];
			}
			result = prevZoom < 0 ? minZoom : prevZoom;
		} else if (zoomN && zoom > zoomN) {
			result = zoomN;
		}
		return result;
	}

});
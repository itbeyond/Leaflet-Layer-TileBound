L.TileLayer.Bound = L.TileLayer.extend({
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
            var tileSize = this.options.tileSize,

            nwPoint = tilePoint.multiplyBy(tileSize),
            sePoint = nwPoint.add(new L.Point(tileSize, tileSize));
            nw = this._map.unproject(nwPoint, tilePoint.z);
            se = this._map.unproject(sePoint, tilePoint.z);
            bounds = new L.LatLngBounds([nw, se]);
 
            if (!this.options.showbounds.intersects(bounds)) {
                return false;
            }
        }
        return true;
    }
});
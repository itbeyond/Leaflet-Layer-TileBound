L.TileLayer.Bound = L.TileLayer.extend({
    getTileUrl: function (tilePoint) {
        this._adjustTilePoint(tilePoint);
        if (this._shouldtileLoad(tilePoint)) {
            return L.Util.template(this._url, L.Util.extend({
                s: this._getSubdomain(tilePoint),
                z: this._getZoomForUrl(),
                x: tilePoint.x,
                y: tilePoint.y
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
            sePoint = nwPoint.add(new L.Point(tileSize, tileSize)),
            nw = this._map.unproject(nwPoint),
            se = this._map.unproject(sePoint),
            bounds = new L.LatLngBounds([nw, se]);

            if (!this.options.showbounds.intersects(bounds)) {
                return false;
            }
        }
        return true;
    }
});
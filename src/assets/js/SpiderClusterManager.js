
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="./Microsoft.Maps.d.ts"/>

var SpiderPushpin = (function (_super) {
    __extends(SpiderPushpin, _super);
    function SpiderPushpin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SpiderPushpin;
}(Microsoft.Maps.Pushpin));

var SpiderClusterManager = (function () {

    function SpiderClusterManager(map, data, options) {
        var _this = this;
        this._events = [];
        this._options = {
            circleSpiralSwitchover: 12,
            minCircleLength: 30,
            minSpiralAngleSeperation: 25,
            spiralDistanceFactor: 5,
            stickStyle: {
                strokeColor: 'black',
                strokeThickness: 2
            },
            stickHoverStyle: {
                strokeColor: 'red'
            },
            pinSelected: null,
            pinUnselected: null
        };
        this._map = map;
        this._data = data;
        this._clusterLayer = new Microsoft.Maps.ClusterLayer(data, options);
        map.layers.insert(this._clusterLayer);
        this._spiderLayer = new Microsoft.Maps.Layer();
        map.layers.insert(this._spiderLayer);
        this.setOptions(options);
        this._events.push(Microsoft.Maps.Events.addHandler(map, 'click', function (e) { _this.hideSpiderCluster(); }));
        this._events.push(Microsoft.Maps.Events.addHandler(map, 'viewchangestart', function (e) { _this.hideSpiderCluster(); }));
        this._events.push(Microsoft.Maps.Events.addHandler(this._clusterLayer, 'click', function (e) { _this._layerClickEvent(e); }));
        this._events.push(Microsoft.Maps.Events.addHandler(this._spiderLayer, 'mouseover', function (e) {
            if (e.primitive instanceof SpiderPushpin) {
                e.primitive.stick.setOptions(_this._options.stickHoverStyle);
            }
        }));
        this._events.push(Microsoft.Maps.Events.addHandler(this._spiderLayer, 'mouseout', function (e) {
            if (e.primitive instanceof SpiderPushpin) {
                e.primitive.stick.setOptions(_this._options.stickStyle);
            }
        }));
        this._events.push(Microsoft.Maps.Events.addHandler(this._spiderLayer, 'click', function (e) { _this._layerClickEvent(e); }));
    }

    SpiderClusterManager.prototype.dispose = function () {
        this._spiderLayer.clear();
        this._map.layers.remove(this._spiderLayer);
        this._spiderLayer = null;
        for (var i = 0, len = this._events.length; i < len; i++) {
            Microsoft.Maps.Events.removeHandler(this._events[i]);
        }
        this._events = null;
    };

    SpiderClusterManager.prototype.getClusterLayer = function () {
        return this._clusterLayer;
    };

    SpiderClusterManager.prototype.hideSpiderCluster = function () {
        //Show cluster and hide spider.
        if (this._currentCluster) {
            this._currentCluster.setOptions({ visible: true });
            this._spiderLayer.clear();
            this._currentCluster = null;
        }
    };

    SpiderClusterManager.prototype.setOptions = function (options) {
        this.hideSpiderCluster();
        if (options) {
            if (typeof options.circleSpiralSwitchover === 'number') {
                this._options.circleSpiralSwitchover = options.circleSpiralSwitchover;
            }
            if (typeof options.minSpiralAngleSeperation === 'number') {
                this._options.minSpiralAngleSeperation = options.minSpiralAngleSeperation;
            }
            if (typeof options.spiralDistanceFactor === 'number') {
                this._options.spiralDistanceFactor = options.spiralDistanceFactor;
            }
            if (typeof options.minCircleLength === 'number') {
                this._options.minCircleLength = options.minCircleLength;
            }
            if (options.stickHoverStyle) {
                this._options.stickHoverStyle = options.stickHoverStyle;
            }
            if (options.stickStyle) {
                this._options.stickStyle = options.stickStyle;
            }
            if (options.pinSelected) {
                this._options.pinSelected = options.pinSelected;
            }
            if (options.pinUnselected) {
                this._options.pinUnselected = options.pinUnselected;
            }
            if (typeof options.visible === 'boolean') {
                this._options.visible = options.visible;
            }
            this._clusterLayer.setOptions(options);
        }
    };

    SpiderClusterManager.prototype.showSpiderCluster = function (cluster) {
        this.hideSpiderCluster();
        this._currentCluster = cluster;
        if (cluster && cluster.containedPushpins) {
            //Create spider data.
            var pins = cluster.containedPushpins;
            var center = cluster.getLocation();
            var centerPoint = this._map.tryLocationToPixel(center, Microsoft.Maps.PixelReference.control);
            var point;
            var loc;
            var pin;
            var stick;
            var angle = 0;
            var makeSpiral = pins.length > this._options.circleSpiralSwitchover;
            var legPixelLength;
            var stepAngle;
            var stepLength;
            if (makeSpiral) {
                legPixelLength = this._options.minCircleLength / Math.PI;
                stepLength = 2 * Math.PI * this._options.spiralDistanceFactor;
            }
            else {
                stepAngle = 2 * Math.PI / pins.length;
                legPixelLength = (this._options.spiralDistanceFactor / stepAngle / Math.PI / 2) * pins.length;
                if (legPixelLength < this._options.minCircleLength) {
                    legPixelLength = this._options.minCircleLength;
                }
            }
            for (var i = 0, len = pins.length; i < len; i++) {

                if (makeSpiral) {
                    angle += this._options.minSpiralAngleSeperation / legPixelLength + i * 0.0005;
                    legPixelLength += stepLength / angle;
                }
                else {
                    angle = stepAngle * i;
                }
                point = new Microsoft.Maps.Point(centerPoint.x + legPixelLength * Math.cos(angle), centerPoint.y + legPixelLength * Math.sin(angle));
                loc = this._map.tryPixelToLocation(point, Microsoft.Maps.PixelReference.control);
                //Create stick to pin.
                stick = new Microsoft.Maps.Polyline([center, loc], this._options.stickStyle);
                this._spiderLayer.add(stick);
                //Create pin in spiral that contains same metadata as parent pin.
                pin = new SpiderPushpin(loc);
                pin.metadata = pins[i].metadata;
                pin.stick = stick;
                pin.parentPin = pins[i];
                pin.setOptions(this._getBasicPushpinOptions(pins[i]));
                this._spiderLayer.add(pin);
            }
            //Hide Cluster
            this._currentCluster.setOptions({ visible: false });
        }
    };

    SpiderClusterManager.prototype._layerClickEvent = function (e) {
        if (e.primitive instanceof Microsoft.Maps.ClusterPushpin) {
            if (this._options.pinUnselected) {
                this._options.pinUnselected();
            }
            this.showSpiderCluster(e.primitive);
        }
        else {
            if (this._options.pinSelected) {
                var pin = e.primitive;
                if (e.primitive instanceof SpiderPushpin) {
                    this._options.pinSelected(pin.parentPin, this._currentCluster);
                }
                else {
                    this._options.pinSelected(pin, null);
                }
            }
            this.hideSpiderCluster();
        }
    };


    SpiderClusterManager.prototype._getBasicPushpinOptions = function (pin) {
        return {
            anchor: pin.getAnchor(),
            color: pin.getColor(),
            icon: pin.getIcon(),
            roundClickableArea: pin.getRoundClickableArea(),
            text: pin.getText(),
            textOffset: pin.getTextOffset()
        };
    };
    return SpiderClusterManager;
}());

Microsoft.Maps.loadModule('Microsoft.Maps.Clustering', function () {
    Microsoft.Maps.moduleLoaded('SpiderClusterManager');
});

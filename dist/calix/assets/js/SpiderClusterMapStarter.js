var ww = $(window).width();
var map,
    infobox,
    spiderManager,
    icon,
    clusterLayer;
var markers = [
    {
        'name': 'Service Providers',
        "lat": "13.0827",
        "lng": "80.2707"
    },
    {
        'name': 'Service Providers',
        "lat": "13.0833",
        "lng": "81.2833"
    },
    {
        'name': 'Service Providers',
        "lat": "16.0833",
        "lng": "80.2833"
    },
    {
        'name': 'Service Providers',
        "lat": "15.0833",
        "lng": "10.2833"
    }
];



var markerData = [];
var pins = [];

// //console.log('Script Calling');

function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {
        zoom: 1
    });
    map.setView({
        mapTypeId: Microsoft.Maps.MapTypeId.road,

    });
    map.setOptions({
        showLogo: false,
        showDashboard: false,
        showMapTypeSelector: false,
        showCopyright: false,
        disableBirdseye: true,
        disableStreetside: false,
        showMapTypeSelector: false,
    });




    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });
    infobox.setMap(map);

    Microsoft.Maps.Events.addHandler(map, 'click', hideInfobox);
    Microsoft.Maps.Events.addHandler(map, 'viewchangestart', hideInfobox);
    Microsoft.Maps.MapTypeId('road')

    Microsoft.Maps.registerModule('SpiderClusterManager', 'assets/js/SpiderClusterManager.js');
    // Microsoft.Maps.registerModule('SpiderClusterManager', 'assets/js/newManager.js');

    Microsoft.Maps.loadModule(['SpiderClusterManager'], () => {

        //   var pins = Microsoft.Maps.TestDataGenerator.getPushpins(10000, map.getBounds());


        //   for (var i = 0, len = pins.length; i < len; i++) {
        //       pins[i].metadata = {
        //           value: Math.round(Math.random() * 100)

        //       };
        //   }


        var icon = {};
        for (var i = 0; i < 50; i++) {
            icon = createSpiderIcon('2'); //flag
            var clusterPin = new Microsoft.Maps.Pushpin((new Microsoft.Maps.Location(markers[0].lat, markers[0].lng)), icon);
            clusterPin.metadata = markers[0];
            pins.push(clusterPin);

        }


        spiderManager = new SpiderClusterManager(map, pins, {
            pinSelected: function (pin, cluster) {
                if (cluster) {
                    showInfobox(cluster.getLocation(), pin.metadata);
                } else {
                    showInfobox(pin.getLocation(), pin.metadata);
                }
            },
            pinUnselected: function () {
                hideInfobox();
            },
            clusteredPinCallback: createCustomClusteredPin,
            gridSize: 80
        });
    });


}
function createSpiderIcon(devType) {
    var outlineWidth = 7;
    var radius = 12;

    //Default cluster color is red.
    var fillColor = 'rgba(255, 40, 40, 0.9)';

    if (devType == '1') {
        fillColor = 'rgba(20, 180, 20, 0.9)';
    } else if (devType == '2') {
        fillColor = 'rgba(255, 210, 40, 0.9)';
    } else if (devType == '3') {
        fillColor = 'rgba(128, 0, 128, 0.9)';
    }

    strokeWidth = 3;
    strokeColor = 'rgba(255, 255, 255, 0.7)';

    //Create an SVG string of a circle with the specified radius and color.
    var svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="', (radius * 2),
        '" height="', (radius * 2), '" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"><g id="UrTavla"><circle cx="', radius, '" cy="', radius, '" r="',
        (radius - strokeWidth), '" stroke="', strokeColor, '" stroke-width="', strokeWidth, '" fill="', fillColor, '"/>    <text x="50%" y="50%" text-anchor="middle" fill="white" dy=".3em"></text></g></svg>'];

    //Create a pushpin from the SVG and anchor it to the center of the circle.
    var svgIcon = {
        icon: svg.join(''),
        anchor: new Microsoft.Maps.Point(radius, radius),
        //text: devCount.toString(),
    };
    return svgIcon;
}
function createCustomClusteredPin(cluster) {
    var minRadius = 15;
    var outlineWidth = 7;

    //Get the number of pushpins in the cluster
    var clusterSize = cluster.containedPushpins.length;


    //Calculate the radius of the cluster based on the number of pushpins in the cluster, using a logarithmic scale.
    var radius = Math.log(clusterSize) / Math.log(10) * 5 + minRadius;

    var textPos = radius;

    var image = 'assets/images/m1.png';
    if (clusterSize < 10) {
        image = 'assets/images/m1.png';
        textPos = radius;
    } else if (clusterSize < 100) {
        image = 'assets/images/m2.png';
        textPos = radius;
    } else if (clusterSize < 1000) {
        image = 'assets/images/m3.png';
        textPos = radius + 1;
    } else {
        image = 'assets/images/m5.png';
        textPos = radius + 9;
    }

    //Customize the clustered pushpin using the generated SVG and anchor on its center.
    cluster.setOptions({
        icon: image,
        anchor: new Microsoft.Maps.Point(radius, radius),
        textOffset: new Microsoft.Maps.Point(0, textPos)
    });
}

function showInfobox(location, metadata) {
    infobox.setOptions({
        location: location,
        title: 'Info',
        description: `<tr>
                            <th>Mac Address</th>
                            <td>:</td>
                            <td>44:65:7f:15:86:69</td>
                        </tr>
                        <tr>
                            <th>Model Number</th>
                            <td>:</td>
                            <td>GS2020E</td>
                        </tr>
                        <tr>
                            <th>Serial Number </th>
                            <td>:</td>
                            <td>391810003222</td>
                        </tr>
                        <tr>
                            <th>Firmware Version</th>
                            <td>:</td>
                            <td>20.1.501.197</td>
                        </tr>
                        <tr>
                            <th>Agent</th>
                            <td>:</td>
                            <td>-</td>
                        </tr>
                        ` ,
        visible: true
    });
}

function hideInfobox() {
    infobox.setOptions({ visible: false });
}

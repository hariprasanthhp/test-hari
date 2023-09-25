
var locked = false;
var map, infobox, clusterLayer, spiderManager;



function GetMap() {
	var apiKey = CONFIG.get("BING_API_KEY");
	map = new Microsoft.Maps.Map('#myMap', {
		credentials: apiKey,
		showDashboard: false
	});

	map.setView({
		center: new Microsoft.Maps.Location(59.5, 14.0),
		zoom: 2
	});

	//Create an infobox at the center of the map but don't show it.
	infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
		visible: false
	});


	//Assign the infobox to a map instance.
	infobox.setMap(map);

	if (locations.length) {
		var pushpinInfos = locations;
	} else {
		var pushpinInfos = [
			/*{
			  "macAddr": "44:65:7f:14:9f:92",
			  "lat": "13.0833",
				"lng": "80.2833"
			},
			{
			  "macAddr": "44:65:7f:14:99:9e",
			  "lat": "13.0833",
				"lng": "80.2833"
			},
			{
			  "macAddr": "cc:be:59:e0:42:1c",
			  "lat": "13.0833",
				"lng": "80.2833"
			},
			{
			  "macAddr": "44:65:7f:14:97:ee",
			  "lat": "13.0833",
				"lng": "80.2833"
			}*/
		];
	}


	var markerData = [];
	var pins = [];

	//Hide infobox when user clicks or moves the map.
	Microsoft.Maps.Events.addHandler(map, 'click', hideInfobox);
	Microsoft.Maps.Events.addHandler(map, 'viewchangestart', hideInfobox);
	//Register the spaider cluster manager module.
	Microsoft.Maps.registerModule('SpiderClusterManager', 'assets/js/newManager.js');
	//Load the clustering and spider clustering manager module.
	Microsoft.Maps.loadModule(['SpiderClusterManager'], function () {
		//pushpinInfos = morelocations;
		var icon = {};
		for (var j = 0; j < pushpinInfos.length; j++) {

			icon = createSpiderIcon('2'); //flag
			var clusterPin = new Microsoft.Maps.Pushpin((new Microsoft.Maps.Location(pushpinInfos[j].lat, pushpinInfos[j].lng)), icon);

			clusterPin.metadata = pushpinInfos[j];
			pins.push(clusterPin);

		}

		spiderManager = new SpiderClusterManager(map, pins, {
			pinSelected: function (pin, cluster) {
				if (cluster) {
					showInfobox(cluster.getLocation(), pin.metadata.macAddr);
				} else {
					if (typeof pin.getLocation != 'undefined') {
						showInfobox(pin.getLocation(), pin.metadata.macAddr);
					}

				}
			},
			pinUnselected: function () {
				hideInfobox();
			},
			clusteredPinCallback: createCustomClusteredPin,
			gridSize: 80
		});

		map.setView({
			center: new Microsoft.Maps.Location(lat, lng),
			zoom: 20
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

	var image = "app-assets/images/m1.png";
	if (clusterSize < 10) {
		image = "app-assets/images/m1.png";
		textPos = radius;
	} else if (clusterSize < 100) {
		image = "app-assets/images/m2.png";
		textPos = radius;
	} else if (clusterSize < 1000) {
		image = "app-assets/images/m3.png";
		textPos = radius + 1;
	} else {
		image = "app-assets/images/m5.png";
		textPos = radius + 9;
	}

	//Customize the clustered pushpin using the generated SVG and anchor on its center.
	cluster.setOptions({
		icon: image,
		anchor: new Microsoft.Maps.Point(radius, radius),
		textOffset: new Microsoft.Maps.Point(0, textPos)
	});
}

function showInfobox(location, macAddr) {

	/* check previous ajax finished or not */
	if (locked) {
		return;
	}

	locked = true;

	/* Load MAC data */

	$.ajax({
		headers: {
			'Authorization': 'Bearer ' + AUTH.getSPToken(),
		},

		url: CONFIG.get("SP_API_URL") + "/geo/telemetry/data",

		data: {
			macAddr: macAddr
		},

		type: "GET",

	})
		.done(function (json) {
			if (typeof json == 'object' && typeof json.result == 'object') {
				mdata = json.result;

				var agents = mdata.apps;
				var agentsArr = [];

				if (typeof agents == 'object' && agents) {
					for (var i = 0; i < agents.length; i++) {

						if (containers[agents[i].name]) {
							agentsArr.push(containers[agents[i].name]);
						} else {
							agentsArr.push(Capitalization(agents[i].name));
						}
					}
				}

				if (agentsArr.length) {
					var agentStr = agentsArr.join(", ");
				} else {
					var agentStr = "-";
				}

				agentInfo = "Mac Address : " + mdata.macAddr + "<br/>Model Number : " + mdata.modelNumber + "<br/>Serial Number : " + mdata.serialNumber + "<br/>Firmware Version : " + mdata.firmwareVersion + "<br/> Agent : " + agentStr;

				infobox.setOptions({
					location: location,
					/*title: agentInfo,*/
					visible: true,
					title: 'Info',
					description: agentInfo,
					width: 300
					/*htmlContent:agentInfo*/
				});

			}

		})

		.fail(function (xhr, status, errorThrown) {
			//alert( "Sorry, there was a problem!" );
			//console.log( "Error: " + errorThrown );
			//console.log( "Status: " + status );
			//console.dir( xhr );
		})
		.always(function (xhr, status) {
			locked = false;
		});

}
function hideInfobox() {
	infobox.setOptions({ visible: false });
}

function appendGridData() {
	var actionString;
	var html = "";
	var locationsLength = locations.length;

	if (!locationsLength) {
		return;
	}

	for (var i = 0; i < locationsLength; i++) {
		actionString = '<button type="button " class="btn button-styles" style="margin:0 0 0 0; float:none;" id="" onclick="getGeoTelemetryData(\'' + locations[i].macAddr + '\')">View </button>';

		html += '<tr id="' + locations[i].macAddr + '"><td>' + locations[i].macAddr + '</td><td>' + locations[i].lat + '</td><td>' + locations[i].lng + '</td><td>' + actionString + '</td></tr>';
	}

	$("#geo-telemetry-all-grid").html(html);
}

function getGeoTelemetryData(macAddr) {
	var data, agentInfo;
	if (locked) {
		return;
	}

	locked = true;

}
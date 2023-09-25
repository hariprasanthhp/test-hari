import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
/// <reference types="googlemaps"
@Component({
  selector: 'app-geographic-view',
  templateUrl: './geographic-view.component.html',
  styleUrls: ['./geographic-view.component.scss']
})
export class GeographicViewComponent implements OnInit, OnDestroy {
  language: any;
  languageSubject;
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  gestureHandling: any = 'cooperative';
  circle: any;
  cities: any = [{
    center: '',
    map: '',
    radius: 0,          // IN METERS.
    fillColor: '',
    fillOpacity: 0,
    strokeColor: '',
    strokeWeight: 0
  }];
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.cities = [{
      latitude: 48.7080,
      longitude: 44.5133,
      radius: 800000,          // IN METERS.
      fillColor: '#0000FF',
      fillOpacity: 0.3,
      strokeColor: '#FFF',
      strokeWeight: 0
    },
    {
      latitude: 9.1900,
      longitude: 75.0152,
      radius: 800000,          // IN METERS.
      fillColor: '#FF1493',
      fillOpacity: 0.3,
      strokeColor: '#FFF',
      strokeWeight: 0
    },
    {
      latitude: 38.951561,
      longitude: -92.328636,
      radius: 900000,          // IN METERS.
      fillColor: '#8B0000	',
      fillOpacity: 0.3,
      strokeColor: '#FFF',
      strokeWeight: 0
    },
    ]
  }
  

  ngAfterViewInit() {
    //this.mapInitializer();
  }

  mapInitializer(): void {
    // console.log("this.gmap.nativeElement", this.gmap.nativeElement);
    // this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    // for (let i = 0; i < this.cities.length; i++) {
    //   const element = this.cities[i];
    //   this.circle = new google.maps.Circle({
    //     center: new google.maps.LatLng(element.latitude, element.longitude),
    //     map: this.map,
    //     radius: element.radius,          // IN METERS.
    //     fillColor: element.fillColor,
    //     fillOpacity: element.fillOpacity,
    //     strokeColor: element.strokeColor,
    //     strokeWeight: element.strokeWeight         // DON'T SHOW CIRCLE BORDER.
    //   });
    // }

  }

  // loadMap() {

  //   this.map = new Microsoft.Maps.Map('#myMap',
  //     {
  //       credentials: environment.BING_API_KEY,
  //       zoom: 1,
  //     });

  //   this.map.setView({
  //     mapTypeId: Microsoft.Maps.MapTypeId.road,

  //   });
  //   this.map.setOptions({
  //     showLogo: false,
  //     showDashboard: false,
  //     showMapTypeSelector: false,
  //     showCopyright: false,
  //     disableBirdseye: true,
  //     disableStreetside: false,
  //   });
  //   this.infobox = new Microsoft.Maps.Infobox(this.map.getCenter(), {
  //     visible: false
  //   });
  //   this.infobox.setMap(this.map);

  //   Microsoft.Maps.registerModule('SpiderClusterManager', 'assets/js/SpiderClusterManager.js');


  //   Microsoft.Maps.loadModule(['SpiderClusterManager'], () => {
  //     let icon = {};
  //     let locationsLen = this.locations.length;

  //     for (let i = 0; i < locationsLen; i++) {
  //       icon = this.createSpiderIcon('2'); //flag
  //       let clusterPin = new Microsoft.Maps.Pushpin((new Microsoft.Maps.Location(this.locations[i]['lat'], this.locations[i]['lng'])), icon);
  //       clusterPin.metadata = this.locations[i];
  //       this.pins.push(clusterPin);

  //     }

  //     this.spiderManager = new SpiderClusterManager(this.map, this.pins, {

  //       pinSelected: (pin, cluster) => {
  //         //console.log(pin.metadata);
  //         if (cluster) {
  //           this.showInfobox(cluster.getLocation(), pin.metadata.macAddr);
  //         } else {
  //           this.showInfobox(pin.getLocation(), pin.metadata.macAddr);
  //         }

  //       },
  //       pinUnselected: () => {
  //         this.hideInfobox();
  //       },

  //       clusteredPinCallback: this.createCustomClusteredPin,
  //       gridSize: 80
  //     });

  //   });
  // }

  // hideInfobox() {
  //   if (this.infobox !== undefined) {
  //     this.infobox.setOptions({ visible: false });
  //   }
  // }

  // createCustomClusteredPin(cluster) {
  //   let minRadius = 15;
  //   let outlineWidth = 7;

  //   //Get the number of pushpins in the cluster
  //   let clusterSize = cluster.containedPushpins.length;

  //   //Calculate the radius of the cluster based on the number of pushpins in the cluster, using a logarithmic scale.
  //   let radius = Math.log(clusterSize) / Math.log(10) * 5 + minRadius;

  //   let textPos = radius;

  //   let image = 'assets/images/m1.png';
  //   if (clusterSize < 10) {
  //     image = 'assets/images/m1.png';
  //     textPos = radius;
  //   } else if (clusterSize < 100) {
  //     image = 'assets/images/m2.png';
  //     textPos = radius;
  //   } else if (clusterSize < 1000) {
  //     image = 'assets/images/m3.png';
  //     textPos = radius + 1;
  //   } else {
  //     image = 'assets/images/m5.png';
  //     textPos = radius + 9;
  //   }

  //   //Customize the clustered pushpin using the generated SVG and anchor on its center.
  //   cluster.setOptions({
  //     icon: image,
  //     anchor: new Microsoft.Maps.Point(radius, radius),
  //     textOffset: new Microsoft.Maps.Point(0, textPos)
  //   });
  // }
  // createSpiderIcon(devType) {
  //   let outlineWidth = 7;
  //   let radius = 12;
  //   //Default cluster color is red.
  //   let fillColor = 'rgba(255, 40, 40, 0.9)';

  //   if (devType == '1') {
  //     fillColor = 'rgba(20, 180, 20, 0.9)';
  //   } else if (devType == '2') {
  //     fillColor = 'rgba(255, 210, 40, 0.9)';
  //   } else if (devType == '3') {
  //     fillColor = 'rgba(128, 0, 128, 0.9)';
  //   }

  //   let strokeWidth = 3;
  //   let strokeColor = 'rgba(255, 255, 255, 0.7)';

  //   //Create an SVG string of a circle with the specified radius and color.
  //   let svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="', (radius * 2),
  //     '" height="', (radius * 2), '" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"><g id="UrTavla"><circle cx="', radius, '" cy="', radius, '" r="',
  //     (radius - strokeWidth), '" stroke="', strokeColor, '" stroke-width="', strokeWidth, '" fill="', fillColor, '"/>    <text x="50%" y="50%" text-anchor="middle" fill="white" dy=".3em"></text></g></svg>'];

  //   //Create a pushpin from the SVG and anchor it to the center of the circle.
  //   let svgIcon = {
  //     icon: svg.join(''),
  //     anchor: new Microsoft.Maps.Point(radius, radius),
  //     //text: devCount.toString(),
  //   };
  //   return svgIcon;
  // }
  // showInfobox(location: any, macAddr: string) {
  //   // this.loader = true;
  //   // this.service.getGeoTelemetryData(macAddr).subscribe((json: any) => {
  //   //   let data: any = json.result;
  //   //   let apps = [];

  //   //   if (data && data['apps']) {
  //   //     for (let i = 0; i < data.apps.length; i++) {
  //   //       if (this.containers[data.apps[i]['name']]) {
  //   //         apps.push(this.containers[data.apps[i]['name']]);
  //   //       } else {
  //   //         apps.push(data.apps[i]['name']);
  //   //       }

  //   //     }
  //   //   }
  //   //   data['appNames'] = apps.join(', ');
  //   //   this.loader = false;
  //   //   this.infobox.setOptions({
  //   //     location: location,
  //   //     title: 'Info',
  //   //     description: `Mac Address : ${data.macAddr}<br/>
  //   //                           Model Number : ${data.modelNumber}<br/>
  //   //                       Serial Number : ${data.serialNumber}<br/>
  //   //                      Firmware Version : ${data.firmwareVersion}<br/>
  //   //                       Agent : ${data.appNames}
  //   //                       ` ,
  //   //     visible: true,
  //   //     width: 300
  //   //   });
  //   // }, (err: any) => {
  //   //   this.loader = false;
  //   // });
  // }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }
}

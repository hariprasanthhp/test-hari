import { Component, NgModule, VERSION, OnInit, Renderer2, AfterViewInit, TemplateRef, ElementRef, ViewChild, OnDestroy, HostBinding } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser'
import { DashboardService } from "../service/dashboard.service";
import { environment } from "../../../environments/environment";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';


/// <reference path="types/MicrosoftMaps/CustomMapStyles.d.ts" />
/// <reference path="types/MicrosoftMaps/Microsoft.Maps.d.ts" />
/// <reference path="types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />

declare var SpiderClusterManager;

import * as $ from 'jquery';
import { Router } from '@angular/router';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('fullScreeenModal', { static: true }) private fullScreeenModal: TemplateRef<any>;
  modalRef: any;
  mapView = true;
  mapLoaded = false;
  deviceCount: number = 0;
  locations = [];
  tablePopupData: any;

  map: any;
  infobox: any;
  spiderManager: any;
  clusterLayer: any;
  markers = [];
  markerData = [];
  pins = [];

  containers: any = {
    'CIEP': 'ExperienceIQ',
    'CIES': 'ProtectIQ',
    'iothub': 'Smart Home Agent',
    'wifiapi': 'WiFi Demo',
    'vz_iothub': 'Usb IoT',
    'sthub': 'Samsung Smartthings',
    'alexa': 'Alexa'
  };

  loader: boolean = true;
  serviceSubscription: any;

  private index: number = 0;

  language: any;
  languageSubject;

  @HostBinding('class')
  classes = 'example-items-rows';
  foundationEnable: boolean;

  constructor(
    private renderer: Renderer2,
    private service: DashboardService,
    private dialogService: NgbModal,
    private translateService: TranslateService,
    public router: Router,
    private titleService:Title

  ) {

  }

  ngOnInit() {
    //this.addJsToElement(`https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=AtrOOyQ8ZIfDNt4DJgn6vI0MaMcwFylfGU35xKoS-9S4BwU2kawn8e3x-f762NXl`).onload

    //this.loadRecords();
    // this.titleService.setTitle('Geographic View - Systems - Deployment - Calix Cloud');
    let url = this.router.url;
    if (url.indexOf('foundation-geographic-view') == -1) {
      this.foundationEnable = false;
    }
    else {
      this.foundationEnable = true;
    }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }



  ngAfterViewInit() {
    this.loadRecords();

  }

  error = false;
  errorMsg: any = '';

  showError(errorMsg: any) {
    this.error = true;
    this.errorMsg = errorMsg;
  }

  hideError() {
    this.error = false;
    this.errorMsg = '';
  }


  loadRecords(): void {
    //this.loadMap();
    this.service.getData();
    this.serviceSubscription = this.service.result$.subscribe(
      (res: any) => {
        // if (typeof res == 'object' && res['error']) {
        //   this.showError(res['errorMsg']);
        //   this.loader = false;
        //   return;
        // }

        this.locations = res.locations ? res.locations : [];
        this.deviceCount = res.size ? res.size : 0;
        this.loadMap();
        this.loader = false;
      },
      (err: any) => {
        //console.log(err);
        this.loader = false;

      }
    );
  }


  loadMap() {

    this.map = new Microsoft.Maps.Map('#myMap',
      {
        credentials: environment.BING_API_KEY,
        zoom: 1,
      });

    this.map.setView({
      mapTypeId: Microsoft.Maps.MapTypeId.road,

    });
    this.map.setOptions({
      showLogo: false,
      showDashboard: false,
      showMapTypeSelector: false,
      showCopyright: false,
      disableBirdseye: true,
      disableStreetside: false,
    });
    this.infobox = new Microsoft.Maps.Infobox(this.map.getCenter(), {
      visible: false
    });
    this.infobox.setMap(this.map);

    Microsoft.Maps.registerModule('SpiderClusterManager', 'assets/js/SpiderClusterManager.js');


    Microsoft.Maps.loadModule(['SpiderClusterManager'], () => {
      let icon = {};
      let locationsLen = this.locations.length;

      for (let i = 0; i < locationsLen; i++) {
        icon = this.createSpiderIcon('2'); //flag
        let clusterPin = new Microsoft.Maps.Pushpin((new Microsoft.Maps.Location(this.locations[i]['lat'], this.locations[i]['lng'])), icon);
        clusterPin.metadata = this.locations[i];
        this.pins.push(clusterPin);

      }

      this.spiderManager = new SpiderClusterManager(this.map, this.pins, {

        pinSelected: (pin, cluster) => {
          //console.log(pin.metadata);
          if (cluster) {
            //this.map.setView({ center: cluster.getLocation(), zoom: 2 });
            this.showInfobox(cluster.getLocation(), pin.metadata.macAddr);

          } else {
            //this.map.setView({ center: pin.getLocation() });
            this.showInfobox(pin.getLocation(), pin.metadata.macAddr);
          }

        },
        pinUnselected: () => {
          this.hideInfobox();
        },

        clusteredPinCallback: this.createCustomClusteredPin,
        gridSize: 80
      });

    });



  }

  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.head, script);
    return script;
  }


  tableView() {
    this.mapView = false;
  }
  mapViewFunction() {
    this.mapView = true;
    // this.ngOnInit()
  }

  createSpiderIcon(devType) {
    let outlineWidth = 7;
    let radius = 12;
    //Default cluster color is red.
    let fillColor = 'rgba(255, 40, 40, 0.9)';

    if (devType == '1') {
      fillColor = 'rgba(20, 180, 20, 0.9)';
    } else if (devType == '2') {
      fillColor = 'rgba(255, 210, 40, 0.9)';
    } else if (devType == '3') {
      fillColor = 'rgba(128, 0, 128, 0.9)';
    }

    let strokeWidth = 3;
    let strokeColor = 'rgba(255, 255, 255, 0.7)';

    //Create an SVG string of a circle with the specified radius and color.
    let svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="', (radius * 2),
      '" height="', (radius * 2), '" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"><g id="UrTavla"><circle cx="', radius, '" cy="', radius, '" r="',
      (radius - strokeWidth), '" stroke="', strokeColor, '" stroke-width="', strokeWidth, '" fill="', fillColor, '"/>    <text x="50%" y="50%" text-anchor="middle" fill="white" dy=".3em"></text></g></svg>'];

    //Create a pushpin from the SVG and anchor it to the center of the circle.
    let svgIcon = {
      icon: svg.join(''),
      anchor: new Microsoft.Maps.Point(radius, radius),
      //text: devCount.toString(),
    };
    return svgIcon;
  }
  createCustomClusteredPin(cluster) {
    let minRadius = 15;
    let outlineWidth = 7;

    //Get the number of pushpins in the cluster
    let clusterSize = cluster.containedPushpins.length;

    //Calculate the radius of the cluster based on the number of pushpins in the cluster, using a logarithmic scale.
    let radius = Math.log(clusterSize) / Math.log(10) * 5 + minRadius;

    let textPos = radius;

    let image = 'assets/images/m1.png';
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

  showInfobox(location: any, macAddr: string) {
    this.loader = true;
    this.service.getGeoTelemetryData(macAddr).subscribe((json: any) => {
      let data: any = json.result;
      let apps = [];

      if (data && data['apps']) {
        for (let i = 0; i < data.apps.length; i++) {
          if (this.containers[data.apps[i]['name']]) {
            apps.push(this.containers[data.apps[i]['name']]);
          } else {
            apps.push(data.apps[i]['name']);
          }

        }
      }
      data['appNames'] = apps.join(', ');
      this.loader = false;

      this.infobox.setOptions({
        location: location,
        title: this.language['System Information'],
        description: `
        FSAN: ${data.fsanSerialNumber ? data.fsanSerialNumber : ''}<br/>
        ${this.language['MAC Address']} : ${data.macAddr}<br/>
        ${this.language.Model_Number} : ${data.modelNumber}<br/>
        ${this.language['Serial Number']} : ${data.serialNumber}
        <br/>
        ${this.language.Firmware_Version} : ${data.firmwareVersion !== undefined ? data.firmwareVersion : '' }
        <br/>
        
                          ` ,
        visible: true,
        width: 300
      });
    }, (err: any) => {
      this.loader = false;
    });

  }

  hideInfobox() {
    if (this.infobox !== undefined) {
      this.infobox.setOptions({ visible: false });
    }
    // this.map.setView({
    //   zoom: 0
    // });
  }

  open(macAddress: any, event) {
    //this.loader = true;
    console.log(event);
    let ele = document.getElementById(`${event.target.id}`) as HTMLButtonElement;
    ele.disabled = true;
    this.service.getGeoTelemetryData(macAddress).subscribe((data: any) => {
      ele.disabled = false;
      let apps = [];

      if (data && data['result'] && data['result'].apps) {
        for (let i = 0; i < data['result'].apps.length; i++) {
          if (this.containers[data['result'].apps[i]['name']]) {
            apps.push(this.containers[data['result'].apps[i]['name']]);
          } else {
            apps.push(data.apps[i]['name']);
          }

        }
      }

      this.tablePopupData = {
        appNames: apps.join(', '),
        ...data['result']
      };

      this.close();

      ////console.log(this.tablePopupData);
      this.loader = false;
      this.modalRef = this.dialogService.open(this.fullScreeenModal);
    }, (err: any) => {
      ele.disabled = false;
    });

  }

  close() {
    //console.log("close clicked");
    if (this.modalRef) {
      this.modalRef.close();
    }

  }

  ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
    this.service.undoService();
    this.languageSubject.unsubscribe();

  }

}


import { Component, OnInit, AfterViewInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import * as go from 'gojs';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-sample-topology',
  templateUrl: './sample-topology.component.html',
  styleUrls: ['./sample-topology.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SampleTopologyComponent implements OnInit {

  // ngOnInit() {
  //   this.loadDiagram();
  //   this.loadDiagram1();
  //   this.loadDiagram2();
  // }

  // loadDiagram(): any {
  //   var $ = go.GraphObject.make;
  //   var myDiagram =
  //     $(go.Diagram, "myDiagramDiv",
  //       { // enable Ctrl-Z to undo and Ctrl-Y to redo
  //         "undoManager.isEnabled": true
  //       });

  //   var myModel = $(go.Model);
  //   // for each object in this Array, the Diagram creates a Node to represent it
  //   myModel.nodeDataArray = [
  //     { key: "Alpha" },
  //     { key: "Beta" },
  //     { key: "Gamma" }
  //   ];
  //   myDiagram.model = myModel;
  // }

  // loadDiagram1(): any {
  //   var $ = go.GraphObject.make;
  //   var myDiagram =
  //     $(go.Diagram, "myDiagramDiv1",
  //       { // enable Ctrl-Z to undo and Ctrl-Y to redo
  //         "undoManager.isEnabled": true
  //       });

  //   // define a simple Node template
  //   myDiagram.nodeTemplate =
  //     $(go.Node, "Horizontal",
  //       // the entire node will have a light-blue background
  //       { background: "#44CCFF" },
  //       $(go.Picture,
  //         // Pictures should normally have an explicit width and height.
  //         // This picture has a red background, only visible when there is no source set
  //         // or when the image is partially transparent.
  //         { margin: 10, width: 50, height: 50, background: "red" },
  //         // Picture.source is data bound to the "source" attribute of the model data
  //         new go.Binding("source")),
  //       $(go.TextBlock,
  //         "Default Text",  // the initial value for TextBlock.text
  //         // some room around the text, a larger font, and a white stroke:
  //         { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
  //         // TextBlock.text is data bound to the "name" property of the model data
  //         new go.Binding("text", "name"))
  //     );

  //   var model = $(go.Model);
  //   model.nodeDataArray =
  //     [ // note that each node data object holds whatever properties it needs;
  //       // for this app we add the "name" and "source" properties
  //       { name: "Don Meow", source: "cat1.png" },
  //       { name: "Copricat", source: "cat2.png" },
  //       { name: "Demeter", source: "cat3.png" },
  //       { /* Empty node data */ }
  //     ];
  //   myDiagram.model = model;
  // }

  // loadDiagram2() {
  //   var $ = go.GraphObject.make;

  //   var myDiagram =
  //     $(go.Diagram, "myDiagramDiv2",
  //       {
  //         "undoManager.isEnabled": true,
  //         layout: $(go.TreeLayout,
  //           { angle: 90, layerSpacing: 35 })
  //       });

  //   // the template we defined earlier
  //   myDiagram.nodeTemplate =
  //     $(go.Node, "Horizontal",
  //       { background: "#44CCFF" },
  //       $(go.Picture,
  //         { margin: 10, width: 50, height: 50, background: "red" },
  //         new go.Binding("source")),
  //       $(go.TextBlock, "Default Text",
  //         { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
  //         new go.Binding("text", "name"))
  //     );

  //   // define a Link template that routes orthogonally, with no arrowhead
  //   myDiagram.linkTemplate =
  //     $(go.Link,
  //       { routing: go.Link.Orthogonal, corner: 5 },
  //       $(go.Shape, // the link's path shape
  //         { strokeWidth: 3, stroke: "#555" }));

  //   var model = $(go.TreeModel);
  //   model.nodeDataArray =
  //     [
  //       { key: "1", name: "Don Meow", source: "cat1.png" },
  //       { key: "2", parent: "1", name: "Demeter", source: "cat2.png" },
  //       { key: "3", parent: "1", name: "Copricat", source: "cat3.png" },
  //       { key: "4", parent: "3", name: "Jellylorum", source: "cat4.png" },
  //       { key: "5", parent: "3", name: "Alonzo", source: "cat5.png" },
  //       { key: "6", parent: "2", name: "Munkustrap", source: "cat6.png" }
  //     ];
  //   myDiagram.model = model;
  // }











  lastDeviceClickData: any = {};
  uniqueDevices: any = [];
  uniqueHostnames: any = [];
  clientData: any = {};
  twoHrsCategory = [

  ]
  twoHrsData = [


  ];
  sixHrsCategory = [
    { label: "6hrs ago" },
    { label: "5hrs 30mins ago" },
    { label: "5hrs ago" },
    { label: "4hrs 30mins ago" },
    { label: "4hrs ago" },
    { label: "3hrs 30mins ago" },
    { label: "3hrs ago" },
    { label: "2hrs 30mins ago" },
    { label: "2hrs ago" },
    { label: "1hrs 30mins ago" },
    { label: "1hrs ago" },
    { label: "30mins ago" },
  ];
  sixHrsData = []
  oneDayCategory = [
    { label: "24hrs ago" },
    { label: "22hrs ago" },
    { label: "20hrs ago" },
    { label: "18hrs ago" },
    { label: "16hrs ago" },
    { label: "14hrs ago" },
    { label: "12hrs ago" },
    { label: "10hrs ago" },
    { label: "8hrs ago" },
    { label: "6hrs ago" },
    { label: "4hrs ago" },
    { label: "2hrs ago" },
  ]
  oneDayData = []
  weekCategory = [
    { label: "7 days ago" },
    { label: "6 days ago" },
    { label: "5 days ago" },
    { label: "4 days ago" },
    { label: "3 days ago" },
    { label: "2 days ago" },
    { label: "1 day ago" },
  ]
  data = {
    chart: {

      showhovereffect: "1",
      drawcrossline: "1",
      plottooltext: "<b>$dataValue</b> on $seriesName",
      theme: "fusion"
    },
    categories: [
      {
        category: this.twoHrsCategory
      }
    ],
    dataset: this.twoHrsData
  };
  width = '100%';
  height = 400;
  type = "msline";
  dataFormat = "json";
  dataSource = this.data;

  menuActive = '2 Hours';
  chartMenu = [
    { id: 1, value: '2 Hours' },
    { id: 2, value: '6 Hours' },
    { id: 3, value: '1 Day' },
    { id: 4, value: '1 Week' },
  ]

  closeDevicesArray = [];
  mediumDevicesArray = [];
  farDevicesArray = [];
  dataArray = [];
  deviceDataWithAll = [];

  closeDevicesSplit: boolean = false;
  mediumDevicesSplit: boolean = false;
  farDevicesSplit: boolean = false;

  //nodeDataArray = [];

  selectedDeviceType: string;
  selectedHostName: string;
  selectedMacAddress: string;
  allObject = {
    type: 'All', key4: 'All', key6: 'All'
  };
  routerTooltip = `  IP Address: 192.168.1.65,
  Device: Calix Router,
  Connection: connected`
  accesPointTooltip = `IP Address: 192.168.1.1,
  Device:AccessPoint 1,
  Connection: connected`
  isActive1 = true;
  isActive2 = false;
  isSingleClick: Boolean = true;
  clickCount = 0;

  title = 'app';

  preventSingleClick = false;
  timer: any;
  delay: Number;
  public dblcount: any = 0;
  public snglcount: any = 0;
  showChart: boolean = false;

  apInformtion: string = '';


  // historyShow3: boolean = false;


  //@ViewChild(DiagramComponent, { static: false }) diagramComponent: DiagramComponent;


  constructor(private http: HttpClient, private route: ActivatedRoute, private spinner: NgxSpinnerService) {

    go.Diagram.licenseKey = "73f04ee5b03c08c702d90776423d6af919a17564cf814aa4090413f6eb0d6b06329dee7159d08ec9d4aa4dfa137ec989ddc26f79c74a523fe633d7d947e283f0b13774e71409458bf31136c5ccaa2ca1ae2870e0d2b676a1db678eede9";



  }

  //@ViewChild('myDiag', { static: false }) myDiag: DiagramComponent;
  routerMac: any;
  myDiagramDiv1: any;
  myDiagramDiv2: any;
  card2: any;
  button1: any;
  VisitedPage: string = '';
  routerKey: string = '';

  nextVisitedPage: string = '';
  nextRouterKey: string = '';
  nextTabledataUniqueId: string = '';
  currentPage: string = 'main';
  dblClkFired: boolean = false;

  public $ = go.GraphObject.make;

  topologyData: any = {
    phy: [],
    legacy: [],
    clientWifi: []
  };

  topologyView: boolean = true;
  tplgyType: string = '';
  tableView: boolean = false;
  legacyChecked: boolean = false;
  phyChecked: boolean = false;
  signalChecked: boolean = false;
  filterEnabled: boolean = false;
  successFilterEnabled: boolean = false;
  deviceDatas: any = [];
  deviceDatasUpdated: any = [];

  backBtnDisabled: boolean = true;
  accessPointId: any = '';
  nodeDataArray: any = [];
  linkDataArray: any = [];

  hostnameFilterData: any = [];


  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: false,
    columns: {
      accessPoint: {
        filter: false,
        title: 'Access Point'
      },
      image_url: {
        title: 'DeviceType',
        type: 'html',
        valuePrepareFunction: (images: any) => {
          // console.log(images);
          // console.log(typeof images);
          let width = "50%";
          // let margin = "";
          // if (images.indexOf('phone') !== -1) {
          //   width = "30%";

          //   margin = "10px;"
          // }
          return `<img width="${width}" src="${images}"/>`
        },
        width: '50px',
        height: '10px'
      },
      hostname: {
        title: 'HostName',
        filter: {
          type: 'list',
          config: {
            selectText: 'All',
          },
        },
      },
      'fingerprint-model': {
        filter: false,
        title: 'Model'
      },
      'fingerpint-vendor': {
        filter: false,
        title: 'Vendor'
      },
      'ip-address': {
        filter: false,
        title: 'Ip address'
      },
      // 'wifi-mode': {
      //   filter: false,
      //   title: 'Mode'
      // },
      ssid: {
        filter: false,
        title: 'SSID'
      },
      // key9: {
      //   filter: false,
      //   title: 'US PHY Rate'
      // },
      // 'signal-strength': {
      //   filter: false,
      //   title: 'SNR'
      // },

      radio: {
        filter: false,
        title: 'Radio'
      },
      siganl_image: {
        title: 'Signal',
        filter: false,
        type: 'html',
        valuePrepareFunction: (images) => {
          return `<img width="100%" src="${images.url}" title="${images['signal-strength']}"/>`
        },
        width: '50px',
        height: '50px'
      },
      'DS-phy-rate': {
        filter: false,
        title: 'DS PHY Rate'
      },
      'US-phy-rate': {
        filter: false,
        title: 'US PHY Rate'
      },
      'DS-packet-drops': {
        filter: false,
        title: 'Packets Dropped DS'
      },
      'client-efficiency-score': {
        filter: false,
        title: 'Wi-Fi Score Current (Average)'
      },
      'client-note': {
        filter: false,
        title: 'Reason for failure'
      }
    }
  };

  images: any = ['assets/images/tv-all-clear.png', 'assets/images/printer-clear.png', 'assets/images/ipad-all-clear.png', 'assets/images/laptop-all-clear.png', 'assets/images/phone-all-clear-state.png', 'assets/images/camera-clear.png', 'assets/images/audiobox-clear.png', 'assets/images/gaming-clear.png', 'assets/images/ipad-all-clear.png', 'assets/images/laptop-all-clear.png'];

  imagesObj: any = {
    'Television': 'assets/images/tv-all-clear.png',
    'Tablet': 'assets/images/ipad-all-clear.png',
    'Phone': 'assets/images/phone-all-clear-state.png',
    'Camera': 'assets/images/camera-clear.png',
    'Media Player': 'assets/images/audiobox-clear.png',
    'Console': 'assets/images/gaming-clear.png',
    'Wi-Fi IoT': 'assets/images/iot.png',
    'Wi Fi IoT': 'assets/images/iot.png',
    'Wifi IoT': 'assets/images/iot.png',
    'Computer': 'assets/images/computer.png',
    'Printer': 'assets/images/printer-clear.png',
    'Network': 'assets/images/network.png', // what is network
    'Voip': 'assets/images/voip.png', // what is Voip
    'Fridge': 'assets/images/iot.png',

    'Television-red': 'assets/images/tv-critical-issues.png',
    'Tablet-red': 'assets/images/ipad-critical.png',
    'Phone-red': 'assets/images/phone-critical-state.png',
    'Camera-red': 'assets/images/camera-critical.png',
    'Media Player-red': 'assets/images/audiobox-critical.png',
    'Console-red': 'assets/images/gaming-critical.png',
    'Wi-Fi IoT-red': 'assets/images/iot-critical.png',
    'Wi Fi IoT-red': 'assets/images/iot-critical.png',
    'Wifi IoT-red': 'assets/images/iot-critical.png',
    'Computer-red': 'assets/images/computer-critical.png',
    'Printer-red': 'assets/images/printer-critical.png',
    'Network-red': 'assets/images/network-critical.png', // what is network
    'Voip-red': 'assets/images/voip-critical.png', // what is Voip
    'Fridge-red': 'assets/images/iot-critical.png',
    'iot-red': 'assets/images/iot-critical.png',

  };

  ssid: string = '';
  radio: string = '';
  ethOrAPType: string = '';
  ethOrAPImageUrl: string = '';

  ngOnInit(): void {
    //this.loadfirst();

    document.getElementById("myDiagramDiv2").style.display = "none";
    //document.getElementById("card2").style.display = "none";
    //document.getElementById("button1").style.display = "none";
    this.backBtnDisabled = true;

    this.route.queryParams.subscribe((params: any) => {
      this.routerMac = params['routerMac'];
      this.getData();
      //this.getAPData(this.routerMac);
      this.getAllClientsData(this.routerMac);

    });

  }

  ngAfterViewInit(): void {

  }
  dataGenerator() {
    this.sixHrsData = [];
    this.oneDayData = [];
    let series1: any = {};
    let series2: any = {};
    series1.data = [];
    series2.data = [];
    for (let i = 0; i <= 12; i++) {
      let obj1 = { value: Math.floor(Math.random() * 100) }
      let obj2 = { value: Math.floor(Math.random() * 100) }
      series1.data.push(obj1);
      series2.data.push(obj2)
    }
    // this.sixHrsData.push(series1);
    // this.sixHrsData.push(series2);
    // this.oneDayData.push(series1);
    // this.oneDayData.push(series2);
  }
  chartTimeChange(data) {
    this.menuActive = data;

    if (data == '2 Hours') {
      this.data.categories = [
        { category: this.twoHrsCategory }
      ];
      this.data.dataset = this.dataForUploadDownLoadChart;

    } else if (data == '6 Hours') {
      this.data.categories = [
        { category: this.sixHrsCategory }
      ];
      this.dataGenerator()
      this.data.dataset = this.sixHrsData;
    } else if (data == '1 Day') {
      this.data.categories = [
        { category: this.oneDayCategory }
      ];
      this.dataGenerator()
      this.data.dataset = this.oneDayData;
    } else if (data == '1 Week') {
      this.data.categories = [
        { category: this.weekCategory }
      ];
      this.data.dataset = [];
    }
  }
  hideDDMenu() {
    if (document.getElementById('myDropdown') && document.getElementById('myDropdown').classList.contains('show')) {
      document.getElementById('myDropdown').classList.remove('show')
    }
  }
  rangeFilter(data) {
    this.closeDevicesSplit = false;
    this.mediumDevicesSplit = false;
    this.farDevicesSplit = false;
    this.closeDevicesArray = [];
    this.mediumDevicesArray = [];
    this.farDevicesArray = [];
    data.forEach(el => {
      if (el['client-distance'] == 'close') {
        this.closeDevicesArray.push(el);
      } else if (el['client-distance'] == 'medium') {
        this.mediumDevicesArray.push(el);
      } else if (el['client-distance'] == 'far') {
        this.farDevicesArray.push(el);
      }
    });

    if (this.closeDevicesArray.length > 4) {
      this.closeDevicesSplit = true;
    }

    if (this.mediumDevicesArray.length > 4) {
      this.mediumDevicesSplit = true;
    }

    if (this.farDevicesArray.length > 4) {
      this.farDevicesSplit = true;
    }

  }
  deviceTypeChange(data) {
    console.log(data);
    if (data != undefined) {
      this.selectedDeviceType = data['client-type'];
    } else {
      this.selectedDeviceType = 'All'
    }
    if (this.selectedDeviceType == 'All') {

      this.rangeFilter(this.deviceDataWithAll);
    } else {
      let newArray = this.deviceDataWithAll.filter(el => {
        return el['client-type'] == this.selectedDeviceType;
      })
      this.rangeFilter(newArray);
    }
    this.selectedHostName = undefined;
    this.selectedMacAddress = undefined;

  }
  hostNameChange(data) {
    console.log(data);
    if (data != undefined) {
      this.selectedHostName = data.hostname;
    } else {
      this.selectedHostName = 'All'
    }
    if (this.selectedHostName == 'All') {
      this.rangeFilter(this.deviceDataWithAll);
    } else {
      let newArray = this.deviceDataWithAll.filter(el => {
        return el.hostname == this.selectedHostName;
      })
      this.rangeFilter(newArray);
    }
    this.selectedDeviceType = undefined;
    this.selectedMacAddress = undefined;

  }
  macAddressChange(data) {
    console.log(data);
    if (data != undefined) {
      this.selectedMacAddress = data.key6;
    } else {
      this.selectedMacAddress = 'All'
    }

    if (this.selectedMacAddress == 'All') {
      this.rangeFilter(this.deviceDataWithAll);
    } else {
      let newArray = this.deviceDataWithAll.filter(el => {
        return el.key6 == this.selectedMacAddress;
      })
      this.rangeFilter(newArray);
    }
    this.selectedHostName = undefined;
    this.selectedDeviceType = undefined;

  }

  imageDblClick(data) {
    //this.showChart = true;
    console.log(data);
    document.getElementById("myDiagramDiv2").style.display = "none";
    document.getElementById("card2").style.display = "block";
    this.topologyView = false;
    this.tableView = true;
    this.currentPage = 'table';
    this.VisitedPage = 'middle';
    this.nextVisitedPage = 'table';
    this.deviceDatasUpdated = [];
    if (data == 0) {
      // this.deviceDatasUpdated = this.deviceDatas;
    } else {
      this.deviceDatasUpdated.push(data);
    }

    this.clientData = data;

    this.getClientData(data.mac);

  }



  rangeDeviceFilter(key) {
    if (key == 0) {
      this.rangeFilter(this.deviceDatas);
      this.deviceDataWithAll = this.deviceDatas;
      this.deviceDataWithAll.unshift(this.allObject);
    } else {
      this.dataArray = this.deviceDatas.filter(el => {
        return el.key1 == key;
      })
      this.rangeFilter(this.dataArray);
      this.deviceDataWithAll = this.dataArray;
      this.deviceDataWithAll.unshift(this.allObject);
    }


  }

  customSort(a, b) {
    if ((a['signal-strength-test-result'] === 'PASS' && b['signal-strength-test-result'] === 'PASS') && (a['legacy-device-test-result'] === 'PASS' && b['legacy-device-test-result'] === 'PASS')) {
      return 1;
    }

    return -1;
  }

  diagramRedrawInt: any;
  loadfirst() {
    this.currentPage = 'main';
    let $ = this.$;
    var colors = {
      blue: "#2a6dc0",
      orange: "#ea2857",
      green: "#1cc1bc",
      gray: "#5b5b5b",
      white: "#F5F5F5"
    }

    if (myDiagram) {
      myDiagram.div = null;
    }

    var myDiagram =
      $(
        go.Diagram, "myDiagramDiv1",

        {
          initialContentAlignment: go.Spot.Center, // center Diagram contents
          "undoManager.isEnabled": true,
          //initialContentAlignment: go.Spot.Center,
          initialAutoScale: go.Diagram.UniformToFill,
          layout: $(go.LayeredDigraphLayout, //LayeredDigraphLayout
            {
              direction: 0,
              layerSpacing: 150,
              columnSpacing: 30,
              linkSpacing: 10,


            }),

          // "undoManager.isEnabled": true
          // // enable Ctrl-Z to undo and Ctrl-Y to redo
        });

    myDiagram.toolManager.toolTipDuration = 60000;
    myDiagram.toolManager.hoverDelay = 500;

    function linkInfo4(d) {  // Tooltip info for a link data object
      return `${d.name}`;
    }

    var addNodeAndLink = (e, obj) => {
      this.dblClkFired = false;
      this.accessPointId = obj.part.data.accessPointId;
      //this.loadTabledata();
      console.log(obj.part.data);
      this.VisitedPage = 'main';
      this.routerKey = obj.part.data.key;
      //new code
      //this.second(obj.part.data.key, true);
      this.getAPData('obj.part.data.key', true, '');

      alert('clicked');
    }
    var arrowheads = go.Shape.getArrowheadGeometries().toKeySet().toArray();

    var nodeHoverAdornment =
      $(go.Adornment, "Spot",
        {
          background: "transparent",
          // hide the Adornment when the mouse leaves it
          mouseLeave: function (e, obj) {
            let ad: any = obj.part;
            ad.adornedPart.removeAdornment("mouseHover");
          }
        },
        $(go.Placeholder,
          {
            background: "transparent",  // to allow this Placeholder to be "seen" by mouse events
            isActionable: true,  // needed because this is in a temporary Layer
            click: function (e, obj) {
              var node = obj.part.adornedPart;
              node.diagram.select(node);
            }
          }),
        $("Button",
          { alignment: go.Spot.TopCenter, alignmentFocus: go.Spot.TopCenter },
          {
            click: (e, obj) => {
              this.dblClkFired = false;
              this.accessPointId = obj.part.data.accessPointId;
              console.log(obj.part.data);
              this.VisitedPage = 'main';
              this.routerKey = obj.part.data.key;
              this.getAPData(obj.part.data.key, true, '');
            }
          },
          $(go.TextBlock, "+"))
      );


    myDiagram.nodeTemplate =
      $(go.Node, "Auto",
        //for circle numbers
        {
          background: "white",
          fromSpot: go.Spot.RightSide,
          toSpot: go.Spot.LeftSide,
          selectionAdorned: false
        },

        $(go.Panel, "Horizontal",  // the row of status indicators

        ),

        $(go.Picture,

          { width: 70, height: 70 },
          new go.Binding("source", "source", function (image) {
            return image ? image : '';
          }),
          new go.Binding("element", "source-video", function (video) {
            return video ? video : '';
          })
        ),




        $(go.Panel, "Vertical",

          new go.Binding("margin", "label", function (l) { return l ? new go.Margin(110, 0, 0, 0) : '' }),
          new go.Binding("background", "label", function (l) { return l ? '#eaeaea' : '' }),
          new go.Binding("padding", "label", function (l) { return l ? 10 : '' }),

          $(go.TextBlock,
            {
              margin: new go.Margin(0, 0, 0, 0),
              maxSize: new go.Size(100, 30),
              isMultiline: false,
              // click: () => {
              //   alert('label clicked');
              // }
            },
            new go.Binding("text", "label", function (l) { return l ? l : '' })),
        ),


        $(go.Panel, "Auto",

          new go.Binding("margin", "label", function (l) { return l ? new go.Margin(-65, 0, 0, 50) : '' }),
          new go.Binding("cursor", "label", function (l) { return l ? 'pointer' : '' }),

          // decorations:
          $(go.Shape,
            "Circle",

            {
              width: 24, height: 24, fill: 'white', stroke: "green", strokeWidth: 2, margin: 5, visible: false,
              click: (e, obj) => {
                console.log(obj.part.data);
                if (obj.part.data.key === 'internet') {
                  return;
                }

                if (obj.part.data.key === 'ethernet') {
                  return;
                }

                this.lastDeviceClickData = obj.part.data;

                this.apInformtion = obj.part.data['rg-tech-notes'];

                this.accessPointId = obj.part.data.accessPointId;
                this.VisitedPage = 'main';
                document.getElementById("myDiagramDiv1").style.display = "none";
                document.getElementById("myDiagramDiv2").style.display = "none";
                document.getElementById("card2").style.display = "none";
                //document.getElementById("button1").style.display = "block";
                this.backBtnDisabled = false;
                this.dblClkFired = true;
                // new code
                //this.showTableView('', true);
                this.getAPData(obj.part.data.key, '', true);

                this.showChart = false;
                this.phyChecked = obj.part.data.customFilterObj.phyChecked;
                this.legacyChecked = obj.part.data.customFilterObj.legacyChecked;
                this.successFilterEnabled = true;
              }
            },
            new go.Binding("visible", "passed-clients", function (l) { return l ? l : false }),
          ),

          $(go.TextBlock,
            {
              click: (e, obj) => {

                console.log(obj.part.data);
                if (obj.part.data.key === 'internet') {
                  return;
                }

                if (obj.part.data.key === 'ethernet') {
                  return;
                }

                this.lastDeviceClickData = obj.part.data;

                this.apInformtion = obj.part.data['rg-tech-notes'];

                this.accessPointId = obj.part.data.accessPointId;
                this.VisitedPage = 'main';
                document.getElementById("myDiagramDiv1").style.display = "none";
                document.getElementById("myDiagramDiv2").style.display = "none";
                document.getElementById("card2").style.display = "none";
                //document.getElementById("button1").style.display = "block";
                this.backBtnDisabled = false;
                this.dblClkFired = true;
                // new code
                //this.showTableView('', true);
                this.getAPData(obj.part.data.key, '', true);

                this.showChart = false;
                this.phyChecked = obj.part.data.customFilterObj.phyChecked;
                this.legacyChecked = obj.part.data.customFilterObj.legacyChecked;
                this.successFilterEnabled = true;
              },
              margin: 5
            },
            new go.Binding("text", "passed-clients", function (l) { return l ? l : '' }))

        ),

        $(go.Panel, "Auto",

          new go.Binding("margin", "label", function (l) { return l ? new go.Margin(-45, 0, 0, 90) : '' }),
          new go.Binding("cursor", "label", function (l) { return l ? 'pointer' : '' }),

          // decorations:
          $(go.Shape,
            "Circle",

            {
              width: 24, height: 24, fill: 'white', stroke: "orange", strokeWidth: 2, margin: 5, visible: false,
              click: (e, obj) => {
                console.log(obj.part.data);
                if (obj.part.data.key === 'internet') {
                  return;
                }

                if (obj.part.data.key === 'ethernet') {
                  return;
                }

                this.lastDeviceClickData = obj.part.data;

                this.apInformtion = obj.part.data['ap-tech-note'];

                this.accessPointId = obj.part.data.accessPointId;
                this.VisitedPage = 'main';
                document.getElementById("myDiagramDiv1").style.display = "none";
                document.getElementById("myDiagramDiv2").style.display = "none";
                document.getElementById("card2").style.display = "none";
                //document.getElementById("button1").style.display = "block";
                this.backBtnDisabled = false;
                this.dblClkFired = true;
                // new code
                //this.showTableView('', true);
                this.getAPData(obj.part.data.key, '', true);

                this.showChart = false;
                this.phyChecked = obj.part.data.customFilterObj.phyChecked;
                this.legacyChecked = obj.part.data.customFilterObj.legacyChecked;
                this.filterEnabled = true;
              },
              toolTip:
                $("ToolTip",
                  {
                    "Border.stroke": colors["blue"], "Border.strokeWidth": 1
                  },
                  $(go.TextBlock, "Arrowheads", { margin: 4 }, { font: "bold 12px sans-serif" },
                    new go.Binding("text", "failedClientsNote")))
            },
            new go.Binding("visible", "failed-clients", function (l) { return l ? l : false }),
          ),

          $(go.TextBlock,
            {
              click: (e, obj) => {
                console.log(obj.part.data);
                if (obj.part.data.key === 'internet') {
                  return;
                }

                if (obj.part.data.key === 'ethernet') {
                  return;
                }

                this.lastDeviceClickData = obj.part.data;

                this.apInformtion = obj.part.data['ap-tech-note'];

                this.accessPointId = obj.part.data.accessPointId;
                this.VisitedPage = 'main';
                document.getElementById("myDiagramDiv1").style.display = "none";
                document.getElementById("myDiagramDiv2").style.display = "none";
                document.getElementById("card2").style.display = "none";
                //document.getElementById("button1").style.display = "block";
                this.backBtnDisabled = false;
                this.dblClkFired = true;
                // new code
                //this.showTableView('', true);
                this.getAPData(obj.part.data.key, '', true);

                this.showChart = false;
                this.phyChecked = obj.part.data.customFilterObj.phyChecked;
                this.legacyChecked = obj.part.data.customFilterObj.legacyChecked;
                this.filterEnabled = true;
              },
              margin: 5,
              toolTip:
                $("ToolTip",
                  {
                    "Border.stroke": colors["blue"], "Border.strokeWidth": 1
                  },
                  $(go.TextBlock, "Arrowheads", { margin: 4 }, { font: "bold 12px sans-serif" },
                    new go.Binding("text", "failedClientsNote")))
            },
            new go.Binding("text", "failed-clients", function (l) { return l ? l : '' }))

        ),



        ///btn

        $(go.Panel, "Auto",

          new go.Binding("margin", "label", function (l) { return l ? new go.Margin(-65, 0, 0, 3) : '' }),
          new go.Binding("cursor", "label", function (l) { return l ? 'pointer' : '' }),

          // decorations:
          $(go.Shape,
            "Square",

            {
              width: 15, height: 15, fill: '#eaeaea', stroke: "black", strokeWidth: 1, margin: 5, visible: false,
              click: (e, obj) => {
                this.dblClkFired = false;
                this.accessPointId = obj.part.data.accessPointId;
                this.lastDeviceClickData = obj.part.data;
                console.log(this.lastDeviceClickData);
                this.VisitedPage = 'main';
                this.routerKey = obj.part.data.key;
                this.getAPData(obj.part.data.key, true, '');
              }

            },
            new go.Binding("visible", "showBtn", function (l) { return l ? l : false }),
          ),

          $(go.TextBlock,
            {
              click: (e, obj) => {
                this.dblClkFired = false;
                this.accessPointId = obj.part.data.accessPointId;
                this.lastDeviceClickData = obj.part.data;
                console.log(this.lastDeviceClickData);
                this.VisitedPage = 'main';
                this.routerKey = obj.part.data.key;
                this.getAPData(obj.part.data.key, true, '');
              }
            },
            new go.Binding("text", "showBtn", function (l) { return l ? '+' : '' }))

        ),




        {
          click: (e, obj) => {
            if (obj.part.data['ap-tech-note']) {
              this.apInformtion = obj.part.data['ap-tech-note'];
            } else {
              this.apInformtion = obj.part.data['rg-tech-notes'];
            }

            //console.log(this.apInformtion);
          },
          mouseHover: function (e, obj) {
            let node = obj.part;
            if (node.data.key === 'internet') {
              return;
            }

            if (node.data.key === 'ethernet') {
              return;
            }

            // nodeHoverAdornment.adornedObject = node;
            // node.addAdornment("mouseHover", nodeHoverAdornment);
          },
          contextClick: (e, obj) => {
            console.log(obj.part.data);
            alert("Right Clicked on " + obj.part.data.key);
          },
          doubleClick: (e, obj) => {
            console.log(obj.part.data);
            if (obj.part.data.key === 'internet') {
              return;
            }

            if (obj.part.data.key === 'ethernet') {
              return;
            }

            // if (!obj.part.data['int-type']) {
            //   return;
            // }

            this.accessPointId = obj.part.data.accessPointId;
            this.VisitedPage = 'main';
            document.getElementById("myDiagramDiv1").style.display = "none";
            document.getElementById("myDiagramDiv2").style.display = "none";
            document.getElementById("card2").style.display = "none";
            //document.getElementById("button1").style.display = "block";
            this.backBtnDisabled = false;
            this.dblClkFired = true;
            // new code
            //this.showTableView('', true);
            this.getAPData(obj.part.data.key, '', true);

            this.showChart = false;
          },
          toolTip:
            $("ToolTip",
              {
                "Border.stroke": colors["blue"], "Border.strokeWidth": 1
              },
              $(go.TextBlock, "Arrowheads", { margin: 4 }, { font: "bold 12px sans-serif" },
                new go.Binding("text", "text")))
        },

      );




    myDiagram.linkTemplate =
      $(go.Link,
        {
          curve: go.Link.Bezier,
          //routing: go.Link.AvoidsNodes,
          toShortLength: 6,
          relinkableFrom: true,
          relinkableTo: true,
          // fromSpot: go.Spot.LeftRightSides,
          // toSpot: go.Spot.LeftRightSides,
          // fromEndSegmentLength: 30,
          // toEndSegmentLength: 30,
          //isLayoutPositioned: false
        },  // allow the user to relink existing links
        $(go.Shape,
          {
            strokeWidth: 3,
            width: 200
          },
          new go.Binding("stroke", "color"),
          new go.Binding("strokeWidth", "thick")),
        // $(go.Shape,
        //   { toArrow: "Standard", stroke: null, scale: 1 },
        //   new go.Binding("fill", "color")),

        {
          // this tooltip Adornment is shared by all links

          toolTip:
            $("ToolTip",
              $(go.TextBlock, { margin: 2 },  // the tooltip shows the result of calling linkInfo(data)
                new go.Binding("text", "", linkInfo4))
            ),
          // the same context menu Adornment is shared by all links
          //contextMenu: partContextMenu
        }

      );

    myDiagram.model = new go.GraphLinksModel(this.nodeDataArray, this.linkDataArray);

    this.diagramRedrawInt = setInterval(() => {
      console.log('diageam redraw');
      myDiagram.redraw();
    }, 600);

    // let animation = new go.Animation();
    // myDiagram.nodes.each(function (node: any) {
    //   console.log(node.data.key);
    //   if (node.data['ap-color'] === 'red' || node.data['ap-color'] === 'yellow') {
    //     animation.add(node, "scale", node.scale, 0.98);
    //   }

    // });

    // animation.duration = 500;
    // animation.reversible = true; // Re-run backwards
    // animation.runCount = Infinity; // Animate forever
    // animation.start();

  }
  second(key?: any, next?: boolean) {
    this.apInformtion = '';
    this.VisitedPage = 'main';
    this.routerKey = key;
    this.currentPage = 'middle';

    if (next) {
      this.nextVisitedPage = 'middle';
      this.nextRouterKey = key;
    }

    this.topologyView = true;
    this.tableView = false;

    document.getElementById("myDiagramDiv1").style.display = "none";

    document.getElementById("myDiagramDiv2").style.display = "block";
    document.getElementById("card2").style.display = "none";


    this.backBtnDisabled = false;

    var colors = {
      blue: "#2a6dc0",
      orange: "#ea2857",
      green: "#1cc1bc",
      gray: "#5b5b5b",
      white: "#F5F5F5"
    }

    if (this.myDiagramDiv2) {
      this.myDiagramDiv2.div = null;
    }

    let $ = this.$;
    this.myDiagramDiv2 =
      $(
        go.Diagram, "apTopologyView",
        {
          initialContentAlignment: go.Spot.Center,
          "undoManager.isEnabled": true,
          initialAutoScale: go.Diagram.UniformToFill,
          layout: $(go.LayeredDigraphLayout,
            {
              direction: 0,
              layerSpacing: 100,
              columnSpacing: 7,
            }),
        },

      );


    function linkInfo(d) {  // Tooltip info for a link data object
      return `${d.name}`;
    }

    setInterval(() => {
      this.myDiagramDiv2.redraw();
    }, 60);

    this.myDiagramDiv2.nodeTemplate =
      $(go.Node, "Auto",

        { background: "white", selectionAdorned: false },
        //new go.Binding("location", "loc", go.Point.parse),

        $(go.Panel, "Horizontal",  // the row of status indicators

        ),

        $(go.Picture,
          { width: 65, height: 65 },
          new go.Binding("width", "isClient", function (l) { return l ? 35 : 65 }),
          new go.Binding("height", "isClient", function (l) { return l ? 35 : 65 }),

          new go.Binding("source", "source", function (image) {
            return image ? image : '';
          }),
          new go.Binding("element", "source-video", function (video) {
            return video ? video : '';
          })
        ),

        $(go.Panel, "Vertical",

          new go.Binding("margin", "label", function (l) { return l ? new go.Margin(110, 0, 0, 0) : '' }),
          new go.Binding("background", "label", function (l) { return l ? '#eaeaea' : '' }),
          new go.Binding("padding", "label", function (l) { return l ? 3 : '' }),

          $(go.TextBlock,
            {
              margin: new go.Margin(0, 0, 0, 0),
              maxSize: new go.Size(100, 30),
              isMultiline: false,
              // click: () => {
              //   alert('label clicked');
              // }
            },
            new go.Binding("text", "label", function (l) { return l ? l : '' })),
        ),

        {
          click: (e, obj) => {
            console.log(obj.part.data);
            if (obj.part.data.key === 'ethernet' || obj.part.data.key === 'ap') {
              return;
            }

            if (obj.part.data.isClient) {
              this.imageDblClick(obj.part.data);
            } else {
              this.showTableView('', false);
            }

          },

          toolTip:
            $("ToolTip",
              { "Border.stroke": colors["blue"], "Border.strokeWidth": 1 },
              $(go.TextBlock, "Arrowheads", { margin: 4 }, { font: "bold 12px sans-serif" },
                new go.Binding("text", "text")))
        }

      );
    this.myDiagramDiv2.linkTemplate =
      $(go.Link,
        {
          curve: go.Link.Bezier,
          toShortLength: 8,
          relinkableFrom: true,
          relinkableTo: true
        },  // allow the user to relink existing links
        $(go.Shape,
          new go.Binding("stroke", "color"),
          new go.Binding("strokeWidth", "thick")),

        { // this tooltip Adornment is shared by all links

          toolTip:
            $("ToolTip",
              $(go.TextBlock, { margin: 2 },  // the tooltip shows the result of calling linkInfo(data)
                new go.Binding("text", "", linkInfo))
            ),
        }

      );

    var model = $(go.GraphLinksModel);
    model.nodeDataArray = this.apNodeData;
    model.linkDataArray = this.apLinkData;

    this.myDiagramDiv2.model = model;


  }

  goBack(): void {
    this.showChart = false;

    console.log(this.nextVisitedPage);
    console.log(this.VisitedPage);
    this.hideDDMenu();
    if (this.tableView) {
      this.tableView = false;
      this.topologyView = true;
    } else {
      this.tableView = true;
      this.topologyView = false;
    }
    if (this.VisitedPage === 'main') {
      this.tableView = false;
      this.topologyView = true;

      this.getAllClientsData(this.routerMac);

      this.currentPage = 'main';
      document.getElementById("myDiagramDiv1").style.display = "block";

      document.getElementById("myDiagramDiv2").style.display = "none";
      document.getElementById("card2").style.display = "none";
      //document.getElementById("button1").style.display = "none";
      this.backBtnDisabled = true;

      this.nextRouterKey = this.routerKey;
      if (this.dblClkFired) {
        this.nextVisitedPage = 'table';
        //this.dblClkFired = false;
      } else {
        this.nextVisitedPage = 'middle';
      }

    } else if (this.VisitedPage === 'middle') {
      this.second(this.routerKey);
    }
  }

  goForward(): void {
    if (this.nextVisitedPage === 'middle') {
      this.second(this.nextRouterKey);
    } else if (this.nextVisitedPage === 'table') {
      document.getElementById("myDiagramDiv1").style.display = "none";

      document.getElementById("myDiagramDiv2").style.display = "none";
      document.getElementById("card2").style.display = "none";

      //document.getElementById("button1").style.display = "block";
      this.backBtnDisabled = false;
      this.showTableView(this.nextTabledataUniqueId, this.dblClkFired);
    }
  }

  loadTabledata(key?: any) {
    this.deviceDatasUpdated = [];
    if (key) {

    } else {
      if (this.accessPointId) {
        this.deviceDatasUpdated = [];
        for (let i = 0; i < this.deviceDatas.length; i++) {
          if (this.deviceDatas[i].key1 === this.accessPointId) {
            this.deviceDatasUpdated.push(this.deviceDatas[i]);
          }
        }

      } else {
        // this.deviceDatas.shift();
        if (this.deviceDatas[0].type == 'All') {
          this.deviceDatas.shift();
          this.deviceDatasUpdated = this.deviceDatas;
        } else {
          this.deviceDatasUpdated = this.deviceDatas;
        }
      }

    }
    //console.log(this.deviceDatasUpdated);
  }

  loadTopologyDataByType(type: any): void {
    this.tplgyType = type;
    this.deviceDatasUpdated = [];
    for (let i = 0; i < this.deviceDatas.length; i++) {
      if (this.deviceDatas[i].deviceType === type && this.deviceDatas[i].deviceType != 'All') {
        this.deviceDatasUpdated.push(this.deviceDatas[i]);
      }
    }

    console.log(this.deviceDatasUpdated);

  }

  loadTopologydata() {
    event.stopImmediatePropagation();
    this.hideDDMenu();
    this.topologyView = true;
    this.tableView = false;
    this.deviceDatasUpdated = [];
    this.topologyData = {
      phy: [],
      legacy: [],
      clientWifi: []
    };

    if (this.deviceDatas.length) {
      for (let i = 0; i < this.deviceDatas.length; i++) {
        if (this.deviceDatas[i].deviceType === 'phy') {
          this.topologyData['phy'].push(this.deviceDatas[i]);
        } else if (this.deviceDatas[i].deviceType === 'legacy') {
          this.topologyData['legacy'].push(this.deviceDatas[i]);
        } else {
          this.topologyData['clientWifi'].push(this.deviceDatas[i]);
        }
      }
      this.loadTopologyDataByType('phy');
      console.log(this.topologyData);
    }

    this.VisitedPage = this.currentPage;

    // if (this.currentPage == 'main') {
    //   this.nextVisitedPage = 'table';
    // }

    document.getElementById("myDiagramDiv1").style.display = "none";
    document.getElementById("myDiagramDiv2").style.display = "none";
    document.getElementById("card2").style.display = "block";
    //document.getElementById("button1").style.display = "block";
    this.backBtnDisabled = false;

    //console.log(this.myDiagramDiv2.model.toJson());


  }


  filterByLegacyType(event): void {
    console.log(event.target.checked);

    if (event.target.checked) {
      this.legacyChecked = true;
    } else {
      this.legacyChecked = false;
    }

    this.filterTableData();
  }

  filterByPhyType(event): void {
    console.log(event.target.checked);

    if (event.target.checked) {
      this.phyChecked = true;
    } else {
      this.phyChecked = false;
    }

    this.filterTableData();
  }

  filterTableData(): void {

    console.log(this.deviceDatas);
    this.deviceDatasUpdated = this.deviceDatas;
    if (this.legacyChecked || this.phyChecked) {

      this.deviceDatasUpdated = [];

      for (let i = 0; i < this.deviceDatas.length; i++) {
        if (this.deviceDatas[i]['legacy-device-test-result'] !== 'PASS' && this.legacyChecked) {
          this.deviceDatasUpdated.push(this.deviceDatas[i]);
        } else if (this.deviceDatas[i]['signal-strength-test-result'] !== 'PASS' && this.phyChecked) {
          this.deviceDatasUpdated.push(this.deviceDatas[i]);
        } else if (this.deviceDatas[i]['phy-rate-test-result'] !== 'PASS' && this.phyChecked) {
          this.deviceDatasUpdated.push(this.deviceDatas[i]);
        }

        //phy-rate-test-result
      }


    }

    this.setCustomFilterInTable();

    console.log(this.deviceDatasUpdated);
  }

  filterTableSuccessData(): void {

    console.log(this.deviceDatas);
    this.deviceDatasUpdated = [];

    for (let i = 0; i < this.deviceDatas.length; i++) {
      if (this.deviceDatas[i]['legacy-device-test-result'] === 'PASS' && this.deviceDatas[i]['signal-strength-test-result'] === 'PASS') {
        this.deviceDatasUpdated.push(this.deviceDatas[i]);
      }
    }

    this.setCustomFilterInTable();

    console.log(this.deviceDatasUpdated);
  }

  showTableView(uniqueId?: string, dblClick?: boolean): void {

    event.stopImmediatePropagation();
    //this.hideDDMenu();
    this.topologyView = false;
    this.tableView = true;

    this.currentPage = 'table';
    //new code
    //this.loadTabledata(uniqueId);

    this.deviceDatasUpdated = this.deviceDatasUpdated.filter(function (obj) {
      return obj['client-type'] !== 'All';
    });



    //localStorage.setItem('lastVisitedPage', 'middle');
    //localStorage.setItem(' VisitedPage', 'middle');

    if (!dblClick) {
      this.VisitedPage = 'middle';
    } else {
      this.VisitedPage = 'main';
    }

    this.nextVisitedPage = 'table';
    //this.nextRouterKey = key;
    this.nextTabledataUniqueId = uniqueId;
    document.getElementById("myDiagramDiv1").style.display = "none";
    document.getElementById("myDiagramDiv2").style.display = "none";
    document.getElementById("card2").style.display = "block";
    //document.getElementById("button1").style.display = "block";
    this.backBtnDisabled = false;

    console.log(this.nextVisitedPage);
    console.log(this.VisitedPage);
  }


  openMenu() {
    event.stopImmediatePropagation();
    document.getElementById("myDropdown").classList.toggle("show");
  }

  accessPointImages = {
    //'red': 'assets/images/access-point-critical.png',
    'yellow': 'assets/images/access-point-minor-issues.mp4',
    'green': 'assets/images/access-point-clear.png',

    'red': 'assets/images/access-point-critical.mp4',
    // 'yellow': 'assets/images/access-point-minor-issues.gif',
    // 'green': 'assets/images/access-point-clear.png',
  };

  play(): any {
    return true;
  }

  getData(): void {
    if (!this.routerMac) {
      this.routerMac = '01:00:00:00:00:01';
    }

    this.spinner.show();
    let url = `http://52.12.71.176:8080/topology/landing/${this.routerMac}`;
    url = `assets/data/rg.json`;
    this.http.get(url).subscribe((json: any) => {
      this.spinner.hide();
      let nodeData = [];
      let linkData = [];

      let accessPointImages = this.accessPointImages;

      let uplinkData = {
        text: `MAC : ${json.landing.uplink.mac} \n Download Rate : ${json.landing.uplink.downloadRate} Mbps \n Upload Rate : ${json.landing.uplink.uploadRate} Mbps `,
        source: 'assets/images/internet.png',
        key: 'internet',
        accessPointId: ''
      };

      let uplinkEthernetData = {
        text: `Ethernet `,
        source: 'assets/images/tar.png',
        key: 'ethernet',
        accessPointId: ''
      };

      if (json.landing && json.landing.rg && json.landing.rg.aps) {

        let color: any;

        color = json.landing.rg['online'] ? 'green' : 'red';

        nodeData.push(uplinkData);
        linkData.push({ from: uplinkData.key, to: json.landing.rg.mac, color: color, thick: 3, routing: go.Link.Normal, name: uplinkData.text });


        json.landing.rg['text'] = `Ip address : ${json.landing.rg['ip']} \n MAC : ${json.landing.rg['mac']} \n Version : ${json.landing.rg['version']} \n Device : ${json.landing.rg['hostname']} \n`;
        json.landing.rg['source'] = json.landing.rg['online'] ? 'assets/images/alarm-all-clear.png' : 'assets/images/router-critical-state.png';
        json.landing.rg['key'] = json.landing.rg.mac;
        json.landing.rg['accessPointId'] = '';
        json.landing.rg['label'] = `${json.landing.rg['hostname']}`;
        json.landing.rg['failedClientsNote'] = ``;
        json.landing.rg['showBtn'] = true;
        //set false for rg
        // json.landing.rg['failed-clients'] = false;
        // json.landing.rg['passed-clients'] = false;

        json.landing.rg['customFilterObj'] = {
          legacyChecked: false,
          phyChecked: false
        };


        if (json.landing.rg['failed-clients']) {
          let failedClientsNote = '';
          let count: number = 1;

          for (let c = 0; c < json.landing.rg['clients'].length; c++) {

            if (json.landing.rg['clients'][c]['phy-rate-test-result'] == 'FAIL' || json.landing.rg['clients'][c]['signal-strength-test-result'] == 'FAIL' || json.landing.rg['clients'][c]['legacy-device-test-result'] == 'FAIL') {

              if (json.landing.rg['clients'][c]['legacy-device-test-result'] == 'FAIL') {
                json.landing.rg['customFilterObj'].legacyChecked = true;
                failedClientsNote += `${count}) ${json.landing.rg['clients'][c]['hostname']} : ${json.landing.rg['clients'][c]['client-note']} \n`;
              } else if (json.landing.rg['clients'][c]['signal-strength-test-result'] == 'FAIL') {

                json.landing.rg['customFilterObj'].phyChecked = true;
                failedClientsNote += `${count}) ${json.landing.rg['clients'][c]['hostname']} : ${json.landing.rg['clients'][c]['client-note']} \n`;

              } else if (json.landing.rg['clients'][c]['phy-rate-test-result'] == 'FAIL') {
                json.landing.rg['customFilterObj'].phyChecked = true;
                failedClientsNote += `${count}) ${json.landing.rg['clients'][c]['hostname']} : ${json.landing.rg['clients'][c]['client-note']} \n`;
              }

              count++;
            }

          }

          json.landing.rg['failedClientsNote'] = failedClientsNote;

        }
        nodeData.push(json.landing.rg);
        let rgData: any = json.landing.rg.aps;

        for (let i = 0; i < rgData.length; i++) {
          if (!rgData[i]) {
            continue;
          }


          if (!rgData[i]['int-type']) {
            continue;
          }


          rgData[i]['text'] = `Ip address : ${rgData[i]['ip']}\n MAC : ${rgData[i]['mac']} \n Version : ${rgData[i]['version']} \n Device : ${rgData[i]['hostname']} \n Note : ${rgData[i]['ap-tech-note']} \n`;
          if (rgData[i]['ap-color'] === 'green') {
            rgData[i]['source'] = accessPointImages[rgData[i]['ap-color']] ? accessPointImages[rgData[i]['ap-color']] : 'assets/images/access-point-clear.png';
          }


          if (rgData[i]['ap-color'] !== 'green') {
            let src = accessPointImages[rgData[i]['ap-color']];
            let video = document.createElement('video');
            video.setAttribute('preload', 'auto');
            video.setAttribute('type', 'video/mp4');
            video.autoplay = true;
            video.setAttribute("width", "320");
            video.setAttribute("height", "240");
            video.src = src;
            video.loop = true;
            //video.muted = true;
            // video.setAttribute('onloadedmetadata', this.play());
            // video.setAttribute('oncanplay', this.play());


            rgData[i]['source-video'] = video;

          }
          rgData[i]['key'] = rgData[i].mac;
          rgData[i]['accessPointId'] = 'CXNK005A77E9';
          rgData[i]['label'] = `${rgData[i]['hostname']}`;
          rgData[i]['showBtn'] = true;

          rgData[i]['failedClientsNote'] = ``;

          rgData[i]['customFilterObj'] = {
            legacyChecked: false,
            phyChecked: false
          };

          if (rgData[i]['failed-clients']) {
            let failedClientsNote = '';
            let count: number = 1;

            for (let c = 0; c < rgData[i]['clients'].length; c++) {
              if (rgData[i]['clients'][c]['phy-rate-test-result'] == 'FAIL' || rgData[i]['clients'][c]['signal-strength-test-result'] == 'FAIL' || rgData[i]['clients'][c]['legacy-device-test-result'] == 'FAIL') {
                if (rgData[i]['clients'][c]['legacy-device-test-result'] == 'FAIL') {
                  rgData[i]['customFilterObj'].legacyChecked = true;
                  failedClientsNote += `${count}) ${rgData[i]['clients'][c]['hostname']}: ${rgData[i]['clients'][c]['client-note']} \n`;
                } else if (rgData[i]['clients'][c]['signal-strength-test-result'] == 'FAIL') {
                  rgData[i]['customFilterObj'].phyChecked = true;
                  failedClientsNote += `${count}) ${rgData[i]['clients'][c]['hostname']}: ${rgData[i]['clients'][c]['client-note']} \n`;
                } else if (rgData[i]['clients'][c]['phy-rate-test-result'] == 'FAIL') {
                  rgData[i]['customFilterObj'].phyChecked = true;
                  failedClientsNote += `${count}) ${rgData[i]['clients'][c]['hostname']}: ${rgData[i]['clients'][c]['client-note']} \n`;
                }

                count++;
              }

            }

            rgData[i]['failedClientsNote'] = failedClientsNote;

          }

          if (rgData[i]['int-type'] === 'UNKNOWN') {
            rgData[i]['source'] = 'assets/images/cloud.png';
            rgData[i]['failed-clients'] = json.landing.rg['failed-clients'];
            rgData[i]['passed-clients'] = json.landing.rg['passed-clients'];
            rgData[i]['failedClientsNote'] = json.landing.rg['failedClientsNote'];
            rgData[i]['customFilterObj'] = json.landing.rg['customFilterObj'];

            rgData[i]['label'] = `Unknown`;

            //rgData[i]['label'] = `Cloud`;            

            json.landing.rg['failed-clients'] = 0;
            json.landing.rg['passed-clients'] = 0;
            json.landing.rg['showBtn'] = false;

          }

          rgData[i].backhaul['rx-phy-rate'] = rgData[i].backhaul['rx-phy-rate'] ? this.bytesToSize(rgData[i].backhaul['rx-phy-rate']) : this.bytesToSize(0);
          rgData[i].backhaul['tx-phy-rate'] = rgData[i].backhaul['tx-phy-rate'] ? this.bytesToSize(rgData[i].backhaul['tx-phy-rate']) : this.bytesToSize(0);

          nodeData.push(rgData[i]);
          if (rgData[i]['int-type'] === 'eth') {
            //rgData[i]['source'] = 'assets/images/tar.png';
            color = 'black';



            nodeData.push(uplinkEthernetData);
            linkData.push({ from: json.landing.rg.mac, to: uplinkEthernetData.key, color: color, thick: 3, routing: go.Link.Normal, name: `${json.landing.rg.hostname} to Ethernet` });
            linkData.push({ from: uplinkEthernetData.key, to: rgData[i].mac, color: color, thick: 3, routing: go.Link.Normal, name: `Ethernet to ${rgData[i].hostname}` });

          } else {
            color = rgData[i].backhaul['backhaul-color'];

            if (color === 'yellow') {
              color = '#e0b34c';
            }

            linkData.push({ from: json.landing.rg.mac, to: rgData[i].mac, color: color, thick: 3, routing: go.Link.Normal, name: `Transmit rate: ${rgData[i].backhaul['tx-phy-rate']} \n Receive rate: ${rgData[i].backhaul['rx-phy-rate']}` });
          }

          if (rgData[i].aps.length) {
            for (let j = 0; j < rgData[i].aps.length; j++) {
              if (rgData[i].aps[j]) {
                rgData[i].aps[j]['text'] = `Ip address : ${rgData[i].aps[j]['ip']} \n MAC : ${rgData[i].aps[j]['mac']} \n Version : ${rgData[i].aps[j]['version']} \n Device : ${rgData[i].aps[j]['hostname']} \n Note : ${rgData[i].aps[j]['ap-tech-note']}`;

                if (rgData[i].aps[j]['ap-color'] === 'green') {
                  rgData[i].aps[j]['source'] = accessPointImages[rgData[i].aps[j]['ap-color']] ? accessPointImages[rgData[i].aps[j]['ap-color']] : 'assets/images/access-point-clear.png';
                }

                if (rgData[i].aps[j]['ap-color'] !== 'green') {
                  let src = accessPointImages[rgData[i].aps[j]['ap-color']];
                  let video = document.createElement('video');
                  video.setAttribute('preload', 'auto');
                  video.setAttribute('type', 'video/mp4');
                  video.autoplay = true;
                  video.setAttribute("width", "320");
                  video.setAttribute("height", "240");
                  video.src = src;
                  video.loop = true;

                  rgData[i].aps[j]['source-video'] = video;

                }

                rgData[i].aps[j]['key'] = rgData[i].aps[j].mac;
                rgData[i].aps[j]['accessPointId'] = 'CXNK005A77E9';
                rgData[i].aps[j].backhaul['rx-phy-rate'] = rgData[i].aps[j].backhaul['rx-phy-rate'] ? this.bytesToSize(rgData[i].aps[j].backhaul['rx-phy-rate']) : this.bytesToSize(0);
                rgData[i].aps[j].backhaul['tx-phy-rate'] = rgData[i].aps[j].backhaul['tx-phy-rate'] ? this.bytesToSize(rgData[i].aps[j].backhaul['tx-phy-rate']) : this.bytesToSize(0);

                rgData[i].aps[j]['label'] = `${rgData[i].aps[j]['hostname']}`;
                rgData[i].aps[j]['showBtn'] = true;

                rgData[i].aps[j]['failedClientsNote'] = ``;

                rgData[i].aps[j]['customFilterObj'] = {
                  legacyChecked: false,
                  phyChecked: false
                };

                if (rgData[i].aps[j]['failed-clients']) {
                  let failedClientsNote = '';
                  let count: number = 1;

                  for (let c = 0; c < rgData[i].aps[j]['clients'].length; c++) {
                    if (rgData[i].aps[j]['clients'][c]['phy-rate-test-result'] == 'FAIL' || rgData[i].aps[j]['clients'][c]['signal-strength-test-result'] == 'FAIL' || rgData[i].aps[j]['clients'][c]['legacy-device-test-result'] == 'FAIL') {
                      if (rgData[i].aps[j]['clients'][c]['legacy-device-test-result'] == 'FAIL') {
                        rgData[i].aps[j]['customFilterObj'].legacyChecked = true;
                        failedClientsNote += `${count}) ${rgData[i].aps[j]['clients'][c]['hostname']} :  ${rgData[i].aps[j]['clients'][c]['client-note']} \n`;
                      } else if (rgData[i].aps[j]['clients'][c]['signal-strength-test-result'] == 'FAIL') {
                        console.log('signal streength check');
                        rgData[i].aps[j]['customFilterObj'].phyChecked = true;
                        failedClientsNote += `${count}) ${rgData[i].aps[j]['clients'][c]['hostname']} :  ${rgData[i].aps[j]['clients'][c]['client-note']} \n`;
                      } else if (rgData[i].aps[j]['clients'][c]['phy-rate-test-result'] == 'FAIL') {
                        rgData[i].aps[j]['customFilterObj'].phyChecked = true;
                        failedClientsNote += `${count}) ${rgData[i].aps[j]['clients'][c]['hostname']} :  ${rgData[i].aps[j]['clients'][c]['client-note']} \n`;
                      }

                      count++;
                    }

                  }

                  rgData[i].aps[j]['failedClientsNote'] = failedClientsNote;

                }

                console.log(rgData[i].backhaul['tx-phy-rate']);
                nodeData.push(rgData[i].aps[j]);

                if (rgData[i].aps[j]['int-type'] === 'eth') {
                  //rgData[i].aps[j]['source'] = 'assets/images/tar.png';
                  color = 'black';

                  nodeData.push(uplinkEthernetData);
                  linkData.push({ from: rgData[i].mac, to: uplinkEthernetData.key, color: "#546caf", thick: 3, routing: go.Link.Normal, name: `Internet to ${json.landing.rg.hostname}` });
                  linkData.push({ from: uplinkEthernetData.key, to: rgData[i].aps[j].mac, color: color, thick: 3, routing: go.Link.Normal, name: `${rgData[i].hostname} to ${rgData[i].aps[j].hostname}` });

                } else {
                  color = rgData[i].aps[j].backhaul['backhaul-color'];
                  if (color === 'yellow') {
                    color = '#e0b34c';
                  }
                  linkData.push({ from: rgData[i].mac, to: rgData[i].aps[j].mac, color: color, thick: 3, routing: go.Link.Normal, name: `Transmit rate: ${rgData[i].aps[j].backhaul['tx-phy-rate']} \n Receive rate: ${rgData[i].aps[j].backhaul['rx-phy-rate']}` });
                }


                if (rgData[i].aps[j].aps.length) {
                  for (let k = 0; k < rgData[i].aps[j].aps.length; k++) {
                    if (rgData[i].aps[j].aps[k]) {
                      rgData[i].aps[j].aps[k]['text'] = `Ip address : ${rgData[i].aps[j].aps[k]['ip']} \n MAC : ${rgData[i].aps[j].aps[k]['mac']} \n Version : ${rgData[i].aps[j].aps[k]['version']} \n Device : ${rgData[i].aps[j].aps[k]['hostname']} \n Note : ${rgData[i].aps[j].aps[k]['ap-tech-note']}`;

                      if (rgData[i].aps[j].aps[k]['ap-color'] === 'green') {
                        rgData[i].aps[j].aps[k]['source'] = accessPointImages[rgData[i].aps[j].aps[k]['ap-color']] ? accessPointImages[rgData[i].aps[j].aps[k]['ap-color']] : 'assets/images/access-point-clear.png';
                      }

                      if (rgData[i].aps[j].aps[k]['ap-color'] !== 'green') {
                        let src = accessPointImages[rgData[i].aps[j].aps[k]['ap-color']];
                        let video = document.createElement('video');
                        video.setAttribute('preload', 'auto');
                        video.setAttribute('type', 'video/mp4');
                        video.autoplay = true;
                        video.setAttribute("width", "320");
                        video.setAttribute("height", "240");
                        video.src = src;
                        video.loop = true;

                        rgData[i].aps[j].aps[k]['source-video'] = video;

                      }

                      rgData[i].aps[j].aps[k]['key'] = rgData[i].aps[j].aps[k].mac;
                      rgData[i].aps[j].aps[k]['accessPointId'] = 'CXNK00207B91';
                      rgData[i].aps[j].aps[k].backhaul['rx-phy-rate'] = rgData[i].aps[j].aps[k].backhaul['rx-phy-rate'] ? this.bytesToSize(rgData[i].aps[j].aps[k].backhaul['rx-phy-rate']) : this.bytesToSize(0);
                      rgData[i].aps[j].aps[k].backhaul['tx-phy-rate'] = rgData[i].aps[j].aps[k].backhaul['tx-phy-rate'] ? this.bytesToSize(rgData[i].aps[j].aps[k].backhaul['tx-phy-rate']) : this.bytesToSize(0);

                      rgData[i].aps[j].aps[k]['label'] = `${rgData[i].aps[j].aps[k]['hostname']}`;
                      rgData[i].aps[j].aps[k]['showBtn'] = true;

                      rgData[i].aps[j].aps[k]['failedClientsNote'] = ``;

                      rgData[i].aps[j].aps[k]['customFilterObj'] = {
                        legacyChecked: false,
                        phyChecked: false
                      };

                      if (rgData[i].aps[j].aps[k]['failed-clients']) {
                        let failedClientsNote = '';
                        let count: number = 1;

                        for (let c = 0; c < rgData[i].aps[j].aps[k]['clients'].length; c++) {
                          if (rgData[i].aps[j].aps[k]['clients'][c]['phy-rate-test-result'] == 'FAIL' || rgData[i].aps[j].aps[k]['clients'][c]['signal-strength-test-result'] == 'FAIL' || rgData[i].aps[j].aps[k]['clients'][c]['legacy-device-test-result'] == 'FAIL') {
                            if (rgData[i].aps[j].aps[k]['clients'][c]['legacy-device-test-result'] == 'FAIL') {
                              rgData[i].aps[j].aps[k]['customFilterObj'].legacyChecked = true;
                              failedClientsNote += `${count}) ${rgData[i].aps[j].aps[k]['clients'][c]['hostname']} : ${rgData[i].aps[j].aps[k]['clients'][c]['client-note']} \n`;
                            } else if (rgData[i].aps[j].aps[k]['clients'][c]['signal-strength-test-result'] == 'FAIL') {
                              rgData[i].aps[j].aps[k]['customFilterObj'].phyChecked = true;
                              failedClientsNote += `${count}) ${rgData[i].aps[j].aps[k]['clients'][c]['hostname']} : ${rgData[i].aps[j].aps[k]['clients'][c]['client-note']} \n`;
                            } else if (rgData[i].aps[j].aps[k]['clients'][c]['phy-rate-test-result'] == 'FAIL') {
                              rgData[i].aps[j].aps[k]['customFilterObj'].phyChecked = true;
                              failedClientsNote += `${count}) ${rgData[i].aps[j].aps[k]['clients'][c]['hostname']} : ${rgData[i].aps[j].aps[k]['clients'][c]['client-note']} \n`;
                            }

                            count++;
                          }

                        }

                        rgData[i].aps[j].aps[k]['failedClientsNote'] = failedClientsNote;

                      }

                      nodeData.push(rgData[i].aps[j].aps[k]);

                      if (rgData[i].aps[j].aps[k]['int-type'] === 'eth') {
                        //rgData[i].aps[j].aps[k]['source'] = 'assets/images/tar.png';
                        color = 'black';

                        nodeData.push(uplinkEthernetData);
                        linkData.push({ from: rgData[i].aps[j].mac, to: uplinkEthernetData.key, color: "#546caf", thick: 3, routing: go.Link.Normal, name: `Internet to ${json.landing.rg.hostname}` });
                        linkData.push({ from: uplinkEthernetData.key, to: rgData[i].aps[j].aps[k].mac, color: color, thick: 3, routing: go.Link.Normal, name: `${rgData[i].aps[j].hostname} to ${rgData[i].aps[j].aps[k].hostname}` });
                      } else {
                        color = rgData[i].aps[j].aps[k].backhaul['backhaul-color'];
                        if (color === 'yellow') {
                          color = '#e0b34c';
                        }
                        linkData.push({ from: rgData[i].aps[j].mac, to: rgData[i].aps[j].aps[k].mac, color: color, thick: 3, routing: go.Link.Normal, name: `Transmit rate: ${rgData[i].aps[j].aps[k].backhaul['tx-phy-rate']} \n Receive rate: ${rgData[i].aps[j].aps[k].backhaul['rx-phy-rate']}` });
                      }


                    }

                  }
                }

              }
            }
          }

        }

        this.nodeDataArray = nodeData;
        this.linkDataArray = linkData;

        this.loadfirst();

        console.log(nodeData);
        console.log(linkData);
      }


    }, (err: any) => {
      console.log(err);
    });
  }

  switchView(): void {
    event.stopImmediatePropagation();
    console.log('topology ' + this.topologyView);
    console.log('table ' + this.tableView);

    if (this.topologyView) {
      this.deviceDatasUpdated = this.deviceDatas;
      this.showTableView('', this.currentPage == 'main' ? true : false);

      this.phyChecked = true;
      this.legacyChecked = true;
      this.filterTableData();
      return;
    } else if (this.tableView) {
      this.goBack();
      return;
    }

  }

  onUserRowSelect(event: any): void {
    console.log(event.data.mac);

    this.deviceDatasUpdated = [];
    this.deviceDatasUpdated.push(event.data);
    this.clientData = event.data;
    this.getClientData(event.data.mac);
  }

  apData: any = {};
  apToolTip: any;
  apLinkTooolTip: any;
  apImageUrl: any = '';
  apNodeData: any = [];
  apLinkData: any = [];
  getAPData(apMac: any, singleClick?: any, dblClick?: any): void {

    let signalImages = {
      0: 'assets/images/no-wifi-signal.png',
      1: 'assets/images/low-wifi-signal.png',
      2: 'assets/images/all-green-wifi.png',
      3: 'assets/images/all-green-wifi.png',
    };

    let accessPointImages = this.accessPointImages;
    this.spinner.show();
    this.apInformtion = '';

    console.log('last click');

    console.log(this.lastDeviceClickData['int-type']);

    if (this.lastDeviceClickData['int-type'] == 'UNKNOWN') {
      apMac = this.routerMac;
    }

    this.http.get(`http://52.12.71.176:8080/topology/ap_view/${apMac}`).subscribe((json: any) => {
      this.spinner.hide();
      if (!json['ap-view']) {
        this.goBack();
        return;
      }

      // for gojs daigram

      this.apData = json['ap-view'].ap;

      let nodeData = [];
      let linkData = [];

      let accessPointImages = this.accessPointImages;

      this.ethOrAPType = this.lastDeviceClickData['int-type'];
      let key = '';
      let text = '';
      let source = accessPointImages[this.apData['ap-color']];

      if (!this.ethOrAPType) {
        this.ethOrAPImageUrl = 'assets/images/internet.png';
        text = 'Internet';
        key = 'internet';
        source = this.lastDeviceClickData['online'] ? 'assets/images/alarm-all-clear.png' : 'assets/images/router-critical-state.png';
      } else if (this.ethOrAPType === 'eth') {
        this.ethOrAPImageUrl = 'assets/images/tar.png';
        text = 'Ethernet';
        key = 'ethernet';
      } else if (this.ethOrAPType === 'UNKNOWN') {
        this.ethOrAPImageUrl = 'assets/images/alarm-all-clear.png';
        text = 'Router';
        key = 'router';
        source = 'assets/images/cloud.png';
      } else {
        this.ethOrAPImageUrl = 'assets/images/access-point-clear.png';
        text = 'AP';
        key = 'ap';
      }

      let uplinkData = {
        text: text,
        source: this.ethOrAPImageUrl,
        key: key
      };


      let color: any;

      color = this.apData['ap-color'];
      this.apLinkTooolTip = this.apData.backhaul['tx-phy-rate'] ? `Transmit Rate ${this.apData.backhaul['tx-phy-rate']} \n Receive Rate ${this.apData.backhaul['rx-phy-rate']}` : `Ethernet to ${this.apData['hostname']}`;

      nodeData.push(uplinkData);


      linkData.push({ from: uplinkData.key, to: this.apData['mac'], color: color, thick: (this.lastDeviceClickData['int-type'] == 'UNKNOWN') ? 0 : 3, routing: go.Link.Normal, name: this.apLinkTooolTip });

      this.apData['text'] = `Ip address : ${this.apData['ip']} \n MAC : ${this.apData['mac']} \n Version : ${this.apData['version']} \n Device : ${this.apData['hostname']} \n Note : ${this.apData['ap-tech-note']} \n `;
      this.apData['source'] = source;

      if (this.apData['ap-color'] !== 'green' && key == 'ap') {
        let src = accessPointImages[this.apData['ap-color']];
        let video = document.createElement('video');
        video.autoplay = true;
        video.setAttribute("width", "320");
        video.setAttribute("height", "240");
        video.src = src;
        video.loop = true;
        video.setAttribute('preload', 'auto');

        this.apData['source-video'] = video;
      }

      this.apData['key'] = this.apData.mac;
      if (this.lastDeviceClickData['int-type'] == 'UNKNOWN') {
        this.apData['label'] = `Unknown`;
      } else {
        this.apData['label'] = `${this.apData['hostname']}`;
      }

      nodeData.push(this.apData);

      // for gojs daigram



      let data = json['ap-view'].clients;

      this.ethOrAPType = json['ap-view'].ap['int-type'];

      if (this.ethOrAPType === 'eth') {
        this.ethOrAPImageUrl = 'assets/images/tar.png';
      } else {
        this.ethOrAPImageUrl = 'assets/images/access-point-clear.png';
      }

      this.apImageUrl = accessPointImages[json['ap-view'].ap['ap-color']];

      this.apData = json['ap-view'].ap;
      this.apToolTip = `Ip address : ${this.apData['ip']} \n MAC : ${this.apData['mac']} \n Version : ${this.apData['version']} \n Device : ${this.apData['hostname']} \n Note : ${this.apData['ap-tech-note']} \n `;
      this.apLinkTooolTip = this.apData.backhaul['tx-phy-rate'] ? `Transmit Rate ${this.apData.backhaul['tx-phy-rate']} \n Receive Rate ${this.apData.backhaul['rx-phy-rate']}` : `Ethernet to ${this.apData['hostname']}`;


      this.ssid = json['ap-view'].ap['radio-info'][0].ssid;
      this.radio = json['ap-view'].ap['radio-info'][0]['freq-band'] + 'GHZ';
      this.deviceDatasUpdated = [];

      for (let i = 0; i < data.length; i++) {
        if (!data[i]) {
          continue;
        }
        //data[i]['ssid'] = this.ssid;
        data[i]['radio'] = this.radio;
        data[i]['accessPoint'] = data[i]['ap-hostname'] ? data[i]['ap-hostname'] : data[i]['access-point-hostname'];
        // console.log(data[i]['client-type']);
        // console.log(this.imagesObj[data[i]['client-type']]);
        data[i]['image_url'] = (data[i]['client-distance'] == 'far') ? (this.imagesObj[data[i]['client-type'] + '-red'] ? this.imagesObj[data[i]['client-type'] + '-red'] : this.imagesObj[data[i]['client-type']]) : this.imagesObj[data[i]['client-type']];


        data[i]['siganl_image'] = {
          'url': signalImages[data[i]['signal-bars']] ? signalImages[data[i]['signal-bars']] : 'assets/images/all-green-wifi.png',
          'signal-strength': data[i]['signal-strength'] + ' dB'
        };
        data[i]['signal-strength'] = data[i]['signal-strength'] + 'dB';
        this.deviceDatasUpdated.push(data[i]);

        if (data[i]['intf-type'] === 'eth') {
          data[i]['isClient'] = true;
          data[i]['text'] = `Ip address : ${data[i]['ip-address']} \n MAC : ${data[i]['mac']} \n Device : ${data[i]['hostname']} \n Note : ${data[i]['client-note']} \n `;
          data[i]['source'] = data[i]['image_url'];
          data[i]['key'] = data[i].mac;
          data[i]['label'] = `${data[i]['hostname']} - ${data[i]['client-type']}`;

          nodeData.push(data[i]);
          linkData.push({ from: this.apData.key, to: data[i]['mac'], color: 'black', thick: 3, routing: go.Link.Normal, name: `Ethernet to ${data[i]['hostname']}` });

          //this.myDiagramDiv2.layout.layerSpacing = 100;
        }

      }

      //gojs
      console.log('ap data');
      console.log(nodeData);
      console.log(linkData);
      this.apNodeData = nodeData;
      this.apLinkData = linkData;


      //gojs

      this.deviceDatasUpdated = this.deviceDatasUpdated.sort(this.customSort);

      this.deviceDatas = this.deviceDatasUpdated;

      let flags = {};

      let uniqueDevices = [{
        'client-type': 'All'
      }];

      for (let i = 0; i < this.deviceDatas.length; i++) {
        if (!flags[this.deviceDatas[i]['client-type']]) {
          flags[this.deviceDatas[i]['client-type']] = true;
          uniqueDevices.push(this.deviceDatas[i]);
        }
      }

      this.uniqueDevices = uniqueDevices;


      let hosts = {};

      let uniqueHostnames = [{
        'hostname': 'All'
      }];

      for (let i = 0; i < this.deviceDatas.length; i++) {
        if (!hosts[this.deviceDatas[i]['hostname']]) {
          hosts[this.deviceDatas[i]['hostname']] = true;

          uniqueHostnames.push(this.deviceDatas[i]);

        }
      }

      this.uniqueHostnames = uniqueHostnames;

      if (dblClick) {
        this.showTableView('', true);
      }

      if (singleClick) {
        this.second(apMac, true);

        this.rangeDeviceFilter(0);

        // if (this.accessPointId) {
        //   this.rangeDeviceFilter(this.accessPointId);
        // } else {
        //   this.rangeDeviceFilter(0);
        // }
      }

      if (this.deviceDatas && this.deviceDatas[0].type == 'All') {
        this.deviceDatas.shift();
        this.deviceDatasUpdated = this.deviceDatas;
      } else {
        this.deviceDatasUpdated = this.deviceDatas;
      }

      if (this.filterEnabled) {
        this.filterEnabled = false;
        this.filterTableData();

      } else if (this.successFilterEnabled) {
        this.successFilterEnabled = false;
        this.legacyChecked = false;
        this.phyChecked = false;
        this.filterTableSuccessData();

      } else {
        this.legacyChecked = true;
        this.phyChecked = true;
        this.filterTableData();
      }



      //console.log(this.deviceDatasUpdated);

    });
  }

  dataForUploadDownLoadChart: any = [];
  dataForSignalStrengthChart: any = [];
  dataForClientScoreChart: any = [];
  dataSource1: any = {};
  dataSource2: any = {};

  getClientData(apMac: any, singleClick?: any, dblClick?: any): void {

    let signalImages = {
      0: 'assets/images/no-wifi-signal.png',
      1: 'assets/images/low-wifi-signal.png',
      2: 'assets/images/all-green-wifi.png',
      3: 'assets/images/all-green-wifi.png',
    };

    let seriesNames: any = {
      'y_Client_Score': 'Client Score',
      'y_Downloaded MBytes': 'Downloaded MBytes',
      'y_Uploaded MBytes': 'Uploaded MBytes',
      'y_Signal Strength dBm': 'Signal Strength dBm',
      'time_value': 'Time'
    };

    this.spinner.show();

    this.http.get(`http://52.12.71.176:8080/topology/client/${apMac}`).subscribe((json: any) => {
      this.spinner.hide();

      let data = json.clients.pm_data;
      console.log(data);
      let length = data.length;
      if (!length) {
        return;
      }

      this.twoHrsData = [];

      let chartData = [];
      for (let i = 0; i < length; i++) {
        if (data[i].series_name === 'time_value') {
          this.twoHrsCategory = [];

          let timeArr = data[i].series_data.split(",");

          for (let j = 0; j < timeArr.length; j++) {
            this.twoHrsCategory.push({
              label: timeArr[j]
            });
          }

        } else {

          let dataArr = data[i].series_data.split(",");

          let buildData: any = [];
          let signalData: any = [];
          let clientScoreData: any = [];

          for (let j = 0; j < dataArr.length; j++) {

            buildData.push({
              value: dataArr[j]
            });
          }

          this.twoHrsData.push({
            seriesname: seriesNames[data[i].series_name] ? seriesNames[data[i].series_name] : data[i].series_name,
            data: buildData
          });

        }
      }

      console.log(this.twoHrsData);
      this.dataForClientScoreChart = [];
      this.dataForSignalStrengthChart = [];
      this.dataForUploadDownLoadChart = [];

      for (let i = 0; i < this.twoHrsData.length; i++) {
        if (this.twoHrsData[i]['seriesname'] === 'Client Score') {
          this.dataForClientScoreChart.push(this.twoHrsData[i]);
        } else if (this.twoHrsData[i]['seriesname'] === 'Signal Strength dBm') {
          this.dataForSignalStrengthChart.push(this.twoHrsData[i]);
        } else {
          this.dataForUploadDownLoadChart.push(this.twoHrsData[i]);
        }
      }

      // console.log(this.twoHrsCategory);
      console.log(this.dataForUploadDownLoadChart);
      console.log(this.dataForSignalStrengthChart);
      console.log(this.dataForClientScoreChart);

      this.data = {
        chart: {

          showhovereffect: "1",
          drawcrossline: "1",
          plottooltext: "<b>$dataValue</b> on $seriesName",
          theme: "fusion"
        },
        categories: [
          {
            category: this.twoHrsCategory
          }
        ],
        dataset: this.dataForUploadDownLoadChart
      };

      this.dataSource = this.data;

      this.dataSource1 = {
        chart: {

          showhovereffect: "1",
          drawcrossline: "1",
          plottooltext: "<b>$dataValue</b> on $seriesName",
          theme: "fusion"
        },
        categories: [
          {
            category: this.twoHrsCategory
          }
        ],
        dataset: this.dataForClientScoreChart
      };


      this.dataSource2 = {
        chart: {

          showhovereffect: "1",
          drawcrossline: "1",
          plottooltext: "<b>$dataValue</b> on $seriesName",
          theme: "fusion"
        },
        categories: [
          {
            category: this.twoHrsCategory
          }
        ],
        dataset: this.dataForSignalStrengthChart
      };;

      this.showChart = true;


    });
  }


  getAllClientsData(apMac: any, singleClick?: any, dblClick?: any): void {

    let signalImages = {
      0: 'assets/images/no-wifi-signal.png',
      1: 'assets/images/low-wifi-signal.png',
      2: 'assets/images/all-green-wifi.png',
      3: 'assets/images/all-green-wifi.png',
    };
    this.spinner.show();
    this.http.get(`http://52.12.71.176:8080/topology/subscriber_clients/${apMac}`).subscribe((json: any) => {
      this.spinner.hide();
      let data = json.clients;
      this.legacyChecked = false;
      this.phyChecked = false;

      this.deviceDatasUpdated = [];

      for (let i = 0; i < data.length; i++) {
        if (!data[i]) {
          continue;
        }
        data[i]['ssid'] = this.ssid ? this.ssid : '-';
        data[i]['radio'] = this.radio ? this.radio : '-';
        data[i]['accessPoint'] = data[i]['ap-hostname'] ? data[i]['ap-hostname'] : data[i]['access-point-hostname'];
        //data[i]['image_url'] = this.imagesObj[data[i]['client-type']] ? this.imagesObj[data[i]['client-type']] : this.images[0];

        data[i]['image_url'] = (data[i]['signal-bars'] < 2) ? (this.imagesObj[data[i]['client-type'] + '-red'] ? this.imagesObj[data[i]['client-type'] + '-red'] : this.imagesObj['iot-red']) : this.imagesObj[data[i]['client-type']];


        //data[i]['siganl_image'] = signalImages[data[i]['signal-bars']] ? signalImages[data[i]['signal-bars']] : 'assets/images/all-green-wifi.png';
        data[i]['siganl_image'] = {
          'url': signalImages[data[i]['signal-bars']] ? signalImages[data[i]['signal-bars']] : 'assets/images/all-green-wifi.png',
          'signal-strength': data[i]['signal-strength'] + ' dB'
        };

        data[i]['signal-strength'] = data[i]['signal-strength'] + 'dB';
        this.deviceDatasUpdated.push(data[i]);
      }

      this.deviceDatasUpdated = this.deviceDatasUpdated.sort(this.customSort);

      //console.log(this.deviceDatasUpdated);

      this.deviceDatas = this.deviceDatasUpdated;


      if (dblClick) {
        this.showTableView('', true);
      }

      if (singleClick) {
        this.second(apMac, true);

        this.rangeDeviceFilter(0);

      }
      // console.log('client datas');
      // console.log(this.deviceDatasUpdated);

    });
  }

  setCustomFilterInTable(): void {
    let hosts = {};

    let hostnameFilterData: any = [];

    for (let i = 0; i < this.deviceDatasUpdated.length; i++) {
      if (!hosts[this.deviceDatasUpdated[i]['hostname']]) {
        console.log(this.deviceDatasUpdated[i]['hostname']);
        hosts[this.deviceDatasUpdated[i]['hostname']] = true;

        hostnameFilterData.push({
          'value': this.deviceDatasUpdated[i]['hostname'],
          'title': this.deviceDatasUpdated[i]['hostname']
        });
      }
    }

    this.hostnameFilterData = hostnameFilterData;
    this.settings.columns.hostname.filter.config['list'] = hostnameFilterData;
    this.settings = Object.assign({}, this.settings);
  }


  bytesToSize(bytes: any): any {
    // let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    // if (bytes == 0) return '0 Byte';
    // let i: any = Math.floor(Math.log(bytes) / Math.log(1024));
    // return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];

    return bytes + ' Bytes';
  }
  ngOnDestroy() {
    if (this.diagramRedrawInt) {
      clearInterval(this.diagramRedrawInt);
    }

  }


}

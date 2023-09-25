import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as go from 'gojs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { DataServiceService } from '../../data.service';
import { SupportWifiService } from '../../support-wifi/services/support-wifi.service';
import { IssuesService } from '../services/issues.service';

@Component({
  selector: 'app-demo-topology',
  templateUrl: './demo-topology.component.html',
  styleUrls: ['./demo-topology.component.scss'],
})
export class DemoTopologyComponent implements OnInit {
  @ViewChild('APDiagram') APDiagram;
  @ViewChild('searchValue') searchValue: ElementRef;
  @ViewChild('issueBox') issueBox: ElementRef;
  nodeLinkColor = { green: '#c8d652', red: '#c7a9a2' };
  nodeColor = { green: '#f6f8e9', red: '#f6e6e8' };
  searchSubject: Subject<any> = new Subject();
  locationFixed: boolean = false;
  searchText: any;
  MODULE: string = 'support';
  languageSubject;
  language: any;
  issueData;
  totalissues: any;
  issueList;
  isIconClicked = [];
  primaryActionButton = [];
  Description = [];
  severity = [];
  reason = [];
  apiCallDone: boolean = false;
  loading: Boolean = false;
  lastDeviceClickData: any = {};
  uniqueDevices: any = [];
  uniqueHostnames: any = [];
  clientData: any = {};
  twoHrsCategory = [];
  twoHrsData = [];
  sixHrsData = [];
  oneDayData = [];
  width = '100%';
  height = 400;
  type = 'msline';
  clientDetails: any;
  title = 'app';
  apInformtion: string = '';
  orgId: string;
  serialNo;

  routerMac: any;
  mainDiagram: any;
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
  apData: any = {};
  apToolTip: any;
  apLinkTooolTip: any;
  apImageUrl: any = '';
  apNodeData: any = [];
  apLinkData: any = [];

  topologyData: any = {
    phy: [],
    legacy: [],
    clientWifi: [],
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
  clientDevTopology: any;
  topRow: boolean = true;
  onClickClients = '';
  resValue: any;
  selectedAPValue: any;
  clientArr: any = [];
  rgArr: any = [];
  clientDeviceSSID: boolean = false;
  objData: any;
  toKey: any;
  rgflag = false;
  rgDetails: any = [];
  rgModel = '';
  raManufacture = '';
  ipv4 = '';
  ipv6 = '';
  pageNumber = 1;
  pageSize = 10;
  makemodel = [];
  errorInfo: any;
  error: boolean;
  zoomFactorList = [
    {
      factor: '25%',
      value: 0.25,
    },
    {
      factor: '50%',
      value: 0.5,
    },
    {
      factor: '75%',
      value: 0.75,
    },
    {
      factor: '100%',
      value: 1,
    },
    {
      factor: '125%',
      value: 1.25,
    },
    {
      factor: '150%',
      value: 1.5,
    },
    {
      factor: '175%',
      value: 1.75,
    },
    {
      factor: '200%',
      value: 2,
    },
  ];
  zoomScale = 1;

  images: any = [
    'assets/images/tv-all-clear.png',
    'assets/images/printer-clear.png',
    'assets/images/ipad-all-clear.png',
    'assets/images/laptop-all-clear.png',
    'assets/images/phone-all-clear-state.png',
    'assets/images/camera-clear.png',
    'assets/images/audiobox-clear.png',
    'assets/images/gaming-clear.png',
    'assets/images/ipad-all-clear.png',
    'assets/images/laptop-all-clear.png',
  ];

  clientDevicesImages = [
    'assets/images/deviceicons/question_mark_grey_icon.png',
    'assets/images/deviceicons/phone_grey_icon.png',
    'assets/images/deviceicons/computer_grey_icon.png',
    'assets/images/deviceicons/console_grey_icon.png',
    'assets/images/deviceicons/media_player_grey_icon.png',
    'assets/images/deviceicons/printer_grey_icon.png',
    'assets/images/deviceicons/television_grey_icon.png',
    'assets/images/deviceicons/network_icon_grey.png',
    'assets/images/deviceicons/camera_grey_icon.png',
    'assets/images/deviceicons/tablet_grey_icon.png',
    'assets/images/deviceicons/voip_grey.png',
    'assets/images/deviceicons/iot_grey.png',
    'assets/images/deviceicons/ic_modem-24px.svg',
    'assets/images/deviceicons/question_mark_grey_icon.png',
  ];

  imagesObj: any = {
    Television: 'assets/images/tv-all-clear.png',
    Tablet: 'assets/images/ipad-all-clear.png',
    Phone: 'assets/images/phone-all-clear-state.png',
    Camera: 'assets/images/camera-clear.png',
    'Media Player': 'assets/images/audiobox-clear.png',
    Console: 'assets/images/gaming-clear.png',
    'Wi-Fi IoT': 'assets/images/iot.png',
    'Wi Fi IoT': 'assets/images/iot.png',
    'Wifi IoT': 'assets/images/iot.png',
    Computer: 'assets/images/computer.png',
    Printer: 'assets/images/printer-clear.png',
    Network: 'assets/images/network.png', // what is network
    Voip: 'assets/images/voip.png', // what is Voip
    Fridge: 'assets/images/iot.png',

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

    'wireless-red': 'assets/img/WiFi-Error.svg',
    'wireless-green': 'assets/img/WiFi-Success.svg',
    'wireless-orange': 'assets/img/WiFi-Warning.svg',
  };

  ssid: string = '';
  radio: string = '';
  ethOrAPType: string = '';
  ethOrAPImageUrl: string = '';
  accesspoint: boolean = false;
  APTopology: any;
  rgKey: any;

  constructor(
    private translateService: TranslateService,
    private http: HttpClient,
    private issuseservice: IssuesService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private ssoAuthService: SsoAuthService,
    private dataService: DataServiceService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private commonOrgService: CommonService,
    private api: SupportWifiService
  ) {
    go.Diagram.licenseKey =
      '73f946e4b56e28a800ca0d2b113f69ed1bb37f3b9e8c1bf0595446a7ef0d68403089ef2802868ac582ff19fd1829c0dcd5c46c7a9e1c0138e132d38c40e485ade16477b6435b448da3012f90ccaf2ff5ac2f77a0c3b672a68a70dff6eea8c59a59eff5861ace1cab2f2d5637562cff4ba5ebda7afa02d349746d9a';

    let url = this.router.url;
    if (url.indexOf('/support/') > -1) {
      this.MODULE = 'support';
    } else this.MODULE = 'cco';
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
      }
    );
    this.backBtnDisabled = true;
    this.route.queryParams.subscribe((params: any) => {
      this.routerMac = params['routerMac'];
      this.getData();
      this.getAllClientsData(this.routerMac);
    });
  }

  ngAfterViewInit(): void { }

  loadfirst() {
    let $ = this.$;
    var colors = {
      blue: '#2a6dc0',
      orange: '#ea2857',
      green: '#1cc1bc',
      gray: '#5b5b5b',
      white: '#F5F5F5',
    };
    if (this.APTopology) {
      this.APTopology.div = null;
    }
    this.APTopology = $(
      go.Diagram,
      'mainDiagram',

      {
        minScale: 0.25,
        maxScale: 2.0,
        initialContentAlignment: go.Spot.Top, // center Diagram contents
        'undoManager.isEnabled': true,
        LayoutCompleted: (e) => {
          this.updateDivHeight();
          this.enableAllCommandHandler();
          if (this.rgArr.length > 0) {
            this.scroll();
          }
        },
        InitialLayoutCompleted: (e) => {
          this.setZoomScaleToFit();
          addMakeCustomExpander();
          // e.diagram.findTreeRoots().each(function(r) { r.collapseTree(2); });
          // e.diagram.findTreeRoots().each(function(r) { r.expandTree(1); });
          e.diagram.nodes.each(function (r) {
            r.data['isRg'] ? collapseDefault(r) : null;
          });

          // e.diagram.findTreeRoots().each(function(r) { r.expandTree(1); });
        },
        initialAutoScale: go.Diagram.UniformToFill,
        layout: $(
          go.TreeLayout, //LayeredDigraphLayout
          {
            // direction: 0,
            layerSpacing: 110,
            // columnSpacing: 33,
            // linkSpacing: 5,
            // isOngoing: false,
            angle: 0,
          }
        ),
      }
    );

    this.APTopology.toolManager.toolTipDuration = 60000;
    this.APTopology.toolManager.hoverDelay = 500;

    function linkInfo4(d) {
      // Tooltip info for a link data object
      if (d.name == '') {
        return false;
      } else {
        return `${d.name}`;
      }
    }

    this.APTopology.nodeTemplate = $(
      go.Node,
      'Auto',
      // { isTreeExpanded: false },
      {
        selectionAdorned: false,
        click: (e, obj) => {
          this.clientArr = [];
          this.selectedAPValue = '';
          if (obj.part.data['ap-tech-note'] || obj.part.data['rg-tech-notes']) {
            this.apInformtion = obj.part.data['ap-tech-note'];
            if (obj.part.data['failed-clients'] != 0) {
              this.selectedAPValue = obj.part.data;
            }
            if (obj.part.data.clients && obj.part.data.clients.length > 0) {
              for (let i = 0; i < obj.part.data.clients.length; i++) {
                let name = '';
                if (this.resValue.landing.rg.hostname) {
                  name = this.resValue.landing.rg.hostname;
                } else {
                  name = this.resValue.landing.rg.mac;
                }
                if (i == 0 && obj.part.data['rg-color'] == 'red') {
                  let params = {
                    note: obj.part.data['rg-tech-notes'],
                    name: name,
                  };
                  JSON.stringify(this.clientArr.push(params));
                }
                if (
                  obj.part.data.clients[i]['legacy-device-test-result'] !=
                  'PASS' ||
                  obj.part.data.clients[i]['signal-strength-test-result'] !=
                  'PASS' ||
                  obj.part.data.clients[i]['phy-rate-test-result'] != 'PASS'
                ) {
                  let hostname = '';
                  if (obj.part.data.clients[i]['hostname']) {
                    hostname = obj.part.data.clients[i]['hostname'];
                  } else {
                    hostname = obj.part.data.clients[i]['mac'];
                  }
                  let params = {
                    note: obj.part.data.clients[i]['client-note'],
                    name: hostname,
                  };
                  JSON.stringify(this.clientArr.push(params));
                }
              }
            } else if (!obj.part.data['rg-tech-notes']) {
              this.selectedAPValue = obj.part.data;
              let hostname = '';
              if (obj.part.data['hostname']) {
                hostname = obj.part.data['hostname'];
              } else {
                hostname = obj.part.data['sn'];
              }
              let params = {
                note: obj.part.data['ap-tech-note'],
                name: hostname,
              };
              JSON.stringify(this.clientArr.push(params));
            }
          } else {
            this.apInformtion = obj.part.data['rg-tech-notes'];
          }
          if (this.clientArr.length > 0) {
            this.scroll();
          }
        },
        mouseHover: function (e, obj) {
          let node = obj.part;
          if (node.data.key === 'internet') {
            return;
          }
          if (node.data.key === 'ethernet') {
            return;
          }
        },
        toolTip: $(
          'ToolTip',
          {
            'Border.stroke': colors['blue'],
            'Border.strokeWidth': 1,
            visible: false,
          },
          new go.Binding('visible', 'tooltip', function (text) {
            return text != '';
          }),
          $(
            go.TextBlock,
            { margin: 4 },
            { font: 'bold 12px sans-serif' },
            new go.Binding('text', 'tooltip')
          )
        ),
      },

      // new go.Binding('visible'),
      $(
        go.Shape,
        {
          // background : 'red',
          width: 210,
          height: 120,
          fill: 'white',
        },
        new go.Binding('strokeWidth', 'isHighlighted', function (h) {
          return h ? 2 : 0;
        }).ofObject(),
        new go.Binding('stroke', 'isHighlighted', function (h) {
          return h ? 'gold' : 'white';
        }).ofObject()
      ),
      $(
        go.Shape,
        new go.Binding('cursor', 'label', function (l) {
          return l ? 'pointer' : '';
        }),
        { width: 210, height: 40, strokeWidth: 0 },
        new go.Binding('fill', '', function (node) {
          return node.color || 'white';
        })
      ),

      $(
        go.Panel,
        'Auto',
        new go.Binding('cursor', 'label', function (l) {
          return l ? 'pointer' : '';
        }),
        {
          width: 220,
          height: 120,
        },

        $(
          go.Panel,
          'Spot',
          {
            visible: false,
          },
          $(
            go.Picture,
            {
              // background : 'blue',
              desiredSize: new go.Size(25, 20),
              alignment: go.Spot.TopLeft,
              visible: false,
              margin: new go.Margin(25, 0, 0, 10),
              toolTip: $(
                'ToolTip',
                {
                  visible: false,
                  'Border.stroke': colors['blue'],
                  'Border.strokeWidth': 1,
                },
                $(
                  go.TextBlock,
                  'Arrowheads',
                  { margin: 4 },
                  { font: 'bold 12px sans-serif' },
                  new go.Binding('text', 'ap_rssi_tooltip'),
                  new go.Binding('visible', '', function (data) {
                    return (
                      data.ap_rssi_tooltip &&
                      data != '' &&
                      data['ap-online'] == 'true'
                    );
                  })
                ),
                new go.Binding('visible', '', function (data) {
                  return (
                    data.ap_rssi_tooltip &&
                    data != '' &&
                    data['ap-online'] == 'true'
                  );
                })
              ),
            },
            new go.Binding('source', 'wirelessIcon', function (image) {
              return image ? image : '';
            }),
            new go.Binding('width', 'width', function (data) {
              return data - 5;
            }),
            new go.Binding('height', 'height', function (data) {
              return data - 10;
            })
          ),
          new go.Binding('visible', '', function (data) {
            return (
              data.wirelessIcon &&
              data.wirelessIcon != '' &&
              data['ap-online'] == 'true'
            );
          })
        ),

        $(
          go.Panel,
          'Spot',
          {
            visible: false,
            alignment: go.Spot.TopLeft,
          },
          new go.Binding('visible', 'freqBand', function (freqBand) {
            return freqBand != '';
          }),
          $(
            go.TextBlock,
            { margin: new go.Margin(25, 0, 0, 10) },
            new go.Binding('text', 'freqBand')
          )
        ),

        $(
          go.Panel,
          'Horizontal', // the row of status indicators
          $(
            go.Panel,
            'Horizontal',
            { height: 35, width: 60 },
            $(
              go.Picture,
              { margin: new go.Margin(0, 0, 0, 25) },
              new go.Binding('source', 'source', function (image) {
                return image ? image : '';
              }),
              new go.Binding('element', 'source-video', function (video) {
                return video ? video : '';
              }),
              new go.Binding('width', 'width'),
              new go.Binding('height', 'height')
            )
          ),
          $(
            go.Panel,
            'Horizontal',
            { height: 40, width: 160 },
            $(
              go.TextBlock,
              {
                margin: new go.Margin(0, 0, 0, 10),
                width: 120,
                overflow: go.TextBlock.OverflowEllipsis,
                // isMultiline : false,
                maxLines: 1,
                // maxSize: new go.Size(200, 60),
              },
              new go.Binding('text', 'label', function (l) {
                return l ? l : '';
              })
            )
          )
        ),

        //Passed Clients
        $(
          go.Panel,
          'Auto',
          {
            click: function (e, obj) {
              var node = obj.part; // get the Node containing this Button
              if (node === null) return;
              e.handled = true;
              expandNode(node, true, 'isPassedClient');
            },
          },

          new go.Binding('margin', 'label', function (l) {
            return l ? new go.Margin(-55, 0, 0, 50) : '';
          }),
          new go.Binding('cursor', 'label', function (l) {
            return l ? 'pointer' : '';
          }),

          // decorations:
          $(
            go.Shape,
            'Circle',

            {
              width: 24,
              height: 24,
              // fill: 'white',
              stroke: 'green',
              strokeWidth: 2,
              margin: 5,
              visible: false,
            },
            new go.Binding('fill', '_othersPassedExpanded', function (node) {
              return node ? 'green' : 'white';
            }),
            new go.Binding('visible', 'passed-clients', function (l) {
              return l ? l : false;
            })
          ),

          $(
            go.TextBlock,
            {
              margin: 5,
            },
            new go.Binding('stroke', '', function (node) {
              return node._othersPassedExpanded ? 'white' : 'black';
            }),
            new go.Binding('text', 'passed-clients', function (l) {
              return l ? l : '';
            })
          )
        ),

        //Failed Clients
        $(
          go.Panel,
          'Auto',
          {
            click: function (e, obj) {
              var node = obj.part; // get the Node containing this Button
              if (node === null) return;
              e.handled = true;
              expandNode(node, true, 'isFailedClient');
            },
          },

          new go.Binding('margin', 'label', function (l) {
            return l ? new go.Margin(-45, 0, 0, 90) : '';
          }),
          new go.Binding('cursor', 'label', function (l) {
            return l ? 'pointer' : '';
          }),

          // decorations:
          $(
            go.Shape,
            'Circle',

            {
              width: 24,
              height: 24,
              // fill: 'white',
              stroke: 'orange',
              strokeWidth: 2,
              margin: 5,
              visible: false,
            },
            new go.Binding('fill', '_othersFailedExpanded', function (node) {
              return node ? 'orange' : 'white';
            }),
            new go.Binding('visible', 'failed-clients', function (l) {
              return l ? l : false;
            })
          ),

          $(
            go.TextBlock,
            {
              margin: 5,
            },
            new go.Binding('stroke', '', function (node) {
              return node._othersFailedExpanded ? 'white' : 'black';
            }),
            new go.Binding('text', 'failed-clients', function (l) {
              return l ? l : '';
            })
          )
        ),

        $(
          go.Panel,
          'Auto',
          {
            margin: new go.Margin(0, 0, 0, 175),
          },

          makeCustomExpander(false)
        )
      ),
      new go.Binding('visible', 'isClient', function (o) {
        return !o;
      })
    );
    this.APTopology.linkTemplate = $(
      go.Link,
      {
        curve: go.Link.Bezier,
        // toShortLength: 6,
        relinkableFrom: true,
        relinkableTo: true,
      }, // allow the user to relink existing links
      $(
        go.Shape,
        {
          strokeWidth: 3,
          width: 200,
        },
        new go.Binding('stroke', 'color'),
        new go.Binding('strokeWidth', 'thick')
      ),
      {
        toolTip: $(
          'ToolTip',
          { visible: false },
          new go.Binding('visible', '', linkInfo4),
          $(
            go.TextBlock,
            { margin: 2 }, // the tooltip shows the result of calling linkInfo(data)
            new go.Binding('text', '', linkInfo4)
          )
        ),
      }
    );
    let that = this;
    function makeCustomExpander(others) {
      return $(
        'Button',
        {
          visible: false,
          // alignment: align,
          click: function (e, obj) {
            var node = obj.part; // get the Node containing this Button
            if (node === null) return;
            e.handled = true;
            expandNode(node, others, 'isClient');
          },
        },

        $(
          go.Shape, // the icon
          {
            name: 'ButtonIcon',
            figure: 'TriangleLeft',
            stroke: '#424242',
            strokeWidth: 2,
            desiredSize: new go.Size(8, 8),
          },
          // bind the Shape.figure to the node.data._othersExpanded value using this converter:
          new go.Binding(
            'figure',
            others ? '_othersExpanded' : '_primariesExpanded',
            function (exp, shape) {
              var but = shape.panel;
              return exp ? 'TriangleLeft' : 'TriangleRight';
            }
          )
        ),
        // assume initially not visible because there are no links coming out
        // { visible: false },
        // bind the button visibility to whether it's not a leaf node
        // new go.Binding('visible', 'isTreeLeaf', function (leaf) {
        //   return !leaf;
        // }).ofObject(),
        // new go.Binding('visible', 'apHasChildAp', function (l) { return l && l == true?true:false}),
        new go.Binding('visible', '', function (node) {
          return !node.isTreeLeaf && node.apHasChildAp ? true : false;
        })
      );
    }
    function expandNode(node, others, type) {
      others = node.data['isSSID'] ? true : others;
      type = node.data['isSSID']
        ? node.data['isPassedClient']
          ? 'isPassedClient'
          : 'isFailedClient'
        : type;
      that.APTopology.startTransaction('CollapseExpandTree');
      var children = node.findTreeChildrenNodes();
      children.each(function (c) {
        var cd = c.data;
        if (others && !cd[type]) return;
        if (!others && cd[type]) return;
        if (c.visible) {
          c.visible = false;
          c.collapseTree();
        } else {
          c.visible = true;
          c.expandTree();
        }
      });
      if (others) {
        if (type == 'isPassedClient') {
          that.APTopology.model.set(
            node.data,
            '_othersPassedExpanded',
            !node.data._othersPassedExpanded
          );
        } else if (type == 'isFailedClient') {
          that.APTopology.model.set(
            node.data,
            '_othersFailedExpanded',
            !node.data._othersFailedExpanded
          );
        }
      } else {
        that.APTopology.model.set(
          node.data,
          '_primariesExpanded',
          !node.data._primariesExpanded
        );
      }
      that.APTopology.commitTransaction('CollapseExpandTree');
    }

    async function collapseDefault(node) {
      that.APTopology.startTransaction('CollapseExpandTree');
      var children = node.findTreeChildrenNodes();
      var parent = node.findTreeParentNode();
      that.APTopology.model.set(
        node.data,
        '_primariesExpanded',
        !node.data._primariesExpanded
      );
      await children.each(function (c) {
        c.visible = false;
        c.collapseTree();

        var subChild = c.findTreeChildrenNodes();
        if (subChild) {
          collapseDefault(c);
        }
      });
      if (!that.locationFixed) {
        locateIssueFix(parent);
      }

      that.APTopology.commitTransaction('CollapseExpandTree');
    }

    function locateIssueFix(node) {
      that.APTopology.startTransaction('CollapseExpandTree');
      that.APTopology.findTreeRoots().each(function (e) {
        if (e.data['isInternet']) e.location.y = e.location.y + 1;
        that.locationFixed = true;
      });
      // node.location.y = node.location.y + 1;
      // node.location = new go.Point(0, 141);
      that.APTopology.commitTransaction('CollapseExpandTree');
    }

    function addMakeCustomExpander() {
      that.APTopology.startTransaction('CollapseExpandTree');

      that.APTopology.nodes.each(function (obj) {
        let node = obj.part;
        let childrenExists = obj.part.findTreeChildrenNodes();
        let childExists = false;
        childrenExists.each(function (c) {
          var cd = c.data;
          if (!cd['isClient'] || cd['isSSIDClient']) {
            childExists = true;
          }
          that.APTopology.model.set(node.data, 'apHasChildAp', childExists);
        });
      });

      that.APTopology.commitTransaction('CollapseExpandTree');
    }

    that.APTopology.model = new go.GraphLinksModel(
      that.nodeDataArray,
      that.linkDataArray
    );

    const el = this.APDiagram.nativeElement;
    const canvas: any = el.querySelector('canvas');
    canvas['style']['outline'] = 'none';
  }

  accessPointImages = {
    yellow: 'assets/images/myRouter_yellow.svg',
    green: 'assets/images/myRouter.svg',
    red: 'assets/images/myRouter_red.svg',
  };

  play(): any {
    return true;
  }

  async loadInitialDiagram(json) {
    this.nodeDataArray = [];
    this.linkDataArray = [];
    let rgColor = '';
    let linkColor = '';
    if (json.landing.rg.online == 'true') {
      rgColor = '#f6f8e9';
      linkColor = '#cfdb67';
    } else {
      rgColor = '#f3f3f3';
      linkColor = 'grey';
    }
    let uplinkText = '';
    let uplinkRate = '';
    if (Object.keys(json.landing.uplink).length > 0) {
      uplinkText = `MAC : ${json.landing.uplink.mac}`;
      uplinkRate = `Download Rate : ${json.landing.uplink.downloadRate} Mbps \n Upload Rate : ${json.landing.uplink.uploadRate} Mbps `;
    }
    let connection = '';
    if (this.ipv4 && this.ipv6) {
      connection = `IPv4: Connected \n IPv6: Connected`;
    } else if (this.ipv4 && !this.ipv6) {
      connection = `IPv4: Connected \n IPv6: Disconnected`;
    } else if (!this.ipv4 && this.ipv6) {
      connection = `IPv4: Disconnected \n IPv6: Connected`;
    }
    let uplinkData = {
      isInternet: true,
      text: uplinkText,
      label: connection,
      source: 'assets/images/global.svg',
      key: 'test',
      accessPointId: '',
      width: 30,
      height: 30,
      color: rgColor,
    };

    let uplinkEthernetData = {
      text: `Ethernet Port`,
      label: `Ethernet Port`,
      source: 'assets/images/ethernet.png',
      key: 'ethernet',
      accessPointId: '',
      color: '#f3f3f3',
      width: 17,
      height: 30,
    };
    // ****** RG NOTE
    if (json.landing && json.landing.rg) {
      let color: any;
      color = json.landing.rg['online'] ? 'red' : 'green';

      this.linkDataArray.push({
        from: uplinkData.key,
        to: json.landing.rg.mac,
        color: linkColor,
        thick: 2,
        routing: go.Link.Normal,
        name: uplinkRate,
      });
      let rgDetails = '';
      let freq_band = '';
      if (json.landing.rg['online']) {
        if (json.landing.rg['online'] == 'true') {
          rgDetails = `Connection: Online`;
        } else {
          rgDetails = `Connection: Offline`;
        }
      }
      rgDetails += json.landing.rg['ip']
        ? `\n IP Address : ${json.landing.rg['ip']}`
        : ``;
      rgDetails += json.landing.rg['mac']
        ? `\n MAC Address: ${json.landing.rg['mac']}`
        : ``;
      rgDetails += json.landing.rg['version']
        ? `\n Software Version : ${json.landing.rg['version']}`
        : ``;
      rgDetails += json.landing.rg['sn']
        ? `\n Serial Number: ${json.landing.rg['sn']}`
        : ``;
      rgDetails += json.landing.rg['hostname']
        ? `\n Device : ${json.landing.rg['hostname']}`
        : ``;
      rgDetails += this.rgModel ? `\n Model : ${this.rgModel}` : ``;
      rgDetails += this.raManufacture
        ? `\n Manufacturer : ${this.raManufacture}`
        : ``;
      if (json.landing.rg['radio-info']) {
        var radioInfo = json.landing.rg['radio-info'];
        var freqArr = [];
        if (radioInfo.length > 0) {
          for (let fband = 0; fband < radioInfo.length; fband++) {
            let fbandValue = radioInfo[fband]['freq-band'] + 'GHz';
            freqArr.push(fbandValue);
          }
          freq_band = freqArr.join(', ');
        }
        rgDetails += freq_band ? `\n Frequency Band: ${freq_band}` : ``;
      }
      if (json.landing.rg.clients) {
        if (json.landing.rg.clients.length > 0) {
          rgDetails += json.landing.rg.clients
            ? `\n Total Devices: ${json.landing.rg.clients.length}`
            : `\n Total Devices: 0`;
        }
      }
      rgDetails +=
        json.landing.rg['passed-clients'] != 0
          ? `\n Devices without issues and warnings: ${json.landing.rg['passed-clients']}`
          : `\n Devices without issues and warnings: 0`;
      rgDetails +=
        json.landing.rg['failed-clients'] != 0
          ? `\n Devices with issues and warnings: ${json.landing.rg['failed-clients']}`
          : `\n Devices with issues and warnings: 0`;
      json.landing.rg['tooltip'] = rgDetails;
      json.landing.rg['source'] = json.landing.rg['online']
        ? 'assets/images/myRouter.svg'
        : 'assets/images/router-critical-state.png';
      json.landing.rg['key'] = json.landing.rg.mac;
      this.rgKey = json.landing.rg.mac;
      if (json.landing.rg['rg-color'] == 'green') {
        json.landing.rg['color'] = '#f6f8e9';
      } else if (json.landing.rg['rg-color'] == 'red') {
        json.landing.rg['color'] = '#f6e6e8';
      } else if (json.landing.rg['rg-color'] == 'yellow') {
        json.landing.rg['color'] = '#ffff84b5';
      }
      if (json.landing.rg['online'] == 'false') {
        json.landing.rg['color'] = '#f6e6e8';
      }
      json.landing.rg['width'] = 30;
      json.landing.rg['height'] = 30;
      json.landing.rg['model'] = this.rgModel;
      json.landing.rg['isRg'] = true;
      if (json.landing.rg['hostname']) {
        json.landing.rg['label'] = `${json.landing.rg['hostname']}`;
      } else {
        json.landing.rg['label'] = `${json.landing.rg['sn']}`;
      }

      // Populate APS
      let rgData: any = json.landing.rg.aps;
      // if (!this.clientDeviceSSID) {
      this.nodeDataArray.push(uplinkData);
      this.nodeDataArray.push(json.landing.rg);
      if (rgData && rgData.length > 0) {
        await this.populateAps(
          rgData,
          json,
          json.landing.rg,
          uplinkEthernetData
        );
      }

      this.setClientDetailsNode();
    }
  }

  getData() {
    this.loading = true;

    let url = `assets/data/rg.json`;
    let getSerialNo = this.ssoAuthService.getSerialNo();
    if (getSerialNo != '') {
      var Devices = JSON.parse(getSerialNo);
    }

    var SubscriberId = this.ssoAuthService.getCSCSubscriberId();
    var serialNo = [];
    if (Devices) {
      Devices.forEach((element) => {
        if (element.serialNumber) {
          var newElement = {};
          (newElement['serialNumber'] = element.serialNumber),
            (newElement['opMode'] = element.opMode),
            serialNo.push(newElement);
        }
      });
    }
    let data = {
      subscriberId: SubscriberId,
      devices: serialNo,
    };
    let orgId = +localStorage.getItem('calix.org_id');
    this.issuseservice.topologyValue(orgId, data).subscribe(
      (json: any) => {
        // this.http.get(url).subscribe(
        //   (json: any) => {
        if (
          json.landing.rg['rg-color'] == 'red' ||
          json.landing.rg['rg-color'] == 'yellow'
        ) {
          this.rgflag = true;
          let name = '';
          if (json.landing.rg['hostname']) {
            name = json.landing.rg['hostname'];
          } else {
            name = json.landing.rg['sn'];
          }
          let params = {
            name: name,
            note: json.landing.rg['rg-tech-notes'],
          };
          JSON.stringify(this.rgArr.push(params));
        }
        this.loading = false;
        let pageNumber = 1;
        let pageSize = 10;
        this.dataService
          .performSearch(orgId, json.landing.rg.sn, pageNumber, pageSize)
          .subscribe(
            async (searchData: any) => {
              this.rgDetails = searchData;
              for (let i = 0; i < this.rgDetails.records.length; i++) {
                for (
                  let j = 0;
                  j < this.rgDetails.records[i].devices.length;
                  j++
                ) {
                  if (
                    this.rgDetails.records[i].devices[j].serialNumber ==
                    json.landing.rg.sn
                  ) {
                    this.rgModel =
                      this.rgDetails.records[i].devices[j].modelName;
                    this.raManufacture =
                      this.rgDetails.records[i].devices[j].manufacturer;
                    this.ipv4 = this.rgDetails.records[i].devices[j].ipAddress;
                    this.ipv6 =
                      this.rgDetails.records[i].devices[j].secondIpAddress;
                  }
                  let params = {
                    model: this.rgDetails.records[i].devices[j].modelName,
                    manufacture:
                      this.rgDetails.records[i].devices[j].manufacturer,
                    sno: this.rgDetails.records[i].devices[j].serialNumber,
                  };
                  this.makemodel.push(params);
                }
              }
              // this.resValue = JSON.parse(JSON.stringify(json));
              this.resValue = json;
              this.loadInitialDiagram(json);
            },
            (err: HttpErrorResponse) => {
              this.pageErrorHandle(err);
              this.loading = false;
            }
          );
      },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);
        this.loading = false;
      }
    );
  }

  async setClientDetailsNode() {
    // if (!this.clientDeviceSSID) {
    await this.nodeDataArray.forEach((el) => {
      if (el.clients && el.clients.length > 0) {
        this.objData = el;
        this.onClickClients = '';
        this.getAPData(this.objData);
      }
    });

    this.setOthersPrimary();
  }

  setOthersPrimary() {
    this.nodeDataArray.forEach((el) => {
      el['apHasChildAp'] = false;
      el['_othersPassedExpanded'] = false;
      el['_othersFailedExpanded'] = false;
      el['_primariesExpanded'] = false;
    });
    this.loadfirst();
  }
  clientNodeDetails(clientAttributes) {
    this.clientDetails = '';
    if (clientAttributes['ip-address']) {
      this.clientDetails = `IP Address : ${clientAttributes['ip-address']}`;
    }
    if (clientAttributes['hostname']) {
      this.clientDetails += `\n Hostname : ${clientAttributes['hostname']}`;
    }
    if (clientAttributes['version']) {
      this.clientDetails += `\n Software Version : ${clientAttributes['version']}`;
    }
    if (clientAttributes['mac']) {
      this.clientDetails += `\n MAC Address: ${clientAttributes['mac']}`;
    }
    if (
      clientAttributes['fingerprint-model'] &&
      clientAttributes['fingerprint-model'] != 'Unknown'
    ) {
      this.clientDetails += `\n Model : ${clientAttributes['fingerprint-model']}`;
    }
    if (
      clientAttributes['fingerprint-vendor'] &&
      clientAttributes['fingerprint-vendor'] != 'Unknown'
    ) {
      this.clientDetails += `\n Manufacturer: ${clientAttributes['fingerprint-vendor']}`;
    }
    if (clientAttributes['intf-type']) {
      this.clientDetails += `\n Connection Type: ${clientAttributes['intf-type']}`;
    }
    if (clientAttributes['signal-strength']) {
      this.clientDetails += `\n Signal Strength : ${clientAttributes['signal-strength']}`;
    }
    if (clientAttributes['client-efficiency-score']) {
      let scoreType = '';
      let clientEffScore = Number(
        (Number(clientAttributes['client-efficiency-score']) * 100).toFixed(2)
      );
      if (clientEffScore >= 45) {
        scoreType = 'Good';
      } else if (clientEffScore >= 20 && clientEffScore < 45) {
        scoreType = 'Fair';
      } else if (clientEffScore < 20) {
        scoreType = 'Poor';
      }
      this.clientDetails +=
        '\n Client Efficiency Score : ' +
        clientEffScore +
        '% (' +
        scoreType +
        ')';
    }
    if (clientAttributes['Airtime-usage'] >= 0) {
      this.clientDetails += `\n Airtime Usage : ${clientAttributes['Airtime-usage']}`;
    }
    if (clientAttributes['Channel-number']) {
      this.clientDetails += `\n Channel Number : ${clientAttributes['Channel-number']}`;
    }
    if (clientAttributes['DS-phy-rate'] || clientAttributes['US-phy-rate']) {
      this.clientDetails += `\n DS/Us Phy Rate : ${this.kbpsTO(
        clientAttributes['DS-phy-rate']
      )}bps/${this.kbpsTO(clientAttributes['US-phy-rate'])}bps`;
    }
    if (
      clientAttributes['RX-bandwidth-usage'] ||
      clientAttributes['TX-bandwidth-usage']
    ) {
      this.clientDetails += `\n RX/TX BW Usage : ${this.kbpsTO(
        clientAttributes['RX-bandwidth-usage']
      )}bps/${this.kbpsTO(clientAttributes['TX-bandwidth-usage'])}bps`;
    }
    if (clientAttributes['SNR']) {
      this.clientDetails += `\n SNR : ${clientAttributes['SNR']}`;
    }
    if (clientAttributes['freq-band']) {
      this.clientDetails += `\n Frequency Band: ${clientAttributes['freq-band']} GHz`;
    }
    if (clientAttributes.clients) {
      if (clientAttributes.clients.length > 0) {
        this.clientDetails += `\n Total Devices: ${clientAttributes.clients.length}`;
      }
    }
    if (clientAttributes['passed-clients']) {
      this.clientDetails += `\n Devices without issues and warnings: ${clientAttributes['passed-clients']}`;
    }
    if (clientAttributes['failed-clients']) {
      this.clientDetails += `\n Devices with issues and warnings: ${clientAttributes['failed-clients']}`;
    }
    if (clientAttributes['ap-tech-note']) {
      this.clientDetails += `\n Issue(s): ${clientAttributes['ap-tech-note']}`;
    }
  }
  getAPData(apMac: any): void {
    this.searchText = '';
    this.apInformtion = '';
    // Client Devices connected with RG
    //Populate Client Devices of Rg and APS
    if (apMac.clients && apMac.clients.length > 0) {
      this.populateClientDevices(apMac.clients, apMac);
    }
  }

  getAllClientsData(apMac: any, singleClick?: any, dblClick?: any): void {
    let signalImages = {
      0: 'assets/images/no-wifi-signal.png',
      1: 'assets/images/low-wifi-signal.png',
      2: 'assets/images/all-green-wifi.png',
      3: 'assets/images/all-green-wifi.png',
    };
    this.spinner.show();
  }

  accessPoint() {
    this.clientDeviceSSID = !this.clientDeviceSSID;
    this.loadInitialDiagram(this.resValue);
  }

  enableAllCommandHandler() {
    var cmdhnd = this.APTopology.commandHandler;
    this.enable('ScrollToPart', cmdhnd.canScrollToPart());
  }

  enable(name, ok) {
    var button = document.getElementById(name);
    if (button) button['disabled'] = !ok;
  }
  zoomfunctionalities(type) {
    if (type == 'ScrollToPart') {
      this.APTopology.commandHandler.scrollToPart();
    }
  }

  searchDiagram() {
    if (this.searchText.length > 1) {
      let that = this;
      this.searchSubject.next();
      this.searchSubject.pipe(debounceTime(1000)).subscribe(() => {
        // this.APTopology.highlighteds.each(e => {e.visible = true})
        that.APTopology.focus();
        that.APTopology.startTransaction('highlight search');

        if (that.searchText) {
          var safe = that.searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          var regex = new RegExp(safe, 'i');
          var results = that.APTopology.findNodesByExample(
            { label: regex },
            { mac: regex },
            { model: regex }
          );
          that.APTopology.highlightCollection(results);
          that.APTopology.highlighteds.each((e) => {
            let parent = e.findTreeParentNode();
            if (parent) {
              visibleAllChilds(parent);
            }

            function visibleAllChilds(parent) {
              e.visible = true;
              e.expandTree();
              var hasPassedClient = false,
                hasFailedClient = false,
                hasApChild = false;

              parent.findTreeChildrenNodes().each((el) => {
                if (el.data['isPassedClient']) {
                  hasPassedClient = true;
                }
                if (el.data['isFailedClient']) {
                  hasFailedClient = true;
                }
                if (!el.data['isClient']) {
                  hasApChild = true;
                }
                el.visible = true;
                el.expandTree();
                bindButtonValues(
                  el,
                  hasPassedClient,
                  hasFailedClient,
                  hasApChild
                );
              });
              let subParent = parent.findTreeParentNode();
              bindButtonValues(
                parent,
                hasPassedClient,
                hasFailedClient,
                hasApChild
              );
              if (subParent) {
                visibleAllChilds(subParent);
              }
            }

            function bindButtonValues(
              parent,
              hasPassedClient,
              hasFailedClient,
              hasApChild
            ) {
              if (hasPassedClient) {
                that.APTopology.model.set(
                  parent.data,
                  '_othersPassedExpanded',
                  true
                );
              }
              if (hasFailedClient) {
                that.APTopology.model.set(
                  parent.data,
                  '_othersFailedExpanded',
                  true
                );
              }
              if (hasApChild) {
                that.APTopology.model.set(
                  parent.data,
                  '_primariesExpanded',
                  true
                );
              }
            }
            // e.expandTree();
          });
          if (results.count > 0)
            that.APTopology.centerRect(results.first().actualBounds);
        } else {
          // empty string only clears highlighteds collection
          that.APTopology.clearHighlighteds();
        }
        that.APTopology.commitTransaction('highlight search');
        that.searchValue.nativeElement.focus();

        setTimeout(() => {
          that.zoomfunctionalities('ScrollToPart');
        }, 100);
      });
    }
  }

  refreshClick() {
    this.searchText = '';
    this.clientArr = [];
    this.rgArr = [];
    this.nodeDataArray = [];
    this.linkDataArray = [];
    this.APTopology.clearHighlighteds();
    this.getData();
  }

  changeScaleDiagram(scale, type) {
    var oldscale = this.APTopology.scale;
    if (type == 'dropDown') {
      this.APTopology.scale = scale;
    } else if (type == 'decrease') {
      this.APTopology.scale = oldscale - 0.25;
    } else if (type == 'increase') {
      this.APTopology.scale = oldscale + 0.25;
    }
    this.zoomScale = this.APTopology.scale;
    this.updateDivHeight();
  }

  setZoomScaleToFit() {
    let isScroll = false;
    let nativeDiagram: any;
    const el = this.APDiagram.nativeElement;
    this.zoomScale = 1;
    do {
      this.APTopology.scale = this.zoomScale;
      isScroll = false;
    } while (isScroll);

    this.updateDivHeight();
  }

  updateDivHeight() {
    let divElement = document.getElementById('mainDiagram');
    divElement.style.height =
      Number(this.APTopology.documentBounds.height) + 100 + 'px' || '500px';
    this.APTopology.requestUpdate();
  }

  kbpsTO(val, valueOnly?, unitOnly?) {
    let kbpsString = this.api.kbpsTO(val, valueOnly, unitOnly);
    return kbpsString;
  }
  bytesToSize(bytes: any) {
    const units = [
      'bytes',
      'Kbps',
      'Mbps',
      'Gbps',
      'Tbps',
      'Pbps',
      'Ebps',
      'Zbps',
      'Ybps',
    ];
    let l = 0,
      n = parseInt(bytes, 10) || 0;

    while (n >= 1024 && ++l) {
      n = n / 1024;
    }

    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
  }

  scroll() {
    setTimeout(() => {
      this.issueBox.nativeElement.scrollIntoView();
    }, 100);
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.ssoAuthService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }
  closeAlert() {
    this.error = false;
  }

  populateAps(apsData, json, prevElement, uplinkEthernetData) {
    var nodeFreqArr = [];
    var freqArr = [];
    apsData.forEach((element) => {
      let rgMainAPDetails = '';
      let modelName = '';
      let manufactureName = '';
      rgMainAPDetails = element['ip'] ? `IP Address : ${element['ip']}` : ``;
      rgMainAPDetails += element['mac']
        ? `\n MAC Address: ${element['mac']}`
        : ``;
      rgMainAPDetails += element['version']
        ? `\n Software Version : ${element['version']}`
        : ``;
      rgMainAPDetails += element['sn']
        ? `\n Serial Number: ${element['sn']}`
        : ``;
      rgMainAPDetails += element['hostname']
        ? `\n Device : ${element['hostname']}`
        : ``;
      if (this.makemodel) {
        for (let n = 0; n < this.makemodel.length; n++) {
          if (element.sn == this.makemodel[n]['sno']) {
            element['model'] = `${this.makemodel[n]['model']}`;
            modelName = this.makemodel[n]['model'];
            manufactureName = this.makemodel[n]['manufacture'];
          }
        }
      }
      rgMainAPDetails += modelName ? `\n Model : ${modelName}` : ``;
      rgMainAPDetails += manufactureName
        ? `\n Manufacturer : ${manufactureName}`
        : ``;

      if (element['radio-info']) {
        var radioInfo = element['radio-info'];
        var freqBandValue = '';
        let freq_band = '';
        if (radioInfo.length > 0) {
          for (let fband = 0; fband < radioInfo.length; fband++) {
            let fbandValue = radioInfo[fband]['freq-band'] + 'GHz';
            freqArr.push(fbandValue);
            nodeFreqArr.push(radioInfo[fband]['freq-band']);
          }
          freqArr = [...new Set(freqArr)];
          freq_band = freqArr.join(', ');
        }
        rgMainAPDetails += freq_band ? `\n Frequency Band: ${freq_band}` : ``;

        var uniq = [...new Set(nodeFreqArr)];

        uniq.forEach((element) => {
          freqBandValue = freqBandValue + element + 'GHz / ';
        });
        freqBandValue = freqBandValue.slice(0, -3);
      }
      if (element.clients) {
        if (element.clients.length > 0) {
          rgMainAPDetails += element.clients.length
            ? `\n Total Devices: ${element.clients.length}`
            : `\n Total Devices: 0`;
        }
      }
      rgMainAPDetails += element['passed-clients']
        ? `\n Devices without issues and warnings: ${element['passed-clients']}`
        : `\n Devices without issues and warnings: 0`;
      rgMainAPDetails += element['failed-clients']
        ? `\n Devices with issues and warnings: ${element['failed-clients']}`
        : `\n Devices with issues and warnings: 0`;
      rgMainAPDetails += element['ap-tech-note']
        ? `\n Note: ${element['ap-tech-note']}`
        : ``;
      element['tooltip'] = rgMainAPDetails;
      if (element['ap-color'] == 'green') {
        element['color'] = '#f6f8e9';
      } else if (element['ap-color'] == 'red') {
        element['color'] = '#f6e6e8';
      } else if (element['ap-color'] == 'yellow') {
        element['color'] = '#ffff84b5';
      }
      if (element['ap-online'] == 'false') {
        element['color'] = '#f6e6e8';
      }
      element['width'] = 30;
      element['height'] = 30;
      element['source'] = this.accessPointImages[element['ap-color']];
      element['key'] = element.mac;
      if (element['hostname']) {
        element['label'] = `${element['hostname']}`;
      } else {
        element['label'] = `${element['sn']}`;
      }
      element.backhaul['rx-phy-rate'] = element.backhaul['rx-phy-rate']
        ? this.kbpsTO(element.backhaul['rx-phy-rate']) + 'bps'
        : this.kbpsTO(0) + 'bps';
      element.backhaul['tx-phy-rate'] = element.backhaul['tx-phy-rate']
        ? this.kbpsTO(element.backhaul['tx-phy-rate']) + 'bps'
        : this.kbpsTO(0) + 'bps';

      if (element['backhaul']['rssi'] >= -50) {
        element['wirelessIcon'] = this.imagesObj['wireless-green'];
        element['rssi_signal_strength'] = 'Excellent';
      } else if (
        element['backhaul']['rssi'] >= -66 &&
        element['backhaul']['rssi'] <= -51
      ) {
        element['wirelessIcon'] = this.imagesObj['wireless-green'];
        element['rssi_signal_strength'] = 'Good';
      } else if (
        element['backhaul']['rssi'] >= -69 &&
        element['backhaul']['rssi'] <= -67
      ) {
        element['wirelessIcon'] = this.imagesObj['wireless-orange'];
        element['rssi_signal_strength'] = 'Ok';
      } else if (
        element['backhaul']['rssi'] >= -79 &&
        element['backhaul']['rssi'] <= -70
      ) {
        element['wirelessIcon'] = this.imagesObj['wireless-red'];
        element['rssi_signal_strength'] = 'Weak';
      } else if (element['backhaul']['rssi'] <= -80) {
        element['wirelessIcon'] = this.imagesObj['wireless-red'];
        element['rssi_signal_strength'] = 'Very Weak';
      }

      element['ap_rssi'] = element['backhaul']['rssi'];
      element['ap_rssi_signal_strength'] = element['backhaul']['rssi'];
      element['ap_backhaul_tech_note'] =
        element['backhaul']['backhaul-tech-note'] || '-';
      element['ap_rssi_tooltip'] =
        'Signal Strength : ' +
        element['rssi_signal_strength'] +
        '\n' +
        'RSSI : ' +
        element['ap_rssi'] +
        ' dBm' +
        '\n' +
        'Issue(s) : ' +
        element['ap_backhaul_tech_note'];

      this.nodeDataArray.push(element);
      if (this.clientDeviceSSID) {
        var tx_rate = element.backhaul['tx-phy-rate']
          ? ` \n Tx Phy Rate: ${this.kbpsTO(
            element.backhaul['tx-phy-rate']
          )}bps`
          : `\n Tx Phy Rate: ${this.kbpsTO(0)}bps`;
        var rx_rate = element.backhaul['rx-phy-rate']
          ? ` \n Rx Phy Rate: ${this.kbpsTO(
            element.backhaul['rx-phy-rate']
          )}bps`
          : ` \n Rx Phy Rate: ${this.kbpsTO(0)}bps`;
        var backhaul_note = element.backhaul['backhaul-tech-note']
          ? ` \n Backhaul Tech Note : ${element.backhaul['backhaul-tech-note']}`
          : '';
        var channelNumber = element['Channel-number']
          ? `\n Channel: ${element['Channel-number']}`
          : '',
          ssid = {
            text: `ssid`,
            key: `${prevElement.sn}-${element.ssid}`,
            accessPointId: '',
            color: '#f3f3f3',
            label: element.ssid,
            source: 'assets/images/Icon_Device_Wifi scaled.svg',
            freqBand: freqBandValue,
            tooltip: `Connection Type: ${element['int-type']} \n Mac: ${prevElement['mac']} \n SSID: ${element['ssid']} \n Channel: ${element.backhaul['channel']} \n RSSI: ${element.backhaul['rssi']} dBm ${tx_rate} ${rx_rate} ${backhaul_note}`,
            ssidKey: '',
            isAPSSID: true,
          },
          ethernet = {
            text: `ethernet`,
            key: `ethernet-${prevElement.sn}`,
            accessPointId: '',
            color: '#f3f3f3',
            label: 'Ethernet Port',
            source: 'assets/images/ethernet.png',
            width: 17,
            height: 30,
            tooltip: `Connection Type: ${element['int-type']}`,
            isAPSSID: true,
          };
        let trsRecRate = '';
        if (element && element['int-type'] == 'WiFi') {
          trsRecRate = `Transmit rate: ${element.backhaul['tx-phy-rate']} \n Receive rate: ${element.backhaul['rx-phy-rate']}`;
        } else {
          trsRecRate = `Connection Type: LAN`;
        }
        if (element['int-type'] == 'WiFi') {
          if (element.ssid) {
            if (!this.nodeDataArray.find((el) => el.key == ssid.key)) {
              this.nodeDataArray.push(ssid);
              ssid['ssidKey'] = element.ssid;
            }
          }
          if (
            !this.linkDataArray.find(
              (el) => el.from == prevElement['mac'] && el.to == ssid.key
            )
          ) {
            this.linkDataArray.push({
              from: prevElement['mac'],
              to: ssid.key,
              color:
                element['ap-online'] == 'true'
                  ? this.nodeLinkColor['green']
                  : this.nodeLinkColor['red'],
              thick: 2,
              routing: go.Link.Normal,
              name: `Connection Type: ${element['int-type']} \n SSID: ${element['ssid']}`,
            });
          }

          this.linkDataArray.push({
            from: ssid.key,
            to: element.mac,
            color:
              element['ap-online'] == 'true'
                ? this.nodeLinkColor['green']
                : this.nodeLinkColor['red'],
            thick: 2,
            routing: go.Link.Normal,
            name: trsRecRate,
          });
        } else if (
          element['int-type'] === 'eth' ||
          element['int-type'] == 'LAN'
        ) {
          if (element['int-type']) {
            if (!this.nodeDataArray.find((el) => el.key == ethernet.key)) {
              this.nodeDataArray.push(ethernet);
            }
          }
          if (
            !this.linkDataArray.find(
              (el) => el.from == prevElement['mac'] && el.to == ethernet.key
            )
          ) {
            this.linkDataArray.push({
              from: prevElement['mac'],
              to: ethernet.key,
              color:
                element['ap-online'] == 'true'
                  ? this.nodeLinkColor['green']
                  : this.nodeLinkColor['red'],
              thick: 2,
              routing: go.Link.Normal,
              name: `Connection Type: ${ethernet.key}`,
            });
          }

          this.linkDataArray.push({
            from: ethernet.key,
            to: element.mac,
            color:
              element['ap-online'] == 'true'
                ? this.nodeLinkColor['green']
                : this.nodeLinkColor['red'],
            thick: 2,
            routing: go.Link.Normal,
            name: trsRecRate,
          });
        }
      } else {
        if (element['int-type'] === 'eth' || element['int-type'] === 'LAN') {
          let color = 'black';
          this.nodeDataArray.push(uplinkEthernetData);
          this.linkDataArray.push({
            from: prevElement['mac'],
            to: uplinkEthernetData.key,
            color:
              element['ap-online'] == 'true'
                ? this.nodeLinkColor['green']
                : this.nodeLinkColor['red'],
            thick: 2,
            routing: go.Link.Normal,
            name: `${prevElement['hostname']} to Ethernet`,
          });
          this.linkDataArray.push({
            from: uplinkEthernetData.key,
            to: element.mac,
            color:
              element['ap-online'] == 'true'
                ? this.nodeLinkColor['green']
                : this.nodeLinkColor['red'],
            thick: 2,
            routing: go.Link.Normal,
            name: `Ethernet to ${element.hostname}`,
          });
        } else {
          let trsRecRate = '';
          if (element && element['int-type'] == 'WiFi') {
            trsRecRate = `Transmit rate: ${element.backhaul['tx-phy-rate']} \n Receive rate: ${element.backhaul['rx-phy-rate']}`;
          } else {
            trsRecRate = `Connection Type: LAN`;
          }
          this.linkDataArray.push({
            from: prevElement['mac'],
            to: element.mac,
            color:
              element['ap-online'] == 'true'
                ? this.nodeLinkColor['green']
                : this.nodeLinkColor['red'],
            thick: 2,
            routing: go.Link.Normal,
            name: trsRecRate,
          });
        }
      }

      // Check for child node
      if (Array.isArray(element.aps) && element.aps.length > 0) {
        this.populateAps(element.aps, json, element, uplinkEthernetData);
      }
    });
  }

  populateClientDevices(clientDevices, parentNode) {
    var freqBandPassedArr = [];
    var freqBandFailedArr = [];
    clientDevices.forEach((element) => {
      this.clientNodeDetails(element);
      element['key'] = element.mac;

      var signalStatus = element['signal-strength-test-result'];
      var legacyStatus = element['legacy-device-test-result'];
      var phyRateTestResult = element['phy-rate-test-result'];
      let linkDetails = '';
      if (element['signal-strength']) {
        linkDetails += `RSSI: ${element['signal-strength']} dBm`;
      }
      if (element['wifi-mode']) {
        linkDetails += `\n Mode: ${element['wifi-mode']}`;
      }
      if (element['DS-phy-rate']) {
        linkDetails +=
          '\n DS Phy Rate: ' + this.kbpsTO(element['DS-phy-rate']) + 'bps';
      } else {
        linkDetails += '\n DS Phy Rate: ' + this.kbpsTO(0) + 'bps';
      }
      if (element['US-phy-rate']) {
        linkDetails +=
          '\n US Phy Rate: ' + this.kbpsTO(element['US-phy-rate']) + 'bps';
      } else {
        linkDetails += '\n US Phy Rate: ' + this.kbpsTO(0) + 'bps';
      }
      if (element['freq-band']) {
        linkDetails += `\n Band: ${element['freq-band']}GHz`;
      }
      if (element['intf-type'] == 'WiFi') {
        if (element['ssid']) {
          linkDetails += `\n SSID: ${element['ssid']}`;
        }
      }
      linkDetails += `\n Connection Type: ${element['intf-type']}`;
      var eachLine = linkDetails.split('\n');
      if (eachLine.length - 1 == 1) {
        linkDetails += `\n`;
      }
      let clientHostname = '';
      if (element.hostname) {
        clientHostname = element.hostname;
      } else {
        clientHostname = element['mac'];
      }
      // linkDetails = linkDetails.replace(/[^\x20-\x7E]/gmi, "");
      element['label'] = element.hostname;
      element['tooltip'] = this.clientDetails;
      element['width'] = 30;
      element['height'] = 30;
      element['model'] = element['fingerprint-model'];
      if (
        signalStatus == 'PASS' &&
        legacyStatus == 'PASS' &&
        phyRateTestResult == 'PASS'
      ) {
        element['color'] = this.nodeColor.green;
      } else {
        element['color'] = this.nodeColor.red;
      }

      //source image for clients
      if (
        element['client-type'] != 30 &&
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(element['client-type'])
      ) {
        element['source'] = this.clientDevicesImages[element['client-type']];
      } else if (element['client-type'] == 30) {
        element['source'] = this.clientDevicesImages[12];
      } else {
        element['source'] = this.clientDevicesImages[13];
      }
      this.nodeDataArray.push(element);
      var withoutSSID = {};
      if (
        signalStatus == 'PASS' &&
        legacyStatus == 'PASS' &&
        phyRateTestResult == 'PASS'
      ) {
        withoutSSID = {
          from: parentNode.key,
          to: element.key,
          color: this.nodeLinkColor.green,
          thick: 2,
          routing: go.Link.Normal,
          name: linkDetails,
        };
      } else {
        withoutSSID = {
          from: parentNode.key,
          to: element.key,
          color: this.nodeLinkColor.red,
          thick: 2,
          routing: go.Link.Normal,
          name: linkDetails,
        };
      }
      if (this.clientDeviceSSID) {
        element['isSSIDClient'] = true;
        var channelNumber = element['Channel-number']
          ? `\n Channel: ${element['Channel-number']}`
          : '',
          ssid = {
            text: `ssid`,
            key: `${parentNode.sn}-${element.ssid}-client`,
            accessPointId: '',
            color: '#f3f3f3',
            label: element.ssid,
            source: 'assets/images/Icon_Device_Wifi scaled.svg',
            freqBand: element['freq-band'],
            tooltip: `Connection Type: ${element['intf-type']} \n Mac: ${element['mac']} \n SSID: ${element['ssid']} \n Frequency Band: ${element['freq-band']}GHz ${channelNumber}`,
            ssidKey: '',
            isClient: true,
            isSSID: true,
          },
          ethernet = {
            text: `ethernet`,
            key: `ethernet-${parentNode.sn}-client`,
            accessPointId: '',
            color: '#f3f3f3',
            label: 'Ethernet Port',
            source: 'assets/images/ethernet.png',
            width: 17,
            height: 30,
            tooltip: `Connection Type: ${element['intf-type']}`,
            isClient: true,
            isSSID: true,
          };
        if (element['isPassedClient']) {
          ssid['isPassedClient'] = true;
          ethernet['isPassedClient'] = true;
          ssid['key'] = ssid['key'] + 'isPassedClient';
          ethernet['key'] = ethernet['key'] + 'isPassedClient';
        } else {
          ssid['isFailedClient'] = true;
          ethernet['isFailedClient'] = true;
          ssid['key'] = ssid['key'] + 'isFailedClient';
          ethernet['key'] = ethernet['key'] + 'isFailedClient';
        }
        if (element['intf-type'] == 'WiFi') {
          let freqBandValue = '';
          var uniq = [];
          if (element['isPassedClient']) {
            freqBandPassedArr.push(element['freq-band']);
            uniq = [...new Set(freqBandPassedArr)];
          } else {
            freqBandFailedArr.push(element['freq-band']);
            uniq = [...new Set(freqBandFailedArr)];
          }
          uniq.forEach((element) => {
            freqBandValue = freqBandValue + element + 'GHz / ';
          });
          freqBandValue = freqBandValue.slice(0, -3);
          ssid['freqBand'] = freqBandValue;

          if (element.ssid) {
            var isSSIDExist = this.nodeDataArray.find(
              (el) => el.key == ssid.key && !el['isAPSSID']
            );
            if (!isSSIDExist) {
              this.nodeDataArray.push(ssid);
              ssid['ssidKey'] = element.ssid;
            } else {
              isSSIDExist['freqBand'] = freqBandValue;
            }
          }
          if (
            !this.linkDataArray.find(
              (el) => el.from == parentNode.key && el.to == ssid.key
            )
          ) {
            this.linkDataArray.push({
              from: parentNode.key,
              to: ssid.key,
              color:
                signalStatus == 'PASS' &&
                  legacyStatus == 'PASS' &&
                  phyRateTestResult == 'PASS'
                  ? this.nodeLinkColor.green
                  : this.nodeLinkColor.red,
              thick: 2,
              routing: go.Link.Normal,
              name: linkDetails,
            });
          }

          this.linkDataArray.push({
            from: ssid.key,
            to: element.key,
            color:
              signalStatus == 'PASS' &&
                legacyStatus == 'PASS' &&
                phyRateTestResult == 'PASS'
                ? this.nodeLinkColor.green
                : this.nodeLinkColor.red,
            thick: 2,
            routing: go.Link.Normal,
            name: linkDetails,
          });
        } else if (
          element['intf-type'] === 'eth' ||
          element['intf-type'] == 'LAN'
        ) {
          if (element['intf-type']) {
            if (
              !this.nodeDataArray.find(
                (el) => el.key == ethernet.key && !el['isAPSSID']
              )
            ) {
              this.nodeDataArray.push(ethernet);
            }
          }

          if (
            !this.linkDataArray.find(
              (el) => el.from == parentNode.key && el.to == ethernet.key
            )
          ) {
            this.linkDataArray.push({
              from: parentNode.key,
              to: ethernet.key,
              color:
                signalStatus == 'PASS' &&
                  legacyStatus == 'PASS' &&
                  phyRateTestResult == 'PASS'
                  ? this.nodeLinkColor.green
                  : this.nodeLinkColor.red,
              thick: 2,
              routing: go.Link.Normal,
              name: ethernet.tooltip,
            });
          }

          this.linkDataArray.push({
            from: ethernet.key,
            to: element.key,
            color:
              signalStatus == 'PASS' &&
                legacyStatus == 'PASS' &&
                phyRateTestResult == 'PASS'
                ? this.nodeLinkColor.green
                : this.nodeLinkColor.red,
            thick: 2,
            routing: go.Link.Normal,
            name: ethernet.tooltip,
          });
        }
      } else {
        if (
          signalStatus == 'PASS' &&
          legacyStatus == 'PASS' &&
          phyRateTestResult == 'PASS'
        ) {
          element['isPassedClient'] = true;
        } else {
          element['isFailedClient'] = true;
        }
        element['isClient'] = true;
        this.linkDataArray.push(withoutSSID);
      }
    });
  }
  ngOnDestroy() { }
}

import {
  // fromLinkable: true, toLinkable: true
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import * as go from 'gojs';
// import { ZoomSlider } from 'gojs/extensionsTS/ZoomSlider'
import { TranslateService } from 'src/app-services/translate.service';
import { IssueService } from '../issues/service/issue.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { IncrementalLayoutService } from '../shared/services/incremental-layout.service';
import { forkJoin, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommandHandler } from 'gojs';

@Component({
  selector: 'app-network-topology',
  templateUrl: './network-topology.component.html',
  styleUrls: ['./network-topology.component.scss'],
})
export class NetworkTopologyComponent implements OnInit {
  public topoGraph = go.GraphObject.make;
  language;
  languageSubject;
  currentDiagram: any;
  regionDiagram: any;
  locationDiagram: any;
  systemDiagram: any;
  loading: boolean = false;
  listObs: any;
  canApplyFilter: boolean = false;
  allLocationData: Array<any>;
  regionsSubject: any;
  locationsSubject: any;
  systemsSubject: any;
  applyDisabled: boolean = false;

  systemEventError: boolean = false;
  locationEventError: boolean = false;
  regionEventError: boolean = false;
  errorInfo: any;
  error: any;
  systemEventErrorInfo: any;
  locationEventErrorInfo: any;
  regionEventErrorInfo: any;

  regionSelected: any;
  searchSelected: any;
  regionsTopologyData = [{ id: 'All', name: 'All' }];
  regionPostions = [];
  locationPostions = [];
  systemPostions = [];
  regionsDataArray = ['All'];
  searchDataArray = ['All'];
  locationSelected: any;
  locationDataArray = ['All'];
  locationsTopologyData = [{ id: 'All', name: 'All' }];
  systemSelected: any;
  systemDataArray = ['All'];
  systemTopologyData = [{ id: 'All', name: 'All' }];

  regionName: any;
  locationName: any;
  systemName: any;
  regionSubscribe: any;
  regionErrorInfo: any;

  systemError: boolean = false;
  locationError: boolean = false;
  regionError: boolean = false;

  alarmType: any = 'Alarm';
  alarmBy: any = '';
  alarmEventName: any = '';

  cloudImages = {
    green: 'assets/img/Icon_Device_Cloud_Green.svg',
    red: 'assets/img/Icon_Device_Cloud_Red.svg',
    yellow: 'assets/img/Icon_Device_Cloud_Yellow.svg',
    orange: 'assets/img/Icon_Device_Cloud_Orange.svg',
  };

  baseUrl = `${environment.API_BASE_URL}analytics-engine/`;
  deviceBaseUrl = `${environment.API_BASE_URL}cnap/invmgr/`;
  topologyUrl = `${environment.API_BASE_URL}topology/`;
  url = '';
  topologyFilteredRegions: any;

  topologyFilteredLocations: any;

  topologySystems = [{ id: 'All', name: 'All' }];
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
  clickedRegion: string;
  clickedLocation: string;
  cloudElement: Element;
  loadRegion: boolean;
  loadLocation: boolean;
  loadSystem: boolean;
  breadCrumbRegion: string = 'All';
  breadCrumbLocation: string = 'All';
  breadCrumbSystem: string = 'All';
  topoUrl: string;
  filteredRegions: { id: string; name: string }[];
  filteredLocations: { id: string; name: string }[];
  filteredSystems: { id: string; name: string }[];
  noData: boolean = false;
  @ViewChild('networkTopology') networkTopology;
  @ViewChild('searchBar') searchBar: ElementRef;
  roundedRectangleParams = {
    parameter1: 2, // set the rounded corner
    spot1: go.Spot.TopLeft,
    spot2: go.Spot.BottomRight, // make content go all the way to inside edges of rounded corners
  };
  initialAllLocation: boolean;
  systemLinksData = [];
  systemDevicesData = [];
  constructor(
    private commonOrgService: CommonService,
    private http: HttpClient,
    private issueService: IssueService,
    private translateService: TranslateService,
    private changeDetector: ChangeDetectorRef,
  ) {
    go.Diagram.licenseKey =
      '73f946e4b56e28a800ca0d2b113f69ed1bb37f3b9e8c1bf0595446a7ef0b6d173089ef2802868ac582ff19fd1829c0dcd5c46c7a9e1c0138e132d38c40e485ade16477b6435b448da3012f90ccaf2ff5ac2f77a0c3b672a68a70dff6eea8c59a59eff5861ace1cab2f2d5637562cff4ba5ebda7afa02d349746d9a';

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data: any) => {
        this.language = data;
      }
    );
  }

  ngOnInit(): void {
    this.regionsApiLoader();
    setTimeout(() => {
      this.loadIntialData();
    }, 1000);
  }

  ngAfterViewInit() { }

  regionsApiLoader() {
    this.regionSelected = 'All';
    this.locationSelected = 'All';
    this.systemSelected = 'All';
    this.regionsSubject = this.issueService.getRegions().subscribe(
      (res: any) => {
        res.sort();
        this.regionsDataArray = [...this.regionsDataArray, ...res];
      },
      (error) => { }
    );
  }

  async changeDynamicSize(diagramLevel) {
    const el = this.networkTopology.nativeElement;
    if (diagramLevel != 'System') {
      let ratio = 0.69;
      let size = 130;
      this.changeDetector.detectChanges();

      let isScroll = false;

      do {
        console.log(size, isScroll, 'Check');
        if (isScroll) {
          this.clearDiagram();
        }

        let fontSize =
          size > 100
            ? '12'
            : size >= 80 && size <= 100
              ? '10'
              : size >= 60 && size <= 80
                ? '8'
                : size >= 40 && size <= 60
                  ? '6'
                  : size >= 20 && size <= 40
                    ? '4'
                    : '2';

        fontSize += 'px sans-serif';

        if (diagramLevel == 'Region') {
          this.regionsTopologyData.forEach((el) => {
            if (!el['isLocated']) {
              delete el['loc'];
            }
          });
          await this.loadRegionDiagram(
            size,
            Math.round(size * ratio),
            fontSize
          );
        } else if (diagramLevel == 'Location') {
          this.locationsTopologyData.forEach((el) => {
            if (!el['isLocated']) {
              delete el['loc'];
            }
          });
          await this.loadLocationDiagram(
            size,
            Math.round(size * ratio),
            fontSize
          );
        }

        this.changeDetector.detectChanges();
        size = size - 10;
        const content: any = el.querySelector('div');
        isScroll = content.offsetHeight < content.scrollHeight;

        if (size <= 20) {
          isScroll = false;
        }
      } while (isScroll);
    } else {
      await this.loadSystemDiagram();
    }

    this.setZoomScaleToFit();
    // this.enableAllCommandHandler();
    // this.zoomfunctionalities('Fit');
    const canvas: any = el.querySelector('canvas');
    canvas['style']['outline'] = 'none';

    this.loading = false;
  }

  setZoomScaleToFit() {
    let isScroll = false;
    const el = this.networkTopology.nativeElement;
    this.zoomScale = 1;
    let currentDiagram =
      this.currentDiagram == 'Regions'
        ? this.regionDiagram
        : this.currentDiagram == 'Locations'
          ? this.locationDiagram
          : this.systemDiagram;
    do {
      currentDiagram.scale = this.zoomScale;
      this.changeDetector.detectChanges();
      const content: any = el.querySelector('div');
      isScroll = content.offsetHeight < content.scrollHeight;

      if (isScroll) {
        this.zoomScale -= 0.25;
      }
      if (this.zoomScale <= 0.25) {
        this.zoomScale += 0.25;
        isScroll = false;
      }
    } while (isScroll);
  }

  loadRegionDiagram(cloudWidth, cloudHeight, fontSize) {
    return new Promise((resolve, reject) => {
      // Region diagram
      this.currentDiagram = 'Regions';

      this.regionDiagram = this.topoGraph(go.Diagram, 'networkTopology', {
        // contentAlignment: go.Spot.Left,
        // initialDocumentSpot: go.Spot.Left,
        'undoManager.isEnabled': true,
        scale: 1,
        minScale: 0.25,
        maxScale: 2,
        // autoScale: go.Diagram.Uniform,
        layout: this.topoGraph(go.GridLayout, {
          spacing: new go.Size(10, 10),
        }),
        InitialLayoutCompleted: function (e) {
          if (
            !e.diagram.nodes.all(function (n) {
              return n.location.isReal();
            })
          ) {
            e.diagram.layoutDiagram(true);
          }
          resolve(true);
        },
      });

      this.regionDiagram.nodeTemplate = this.topoGraph(
        go.Node,
        'Vertical',
        {
          // resizable : true,
          // resizeObjectName: "SHAPE",

          // for nor horizontal dragging
          // minLocation: new go.Point(-Infinity, NaN), maxLocation: new go.Point(Infinity, NaN) ,
          dragComputation: this.avoidNodeOverlap,
          selectionAdorned: false,
          click: (data, obj) => {
            this.onClickDiagrams('Location', obj.part.data.region);
          },
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),

        this.topoGraph(
          go.Picture,
          {
            // name: "SHAPE",
            desiredSize: new go.Size(cloudWidth, cloudHeight),
            minSize: new go.Size(30, 20.7),
          },
          new go.Binding('source')
        ),

        this.topoGraph(
          go.TextBlock,
          {
            // maxSize: new go.Size(40, 50),
            maxSize: new go.Size(cloudWidth, cloudHeight),
            // maxSize: new go.Size(NaN, NaN) ,
            stroke: 'black',
            maxLines: 1,
            font: fontSize,
            // font:
            //   this.regionsTopologyData.length < 20
            //     ? '12px sans-serif'
            //     : '2px sans-serif',

            overflow: go.TextBlock.OverflowClip,
            // wrap : go.TextBlock.WrapDesiredSize,
          },
          new go.Binding('font', '2px sans-serif'),
          new go.Binding('text', 'region')
        )

        // new go.Binding('visible', 'region', function (l) {
        //   return l != 'All' ? true : false;
        // })
      );
      console.log(this.regionsTopologyData, 'Diagram');
      this.regionDiagram.model = new go.GraphLinksModel(
        this.regionsTopologyData
      );
    });
  }

  loadLocationDiagram(cloudWidth, cloudHeight, fontSize) {
    return new Promise((resolve, reject) => {
      this.currentDiagram = 'Locations';

      console.log(this.locationsTopologyData);
      // Location diagram

      this.locationDiagram = this.topoGraph(go.Diagram, 'networkTopology', {
        // contentAlignment: go.Spot.Left,
        'undoManager.isEnabled': true,
        scale: 1,
        minScale: 0.25,
        maxScale: 2,
        // autoScale: go.Diagram.Uniform,
        layout: this.topoGraph(go.GridLayout, {
          spacing: new go.Size(10, 10),
        }),
        // InitialLayoutCompleted: enableZoomToFit,
        InitialLayoutCompleted: (e) => {
          // enableAllCommandHandler();
          if (
            !e.diagram.nodes.all(function (n) {
              return n.location.isReal();
            })
          ) {
            e.diagram.layoutDiagram(true);
          }
          resolve(true);
        },
      });

      this.locationDiagram.nodeTemplate = this.topoGraph(
        go.Node,
        'Vertical',
        {
          // visible: false,
          dragComputation: this.avoidNodeOverlap,
          selectionAdorned: false,
          click: (data, obj) => {
            this.onClickDiagrams('System', obj.part.data.location);
          },
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),

        // new go.Binding('location', 'loc', go.Point.parse),

        this.topoGraph(
          go.Picture,
          {
            desiredSize: new go.Size(cloudWidth, cloudHeight),
            minSize: new go.Size(30, 20.7),
          },
          new go.Binding('source')
        ),

        // this.topoGraph(go.Shape, "Rectangle", { fill: 'lime' }),
        this.topoGraph(
          go.TextBlock,
          {
            // margin: 5,
            // maxSize: new go.Size(40, 50),
            maxSize: new go.Size(cloudWidth, cloudHeight),
            font: fontSize,
            maxLines: 1,
            // font:
            //   this.locationDataArray.length < 20
            //     ? '12px sans-serif'
            //     : '5px sans-serif',
            stroke: 'black',
            overflow: go.TextBlock.OverflowClip,
          },
          new go.Binding('text', 'location')
        )
        // new go.Binding('visible', 'id', function (l) {
        //   return l != 'All' ? true : false;
        // })
      );

      this.locationDiagram.model = new go.GraphLinksModel(
        this.locationsTopologyData
      );
    });
  }

  loadSystemDiagram() {
    return new Promise((resolve, reject) => {
      this.currentDiagram = 'Systems';
      let linkDataArray = [];
      let nodeDataArray = [];

      this.systemDiagram = this.topoGraph(go.Diagram, 'networkTopology', {
        contentAlignment: go.Spot.Center,
        'undoManager.isEnabled': true,
        // autoScale: go.Diagram.Uniform,
        scale: 1,
        minScale: 0.25,
        maxScale: 2,
        layout: this.topoGraph(go.LayeredDigraphLayout, {
          direction: linkDataArray.length > 0 ? 0 : 90,
          layerSpacing: 150,
          columnSpacing: 60,
          linkSpacing: 0,
          isInitial: false,
          isOngoing: false,
        }),
        InitialLayoutCompleted: function (e) {
          // if not all Nodes have real locations, force a layout to happen
          if (
            !e.diagram.nodes.all(function (n) {
              return n.location.isReal();
            })
          ) {
            e.diagram.layoutDiagram(true);
          }
          resolve(true);
        },
      });

      var subNode = this.topoGraph(
        go.Node,
        'Auto',
        {
          // visible: false,
          selectionAdorned: false,
          // selectionAdornmentTemplate:  // selection adornment to match shape of nodes
          //     this.topoGraph(go.Adornment, "Auto",
          //       this.topoGraph(go.Shape, "RoundedRectangle", this.roundedRectangleParams,
          //         { fill: null, stroke: "#7986cb", strokeWidth: 3 }
          //       ),
          //       this.topoGraph(go.Placeholder)
          //     )  // end Adornment
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        this.topoGraph(
          go.Shape,
          'RoundedRectangle',
          this.roundedRectangleParams,
          {
            width: 100,
            height: 100,
            name: 'SHAPE',
            fill: '#ffffff',
            strokeWidth: 0,
          },
          // gold if highlighted, white otherwise
          new go.Binding('fill', 'isHighlighted', function (h) {
            return h ? 'gold' : '#ffffff';
          }).ofObject()
        ),

        //circle

        this.topoGraph(
          go.Panel,
          'Vertical',

          this.topoGraph(
            go.Panel,
            'Vertical',

            this.topoGraph(
              go.Panel,
              'Auto',
              {
                // alignment: go.Spot.TopRight,
                visible: false,
                width: 70,
                // margin: new go.Margin(0, 0, 2, 60),
                toolTip: this.topoGraph(
                  'ToolTip',
                  {
                    'Border.stroke': '#41397B',
                    'Border.strokeWidth': 2,
                  },

                  this.topoGraph(
                    go.TextBlock,
                    'onts & Rgs',
                    {
                      margin: 4,
                      overflow: go.TextBlock.OverflowClip,
                    },
                    {
                      alignment: go.Spot.Top,
                      alignmentFocus: go.Spot.Bottom,
                      stroke: '#41397B',
                    },
                    {
                      alignment: go.Spot.Bottom,
                      alignmentFocus: go.Spot.Top,
                      stroke: '#41397B',
                    },
                    { font: 'bold 12px' },
                    new go.Binding('text', '', function (data) {
                      return data.countRgs.concat('\n', data.countOnts);
                    })
                  )
                ),
              },
              this.topoGraph(go.Shape, 'Circle', {
                // alignment : go.Spot.Right,
                width: 25,
                height: 25,
                fill: 'white',
                stroke: '#41397B',
                strokeWidth: 1,
                margin: new go.Margin(0, 0, 2, 40),
              }),

              this.topoGraph(
                go.TextBlock,
                {
                  font: '10px sans-serif',
                  overflow: go.TextBlock.OverflowClip,
                },
                new go.Binding('text', 'passedClients', function (l) {
                  return l ? l : '';
                })
              ),

              new go.Binding('visible', 'tenantId', function (l) {
                return l ? true : false;
              })
            )
          ),
          //Sub node
          this.topoGraph(
            go.Panel,
            'Auto',
            {
              margin: new go.Margin(0, 0, 0, 0),
              toolTip: this.topoGraph(
                'ToolTip',
                {
                  'Border.stroke': '#41397B',
                  'Border.strokeWidth': 2,
                },

                this.topoGraph(
                  go.TextBlock,
                  {
                    margin: 4,
                    overflow: go.TextBlock.OverflowClip,
                  },
                  {
                    alignment: go.Spot.Top,
                    alignmentFocus: go.Spot.Bottom,
                    stroke: '#41397B',
                  },
                  {
                    alignment: go.Spot.Bottom,
                    alignmentFocus: go.Spot.Top,
                    stroke: '#41397B',
                  },
                  { font: 'bold 12px' },
                  new go.Binding('text', '', function (data) {
                    return data.fqn
                      .replace('DEVICE=', '')
                      .concat('\n ( ', data.name, ' )');
                  })
                )
              ),
            },

            // new go.Binding('alignment', 'alignNode'),

            {
              // background: 'rgba(255,0,0,0.1)',
              alignmentFocusName: 'shape',
              // alignment: go.Spot.Right,
              // alignment: new go.Binding('Spot', 'position', function(l){return l? l : ''}),
              // alignmentFocus: go.Spot.BottomLeft
            },

            this.topoGraph(
              go.Shape,
              'RoundedRectangle',
              {
                parameter1: 10,
                margin: new go.Margin(0, 0, 0, 0),
                width: 80,
                height: 40,
                // maxSize: new go.Size(200, 30),
                fill: 'white',
                stroke: '#41397B',
                strokeWidth: 3,
              }
              // new go.Binding("text", "key", function (l) { return l ? l : '' })
            ),
            this.topoGraph(
              go.Panel,
              'horizontal',
              {
                alignment: go.Spot.Left,
              },
              this.topoGraph(
                go.Shape,
                'RoundedRectangle',
                {
                  parameter1: 5,
                  // alignment: go.Spot.Left,
                  margin: new go.Margin(2, 2, 2, 2),
                  width: 32,
                  height: 30,
                  // maxSize: new go.Size(40, 30),
                  fill: 'rgb(77, 68, 147)',
                }
                // new go.Binding("text", "key", function (l) { return l ? l : '' })
              ),

              this.topoGraph(
                go.TextBlock,
                {
                  stroke: 'white',
                  font: '15px sans-serif',
                  // alignment: go.Spot.Center,
                  margin: new go.Margin(5, 0, 0, 2),
                  maxSize: new go.Size(100, 30),
                  overflow: go.TextBlock.OverflowClip,
                  // isMultiline: false,
                  // click: () => {
                  //   alert('label clicked');
                  // }
                },
                new go.Binding('text', '', function (data) {
                  return data.deviceModel.replace(' System', '');
                })

                // new go.Binding('text', 'deviceModel', function (l) {
                //   return l ? l : '';
                // })
              )
            ),

            this.topoGraph(
              go.Panel,
              'horizontal',
              {
                alignment: go.Spot.Right,
              },
              this.topoGraph(
                go.Shape,
                'RoundedRectangle',
                {
                  parameter1: 5,
                  // alignment: go.Spot.Right,
                  margin: new go.Margin(2, 2, 2, 2),
                  width: 32,
                  height: 30,
                  // maxSize: new go.Size(40, 30),
                  fill: 'rgb(77, 68, 147)',
                }
                // new go.Binding("text", "ap2", function (l) { return l ? l : '' })
              ),
              this.topoGraph(
                go.TextBlock,
                {
                  // alignment: go.Spot.Center,
                  stroke: 'white',
                  font: '15px sans-serif',
                  margin: new go.Margin(15, 0, 0, 5),
                  maxSize: new go.Size(100, 30),
                  // isMultiline: false,
                  overflow: go.TextBlock.OverflowClip,
                  // click: () => {
                  //   alert('label clicked');
                  // }
                },
                new go.Binding('text', 'type', function (l) {
                  return l ? l : '';
                })
              )
            )
          ),

          //Bottom Text

          this.topoGraph(
            go.Panel,
            'Vertical',
            {
              width: 80,
              // height : 50
            },

            new go.Binding('margin', 'name', function (l) {
              return l ? new go.Margin(5, 0, 0, 0) : '';
            }),
            new go.Binding('background', 'name', function (l) {
              return l ? '#eaeaea' : '';
            }),
            new go.Binding('padding', 'name', function (l) {
              return l ? 3 : '';
            }),

            this.topoGraph(
              go.TextBlock,
              {
                margin: new go.Margin(0, 0, 0, 0),
                maxSize: new go.Size(80, 30),
                isMultiline: false,
                maxLines: 1,
                font: 'bold 10px sans-serif',
                // click: () => {
                //   alert('label clicked');
                // }
              },
              new go.Binding('text', '', function (data) {
                return data.name;
              })
            )
          )
        )
        // new go.Binding('visible', 'subnode', function (l) {
        //   return l ? true : false;
        // })
      );

      var mainNode = this.topoGraph(
        go.Node,
        'Auto',

        //circle

        {
          // visible: false,
          selectionAdorned: false,
          // selectionAdornmentTemplate:  // selection adornment to match shape of nodes
          //     this.topoGraph(go.Adornment, "Auto",
          //       this.topoGraph(go.Shape, "RoundedRectangle", this.roundedRectangleParams,
          //         { fill: null, stroke: "#7986cb", strokeWidth: 3 }
          //       ),
          //       this.topoGraph(go.Placeholder)
          //     )  // end Adornment
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        this.topoGraph(
          go.Shape,
          'RoundedRectangle',
          this.roundedRectangleParams,
          {
            width: 110,
            height: 100,
            name: 'SHAPE',
            fill: '#ffffff',
            strokeWidth: 0,
          },
          // gold if highlighted, white otherwise
          new go.Binding('fill', 'isHighlighted', function (h) {
            return h ? 'gold' : '#ffffff';
          }).ofObject()
        ),

        this.topoGraph(
          go.Panel,
          'Vertical',

          this.topoGraph(
            go.Panel,
            'Vertical',

            this.topoGraph(
              go.Panel,
              'Auto',
              {
                // alignment: go.Spot.TopRight,
                visible: false,
                width: 70,
                // margin: new go.Margin(0, 0, 2, 60),
                toolTip: this.topoGraph(
                  'ToolTip',
                  {
                    'Border.stroke': '#41397B',
                    'Border.strokeWidth': 2,
                  },

                  this.topoGraph(
                    go.TextBlock,
                    'onts & Rgs',
                    {
                      margin: 4,
                      overflow: go.TextBlock.OverflowClip,
                    },
                    {
                      alignment: go.Spot.Top,
                      alignmentFocus: go.Spot.Bottom,
                      stroke: '#41397B',
                    },
                    {
                      alignment: go.Spot.Bottom,
                      alignmentFocus: go.Spot.Top,
                      stroke: '#41397B',
                    },
                    { font: 'bold 12px' },
                    new go.Binding('text', '', function (data) {
                      return data.countRgs.concat('\n', data.countOnts);
                    })
                  )
                ),
              },
              this.topoGraph(go.Shape, 'Circle', {
                // alignment : go.Spot.Right,
                width: 25,
                height: 25,
                fill: 'white',
                stroke: '#41397B',
                strokeWidth: 1,
                margin: new go.Margin(0, 0, 2, 40),
              }),

              this.topoGraph(
                go.TextBlock,
                {
                  font: '10px sans-serif',
                  overflow: go.TextBlock.OverflowClip,
                },
                new go.Binding('text', 'passedClients', function (l) {
                  return l ? l : '';
                })
              ),

              new go.Binding('visible', 'passedClients', function (l) {
                return l ? true : false;
              })
            )
          ),
          //main node

          this.topoGraph(
            go.Panel,
            'Auto',
            {
              visible: false,
            },

            this.topoGraph(
              go.Shape,
              'RoundedRectangle',
              {
                parameter1: 10,
                margin: new go.Margin(0, 0, 0, 0),
                width: 100,
                height: 40,
                // maxSize: new go.Size(200, 30),
                fill: '#41397B',
                stroke: '#41397B',
                strokeWidth: 3,
              }
              // new go.Binding("text", "key", function (l) { return l ? l : '' })
            ),

            this.topoGraph(
              go.TextBlock,
              {
                stroke: 'white',
                font: '18px sans-serif',
                alignment: go.Spot.Left,
                margin: new go.Margin(5, 0, 0, 2),
                maxSize: new go.Size(100, 30),
                overflow: go.TextBlock.OverflowClip,
                // isMultiline: false,
                // click: () => {
                //   alert('label clicked');
                // }
              },
              new go.Binding('text', 'ap1', function (l) {
                return l ? l : '';
              })
            )
          ),

          //Bottom Text

          this.topoGraph(
            go.Panel,
            'Vertical',
            {
              width: 80,
              // height : 50
            },

            new go.Binding('margin', 'deviceName', function (l) {
              return l ? new go.Margin(5, 0, 0, 0) : '';
            }),
            new go.Binding('background', 'deviceName', function (l) {
              return l ? '#eaeaea' : '';
            }),
            new go.Binding('padding', 'deviceName', function (l) {
              return l ? 3 : '';
            }),

            this.topoGraph(
              go.TextBlock,
              {
                margin: new go.Margin(0, 0, 0, 0),
                maxSize: new go.Size(80, 30),
                isMultiline: false,
                maxLines: 1,
                font: 'bold 10px sans-serif',
                // click: () => {
                //   alert('label clicked');
                // }
              },
              new go.Binding('text', '', function (data) {
                return data.deviceName
                  .replace('DEVICE=', '')
                  .concat('\n ( ', data.name, ' )');
              })
            )
          )
        )
        // new go.Binding('visible', 'mainnode', function (l) {
        //   return l ? true : false;
        // })
      );

      var templmap = new go.Map<string, go.Node>();
      templmap.add('Sub', subNode);
      // templmap.add('Main', mainNode);
      this.systemDiagram.nodeTemplateMap = templmap;

      this.systemDiagram.nodeTemplate = this.topoGraph(
        go.Node,
        'Auto',
        {
          // layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
          selectionAdorned: false,
          // selectionAdornmentTemplate:  // selection adornment to match shape of nodes
          //     this.topoGraph(go.Adornment, "Auto",
          //       this.topoGraph(go.Shape, "RoundedRectangle", this.roundedRectangleParams,
          //         { fill: null, stroke: "#7986cb", strokeWidth: 3 }
          //       ),
          //       this.topoGraph(go.Placeholder)
          //     )  // end Adornment
        },

        this.topoGraph(
          go.Shape,
          'RoundedRectangle',
          this.roundedRectangleParams,
          {
            width: 100,
            height: 100,
            name: 'SHAPE',
            fill: '#ffffff',
            strokeWidth: 0,
          },
          // gold if highlighted, white otherwise
          new go.Binding('fill', 'isHighlighted', function (h) {
            return h ? 'gold' : '#ffffff';
          }).ofObject()
        ),

        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),

        // ring node

        this.topoGraph(
          go.Panel,
          'Vertical',
          {
            visible: false,
            // background : 'red'
          },

          this.topoGraph(
            go.Panel,
            'Auto',
            {
              alignment: go.Spot.TopRight,
              visible: false,
              toolTip: this.topoGraph(
                'ToolTip',
                {
                  'Border.stroke': '#41397B',
                  'Border.strokeWidth': 2,
                },

                this.topoGraph(
                  go.TextBlock,
                  'onts & Rgs',
                  {
                    margin: 4,
                    overflow: go.TextBlock.OverflowClip,
                  },
                  {
                    alignment: go.Spot.Top,
                    alignmentFocus: go.Spot.Bottom,
                    stroke: '#41397B',
                  },
                  {
                    alignment: go.Spot.Bottom,
                    alignmentFocus: go.Spot.Top,
                    stroke: '#41397B',
                  },
                  { font: 'bold 12px' },
                  new go.Binding('text', '', function (data) {
                    return data.countRgs.concat('\n', data.countOnts);
                  })
                )
              ),
            },
            this.topoGraph(go.Shape, 'Circle', {
              width: 25,
              height: 25,
              fill: 'white',
              stroke: '#41397B',
              strokeWidth: 1,
              margin: new go.Margin(0, 0, 2, 40),
            }),

            this.topoGraph(
              go.TextBlock,
              {
                font: '10px sans-serif',
                // font: '5pt',
                overflow: go.TextBlock.OverflowClip,
              },
              new go.Binding('text', 'passedClients', function (l) {
                return l ? l : '';
              })
            ),

            new go.Binding('visible', 'passedClients', function (l) {
              return l ? true : false;
            })
          ),

          this.topoGraph(
            go.Panel,
            'Auto',
            this.topoGraph(
              go.Shape,
              'RoundedRectangle',
              {
                parameter1: 10,
                margin: new go.Margin(0, 0, 0, 0),
                width: 80,
                height: 40,
                // maxSize: new go.Size(200, 30),
                fill: 'white',
                stroke: '#41397B',
                strokeWidth: 3,
              }
              // new go.Binding("text", "key", function (l) { return l ? l : '' })
            ),
            this.topoGraph(
              go.Panel,
              'horizontal',
              {
                alignment: go.Spot.Left,
              },
              this.topoGraph(
                go.Shape,
                'RoundedRectangle',
                {
                  parameter1: 5,
                  // alignment: go.Spot.Left,
                  margin: new go.Margin(2, 2, 2, 2),
                  width: 32,
                  height: 30,
                  // maxSize: new go.Size(40, 30),
                  fill: 'rgb(77, 68, 147)',
                }
                // new go.Binding("text", "key", function (l) { return l ? l : '' })
              ),

              this.topoGraph(
                go.TextBlock,
                {
                  stroke: 'white',
                  font: '15px sans-serif',
                  // alignment: go.Spot.Center,
                  margin: new go.Margin(5, 0, 0, 2),
                  maxSize: new go.Size(100, 30),
                  overflow: go.TextBlock.OverflowClip,
                  // isMultiline: false,
                  // click: () => {
                  //   this.onClickDiagrams('');
                  // }
                },
                new go.Binding('text', 'ap1', function (l) {
                  return l ? l : '';
                })
              )
            ),

            this.topoGraph(
              go.Panel,
              'horizontal',
              {
                alignment: go.Spot.Right,
              },
              this.topoGraph(
                go.Shape,
                'RoundedRectangle',
                {
                  parameter1: 5,
                  // alignment: go.Spot.Right,
                  margin: new go.Margin(2, 2, 2, 2),
                  width: 32,
                  height: 30,
                  // maxSize: new go.Size(40, 30),
                  fill: 'rgb(77, 68, 147)',
                }
                // new go.Binding("text", "ap2", function (l) { return l ? l : '' })
              ),
              this.topoGraph(
                go.TextBlock,
                {
                  // alignment: go.Spot.Center,
                  stroke: 'white',
                  font: '15px sans-serif',
                  margin: new go.Margin(15, 0, 0, 5),
                  maxSize: new go.Size(100, 30),
                  overflow: go.TextBlock.OverflowClip,
                  // isMultiline: false,

                  // click: () => {
                  //   alert('label clicked');
                  // }
                },
                new go.Binding('text', 'ap2', function (l) {
                  return l ? l : '';
                })
              )
            )
          ),

          //Bottom Text

          this.topoGraph(
            go.Panel,
            'Vertical',
            {
              width: 80,
              // height : 50
            },

            new go.Binding('margin', 'deviceName', function (l) {
              return l ? new go.Margin(5, 0, 0, 0) : '';
            }),
            new go.Binding('background', 'deviceName', function (l) {
              return l ? '#eaeaea' : '';
            }),
            new go.Binding('padding', 'deviceName', function (l) {
              return l ? 3 : '';
            }),

            this.topoGraph(
              go.TextBlock,
              {
                margin: new go.Margin(0, 0, 0, 0),
                maxSize: new go.Size(80, 30),
                isMultiline: false,
                maxLines: 1,
                font: 'bold 10px sans-serif',
                // click: () => {
                //   alert('label clicked');
                // }
              },
              new go.Binding('text', '', function (data) {
                return data.deviceName
                  .replace('DEVICE=', '')
                  .concat('\n ( ', data.name, ' )');
              })
            )
          ),

          new go.Binding('visible', 'ring', function (l) {
            return l ? true : false;
          })
        )
      );

      this.systemDiagram.groupTemplate = this.topoGraph(
        go.Group,
        'Auto',
        {
          layout: this.topoGraph(go.CircularLayout, {
            aspectRatio: 0.62,
            spacing: 20,
            startAngle: 210,
          }),
          selectionAdorned: false,
        },
        this.topoGraph(go.Shape, 'Ellipse', {
          minSize: new go.Size(200, 140),
          stretch: go.GraphObject.Fill,
          margin: new go.Margin(40, 40),
          spot1: go.Spot.TopLeft,
          spot2: go.Spot.BottomRight,
          fill: 'transparent',
          stroke: 'green',
          strokeWidth: 2,
          portId: '',
        }),
        this.topoGraph(
          go.TextBlock,
          {
            // overflow: go.TextBlock.OverflowEllipsis,
            maxLines: 1,
          },
          new go.Binding('text', 'ellipseText')
        ),
        this.topoGraph(go.Placeholder)
      );

      //Filter and Map systemDevicesData data to systemTopologyData

      // if(this.systemDevicesData.length > 0){
      let systemDataArray = [];
      if (this.systemDataArray.length > 1) {
        systemDataArray = [...this.systemDataArray];
      }

      let systemDevice = systemDataArray.map((itm) => {
        let locObj = this.systemDevicesData.find(
          (item) =>
            item.uuid == itm['uuid'] && item.uuid != '' && item && itm != 'All'
        );
        return {
          ...locObj,
          ...itm,
        };
      });

      nodeDataArray = this.systemTopologyData.map((itm) => {
        let locObj = systemDevice.find(
          (item) => item['fqn'] == itm['system'] && item['fqn'] != '' && item
        );
        itm['category'] = 'Sub';
        return {
          ...locObj,
          ...itm,
        };
      });
      // }

      // if(this.systemLinksData.length > 0){
      linkDataArray = this.systemLinksData.map((el) => {
        return {
          from: el['from']['uuid'],
          to: el['to']['uuid'],
          // fromSpot: el['from']['fromSpot'],
          // toSpot: el['from']['toSpot'],
          adminState: el['from']['adminState'],
          protocol: el['from']['protocol'],
          name: '( ' + el['from']['name'] + ', ' + el['to']['name'] + ' )',
          linkColor: el['from'].operState == 'UP' ? 'green' : 'red',
        };
      });
      // }

      console.log(linkDataArray);
      console.log(nodeDataArray);

      // let linkDataArray = [
      //   {
      //     from: 'mainnode',
      //     to: 'ringnode',
      //     color: '#41397B',
      //     thick: '3',
      //     curviness: 20,
      //   },
      //   {
      //     from: 'mainnode',
      //     to: 'subnode',
      //     color: '#41397B',
      //     thick: '3',
      //     curviness: 20,
      //   },
      // ];

      this.systemDiagram.linkTemplate = this.topoGraph(
        go.Link,
        {
          curve: go.Link.Bezier,
          // routing: go.Link.Orthogonal,
          corner: 5,
          toShortLength: 6,
          relinkableFrom: true,
          relinkableTo: true,

          toolTip: this.topoGraph(
            'ToolTip',
            {
              'Border.stroke': '#41397B',
              'Border.strokeWidth': 2,
            },

            this.topoGraph(
              go.TextBlock,
              {
                margin: 4,
                overflow: go.TextBlock.OverflowClip,
              },
              {
                alignment: go.Spot.Top,
                alignmentFocus: go.Spot.Bottom,
                stroke: '#41397B',
              },
              {
                alignment: go.Spot.Bottom,
                alignmentFocus: go.Spot.Top,
                stroke: '#41397B',
              },
              { font: 'bold 12px' },
              new go.Binding('text', '', function (data) {
                return data.protocol.concat('\n', data.adminState);
              })
            )
          ),
          // fromSpot: go.Spot.RightSide,
          // toSpot: go.Spot.LeftSide,
        },

        this.topoGraph(
          go.Shape,
          {
            strokeWidth: 3,
            width: 200,
          },
          new go.Binding('stroke', 'linkColor')
          // new go.Binding('strokeWidth', 'thick')
        ),
        // new go.Binding("fromSpot", "fromSpot", go.Spot.parse),
        // new go.Binding("toSpot", "toSpot", go.Spot.parse),

        // this.topoGraph(go.Shape),
        // this.topoGraph(
        //   go.Shape,
        //   // { toArrow: 'Standard' },
        //   new go.Binding('stroke', 'linkColor')
        // ),
        this.topoGraph(
          go.TextBlock,
          {
            // margin: 4,
            overflow: go.TextBlock.OverflowClip,
            font: 'bold 8px',
            segmentOffset: new go.Point(0, -10),
            segmentOrientation: go.Link.OrientAlong,
          },

          new go.Binding('text', '', function (data) {
            return data.name;
          })
        )
      );

      this.systemDiagram.model = new go.GraphLinksModel(
        nodeDataArray,
        linkDataArray
      );
    });
  }

  onClickDiagrams(showDiagram, selectedNode) {
    let that = this;
    if (showDiagram == 'Location') {
      let clickedIndex = this.regionsDataArray.find(
        (el) => el['name'] == selectedNode
      );
      // // static implementation
      that.regionSelected = clickedIndex['id'];
      that.loadLocationValue(that);
      that.loadFilterData();
    } else if (showDiagram == 'System') {
      let clickedIndex = this.locationDataArray.find(
        (el) => el['name'] == selectedNode
      );
      that.locationSelected = clickedIndex['id'];
      that.loadSystemValue(that);
      that.loadFilterData();
    }
  }

  clearTopology() {
    this.breadCrumbRegion = 'All';
    this.breadCrumbLocation = 'All';
    this.breadCrumbSystem = 'All';
    this.regionSelected = 'All';
    this.locationSelected = 'All';
    this.systemSelected = 'All';
    this.locationDataArray = ['All'];
    this.systemDataArray = ['All'];
    this.regionName = '';
    this.locationName = '';
    this.systemName = '';
    this.searchSelected = '';
    this.clearDiagram();
    this.loadIntialData();
  }

  selectRegion(data) {
    if (data != 'All') this.locationSelected = 'All';
  }

  loadLocationValue(event: any) {
    this.clickedRegion = '';
    this.locationSelected = 'All';
    this.systemSelected = 'All';
    let id = this.regionSelected;
    if (this.regionSelected && this.regionSelected != 'All') {
      this.canApplyFilter = true;
      this.locationsSubject = this.issueService.getLocations(id).subscribe(
        (res: any) => {
          this.locationDataArray = res;
          this.locationDataArray.push('All');
          this.canApplyFilter = false;
        },
        (error) => {
          this.canApplyFilter = false;
        }
      );
    }
    this.regionsDataArray.forEach((element: any) => {
      if (element.id == this.regionSelected) {
        this.regionName = element.name;
      }
    });
    this.locationName = null;
    if (this.regionSelected == 'All') {
      this.regionName = null;
      this.locationName = null;
      this.systemName = null;
      this.locationDataArray = ['All'];
      this.systemDataArray = ['All'];
    }
  }

  loadSystemValue(event: any) {
    this.clickedLocation = '';
    let regionid = this.regionSelected;
    let locationid = this.locationSelected;
    this.systemSelected = 'All';
    if (
      this.locationSelected &&
      this.regionSelected &&
      this.locationSelected != 'All'
    ) {
      this.canApplyFilter = true;
      this.systemsSubject = this.issueService
        .getSystems(regionid, locationid)
        .subscribe(
          (res: any) => {
            this.systemDataArray = res;
            this.systemDataArray.push('All');
            this.canApplyFilter = false;
          },
          (error) => {
            this.canApplyFilter = false;
          }
        );
    }
    this.locationDataArray.forEach((element: any) => {
      if (element.id == this.locationSelected) {
        this.locationName = element.name;
      }
    });
    this.systemName = null;
    if (this.locationSelected == 'All') {
      this.locationName = null;
      this.systemName = null;
      this.systemDataArray = ['All'];
    }
  }
  selectSystem(event: any) {
    this.systemDataArray.forEach((element: any) => {
      if (element.fqn == this.systemSelected) {
        this.systemName = element.fqn;
      }
    });

    if (this.systemSelected == 'All') {
      this.systemName = null;
    }
  }

  loadIntialData() {
    this.loading = true;
    let params = {
      region: this.regionName,
      location: this.locationName,
      system: this.systemName,
      notificationType: this.alarmType,
      historyReport: true,
      status: 'Both',
    };

    let query = '';
    for (var key in params) {
      if (params[key] == undefined) {
        continue;
      }

      if (query != '') {
        query += '&';
      }

      query += key + '=' + encodeURIComponent(params[key]);
    }

    this.url = `${this.baseUrl}alarmbyRegion?${query}`;
    // static implementation
    let obj = {
      regionData: `${this.url}`,
      regionPostions: `assets/data/topologyRegionsPostions.json`,
    };

    let types = ['regionData', 'regionPostions'];
    const requests: any = {};

    console.log(obj, 'OBJ');
    types.forEach((type) => {
      const req = this.http
        .get(`${obj[type]}`)
        .pipe(catchError((err) => of(err.status)));

      requests[type] = req;
    });

    this.listObs = forkJoin(requests).subscribe(
      (json: any) => {
        // this.loading = false;

        if (json['regionData'].length > 0) {
          if (json && typeof json['regionData'] != 'undefined') {
            this.loadRegion = true;
            this.regionError = false;
          }

          if (json && typeof json['regionPostions'] != 'undefined') {
            this.regionPostions = json['regionPostions'];
          }

          this.setAlarmsColors(
            json['regionData'],
            this.regionPostions,
            [],
            [],
            'regions'
          );
          this.clearDiagram();
          setTimeout(() => {
            this.changeDynamicSize('Region');
          }, 1000);
        }
      },
      (err) => {
        this.pageErrorHandle(err);
        console.log(err);
      }
    );

    // this.regionSubscribe = this.http.get(`${this.url}`).subscribe(
    //   (res: any) => {
    //     // res.sort();
    //     this.setAlarmsColors(res, 'regions');
    //     console.log(JSON.stringify(this.regionsTopologyData));
    //     this.changeDynamicSize();
    //     this.regionError = false;
    //     this.loading = false;
    //   },
    //   (err: HttpErrorResponse) => {
    //     this.regionError = true;
    //     if (err.status == 401) {
    //       this.regionErrorInfo = this.language['Access Denied'];
    //     } else {
    //       this.regionErrorInfo = this.commonOrgService.pageErrorHandle(err);
    //     }
    //     if (this.alarmType == 'Both') {
    //       this.regionEventError = true;
    //       this.regionEventErrorInfo = this.regionErrorInfo;
    //     }
    //     this.loading = false;
    //   }
    // );
  }

  setAlarmsColors(array, positionsArray, links, devices, diagram_type) {
    console.log(array);

    this.regionsTopologyData = [];
    this.locationsTopologyData = [];
    this.systemTopologyData = [];
    this.noData = false;

    if (array && array.length > 0) {
      // merge positions and diagram api
      if (positionsArray.length > 0) {
        array.map((itm) => {
          let locObj = positionsArray.find(
            (item) => item.region == itm['region'] && item.loc != '' && item
          );
          return {
            ...locObj,
            ...itm,
          };
        });
      }

      array.forEach((el) => {
        // change  cloud color

        if (el['alarm'].cleared.critical > 0) {
          el['source'] = this.cloudImages.red;
        } else if (
          el['alarm'].cleared.critical <= 0 &&
          el['alarm'].cleared.major > 0
        ) {
          el['source'] = this.cloudImages.orange;
        } else if (
          el['alarm'].cleared.major <= 0 &&
          el['alarm'].cleared.minor > 0
        ) {
          el['source'] = this.cloudImages.yellow;
        } else if (el['alarm'].cleared.minor <= 0) {
          el['source'] = this.cloudImages.green;
        }
      });

      if (diagram_type == 'regions') {
        this.regionsTopologyData = [...array];
        this.regionsTopologyData.forEach((el) => {
          el['isLocated'] = false;
          if (el['loc']) {
            el['isLocated'] = true;
          }
        });
        this.filteredRegions = [...array];
      } else if (diagram_type == 'locations') {
        this.locationsTopologyData = [...array];
        this.locationsTopologyData.forEach((el) => {
          el['isLocated'] = false;
          if (el['loc']) {
            el['isLocated'] = true;
          }
        });
        this.filteredLocations = [...array];
      } else if (diagram_type == 'systems') {
        this.systemLinksData = links['links'] || [];
        this.systemDevicesData = devices || [];
        this.systemTopologyData = [...array];
        // this.filteredSystems = [...array];
      }
    } else {
      this.noData = true;
    }
  }

  loadFilterData() {
    if (this.systemSelected == 'All') {
      this.searchSelected = '';
      // let category: any;
      // if (this.category && this.category.length && this.category.indexOf('All') === -1) {
      //   let filtered = this.category.filter(function (el) {
      //     return (el && el.length && el !== 'All');
      //   });

      //   category = filtered;
      // } else {
      //   category = undefined;
      // }

      // if (this.fullScreen) {
      //   this.applyFiltersInFullScreen();
      //   return;
      // }
      this.clickedLocation = '';
      this.clickedRegion = '';
      // this.loadLocationChart = false;
      // this.loadSystemChart = false;
      // this.alarmsCount();
      // this.serverityError = false;
      this.systemError = false;
      this.regionError = false;
      this.locationError = false;
      // this.severityChartData = null;
      // this.systemChartData = null;
      // this.locationChartData = null;
      // this.regionChartData = null;
      // this.severityChartOptions = null;
      // this.systemChartOptions = null;
      // this.locationChartOptions = null;
      // this.regionChartOptions = null;

      this.loading = true;
      this.applyDisabled = true;

      // if (this.alarmType == 'Both') {
      //   this.both = true;
      //   this.loadBothData();
      //   return;
      // } else {
      //   this.both = false;
      // }

      this.breadCrumbRegion = this.regionName || 'All';
      this.breadCrumbLocation = this.locationName || 'All';
      this.breadCrumbSystem = this.systemName || 'All';

      let system = '';
      if (this.systemSelected !== 'All') {
        system = this.systemSelected;
      } else {
        system = null;
      }

      let params = {
        region: this.regionName,
        location: this.locationName,
        // fsan_serialnumber: this.FSAN,
        // alarmEventName: this.eventName,
        // severity: this.Severity != 'all' ? this.Severity : null,
        // date: `${this.startISODate(this.FromDate)},${this.endISODate(this.ToDate)}`,
        notificationType: this.alarmType,
        historyReport: true,
        status: 'Both',
        // category: category,
        system: system,
      };

      let query = '';
      let uuidQuery =
        'uuid=' +
        this.systemDataArray
          .map((el) => el['uuid'])
          .filter((el) => el != undefined);
      // let uuiddeviceQuery = this.systemDataArray.map(el => el['uuid']).filter(el => el != undefined);
      for (var key in params) {
        if (params[key] == undefined || params[key] == '') {
          continue;
        }

        if (query != '') {
          query += '&';
        }

        query += key + '=' + encodeURIComponent(params[key]);
      }

      const requests: any = {};

      let types = ['region', 'regionPosition'];

      // if (this.alarmType !== 'Event') {
      //   types.push('severity');
      // }

      // this.loadRegionChart = true;

      if (params['region']) {
        this.loadRegion = false;
        let index = types.indexOf('region');
        let index1 = types.indexOf('regionPosition');
        types.splice(index, 1);
        types.splice(index1, 1);
        types.push('location');
        types.push('locationPosition');
        this.loadLocation = true;
      }

      if (params['location']) {
        this.loadLocation = false;
        let index = types.indexOf('location');
        types.splice(index, 1);
        types.push('system');
        types.push('systemPosition');
        types.push('links');
        types.push('devices');

        this.loadSystem = true;
      }
      // static implementation
      let obj = {
        region: `${this.baseUrl}alarmbyRegion?${query}`,
        // regionPosition: `assets/data/topologyRegionsPostions.json`,
        // locationPosition: `assets/data/topologyRegionsPostions.json`,
        // systemPosition: `assets/data/topologyRegionsPostions.json`,
        location: `${this.baseUrl}alarmbyLocation?${query}`,
        system: `${this.baseUrl}alarmbySystem?${query}`,
        links: `${this.topologyUrl}links?${uuidQuery}`,
        devices: `${this.deviceBaseUrl}devices/`,
      };

      console.log(obj, 'OBJ');
      types.forEach((type) => {
        const req = this.http
          .get(`${obj[type]}`)
          .pipe(catchError((err) => of(err.status)));

        requests[type] = req;
      });

      this.listObs = forkJoin(requests).subscribe(
        (json: any) => {
          console.log(json);
          if (json && typeof json['region'] != 'undefined') {
            this.regionPostions = [];
            if (json && typeof json['regionPosition'] != 'undefined') {
              this.regionPostions = json['regionPosition'];
            }
            this.loadRegion = true;
            this.setAlarmsColors(
              json['region'],
              this.regionPostions,
              [],
              [],
              'regions'
            );
            this.clearDiagram();
            this.changeDynamicSize('Region');
            this.regionError = false;
          }

          if (json && typeof json['location'] != 'undefined') {
            this.locationPostions = [];
            if (json && typeof json['locationPosition'] != 'undefined') {
              this.locationPostions = json['locationPosition'];
            }
            this.setAlarmsColors(
              json['location'],
              this.locationPostions,
              [],
              [],
              'locations'
            );
            this.clearDiagram();
            this.changeDynamicSize('Location');
            this.locationError = false;
          }

          if (json && typeof json['system'] != 'undefined') {
            this.systemPostions = [];
            if (json && typeof json['systemPosition'] != 'undefined') {
              this.systemPostions = json['systemPosition'];
            }
            this.setAlarmsColors(
              json['system'],
              this.systemPostions,
              json['links'],
              json['devices'],
              'systems'
            );
            this.clearDiagram();
            this.changeDynamicSize('System');
            this.systemError = false;
          }

          // this.loading = false;
        },
        (err) => {
          this.pageErrorHandle(err);
          console.log(err);
        }
      );
    } else {
      this.searchDiagram(this.systemName, false);
    }
  }

  clearDiagram() {
    if (this.regionDiagram) {
      this.regionDiagram.div = null;
    }
    if (this.locationDiagram) {
      this.locationDiagram.div = null;
    }
    if (this.systemDiagram) {
      this.systemDiagram.div = null;
    }
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.error = true;
    this.loading = false;
  }

  getRegionLoc(data, obj) {
    // debugger;
    this.regionDiagram.commit(function (d) {
      var data = d.model.nodeDataArray;
      console.log(data);
      var node = d.findNodeForData(data);
    });
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.regionSubscribe) {
      this.regionSubscribe.unsubscribe();
    }

    if (this.regionsSubject) {
      this.regionsSubject.unsubscribe();
    }
    if (this.locationsSubject) {
      this.locationsSubject.unsubscribe();
    }
    if (this.systemsSubject) {
      this.systemsSubject.unsubscribe();
    }
  }

  searchContext(searchSelected) {
    if (this.currentDiagram == 'Regions') {
      this.regionsTopologyData = this.getFilteredData(
        this.filteredRegions,
        searchSelected,
        'region'
      );
      this.clearDiagram();
      this.changeDynamicSize('Region');
    }

    if (this.currentDiagram == 'Locations') {
      this.locationsTopologyData = this.getFilteredData(
        this.filteredLocations,
        searchSelected,
        'location'
      );
      this.clearDiagram();
      this.changeDynamicSize('Location');
    }

    if (this.currentDiagram == 'Systems') {
      this.searchDiagram(searchSelected, true);
      // this.systemTopologyData = this.getFilteredData(
      //   this.filteredSystems,
      //   this.searchSelected,
      //   'system'
      // );
      // this.clearDiagram();
      // this.changeDynamicSize('System');
    }
  }

  searchDiagram(searchSelected, canFocusSearch) {
    // called by button
    // if (!this.searchSelected) return;
    this.systemDiagram.focus();

    this.systemDiagram.startTransaction('highlight search');

    if (searchSelected) {
      // search four different data properties for the string, any of which may match for success
      // create a case insensitive RegExp from what the user typed
      var safe = searchSelected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      var regex = new RegExp(safe, 'i');
      var results = this.systemDiagram.findNodesByExample(
        { uuid: regex },
        { key: regex },
        { deviceName: regex },
        { fqn: regex }
      );
      this.systemDiagram.highlightCollection(results);
      // try to center the diagram at the first node that was found
      if (results.count > 0)
        this.systemDiagram.centerRect(results.first().actualBounds);
    } else {
      // empty string only clears highlighteds collection
      this.systemDiagram.clearHighlighteds();
    }

    this.systemDiagram.commitTransaction('highlight search');

    if (canFocusSearch) this.searchBar.nativeElement.focus();
  }

  getFilteredData(originalList, value, key) {
    this.noData = true;
    if (this.searchSelected != '') {
      originalList = originalList.filter((item) => {
        return (
          item[key]
            .toString()
            .toLowerCase()
            .indexOf(value.toString().toLowerCase()) !== -1
        );
      });
    }

    if (originalList.length > 0) {
      this.noData = false;
    }

    return originalList;
  }

  loadBreadCrumbData(level) {
    if (level == 'Region') {
      this.locationSelected = 'All';
      this.systemSelected = 'All';
      this.locationName = null;
      this.systemName = null;
    }
    if (level == 'Location') {
      this.systemSelected = 'All';
      this.systemName = null;
    }
    this.loadFilterData();
  }

  enableAllCommandHandler() {
    let currentDiagram =
      this.currentDiagram == 'Regions'
        ? this.regionDiagram
        : this.currentDiagram == 'Locations'
          ? this.locationDiagram
          : this.systemDiagram;
    var cmdhnd = currentDiagram.commandHandler;
    this.enable('ZoomOut', cmdhnd.canIncreaseZoom());
    this.enable('ZoomIn', cmdhnd.canDecreaseZoom());
    this.enable('ZoomFit', cmdhnd.canZoomToFit());
  }

  enable(name, ok) {
    var button = document.getElementById(name);
    if (button) button['disabled'] = !ok;
  }
  zoomfunctionalities(type) {
    let currentDiagram =
      this.currentDiagram == 'Regions'
        ? this.regionDiagram
        : this.currentDiagram == 'Locations'
          ? this.locationDiagram
          : this.systemDiagram;
    if (type == 'Out') {
      currentDiagram.commandHandler.increaseZoom(1.25);
    } else if (type == 'In') {
      currentDiagram.commandHandler.decreaseZoom(0.75);
    } else if (type == 'Fit') {
      currentDiagram.commandHandler.zoomToFit();
    }
  }

  avoidNodeOverlap(node, pt, gridpt) {
    let that = this;
    if (node.diagram instanceof go.Palette) return gridpt;
    // this assumes each node is fully rectangular
    var bnds = node.actualBounds;
    var loc = node.location;
    // use PT instead of GRIDPT if you want to ignore any grid snapping behavior
    // see if the area at the proposed location is unoccupied
    var r = new go.Rect(
      gridpt.x - (loc.x - bnds.x),
      gridpt.y - (loc.y - bnds.y),
      bnds.width,
      bnds.height
    );
    // maybe inflate R if you want some space between the node and any other nodes
    r.inflate(-0.5, -0.5); // by default, deflate to avoid edge overlaps with "exact" fits
    // when dragging a node from another Diagram, choose an unoccupied area
    if (
      !(node.diagram.currentTool instanceof go.DraggingTool) &&
      (!node._temp || !node.layer.isTemporary)
    ) {
      // in Temporary Layer during external drag-and-drop
      node._temp = true; // flag to avoid repeated searches during external drag-and-drop
      while (!isUnoccupied(r, node)) {
        r.x += 10; // note that this is an unimaginative search algorithm --
        r.y += 2; // you can improve the search here to be more appropriate for your app
      }
      r.inflate(0.5, 0.5); // restore to actual size
      // return the proposed new location point
      return new go.Point(r.x - (loc.x - bnds.x), r.y - (loc.y - bnds.y));
    }
    if (isUnoccupied(r, node)) return gridpt; // OK
    return loc; // give up -- don't allow the node to be moved to the new location

    function isUnoccupied(r, node) {
      var diagram = node.diagram;

      // nested function used by Layer.findObjectsIn, below
      // only consider Parts, and ignore the given Node, any Links, and Group members
      function navig(obj) {
        var part = obj.part;
        if (part === node) return null;
        if (part instanceof go.Link) return null;
        if (part.isMemberOf(node)) return null;
        if (node.isMemberOf(part)) return null;
        return part;
      }

      // only consider non-temporary Layers
      var lit = diagram.layers;
      while (lit.next()) {
        var lay = lit.value;
        if (lay.isTemporary) continue;
        if (lay.findObjectsIn(r, navig, null, true).count > 0) return false;
      }
      return true;
    }
  }

  savePositions() {
    let currentDiagram =
      this.currentDiagram == 'Regions'
        ? this.regionDiagram
        : this.currentDiagram == 'Locations'
          ? this.locationDiagram
          : this.systemDiagram;
    currentDiagram.commit(function (d) {
      var data = JSON.stringify(d.model.nodeDataArray);
      let jsonFile = data.replace(/\\/g, '');
      console.log(jsonFile);
      var node = d.findNodeForData(data);
    });
  }
  changeScaleDiagram(scale, type) {
    let currentDiagram =
      this.currentDiagram == 'Regions'
        ? this.regionDiagram
        : this.currentDiagram == 'Locations'
          ? this.locationDiagram
          : this.systemDiagram;

    var oldscale = currentDiagram.scale;
    if (type == 'dropDown') {
      currentDiagram.scale = scale;
    } else if (type == 'decrease') {
      currentDiagram.scale = oldscale - 0.25;
    } else if (type == 'increase') {
      currentDiagram.scale = oldscale + 0.25;
    }
    this.zoomScale = currentDiagram.scale;
  }
}

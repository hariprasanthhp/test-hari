import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { IssueService } from 'src/app/cco/issues/service/issue.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  language: any;
  languageSubject: any;
  regionsSubject: any;
  locationsSubject: any;
  regionsObj = {};
  loctionsObj = { 'All': 'All Locations' };
  geoInfo = {};
  showAllRegions = false;
  showTitle: boolean;
  loader: boolean;
  errorInfo: any;
  error: boolean;
  @Input()
  set workflowObj(data: any) {
    console.log(data);
    if (data?.regions?.indexOf('All') !== -1) {
      this.showAllRegions = true;
    }
    this._workflowObj = data;
  }
  get workflowObj() {
    return this._workflowObj;
  }

  private _workflowObj: any


  constructor(private translateService: TranslateService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private commonOrgService: CommonService,
    private issueService: IssueService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.loader = true;
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    let notificationId = this.route.snapshot.paramMap.get("notificationId");
    if (notificationId) {
      this.titleService.setTitle('Optical Outliers Notifications - Email Notifications - Network Operations - Operations - Operations - Calix Cloud');
      this.showTitle = true;
      this.getRecordById(notificationId);
    } else {
      this.getRegions();
    }
  }

  getRegions() {
    this.regionsSubject = this.issueService.getRegions()
      .subscribe((res: any) => {
        if (res) {
          res = this.issueService.appendFqn(res);
          let data: any = {};
          res?.forEach(element => {
            data[element?.id] = element?.name;
            if (this.workflowObj?.regions?.length && this.workflowObj?.regions?.indexOf(element?.id) !== -1) {
              //this.geoInfo[element?.id] = [];
              this.geoInfo[element?.id] = {};
            }

            if (this.workflowObj?.locations?.length && this.workflowObj?.locations?.indexOf('All') !== -1) {
              let rdata = this.geoInfo;
              for (let rkey in rdata) {
                this.geoInfo[rkey]['All'] = ['All Systems'];
              }
            }
          });

          this.regionsObj = data;

          if (this.workflowObj?.regions?.length) {
            this.loadLocationSystem();
          } else {
            this.loader = false;
          }
        }

      }, (error) => {
        console.log(error);
      })
  }

  loadLocationValue() {
    let ids = this.workflowObj.regions;
    if (ids?.length) {
      let regionQuery = '';

      if (ids.length) {
        if (ids.indexOf('All') !== -1) {
          return;
        }
        ids.forEach(element => {
          if (element == 'All') {
            return;
          }
          regionQuery += `&region=${element}`
        });

        this.locationsSubject = this.http.get(`${environment.API_BASE_URL}nfa/locations?${regionQuery}`).subscribe((res: any) => {
          if (this.workflowObj?.location?.length) {
            let dataMap = this.geoInfo;
            res?.forEach(element => {
              if (this.workflowObj?.location?.indexOf(element?.id) !== -1) {
                // if (dataMap[element?.regionId]?.indexOf('All') !== -1) {
                //   let index = dataMap[element?.regionId]?.indexOf('All');
                //   dataMap[element?.regionId]?.splice(index, 1);
                // }

                if (dataMap[element?.regionId]) {
                  dataMap[element?.regionId].push(element?.name);
                } else {
                  dataMap[element?.regionId] = [element?.name];
                }
              }
            });
            console.log(dataMap);
            this.geoInfo = dataMap;

          }

        }, (error) => {
        });

      }
    }

  }


  generateSystemDetails() {

    let regionids = this.workflowObj.regions;
    let locationids = this.workflowObj.locations;
    let regionQuery = '';

    regionids?.forEach(element => {
      if (element == 'All') {
        return;
      }

      if (regionQuery) {
        regionQuery += `&`;
      }

      regionQuery += `region=${element}`
    });

    let locationQuery = '';

    locationids?.forEach(element => {
      if (element == 'All') {
        return;
      }
      locationQuery += `&location=${element}`
    });

    return this.http.get(`${environment.API_BASE_URL}nfa/systems/details?${regionQuery}${locationQuery}&includeDeleted=true`).pipe(
      catchError(err => {
        err['api-error'] = true;
        return of(err);
      }
      ),
    );


  }

  regLocSysMapInfo: any = [];
  mapRegLocSysInfo(data: any) {
    //data = data.filter();
    console.log(data);
    let map = {};
    let regions = {}, locations = {};
    if (data?.devices?.length) {
      data.devices = data?.devices?.filter((element: any) => {
        return this.workflowObj.systems?.indexOf(element?.uuid) !== -1;
      });
    }

    data?.devices?.sort((a, b) => a?.regionName?.localeCompare(b?.regionName));
    data?.devices?.forEach(element => {
      if (typeof map[element?.regionuuid] == 'undefined') {
        map[element?.regionuuid] = {};
        regions[element?.regionuuid] = element?.regionName;
      }

      if (typeof map[element?.regionuuid][element?.locationuuid] == 'undefined') {
        map[element?.regionuuid][element?.locationuuid] = [];
        locations[element?.locationuuid] = element?.locationName;
      }

      if (typeof map[element?.regionuuid][element?.locationuuid] == 'object') {
        map[element?.regionuuid][element?.locationuuid].push(element?.name);
      }

    });

    return map;

  }

  mapRegLocSysInfoOld(data: any) {
    //data = data.filter();
    console.log(data);
    let map = {};
    let regions = {}, locations = {};
    data?.devices?.sort((a, b) => a?.regionName?.localeCompare(b?.regionName));
    data?.devices?.forEach(element => {
      if (typeof map[element?.regionuuid] == 'undefined') {
        map[element?.regionuuid] = {};
        regions[element?.regionuuid] = element?.regionName;
      }

      if (typeof map[element?.regionuuid][element?.locationuuid] == 'undefined') {
        map[element?.regionuuid][element?.locationuuid] = [];
        locations[element?.locationuuid] = element?.locationName;
      }

      if (typeof map[element?.regionuuid][element?.locationuuid] == 'object') {
        map[element?.regionuuid][element?.locationuuid].push({
          id: element?.uuid,
          name: element?.name
        });
      }

    });

    console.log(map);

    let fData = [], groupSystemIds = [];

    for (let rkey in map) {
      let tmp: any = {};

      tmp = {
        name: regions[rkey] ? regions[rkey] : rkey,
        locations: []
      }

      for (let lKey in map[rkey]) {
        let lTmp: any = {};

        if (map[rkey][lKey]) {
          lTmp = {
            name: locations[lKey] ? locations[lKey] : lKey,
            systems: []
          };

          map[rkey][lKey]?.forEach((system: any) => {
            lTmp['systems'].push(system)
          });

        }

        tmp.locations.push(lTmp);
      }

      fData.push(tmp);
    }

    console.log(fData);
    /**
     * sort logic
     */
    fData?.forEach((region: any, rkey) => {
      region.locations = region?.locations?.sort((a, b) => a?.name?.localeCompare(b?.name));
      region?.locations?.forEach((location: any, lkey) => {
        location.systems = location?.systems?.sort((a, b) => a?.name?.localeCompare(b?.name));
        let systems = [];
        location?.systems?.forEach(system => {
          groupSystemIds.push(system.id);
          systems.push(system.name)
        });

        location.systems = systems;

      });

    });
    console.log(fData);
    this.regLocSysMapInfo = fData;

  }

  loadLocationSystem() {
    let ids = this.workflowObj.regions;
    if (ids?.length) {
      let regionQuery = '';

      if (ids.length) {
        if (ids.indexOf('All') !== -1) {
          return;
        }
        ids.forEach(element => {
          if (element == 'All') {
            return;
          }

          if (regionQuery) {
            regionQuery += `&`;
          }
          regionQuery += `region=${element}`
        });

        const requests = {};
        requests['locations'] = this.http.get(`${environment.API_BASE_URL}nfa/locations?${regionQuery}`).pipe(
          catchError(err => {
            err['api-error'] = true;
            return of(err);
          }));

        if (this.workflowObj?.systems?.length && this.workflowObj?.systems?.indexOf() == -1) {
          requests['systems'] = this.generateSystemDetails();
        }

        forkJoin(requests).subscribe((res: any) => {
          let regLocSysMap: any;
          if (res['systems']) {
            regLocSysMap = this.mapRegLocSysInfo(res['systems']);
            console.log(regLocSysMap);
          }

          let dataMap: any = this.geoInfo;

          if (this.workflowObj?.locations?.length) {
            res['locations'] = this.issueService.appendFqn(res['locations']);
            res['locations']?.forEach(element => {
              this.loctionsObj[element?.id] = element?.name;
              if (this.workflowObj?.locations?.indexOf(element?.id) !== -1) {
                dataMap[element?.regionId][element?.id] = [];
                if (regLocSysMap && regLocSysMap[element?.regionId] && regLocSysMap[element?.regionId][element?.id]) {
                  dataMap[element?.regionId][element?.id] = regLocSysMap[element?.regionId][element?.id];
                } else {
                  dataMap[element?.regionId][element?.id] = ['All Systems'];
                }
              } else if (this.workflowObj.regions?.indexOf(element?.regionId) !== -1) {
                //dataMap[element?.regionId]['All'] = ['All Systems'];
              }

            });

          }

          res['locations']?.forEach(element => {
            this.loctionsObj[element?.id] = element?.name;
            if (this.workflowObj?.locations?.indexOf(element?.id) === -1 && this.workflowObj.regions?.indexOf(element?.regionId) !== -1 && !Object.keys(dataMap[element?.regionId])?.length) {
              dataMap[element?.regionId]['All'] = ['All Systems'];
            }
          });

          for (let key in dataMap) {
            if (!Object.keys(dataMap[key])?.length) {
              dataMap[key]['All'] = ['All Systems'];
            }
          }

          console.log(dataMap);
          this.geoInfo = dataMap;
          this.loader = false;

        });

      }
    }

  }

  getRecordById(id: any) {
    this.loader = true;
    let url = `${environment.API_BASE_URL}health/config/notifications/${encodeURIComponent(id)}`;
    this.http.get(url).subscribe((json: any) => {
      if (json && Object.keys(json).length) {
        this.workflowObj = { ...this.workflowObj, ...json };
      }

      this.getRegions();

      this.loader = false;
    }, (err: any) => {
      console.log(err);
      this.pageErrorHandle(err);
    });
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.error = true;
    this.loader = false;
  }

}

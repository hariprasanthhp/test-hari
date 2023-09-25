import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { MyCommunityService } from '../shared/service/my-community.service';
import { SsoAuthService } from '../../../shared/services/sso-auth.service';
//import { DataTableDirective } from 'angular-datatables';
import { forkJoin, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MycommunityIqService } from 'src/app/sys-admin/services/mycommunity-iq.service';
import { groupBy } from 'rxjs/operators';
import { FilesListModel } from '../../netops-management/operations/model/files-list.model';
import { ProtectIqService } from '../shared/service/protect-iq.service';

const _ = require('lodash');

@Component({
  selector: 'app-my-community-iq',
  templateUrl: './my-community-iq.component.html',
  styleUrls: ['./my-community-iq.component.scss']
})
export class MyCommunityIQComponent implements OnInit {
  @ViewChild('escalationModal', { static: true }) private escalationModal: TemplateRef<any>;
  language: any;
  languageSubject;
  loading: boolean;
  myCommunityStatusLoading = true;
  microLoading;
  errorMsg: any;
  successWelcome: boolean = false;
  successReset: boolean = false;
  microsites: any = [];
  micrositesList: any = [];
  myCommStatus: any = {};
  subInfo: any = {};
  communities: any[] = [];
  community: String = "All";
  sectionToShow = 'details';
  showError: boolean;
  showSuccess: boolean;
  healthLoader: boolean;
  health: any;
  overallStatus: any;
  overalldesc: any = [];
  healthFiltered: any;
  moreStatusInfoFlag: boolean;
  addBspsub: any;
  micrositescheck: any;
  subscriberName: any;
  macAddress: any;
  onboardedDate: any;
  users: any = [];
  usersLoading: boolean;
  communityIds: any;
  tableCounts: { total: any; displayCount: any; displayed: any; start: any; };
  tableOptions: { pagingType: string; pageLength: number; serverSide: boolean; processing: boolean; ordering: boolean; dom: string; responsive: boolean; ajax: (dataTablesParameters: any, callback: any) => void; drawCallback: (settings: any) => void; };
  count: any;
  http: any;
  newResponse: any;
  RG: any = [];
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  isRerender = false;
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    serverSide: true,
    processing: false,
    ordering: false,
    dom: "tip",
  };
  frTable: DataTables.LanguageSettings;
  esTable: any;
  de_DETable: any;
  isReload = false;
  limit: any;
  details: any;
  comunityName: any = [];
  radiusFiltered: any;
  regionString: any = [];
  RGHotspot: string;
  sN: any;
  rgStatus: any;
  totalLoader: boolean = false;
  totalMicroLoader: boolean = false;
  tableLoading: boolean = false;
  zyxelHotspopt: boolean = true;
  constructor(private translateService: TranslateService,
    private el: ElementRef,
    private myCommService: MyCommunityService,
    private modalService: NgbModal,
    public sso: SsoAuthService,
    public router: Router,
    private communityService: MycommunityIqService,
    private service: ProtectIqService,
    private titleService: Title) {
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.de_DETable = this.translateService.de_DE;
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.titleService.setTitle(`${this.language['myCommunityIQ']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
      // this.redraw();
      this.getMyCommunityStatus(true);
    });

   let zyxelShow = JSON.parse(sessionStorage.getItem('calix.deviceData')).filter(element => {
      return element.opMode == 'RG';
    });
    if(zyxelShow[0]?.manufacturer == 'ZYXEL'){
      this.zyxelHotspopt = false;
    }
    this.titleService.setTitle(`${this.language['myCommunityIQ']} - ${this.language['Managed Services']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    this.RG = sessionStorage.getItem("calix.deviceData") ? JSON.parse(sessionStorage.getItem("calix.deviceData")).filter((obj: any) => (obj.opMode == 'RG')) : [];
    this.subInfo = this.sso.getSubscriberInfo();
    this.getMyCommunityStatus();
    this.initDataTable();
    // this.getOnboardedDevices();
    this.getHealth();
    this.fetchSoftwareImageList();
  }
  getMyCommunityStatus(isRefresh = false) {
    // this.loading = true;
    this.myCommunityStatusLoading = true;
    const subId = this.sso.getCSCSubscriberId();
    this.totalLoader = true;
    const availInd = this.RG.length ? 1 : (subId ? 2 : 0);
    if (!availInd) return;
    let apis = [this.service.getArloAccount(this.sso.getOrgId(), (availInd == 1 ? this.RG[0]["serialNumber"] : subId), availInd)];
    if (isRefresh && subId) apis.push(this.myCommService.getSubscriberInfo(this.sso.getOrgId(), subId));
    forkJoin(apis).subscribe((res: any) => {
      this.totalLoader = false;
      // this.loading = false;
      this.successWelcome = false;
      this.successReset = false;
      this.myCommStatus = res[0].edgeSuites;
      this.sN = res[0]?.systemId;
      this.rgStatus = (this.myCommStatus?.myCommunityIQ?.passpoint?.status?.result) ? this.myCommStatus?.myCommunityIQ?.passpoint?.status?.result : '';
      if (!this.myCommStatus?.myCommunityIQ?.passpoint?.enable) {
        this.RGHotspot = (this.sN) ? `${this.language["Disabled"]}` : '-';
      }
      else if (this.myCommStatus?.myCommunityIQ?.passpoint?.enable) {
        let langKeyNetwork = this.myCommStatus?.myCommunityIQ?.network?.type +' Mode'
        this.RGHotspot = (this.myCommStatus?.myCommunityIQ?.passpoint?.enable && this.rgStatus == "succeeded") ? 
        (`${this.language["Enabled"]}` ? 
        (`${this.language["Enabled"]}`+', '+ (this.myCommStatus?.myCommunityIQ?.network?.type ? ((this.myCommStatus?.myCommunityIQ?.network?.type == 'Policy_Route' ? this.language['Routed on Secondary VLAN Mode'] : 
        (langKeyNetwork ? this.language[langKeyNetwork]: '')) ) : '')
        +(this.myCommStatus?.myCommunityIQ?.network?.vlanId ? (', '+this.language['VLAN']+' '+this.myCommStatus?.myCommunityIQ?.network?.vlanId) : '')) : '') : 
        (this.myCommStatus?.myCommunityIQ?.passpoint?.enable && this.rgStatus == "failed") ? `${this.language["EnableFailed"]}` : '-';        
      }
      this.totalLoader = false;
      this.myCommunityStatusLoading = false;
      this.onboardDeviceApiCall(this.myCommStatus);
      this.tableLoading = false;
      let _id = [];
      if (isRefresh) this.subInfo = res[1];
      if (!(res[0].edgeSuites?.myCommunityIQ?.subscriber?.communities || []).length) {
        this.microsites = [];
        return;
      } else {
        this.communities = [
          { micrositeId: "All", label: `${this.language['All Communities']}` },
          ...(res[0].edgeSuites?.myCommunityIQ?.subscriber?.communities || []).map(obj => {
            return { micrositeId: obj.micrositeId, label: obj.micrositeId }
          })
        ];
        _id = [...(res[0].edgeSuites?.myCommunityIQ?.subscriber?.communities)]
      }
      this.totalMicroLoader = true;
      this.addBspsub = this.communityService.GetMicrosite().subscribe((res: any) => {
        this.totalMicroLoader = false;
        this.micrositescheck = res ? res?.filter(x => x.status === "READY") : [];
        this.micrositescheck?.sort((a, b) => {
          return a.communityName.localeCompare(b.communityName);
        });

        if (this.micrositescheck) {
          let id_is = [];
          this.micrositescheck?.forEach((obj) => {
            id_is.push(obj.id);
          })
          this.myCommStatus?.myCommunityIQ?.subscriber?.communities?.forEach(obj => {
            if (!id_is.includes(obj.micrositeId)) {
              this.communities?.splice(this.communities?.findIndex(id => id.micrositeId == obj.micrositeId), 1)
              _id.splice(_id.findIndex(id => id.micrositeId == obj.micrositeId), 1);
            }
          })
        }
      }, (err: HttpErrorResponse) => {
        // this.loading = false;
        this.totalMicroLoader = false;
        this.pageErrorHandle(err);
      });
      this.loading = true;
      this.communityIds = _id;
      setTimeout(() => {
        this.micrositeApiForm(_id);
      }, 4000);
    }, (err: HttpErrorResponse) => {
      // this.loading = false;
      this.totalLoader = false;
      this.myCommunityStatusLoading = false;
      this.pageErrorHandle(err);
    });
  }

  getPrioritizeTraffic() {
    if (this.myCommStatus?.hasOwnProperty('myCommunityIQ') && this.myCommStatus?.myCommunityIQ.hasOwnProperty('prioritizeTraffic')) {
      return true;
    }
    return false;
  }
  onTabChange(event) {
    switch (event) {
      case 'details': {
        this.sectionToShow = 'details';
        this.showError = false;
        this.showSuccess = false;
        break;
      }
      case 'OnboardedDevices': {
        this.sectionToShow = 'OnboardedDevices';
        // this.fetchAlertData();
        this.showError = false;
        this.showSuccess = false;
        break;
      }
      case 'Communities': {
        this.sectionToShow = 'Communities';
        Object.assign(this.micrositesList, this.microsites);
        this.community = 'All';
        this.showError = false;
        this.showSuccess = false;
        break;
      }
    }
  }
  hideError() {
    this.showError = false;
    this.errorMsg = '';
  }
  getHealth() {
    this.healthLoader = true;
    this.overalldesc = [];
    this.myCommService.getRadiusStatus().subscribe((res: any) => {
      this.loading = false;
      this.healthLoader = false;
      this.health = res?.healths ? res.healths : (res ? res : [])
      this.healthFiltered = this.health.filter(res => res.health_name !== 'Eleven Passpoint API Status (us-east-1)')
      this.radiusFiltered = this.health.filter(res => res.health_name.includes('Eleven Passpoint RADIUS Status'));
      this.overallStatus = this.health.filter(obj => {
        if (obj.status == false) {
          this.overalldesc.push(obj.desc);
        }
      });
    }, err => {
      this.healthLoader = false;
      this.pageErrorHandle(err);
    });
  }
  usDirection(health_name: any) {
    const DirectionName = health_name.substring(health_name.indexOf("(") + 1).replace(/[()-]/g, " ").split(' ');//for total word split
    DirectionName.unshift(DirectionName.splice(0, 1)[0].toUpperCase());//for First word uppercase
    DirectionName.splice(1, 1, DirectionName[1].charAt(0).toUpperCase() + DirectionName[1].substr(1));//for first letter uppercase in 2nd word
    return ` ${DirectionName.join(' ')}`;
  }

  moreStatusInfo() {
    this.moreStatusInfoFlag = !this.moreStatusInfoFlag;
    const icon = document.getElementById("moreInfo");
    icon.classList.toggle("fa-caret-down");
    icon.classList.toggle("fa-caret-up");
  }

  micrositeApiForm(inp = []) {
    this.loading = true;
    //inp = isRefresh ? (inp || []).map(micro => { return { "micrositeId": micro.id } }) : (inp || []);
    if (inp.length) {
      this.loading = false;
      this.getMicrosites(
        forkJoin(
          inp.map(obj => this.myCommService.getMicrosites(obj.micrositeId))
        )
      );
    }
  }

  getMicrosites(micrositeCall) {
    this.loading = true;
    this.microLoading = true;
    micrositeCall.subscribe((res: any) => {
      this.loading = false;
      this.microLoading = false;
      this.microsites = res;
      Object.assign(this.micrositesList, this.microsites);
      this.communities = [
        { micrositeId: "All", label: `${this.language['All Communities']}` },
        ...this.microsites.map(obj => {
          return { micrositeId: obj.id, label: obj.communityName }
        })
      ];
      this.communityChange();
      //  this.communities = this.communities.map(obj => {
      //   const id = this.microsites.find(elem => elem.id == obj.micrositeId);
      //   if(id) obj.micrositeId = id.communityName;
      //   return obj;
      // }) 
    }, (err: HttpErrorResponse) => {
      this.microLoading = false;
      this.pageErrorHandle(err);
    });
  }
  // 
  communityChange() {
    this.micrositesList = this.microsites;
    // if (this.community != "All") {
    //   this.micrositesList = this.microsites.filter(obj => obj.id == this.community);
    // }
  }

  fetchSoftwareImageList() {
    this.loading = true;

  }

  initDataTable(): void {
    const table = $(this.el.nativeElement).find('table'); // Assuming you have a <table> element
    $.fn.dataTable.ext.errMode = 'throw';

    $(table).DataTable({
      // Your DataTable configuration options
    });
  }

  totalLimits: any =[];
  onboardDeviceApiCall(CommStatus, refresh = false) {
    this.tableLoading = true;
    this.loading = true;
    this.usersLoading = true;
    this.users = [];
    this.comunityName = [];
    const providerId = this.sso.getSPID();
    const that = this;
    let pageNumber: number;
    this.totalLimits;
    let emptyarr =[];
    this.details = CommStatus?.myCommunityIQ?.subscriber?.communities;
    this.details?.forEach((obj, index) => {
      this.loading = true;
      this.usersLoading = true;
      obj.elevenSubId
      const params = {
        "providerId": providerId,
        "subscriber": obj.elevenSubId,
        "limit": 10
      }
      let api = [this.myCommService.getMicrosites(obj.micrositeId)];
      api.push(this.myCommService.GetOnboardedDevicesApi(params));
      forkJoin(api).subscribe((res: any) => {
        this.tableLoading = false;
        this.comunityName = res[0].communityName;
        this.subscriberName = this.sso.getSubscriberInfo();
        let resp = res[1];
        this.limit = resp.totalHits;
        emptyarr.push(resp.totalHits);
        this.totalLimits = emptyarr[0]+emptyarr[1];
        // this.usersLoading = false;
        let data = resp.hits.filter(element => {
          return element.callingStationId !== '';
        });
        if (resp.totalHits > 10) {
          // this.dtOptions.paging = false;
          if (!refresh) this.getOnboardedDevices();
          else {
            this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.clear();
              // this.dtTrigger.next();
              dtInstance.ajax.reload();
            });
          }
          // this.usersLoading = false;
        }
        else {
          let groupedDevices = _.groupBy(resp.hits, (obj) => obj.callingStationId);
          Object.values(groupedDevices).forEach((arr: any) => {
            let addCommunity = arr.shift();
            addCommunity['comunityName'] = [];
            addCommunity['comunityName'].push(res[0].communityName)
            this.users.push(addCommunity);
            // this.users.push(arr.shift());
          });
          if (index + 1 == this.details.length) {
            setTimeout(() => {
              this.usersLoading = false;
              this.loading = false;
            }, 2000)
          }
        }
      }, err => {
        this.users = [];
        this.usersLoading = false;
        this.tableLoading = false;
        this.loading = false;
        this.pageErrorHandle(err);
      });
      this.loading = false;
      this.usersLoading = false;
    });
    setTimeout(() => {
      if (this.usersLoading) this.usersLoading = false;
    }, 2500);
  }
  newCount =[];
  newTotCount;
  getOnboardedDevices() {
    // this.users = [];
    this.loading = true;
    this.usersLoading = true;
    const providerId = this.sso.getSPID();
    const that = this;
    let pageNumber: number;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      ordering: false,
      dom: "tip",
      responsive: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.loading = true;
        this.usersLoading = true;
        if (dataTablesParameters.start == 0) {
          pageNumber = 0;
        } else {
          pageNumber = dataTablesParameters.start / dataTablesParameters.length;
        }
        this.users = [];
        let data = [];
        this.newResponse =[];
        this.details = JSON.parse(sessionStorage.getItem('responseofoverview'))?.networkStatus?.app?.myCommunityIQ?.subscriber?.communities;
        this.details?.forEach(obj => {
          const params = {
            "providerId": providerId,
            "subscriber": obj.elevenSubId,
            "limit": ((pageNumber + 1) * 10) > this.totalLimits ? Math.abs(((pageNumber) * 10) - this.totalLimits) : 10,
            "pageNumber": `${pageNumber + 1}`
          }
          if (JSON.parse(sessionStorage.getItem('responseofoverview'))?.networkStatus?.app?.myCommunityIQ?.subscriber?.enable) {
            let api = [this.myCommService.getMicrosites(obj.micrositeId)];
            api.push(this.myCommService.GetOnboardedDevicesApi(params));
            forkJoin(api).subscribe((res: any) => {
              let resp = res[1];
              that.subscriberName = this.sso.getSubscriberInfo();
              resp.hits.forEach(element => {
                this.newCount.push(element)
              });
              resp.hits.forEach(element => {
                if(element.callingStationId !== '')
                {
                  data.push(element)
                }
              });
              // this.users = [];
              if (data.length > 0) {
                let groupedDevices = _.groupBy(resp.hits, (obj) => obj.callingStationId);
                Object.values(groupedDevices).forEach((arr: any) => {
                  let addCommunity = arr.shift();
                  addCommunity['comunityName'] = [];
                  addCommunity['comunityName'].push(res[0].communityName)
                  this.users.push(addCommunity);
                });
                this.usersLoading = false;
                this.loading = false;
                console.log("gvschgvghcv ",this.users,this.totalLimits)
                if (this.users.length < 10 && this.totalLimits <= 10) {
                  let pG = document.getElementById('DataTables_Table_0_paginate');
                  pG.style.display = 'none';
                  let pG1 = document.getElementById("DataTables_Table_0_info");
                  pG1.style.display = 'none';
                }
              } else {
                this.users = []
                this.usersLoading = false;
                this.loading = false;
                if (pageNumber == 0 && this.totalLimits <= 10) {
                  let pG = document.getElementById('DataTables_Table_0_paginate');
                  pG.remove();
                  let pG1 = document.getElementById("DataTables_Table_0_info");
                  pG1.remove();
                }
              }
              callback({
                recordsTotal: this.newCount.length,
                recordsFiltered: this.totalLimits,
                data: []
              });
              this.usersLoading = false;
              this.loading = false;
              this.newResponse.push(resp);
              this.newTotCount = this.newResponse.reduce((acc,val)=> acc+val.totalHits,0);
              this.loading = false;
            }), error => {
              this.loading = false;
              this.usersLoading = false;
              this.showError = true;
              this.errorMsg = error.error.error;
              this.newResponse.hits = [];
              callback({
                recordsTotal: this.newTotCount,
                recordsFiltered: 0,
                data: []
              });
            }
          } else {
            this.usersLoading = false;
            this.loading = false;
          }
        });
      },
      drawCallback: (settings) => {
        this.changeTableStatusLanguage(settings);
        let total = settings._iRecordsDisplay; // for server side rendering
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
        } else {
          //$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
        }
      },
    };
    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  // refreshTable() {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // dtInstance.destroy();
  //     // this.dtTrigger.next();
  //     // this.getOnboardedDevices();
  //     // dtInstance.destroy();
  //     // dtInstance.clear();
  //     dtInstance.ajax.reload();
  //     // this.getOnboardedDevices();
  //   });
  // }

  changeTableStatusLanguage(dtObj) {
    const nf = new Intl.NumberFormat();
    this.tableCounts = {
      total: dtObj._iRecordsTotal,
      displayCount: dtObj._iDisplayLength,
      displayed: dtObj._iRecordsDisplay,
      start: dtObj._iDisplayStart
    };
    const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr');
    const isSpanish = (sessionStorage.getItem('defaultLanguage') == 'es');
    const isGermen = (sessionStorage.getItem('defaultLanguage') == 'de_DE');
    const filtered = `${dtObj.oPreviousSearch.sSearch.replace(/\s+/g, "") ?
      (isFrench ?
        `(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` : isSpanish ? `(filtrado de un total de ${nf.format(dtObj._iRecordsTotal)} entradas)` :
          isGermen ? `(gefiltert aus ${nf.format(dtObj._iRecordsTotal)} Einträgen)` :
            `(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
      ''}`;
    const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
    const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
    $('div [role="status"]').text(isFrench ?
      `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` :
      isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` :
        isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered}` :
          `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
    );
    $(".first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Erste Seite' : 'First');
    $(".previous").text(isFrench ? 'Précédent' : isSpanish ? 'Anterior' : isGermen ? 'Letzte' : 'Previous');
    $(".next").text(isFrench ? 'Suivant' : isSpanish ? 'Siguiente' : isGermen ? 'Weiter' : 'Next');
    $(".last").text(isFrench ? 'Dernière' : isSpanish ? 'Último' : isGermen ? 'Zurück' : 'Last');
  }

  redraw() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  tableLanguageOptions(value?) {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.de_DETable;
    } else if (
      this.language.fileLanguage == 'en' &&
      this.dtOptions.language
    ) {
      delete this.dtOptions.language;
    }
  }

  resetMyCommPasswrd() {
    this.loading = true;
    this.myCommService.resetMyCommPasswrd(this.sso.getOrgId(), this.sso.getCSCSubscriberId()).subscribe((res: any) => {
      this.loading = false;
      this.successReset = true;
      this.successWelcome = false;
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
    });
  }

  myCommWelcomeMail() {
    this.loading = true;
    this.myCommService.myCommWelcomeMail(this.sso.getOrgId(), this.sso.getCSCSubscriberId(), this.community).subscribe((res: any) => {
      this.loading = false;
      this.successWelcome = true;
      this.successReset = false;
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.pageErrorHandle(err);
    });
  }

  hideSuccess() {
    this.successWelcome = false;

  }
  hideSuccess1() {
    this.successReset = false;
  }
  pageErrorHandle(err) {
    if (err.status === 401) {
      this.errorMsg = this.language['Access Denied'];
    } else if (err.status === 500) {
      this.errorMsg = err.error.msg || this.language['internalServerError'];
    } else {
      this.errorMsg = this.sso.pageErrorHandle(err);
    }
  }
  escalationModalOpen() {
    this.modalService.open(this.escalationModal, { windowClass: 'custom-large-modal' });
  }

}




import { Injectable, ViewChild } from '@angular/core';
import { IssueService } from '../../issues/service/issue.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlarmDetailsModalComponent } from '../active-devices-geomap/alarm-details-modal/alarm-details-modal.component';
@Injectable({
  providedIn: 'root'
})
export class HomeGeomapService {
  modalRef: any;
  constructor(private issueService: IssueService, private router: Router, private dialogService: NgbModal,) { }

  redirectToPage(type, system, systemInfoData) {
    if (type == 'noOfAlarms') {
      if (system?.deviceType?.toUpperCase() == 'ONT') {
        this.setOntSystemsDetailsForListViewInService(system, systemInfoData);
      }else if (system?.deviceType?.toUpperCase() == 'OLT') {
        this.setOltSystemsDetailsForListViewInService(system, systemInfoData);
      }
      // this.issueService.setGeomapAppliedFilters(systemInfoData);
      let url = `/cco/alerts/${system.id.toLowerCase()}/active-reports`;
      if(system.id.toLowerCase() == 'disruption'){
        url = '/cco/alerts/disruption/list';
      }
      this.router.navigate([url], { queryParams: { geoMapIssue: true }, state: { filters: this.issueService.getGeomapAppliedFilters() }  });
      return;
      // this.router.navigate([`/cco/issues/device/active-reports`], {
      //   queryParams: { geoMapIssue: true },
      // });
      // this.setOntSystemsDetailsForListViewInService(system, systemInfoData);
    }
    if (system?.deviceType?.toUpperCase() == 'ONT') {
      if (type == 'deviceName') {
        this.router.navigate(
          [`/cco/services/subscribers/system/list`],
          {
            queryParams: { geoMapIssue: true },
            state: {
              ccoSystemSearchText:
                system.deviceName && system.deviceName != ''
                  ? system.deviceName
                  : system.fsan_serialnumber
                  ? system.fsan_serialnumber
                  : system?.subscriberName || '',
            },
          }
        );
        this.setOntSystemsDetailsForListViewInService(system, systemInfoData);
      } else if(type == 'outageAlarmName'){
        this.setOntSystemsDetailsForListViewInService(system, systemInfoData);
        this.modalRef = this.dialogService.open(AlarmDetailsModalComponent, { size: 'xl', centered: true, windowClass: 'custom-model-service custom-modal' });
      }
      // else if (type == 'noOfAlarms') {
      //   let url = `/cco/alerts/${system.id.toLowerCase()}/realtime/current-issues`;
      //   this.router.navigate([url], { queryParams: { geoMapIssue: true }, state: { filters: this.issueService.getGeomapAppliedFilters() }  });

      //   // this.router.navigate([`/cco/issues/device/active-reports`], {
      //   //   queryParams: { geoMapIssue: true },
      //   // });
      //   this.setOntSystemsDetailsForListViewInService(system, systemInfoData);
      // }
    } else if (system?.deviceType?.toUpperCase() == 'OLT') {
      if (type == 'deviceName') {
        system['isGeomap'] = true;
        system['uuid'] = system['deviceUuid'];
        localStorage.setItem("calix.network.system.details", JSON.stringify(system))
        let preFilterForm = {};
        preFilterForm['isGeomap'] = true;
        this.router.navigate(['/cco/system/cco-network-system/show-details'], { state: { networkSystemsListFilters: JSON.stringify(preFilterForm) } });
        // this.router.navigate(
        //   [`/cco/operations/system-onboarding/cms-exa/list`],
        //   { queryParams: { geoMapIssue: true } }
        // );
        this.setOltSystemsDetailsForListViewInService(system, systemInfoData);
      } 
      // else if (type == 'noOfAlarms') {
      //   this.router.navigate([`/cco/issues/device/active-reports`], {
      //     queryParams: { geoMapIssue: true },
      //   });
      //   this.setOltSystemsDetailsForListViewInService(system, systemInfoData);
      // }
    }
  }

  setOntSystemsDetailsForListViewInService(system, systemInfoData) {
    let params = {
      systemDetails : system, 
      fromIssuesGeoMap: 'ont',
      // fsan:
      //   system.fsan_serialnumber && system.fsan_serialnumber != ''
      //     ? system.fsan_serialnumber
      //     : '',
      // fsan : el.deviceName && el.deviceName != ''? el.deviceName : el?.fsan_serialnumber,
      // geoMapFilterParams: systemInfoData,
    };
    systemInfoData = {...systemInfoData, ...params};
    this.issueService.setGeomapAppliedFilters(systemInfoData);
  }
  setOltSystemsDetailsForListViewInService(el, systemInfoData) {
    let params = {
      fromIssuesGeoMap: 'olt',
      regions: el?.deviceRegion,
      locations: el?.deviceLocation,
      systemUuid: el?.deviceUuid,
      oltName: el?.deviceName,
      // reStoreMapViewDetails: systemInfoData['reStoreMapViewDetails'],
      // geoMapFilterParams: systemInfoData,
    };
    systemInfoData = {...systemInfoData, ...params};
    this.issueService.setGeomapAppliedFilters(systemInfoData);
  }

  closeModal(){
    this.modalRef.close();
  }
}

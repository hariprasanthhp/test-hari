import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { ApplicationsApiService } from 'src/app/flow-config/services/applications-api.service';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, forkJoin } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
  selector: 'app-applications-audit',
  templateUrl: './applications-audit.component.html',
  styleUrls: ['./applications-audit.component.scss'],
})
export class ApplicationsAuditComponent implements OnInit {
  @ViewChild('infoModal', { static: true }) public infoModal: TemplateRef<any>;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;


  language: any;
  languageSubject: any;
  public MODULE: string;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  public dtOptions: DataTables.Settings = {
    ordering: true,
    searching: false,
    lengthChange: false,
    paging: false,
    info: false,
    order: [0, 'asc'],
    dom:'tipr',
    columnDefs: [
      { targets: [0,1,2,3], orderable: true },
    ],
  };
  public auditList = [];
  public selectedaddressV4 = [];
  public selectedaddressV6 = [];
  public infoTitle: string;
  public infoBody: string;
  public modalRef: any;
  public ORG_ID: string;
  public show = {
    auditExistCheck: false,
    loading: false,
    disabledv4All: true,
    disabledv6All: true,
    v4AllFullySelected: false,
    v6AllFullySelected: false,
    v4PartialSelectedSpan: false,
    v6PartialSelectedSpan: false
  }
  constructor(
    public router: Router,
    public translateService: TranslateService,
    public commonOrgService: CommonService,
    public sso: SsoAuthService,
    public apiService: ApplicationsApiService,
    public dialogService: NgbModal,

  ) {
    let url = this.router.url;
    this.MODULE = this.sso.getRedirectModule(url);
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.commonOrgService.recordView.show = true;
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data: any) => {
        this.language = data;
        this.tableLanguageOptions();
        // this.tableCreator();
        
      }
    );

    let res = this.router.getCurrentNavigation()?.extras?.state?.domainNameRes;
    if (!res) {
      this.routeToDifinition();
      this.commonOrgService.recordView.show = false;
    } else {
      this.auditList = res;
      // this.tableCreator()
    }
    this.show.auditExistCheck = this.checkForAuditExist();
    this.disabledSelectAll();
    setTimeout(() => {
      this.dtTrigger.next();
      this.rerender()
    }, 50);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.commonOrgService.recordView.show = false;
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
  }

  disabledSelectAll() {

    for (let index = 0; index < this.auditList.length; index++) {
      if(this.auditList[index]?.addressesV4?.varianceExists) {
        this.show.disabledv4All = false;
        break;
      }
    }
    for (let index = 0; index < this.auditList.length; index++) {
      if (this.auditList[index].addressesV6?.varianceExists) {
        this.show.disabledv6All = false;
        break;
      }
    }
  }

  public checkForAuditExist() {
    this.auditList = this.auditList.filter((e) => e.name);
    return this.auditList.some((ele) => !ele?.auditExists);
  }

  public routeToDifinition() {
    this.router.navigate([
      `/${this.MODULE}/flowAnalyze/applications/definitions`,
    ]);
  }

  public selectDeselectv4All(checked: boolean) {
    this.selectedaddressV4 = [];
    if (checked) {
      this.auditList.forEach((ele) => {
        if (ele.auditExists && ele.addressesV4?.varianceExists) {
            this.selectedaddressV4.push({
              id: ele.id,
              orgId: ele.orgId,
              addressesV4: ele?.addressesV4?.incrementalAddresses,
              selectedDecrementalAddressV4: ele?.addressesV4?.decrementalAddresses,
              similarAddressV4: ele?.addressesV4?.similarAddresses
            });
        }
      });
      this.show.v4PartialSelectedSpan = false;
      (document.querySelector('#selectAllv4') as HTMLInputElement).checked = true;
    } else {
      this.show.v4PartialSelectedSpan = false;
      (document.querySelector('#selectAllv4') as HTMLInputElement).checked = false;
    }
    this.checkUncheckAll('input[name^="v4_"]', checked);
    
  }

  public selectDeselectv6All(checked: boolean) {
    this.selectedaddressV6 = [];
    if (checked) {
      this.auditList.forEach((ele) => {
        if (ele.auditExists && ele.addressesV6?.varianceExists) {
            this.selectedaddressV6.push({
              id: ele.id,
              orgId: ele.orgId,
              addressesV6: ele.addressesV6.incrementalAddresses,
              selectedDecrementalAddressV6: ele?.addressesV6?.decrementalAddresses,
              similarAddressV6: ele?.addressesV6?.similarAddresses
            });
        }
      });
      this.show.v6PartialSelectedSpan = false;
      (document.querySelector('#selectAllv6') as HTMLInputElement).checked = true;
    } else {
      this.show.v6PartialSelectedSpan = false;
      (document.querySelector('#selectAllv6') as HTMLInputElement).checked = false;
    }
    this.checkUncheckAll('input[name^="v6_"]', checked);
  }

  public checkUncheckAll(inputArr: string, checked: boolean) {
     document.querySelectorAll(inputArr).forEach((ele: HTMLInputElement) => ele.checked = checked)
  }

  public selectDeselectV6(checked: boolean, addressv6: string, item, incrementFlag) {
    const index = this.selectedaddressV6.findIndex(ele => ele.id === item.id)
    if (checked) {
      if (index !== -1) {
        if (incrementFlag) {
          this.selectedaddressV6[index].addressesV6.push(addressv6);
        } else {
          this.selectedaddressV6[index].selectedDecrementalAddressV6.push(addressv6);
          this.selectedaddressV6[index].decrementalAddressV6 = this.selectedaddressV6[index].decrementalAddressV6.filter(v => v !== addressv6)
        }
      } else {
        this.selectedaddressV6.push({
          id: item.id,
          orgId: item.orgId,
          addressesV6: incrementFlag ? [addressv6] : [],
          decrementalAddressV6: incrementFlag ? item?.addressesV6?.decrementalAddresses : item?.addressesV6?.decrementalAddresses.filter(v => v !== addressv6),
          selectedDecrementalAddressV6: !incrementFlag ? [addressv6] : [],
          similarAddressV6: item?.addressesV6?.similarAddresses
        })
      }
    } else {
      if (incrementFlag) {
        const indexOfaddressV6 = this.selectedaddressV6[index].addressesV6.indexOf(addressv6);
        this.selectedaddressV6[index].addressesV6.splice(indexOfaddressV6, 1);
      } else {
          const indexOfaddressV6 = this.selectedaddressV6[index].selectedDecrementalAddressV6.indexOf(addressv6);
          this.selectedaddressV6[index].selectedDecrementalAddressV6.splice(indexOfaddressV6, 1);
          this.selectedaddressV6[index].decrementalAddressV6.push(addressv6);
      }
      if (!this.selectedaddressV6[index].addressesV6.length && !this.selectedaddressV6[index].selectedDecrementalAddressV6.length) {
        this.selectedaddressV6[index].similarAddressV6 = [];
        this.selectedaddressV6[index].decrementalAddressV6 = [];
      }
    }
    if (document.querySelectorAll('.addressv6').length === document.querySelectorAll('.addressv6:checked').length) {
      this.show.v6PartialSelectedSpan = false;
      (document.querySelector('#selectAllv6') as HTMLInputElement).checked = true;
    } else {
      if (document.querySelectorAll('.addressv6:checked').length > 0) {
        this.show.v6PartialSelectedSpan = true;
        (document.querySelector('#selectAllv6') as HTMLInputElement).checked = false;
      } else {
        this.show.v6PartialSelectedSpan = false;
        (document.querySelector('#selectAllv6') as HTMLInputElement).checked = false;
      }
    }
    if (this.selectedaddressV6){
      const ipExists = this.selectedaddressV6.find(element => element.addressesV6.length || element.decrementalAddressV6.length || element.selectedDecrementalAddressV6.length);
      if(!ipExists) this.selectedaddressV6 = [];
   }
 }

  public selectDeselectV4(checked: boolean, addressv4: string, item, incrementFlag) {
    const index = this.selectedaddressV4.findIndex(ele => ele.id === item.id)
    if (checked) {
      if (index !== -1) {
        if (incrementFlag) {
          this.selectedaddressV4[index].addressesV4.push(addressv4);
        } else {
          this.selectedaddressV4[index].selectedDecrementalAddressV4.push(addressv4);
          this.selectedaddressV4[index].decrementalAddressV4 = this.selectedaddressV4[index].decrementalAddressV4.filter(v => v !== addressv4)
        }
      } else {
        this.selectedaddressV4.push({
          id: item.id,
          orgId: item.orgId,
          addressesV4: incrementFlag ? [addressv4] : [],
          decrementalAddressV4: incrementFlag ? item?.addressesV4?.decrementalAddresses : item?.addressesV4?.decrementalAddresses.filter(v => v !== addressv4),
          selectedDecrementalAddressV4: !incrementFlag ? [addressv4] : [],
          similarAddressV4: item?.addressesV4?.similarAddresses
        })
      }
    } else {
      if (incrementFlag) {
        const indexOfaddressV4 = this.selectedaddressV4[index].addressesV4.indexOf(addressv4);
        this.selectedaddressV4[index].addressesV4.splice(indexOfaddressV4, 1);
      } else {
        const indexOfaddressV4 = this.selectedaddressV4[index].selectedDecrementalAddressV4.indexOf(addressv4);
        this.selectedaddressV4[index].selectedDecrementalAddressV4.splice(indexOfaddressV4, 1);
        this.selectedaddressV4[index].decrementalAddressV4.push(addressv4);
      }

        if (!this.selectedaddressV4[index].addressesV4.length && !this.selectedaddressV4[index].selectedDecrementalAddressV4.length) {
          this.selectedaddressV4[index].similarAddressV4 = [];
          this.selectedaddressV4[index].decrementalAddressV4 = [];
        }
    }
    if (document.querySelectorAll('.addressv4').length === document.querySelectorAll('.addressv4:checked').length) {
      this.show.v4PartialSelectedSpan = false;
      (document.querySelector('#selectAllv4') as HTMLInputElement).checked = true;
    } else {
      if (document.querySelectorAll('.addressv4:checked').length > 0) {
        this.show.v4PartialSelectedSpan = true;
        (document.querySelector('#selectAllv4') as HTMLInputElement).checked = false;
      } else {
        this.show.v4PartialSelectedSpan = false;
        (document.querySelector('#selectAllv4') as HTMLInputElement).checked = false;
      }
    }
    if (this.selectedaddressV4){
        const ipExists = this.selectedaddressV4.find(element => (element.addressesV4.length || element.decrementalAddressV4.length || element.selectedDecrementalAddressV4.length));
        if(!ipExists) this.selectedaddressV4 = [];
    }
  }

  public updateApplications() {
    if (!this.selectedaddressV4.length && !this.selectedaddressV6.length) {
      this.infoTitle = this.language['Invalid Value'];
      this.infoBody = 'No application selected';
      this.openInfoModal();
      return;
    }
    this.show.loading = true;
    const patchCallsOne: Observable<any>[] = [];
    const patchCallsTwo: Observable<any>[] = [];
    let applicationsData = Object.values(_.merge(_.groupBy(this.selectedaddressV4, 'id'), _.groupBy(this.selectedaddressV6, 'id'))).flat();
    applicationsData.forEach((ele: any) => {
      let bodyForPatchCallOne = {}
      let bodyForPatchCallTwo = {}
      if (ele && ele.decrementalAddressV4 && ele.decrementalAddressV4.length) {
        bodyForPatchCallOne['addressesV4'] = [...(ele?.decrementalAddressV4 || []), ...(ele.similarAddressV4 || [])].join(';')
      }

      if (ele && ele.decrementalAddressV6 && ele.decrementalAddressV6.length) {
        bodyForPatchCallOne['addressesV6'] = [...(ele?.decrementalAddressV6 || []), ...(ele?.similarAddressV6 || [])].join(';')
      }
 
      if (ele && ele.addressesV4 && ele.addressesV4.length) {
        bodyForPatchCallTwo['addressesV4'] = [...(ele?.addressesV4 || []), ...(ele?.similarAddressV4 || []), ...(ele?.decrementalAddressV4 || [])].join(';')
      }
      if (ele && ele.addressesV6 && ele.addressesV6.length) {
        bodyForPatchCallTwo['addressesV6'] = [...(ele.decrementalAddressV6 || []), ...(ele.similarAddressV6 || []), ...(ele.addressesV6 || [])].join(';')
      }

      if (ele && ele.selectedDecrementalAddressV4
        && ele.selectedDecrementalAddressV4.length
        && ele.addressesV4 && !ele.addressesV4.length 
        && ele.decrementalAddressV4 && !ele.decrementalAddressV4.length) {
        bodyForPatchCallOne['addressesV4'] = [...(ele.similarAddressV4 || [])].join(';')
      }


      if (ele && ele.selectedDecrementalAddressV6 
        && ele.selectedDecrementalAddressV6.length
        && ele.addressesV6 && !ele.addressesV6.length 
        && ele.decrementalAddressV6 && !ele.decrementalAddressV6.length) {
          bodyForPatchCallOne['addressesV6'] = [...(ele.similarAddressV6 || [])].join(';')
      }

      if (Object.keys(bodyForPatchCallOne).length) {
        patchCallsOne.push(this.apiService.applicationsPatch(ele.id, bodyForPatchCallOne, ele.orgId));
      }
      if (Object.keys(bodyForPatchCallTwo).length) {
        patchCallsTwo.push(this.apiService.applicationsPatch(ele.id, bodyForPatchCallTwo, ele.orgId));
      }
    });   
    forkJoin(patchCallsOne).subscribe(
      resultArray => {
        this.show.loading = false;
        this.selectedaddressV4 = [];
        this.selectedaddressV6 = [];
        if (!patchCallsTwo.length) {
          this.routeToDifinition();
        }
      }, (err: HttpErrorResponse) => {
        this.show.loading = false;
        this.pageErrorHandle(err);
      });

      forkJoin(patchCallsTwo).subscribe(
        resultArray => {
          this.show.loading = false;
          this.selectedaddressV4 = [];
          this.selectedaddressV6 = [];
          this.routeToDifinition();
        }, (err: HttpErrorResponse) => {
          this.show.loading = false;
          this.pageErrorHandle(err);
        });
  }

  public openInfoModal() {
    this.closeModal();
    this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
  }

  public closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  public pageErrorHandle(err: HttpErrorResponse) {
    let errorInfo = '';
    this.infoTitle = "Error";
    if (err.status == 400 || err.status == 409) {
      let infoBody = this.commonOrgService.pageErrorHandle(err)
      if (err.status == 409 && (infoBody.toLowerCase().indexOf('already') > -1 || infoBody.toLowerCase().indexOf('already exists'))) {
        infoBody = "Application name is already used";
      }
      this.infoBody = infoBody;
      this.infoTitle = this.language['Invalid request'];
      this.openInfoModal();
      this.show.loading = false;
    } else {
      if (err.status == 401) {
        errorInfo = this.language['Access Denied'];
      } else {
        errorInfo = this.commonOrgService.pageErrorHandle(err);
      }
      this.commonOrgService.openErrorAlert(errorInfo);
      this.commonOrgService.pageScrollTop();
      this.show.loading = false;
    }

  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }

  rerender(): void {
    if (!this.dtElement?.dtInstance) return;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }


}

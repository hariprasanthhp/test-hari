import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MycommunityIqService } from '../../services/mycommunity-iq.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-confirm-users',
  templateUrl: './confirm-users.component.html',
  styleUrls: ['./confirm-users.component.scss']
})
export class ConfirmUsersComponent implements OnInit, OnDestroy {
  _iDisplayStart: number = 0;
  rowcn: number
  // Data Table Configurations
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    dom: 'tipr',
    lengthChange: false,
    pageLength: 10,

    destroy: true,
    processing: true,
    // responsive: true,
    columnDefs: [
      { orderable: false, targets: [0, 2, 4] },
      { targets: [1, 3], orderable: true }
    ],
    order: [1, 'asc'],

    drawCallback: (settings) => {

      this._iDisplayStart = settings._iDisplayStart
      this.dataTableSetting = settings;
      this.changeTableStatusLanguage(settings);

      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
      }
    }
  };
  language: any;
  frTable: any;
  esTable: any;
  de_DETable: any;
  orgId;
  loader: boolean;


  constructor(
    public dialogService: NgbModal,
    private myCommunityIqService: MycommunityIqService,
    private router: Router,
    private translateService: TranslateService,
    private commonOrgService: CommonService,

  ) {
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.de_DETable = this.translateService.de_DE;
    this.orgId = localStorage.getItem('calix.org_id')
  }
  // For Storing All UserList From CSV File (userList)
  userList: user[] = [];
  // We Are Storing The Error Details to Below Variable (missingvalues)
  missingvalues: any = [];
  // Variable Helps To Know Whether The Save Is In Progress or Success Or Stoped
  submissionStatus: string;
  // Storing All The Subscriptions For Unsubscribe Them While Leaving The Page
  subscriptions: Subscription[] = [];
  // Counting The Saved Subscribers While Save
  savedSubscribersCount: number;
  sortedColumnDetails = []
  ngOnInit(): void {

    this.language = this.translateService.defualtLanguage;
    this.subscriptions.push(this.translateService.selectedLanguage.subscribe((data: any) => {

      this.language = data;
      this.dtOptions.language = data;
      const tempObj = {
        _iDisplayStart: this.tableCounts.start,
        _iDisplayLength: this.tableCounts.displayCount,
        _iRecordsDisplay: this.tableCounts.displayed,
        _iRecordsTotal: this.tableCounts.total,
        oPreviousSearch: {
          sSearch: this.tableCounts.searchText
        }
      };
      this.changeTableStatusLanguage(tempObj);
    }));
    this.loader = true;
    this.getMicroSites();

    //getting value from user uploaded file

  };
  tableCounts: any;
  changeTableStatusLanguage(dtObj) {
    const nf = new Intl.NumberFormat();
    this.tableCounts = {
      searchText: '',
      total: dtObj._iRecordsTotal = this.rowcn,
      displayCount: dtObj._iDisplayLength,
      displayed: dtObj._iRecordsDisplay = this.rowcn,
      start: dtObj._iDisplayStart
    };

    const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr');
    const isSpanish = (sessionStorage.getItem('defaultLanguage') == 'es');
    const isGermen = (sessionStorage.getItem('defaultLanguage') == 'de_DE');
    const filtered = `${dtObj._iRecordsTotal > 10000 && dtObj._iRecordsDisplay > 0 ?
      (isFrench ?
        `(filtrées à partir des  ${nf.format(dtObj._iRecordsTotal)} entrées totales)<br/>` + ('') : isSpanish ? `(filtrado de un total de ${nf.format(dtObj._iRecordsTotal)} entradas)<br/>` + ('') :
          isGermen ? `(gefiltert aus  ${nf.format(dtObj._iRecordsTotal)} Einträgen)<br/>` + ('') :
            `(filtered from  ${nf.format(dtObj._iRecordsTotal)} total entries)<br/>` + ('')) :
      ''}`;
    const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
    const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
    $('div [role="status"]').html(isFrench ?
      `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des  ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` : isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de  ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` : isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von  ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered}` :
        `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of  ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
    );
    $(".first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Erste Seite' : 'First');
    $(".previous").text(isFrench ? 'Précédent' : isSpanish ? 'Anterior' : isGermen ? 'Zurück' : 'Previous');
    $(".next").text(isFrench ? 'Suivant' : isSpanish ? 'Siguiente' : isGermen ? 'Weiter' : 'Next');
    $(".last").text(isFrench ? 'Dernière' : isSpanish ? 'Último' : isGermen ? 'Letzte' : 'Last');
  }
  //Error model
  openErrorsFoundModal(modal) {
    this.findMissingValuesForErrorPopUp(this.userList);
    this.dialogService.open(modal, { size: 'xl', centered: true, windowClass: 'errors-found-modal' });
  };
  apiErrors: string[] = [];
  //Stop model
  openStopUserPopup(modal) {
    // (this.submissionStatus = 'stop')
    // this.findMissingValuesForErrorPopUp(this.userList);
    this.dialogService.open(modal, { size: 'xl', centered: true, windowClass: 'stop-user-modal' });
  };
  // find the missing values
  findMissingValuesForErrorPopUp(value) {
    this.missingvalues = [];
    value.forEach((e, i) => {
      if (!e.firstName) {
        this.missingvalues.push(`<b>Row ${i + 1}:</b> Empty value in “First Name” column`);
        this.statusIconInfo[i] = 'error';
      }
      if (!e.lastName) {
        this.missingvalues.push(`<b>Row ${i + 1}:</b> Empty value in “Last Name” column`);
        this.statusIconInfo[i] = 'error';
      }
      if (!e.email) {
        this.missingvalues.push(`<b>Row ${i + 1}:</b> Empty value in “Email” column`);
        this.statusIconInfo[i] = 'error';
      }
      if (e.email && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.email)) {
        this.missingvalues.push(`<b>Row ${i + 1}:</b> Invalid email syntax`);
        this.statusIconInfo[i] = 'error';
      }
      if (e.community.length > 8) {
        this.missingvalues.push(`<b>Row ${i + 1}:</b> Subcriber can only have upto 8 communities`);
      }
      e.community = e.community?.map(e => {
        let value = this.microSiteList.find(m => m.communityName == e.communityName);
        if (!value) {
          this.missingvalues.push(`<b>Row ${i + 1}:</b> Community “${e.communityName}” is not available`);
          this.statusIconInfo[i] = 'error';
        }
        return value ? { micrositeId: value.id, communityName: e.communityName } : e
      })
      if (!e.community?.length) {
        this.statusIconInfo[i] = 'error';
        this.missingvalues.push(`<b>Row ${i + 1}:</b> Empty value in “Community Name” column`);
      }
    });
    this.missingvalues = this.missingvalues.concat(this.apiErrors).sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
    this.apiErrors = [];
    this.errorInAllLines = value.every((e, i) => !this.errorFound(e, i))
  };
  errorInAllLines: boolean;
  //To Close POP UP Models
  close() {
    this.dialogService.dismissAll('Cross Click')
  };
  statusIconInfo: string[] = [];
  // Find any value missing in purticular row
  errorFound(item, index?) {
    return Object.values(item).filter(e => Array.isArray(e) ? e.length : e).length > 3 && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(item.email) && item?.community?.every(c => this.microSiteList.some(e => e.communityName === c.communityName)) && item?.community.length <= 8;

  };
  // Save Users One By One
  saveUsers(sort?) {
    if (sort) {
      let index = --this.sortedColumnDetails[0];
      let sortedKey = index == 0 ? 'firstName' : index == 2 ? 'email' : 'community';
      let sortOrder = this.userList.map((e, i) => ({ value: e, status: this.statusIconInfo[i] })).sort(({ value: a }, { value: b }): number => {
        let value = (this.sortedColumnDetails[1] === 'asc') ? (a[sortedKey].toString().localeCompare(b[sortedKey])) : (b[sortedKey].toString().localeCompare(a[sortedKey]));
        return value
      });

      this.userList = sortOrder.map(e => e.value);
      this.statusIconInfo = sortOrder.map(e => e.status)
      this.submissionStatus = 'in progress';
    }
    if (this.savedSubscribersCount == undefined) {
      this.savedSubscribersCount = 0;
      this.statusIconInfo[this.savedSubscribersCount] = 'inprogress';
    }

    // Deep Copy
    let value = JSON.parse(JSON.stringify(this.userList[this.savedSubscribersCount]));
    if (!this.errorFound(value)) {
      this.statusIconInfo[this.savedSubscribersCount] = 'error';
      return this.recursionSaveUsers()
    };
    this.subscriptions.push(this.myCommunityIqService.saveUsers(value, this.orgId).subscribe(res => {
      console.log(res);
      this.statusIconInfo[this.savedSubscribersCount] = 'success';
      this.recursionSaveUsers();
    }, err => {
      this.apiErrors.push(`<b>Row ${this.savedSubscribersCount + 1}:</b> ${err.error.errorMessage}`);
      this.statusIconInfo[this.savedSubscribersCount] = 'error';
      this.recursionSaveUsers();
      this.pageErrorHandle(err)
    }));
  }
  errorInfo: any;
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
  }
  recursionSaveUsers(): void {
    if ((this.userList.length - 1) === this.savedSubscribersCount) {
      this.submissionStatus = this.statusIconInfo.some(e => e === 'success') ? 'success' : 'stop';
      this.close()
    }
    this.savedSubscribersCount++;
    this.statusIconInfo[this.savedSubscribersCount] = 'inprogress';

    if (this.submissionStatus == 'in progress') this.saveUsers();
  }
  // Navigating To Community-Users Listing Page
  goBack() {
    this.router.navigate(['/organization-admin/SmartTownWi-Fi/community-users']);
  };
  microSiteList: any = [];
  getMicroSites() {
    this.subscriptions.push(this.myCommunityIqService.GetMicrosite().subscribe((res: any) => {
      this.microSiteList = res;
      this.GetCSVValue();
      this.loader = false;
    }, err => {
      this.loader = false;
      this.pageErrorHandle(err)
    }))
  };
  dataTableSetting: any;
  GetCSVValue() {

    this.subscriptions.push(this.myCommunityIqService.communityListSubject.subscribe((res: user[]) => {
      this.rowcn = res.length
      console.log("length=", this.rowcn)
      this.statusIconInfo = Array.from({ length: res.length }, () => '');

      this.userList = res;

      this.dtOptions.displayStart = this._iDisplayStart ? this._iDisplayStart : 0;
      this.dtOptions.drawCallback = (settings) => {
        this.sortedColumnDetails = settings.aaSorting.flat(1);
        this._iDisplayStart = settings._iDisplayStart


        this.dataTableSetting = settings

        this.changeTableStatusLanguage(settings)

        let total = settings.aoData.length;
        let length = settings._iDisplayLength;

        if (total <= length) {
          $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');

        }
      };
      this.findMissingValuesForErrorPopUp(res);
    }));
  };
  // reviceMissingErrorData(){
  //   let index = --this.sortedColumnDetails[0];
  //   let sortedKey = index == 0 ? 'firstName' : index == 2 ? 'email' : 'community';
  //   let sortOrder = this.userList.map((e, i) => ({ value: e, status: this.statusIconInfo[i] })).sort(({ value: a }, { value: b }): number => {
  //     let value = (this.sortedColumnDetails[1] === 'asc') ? (a[sortedKey].toString().localeCompare(b[sortedKey])) : (b[sortedKey].toString().localeCompare(a[sortedKey]));
  //     return value
  //   });
  //   this.findMissingValuesForErrorPopUp(sortOrder);
  // }
  //Unsubscribing All Subscriptions To Prevent Memory Leak
  ngOnDestroy(): void {
    this.subscriptions?.forEach(e => e?.unsubscribe());
  };
  getRoundedValue(num) {
    return Math.round(num);
  }
}
export interface user {
  email: string,
  firstName: string,
  lastName: string,
  community: Object[]
}

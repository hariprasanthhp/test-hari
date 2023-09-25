import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { DataTableDirective } from 'angular-datatables';
import { Subject, fromEvent, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.scss']
})
export class RecipientsComponent implements OnInit {

  searchRec = new FormControl('');
  optInStatus = new FormControl('All');
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();

  loading = false;
  showTable = false;
  hasScopeAccess = true;
  language: any;
  languageSubject: any;
  list: any = [];

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  initLoad: any;
  optInStatusList: any = [
    { id: 'All', name: 'All recipients' },
    { id: 'Cancelled', name: 'Cancelled' },
    { id: 'Confirmed', name: 'Confirmed' },
    { id: 'Expired', name: 'Expired' },
    { id: 'Pending', name: 'Pending' }
  ];


  colorBtnMap = {
    Cancelled: 'complete-but',
    Confirmed: 'running-but',
    Expired: 'expired-but',
    Pending: 'paused-but',
  }

  constructor(private translateService: TranslateService,
    private http: HttpClient,
    private commonOrgService: CommonService,
    private titleService: Title,) { }

  ngOnInit(): void {

    this.language = this.translateService.defualtLanguage;
    this.tableLanguageOptions();
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Recipients']} - ${this.language['Alarm & Health Notifications']} - ${this.language['Alarms']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
      this.tableLanguageOptions();
      this.showTable = false;
      setTimeout(() => {
        this.showTable = true;
        this.subscribeCount('');
      }, 100)

    });

    this.titleService.setTitle(`${this.language['Recipients']} - ${this.language['Alarm & Health Notifications']} - ${this.language['Alarms']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    this.listenSearch();
    this.subscribeCount('');
  }
  searchSub;
  listenSearch() {
    this.searchSub = fromEvent(document.getElementById('search-rec'), 'keyup')
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((e: any) => {
          console.log(e);
          this.list = [];
          return this.getCount(e.target.value);
        }),
      )
      .subscribe(value => {
        if (value?.['api-error']) {
          return;
        }
        this.filterCount = value ? value : 0;
        this.redraw();
      });
  }

  count: any = 0;
  filterCount: any;
  getCount(searchValue) {
    this.loading = true;
    let url = `${environment.API_BASE_URL}analytics-engine/subscriptionsCount?optInStatus=${this.optInStatus.value}`;

    if (searchValue) {
      url += `&recipientFilter=${encodeURIComponent(searchValue)}`;
    } else if (this.searchRec.value) {
      url += `&recipientFilter=${encodeURIComponent(this.searchRec.value)}`;
    }
    return this.http.get(url).pipe(
      catchError(err => {
        err['api-error'] = true;
        this.showErrorMessage(this.commonOrgService.pageErrorHandle(err));
        return of(err);
      }),
    );
  }

  subscribeCount(searchValue, clearInputs?: any) {
    if (clearInputs) {
      this.searchRec.setValue('');
      this.optInStatus.setValue('All');
    }
    this.getCount(searchValue).subscribe((value: any) => {
      if (value?.['api-error']) {
        return;
      }

      if (!this.initLoad) {
        this.count = value ? value : 0;
      }


      this.filterCount = value ? value : 0;
      if (this.initLoad) {
        this.redraw();
      } else {
        this.getData(searchValue);
      }

    });
  }

  getData(searchValue?: any) {
    this.showTable = true;
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      serverSide: true,
      processing: false,
      lengthChange: false,
      //ordering: false,
      dom: 'tipr',
      columnDefs: [
        { orderable: true, className: 'reorder', targets: 0 },
        { orderable: false, targets: '_all' }
      ],
      ajax: (dataTablesParameters: any, callback) => {
        console.log(dataTablesParameters);

        let url = `${environment.API_BASE_URL}analytics-engine/subscriptionsStatus?offset=${dataTablesParameters.start}&pageSize=${dataTablesParameters.length}&optInStatus=${this.optInStatus.value}&sortingOrder=${dataTablesParameters?.order?.[0]?.dir?.toUpperCase()}`;
        if (dataTablesParameters.search?.value) {
          url += `&recipientFilter=${encodeURIComponent(dataTablesParameters.search?.value)}`;
        }

        this.http
          .get(url)
          .subscribe((resp: any) => {
            //console.log(resp);
            this.list = resp ? resp : [];
            this.loading = false;
            callback({
              recordsTotal: this.count ? this.count : 0,
              recordsFiltered: this.filterCount != undefined ? this.filterCount : this.count,
              data: []
            });
          }, (err: any) => {
            this.loading = false;
            this.showErrorMessage(this.commonOrgService.pageErrorHandle(err));
            callback({
              recordsTotal: this.count ? this.count : 0,
              recordsFiltered: this.filterCount != undefined ? this.filterCount : this.count,
              data: []
            });
          }, () => {
            this.initLoad = true;
            this.loading = false;
          });
      }, drawCallback: (settings) => {
        this.tableLanguageOptions();
      },
    };
    this.tableLanguageOptions();

  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.translateService.es;
    } else if (
      this.language.fileLanguage == 'en' &&
      this.dtOptions.language
    ) {
      delete this.dtOptions.language;
    }
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  showErrorMessage(msg: string) {
    this.closeAlert();
    this.errorInfo = msg;
    this.error = true;
    this.loading = false;
    //this.commonOrgService.pageScrollTop();
  }

  clearSearchInp() {
    this.searchRec.setValue('');
    this.subscribeCount('');
  }

  redraw() {
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.search(this.searchRec.value).draw();
    });
  }

  convertToDateTime(dateTime: any) {
    if (!dateTime) {
      return
    }

    dateTime = Number(dateTime);

    let pipe = new DatePipe('en-US');
    return pipe.transform(new Date(dateTime), 'short');
  }

  doRefresh() {
    this.loading = true;
    this.http.post(`${environment.API_BASE_URL}analytics-engine/synchronizeSubscriptionsStatus`, {}, { responseType: 'text' }).pipe(
      catchError(err => {
        err['api-error'] = true;
        this.loading = false;
        this.showErrorMessage(this.commonOrgService.pageErrorHandle(err));
        return of(err);
      }),
    ).subscribe((json: any) => {
      this.subscribeCount('', true);
    });
  }

}

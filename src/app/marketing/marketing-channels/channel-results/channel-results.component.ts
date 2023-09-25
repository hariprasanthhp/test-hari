import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from 'src/app-services/translate.service';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { transpileModule } from 'typescript';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-channel-results',
  templateUrl: './channel-results.component.html',
  styleUrls: ['./channel-results.component.scss']
})
export class ChannelResultsComponent implements OnInit {
  language: any;
  languageSubject: any;
  dtOptions: DataTables.Settings = {};
  showDataTable = false;
  marketingChannelTable = [];
  loading = true;

  isRerender = false;
  lastUpdate: any = ''
  timeframes = [
    { value: '1', name: '1 month' },
    { value: '3', name: '3 months' },
    { value: '6', name: '6 months' },
    { value: '12', name: '12 months' },
  ];
  selectVal: any = "1";
  channelResultTable = []
  filterSearchList = [];
  activePeriod: any;
  search_Text_Value: any;
  mailchimpErrorMsg: string;
  mailchimpError: boolean = false;
  mailchimpResultsError: boolean = false;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {

    // this.dataService.sendDates(this.dateFrom, this.dateTo);
    this.router.navigate(['/engagement/engagement-channel'], { state: { value: 'channel' || "" } })
  }
  constructor(private dialogService: NgbModal,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private sso: SsoAuthService,
    private titleService: Title,
    private _location: Location) { }

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      pageLength: 10,
      lengthChange: false,
      ordering: true,
      searching: true,
      dom: 'tipr',
      retrieve: true,
      initComplete:()=>{
        setTimeout(() => {
        this.showDataTable=true;
        }, 600);
      }
    };
    this.getViewResult(this.selectVal)

    this.language = this.translateService.defualtLanguage;
    this.activePeriod = this.language.channelmonth.month_1;
    this.setLanguageTimeFrame();
    let activePeriodIndex = 0;
    this.tableLanguageOptions()
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.getViewResult(this.selectVal)
      this.language = data;
      this.titleService.setTitle('Results - Mailchimp -  Marketing - Calix Cloud');
      this.titleService.setTitle(`${this.language["MailChimp_Marketing_Channel_Results"]}-${this.language["Campaigns"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
      this.timeframes.forEach((data, index) => {
        if (data.name == this.activePeriod) { activePeriodIndex = index }
      });
      this.setLanguageTimeFrame();
      this.activePeriod = this.timeframes[activePeriodIndex].name;
      this.tableLanguageOptions();

    });
    this.titleService.setTitle(`${this.language["MailChimp_Marketing_Channel_Results"]}-${this.language["Campaigns"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
  }
  setLanguageTimeFrame() {
    this.timeframes = [
      { value: '1', name: this.language.channelmonth.month_1 },
      { value: '3', name: this.language.channelmonth.months_3 },
      { value: '6', name: this.language.channelmonth.months_6 },
      { value: '12', name: this.language.channelmonth.months_12 },
    ];
  }
  search_Text_Valuefun(){
    this.search_Text_Value =''
    this.getViewResult(this.selectVal);
  }
  getViewResult(data) {
    this.loading = true;
    this.showDataTable = false;
    this.http.get(`${environment.API_BASE_URL}cmc-mchannel/marketingChannel/results/Mailchimp?months=` + data).subscribe((json: any) => {
      this.mailchimpResultsError = false;
      this.mailchimpError = false;

      setTimeout(() => {
        if (this.isRerender) {
          this.rerender();
          if (json) {
            this.channelResultTable = json.campaigns
            this.lastUpdate = json.lastUpdate
            this.filterSearchList = this.channelResultTable;
          }
        } else {
          this.isRerender = true;
          this.rerender();
         // this.showDataTable = true;
          if (json) {
            this.channelResultTable = json.campaigns
            this.mailchimpResultsError = false;
            this.lastUpdate = json.lastUpdate
            this.filterSearchList = this.channelResultTable;
          }
        }
        this.dtTrigger.next();
        this.loading = false;
        if (this.search_Text_Value) {
          this.searchName(this.search_Text_Value)
        }
      }, 100);
    }, (err: any) => {
      this.mailchimpResultsError = true;
      this.showDataTable = true;
      this.dtTrigger.next();
      this.channelResultTable = [];
      this.rerender();
      this.loading = false;
      if (err.status === 500) {
        this.mailchimpError = true;
        this.mailchimpErrorMsg = 'Error! Internal Server Error';
      }
      else if (err.status === 504 || err.status == 502) {
        this.mailchimpError = true;
        this.mailchimpErrorMsg = 'Error! Gateway Time-Out';
      }
    });
  }
  errorReset() {
    this.loading = false;
    this.mailchimpError = false;
  }
  searchName(searchText) {
    // debugger;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(searchText).draw();
    });
    // this.search_Text_Value = searchText
    // if (searchText && searchText.length >= 3) {
    //   let channelName_nameList = this.filterSearchList.filter((x: any) =>
    //     x.campaignName.toLowerCase().includes(searchText.toLowerCase())
    //   );
    //   let campaignType_descList = this.filterSearchList.filter((x: any) =>
    //     x.campaignType.toLowerCase().includes(searchText.toLowerCase())
    //   );
    //   this.rerender();
    //   this.channelResultTable = [...channelName_nameList, ...campaignType_descList];
    // } else {
    //   this.rerender();
    //   this.channelResultTable = this.filterSearchList;
    // }
  }
  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
  }
  selectTimeFrame(data) {
    this.timeframes.filter(x => {
      if (x.name == data) {
        this.selectVal = x.value;
        this.loading = true;
        this.getViewResult(this.selectVal);
      }
    })
  }
  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'en') {
      delete this.dtOptions.language;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    }
    else if (this.language.fileLanguage = 'es') {
      this.dtOptions.language = this.translateService.es;
    }

    // if (this.isRerender) {
    //   this.rerender()
    // }
  }
  rerender(): void {
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      dtInstance.clear();
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  closeModal() {
    this.router.navigate(['/engagement/engagement-channel'], { state: { value: 'channel' || "" } })

  }

  getTimestamp(date) {
    return new Date(date).getTime()
  }
  getTimeFormat(date) {
    let dateFormat = new Date(Date.parse(date));
    return dateFormat.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' });
  }

}

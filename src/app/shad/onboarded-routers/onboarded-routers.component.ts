import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExosReportService } from "../service/exos-report.service";
import { SsoAuthService } from "../../shared/services/sso-auth.service";
import * as $ from "jquery";
import { TranslateService } from 'src/app-services/translate.service';


@Component({
  selector: 'app-onboarded-routers',
  templateUrl: './onboarded-routers.component.html',
  styleUrls: ['./onboarded-routers.component.scss']
})
export class OnboardedRoutersComponent implements OnInit {
  language: any;
  languageSubject;

  serviceSubscription: any;
  loader: boolean = true;
  onBoardedRoutersData = [];
  routersCount = 0;
  data_type: any;
  tab_text: any;
  showExportBtn: boolean = false;
  constructor(
    public service: ExosReportService,
    private sso: SsoAuthService,
    private translateService: TranslateService

  ) {
    localStorage.setItem('onboardrouters', "true");
  }

  ngOnInit() {
    //this.onBoardedRoutersData = this.dataService.onBoardRoutersData;
    this.loadRecords();

    let scope = this.sso.getScopes();

    if (scope['cloud.shad.service'] && scope['cloud.shad.service'].indexOf('write') !== -1) {
      this.showExportBtn = true;
    }

    $($("#testAnchor")[0]).click(() => {
      $('#testAnchor').attr('href', this.data_type + ', ' + encodeURIComponent(this.tab_text));
      var saveFile = this.sso.getSPID() + "-onboard-routers.xls";
      $('#testAnchor').attr('download', saveFile);
    });
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

  }

  error = false;
  errorMsg: any = '';

  showError(errorMsg: any) {
    this.error = true;
    this.errorMsg = errorMsg;
  }

  hideError() {
    this.error = false;
    this.errorMsg = '';
  }

  loadRecords(): void {
    this.service.getExosReport();
    this.serviceSubscription = this.service.result$.subscribe(
      (res: any) => {
        //this.onBoardedRoutersData = res.results;	
        if (typeof res == 'object' && res['error']) {
          this.showError(res['errorMsg']);
          this.loader = false;
          return;
        }
        this.routersCount = res;
        this.loader = false;

      },
      (err: any) => {
        //console.log(err);
        this.loader = false;

      }
    );
  }

  downloadExcel(): void {
    let tab_text: any;
    this.data_type = 'data:application/vnd.ms-excel';


    tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
    tab_text = tab_text + '<meta http-equiv="Content-type" content="text/html;charset=utf-8" />';

    tab_text = tab_text + '<x:Name>EXOS Reports</x:Name>';

    tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
    tab_text = tab_text + "<table border='0'><tr style='text-align: center; vertical-align: middle;'><td>SPID</td><td>" + this.sso.getSPID() + "</td></tr><tr style='text-align: center; vertical-align: middle;'><td>Number of Subscribers</td><td>" + this.routersCount + "</td></tr>";
    tab_text = tab_text + '<tr><td></td></tr><tr><td></td></tr></table>';

    tab_text = tab_text + "<table border='1px'>";
    tab_text = tab_text + $('#billing-report-table').html();;
    tab_text = tab_text + '</table></body></html>';

    this.data_type = 'data:application/vnd.ms-excel';
    this.tab_text = tab_text;

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    ////console.log(this.tab_text);
    // alert(1);
    // return;

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || window.navigator.userAgent.indexOf("Edge") > -1) {
      if (window.navigator.msSaveBlob) {
        var blob = new Blob([tab_text], {
          type: "application/csv;charset=utf-8;"
        });
        var saveFile = this.sso.getSPID() + "-onboard-routers.xls";
        navigator.msSaveBlob(blob, saveFile);
      }
    } else {
      $('#testAnchor')[0].click();
    }

  }

  ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
    this.service.undoService();
    this.languageSubject.unsubscribe();

  }

}

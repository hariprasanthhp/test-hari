import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import * as $ from 'jquery';

import { HttpErrorResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';

import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { SupportWifiService } from '../../support-wifi/services/support-wifi.service';
import { SupportWifiChartOptionsService } from '../../support-wifi/services/support-wifi-chart-options.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.scss']
})
export class SignalComponent implements OnInit {

  @Input('routerData') routerData;
  @Input('fsan') fsan;
  @Input('orgId') orgId;

  Highcharts = Highcharts;
  chartDataParsed: any;
  chartData: any;
  chartOptions: any = {};
  errorInfo: any;
  error: boolean;
  language: any;
  languageSubject: any;
  showChart: boolean;
  loading: boolean = true;
  constructor(
    private api: SupportWifiService,
    private options: SupportWifiChartOptionsService,
    private commonOrgService: CommonService,
    private sso: SsoAuthService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  ngOnChanges() {
    this.loadChart();
  }

  loadChart() {
    let mac;
    if (this.routerData.macAddress) {
      mac = this.routerData.macAddress;
    } else if (this.routerData.MACAddress) {
      mac = this.routerData.MACAddress;
    }

    // this.api.getSignalStrength(this.orgId, this.fsan, mac).subscribe((res: any) => {

    //   //res = this.getDummy();
    //   if (res && res.length) {
    //     this.chartDataParsed = JSON.parse(res);

    //     this.chartData = this.chartDataParsed.data;
    //     if (Object.keys(this.chartDataParsed).length && this.chartData && this.chartData.length) {

    //       this.chartOptions = this.options.SignalStrengthChartOptions(this.chartData, 'hour', this.language);
    //       this.Highcharts.chart('wifi-signal-chart', this.chartOptions);
    //       this.showChart = true;
    //       this.loading = false;
    //     } else {
    //       this.loading = false;
    //     }
    //   } else {
    //     this.showChart = false;
    //     this.loading = false;
    //   }
    // }, (err: HttpErrorResponse) => {
    //   this.pageErrorHandle(err);
    //   this.loading = false;
    // });


  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.sso.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }
  closeAlert() {
    this.error = false;
  }

  // loadChart() {

  //   this.dataService.multiLineChartOptions().subscribe((data) => {

  //     let chart = Highcharts.chart('signal-chart', data)
  //     // this.Highcharts.chart('signal-chart', data);
  //   })

  // }

  // ngOnDestroy() {
  //   this.languageSubject.unsubscribe();
  //   let dummy = `"{\"data\":[{\"time\":1609437600000,\"rssi\":-75,\"phyrateUp\":22068,\"phyrateDown\":28631,\"bytesUp\":17170,\"bytesDown\":5224},{\"time\":1609462800000,\"rssi\":-80,\"phyrateUp\":2250,\"phyrateDown\":43600,\"bytesUp\":3990,\"bytesDown\":914},{\"time\":1609477200000,\"rssi\":-73,\"phyrateUp\":6000,\"phyrateDown\":1,\"bytesUp\":0,\"bytesDown\":0},{\"time\":1609610400000,\"rssi\":-73,\"phyrateUp\":17000,\"phyrateDown\":57800,\"bytesUp\":4140,\"bytesDown\":914},{\"time\":1609725600000,\"rssi\":-48,\"phyrateUp\":520664,\"phyrateDown\":175761.8,\"bytesUp\":795888.8,\"bytesDown\":60277463.2},{\"time\":1609729200000,\"rssi\":-45,\"phyrateUp\":740423.25,\"phyrateDown\":254548.25,\"bytesUp\":5059190.5,\"bytesDown\":302413891},{\"time\":1609732800000,\"rssi\":-58,\"phyrateUp\":704175,\"phyrateDown\":67900,\"bytesUp\":1934028.5,\"bytesDown\":150544335},{\"time\":1609736400000,\"rssi\":-43,\"phyrateUp\":747271.25,\"phyrateDown\":281864.75,\"bytesUp\":94541,\"bytesDown\":2341556.25},{\"time\":1609740000000,\"rssi\":-46,\"phyrateUp\":760121,\"phyrateDown\":277476,\"bytesUp\":120040,\"bytesDown\":375921},{\"time\":1609826400000,\"rssi\":-35,\"phyrateUp\":950613,\"phyrateDown\":627161.75,\"bytesUp\":38929.25,\"bytesDown\":318165},{\"time\":1609898400000,\"rssi\":-24,\"phyrateUp\":23154,\"phyrateDown\":10695.5,\"bytesUp\":3363381,\"bytesDown\":870350},{\"time\":1609902000000,\"rssi\":-24,\"phyrateUp\":44324,\"phyrateDown\":10458.5,\"bytesUp\":9561858.5,\"bytesDown\":1803561.25},{\"time\":1609905600000,\"rssi\":-24,\"phyrateUp\":48398.75,\"phyrateDown\":7380.5,\"bytesUp\":18872823.25,\"bytesDown\":2906303.25},{\"time\":1609909200000,\"rssi\":-35,\"phyrateUp\":344983,\"phyrateDown\":188848.125,\"bytesUp\":14737433.5,\"bytesDown\":4203230},{\"time\":1609912800000,\"rssi\":-42,\"phyrateUp\":427955.4166666667,\"phyrateDown\":231449.83333333334,\"bytesUp\":13924624.5,\"bytesDown\":20111139.333333332},{\"time\":1609916400000,\"rssi\":-37,\"phyrateUp\":551035.8888888889,\"phyrateDown\":308242,\"bytesUp\":20878321.111111112,\"bytesDown\":2879757.6666666665},{\"time\":1609920000000,\"rssi\":-33,\"phyrateUp\":610188,\"phyrateDown\":298412.625,\"bytesUp\":28067981.625,\"bytesDown\":13333671.125},{\"time\":1609923600000,\"rssi\":-43,\"phyrateUp\":217357.27272727274,\"phyrateDown\":165785.18181818182,\"bytesUp\":24128675.09090909,\"bytesDown\":19281652.454545453},{\"time\":1609927200000,\"rssi\":-32,\"phyrateUp\":31066.8,\"phyrateDown\":13283,\"bytesUp\":55570719.6,\"bytesDown\":6899218.4},{\"time\":1609930800000,\"rssi\":-25,\"phyrateUp\":43219.25,\"phyrateDown\":6373.5,\"bytesUp\":75306123,\"bytesDown\":9481051.25},{\"time\":1609934400000,\"rssi\":-25,\"phyrateUp\":45219.75,\"phyrateDown\":6413,\"bytesUp\":81823767,\"bytesDown\":10148215.5},{\"time\":1609938000000,\"rssi\":-24,\"phyrateUp\":40491.25,\"phyrateDown\":5651,\"bytesUp\":89819850.75,\"bytesDown\":11076016.25},{\"time\":1609941600000,\"rssi\":-25,\"phyrateUp\":43829.5,\"phyrateDown\":8400.25,\"bytesUp\":96917188.75,\"bytesDown\":12407339},{\"time\":1609945200000,\"rssi\":-24,\"phyrateUp\":29878.25,\"phyrateDown\":5054,\"bytesUp\":105575751.25,\"bytesDown\":13772618},{\"time\":1609948800000,\"rssi\":-25,\"phyrateUp\":41506.25,\"phyrateDown\":11107.75,\"bytesUp\":110584839,\"bytesDown\":14388063.75},{\"time\":1609952400000,\"rssi\":-25,\"phyrateUp\":40650.5,\"phyrateDown\":9383.5,\"bytesUp\":117329749,\"bytesDown\":15792788.75},{\"time\":1609956000000,\"rssi\":-24,\"phyrateUp\":43464,\"phyrateDown\":9756.75,\"bytesUp\":123519538,\"bytesDown\":16680492.25},{\"time\":1609959600000,\"rssi\":-24,\"phyrateUp\":31273.75,\"phyrateDown\":2387.75,\"bytesUp\":128079758,\"bytesDown\":17127191.5},{\"time\":1609963200000,\"rssi\":-24,\"phyrateUp\":31160.5,\"phyrateDown\":5171.75,\"bytesUp\":134475742.75,\"bytesDown\":17707859.25},{\"time\":1609966800000,\"rssi\":-25,\"phyrateUp\":36681.5,\"phyrateDown\":8129.75,\"bytesUp\":146638974.75,\"bytesDown\":19292621.75},{\"time\":1609970400000,\"rssi\":-35,\"phyrateUp\":24710.8,\"phyrateDown\":14507,\"bytesUp\":122565619.8,\"bytesDown\":16277502.6},{\"time\":1609974000000,\"rssi\":-24,\"phyrateUp\":38448.25,\"phyrateDown\":5149.75,\"bytesUp\":160956347.5,\"bytesDown\":21529964.25},{\"time\":1609977600000,\"rssi\":-24,\"phyrateUp\":43583.5,\"phyrateDown\":6162.25,\"bytesUp\":166261243.75,\"bytesDown\":22663944},{\"time\":1609981200000,\"rssi\":-24,\"phyrateUp\":37880,\"phyrateDown\":7305.25,\"bytesUp\":171495818.25,\"bytesDown\":23424947.75},{\"time\":1609984800000,\"rssi\":-25,\"phyrateUp\":45936.75,\"phyrateDown\":3758.75,\"bytesUp\":178709834.25,\"bytesDown\":24344083.25},{\"time\":1609988400000,\"rssi\":-24,\"phyrateUp\":35504.75,\"phyrateDown\":7359.5,\"bytesUp\":184578799.25,\"bytesDown\":25076732},{\"time\":1609992000000,\"rssi\":-24,\"phyrateUp\":36202.75,\"phyrateDown\":8070.75,\"bytesUp\":191950176.25,\"bytesDown\":25966321.5},{\"time\":1609995600000,\"rssi\":-33,\"phyrateUp\":570938.375,\"phyrateDown\":356893.75,\"bytesUp\":99546437.375,\"bytesDown\":13467126.5},{\"time\":1609999200000,\"rssi\":-33,\"phyrateUp\":478915.5,\"phyrateDown\":394727.3333333333,\"bytesUp\":103251245.33333333,\"bytesDown\":14068423.5}],\"dataCount\":39}"`
  // }

  getDummy() {
    let dummy = "{\"data\":[{\"time\":1609437600000,\"rssi\":-75,\"phyrateUp\":22068,\"phyrateDown\":28631,\"bytesUp\":17170,\"bytesDown\":5224},{\"time\":1609462800000,\"rssi\":-80,\"phyrateUp\":2250,\"phyrateDown\":43600,\"bytesUp\":3990,\"bytesDown\":914},{\"time\":1609477200000,\"rssi\":-73,\"phyrateUp\":6000,\"phyrateDown\":1,\"bytesUp\":0,\"bytesDown\":0},{\"time\":1609610400000,\"rssi\":-73,\"phyrateUp\":17000,\"phyrateDown\":57800,\"bytesUp\":4140,\"bytesDown\":914},{\"time\":1609725600000,\"rssi\":-48,\"phyrateUp\":520664,\"phyrateDown\":175761.8,\"bytesUp\":795888.8,\"bytesDown\":60277463.2},{\"time\":1609729200000,\"rssi\":-45,\"phyrateUp\":740423.25,\"phyrateDown\":254548.25,\"bytesUp\":5059190.5,\"bytesDown\":302413891},{\"time\":1609732800000,\"rssi\":-58,\"phyrateUp\":704175,\"phyrateDown\":67900,\"bytesUp\":1934028.5,\"bytesDown\":150544335},{\"time\":1609736400000,\"rssi\":-43,\"phyrateUp\":747271.25,\"phyrateDown\":281864.75,\"bytesUp\":94541,\"bytesDown\":2341556.25},{\"time\":1609740000000,\"rssi\":-46,\"phyrateUp\":760121,\"phyrateDown\":277476,\"bytesUp\":120040,\"bytesDown\":375921},{\"time\":1609826400000,\"rssi\":-35,\"phyrateUp\":950613,\"phyrateDown\":627161.75,\"bytesUp\":38929.25,\"bytesDown\":318165},{\"time\":1609898400000,\"rssi\":-24,\"phyrateUp\":23154,\"phyrateDown\":10695.5,\"bytesUp\":3363381,\"bytesDown\":870350},{\"time\":1609902000000,\"rssi\":-24,\"phyrateUp\":44324,\"phyrateDown\":10458.5,\"bytesUp\":9561858.5,\"bytesDown\":1803561.25},{\"time\":1609905600000,\"rssi\":-24,\"phyrateUp\":48398.75,\"phyrateDown\":7380.5,\"bytesUp\":18872823.25,\"bytesDown\":2906303.25},{\"time\":1609909200000,\"rssi\":-35,\"phyrateUp\":344983,\"phyrateDown\":188848.125,\"bytesUp\":14737433.5,\"bytesDown\":4203230},{\"time\":1609912800000,\"rssi\":-42,\"phyrateUp\":427955.4166666667,\"phyrateDown\":231449.83333333334,\"bytesUp\":13924624.5,\"bytesDown\":20111139.333333332},{\"time\":1609916400000,\"rssi\":-37,\"phyrateUp\":551035.8888888889,\"phyrateDown\":308242,\"bytesUp\":20878321.111111112,\"bytesDown\":2879757.6666666665},{\"time\":1609920000000,\"rssi\":-33,\"phyrateUp\":610188,\"phyrateDown\":298412.625,\"bytesUp\":28067981.625,\"bytesDown\":13333671.125},{\"time\":1609923600000,\"rssi\":-43,\"phyrateUp\":217357.27272727274,\"phyrateDown\":165785.18181818182,\"bytesUp\":24128675.09090909,\"bytesDown\":19281652.454545453},{\"time\":1609927200000,\"rssi\":-32,\"phyrateUp\":31066.8,\"phyrateDown\":13283,\"bytesUp\":55570719.6,\"bytesDown\":6899218.4},{\"time\":1609930800000,\"rssi\":-25,\"phyrateUp\":43219.25,\"phyrateDown\":6373.5,\"bytesUp\":75306123,\"bytesDown\":9481051.25},{\"time\":1609934400000,\"rssi\":-25,\"phyrateUp\":45219.75,\"phyrateDown\":6413,\"bytesUp\":81823767,\"bytesDown\":10148215.5},{\"time\":1609938000000,\"rssi\":-24,\"phyrateUp\":40491.25,\"phyrateDown\":5651,\"bytesUp\":89819850.75,\"bytesDown\":11076016.25},{\"time\":1609941600000,\"rssi\":-25,\"phyrateUp\":43829.5,\"phyrateDown\":8400.25,\"bytesUp\":96917188.75,\"bytesDown\":12407339},{\"time\":1609945200000,\"rssi\":-24,\"phyrateUp\":29878.25,\"phyrateDown\":5054,\"bytesUp\":105575751.25,\"bytesDown\":13772618},{\"time\":1609948800000,\"rssi\":-25,\"phyrateUp\":41506.25,\"phyrateDown\":11107.75,\"bytesUp\":110584839,\"bytesDown\":14388063.75},{\"time\":1609952400000,\"rssi\":-25,\"phyrateUp\":40650.5,\"phyrateDown\":9383.5,\"bytesUp\":117329749,\"bytesDown\":15792788.75},{\"time\":1609956000000,\"rssi\":-24,\"phyrateUp\":43464,\"phyrateDown\":9756.75,\"bytesUp\":123519538,\"bytesDown\":16680492.25},{\"time\":1609959600000,\"rssi\":-24,\"phyrateUp\":31273.75,\"phyrateDown\":2387.75,\"bytesUp\":128079758,\"bytesDown\":17127191.5},{\"time\":1609963200000,\"rssi\":-24,\"phyrateUp\":31160.5,\"phyrateDown\":5171.75,\"bytesUp\":134475742.75,\"bytesDown\":17707859.25},{\"time\":1609966800000,\"rssi\":-25,\"phyrateUp\":36681.5,\"phyrateDown\":8129.75,\"bytesUp\":146638974.75,\"bytesDown\":19292621.75},{\"time\":1609970400000,\"rssi\":-35,\"phyrateUp\":24710.8,\"phyrateDown\":14507,\"bytesUp\":122565619.8,\"bytesDown\":16277502.6},{\"time\":1609974000000,\"rssi\":-24,\"phyrateUp\":38448.25,\"phyrateDown\":5149.75,\"bytesUp\":160956347.5,\"bytesDown\":21529964.25},{\"time\":1609977600000,\"rssi\":-24,\"phyrateUp\":43583.5,\"phyrateDown\":6162.25,\"bytesUp\":166261243.75,\"bytesDown\":22663944},{\"time\":1609981200000,\"rssi\":-24,\"phyrateUp\":37880,\"phyrateDown\":7305.25,\"bytesUp\":171495818.25,\"bytesDown\":23424947.75},{\"time\":1609984800000,\"rssi\":-25,\"phyrateUp\":45936.75,\"phyrateDown\":3758.75,\"bytesUp\":178709834.25,\"bytesDown\":24344083.25},{\"time\":1609988400000,\"rssi\":-24,\"phyrateUp\":35504.75,\"phyrateDown\":7359.5,\"bytesUp\":184578799.25,\"bytesDown\":25076732},{\"time\":1609992000000,\"rssi\":-24,\"phyrateUp\":36202.75,\"phyrateDown\":8070.75,\"bytesUp\":191950176.25,\"bytesDown\":25966321.5},{\"time\":1609995600000,\"rssi\":-33,\"phyrateUp\":570938.375,\"phyrateDown\":356893.75,\"bytesUp\":99546437.375,\"bytesDown\":13467126.5},{\"time\":1609999200000,\"rssi\":-33,\"phyrateUp\":478915.5,\"phyrateDown\":394727.3333333333,\"bytesUp\":103251245.33333333,\"bytesDown\":14068423.5}],\"dataCount\":39}";
    return dummy;
  }

}

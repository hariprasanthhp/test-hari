import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { HealthService } from '../../service/health.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-aetimeseries',
  templateUrl: './aetimeseries.component.html',
  styleUrls: ['./aetimeseries.component.scss']
})
export class AetimeseriesComponent implements OnInit {
  @Input() wholedata: any;
  @Input() title;
  @Input() system;
  timeseriesname: string;
  language: any;
  languageSubject: any;
  MultipleTimeseriesChartList: any = [];
  divid: any;
  chartnameid: string;
  singletimeseries: boolean;
  fsan_status: boolean = false;
  chartname: any;
  fsanlist: any;
  subTitle: string;
  paramname: any;
  count: number = 0;
  listoffsan: any;
  selectedfsan: any = [];
  fsanMultipleTimeseriesChartList: any = [];
  last24hours: any;
  lowFromDate: any;
  lowToDate: any;
  timeseriesDatamsg: any;
  Timeseriesloader: boolean;
  maxForStartDate: any;
  minDateForstart = new Date(new Date().setDate(new Date().getDate() - 727));
  maxDate = new Date();
  @ViewChild('showInfoModal', { static: true }) private showInfoModal: TemplateRef<any>;
  selectedlegendlist: any = {};
  ChartType: any;
  fsan: any;
  constructor(
    private translateService: TranslateService,
    private activeRoute: Router,
    private healthService: HealthService,
    private dateUtilsService: DateUtilsService,
    private commonOrgService: CommonService,
    private dialogService: NgbModal,
  ) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  ngOnInit(): void {
    let date = new Date();

    this.last24hours = this.wholedata?.last24hours ? this.wholedata?.last24hours : false;
    this.lowFromDate = this.wholedata?.params?.startTime ? this.wholedata?.params?.startTime : new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
    this.maxForStartDate = this.lowToDate = this.wholedata?.params?.endTime ? this.wholedata?.params?.endTime : new Date();
    this.ChartType = this.wholedata?.charttype == 'ae_General' ? 'ae_General' : 'ae';
    if (this.wholedata?.charttype == 'General')
      this.timeseriesname = this.title ? this.title : 'AE Health By Timeseries';
    else if (this.wholedata?.charttype == 'ae_General') {
      this.timeseriesname = this.title ? this.title : "AE Interface Health";
    } else
      this.timeseriesname = this.wholedata?.charttype == "ae_packet" ? 'Packets Error By Timeseries' : "Threshold Exceeded By Timeseries";
    this.divid = this.wholedata?.params?.divid;
    this.chartname = this.wholedata?.chartname;
    this.getlistoffsan()
    this.paramname = this.wholedata?.paramname;
    this.subTitle = `${this.language["region"]}: ${this.paramname?.regionname},
    ${this.language['location']}: ${this.paramname?.locationname}, ${this.language['System']}: ${this.paramname?.systemname}, ${this.language['interface']}: ${this.paramname?.interfacename}`
  }
  dropdownopen() {
    this.fsan_status = true;
  }
  getlistoffsan() {
    this.Timeseriesloader = true;
    let params = {
      tenant: "0",
      startTime: this.last24hours ? `${Math.ceil((this.dateUtilsService.getStartUtcTimeByDaysseconds(0) - 86400000) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.lowFromDate)}`,
      endTime: this.last24hours ? `${Math.ceil(this.dateUtilsService.getStartUtcTimeByDaysseconds(0) / 1000)}` : `${this.dateUtilsService.getUtCSecondsByDateObj(this.lowToDate, true)}`,
      region: this.wholedata?.params?.region,
      location: this.wholedata?.params?.location,
      system: this.wholedata?.params?.system,
      interface: this.wholedata?.params?.interface,
      ont: this.wholedata?.params?.ont ? this.wholedata?.params?.ont : "",
      fsan: this.wholedata?.params?.fsan ? this.wholedata?.params?.fsan : ""
    }
    params["granularity"] = this.healthService.getGranularity(params.startTime, params.endTime);
    let query = "";
    for (var key in params) {
      if (params[key] == undefined || params[key] == "undefined" || params[key] == "") {
        continue;
      }
      if (query != "") {
        query += "&";
      }
      query += key + "=" + encodeURIComponent(params[key]);

    }
    this.MultipleTimeseriesChartList = [];
    this.fsanlist = this.healthService.timeseries(query, this.ChartType).subscribe((res: any) => {
      this.listoffsan = res;
      this.MultipleTimeseriesChartList = [];
      this.Timeseriesloader = false; this.timeseriesDatamsg = "";
      if (res.length) {
        this.listoffsan?.forEach(element => {
          this.count = this.count + 1;

          let data = JSON.parse(JSON.stringify(this.wholedata));
          data.params["startTime"] = this.lowFromDate;
          data.params["endTime"] = this.lowToDate;
          data.params["fsan"] = element["fsan"];
          data.paramname["ont"] = element["fsan"];
          data.paramname['regionname'] = element['region'];
          data.paramname['locationname'] = element['location'];
          data.paramname['systemname'] = element['system'];
          data.paramname['interfacename'] = element['interface'];
          data.paramname['deleted'] = element['deleted'] == true ? true : "";

          setTimeout(() => {
            this.MultipleTimeseriesChartList.push({
              params: data.params,
              paramname: data.paramname,
              charttype: data.charttype == "ae_General" ? "General" : data.charttype,
              chartname: element["fsan"] + Math.floor(Math.random() * 100),
              divid: element["fsan"] + Math.floor(Math.random() * 100),
              page: 'ae',
              chartdata: element["timeseries"],
              legendselected: this.selectedlegendlist ? this.selectedlegendlist[element["fsan"]] : []
            });
            // this.loadedMultipleTimeseriesChart = [...this.loadedMultipleTimeseriesChart];
            console.log(this.MultipleTimeseriesChartList)
            if(this.MultipleTimeseriesChartList?.length !==0)this.fsan=this.MultipleTimeseriesChartList[0].params?.fsan
          }, 100)
        });
      } else {
        let data = JSON.parse(JSON.stringify(this.wholedata));
        data.params["startTime"] = this.lowFromDate;
        data.params["endTime"] = this.lowToDate;
        data.params["fsan"] = this.wholedata?.params?.fsan;
        data.paramname["ont"] = "";
        setTimeout(() => {
          this.MultipleTimeseriesChartList.push({
            params: data.params,
            paramname: data.paramname,
            charttype: data.charttype == "ae_General" ? "General" : data.charttype,
            chartname: "fsan" + Math.floor(Math.random() * 100),
            divid: Math.floor(Math.random() * 100) + 1,
            page: 'ae',
            chartdata: []
          });
          // this.loadedMultipleTimeseriesChart = [...this.loadedMultipleTimeseriesChart];
          console.log(this.MultipleTimeseriesChartList)
        }, 100)
      }

    }, (err) => {
      this.Timeseriesloader = false;
      if (err.status == 401) {
        this.timeseriesDatamsg = this.language['Access Denied'];
      }
      else {
        this.timeseriesDatamsg = this.commonOrgService.pageErrorHandle(err);
      }
    });
  }
  clearChartContainer(values: any) {
    var findindex = this.MultipleTimeseriesChartList.findIndex(x => x.chartname === values.chartname);
    if (findindex > -1) {
      this.MultipleTimeseriesChartList.splice(findindex, 1);
    }
  }
  selectedlegend(values: any) {
    if (this.selectedlegendlist.length > 0) {
      Object.keys(this.selectedlegendlist).includes(Object.keys(values)[0])
      delete this.selectedlegendlist.Object.keys(values)[0];
    }

    this.selectedlegendlist = Object.assign(this.selectedlegendlist, values);
  }
  applyfilter() {
    if (this.fsanMultipleTimeseriesChartList?.length) {
      let element_to_remove = [];
      this.fsanMultipleTimeseriesChartList.forEach(element => {
        //console.log(this.selectedfsan.includes(element.chartname))
        if (!this.selectedfsan.includes(element.chartname)) {
          element_to_remove.push(element);
        }
      });
      element_to_remove.forEach(element => {
        this.fsanclearChartContainer(element)
      })
    }
    this.selectedfsan.forEach(element => {
      this.count = this.count + 1;
      let data = JSON.parse(JSON.stringify(this.wholedata));
      data.params["startTime"] = this.wholedata.params['startTime'];
      data.params["endTime"] = this.wholedata.params['endTime'];
      data.params["fsan"] = element;
      data.paramname["ont"] = element;

      let IsDuplicate = false;
      if (this.fsanMultipleTimeseriesChartList?.length) {
        this.fsanMultipleTimeseriesChartList.forEach(ele => {
          if (ele.chartname == element) {
            IsDuplicate = true;
            // var elmnt = document.getElementById(element.fsan);
            // elmnt.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }

      if (IsDuplicate)
        return

      setTimeout(() => {
        this.fsanMultipleTimeseriesChartList.push({
          params: data.params,
          paramname: data.paramname,
          charttype: data.charttype,
          chartname: element,
          divid: element + Math.floor(Math.random() * 100),
          page: 'ae'
        });
        // this.loadedMultipleTimeseriesChart = [...this.loadedMultipleTimeseriesChart];
        console.log(this.fsanMultipleTimeseriesChartList)
      }, 100)
    });
  }
  fsanclearChartContainer(values: any) {
    var findindex = this.fsanMultipleTimeseriesChartList.findIndex(x => x.chartname === values.chartname);
    if (findindex > -1) {
      this.fsanMultipleTimeseriesChartList.splice(findindex, 1);
      // this.selectedfsan.splice(findindex, 1);
    }
    this.selectedfsan = this.selectedfsan.filter(id => id !== values.chartname);
    console.log(this.selectedfsan);

  }
  @Output() valueChange = new EventEmitter();
  closeChart() {
    this.singletimeseries = !this.singletimeseries;
    // this.doubleTimeseries = !this.doubleTimeseries
    let obj = {
      "chartname": this.chartname
    }
    this.valueChange.emit(obj);
  }
  modalInfo: string;
  modalTitle: any;
  modalRef: any;
  lowapplyfilter() {
    if (!this.validateStartEndDates()) {
      this.modalTitle = 'Time Period';
      // this.modalInfo = this.language['Time range not valid, end time should be later than start time.']
      this.openModalInfo();
      return;
    };
    this.getlistoffsan();
  }

  changeDate() {
    this.maxForStartDate = this.lowToDate;
    if (!this.validateStartEndDates()) {
      this.modalTitle = 'Time Period';
      //this.modalInfo = this.language['Time range not valid, end time should be later than start time.']
      this.openModalInfo();
      return;
    };
  }
  openModalInfo() {
    this.modalRef = this.dialogService.open(this.showInfoModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
  }
  validateStartEndDates() {
    let currentdate = new Date();
    if (!this.lowFromDate) {
      this.modalInfo = 'Time range not valid, end time should be later than start time.'
      return false;
    }

    if (this.lowFromDate > currentdate || this.lowToDate > currentdate) {
      this.modalInfo = 'Time range not valid, End Date and Start Date should not above current Date';
      return false;
    }

    if (this.lowFromDate && this.lowToDate) {
      if (this.dateUtilsService.getUtCSecondsByDateObj(this.lowFromDate) > this.dateUtilsService.getUtCSecondsByDateObj(this.lowToDate, true)) {
        this.modalInfo = 'Time range not valid, end time should be later than start time.';
        return false;
      }
      else if (this.dateUtilsService.getUtCSecondsByDateObj(this.lowFromDate) == this.dateUtilsService.getUtCSecondsByDateObj(this.lowToDate, true)) {
        this.modalInfo = 'Time range not valid, Start Date and End Date should not be same.';
        return false;
      }
      return true;
    } else {
      return true;
    }
  }
}

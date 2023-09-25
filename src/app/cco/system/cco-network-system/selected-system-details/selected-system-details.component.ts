import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { CcoCommonService } from 'src/app/cco/shared/services/cco-common.service';
import { CcoSystemService } from '../../services/cco-system.service';

@Component({
  selector: 'app-selected-system-details',
  templateUrl: './selected-system-details.component.html',
  styleUrls: ['./selected-system-details.component.scss']
})
export class SelectedSystemDetailsComponent implements OnInit {

  languageSubject;
  language: any;
  systemdata1: any[];
  tableData1: any;
  data: any;
  currentURL: string;
  id: any;
  systemdatas: any;
  subscriberdata: any[];
  selectFormData: any[];
  VideoProfiledata: any[];
  voiceFormData: any;
  ArloSmartData: any;
  isAddMode: boolean;

  constructor(
    private translateService: TranslateService,
    private ccoCommonService: CcoCommonService,
    private service: CcoSystemService,
    private router: Router,

    private route: ActivatedRoute,
  ) {
    this.ccoCommonService.currentPageAdder('system-details-view');
    this.currentURL = window.location.href;
  }


  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.route.params.subscribe(params => {
      return params
    })
    this.isAddMode = !this.id;
    this.id = this.route.snapshot.params['SN'];

    //this.ccoCommonService.listen('listsystemData').subscribe((data) => 
    //this.GetallDatas(data));
    this.getMessage()
  }
  GetallDatas(data) {

    this.systemdatas = [];
    this.subscriberdata = [];
    this.selectFormData = [];
    this.VideoProfiledata = [];
    this.voiceFormData = [];
    this.ArloSmartData = [];
    this.tableData1 = data;
    for (var i = 0; i < this.tableData1.length; i++) {
      this.data = JSON.parse(this.tableData1[i].datass);
      var systemdata = this.data.systemDetails;
      var systemServices = this.data.systemServices;

      if (this.id == systemdata.s_id) {
        this.subscriberdata.push(this.data.systemSubscriber)
        this.systemdatas.push(this.data.systemDetails);
        this.selectFormData.push(systemServices.mySelectForm)
        this.VideoProfiledata.push(systemServices.VideoProfileForm)
        this.voiceFormData.push(systemServices.MyserviceForm)
        this.ArloSmartData.push(systemServices.Arlo_SmartForm)

      }


    }
  }
  getMessage() {

    //this.ccoCommonService.emit('listsystemData');
  }

  closeDetail() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  edit(stateparams: { SN: any }) {

    this.router.navigate(['.././cco-add-new-system' + '/' + stateparams.SN], { relativeTo: this.route });
  }

}

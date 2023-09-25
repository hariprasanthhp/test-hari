import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { AddDataPlanComponent } from '../add-data-plan/add-data-plan.component';
import { AddStaticGroupsComponent } from '../add-static-groups/add-static-groups.component';
import { AddVideoPlanComponent } from '../add-video-plan/add-video-plan.component';
import { AddVoicePlanComponent } from '../add-voice-plan/add-voice-plan.component';

@Component({
  selector: 'app-system-advanced',
  templateUrl: './system-advanced.component.html',
  styleUrls: ['./system-advanced.component.scss']
})
export class SystemAdvancedComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(AddStaticGroupsComponent)
  childStaticGroups: AddStaticGroupsComponent;
  @ViewChild(AddDataPlanComponent)
  childDataPlan: AddDataPlanComponent;
  @ViewChild(AddVideoPlanComponent)
  childVideoPlan: AddVideoPlanComponent;
  @ViewChild(AddVoicePlanComponent)
  childVoicePlan: AddVoicePlanComponent;
  activeTab: string = 'DataPlan';
  @Input() sys_ServiceTiers;
  @Input() AllFormData;
  @Input() device;
  @Input() formOptions;
  @Input() servicesListData;
  @Output() private Out_sys_ServiceTiers: EventEmitter<any> = new EventEmitter();
  @Output() private out_sys_service_tiers_submit: EventEmitter<any> = new EventEmitter();
  @Input() staticGroups;
  @Input() deviceDataList: any[];
  @Input() servicedisable;
  @Input() preProvisionedSystem;
  syetemsAllData: any;
  @Output() private out_static_groups_change: EventEmitter<any> = new EventEmitter();
  @Output() private out_static_groups_submit: EventEmitter<any> = new EventEmitter();
  StaticForm: any = [];
  FormData: any = {
    SysDetails: {},
    SysServicetiers: {},
    SysEdgeSuites: {}
  }
  @Output() private advanced_enable_disable: EventEmitter<any> = new EventEmitter();
  language;
  languageSubject;
  constructor(private translateSerivce : TranslateService) {

  }
  ngOnDestroy(): void {
    if(this.languageSubject){
      this.languageSubject.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.syetemsAllData = this.AllFormData;
    this.StaticForm = this.staticGroups;
    this.FormData.SysServicetiers = this.sys_ServiceTiers;
    this.language = this.translateSerivce.defualtLanguage;
    this.languageSubject = this.translateSerivce.selectedLanguage.subscribe((data : any)=>{
      this.language = data;
    })
  }

  ngOnInit(): void {
    this.advanced_enable_disable.emit(true)
    this.language = this.translateSerivce.defualtLanguage;
    this.languageSubject = this.translateSerivce.selectedLanguage.subscribe((data : any)=>{
      this.language = data;
    })
  }


  gotoTab(tab) {
    this.advanced_enable_disable.emit(false)
    this.activeTab = tab ? tab : 'DataPlan';
  }

  OnFormData(key, value) {
    this.Out_sys_ServiceTiers.emit(value)
  }

  submitServiceData() {
    this.out_sys_service_tiers_submit.emit()
  }
  submitStaticGroups() {
    this.out_static_groups_submit.emit();
  }
  OnStaticFormData(event) {
    this.out_static_groups_change.emit(event);
    this.advanced_enable_disable.emit(false)
  }
  initialize() {
    //debugger;
    if (this.activeTab == 'DataPlan') {
      this.childDataPlan.setInitialData();
    }
    if (this.activeTab == 'VideoPlan') {
      this.childVideoPlan.videoInitialize();
    }
    if (this.activeTab == 'VoicePlan') {
      this.childVoicePlan.ngOnInit();
    }



  }
  saveSystem() {
    if (this.activeTab == 'DataPlan') {
      this.childDataPlan.saveSystem();
    } if (this.activeTab == 'VideoPlan') {
      this.childVideoPlan.saveSystem();
    }
    if (this.activeTab == 'VoicePlan') {
      this.childVoicePlan.saveSystem();
    }
  }
}

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ISubscriberAddDeviceModel } from 'src/app/support/netops-management/subscriber-management/subscriber.model';
import { TranslateService } from '../../../../../../../app-services/translate.service';

@Component({
  selector: 'app-alarm-start-wizard',
  templateUrl: './start-alarm-wizard.component.html',
  styleUrls: ['./start-alarm-wizard.component.scss']
})
export class StartAlarmWizardComponent implements OnInit, OnDestroy {

  @Input() workflowInputData
  @Output() workflowdata: EventEmitter<any> = new EventEmitter();
  @Output() activeTab: EventEmitter<any> = new EventEmitter();
  workflowStart: any
  saveClicked: boolean = false;
  formError: boolean = false;

  language;
  languageSubject

  constructor(
    private translateService : TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.saveClicked = false;
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data =>{
      this.language = data;
    })
  }

  ngOnDestroy(){
    this.languageSubject.unsubscribe();
  }

  validate() {
    this.formError = false;
    if (!this.workflowInputData.name) {
      this.formError = true;
      return
    }
  }

  go_next() {
    this.saveClicked = true;
    this.validate();
    if (this.formError) {
      return;
    }
    if (this.workflowInputData.levelPassed <= 1) {
      this.workflowInputData.levelPassed = 1;
    }
    this.workflowdata.emit(this.workflowInputData);
    if(this.router.url.endsWith("official-workflow-wizard")){
      this.activeTab.emit('Select Operation Parameters')
    }else{
    this.activeTab.emit('Select Device Groups')
    }
  }
}

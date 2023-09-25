import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ISubscriberAddDeviceModel } from 'src/app/support/netops-management/subscriber-management/subscriber.model';
import { TranslateService } from '../../../../../../../app-services/translate.service';

@Component({
  selector: 'app-start-wizard',
  templateUrl: './start-wizard.component.html',
  styleUrls: ['./start-wizard.component.scss']
})
export class StartWizardComponent implements OnInit, OnDestroy {

  @Input() workflowInputData
  @Output() workflowdata: EventEmitter<any> = new EventEmitter();
  @Output() activeTab: EventEmitter<any> = new EventEmitter();
  workflowStart: any
  saveClicked: boolean = false;
  formError: boolean = false;
  @ViewChild('myform', { static: false }) myform: NgForm;
  language;
  languageSubject

  constructor(
    private translateService: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.saveClicked = false;
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    })
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }
  validate() {
    this.formError = false;
    if (!this.workflowInputData.name || !this.myform.form.valid) {
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
    if (this.router.url.endsWith("official-workflow-wizard")) {
      this.activeTab.emit('Select Operation Parameters')
    } else {
      this.activeTab.emit('Select Device Groups')
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-sms-consent',
  templateUrl: './sms-consent.component.html',
  styleUrls: ['./sms-consent.component.scss']
})
export class SmsConsentComponent implements OnInit {
  language: any;
  languageSubject: any;
  modalRef: any;

  @Input()
  set workflowObj(d: any) {
    this._workflowObj = d;
  }

  get workflowObj() {
    return this._workflowObj;
  }

  _workflowObj: any;
  constructor(
    private translateService: TranslateService,
    public modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  confirmConsent() {
    this.workflowObj.isConsentMsgSmsPopupAccepted = true;
    this.passBack();
  }

  passBack() {
    this.modal.close(this.workflowObj);
  }

}

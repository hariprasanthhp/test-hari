import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-summary-recepients',
  templateUrl: './summary-recepients.component.html',
  styleUrls: ['./summary-recepients.component.scss']
})
export class SummaryRecepientsComponent implements OnInit {
  language: any;
  languageSubject: any;

  @Input()
  set workflowObj(data: any) {
    console.log(data);
    this._workflowObj = data;
  }
  get workflowObj() {
    return this._workflowObj;
  }

  private _workflowObj: any;
  constructor(private translateService: TranslateService,) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

}

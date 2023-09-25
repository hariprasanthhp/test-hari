import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  language: any;
  languageSubject: any;
  modalRef: any;

  @Input()
  set data(d: any) {
    this._data = d;
  }

  get data() {
    return this._data;
  }

  _data: any;
  constructor(
    private translateService: TranslateService,
    public modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

}

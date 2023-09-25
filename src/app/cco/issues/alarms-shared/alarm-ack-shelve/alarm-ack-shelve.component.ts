import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alarm-ack-shelve',
  templateUrl: './alarm-ack-shelve.component.html',
  styleUrls: ['./alarm-ack-shelve.component.scss']
})
export class AlarmAckShelveComponent implements OnInit, OnDestroy {
  @Input() fullData: any;
  @Output() ackShelveData = new EventEmitter<any>();
  disableAckBtn = false;
  disableShelveBtn = false;
  language: any;
  languageSubject: any;
  @Output() enableLoader = new EventEmitter();
  @Output() errorMessage = new EventEmitter();

  constructor(private http: HttpClient,
    private sso: SsoAuthService,
    private translateService: TranslateService,
    private commonOrgService: CommonService) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  doAck(ack?: any) {
    this.disableAckBtn = true;
    this.enableLoader.emit(true);
    if (ack) {
      this.deleteAck();
      return;
    }

    this.http.put(`${environment.API_BASE_URL}analytics-engine/${this.fullData?.subject?.alarmId}/ack?ccoAck=true&ccoAckUser=${this.sso.getUsername()}`, {}).subscribe((json: any) => {
      this.fullData.subject.ccoAck = true;
      this.fullData.subject.ccoAckUser = this.sso.getUsername();
      this.disableAckBtn = false;
      this.ackShelveData.emit({
        ack: true
      });
    }, (err: any) => {
      this.disableAckBtn = false;
      this.resetActions();
      this.handleError(err);
    }, () => {
      this.resetActions();
    });
  }

  deleteAck() {
    this.enableLoader.emit(true);
    this.http.delete(`${environment.API_BASE_URL}analytics-engine/${this.fullData?.subject?.alarmId}/ack?ccoAck=true&ccoAckUser=${this.sso.getUsername()}`, {}).subscribe((json: any) => {
      this.fullData.subject.ccoAck = false;
      this.disableAckBtn = false;
      this.ackShelveData.emit({
        ack: false
      });
    }, (err: any) => {
      this.disableAckBtn = false;
      this.resetActions();
      this.handleError(err);
    }, () => {
      this.resetActions();
    });
  }

  doShelve(shelve?: any) {
    this.disableShelveBtn = true;
    this.enableLoader.emit(true);
    if (shelve) {
      this.deleteShelve();
      return;
    }
    this.http.put(`${environment.API_BASE_URL}analytics-engine/${this.fullData?.subject?.alarmId}/shelve?ccoShelved=true`, {}).subscribe((json: any) => {
      this.fullData.subject.ccoShelved = true;
      this.disableShelveBtn = false;
      this.ackShelveData.emit({
        shelve: true
      });
    }, (err: any) => {
      this.disableShelveBtn = false;
      this.resetActions();
      this.handleError(err);
    }, () => {
      this.resetActions();
    });
  }

  deleteShelve() {
    this.enableLoader.emit(true);
    this.http.delete(`${environment.API_BASE_URL}analytics-engine/${this.fullData?.subject?.alarmId}/shelve?ccoShelved=true`, {}).subscribe((json: any) => {
      this.fullData.subject.ccoShelved = false;
      this.disableShelveBtn = false;
      this.ackShelveData.emit({
        shelve: false
      });
    }, (err: any) => {
      this.disableShelveBtn = false;
      this.resetActions();
      this.handleError(err);
    }, () => {
      this.resetActions();
    });
  }

  resetActions() {
    this.enableLoader.emit(false);
    this.errorMessage.emit('');
  }

  handleError(err) {
    this.errorMessage.emit(this.commonOrgService.pageErrorHandle(err));
  }

  ngOnDestroy(): void {
    this.languageSubject?.unsubscribe();
  }

}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';

@Injectable({
  providedIn: 'root'
})
export class MarketingCampaignDefineApiService {
  savedSegmentSubject = new Subject<any>();
  defineData: any;
  channelData: any;
  CsvSelected: boolean = false;
  defineNextEmitterSubject = new Subject<any>();
  channelNextEmitterSubject = new Subject<any>();
  deployNextEmitterSubject = new Subject<any>();
  deploy2ndNextEmitterSubject = new Subject<any>();
  defineSuccessEmitterSubject = new Subject<any>();
  editCampaignDataSubject = new Subject<any>();
  editChannelDataSubject = new Subject<any>();
  editCampaignChannelDataSubject = new Subject<any>();
  clearCampaignDataSubject = new Subject<any>();
  segmentSelectSubject = new Subject<any>();
  segmentTypeSelectSubject = new Subject<any>();
  campaignSubject = new Subject<any>();
  eventTypeSubject = new Subject<any>();
  startDateSubject = new Subject<any>();
  // csvDownloadSelectSubject = new Subject<any>();
  language: any
  languageSubject: any
  isRerender: boolean


  constructor(private translateService: TranslateService, ) {
    this.savedSegmentEmitter('empty');
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {

      this.language = data;
      this.isRerender = true;
    });
  }
  savedSegmentEmitter(savedSegment) {
    this.savedSegmentSubject.next(savedSegment)
  }
  defineNextEventTrigger() {
    this.defineNextEmitterSubject.next(true)
  }
  channelNextEventTrigger(saveBtn) {
    this.channelNextEmitterSubject.next(saveBtn)
  }
  deployNextEventTrigger(statusUpdate?: any) {
    this.deployNextEmitterSubject.next(statusUpdate)
  }
  deploy2ndNextEventTrigger() {
    this.deploy2ndNextEmitterSubject.next(true)
  }
  defineSuccesEventTrigger(response?: any) {
    if (response) {
      this.setDefineDataEmitter(response);
    }
    this.defineSuccessEmitterSubject.next(true);
  }
  setDefineDataEmitter(defineData?: any) {
    this.defineData = defineData;
    this.editCampaignDataSubject.next(this.defineData)
  }
  getDefineDataEmitter() {
    return this.defineData;
  }
  setMobileChannelDataEmitter(channelData: any) {
    this.channelData = channelData;
    this.editChannelDataSubject.next(this.channelData)
  }
  getMobileChannelDataEmitter() {
    return this.channelData;
  }
  setCsvDataEmitter(selected: any) {
    this.CsvSelected = selected;
  }
  getCsvDataEmitter() {
    return this.CsvSelected;
  }
  setCampaignChannelDataEmitter(channelData: any) {
    this.channelData = channelData;
    this.editCampaignChannelDataSubject.next(channelData)
  }
  getCampaignChannelDataEmitter() {
    return this.channelData;
  }
  clearCampaignDataEmitter(pageName) {
    this.clearCampaignDataSubject.next(pageName);
  }
  nextAllSubject() {
    // this.savedSegmentEmitter('empty')
    // this.defineNextEventTrigger();
    // this.channelNextEventTrigger(false)
    // this.deployNextEventTrigger(false)
    // this.deploy2ndNextEventTrigger()
    // this.defineSuccesEventTrigger();
    // this.clearCampaignDataEmitter('define')
    // this.channelNextEmitterSubject.next(false)
    // this.deployNextEmitterSubject.complete()
    // this.deploy2ndNextEmitterSubject.complete()
    // this.defineSuccessEmitterSubject.complete();
    // this.editCampaignDataSubject.complete()
    // this.editChannelDataSubject.complete()
    // this.editCampaignChannelDataSubject.complete()
    // this.clearCampaignDataSubject.complete()
  }
  completeAllSubject() {
    // this.savedSegmentSubject.complete()
    // this.savedSegmentEmitter('empty')
    // this.defineNextEmitterSubject.complete()
    // this.channelNextEmitterSubject.complete()
    // this.deployNextEmitterSubject.complete()
    // this.deploy2ndNextEmitterSubject.complete()
    // this.defineSuccessEmitterSubject.complete();
    // this.editCampaignDataSubject.complete()
    // this.editChannelDataSubject.complete()
    // this.editCampaignChannelDataSubject.complete()
    // this.clearCampaignDataSubject.complete()
  }

  stringValidatorWithCrossScriptAndErrorMsgDeploy(data) {
    let returnObj = { error: false, errorMsg: undefined }
    if (data === undefined || data === '' || data === null) {
      return returnObj = { error: true, errorMsg: undefined };
    } else if (data.includes('<') || data.includes('>')) {
      return returnObj = { error: true, errorMsg: this.language.Script_not };
    } else if (data.replaceAll(' ', '').length == 0) {
      return returnObj = { error: true, errorMsg: this.language.Valid_Text_Deploy };
    } else {
      return returnObj = { error: false, errorMsg: undefined };
    }
  }

}

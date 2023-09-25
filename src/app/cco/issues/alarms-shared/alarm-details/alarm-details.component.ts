import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { IssueService } from '../../service/issue.service';

@Component({
  selector: 'app-alarm-details',
  templateUrl: './alarm-details.component.html',
  styleUrls: ['./alarm-details.component.scss']
})
export class AlarmDetailsComponent implements OnInit, OnDestroy {
  transformedAlarms = ['multiple-onts-down-network', 'multiple-onts-down-pon', 'multiple-onts-down-olt'];
  @Output() ackShelveData = new EventEmitter<any>();
  @Input() showAckShelveBtn: any;
  @Input() hasWriteAccess: any;
  @Input() hideSource: any;
  @Input() connected: any;
  @Input() showNotes: any;
  timeZone: string;
  @Output() refreshAckShelveBtn = new EventEmitter<any>();
  @Input() clickedAlarmType: any;
  @Input() alarmType: any;
  loader = false;
  errorMsg: any = '';

  @Input()
  set fullData(item: any) {
    console.log(item);
    if (!item) {
      item = {};
    }
    if (!item['subject']) {
      item['subject'] = {};
    }
    let data = [];
    if (item && item['subject'] && typeof item['subject']['additionalAttributes'] === "object" && item['subject']['additionalAttributes']) {
      let keys = Object.keys(item['subject']['additionalAttributes']);
      let shelfSlotPort = ['phys-pon-shelf', 'phys-pon-slot', 'phys-pon-port', 'phys-dsl-shelf', 'phys-dsl-slot', 'phys-dsl-port'];
      const AEONTMAP = {
        'phys-pon-shelf': 'phys-shelf',
        'phys-pon-slot': 'phys-slot',
        'phys-pon-port': 'phys-port'
      };
      keys?.sort()?.forEach(element => {
        if (element === 'index') {
          return;
        }

        if (shelfSlotPort.indexOf(element) !== -1) {
          return;
        }

        data.push({
          key: element,
          value: typeof item['subject']['additionalAttributes'][element] === 'object' ? item['subject']['additionalAttributes'][element].value : item['subject']['additionalAttributes'][element]
        });
      });

      shelfSlotPort?.forEach((attr) => {
        if (item['subject']['additionalAttributes'][attr]) {
          data.push({
            key: item?.type === 'AEONT' ? AEONTMAP[attr] : attr,
            value: typeof item['subject']['additionalAttributes'][attr] === 'object' ? item['subject']['additionalAttributes'][attr].value : item['subject']['additionalAttributes'][attr]
          });
        }
      });

    }

    item['subject']['resourceForUI'] = this.issueService.generateResourceForUI(item, (item.type === 'EXA' ? true : false));

    item['subject']['customAdditionalAttributes'] = data;

    if (item['subject']?.alarmEventName === 'multiple-onts-down-network' && !item['subject']?.source) {
      this.hideSource = true;
    }

    if (item['subject']?.transformedAlarms) {
      let relatedAlarmsStr = '';
      item['subject']?.relatedAlarms?.forEach((alm: any) => {
        relatedAlarmsStr += `${alm['deviceName']} ${alm['ontId']} ${alm['ponPort']}<br>`
      });
      item['subject'].relatedAlarmsStr = relatedAlarmsStr ? relatedAlarmsStr : item['subject']?.transformedAlarms;

      item['subject']['impacted_onts_count_ui'] = item['subject']?.relatedAlarms?.length ? item['subject'].relatedAlarms.length : 0;
    }

    this._fullData = item;
  }

  get fullData() {
    return this._fullData;
  }

  private _fullData: any;

  language: any;
  languageSubject: any;

  colors = {
    MINOR: '#F3B426',
    MAJOR: '#FC7235',
    CRITICAL: '#C70000',
    WARNING: "#f7e9c1",
    INFO: "#7cb5ec"
  }

  colorClass = {
    MINOR: 'minor-but',
    MAJOR: 'major-but',
    CRITICAL: 'critical-but',
    WARNING: "warning-but",
    INFO: "severity-info-but"
  }

  constructor(private translateService: TranslateService,
    private issueService: IssueService) { }

  ngOnInit(): void {
    this.timeZone = new Date().toString()?.split(" ")[5]?.replace(/(.{2})$/, ':$1');
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  onAckShelve(data: any) {
    console.log(data);
    this.ackShelveData.emit(data);

  }

  convertToDateTime(dateTime: any) {
    if (!dateTime) {
      return
    }

    dateTime = Number(dateTime);

    let pipe = new DatePipe('en-US');
    return pipe.transform(new Date(dateTime), 'short');
  }

  refreshAckShelve() {
    this.refreshAckShelveBtn.emit();
    this.showAckShelveBtn = false;
    this.errorMsg = '';
  }

  onEnableLoader(flag: any) {
    this.loader = flag;
  }

  onErrorMsg(msg: any) {
    this.errorMsg = msg;
  }

  ngOnDestroy(): void {
    this.languageSubject?.unsubscribe();
  }

}

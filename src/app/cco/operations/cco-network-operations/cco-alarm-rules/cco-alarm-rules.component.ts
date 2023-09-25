import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { WorkflowService } from 'src/app/support/netops-management/operations/services/workflow.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cco-alarm-rules',
  templateUrl: './cco-alarm-rules.component.html',
  styleUrls: ['./cco-alarm-rules.component.scss'],
})
export class CcoAlarmRulesComponent implements OnInit {
  baseUrl = `${environment.API_BASE_URL}analytics-engine/`;
  language: any;
  languageSubject: any;
  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  loading: boolean = false;
  btnDisabled: boolean = false;
  errorMsg: string = undefined;
  alarmsList = {
    disableSaved: false,
    disableCleared: false,
    alarmListForm: undefined,
    alarmRulesData: [],
  };
  cco_entitlement: boolean = false;
  checkDev: boolean = false;
  hasWriteAccess: boolean = false;
  hasScopeAccess: boolean = false;
  constructor(
    private workflowService: WorkflowService,
    private translateService: TranslateService,
    private http: HttpClient,
    private commonOrgService: CommonService,
    private formBuilder: FormBuilder,
    private service: SsoAuthService,
    private titleService: Title
  ) {
  }

  ngOnInit(): void {
    let base = `${environment.API_BASE}`;
    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.checkDev = true;
    } else this.checkDev = false;
    let enttlmnts = this.service.getEntitlements();
    if (enttlmnts[210] && !enttlmnts[102]) {
      this.cco_entitlement = true;
    }
    let scopes = this.service.getScopes();
    if (environment.VALIDATE_SCOPE) {
      if (scopes && (scopes['cloud.rbac.coc.operations.alarms.transformalarmrules']?.indexOf('write') !== -1)) {
        this.hasWriteAccess = true;
      }

      if (scopes && (scopes['cloud.rbac.coc.operations.alarms.transformalarmrules'])) {
        this.hasScopeAccess = true;
      }

    }
    this.setAlarmRulesData();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        this.titleService.setTitle(`${this.language['Transform Alarm Rules']} - ${this.language['Alarms']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
      }
    );
    this.titleService.setTitle(`${this.language['Transform Alarm Rules']} - ${this.language['Alarms']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    if (!this.hasScopeAccess) {
      this.service.setPageAccess(false);
      return;
    }

    this.setAlarmListForm();
    this.callMultipleAPI();
  }

  setAlarmRulesData(type?) {
    this.alarmsList['alarmRulesData'] = [
      {
        display_name: `Entire Network (Multiple-ONTs-Down-Network)`,
        name: 'Multiple-ONTs-Down-Network',
        value: 'multiple-onts-down-network',
        request_param: 'network',
        raiseThreshold: 2,
        clearThreshold: 0,
        // description: '',
        duration: 1,
        raiseCountMin: 2,
        raiseCountMax: 3600000,
        durationMin: 1,
        durationMax: 120,
        alarmRuleId:
          type == 'clear'
            ? this.alarmsList['alarmRulesData'] &&
              this.alarmsList['alarmRulesData'].length > 0
              ? this.alarmsList['alarmRulesData'][0]['alarmRuleId']
              : ''
            : '',
        checked: false,
      },
      {
        display_name: `Same Node (Multiple-ONTs-Down-OLT)`,
        name: 'Multiple-ONTs-Down-OLT',
        value: 'multiple-onts-down-olt',
        request_param: 'olt',
        raiseThreshold: 2,
        clearThreshold: 0,
        // description: '',
        duration: 1,
        raiseCountMin: 2,
        raiseCountMax: 16000,
        durationMin: 1,
        durationMax: 120,
        alarmRuleId:
          type == 'clear'
            ? this.alarmsList['alarmRulesData'] &&
              this.alarmsList['alarmRulesData'].length > 0
              ? this.alarmsList['alarmRulesData'][1]['alarmRuleId']
              : ''
            : '',
        checked: false,
      },
      {
        display_name: `Same PON (Multiple-ONTs-Down-PON)`,
        name: 'Multiple-ONTs-Down-PON',
        value: 'multiple-onts-down-pon',
        request_param: 'pon',
        raiseThreshold: 2,
        clearThreshold: 0,
        // description: '',
        duration: 1,
        raiseCountMin: 2,
        raiseCountMax: 128,
        durationMin: 1,
        durationMax: 120,
        alarmRuleId:
          type == 'clear'
            ? this.alarmsList['alarmRulesData'] &&
              this.alarmsList['alarmRulesData'].length > 0
              ? this.alarmsList['alarmRulesData'][2]['alarmRuleId']
              : ''
            : '',
        checked: false,
      },
    ];
  }

  setAlarmListForm(type?) {
    this.alarmsList['alarmListForm'] = this.formBuilder.group({
      alarmsFormArray: new FormArray([]),
    });
    this.setAlarmRulesData(type);
    this.patchRulesFormValue(type);
  }

  async callMultipleAPI() {
    await Promise.all([this.getAlarmRulesController()]);
  }
  patchRulesFormValue(type?) {
    const alarmRulesData = this.alarmsList['alarmListForm'].get(
      'alarmsFormArray'
    ) as FormArray;

    this.alarmsList['alarmRulesData'].forEach((rules) => {
      alarmRulesData.push(
        new FormGroup({
          display_name: new FormControl(rules.display_name),
          name: new FormControl(rules.name),
          value: new FormControl(rules.value),
          request_param: new FormControl(rules.request_param),
          raiseThreshold: new FormControl(rules.raiseThreshold),
          clearThreshold: new FormControl(rules.clearThreshold),
          description: new FormControl(rules.description),
          duration: new FormControl(rules.duration),
          checked: new FormControl(rules['checked'] || false),
          alarmRuleId: new FormControl(rules['alarmRuleId'] || ''),
        })
      );
    });
    this.onChangeCheckbox('clear');
  }
  onChangeCheckbox(call, event?, type?, index?) {
    const arrayControl = this.alarmsList.alarmListForm.get(
      'alarmsFormArray'
    ) as FormArray;
    let arr = arrayControl['value'];
    if (call == 'check') {
      if (arrayControl.controls[index]['controls']) {
        arrayControl.controls[index]['controls']['checked']?.setValue(
          event.target.checked
        );
        // this.alarmsList.alarmRulesData[index]['checked'] = event.target.checked;
      }
    }
    if (arr.every((el) => el.alarmRuleId == '')) {
      if (type == 'checked') {
        if (arrayControl['value'].some((el) => el.checked)) {
          this.alarmsList.disableSaved = false;
        } else {
          this.alarmsList.disableSaved = true;
        }
      } else {
        this.alarmsList.disableSaved = true;
      }
    } else {
      this.alarmsList.disableSaved = false;
    }
    // else if(call == 'clear'){
    if (arrayControl['value'].some((el) => el.checked)) {
      this.alarmsList.disableCleared = false;
    } else {
      this.alarmsList.disableCleared = true;
    }
    // }
  }
  getAlarmRulesController() {
    this.loading = true;
    this.http.get(`${this.baseUrl}alarmRules`).subscribe(
      (data: any) => {
        this.loading = false;
        if (data && data.length > 0) {
          const ruleFormArray = this.alarmsList?.alarmListForm.get(
            'alarmsFormArray'
          ) as FormArray;
          if (
            ruleFormArray?.value &&
            Object.entries(ruleFormArray?.value).length > 0
          ) {
            this.alarmsList.disableSaved = false;
            this.alarmsList.disableCleared = false;
            ruleFormArray.value.forEach((rules, index) => {
              let patchObj = data.find((el) => el['name'] == rules['value']);
              // let alarmRulesData = this.alarmsList.alarmRulesData.find((el) => el['value'] == rules['value']);
              // if(patchObj && Object.entries(patchObj).length > 0){
              ruleFormArray.controls[index].patchValue({
                duration: patchObj ? patchObj['duration'] : 1,
                clearThreshold: patchObj ? patchObj['clearThreshold'] : 0,
                raiseThreshold: patchObj ? patchObj['raiseThreshold'] : 2,
                alarmRuleId: patchObj ? patchObj['alarmRuleId'] : '',
                checked: patchObj
                  ? patchObj['alarmRuleId'] && patchObj['alarmRuleId'] != ''
                    ? true
                    : false
                  : false,
              });
              data.forEach((element) => {
                let alarmRulesData = this.alarmsList.alarmRulesData.find(
                  (el) => el['value'] == element['name']
                );
                if (
                  alarmRulesData &&
                  Object.entries(alarmRulesData).length > 0
                ) {
                  alarmRulesData['duration'] = element['duration'];
                  alarmRulesData['clearThreshold'] = element['clearThreshold'];
                  alarmRulesData['raiseThreshold'] = element['raiseThreshold'];
                  alarmRulesData['alarmRuleId'] = element['alarmRuleId'];
                  alarmRulesData['checked'] = true;
                }
              });
              // }
            });
          }
        } else if (!data || data.length <= 0) {
          this.alarmsList.disableSaved = true;
          this.alarmsList.disableCleared = true;
          this.setAlarmRulesData();
          this.setAlarmListForm();
        }
      },
      (error) => {
        this.error = true;
        this.pageErrorHandle(error);
        this.loading = false;
        this.alarmsList.disableSaved = true;
        this.alarmsList.disableCleared = true;
        this.setAlarmRulesData();
        this.setAlarmListForm();
      }
    );
  }
  crudAlarmRules() {
    const alarmRulesForm = {
      ...this.alarmsList.alarmListForm?.value,
    };
    if (
      alarmRulesForm.alarmsFormArray &&
      alarmRulesForm.alarmsFormArray.length > 0
    ) {
      this.successInfo = '';
      this.alarmsList.disableSaved = true;
      let _requests = {};
      alarmRulesForm.alarmsFormArray.forEach((element, index) => {
        let request;
        if (element['checked']) {
          let request_body = {};
          request_body = {
            clearThreshold: element['clearThreshold'],
            duration: element['duration'],
            raiseThreshold: element['raiseThreshold'],
            name: element['value'],
          };
          if (element['alarmRuleId'] && element['alarmRuleId'] != '') {
            request = this.http.put(
              `${this.baseUrl}alarmRule/${element['alarmRuleId']}`,
              request_body,
              {
                responseType: 'text'
              }
            );
          } else {
            request = this.http.post(`${this.baseUrl}alarmRule`, request_body, {
              responseType: 'text',
            });
          }
        } else {
          if (element['alarmRuleId'] && element['alarmRuleId'] != '') {
            request = this.http.delete(
              `${this.baseUrl}alarmRule/${element['alarmRuleId']}`,
              { responseType: 'text' }
            );
          }
        }
        if (request) {
          _requests[element['request_param']] = request;
        }
      });
      if (_requests && Object.entries(_requests).length > 0) {
        this.loading = true;
        forkJoin(_requests).subscribe(
          ({ network, olt, pon }) => {
            //network
            if (network && network == 'Updated') {
              this.successInfo += this.language.alarmRulesMsg(this.alarmsList['alarmRulesData'][0]['name'], 'updated');
              // this.successInfo += `${this.alarmsList['alarmRulesData'][0]['name']} updated successfully <br> `;
            } else if (network && network == 'AlarmRule deleted successfully') {
              this.alarmsList.alarmRulesData[0].alarmRuleId = '';
              this.successInfo += this.language.alarmRulesMsg(this.alarmsList['alarmRulesData'][0]['name'], 'deleted');
              // this.successInfo += `${this.alarmsList['alarmRulesData'][0]['name']} deleted successfully <br> `;
            } else if (network && network != '') {
              this.successInfo += this.language.alarmRulesMsg(this.alarmsList['alarmRulesData'][0]['name'], 'saved');
              // this.successInfo += `${this.alarmsList['alarmRulesData'][0]['name']} saved successfully <br> `;
            }

            //olt
            if (olt && olt == 'Updated') {
              // this.successInfo += `${this.alarmsList['alarmRulesData'][1]['name']} updated successfully <br> `;
              this.successInfo += this.language.alarmRulesMsg(this.alarmsList['alarmRulesData'][1]['name'], 'updated');
            } else if (olt && olt == 'AlarmRule deleted successfully') {
              this.alarmsList.alarmRulesData[1].alarmRuleId = '';
              // this.successInfo += `${this.alarmsList['alarmRulesData'][1]['name']} deleted successfully <br> `;
              this.successInfo += this.language.alarmRulesMsg(this.alarmsList['alarmRulesData'][1]['name'], 'deleted');
            } else if (olt && olt != '') {
              // this.successInfo += `${this.alarmsList['alarmRulesData'][1]['name']} saved successfully <br> `;
              this.successInfo += this.language.alarmRulesMsg(this.alarmsList['alarmRulesData'][1]['name'], 'saved');
            }

            //pon
            if (pon && pon == 'Updated') {
              // this.successInfo += `${this.alarmsList['alarmRulesData'][2]['name']} updated successfully <br> `;
              this.successInfo += this.language.alarmRulesMsg(this.alarmsList['alarmRulesData'][2]['name'], 'updated');
            } else if (pon && pon == 'AlarmRule deleted successfully') {
              this.alarmsList.alarmRulesData[2].alarmRuleId = '';
              // this.successInfo += `${this.alarmsList['alarmRulesData'][2]['name']} deleted successfully <br> `;
              this.successInfo += this.language.alarmRulesMsg(this.alarmsList['alarmRulesData'][2]['name'], 'deleted');
            } else if (pon && pon != '') {
              // this.successInfo += `${this.alarmsList['alarmRulesData'][2]['name']} saved successfully <br> `;
              this.successInfo += this.language.alarmRulesMsg(this.alarmsList['alarmRulesData'][2]['name'], 'saved');
            }
            this.loading = false;
            this.successInfo = this.successInfo.slice(0, -5);
            this.success = true;
            setTimeout(() => {
              this.alarmsList.disableSaved = false;
              this.enableDisableSave();
              this.successInfo = '';
              this.success = false;
            }, 4000);
            this.getAlarmRulesController();
          },
          (error: HttpErrorResponse) => {
            this.error = true;
            this.loading = false;
            this.alarmsList.disableSaved = false;
            this.pageErrorHandle(error);
            this.getAlarmRulesController();
          }
        );
      }
    }
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = 'Access Denied';
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }
  enforceMinMax(event, controlName, index) {
    let timer = 0;
    if (controlName == 'raiseThreshold') timer = 500;
    this.alarmsList.disableSaved = true;
    setTimeout(() => {
      let value = this.workflowService.enforceMinMax(event);
      if (value != -1) {
        const arrayControl = this.alarmsList.alarmListForm.get(
          'alarmsFormArray'
        ) as FormArray;
        if (arrayControl.controls && arrayControl.controls[index]['controls']) {
          arrayControl.controls[index]['controls'][controlName]?.setValue(value);
          if (controlName == 'raiseThreshold') {
            this.alarmsList.alarmRulesData[index]['raiseThreshold'] = value;
            if (value < arrayControl.controls[index]['controls']['clearThreshold'].value) {
              arrayControl.controls[index]['controls']['clearThreshold']?.setValue(0);
              this.alarmsList.alarmRulesData[index]['clearThreshold'] = 0;
            }
          }

        }
      }
      this.enableDisableSave();
    }, timer);
  }
  enableDisableSave() {
    const arrayControl = this.alarmsList.alarmListForm.get(
      'alarmsFormArray'
    ) as FormArray;
    let arr = arrayControl['value'];
    if (arr.every((el) => el.alarmRuleId == '')) {
      if (arrayControl['value'].some((el) => el.checked)) {
        this.alarmsList.disableSaved = false;
      } else {
        this.alarmsList.disableSaved = true;
      }
    } else {
      this.alarmsList.disableSaved = false;
    }
  }
  avoidInvalidValues(event) {
    if (event.key === '.' || (event?.which != 8 && event?.which != 0 && (event?.which < 48 || event?.which > 57) && (event?.which < 96 || event?.which > 105))) { event.preventDefault(); }
  }
  closeAlert() {
    this.error = false;
    this.success = false;
  }
}

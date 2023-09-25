import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThresholdService } from './threshold.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-cco-health-threshold',
  templateUrl: './cco-health-threshold.component.html',
  styleUrls: ['./cco-health-threshold.component.scss']
})
export class CcoHealthThresholdComponent implements OnInit {
  language: any;
  languageSubject: any;
  isnewuser: Boolean = true;
  loading: Boolean = true;
  save_disable: Boolean = true;
  step: any = 100;
  successInfo: any;

  thresholdForm = this.formBuilder.group({
    ponPortHiUtilThreshold: ["", [Validators.required, rangevalidation('pon')]],
    ponPortHiUtilThresholdClear: ["", [Validators.required, rangevalidation('pon')]],
    ponPortHiUtilThresholdWarn: ["", [Validators.required, rangevalidation('pon')]],

    etyPortHiUtilThreshold: ['', [Validators.required, rangevalidation('ethernet')]],
    etyPortHiUtilThresholdClear: ['', [Validators.required, rangevalidation('ethernet')]],
    etyPortHiUtilThresholdWarn: ['', [Validators.required, rangevalidation('ethernet')]],

    dslPortHiUtilThresholdRaise: ["", [Validators.required, rangevalidation('dsl')]],
    dslPortHiUtilThresholdClear: ["", [Validators.required, rangevalidation('dsl')]],

    dslPortCurRateThreshold: ["", [Validators.required, rangevalidation('dsl_cur_rate')]],
    dslPortCurRateThresholdClear: ["", [Validators.required, rangevalidation('dsl_cur_rate')]],

    dslPortSnrThreshold: ["", [Validators.required, rangevalidation('dsl_snr')]],
    dslPortSnrThresholdClear: ["", [Validators.required, rangevalidation('dsl_snr')]],

    oltPonPowerLevelThresholds: this.formBuilder.group({
      gponRxSignalLoThreshold: ["", [Validators.required, rangevalidation('olt_gpon')]],
      xponRxSignalLoThreshold: ["", [Validators.required, rangevalidation('olt_xpon')]]
    }),
    oltPonPowerLevelThresholdsClear: this.formBuilder.group({
      gponRxSignalLoThreshold: ["", [Validators.required, rangevalidation('olt_gpon')]],
      xponRxSignalLoThreshold: ["", [Validators.required, rangevalidation('olt_xpon')]]
    }),
    oltPonPowerLevelThresholdsWarn: this.formBuilder.group({
      gponRxSignalLoThreshold: ["0"],
      xponRxSignalLoThreshold: ["0"]
    }),

    ontPonPowerLevelThresholds: this.formBuilder.group({
      gponRxSignalLoThreshold: ["", [Validators.required, rangevalidation('ont_gpon')]],
      xponRxSignalLoThreshold: ["", [Validators.required, rangevalidation('ont_xpon')]]
    }),
    ontPonPowerLevelThresholdsClear: this.formBuilder.group({
      gponRxSignalLoThreshold: ["", [Validators.required, rangevalidation('ont_gpon')]],
      xponRxSignalLoThreshold: ["", [Validators.required, rangevalidation('ont_xpon')]]
    }),
    ontPonPowerLevelThresholdsWarn: this.formBuilder.group({
      gponRxSignalLoThreshold: ["0"],
      xponRxSignalLoThreshold: ["0"]
    }),

  }, {
    validator: rangevalidation.bind('pon')
  });
  Defaultvalue: any = {};
  errorInfo: any;
  issubmit: boolean = false;
  MODULE: any;
  hasScopeAccess: boolean;
  hasWriteAccess: boolean;
  constructor(private translateService: TranslateService, private router: Router,
    private formBuilder: FormBuilder, private service: ThresholdService,
    private sso: SsoAuthService,
    private commonOrgService: CommonService,
    private titleService: Title) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Monitoring Thresholds']} - ${this.language['Health']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Monitoring Thresholds']} - ${this.language['Health']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
  }

  ngOnInit(): void {
    let scopes = this.sso.getScopes();
    if (scopes?.['cloud.rbac.coc.operations.health.monitoringthresholds']?.length) {
      this.hasScopeAccess = true;
    }
    if (scopes?.['cloud.rbac.coc.operations.health.monitoringthresholds']?.indexOf('write') !== -1) {
      this.hasWriteAccess = true;
    }

    if (!this.hasScopeAccess) {
      this.sso.setPageAccess(false);
      return;
    } else {
      this.sso.setPageAccess(true);
    }

    let url = this.router.url;
    this.MODULE = this.sso.getRedirectModule(url);
    this.getData();
    this.Defaultvalue = {
      pon: 40,
      ethernet: 50,
      olt_gpon: -27,
      olt_xpon: -28,
      ont_gpon: -25,
      ont_xpon: -25,
      ponClear: 35,
      ethernetClear: 45,
      oltClear_gpon: -26.5,
      oltClear_xpon: -27.5,
      ontClear_gpon: -24.5,
      ontClear_xpon: -24.5,
      deltaPon: 10,
      deltaEty: 10,
      dsl_raise: 50,
      dsl_clear: 45,
      dsl_cur_rate: 50,
      dsl_cur_rate_clear: 60,
      dsl_snr: 0.5,
      dsl_snr_clear: 1
    }

    this.thresholdForm.valueChanges.subscribe(() => {
      if (this.thresholdForm.valid) {
        this.save_disable = false;
      } else this.save_disable = true;
    });
  }
  convert_number(value) {
    if (value) {
      return parseFloat((value * 100).toPrecision(12));
    } else {
      return value;
    }
  }
  getData() {
    this.service.getThresholds().subscribe((data: any) => {
      this.loading = false;
      if (data) {
        if (data?.ponPortHiUtilThreshold) this.isnewuser = false;

        this.thresholdForm.patchValue(data);
        this.thresholdForm.get("ponPortHiUtilThreshold").patchValue(this.convert_number(data.ponPortHiUtilThreshold));
        this.thresholdForm.get("etyPortHiUtilThreshold").patchValue(this.convert_number(data.etyPortHiUtilThreshold));
        this.thresholdForm.get("ponPortHiUtilThresholdClear").patchValue(this.convert_number(data.ponPortHiUtilThresholdClear));
        this.thresholdForm.get("etyPortHiUtilThresholdClear").patchValue(this.convert_number(data.etyPortHiUtilThresholdClear));
        this.thresholdForm.get("ponPortHiUtilThresholdWarn").patchValue(this.convert_number(data.ponPortHiUtilThreshold - data.ponPortHiUtilThresholdWarn));
        this.thresholdForm.get("etyPortHiUtilThresholdWarn").patchValue(this.convert_number(data.etyPortHiUtilThreshold - data.etyPortHiUtilThresholdWarn));
        this.thresholdForm.get("dslPortHiUtilThresholdRaise").patchValue(this.convert_number(data.dslPortHiUtilThresholdRaise));
        this.thresholdForm.get("dslPortHiUtilThresholdClear").patchValue(this.convert_number(data.dslPortHiUtilThresholdClear));
        this.thresholdForm.get("dslPortCurRateThreshold").patchValue(this.convert_number(data.dslPortCurRateThreshold));
        this.thresholdForm.get("dslPortCurRateThresholdClear").patchValue(this.convert_number(data.dslPortCurRateThresholdClear));
        this.thresholdForm.get("dslPortSnrThreshold").patchValue(data.dslPortSnrThreshold);
        this.thresholdForm.get("dslPortSnrThresholdClear").patchValue(data.dslPortSnrThresholdClear);

        this.save_disable = true;
      } else {
        this.thresholdForm.patchValue({
          ponPortHiUtilThreshold: this.Defaultvalue.pon,
          etyPortHiUtilThreshold: this.Defaultvalue.ethernet,
          ontPonPowerLevelThresholds: {
            gponRxSignalLoThreshold: this.Defaultvalue.ont_gpon,
            xponRxSignalLoThreshold: this.Defaultvalue.ont_xpon,
          },
          oltPonPowerLevelThresholds: {
            gponRxSignalLoThreshold: this.Defaultvalue.olt_gpon,
            xponRxSignalLoThreshold: this.Defaultvalue.olt_xpon,
          },
          ponPortHiUtilThresholdClear: this.Defaultvalue.ponClear,
          etyPortHiUtilThresholdClear: this.Defaultvalue.ethernetClear,

          ontPonPowerLevelThresholdsClear: {
            gponRxSignalLoThreshold: this.Defaultvalue.ontClear_gpon,
            xponRxSignalLoThreshold: this.Defaultvalue.ontClear_xpon,
          },
          oltPonPowerLevelThresholdsClear: {
            gponRxSignalLoThreshold: this.Defaultvalue.oltClear_gpon,
            xponRxSignalLoThreshold: this.Defaultvalue.oltClear_xpon,
          },
          ponPortHiUtilThresholdWarn: this.Defaultvalue.deltaPon,
          etyPortHiUtilThresholdWarn: this.Defaultvalue.deltaEty,

          dslPortHiUtilThresholdRaise: this.Defaultvalue.dsl_raise,
          dslPortHiUtilThresholdClear: this.Defaultvalue.dsl_clear,

          dslPortCurRateThreshold: this.Defaultvalue.dsl_cur_rate,
          dslPortCurRateThresholdClear: this.Defaultvalue.dsl_cur_rate_clear,

          dslPortSnrThreshold: this.Defaultvalue.dsl_snr,
          dslPortSnrThresholdClear: this.Defaultvalue.dsl_snr_clear
        })
      }
    }, err => {
      this.loading = false;
      this.successInfo = '';
      this.pageErrorHandle(err);
    })
  }
  convert_to_number(query) {
    Object.entries(query).forEach(([key, value]: any) => {
      if (typeof value === 'object' && value !== null) {
        this.convert_to_number(value);
      } else
        query[key] = parseFloat(value);
    })
  }
  saveData() {
    this.issubmit = true;
    if (!this.thresholdForm.valid) return;
    this.loading = true;
    let query = {};
    query = Object.assign(query, this.thresholdForm.value);
    query['ponPortHiUtilThreshold'] = parseFloat((this.thresholdForm.value.ponPortHiUtilThreshold / 100).toPrecision(12));
    query['etyPortHiUtilThreshold'] = parseFloat((this.thresholdForm.value.etyPortHiUtilThreshold / 100).toPrecision(12));
    query['ponPortHiUtilThresholdClear'] = parseFloat((this.thresholdForm.value.ponPortHiUtilThresholdClear / 100).toPrecision(12));
    query['etyPortHiUtilThresholdClear'] = parseFloat((this.thresholdForm.value.etyPortHiUtilThresholdClear / 100).toPrecision(12));
    query['ponPortHiUtilThresholdWarn'] = parseFloat(((this.thresholdForm.value.ponPortHiUtilThreshold - this.thresholdForm.value.ponPortHiUtilThresholdWarn) / 100).toPrecision(12));
    query['etyPortHiUtilThresholdWarn'] = parseFloat(((this.thresholdForm.value.etyPortHiUtilThreshold - this.thresholdForm.value.etyPortHiUtilThresholdWarn) / 100).toPrecision(12));
    query['oltPonPowerLevelThresholdsWarn'].gponRxSignalLoThreshold = 0;
    query['oltPonPowerLevelThresholdsWarn'].xponRxSignalLoThreshold = 0;
    query['ontPonPowerLevelThresholdsWarn'].gponRxSignalLoThreshold = 0;
    query['ontPonPowerLevelThresholdsWarn'].xponRxSignalLoThreshold = 0;
    query['dslPortHiUtilThresholdRaise'] = parseFloat((this.thresholdForm.value.dslPortHiUtilThresholdRaise / 100).toPrecision(12));
    query['dslPortHiUtilThresholdClear'] = parseFloat((this.thresholdForm.value.dslPortHiUtilThresholdClear / 100).toPrecision(12));
    query['dslPortCurRateThreshold'] = parseFloat((this.thresholdForm.value.dslPortCurRateThreshold / 100).toPrecision(12));
    query['dslPortCurRateThresholdClear'] = parseFloat((this.thresholdForm.value.dslPortCurRateThresholdClear / 100).toPrecision(12));
    query['dslPortSnrThreshold'] = this.thresholdForm.value.dslPortSnrThreshold;
    query['dslPortSnrThresholdClear'] = this.thresholdForm.value.dslPortSnrThresholdClear;


    this.convert_to_number(query);
    this.service.AddThresholds(query).subscribe((data: any) => {
      this.loading = false;
      this.isnewuser = false;
      this.save_disable = true;
      this.getData();
      this.errorInfo = '';
      this.successInfo = this.language['Saved Successfully'];
      setTimeout(() => {
        this.successInfo = "";
      }, 4000);
    }, err => {
      this.loading = false;
      this.successInfo = '';
      this.pageErrorHandle(err);
    })
  }
  updataData() {
    this.issubmit = true;
    if (!this.thresholdForm.valid) return;
    this.loading = true;
    let query = {};
    query = Object.assign(query, this.thresholdForm.value);

    query['ponPortHiUtilThreshold'] = parseFloat((this.thresholdForm.value.ponPortHiUtilThreshold / 100).toPrecision(12))
    query['etyPortHiUtilThreshold'] = parseFloat((this.thresholdForm.value.etyPortHiUtilThreshold / 100).toPrecision(12))
    query['ponPortHiUtilThresholdClear'] = parseFloat((this.thresholdForm.value.ponPortHiUtilThresholdClear / 100).toPrecision(12));
    query['etyPortHiUtilThresholdClear'] = parseFloat((this.thresholdForm.value.etyPortHiUtilThresholdClear / 100).toPrecision(12));
    query['ponPortHiUtilThresholdWarn'] = parseFloat(((this.thresholdForm.value.ponPortHiUtilThreshold - this.thresholdForm.value.ponPortHiUtilThresholdWarn) / 100).toPrecision(12));
    query['etyPortHiUtilThresholdWarn'] = parseFloat(((this.thresholdForm.value.etyPortHiUtilThreshold - this.thresholdForm.value.etyPortHiUtilThresholdWarn) / 100).toPrecision(12));
    query['oltPonPowerLevelThresholdsWarn'].gponRxSignalLoThreshold = 0;
    query['oltPonPowerLevelThresholdsWarn'].xponRxSignalLoThreshold = 0;
    query['ontPonPowerLevelThresholdsWarn'].gponRxSignalLoThreshold = 0;
    query['ontPonPowerLevelThresholdsWarn'].xponRxSignalLoThreshold = 0;
    query['dslPortHiUtilThresholdRaise'] = parseFloat((this.thresholdForm.value.dslPortHiUtilThresholdRaise / 100).toPrecision(12));
    query['dslPortHiUtilThresholdClear'] = parseFloat((this.thresholdForm.value.dslPortHiUtilThresholdClear / 100).toPrecision(12));
    query['dslPortCurRateThreshold'] = parseFloat((this.thresholdForm.value.dslPortCurRateThreshold / 100).toPrecision(12));
    query['dslPortCurRateThresholdClear'] = parseFloat((this.thresholdForm.value.dslPortCurRateThresholdClear / 100).toPrecision(12));
    query['dslPortSnrThreshold'] = this.thresholdForm.value.dslPortSnrThreshold;
    query['dslPortSnrThresholdClear'] = this.thresholdForm.value.dslPortSnrThresholdClear;


    this.convert_to_number(query);
    this.service.updateThreshold(query).subscribe((data: any) => {
      this.loading = false;
      this.isnewuser = false;
      this.save_disable = true;
      this.getData();
      this.errorInfo = '';
      this.successInfo = this.language['Updated_Successfully'];
      setTimeout(() => {
        this.successInfo = "";
      }, 4000);
    }, err => {
      this.loading = false;
      this.successInfo = '';
      this.pageErrorHandle(err);
    })
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    setTimeout(() => {
      this.errorInfo = "";
    }, 4000);
  }

  removespecialcharacter(event, type) {
    var key = event?.keyCode;
    //console.log(key);
    if (type == 'minus')
      return ((key > 47 && key < 58) || key == 45 || key == 46)
    else {
      return ((key > 47 && key < 58) || key == 46)
    }
  }
}
export const rangevalidation = (field_name: string) => {

  return (control: AbstractControl): { [key: string]: any } | null => {
    const regEx = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
    if (!regEx.test(control?.value)) {
      return { 'rangeinvalid': true };
    }
    const value = parseFloat(control?.value);
    //CCL-51814
    switch (field_name) {
      case 'dsl':
      case 'dsl_cur_rate':
      case 'ethernet':
      case 'pon':
        {
          if ((value < 0 || value > 100))
            return { 'rangeinvalid': true };
          break;
        }
      case 'dsl_snr':
        {
          if ((value < 0 || value > 10))
            return { 'rangeinvalid': true };
          break;
        }
      case 'ont_gpon':
        {
          if ((value > -8 || value < -30))
            return { 'rangeinvalid': true };
          break;
        }
      case 'ont_xpon':
        {
          if ((value > -9 || value < -28))
            return { 'rangeinvalid': true };
          break;
        }
      case 'olt_gpon':
        {
          if ((value > -8 || value < -35))
            return { 'rangeinvalid': true };
          break;
        }
      case 'olt_xpon':
        {
          if ((value > -7 || value < -32))
            return { 'rangeinvalid': true };
          break;
        }
      case '': return
    }
    return null;
  }
}


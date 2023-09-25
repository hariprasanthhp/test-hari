import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { enterNumberOnly } from 'src/app/shared-utils/utils';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { SsoAuthService } from '../../../../../shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dial-plan-new',
  templateUrl: './dial-plan-new.component.html',
  styleUrls: ['./dial-plan-new.component.scss']
})

export class DialPlanNewComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  // Reference HTML Elements.
  @ViewChild('nameRef') nameRef: ElementRef;

  @Output() onClose = new EventEmitter<any>();
  @Input() editModalInput;
  @Input() Id;

  // Initialize common essential variables.
  public language: any;
  public dialPlanFormGroup: FormGroup;

  // Initialize component essential variables.
  public numberOnly = enterNumberOnly;

  // Access modifiers - private.
  private languageSubject: Subscription;
  private dialPlanObj: any;
  private unSubscribeParam$ = new Subject();
  private routerState$: Observable<object>;

  valueLessShort = false
  hasWriteAccess = false;
  hasScopeAccess: any = false;
  btnDisabled = false;
  error = false;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  nameDisbable = false;
  id: any;
  orgId;
  rulesPattern = "^\\^[^\\|\\^]*(\\|\\^[^\\|\\^]*)*\\|?$";

  constructor(
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private sso: SsoAuthService,
    private titleService: Title
  ) {
    this.createDialPlanFormGroup();
    this.dialPlanObj = {
      name: null,
      description: null,
      shortTimer: null,
      longTimer: null,
      rules: null
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.id = this.Id;
    if (this.editModalInput) {
      this.input = {
        name: '',
        description: '',
        shortTimer: '',
        longTimer: '',
        rules: ''
      };
      this.dialPlanObj = {
        name: null,
        description: null,
        shortTimer: null,
        longTimer: null,
        rules: null
      };
      this.dialPlanObj = this.editModalInput;
      this.dialPlanFormGroup.patchValue(this.dialPlanObj);
      this.nameDisbable = true
      this.id = this.editModalInput._id;
      this.viewDialPlan();
    } else {
      this.nameDisbable = false;
    }
  }
  setTitle(url) {
    if (this.router.url.includes('cco-foundation')) {
      this.titleService.setTitle(`${this.language['Dial Plans']}  - ${this.language['Workflow Prerequisites']} - ${this.language['configuration']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);

    } else if (this.router.url.includes('/cco/services/service-profiles/dial-plan')) {
      this.titleService.setTitle(`${this.language['RG Dial Plans']} - ${this.language['Services Profiles']} - ${this.language['Services']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);

    } else if (this.router.url.includes('/support/netops-management')) {
      this.titleService.setTitle(`${this.language['Dial Plans']} - ${this.language['Configurations']} - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {
    this.id = this.Id;
    if (this.editModalInput) {
      this.input = {
        name: '',
        description: '',
        shortTimer: '',
        longTimer: '',
        rules: ''
      };
      this.dialPlanObj = {
        name: null,
        description: null,
        shortTimer: null,
        longTimer: null,
        rules: null
      };
      this.dialPlanObj = this.editModalInput;
      this.dialPlanFormGroup.patchValue(this.dialPlanObj);
      this.nameDisbable = true
      this.id = this.editModalInput._id;
      this.viewDialPlan();
    } else {
      this.nameDisbable = false;
    }

    this.id = this.activatedRoute.snapshot.paramMap.get("id");

    if (this.id) {
      this.viewDialPlan();
    }

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.errors.name = this.language['Enter_A_Value'];
      this.errors.shortTimer = this.language['Please enter a value less than or equal to 16'];
      this.errors.longTimer = this.language['Enter_A_Value'];
      this.errors.longTimer = this.language['Name_Validation2_dial_new'];
      this.errors.rules = this.language['Rules_Validation'];
      this.errors.rules = this.language['Rules_Validation2'];
      this.errors.rules = this.language['Invalid Rule'];
      this.errors.name = this.language['Enter_A_Value'];
      this.errors.shortTimer = this.language['Enter_A_Value'];
      this.errors.longTimer = this.language['Enter_A_Value'];
      this.errors.name = this.language['Please enter value between 4 and 20 characters long'];
      this.errors.name = this.language['Name_Validation_dial_new'];
      this.errors.shortTimer = this.language['Please enter a value greater than or equal to 1'];
      this.errors.shortTimer = this.language['Please enter a value less than or equal to 16'];
      this.errors.shortTimer = this.language['Number_Validation_Dial_New'];
      this.errors.longTimer = this.language['Digit_Validation_Dial_New'];
      this.errors.longTimer = this.language['Value_Hint'];
      this.setTitle(this.router.url);
      // this.errorInfo = this.language['Access Denied'];
    });
    this.setTitle(this.router.url);
    this.routerState$ = this.activatedRoute.paramMap.pipe(takeUntil(this.unSubscribeParam$), map(() => window.history.state));
    this.routerState$.subscribe((state: object) => {
      if (state && state[`dialPlanObj`] !== null && state[`dialPlanObj`] !== undefined) {
        this.dialPlanObj = state[`dialPlanObj`];
        this.dialPlanFormGroup.patchValue(this.dialPlanObj);
        this.nameDisbable = true
      }
    });
    let scopes = this.sso.getScopes();
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco/services/service-profiles/dial-plan')) {
      if (environment.VALIDATE_SCOPE) {
        scopes['cloud.rbac.csc.netops.config.dial_plan'] = scopes['cloud.rbac.csc.netops.config.dial_plan'] ? scopes['cloud.rbac.csc.netops.config.dial_plan'] : [];

        if (scopes && (scopes['cloud.rbac.csc.netops.config.dial_plan'] && scopes['cloud.rbac.csc.netops.config.dial_plan'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
          this.hasScopeAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    } else if (this.router.url.includes('cco/services/service-profiles/dial-plan')) {
      if (environment.VALIDATE_SCOPE) {
        if (scopes['cloud.rbac.coc.services.serviceprofiles.rgdialplans']?.length) {
          this.hasScopeAccess = true;
        }
        if (scopes && (scopes['cloud.rbac.coc.services.serviceprofiles.rgdialplans']?.includes('write'))) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    } else {
      if (environment.VALIDATE_SCOPE) {
        scopes['cloud.rbac.foundation.configurations'] = scopes['cloud.rbac.foundation.configurations'] ? scopes['cloud.rbac.foundation.configurations'] : [];
        if (scopes && (scopes['cloud.rbac.foundation.configurations'].includes('write'))) {
          this.hasWriteAccess = true;
          this.hasScopeAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    }

    if (!this.hasScopeAccess) {
      this.sso.setPageAccess(false);
      return;
    }

  }

  ngAfterViewInit(): void {
    // this.nameRef.nativeElement.focus();
    // this.validateTimer();
    // this.validateRules();
  }

  ngOnDestroy() {
    if (this.languageSubject) this.languageSubject.unsubscribe();
    if (this.unSubscribeParam$) this.unSubscribeParam$.next();
    if (this.unSubscribeParam$) this.unSubscribeParam$.complete();
  }

  /**
   * @description - Method to create dial plan form group.
   */
  private createDialPlanFormGroup(): void {
    this.dialPlanFormGroup = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(20),
      Validators.minLength(4), Validators.pattern('/^[a-zA-Z0-9_\s-]+$/')]],
      description: null,
      shortTimer: [null, [Validators.required, Validators.maxLength(2),
      Validators.max(16), Validators.min(1)]],
      longTimer: [null, [Validators.required, Validators.maxLength(2),
      Validators.max(20), Validators.min(4)]],
      rules: [null, Validators.required]
    });
  }

  /**
   * @description - Method to validate timer.
   */
  private validateTimer(): void {
    this.dialPlanFormGroup.get('longTimer').valueChanges.subscribe((value: string) => {
      if (value && Number(value) < this.shortTimer.value) {
        this.longTimer.setErrors({
          exceedsError: true
        });
      }
    });
  }

  /**
   * @description - Method to validate timer.
   */
  private validateRules(): void {
    this.dialPlanFormGroup.get('rules').valueChanges.subscribe((value: string) => {
      if (value && !(value.startsWith('^', 0))) {
        this.rules.setErrors({
          invalidStartRule: true
        });
      } else if (value && (value.endsWith('^'))) {
        this.rules.setErrors({
          invalidEndRule: true
        });
      }
    });
  }

  /**
   * @description - Method to go back.
   * @param - { any }.
   */
  public goBack(data?: any): void {
    this.input = {
      name: '',
      description: '',
      shortTimer: '',
      longTimer: '',
      rules: ''
    };
    this.onClose.emit('close');
    /* this.sso.redirectByUrl([
      `support/netops-management/configuration/dial-plan`,
      `./cco/operations/cco-system-operations/sub-profile`,
      `/cco-foundation/foundation-configuration/configuration-prerequisites/dial-plan`,
      `./cco/operations/cco-subscriber-operations/configurations/dial-plan`,
    ]); */
    //this.router.navigate(['/support/netops-management/configuration/dial-plan'], {});

    // const goBackUrl = '/support/netops-management/configuration/dial-plan';
    // this.router.navigateByUrl('/support/dummy', { skipLocationChange: true }).then(() => {
    //   this.router.navigate([goBackUrl], {
    //     state: {
    //       dialPlanObj: data ? data : null
    //     }
    //   });
    // });
  }

  /**
   * @descriptioin - Method to trigger submit.
   */
  public onSubmit(): void {
    // if (!this.dialPlanFormGroup.valid) {
    //   for (const key of Object.keys(this.dialPlanFormGroup.controls)) {
    //     if (this.dialPlanFormGroup.controls[key].invalid) {
    //       const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
    //       invalidControl.focus();
    //       break;
    //     }
    //   }
    //   return;
    // }
    // this.goBack(this.constructDialPad());

  }

  input: any = {
    name: '',
    description: '',
    shortTimer: '',
    longTimer: '',
    rules: ''
  };

  verifyName(): any {
    this.error = false;
    this.errors.name = '';
    this.valueLessShort = false
    if (!this.input['name']) {
      this.errors.name = this.language['Enter_A_Value'];
      this.error = true;
      return;
    }

    let len = this.input['name'].length;

    if (len < 4 || len > 20) {
      this.errors.name = this.language['Number_hint'];
      this.error = true;
      return;
    }

    if (!this.regexObj['name'].test(this.input['name'])) {
      this.errors.name = this.language['Name_Validation_dial_new'];
      this.error = true;
      return;
    }
  }

  verifyShorTimer(): any {

    this.error = false;
    this.errors.shortTimer = '';
    this.valueLessShort = false
    if (!this.input['shortTimer']) {
      this.errors.shortTimer = this.language['Enter_A_Value'];
      this.error = true;
      return;
    }

    if (this.input['shortTimer'].length < 1) {
      this.errors.shortTimer = this.language['Please enter a value greater than or equal to 1'];
      this.error = true;
      return;
    }

    if (this.input['shortTimer'].length > 16) {
      this.errors.shortTimer = this.language['Value_Hint_Max'];

      this.error = true;
      return;
    }
  }

  verifyLongimer(): any {
    this.error = false;
    this.errors.longTimer = '';
    this.valueLessShort = false
    if (!this.input['longTimer']) {
      this.errors.longTimer = this.language['Enter_A_Value'];
      this.error = true;
      return;
    }

    // if (this.input['longTimer'] < 4) {
    //   this.errors.longTimer = 'Please enter a value greater than or equal to 4';
    //   this.error = true;
    //   if (this.input['longTimer'] <= this.input['shortTimer'])this.valueLessShort = true
    //   return;
    // }

    if (this.input['longTimer'] <= this.input['shortTimer']) {
      this.errors.longTimer = this.language['Digit_Validation_Dial_New'];
      this.error = true;
      if (this.input['longTimer'] < 4) this.valueLessShort = true
      return;
    }

    if (this.input['longTimer'] > 20) {
      this.errors.longTimer = this.language['Name_Validation2_dial_new'];
      this.error = true;
      return;
    }
  }

  verifyRules(): any {
    this.error = false;
    this.errors.shortTimer = '';

    this.valueLessShort = false

    if (!this.input['rules'].startsWith("^")) {
      this.errors.rules = this.language['Rules_Validation'];
      this.error = true;
      return;
    }

    if (this.input['rules'].endsWith("^")) {
      this.errors.rules = this.language['Rules_Validation2'];
      this.error = true;
      return;
    }

    if (!this.input['rules'].match("^\\^[^\\|\\^]*(\\|\\^[^\\|\\^]*)*\\|?$")) {
      this.errors.rules = this.language['Invalid Rule'];
      this.error = true;
      return;
    }
  }
  isEmptySpace: boolean = false
  nameSpaceNotAlloed(e) {
    this.isEmptySpace = e.target.value?.trim().length == 0;
  }


  doSubmit() {

    this.error = false;
    this.errors = {
      name: '',
      descriptioin: '',
      shortTimer: '',
      longTimer: '',
      rules: ''
    }
    this.valueLessShort = false
    if (!this.input['name']) {
      this.errors.name = this.language['Enter_A_Value'];
      this.error = true;
      return;

    }
    if (!this.input['shortTimer']) {
      this.errors.shortTimer = this.language['Enter_A_Value'];
      this.error = true;

    }
    if (!this.input['longTimer']) {
      this.errors.longTimer = this.language['Enter_A_Value'];
      this.error = true;
    }

    if (!this.input['rules'].startsWith("^")) {
      this.errors.rules = this.language['Rules_Validation'];
      this.error = true;
      return;
    }
    let len = this.input['name'].length;

    if (this.input['name'] && len < 4 || len > 20) {
      this.errors.name = this.language['Please enter value between 4 and 20 characters long'];
      this.error = true;
      return;
    }

    if (this.input['name'] && !this.regexObj['name'].test(this.input['name'])) {
      this.errors.name = this.language['Name_Validation_dial_new'];
      this.error = true;
      return;
    }



    if (this.input['shortTimer'] && this.input['shortTimer'] < 1) {
      this.errors.shortTimer = this.language['Please enter a value greater than or equal to 1'];
      this.error = true;
      return;
    }

    if (this.input['shortTimer'] && this.input['shortTimer'] > 16) {
      this.errors.shortTimer = this.language['Number_Validation_Dial_New'];
      this.error = true;
      return;
    }

    if (this.input['longTimer'] <= this.input['shortTimer']) {
      this.errors.longTimer = this.language['Digit_Validation_Dial_New'];
      this.error = true;
      if (this.input['longTimer'] < 4) this.valueLessShort = true
      return;
    }
    if (this.input['longTimer'] && this.input['longTimer'] < 4) {
      this.errors.longTimer = this.language['Value_Hint'];
      this.error = true;
      return;
    }

    if (this.input['longTimer'] && this.input['longTimer'] < this.input['shortTimer']) {
      this.errors.longTimer = this.language['Digit_Validation_Dial_New'];
      this.error = true;
      return;
    }

    if (this.input['longTimer'] && this.input['longTimer'] > 20) {
      this.errors.longTimer = this.language['Name_Validation2_dial_new'];
      this.error = true;
      return;
    }




    if (this.input['rules'].endsWith("^")) {
      this.errors.rules = this.language['Rules_Validation2'];
      this.error = true;
      return;
    }

    if (!this.input['rules'].match("^\\^[^\\|\\^]*(\\|\\^[^\\|\\^]*)*\\|?$")) {
      this.errors.rules = this.language['Invalid Rule'];
      this.error = true;
      return;
    }

    this.input['rules'] = this.input['rules'].toString().includes('|') ? this.input['rules'].toString().split('|') :
      this.input['rules'].toString().split();

    this.btnDisabled = false;
    this.id = this.Id;

    if (this.id) {
      delete this.input['_id'];
      let url = `${environment[`SUPPORT_URL`]}/netops-dp/dial-plan/${this.id}?${this.sso.getOrg(this.orgId)}_id=${this.id}`;

      this.http.put(url, this.input).subscribe((json: any) => {
        this.input = {
          name: '',
          description: '',
          shortTimer: '',
          longTimer: '',
          rules: ''
        };
        this.onClose.emit('submit');
        //this.router.navigate(['/support/netops-management/configuration/dial-plan']);
      }, (err: any) => {

        if (this.input.rules) {
          if (this.input.rules.length > 1) {
            this.input.rules = this.input.rules.join("|");
          } else {
            this.input.rules = this.input.rules.toString("");
          }
        }
        this.input = this.input;
        this.pageErrorHandle(err);
      });
    } else {
      let url = `${environment[`SUPPORT_URL`]}/netops-dp/dial-plan?${this.sso.getOrg(this.orgId)}`;

      this.http.post(url, this.input).subscribe((json: any) => {
        this.input = {
          name: '',
          description: '',
          shortTimer: '',
          longTimer: '',
          rules: ''
        };
        this.onClose.emit('submit');
        //this.router.navigate(['/support/netops-management/configuration/dial-plan']);
      }, (err: any) => {
        if (this.input.rules) {
          if (this.input.rules.length > 1) {
            this.input.rules = this.input.rules.join("|");
          } else {
            this.input.rules = this.input.rules.toString("");
          }
        }
        this.input = this.input;

        this.pageErrorHandle(err);
      });
    }




  }

  /**
   * @description - Method to construct dialpad.
   */
  private constructDialPad(): any {
    const dialPlanObj = this.dialPlanFormGroup.getRawValue();
    this.dialPlanObj.name = dialPlanObj.name.toString().trim();
    this.dialPlanObj.description = dialPlanObj.description !== null ? dialPlanObj.description.toString().trim() : null;
    this.dialPlanObj.shortTimer = Number(dialPlanObj.shortTimer);
    this.dialPlanObj.longTimer = Number(dialPlanObj.longTimer);
    this.dialPlanObj.rules = dialPlanObj.rules.toString().includes('|') ? dialPlanObj.rules.toString().split('|') :
      dialPlanObj.rules.toString().split();
    return this.dialPlanObj;
  }

  public get name() {
    return this.dialPlanFormGroup.get('name');
  }

  public get description() {
    return this.dialPlanFormGroup.get('description');
  }

  public get shortTimer() {
    return this.dialPlanFormGroup.get('shortTimer');
  }

  public get longTimer() {
    return this.dialPlanFormGroup.get('longTimer');
  }

  public get rules() {
    return this.dialPlanFormGroup.get('rules');
  }

  regexObj = {
    name: /^[a-zA-Z0-9_\s-]+$/,
    rules: {
      startsWith: "^",
      endsWith: "^",
      match: "^\\^[^\\|\\^]*(\\|\\^[^\\|\\^]*)*\\|?$"
    },
  }

  errors = {
    name: '',
    descriptioin: '',
    shortTimer: '',
    longTimer: '',
    rules: ''
  }

  viewDialPlan(): any {



    let url = `${environment[`SUPPORT_URL`]}/netops-dp/dial-plan/${this.id}?${this.sso.getOrg(this.orgId)}_id=${this.id}`;
    this.http.get(url).subscribe((json: any) => {
      if (json.rules) {
        if (json.rules.length > 1) {
          json.rules = json.rules.join("|");
        } else {
          json.rules = json.rules.toString("");
        }
      }
      this.input = json;
      delete this.input.orgId
    }, (err: any) => {

      this.pageErrorHandle(err);
    });
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  showError(msg): void {
    this.closeAlert();
    this.errorInfo = msg;
    this.error = true;
  }

  pageErrorHandle(err: HttpErrorResponse) {
    this.btnDisabled = false;
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.sso.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

}

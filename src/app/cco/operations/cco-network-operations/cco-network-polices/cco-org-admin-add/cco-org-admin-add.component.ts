import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { CcoOrgAdminService } from 'src/app/cco/shared/services/cco-org-admin.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cco-org-admin-add',
  templateUrl: './cco-org-admin-add.component.html',
  styleUrls: ['./cco-org-admin-add.component.scss']
})
export class CcoOrgAdminAddComponent implements OnInit {

  signupForm: FormGroup;
  serviceTypeTxt: string;
  ontIdTypeTxt: string;
  ontNameFormat: string;
  dhcpServerTypeTxt: string;
  loading: boolean = true;
  warningMessage: string;
  isError: boolean;
  submitted: boolean;
  success: boolean = false;
  successInfo: string;
  adminsData = [];
  dtOptions: DataTables.Settings = {};
  tableAvailable: boolean = false;
  cancelLink: string;
  disableServiceType: boolean = false;
  // dailPlantxt : string;
  serviceTypes = [
    { name: 'DATA', value: 'DATA' },
    { name: 'VIDEO', value: 'VIDEO' },
    { name: 'VOICE', value: 'VOICE' },
  ]
  ontSoakTimeout = '172800';
  ontSoakTimeouttxt = '172800';
  selectedtype: string;
  language;
  languageSubject;
  id;
  allowEdit: boolean = false;
  orgEnable: boolean;
  obj: any;
  scope: any = [];
  rgManagement: any = "NATIVE"
  timeValidate = {
    ontSoakTimeout: true
  };
  allowAddSystems: boolean = true;
  WarningMsg: boolean;
  hasScopeAccess = false;
  constructor(private ccoOrgAdminService: CcoOrgAdminService, private commonOrgService: CommonService, private translateService: TranslateService,
    private route: ActivatedRoute,
    private sso: SsoAuthService,
    private titleService: Title) { }



  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Policies']} - ${this.language['Network_Operations']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Policies']} - ${this.language['Network_Operations']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    let enttlmnts = this.sso.getEntitlements();
    if (enttlmnts[210] && !enttlmnts[102]) {
      this.allowAddSystems = false;
    }
    // this.id = this.route.snapshot.params['id'];
    // if (this.id) this.allowEdit = true;

    let scopes = this.sso.getScopes();


    if (environment.VALIDATE_SCOPE) {
      // let validScopes: any = Object.keys(scopes);
      if (scopes && (scopes['cloud.rbac.coc.operations.network.policies'])) {
        this.hasScopeAccess = true;
        if (scopes['cloud.rbac.coc.operations.network.policies'].indexOf('read') !== -1) this.scope['read'] = true;
        if (scopes['cloud.rbac.coc.operations.network.policies'].indexOf('write') !== -1) this.scope['write'] = true;
      }

    } else {
      this.scope = {
        read: true,
        write: true
      }

      this.hasScopeAccess = true;

    }

    if (!this.hasScopeAccess) {
      this.sso.setPageAccess(false);
      return;
    }

    this.getAdmins();

    this.signupForm = new FormGroup({
      // 'serviceType': new FormControl(null, Validators.required, ),
      //'orgEnable': new FormControl(false),
      'ontIdType': new FormControl(null, Validators.required),
      'ontNameFormat': new FormControl('%Fsan', Validators.required),
      // 'dhcpServerType': new FormControl(null, Validators.required),
      'ontSoakTimeout': new FormControl('172800', Validators.required),
      'rgManagement': new FormControl('NATIVE', Validators.required)
      // 'dialPlan' : new FormGroup({
      //   'dialPlan' : new FormGroup({
      //     'name' : new FormControl(null)
      //   })  
      // })
    })

    // this.route.queryParams.subscribe((data: any) => {
    //   console.log(data);
    //   this.serviceType = data.serviceType;
    //   this.ontIdType = data.ontIdType;
    //   this.ontNameFormat = data.ontNameFormat;
    //   this.dhcpServerType = data.dhcpServerType;
    // })

    // if (!this.allowEdit) {
    //   this.cancelLink = "../cco-org-admin"
    // } else {
    //   this.cancelLink = "../../../cco-org-admin"
    // }
  }

  get modalForm() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.valid) {
      if (this.adminsData.length !== 0) {

        this.obj = {
          'ontIdType': this.ontIdTypeTxt,
          'ontNameFormat': this.ontNameFormat,
          // 'dhcpServerType': this.dhcpServerTypeTxt,
          'ontSoakTimeout': this.ontSoakTimeouttxt,
          'rgManagement': 'NATIVE'
        }
        let ontTimeError;
        if (this.ontSoakTimeouttxt != null && this.ontSoakTimeouttxt != undefined) {
          this.TimeValidate('ontSoakTimeout');
          ontTimeError = !this.timeValidate.ontSoakTimeout;
        }
        if (ontTimeError) {
          return
        }
        this.loading = true;
        this.ccoOrgAdminService.updateAdminData(this.obj).subscribe((data: any) => {
          this.loading = false;
          this.success = true;
          this.successInfo = this.language['Updated Succesfully'];
          // this.router.navigate(['../../../cco-org-admin'], { relativeTo: this.route });
          if (this.isError) {
            this.isError = false;
            this.warningMessage = '';
          }
        }, (err: HttpErrorResponse) => {
          this.loading = false;
          this.pageErrorHandle(err);
        })
      } else {
        let ontTimeError;
        if (this.signupForm.value.ontSoakTimeout != null && this.signupForm.value.ontSoakTimeout != undefined) {
          this.TimeValidate('ontSoakTimeout');
          ontTimeError = !this.timeValidate.ontSoakTimeout;
        }
        if (ontTimeError) {
          return
        }
        this.ccoOrgAdminService.createAdmin(this.signupForm.value).subscribe((data: any) => {
          this.loading = false;
          if (data == 'Entered values for attribute org_id and service_type already present in table org_admin_data') {
            // this.isError = true;
            this.warningMessage = 'Entered values are already present';
            return
          }
          this.successInfo = this.language['Successfully Created!'];
          this.success = true;
          this.getAdmins();
          // this.router.navigate(['../cco-org-admin'], { relativeTo: this.route });
          // this.signupForm.reset();

          if (this.isError) {
            this.isError = false;
            this.warningMessage = '';
          }
        }, err => {
          this.loading = false;
          this.pageErrorHandle(err);
        })
      }
    } else {
      this.loading = false;
    }
  }

  TimeValidate(field) {
    let value = this.signupForm.value[field];

    this.timeValidate[field] = (value >= 2880 && value <= 172800);

  }
  getAdmins() {
    this.loading = true;
    this.ccoOrgAdminService.fetchAmdins('All').subscribe((data: any) => {
      this.loading = false;
      if (data == 'Org Admin Data not found') {
        this.adminsData = [];
        this.ontSoakTimeouttxt = '172800';
        return;
      }
      if (data) {
        // this.serviceTypeTxt = data[0].serviceType;
        //this.orgEnable = data.orgEnable;
        this.ontIdTypeTxt = data.ontIdType;
        this.ontNameFormat = data.ontNameFormat;
        // this.dhcpServerTypeTxt = data.dhcpServerType;
        this.ontSoakTimeouttxt = data.ontSoakTimeout ? data.ontSoakTimeout : '172800';
        this.rgManagement = 'NATIVE';
        // this.dailPlantxt =  data[0].dialPlan instanceof Object ? data[0].dialPlan.dialPlan.name : '' ; 
        // this.signupForm.controls['serviceType'].disable() ;
      }
      this.signupForm.patchValue(data)
      this.signupForm.patchValue({rgManagement:data.rgManagement? data.rgManagement:'NATIVE'})
     
      this.adminsData = data instanceof Array ? data : [data];
      this.loading = false;
    }, err => {
      this.pageErrorHandle(err);
    })

  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.warningMessage = this.language['Access Denied'];
    } else {
      this.warningMessage = this.commonOrgService.pageErrorHandle(err);
    }
    this.isError = true;
    this.loading = false;
  }
  // pageErrorHandle(error: HttpErrorResponse) {
  //   if (error.status == 401) {
  //     this.warningMessage = this.language['Access Denied'];
  //   } else if (error.status == 400) {
  //     this.warningMessage = error.error.message;
  //   } else if (error.status == 500) {
  //     if (error.error.message) {
  //       this.warningMessage = error.error.message
  //     } else {
  //       this.warningMessage = error.error
  //     }
  //   } else if (error.status == 504) {
  //     this.warningMessage = 'Gateway time out';
  //   }
  //   this.isError = true;
  //   this.loading = false;
  // }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }

  EnableOrg() {
    this.WarningMsg = true;
    this.orgEnable = !this.orgEnable;
  }
  RemoveWarning() {
    this.WarningMsg = false;
  }
  camcelEnable() {
    this.orgEnable = !this.orgEnable;
    this.WarningMsg = false;
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { FoundationManageService } from '../../foundation-manage.service';

@Component({
  selector: 'app-add-static-groups',
  templateUrl: './add-static-groups.component.html',
  styleUrls: ['./add-static-groups.component.scss']
})
export class AddStaticGroupsComponent implements OnInit,OnChanges {

  language: any;
  languageSubject;
  modalRef: any;

  @Input() staticGroups;
  @Input() deviceDataList: any[];
  @Input() AllFormData;
  @Output() private out_static_groups_change: EventEmitter<any> = new EventEmitter();
  @Output() private out_static_groups_submit: EventEmitter<any> = new EventEmitter();
  @ViewChild('swapSystem', { static: true })
  private swapSystem: TemplateRef<any>;
  @Input() disableGroup: boolean;
  staticGroupForm: FormGroup;
  formData: any;
  formDataSubject: any;

  errorInfo: any;
  error: boolean;
  success: boolean;
  ORG_ID: any;
  errmsg: string;

  subscription: Subscription[]= [];
  isStatic: boolean = false;
  fsanmsg: string;
  deviceData: any;
  loading: boolean;
  device: { modelName: any; opMode: any; };
  modelnoteditable: boolean;
  submitted: boolean;
  systemModelRquired: boolean;
  deviceModels = [];
  staticGroupError: boolean;
  constructor(
    private translateService: TranslateService,
    private dialogService: NgbModal,
    private service: FoundationManageService,
    private commonOrgService: CommonService,
    private sso: SsoAuthService,
    private http: HttpClient,
  ) {
    this.ORG_ID = this.sso.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.subscription.push(this.translateService.selectedLanguage.subscribe(
      (data: any) => {
        this.language = data;
      }
    ));
  }

  ngOnInit(): void {
    this.staticGroupForm = new FormGroup({
      static: new FormControl(false),
      staticGroupList: new FormControl([]),
    });
    this.staticGroupForm.patchValue(this.staticGroups)
    this.subscription.push(this.service.staticGroupSubject.subscribe((res) => {
      this.staticGroupForm.patchValue(res);
    }))
    // if (this.staticGroups.length) {
    //   this.staticGroupForm.patchValue({ static: true, staticGroupList: this.staticGroups });
    // } else {
    //   this.staticGroupForm.patchValue({ static: false, staticGroupList: this.staticGroups });
    // }


  }
// ngAfterViewInit(): void {
//   this.subscription.push(this.service.staticGroupSubject.subscribe((res) => {
//     console.log(res)
//     this.staticGroupForm.patchValue(res);
//   }))
// }
  updatedOnce: boolean = true;
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.disableGroup && this.disableGroup){
      this.staticGroupForm?.patchValue({
        static : false,
        staticGroupList:[]
      })
    }
  }

  changeStatic() {
    //debugger;
    this.staticGroupError = false;
    this.submitted = false;
    let formData = this.staticGroupForm.value;
    if (formData.staticGroup && formData.staticGroup?.static) {
      this.isStatic = true;
    } else { this.isStatic = false; }

    if (!this.isStatic) {
      this.staticGroupForm.patchValue({ staticGroupList: [] });
    }
    this.out_static_groups_change.emit(this.staticGroupForm.value);
  }

  saveSystem() {
    this.staticGroupError = false;
    this.validateStaticGroups();
    if (this.staticGroupError) {
      return true;
    }
    this.submitted = true;
    this.out_static_groups_change.emit(this.staticGroupForm.value);
    // this.out_static_groups_submit.emit();
  }

  validateStaticGroups() {
    let formData = this.staticGroupForm.value;
    if (formData.static) {
      if (formData.staticGroupList && formData.staticGroupList.length) {
        this.staticGroupError = false;
      } else this.staticGroupError = true;
    } else {
      this.staticGroupError = false;
    }
  }

  systemchange() {
    this.out_static_groups_change.emit(this.staticGroupForm.value);
  }
  ngOnDestroy(): void {
   this.subscription.forEach(e=> e.unsubscribe());

    this.out_static_groups_change.emit(this.staticGroupForm.value);
  }


  closeAlert() {
    this.error = false;
    this.success = false;
  }
  closeAllModal() {
    this.dialogService.dismissAll();
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }
}

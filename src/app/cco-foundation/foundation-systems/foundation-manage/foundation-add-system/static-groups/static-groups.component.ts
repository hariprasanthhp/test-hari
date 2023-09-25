import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationDataService } from '../../../foundation-data.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-static-groups',
  templateUrl: './static-groups.component.html',
  styleUrls: ['./static-groups.component.scss']
})
export class StaticGroupsComponent implements OnInit {

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

  staticGroupForm: FormGroup;
  formData: any;
  formDataSubject: any;

  errorInfo: any;
  error: boolean;
  success: boolean;
  ORG_ID: any;
  errmsg: string;


  isStatic: boolean = false;
  fsanmsg: string;
  deviceData: any;
  loading: boolean;
  device: { modelName: any; opMode: any; };
  modelnoteditable: boolean;
  submitted: boolean;

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
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data: any) => {
        this.language = data;
      }
    );


  }

  ngOnInit(): void {
    this.staticGroupForm = new FormGroup({
      static: new FormControl(false),
      staticGroupList: new FormControl([]),
    });
    if (this.staticGroups) {
      // if (this.staticGroups.length) {
      //   this.staticGroupForm.patchValue({ static: true, staticGroupList: this.staticGroups });
      // } else {
      //   this.staticGroupForm.patchValue({ static: false, staticGroupList: this.staticGroups });
      // }
      this.staticGroupForm.patchValue(this.staticGroups);

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
  }

  saveSystem() {
    this.staticGroupError = false;
    this.validateStaticGroups();
    if (this.staticGroupError) {
      return;
    }
    this.submitted = true;
    this.out_static_groups_change.emit(this.staticGroupForm.value);
    this.out_static_groups_submit.emit();
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
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

    this.out_static_groups_change.emit(this.staticGroupForm.value);
  }


  closeAlert() {
    this.error = false;
    this.success = false;
  }
  closeAllModal() {
    this.dialogService.dismissAll();
  }


}

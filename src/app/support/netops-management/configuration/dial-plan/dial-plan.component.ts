import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { forkJoin, Observable, Subject, Subscription } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { AcessModifiers, SsoAuthService } from '../../../../shared/services/sso-auth.service';
import { ApiService } from '../../../../shared/services/api.service';
import { environment } from '../../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import * as jquery from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { DialPlanService } from '../../shared/dial-plan.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dial-plan',
  templateUrl: './dial-plan.component.html',
  styleUrls: ['./dial-plan.component.scss']
})

export class DialPlanComponent implements OnInit, AfterViewInit, OnDestroy {

  // Initialize component essential variables.
  public dtOptions: DataTables.Settings = {};
  public dialPadCount: number;
  public dialPadList: any[];

  // Initialize common variables.
  public language: any;
  public languageSubject: Subscription;
  public loader = false;
  public successMsg: string;
  public errorMsg: string;
  public dialPlanObj: any;
  public showDialog: boolean = true;
  // Access modifiers - private.
  private httpParams: HttpParams;
  private unSubscribeParam$ = new Subject();
  private routerState$: Observable<object>;

  // Url constants.
  public dialPadUrl = `${environment[`SUPPORT_URL`]}/netops-dp/dial-plan`;
  private dialPadCountUrl = `${environment[`SUPPORT_URL`]}/netops-dp/dial-plan/count`;
  dialPlanName = '';
  hasWriteAccess = false;
  modalRef: any;
  allowDialPlan = true;
  // Reference HTML Elements.
  @ViewChild('dialPlanDeleteModalRef') deleteModalRef: TemplateRef<any>;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('openDialogBtn') openDialogBtn: ElementRef;
  validateScopeStage: boolean;
  hasScopeAccess = false;
  constructor(
    private translateService: TranslateService,
    private titleService: Title,
    private httpService: ApiService,
    private authService: SsoAuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    public httpDialPlan: DialPlanService,
  ) {
    this.loader = true;

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
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.setTitle(this.router.url);
    });
    this.setTitle(this.router.url);
    let enttlmnts = this.authService.getEntitlements();
    if (this.router.url.includes('cco/services') && enttlmnts[210] && !enttlmnts[102]) {
      this.allowDialPlan = false;
    }

    let scopes = this.authService.getScopes();
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco/services/service-profiles/dial-plan')) {
      if (environment.VALIDATE_SCOPE) {
        scopes['cloud.rbac.csc.netops.config.dial_plan'] = scopes['cloud.rbac.csc.netops.config.dial_plan'] ? scopes['cloud.rbac.csc.netops.config.dial_plan'] : [];
        if (scopes['cloud.rbac.csc.netops.config.dial_plan'].length) {
          this.hasScopeAccess = true;
        }
        if (scopes && (scopes['cloud.rbac.csc.netops.config.dial_plan'] && scopes['cloud.rbac.csc.netops.config.dial_plan'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
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
        if (scopes['cloud.rbac.foundation.configurations'].length) {
          this.hasScopeAccess = true;
        }
        if (scopes && (scopes['cloud.rbac.foundation.configurations'].includes('write'))) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }

    }

    if (!this.hasScopeAccess) {
      this.authService.setPageAccess(false);
      return;
    }

    let base = `${environment.API_BASE}`;
    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.validateScopeStage = true;
    } else this.validateScopeStage = false;

    if (!this.dialPlanObj) {
      this.loadDialPadList();
    }


  }

  ngAfterViewInit(): void {
    this.routerState$ = this.activatedRoute.paramMap.pipe(takeUntil(this.unSubscribeParam$), map(() => window.history.state));
    this.routerState$.subscribe((state: object) => {
      if (state && state[`dialPlanObj`] !== null && state[`dialPlanObj`] !== undefined) {
        this.dialPlanObj = state[`dialPlanObj`];

        this.triggerSaveOrEdit();
      }
    });
  }

  ngOnDestroy(): void {
    this.languageSubject.unsubscribe();
    this.unSubscribeParam$.next();
    this.unSubscribeParam$.complete();
  }

  /**
   * @description - Method to trigger save or edit.
   */
  private triggerSaveOrEdit(): void {
    if (this.dialPlanObj && !this.dialPlanObj.hasOwnProperty('_id')) {
      this.httpService.post(this.dialPadUrl, this.dialPlanObj, this.constructParam(null)).subscribe((result: any) => {
        if (result) {
          this.loadDialPadList();
          this.reDrawTable();
        }
      }, (error: HttpErrorResponse) => {
        this.showErrorAlert(this.httpService.handleError(error));
      });
    } else if (this.dialPlanObj && this.dialPlanObj.hasOwnProperty('_id')) {
      const formattedUrl = this.dialPadUrl + '/' + `${this.dialPlanObj._id}`;
      this.httpService.put(formattedUrl, this.dialPlanObj, this.constructParam(null)).subscribe(() => {
        this.loadDialPadList();
        this.reDrawTable();
      }, (error: HttpErrorResponse) => {
        this.showErrorAlert(this.httpService.handleError(error));
      });
    }
  }

  /**
   * @description - Method to show alert.
   * @param - {string} msg.
   */
  private showSuccessAlert(msg: string) {
    jquery('.alert.alert-success').show();
    this.successMsg = msg;
    setTimeout(() => {
      this.closeAlert();
    }, 2000);
  }

  /**
   * @description - Method to show alert.
   * @param - {string} msg.
   */
  private showErrorAlert(msg: string) {
    jquery('.alert.alert-error').show();
    this.errorMsg = msg;
    setTimeout(() => {
      this.closeAlert();
    }, 2000);
  }
  private showDeleteAlert(msg: string) {
    jquery('.alert.alert-error').show();
    jquery('.alert.alert-error').addClass('alert-danger')
    this.errorMsg = msg;
  }

  /**
   * @description - Method to close alert.
   */
  public closeAlert(): void {
    jquery('.alert').hide();
  }

  /**
   * @description - Method to load dialpad list.
   */
  public loadDialPadList() {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      // pageLength: 10,
      paging: false,
      dom: 't',
      searching: false,
      lengthChange: false,
      destroy: true,
      ordering: false,
      serverSide: true,
      processing: false,
      columns: [{ data: 'name' }, { data: 'description' }, { data: 'shortTimer' }, { data: 'longTimer' }, { data: 'rules' }, { data: null }],
      ajax: (dtParams: any, callbackTransferData) => {
        const dialPad = this.httpService.get(this.dialPadUrl, this.constructParam(dtParams));
        const diapPadCount = this.httpService.get(this.dialPadCountUrl, this.constructParam(null));
        forkJoin([dialPad, diapPadCount]).subscribe((apiJsonResults: any[]) => {
          this.dialPadList = apiJsonResults[0];
          this.dialPadCount = apiJsonResults[1].count;
          this.loader = false;
          callbackTransferData({
            recordsTotal: this.dialPadCount,
            recordsFiltered: this.dialPadCount,
            data: []
          });
        }, (error: HttpErrorResponse) => {
          this.loader = false;
          this.showErrorAlert(this.httpService.handleError(error));
        });
      }
    };
  }

  /**
   * @description - Method to construct http param.
   * @param - { any } dtParams.
   */
  orgId;
  private constructParam(dtParams?: any): HttpParams {
    this.httpParams = new HttpParams();
    // this.httpParams = this.httpParams.set('orgId', this.authService.getOrg(this.orgId));
    if (this.authService.getOrg(this.orgId)) {
      this.httpParams.set("orgId", this.orgId)
    }
    if (dtParams !== null) {
      this.httpParams = this.httpParams.set('limit', '0');
      this.httpParams = this.httpParams.set('skip', '0');
      // this.httpParams = this.httpParams.set('limit', dtParams.length.toString());
      // this.httpParams = this.httpParams.set('skip', dtParams.start.toString());
    }
    return this.httpParams;
  }

  /**
   * @description - Method to navigate edit dialog.
   * @param - { any }.
   */
  editDialPlanObj: any;
  editMode: boolean = false;
  public goToEdit(dialPlanObj: any): void {
    if (dialPlanObj?.name === "system-default") {
      return
    }
    this.editDialPlanObj = dialPlanObj;
    this.editMode = true;
    this.openDialogBtn.nativeElement.click();
    this.showDialog = true;
    /*  this.authService.redirectByUrl([
       `support/netops-management/configuration/dial-plan/${dialPlanObj._id}`,
       `cco/operations/cco-system-operations/sub-profile/${dialPlanObj._id}`,
       `/cco-foundation/foundation-configuration/configuration-prerequisites/dial-plan/${dialPlanObj._id}`,
       `/cco/operations/cco-subscriber-operations/configurations/dial-plan/${dialPlanObj._id}`,
     ], {
       state: {
         dialPlanObj: dialPlanObj ? dialPlanObj : null
       }
     }); */
    /* this.router.navigateByUrl('/support/netops-management/configuration/dial-plan/' +
      `${dialPlanObj._id}`, {
      state: {
        dialPlanObj: dialPlanObj ? dialPlanObj : null
      }
    }); */
  }

  /**
   * @description -Method to delete dial plan dialog.
   * @param - { any } dialPlanObj.
   */
  public deleteDialPlan(dialPlanObj: any): void {
    this.dialPlanObj = dialPlanObj;
    this.dialPlanName = dialPlanObj?.name;
    jquery("html, body").animate({ scrollTop: 0 }, "slow");
    // const dialogRef = this.modalService.open(this.deleteModalRef);
    // dialogRef.closed.subscribe((result: any) => {
    //   if (result) {
    //     const deleteSubnetByIdUrl: string = this.dialPadUrl + '/' + `${dialPlanObj._id}`;
    //     this.httpService.delete(deleteSubnetByIdUrl).subscribe(() => {
    //       this.dialPlanObj = null;
    //       this.showSuccessAlert(this.language['Dial Plan Deleted successfully']);
    //       this.reDrawTable();
    //     }, (error: HttpErrorResponse) => {
    //       this.showErrorAlert(this.httpService.handleError(error));
    //     });
    //   }
    // });
  }

  /**
   * @description - Method to redraw table.
   */
  public reDrawTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  cancelDelete() {
    this.dialPlanName = '';
  }

  confirmDeleteDialPlan(item) {
    this.dialPlanName = item;
  }

  doDeleteDialPlan() {
    const deleteSubnetByIdUrl: string = this.dialPadUrl + '/' + `${this.dialPlanObj._id}`;
    this.httpDialPlan.delete(deleteSubnetByIdUrl).subscribe((res) => {
      this.dialPlanName = '';
      this.dialPlanObj = null;
      this.showSuccessAlert(this.language['Dial Plan Deleted successfully']);
      this.reDrawTable();

    }, (error: HttpErrorResponse) => {
      this.showDeleteAlert(this.httpService.handleError(error.error));
      this.dialPlanName = '';
      this.dialPlanObj = null;

    });
  }

  newDialPlan() {
    /*  this.authService.redirectByUrl([
       '/support/netops-management/configuration/dial-plan/add',
       '/cco/operations/cco-system-operations/sub-profile/add',
       '/cco-foundation/foundation-configuration/configuration-prerequisites/dial-plan/add',
       '/cco/operations/cco-subscriber-operations/configurations/dial-plan/add',
     ]); */
    //this.modalRef = this.modalService.open(this.addModal, { size: 'lg', windowClass: 'custom-xl-modal' });
  }

  onModalClose(event) {
    if (event == 'submit') {
      this.reDrawTable();
      this.showDialog = false;
      this.editMode = false;
    }
    this.closeBtn.nativeElement.click();
    this.showDialog = false;
    this.editMode = false;
  }
  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
      this.editMode = false;
      this.showDialog = false;
    }
    this.editMode = false;
    this.showDialog = false;
    this.editDialPlanObj = undefined;
  }
  openDialog() {
    this.showDialog = true
    if (!this.editMode) {
      this.editDialPlanObj = undefined;
    }
  }
}

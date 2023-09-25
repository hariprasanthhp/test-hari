import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { OrganizationApiService } from '../services/organization-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-billing-pipeline-status',
  templateUrl: './billing-pipeline-status.component.html',
  styleUrls: ['./billing-pipeline-status.component.scss']
})
export class BillingPipelineStatusComponent implements OnInit {
  @ViewChild('infoModal', { static: true }) private infoModal: TemplateRef<any>;
  language: any;
  languageSubject: any;
  billingSummarySubject: any;
  pipelineSummary: PipelineSummary;
  loading = false;
  infoTitle: string;
  infoBody: string;
  modalRef: any;
  rouerSubs: any;

  constructor(private translateService: TranslateService,
    private titleService: Title,
    private organizationApiService: OrganizationApiService,
    private commonOrgService: CommonService,
    private dialogService: NgbModal,
    private router: Router,


  ) {
    this.commonOrgService.currentPageAdder('billing-pipeline-status');
    this.rouerSubs = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.commonOrgService.closeAlert();
      }
    });
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data) => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Billing Pipeline Status']} - ${this.language['administration']} - ${this.language['Calix Cloud']}`);
    })
    this.getApiUsageQuota();
    this.titleService.setTitle(`${this.language['Billing Pipeline Status']} - ${this.language['administration']} - ${this.language['Calix Cloud']}`);
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.billingSummarySubject) {
      this.billingSummarySubject.unsubscribe();
    }
    if (this.rouerSubs) {
      this.rouerSubs.unsubscribe();
    }
  }


  getApiUsageQuota() {
    this.loading = true;
    this.billingSummarySubject = this.organizationApiService.fetchBillingSummaryInfo().subscribe((res: any) => {
      if (res) {
        this.pipelineSummary = res;
        if (this.pipelineSummary?.uploadFile?.timestamp) {
          this.pipelineSummary.uploadFile.timestamp = new Date(this.pipelineSummary?.uploadFile?.timestamp)
        }
      }
      this.loading = false;
    },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.pageErrorHandle(error);
      }
    );
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  openInfoModal() {
    this.closeModal();
    this.modalRef = this.dialogService.open(this.infoModal);
  }

  pageErrorHandle(err: HttpErrorResponse) {
    let errorInfo = '';
    this.infoTitle = 'Error';
    if (err.status == 400) {
      this.infoBody = this.commonOrgService.pageInvalidRqstErrorHandle(err);
      this.infoTitle = this.language['Invalid request'];
      this.openInfoModal();
      this.loading = false;
    } else {
      if (err.status == 401) {
        errorInfo = this.language['Access Denied'];
      } else {
        errorInfo = this.commonOrgService.pageErrorHandle(err);
      }
      this.commonOrgService.openErrorAlert(errorInfo);
      this.commonOrgService.pageScrollTop();
      this.loading = false;
    }
  }
}


export class PipelineSummary {
  dataCheck?: DataCheck;
  uploadFile?: UploadFile;
  sync?: Sync;
}

class DataCheck {
  timestamp?: number;
  status?: string;
  recordCountCheck?: string;
  uniqueIdCountCheck?: string;
  endpointCountCheck?: string;
  csckeyCountCheck?: string;
  deviceCountCheck?: string;
}

class Sync {
  added?: number;
  updated?: number;
  deleted?: number;
  timestamp?: number;
}

class UploadFile {
  timestamp?: any;
}

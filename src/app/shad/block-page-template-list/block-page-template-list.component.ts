import { Component, OnInit, ViewChild, OnDestroy, ElementRef, TemplateRef, HostListener, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterService } from '../../../app-services/routing.services';
import { BlockPageService } from "../service/block-page.service";
import { AcessModifiers, CheckScopes, SsoAuthService } from "../../shared/services/sso-auth.service";
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OrganizationApiService } from 'src/app/sys-admin/services/organization-api.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

declare var require: any;
const $: any = require('jquery');


@Component({
  selector: 'app-block-page-template-list',
  templateUrl: './block-page-template-list.component.html',
  styleUrls: ['./block-page-template-list.component.scss']
})
export class BlockPageTemplateListComponent implements OnInit {
  language: any;
  languageSubject;

  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('defaultModal', { static: true }) private defaultModal: TemplateRef<any>;
  @ViewChild('defaultSuccessModal', { static: true }) private defaultSuccessModal: TemplateRef<any>;
  @ViewChild('deleteSuccessModal', { static: true }) private deleteSuccessModal: TemplateRef<any>;
  modalRef: any;
  blockList: any = [];
  showLoadMoreBtn: boolean = true;
  templateData: any = {};
  deleteTemplateId: any;
  defaultTemplateId: any;
  templateName: any;
  loader: boolean = true;
  serviceSubscription: any;
  showDeleteBtn: boolean = false;
  showUpdateBtn: boolean = false;
  showAddBtn: boolean = false;
  disableDeleteBtn = false;

  isShad = true;
  ADMIN_MODULE: string;
  ADMIN_ORG_ID: string;
  SPID: string;
  getOrgInfoSubs: any;
  pageScroll: () => void;

  //REDIRECT_URL: string = 'cco-foundation/foundation-configuration/configuration-settings';
  REDIRECT_URL: string = '/organization-admin';
  showNoDataAvail: boolean;

  //varibles  used for ng test
  listBlockedPageData:any;
  deleteBlockpageResponse:any;
  orgIdResponse:any;
  constructor(
    private routerService: RouterService,
    public service: BlockPageService,
    private router: Router,
    private dialogService: NgbModal,
    private sso: SsoAuthService,
    private translateService: TranslateService,
    private zone: NgZone,
    private commonOrgService: CommonService,
    private organizationApiService: OrganizationApiService,
    private titleService: Title,
  ) {
    this.service.setIntialData();
    this.commonOrgService.currentPageAdder('block_page');

    let url = this.router.url;
    if (url.indexOf('/shad/') === -1) {
      this.isShad = false;
      this.ADMIN_ORG_ID = this.sso.getOrganizationID(url);
      this.REDIRECT_URL = this.sso.getRedirectModule(url);
      this.SPID = this.sso.getAdminSPID(this.ADMIN_ORG_ID);
      //this.SPID = this.sso.getSPID();
    } else {
      this.SPID = this.sso.getSPID();
    }
    if (url.indexOf('/foundation-configuration/') > -1) {
      this.REDIRECT_URL = 'cco-foundation/foundation-configuration/configuration-settings';
    }

  }



  ngOnInit() {

    let scope = this.sso.getScopes();
    let url = this.router.url;
    // let validateScopeStage = false;
    // let base = `${environment.API_BASE}`;
    // if (base.indexOf('/dev.api.calix.ai') > -1) {
    //   validateScopeStage = true;
    // } else validateScopeStage = false;
    if (url.indexOf('/shad/') !== -1) {
      if (scope['cloud.shad.service'] && scope['cloud.shad.service'].indexOf('write') !== -1) {
        this.showUpdateBtn = true;
        this.showAddBtn = true;
        this.showDeleteBtn = true;
      }
    } else {
      //foundation scope check
      if (this.sso.checkAdminScopes(AcessModifiers.WRITE)) {
        this.showUpdateBtn = true;
        this.showAddBtn = true;
        this.showDeleteBtn = true;
      }

    }

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      //this.appendData();
      this.titleService.setTitle(`${this.language['Block_Page_Temp']} - ${this.REDIRECT_URL === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Block_Page_Temp']} - ${this.REDIRECT_URL === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    this.loadRecords();
    this.appendData();
    this.windowScrollEvent();


  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    // visible height + pixel scrolled >= total height
    if (event.target.offsetHeight + event.target.scrollTop + 10 >= event.target.scrollHeight) {
      this.loadRecords();
    }
  }



  scroll = (event: any) => {
    let lastScrollTop = 0;

    let st = $(".ng-star-inserted").scrollTop();
    if (st > lastScrollTop) {
      //this.loadRecords();
    }

    lastScrollTop = st;

  }
  addBlockPage() {
    if (this.isShad) {
      this.router.navigate([`/shad/block_page_template`]);
    } else {
      this.router.navigate([`/${this.REDIRECT_URL}/block_page_template`]);
    }

    //this.routerService.newBlockPageCreate();
  }
  viewBlockPage() {
    this.routerService.blockPageView()
  }
  updateBlockPage(data) {
    this.routerService.blockPageUpdate(data)
  }

  loadRecords(): void {
    if (!this.showLoadMoreBtn) {
      return;
    }

    if (!this.SPID && !this.isShad) {
      this.getOrgInfoSubs = this.organizationApiService.getOrgInfo(this.ADMIN_ORG_ID).subscribe((res: any) => {
        this.orgIdResponse=res;
        this.sso.setAdminOrgInfo(res);
        if (res && res.spId) {
          this.SPID = res.spId;
          this.service.getList(this.SPID);
        }

      }, (err: HttpErrorResponse) => {
      })
    } else {
      this.service.getList(this.SPID);
    }

    //this.service.getList(this.SPID);





  }

  gotoView(templateId: any): void {
    let updateData = this.templateData[templateId];
    if (!updateData) {
      alert(this.language['No template found for template id'] + templateId);
      return;
    }
    var params = {};
    if (updateData.logoBgColor.indexOf('#') == -1) {
      updateData.logoBgColor = "#" + updateData.logoBgColor;
    }

    if (updateData.bodyFontColor.indexOf('#') == -1) {
      updateData.bodyFontColor = "#" + updateData.bodyFontColor;
    }

    params["header_bg"] = updateData.logoBgColor;
    params["bodyFontColor"] = updateData.bodyFontColor;

    params["logo"] = updateData.logoImage;
    params["body_bg_image"] = updateData.bodyBgImage;

    localStorage.setItem('original_params', JSON.stringify(params));

    this.router.navigate([]).then(result => { window.open("/block_page_template_view?id=" + templateId, '_blank') });
  }

  loadDeleteModal(id: string, name: any) {

    this.deleteTemplateId = id.toString();
    this.templateName = name;
    this.modalRef = this.dialogService.open(this.deleteModal, {backdrop: 'static', keyboard: false});

  }

  loadDefaultModal(id: any, name: any) {

    this.defaultTemplateId = id;
    this.templateName = name;
    this.modalRef = this.dialogService.open(this.defaultModal);

  }

  loadDefaultSuccessModal(): any {
    this.modalRef = this.dialogService.open(this.defaultSuccessModal);
  }

  loadDeleteSuccessModal(): any {
    this.modalRef = this.dialogService.open(this.deleteSuccessModal);
  }

  disableDefaultBtn = false;
  setDefaultTemplate(): void {
    this.disableDefaultBtn = true;
    this.service.setDefaultTemplate(this.defaultTemplateId, this.SPID).subscribe(
      (res: any) => {
        this.disableDefaultBtn = false;
        this.close();
        this.loadDefaultSuccessModal();
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      },
      (err: any) => {
        this.disableDefaultBtn = false;

      }
    );
  }

  deleteTemplate(): void {
    this.disableDeleteBtn = true;
    this.service.deleteTemplate(this.deleteTemplateId, this.SPID).subscribe(
      (res: any) => {
        this.deleteBlockpageResponse=res;
        this.disableDeleteBtn = false;
        this.close();
        this.loadDeleteSuccessModal();
        // setTimeout(function () {
        //   window.location.reload();
        // }, 1000);
        document?.getElementById(this.deleteTemplateId + '_row')?.remove();
      },
      (err: any) => {
        this.disableDeleteBtn = false;

      }
    );
  }

  close() {
    this?.modalRef?.close();
  }

  gotoUpdate(templateId: any): void {
    // let updateData = this.templateData[templateId];
    // if (!updateData) {
    //     alert("No template found for template id : " + templateId);
    //     return;
    // }
    // var params = {};
    // if (updateData.logoBgColor.indexOf('#') == -1) {
    //   updateData.logoBgColor="#"+updateData.logoBgColor;
    // }

    // if (updateData.bodyFontColor.indexOf('#') == -1) {
    //   updateData.bodyFontColor="#"+updateData.bodyFontColor;
    // }

    // params["header_bg"] = updateData.logoBgColor;
    // params["bodyFontColor"] = updateData.bodyFontColor;

    // params["logo"] = updateData.logoImage;
    // params["body_bg_image"] = updateData.bodyBgImage;

    // localStorage.setItem('original_params', JSON.stringify(params));

    //this.router.navigate([]).then(result => { window.open("/shad/block_page_template_update/" + templateId, '_self') });
    if (this.isShad) {
      this.router.navigate([`/shad/block_page_template_update/${templateId}`]);
    } else {
      this.router.navigate([`/${this.REDIRECT_URL}/block_page_template_update/${templateId}`]);
    }

  }

  error = false;
  errorMsg: any = '';

  showError(errorMsg: any) {
    this.error = true;
    this.errorMsg = errorMsg;
  }

  hideError() {
    this.error = false;
    this.errorMsg = '';
  }

  appendData(): void {
    this.serviceSubscription = this.service.result$.subscribe(
      (jdata: any) => {
        if (jdata && jdata['error']) {
          this.loader = false;
          this.showLoadMoreBtn = false;
          this.showError(jdata['errorMsg']);
          return;
        }

        if (jdata && jdata.results) {
          this.listBlockedPageData=jdata.results;
          let data = jdata.results;
          let length = data.length;
          let i: number;
          let name: string, ud: any, defaultStr: any, d: any, ld: any;
          let updateButton = '';
          let html: any = '';
          let containersSelectedArr = [];

          let tr: HTMLElement;
          let td: HTMLElement;
          let btn: any;

          for (i = 0; i < length; i++) {
            if (!data[i]) {
              continue;
            }

            this.templateData[data[i].id] = data[i];

            d = new Date(data[i].created);
            ld = d.toLocaleString();
            name = data[i].name;
            if (name) {
              name = name.replace(/['"]+/g, '');
            }

            if (name == null) {
              name = '';
            }


            if (data[i].updated) {
              d = new Date(data[i].updated);
              ud = d.toLocaleString();
            } else {
              ud = '-';
            }

            if (data[i].default) {
              defaultStr = 'Yes';
            } else {
              defaultStr = 'No';
            }

            tr = document.createElement('tr');
            tr.setAttribute('id', data[i].id + '_row');
            td = document.createElement('td');
            td.innerText = `${name}`;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerText = `${ld}`;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerText = `${ud}`;
            tr.appendChild(td);


            td = document.createElement('td');
            btn = document.createElement('span') as HTMLElement;
            btn.setAttribute('id', data[i].id);
            btn.addEventListener('click', (e: any) => {
              this.gotoView(e.target.id);
            }, false);
            btn.style.cursor = 'pointer';
            btn.classList.add('view-btn');
            btn.classList.add('btn');
            btn.classList.add('btn-sm');
            btn.classList.add('btn-success');
            btn.classList.add('margin-left-10');
            btn.innerText = this.language['View'];

            td.appendChild(btn);
            tr.appendChild(td);

            btn = document.createElement('span') as HTMLElement;
            btn.setAttribute('id', data[i].id + '_update');
            btn.addEventListener('click', (e: any) => {
              let arr = e.target.id.split('_');
              this.gotoUpdate(arr[0]);
            }, false);
            btn.style.cursor = 'pointer';
            btn.classList.add('update-btn');
            btn.classList.add('btn');
            btn.classList.add('btn-sm');
            btn.classList.add('btn-warning');
            btn.style.marginLeft = '3px';
            btn.innerText = this.language['Update'];

            if (this.showUpdateBtn) {
              td.appendChild(btn);
              tr.appendChild(td);
            }

            btn = document.createElement('span') as HTMLElement;
            btn.setAttribute('id', data[i].id + '_' + data[i].name);
            btn.style.cursor = 'pointer';
            btn.classList.add('delete-btn');
            btn.classList.add('btn');
            btn.classList.add('btn-sm');
            btn.classList.add('btn-danger');
            btn.classList.add('margin-left-10');
            btn.style.marginLeft = '3px';
            btn.innerText = this.language['delete'];

            btn.addEventListener('click', (e: any) => {
              let arr = e.target.id.split('_');
              this.loadDeleteModal(arr[0], arr[1]);
            }, false);

            if (this.showDeleteBtn) {
              td.appendChild(btn);
              tr.appendChild(td);
            }


            if (data[i].default) {
              btn = document.createElement('span') as HTMLElement;
              //btn.setAttribute('id', 'default-template');
              btn.style.cursor = 'pointer';
              btn.classList.add('default-btn');
              btn.classList.add('btn');
              btn.classList.add('btn-sm');
              btn.classList.add('btn-light');
              btn.style.marginLeft = '3px';
              btn.innerText = this.language['Default Template'];

              td.appendChild(btn);
              tr.appendChild(td);

            } else {

              btn = document.createElement('span') as HTMLElement;
              btn.style.cursor = 'pointer';
              btn.setAttribute('id', data[i].id + '_' + data[i].name + '_default');
              btn.classList.add('set-default-btn');
              btn.classList.add('btn');
              btn.classList.add('btn-sm');
              btn.classList.add('btn-primary');
              btn.style.marginLeft = '3px';
              btn.innerText = this.language['Set Default'];

              if (this.showAddBtn) {
                btn.addEventListener('click', (e: any) => {
                  let arr = e.target.id.split('_');
                  this.loadDefaultModal(arr[0], arr[1]);
                }, false);
                td.appendChild(btn);
                tr.appendChild(td);

              }
            }




            document.getElementById('block-page-list').appendChild(tr);
          }

          localStorage.setItem("templateData", JSON.stringify(this.templateData));

        }

        if (jdata && jdata.results && !jdata.results.length) {
          if (jdata && jdata['start'] == 0) {
            this.showNoDataAvail = true;
          }
        }

        this.showLoadMoreBtn = jdata['showLoadMoreBtn'];
        this.loader = false;
      },
      (err: any) => {
        this.loader = false;

      }
    );
  }

  ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
    this.service.undoService();
    this.languageSubject.unsubscribe();
    if (this.getOrgInfoSubs) this.getOrgInfoSubs.unsubscribe();

    $(window).off("scroll", this.pageScroll);

  }

  windowScrollEvent(): void {
    this.pageScroll = () => {
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 320) {
        this.loadRecords();
      }
    }
    $(window).scroll(this.pageScroll);
  }

}

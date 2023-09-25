import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef, TemplateRef, OnDestroy } from '@angular/core';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';


import { RouterService } from '../../../app-services/routing.services';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockPageService } from "../service/block-page.service";
import { AcessModifiers, CheckScopes, SsoAuthService } from "../../shared/services/sso-auth.service";
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OrganizationApiService } from 'src/app/sys-admin/services/organization-api.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService as common } from 'src/app/shared/services/common-functions.service';

declare var require: any;
const $: any = require('jquery');

@Component({
  selector: 'app-block-page-template-create',
  templateUrl: './block-page-template-create.component.html',
  styleUrls: ['./block-page-template-create.component.scss'],
})
export class BlockPageTemplateCreateComponent implements OnInit {

  @ViewChild('errorModal', { static: true }) private errorModal: TemplateRef<any>;
  @ViewChild('successModal', { static: true }) private successModal: TemplateRef<any>;

  modalRef: any;
  id: any;
  editMode = false;
  title = 'Add';
  name: any = '';
  public errorMsg: string;
  public successMsg: string;
  public showError: boolean = false;

  public color: string = '#e920e9';
  public bodyFontColor: string = '#FFDDDD';
  loader: boolean = false;
  showCreateBtn = false;
  macAddressData: any[];
  language: any;
  languageSubject;
  isShad = true;
  ADMIN_MODULE: string;
  ADMIN_ORG_ID: string;
  SPID: string;
  getOrgInfoSubs: any;
  //REDIRECT_URL: string = 'organization-admin/foundation';
  //REDIRECT_URL: string = 'cco-foundation/foundation-configuration/configuration-settings';
  REDIRECT_URL: string = '/organization-admin';

//variables for ngtest
  orgIdResponse:any;
  addResponse:any;


  constructor(
    public vcRef: ViewContainerRef,
    private cpService: ColorPickerService,
    private routerService: RouterService,
    private route: ActivatedRoute,
    private service: BlockPageService,
    private dialogService: NgbModal,
    private sso: SsoAuthService,
    private translateService: TranslateService,
    private commonOrgService: CommonService,
    private router: Router,
    private organizationApiService: OrganizationApiService,
    private titleService: Title,
    private common:common,
  ) {
    this.commonOrgService.currentPageAdder('block_page');
    let url = this.router.url;
    if (url.indexOf('/shad/') === -1) {
      this.isShad = false;
      this.ADMIN_ORG_ID = this.sso.getOrganizationID(url);
      this.REDIRECT_URL = this.sso.getRedirectModule(url);
      this.SPID = this.sso.getAdminSPID(this.ADMIN_ORG_ID);
      if (!this.SPID) this.getAdminOrgInfo();
    } else {
      this.SPID = this.sso.getSPID();
    }
    if (url.indexOf('/foundation-configuration/') > -1) {
      this.REDIRECT_URL = 'cco-foundation/foundation-configuration/configuration-settings';
    }

  }

  public onEventLog(event: string, data: any): void {
  }

  public onChangeColor(color: string): void {
  }

  public onChangeColorCmyk(color: string): Cmyk {
    const hsva = this.cpService.stringToHsva(color);

    if (hsva) {
      const rgba = this.cpService.hsvaToRgba(hsva);

      return this.cpService.rgbaToCmyk(rgba);
    }

    return new Cmyk(0, 0, 0, 0);
  }

  public onChangeColorHex8(color: string): string {
    const hsva = this.cpService.stringToHsva(color, true);

    if (hsva) {
      return this.cpService.outputFormat(hsva, 'rgba', null);
    }

    return '';
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
        this.showCreateBtn = true;
      }
    } else {

      //foundation scope check
      if (this.sso.checkAdminScopes(AcessModifiers.WRITE)) {
        this.showCreateBtn = true;
      }

    }


    //this.macAddressData = this.dataService.macAddressData;
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id != undefined) {
      this.title = 'Update';
      this.editMode = true;
    }

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Add Block Template']} - ${this.REDIRECT_URL === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Add Block Template']} - ${this.REDIRECT_URL === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
    if (this.getOrgInfoSubs) this.getOrgInfoSubs.unsubscribe();
  }

  getAdminOrgInfo() {
    this.getOrgInfoSubs = this.organizationApiService.orgInformation(this.ADMIN_ORG_ID).subscribe((res: any) => {
      this.orgIdResponse=res;
      this.sso.setAdminOrgInfo(res);
      if (res && res.spId) {
        this.SPID = res.spId;
      }

    }, (err: HttpErrorResponse) => {
    })
  }

  preview() {
    this.routerService.blockPageView()
  }

  goToBlockPageList() {
    //this.routerService.blockPageList();
    if (this.isShad) {
      this.router.navigate([`/shad/block_page_template_list`]);
    } else {
      this.router.navigate([`/${this.REDIRECT_URL}/block_page_template_list`]);
    }
  }

  getbodyFontColor(): void {
  }

  public addError(str: string): void {
    this.showError = true;
     this.errorMsg = str;
    //this.loadErrorModal();
  }

  hideError() {
    this.showError = false;
    this.errorMsg = '';
  }

  readURL(input: any, key: any) {
    let res: any;
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        res = e.target['result'];
        localStorage.setItem(key, res);
      };

      reader.readAsDataURL(input.files[0]);
    }

  }

  add() {
    // let logoImage: any,
    let backgroundImage: any;
    const backgroundInput = document.getElementById('body_bg_image') as HTMLInputElement;
    const fileInput = document.getElementById('logo') as HTMLInputElement;
    var params = {};

    if (this.loader) {
      return;
    }

    params['name'] = this.name;
    params['header_bg'] = this.color;
    params['bodyFontColor'] = this.bodyFontColor;

    if (!params['name']) {
      this.addError(this.language['Please enter the name']);
      return;
    }

    if (!params['header_bg']) {
      this.addError(this.language['Please enter the Logo Back Ground Color']);
      return;
    }

    if (fileInput) {
      let selectedFIle = fileInput.files?.[0];
      if (!selectedFIle) {
        this.addError(this.language['Please upload Header Logo image']);
        return;
      }
    }

    if (backgroundInput) {
      let selectedbackground = backgroundInput.files?.[0];
      if (!selectedbackground) {
        this.addError(this.language['Please upload Back Ground Image']);
        return;
      }
    }

    params['name'] = params['name'].replace(/['"]+/g, '');


    var form_Data = new FormData();

    var files = $("input[name='logo']").get(0).files;

    if (files.length) {
      var file_ext = files[0].name.split('.').pop();

      var allowed_extns = ["jpeg", "JPEG", "PNG", "jpg", "png", "JPG", "img", "IMG", "bin", "BIN"];
      if (allowed_extns.indexOf(file_ext) == -1) {

        var allowed_extns_str = allowed_extns.join(", ");
        this.addError(this.language['Image_extension_will_be'] + allowed_extns_str + this.language['file_format']);
        return;
      }


      $.each(files, function (i, file) {
        form_Data.append("logoImage", file);
      });
    }
    //  else {
    //   // this.addError(this.language['Please upload Header Logo image']);
    //   // return;
    // }

    if (!params['bodyFontColor']) {
      this.addError(this.language['Please enter the Body Font Color']);
      return;
    }


    backgroundImage = $("input[name='body_bg_image']").get(0).files;

    if (backgroundImage.length) {
      var file_ext = backgroundImage[0].name.split('.').pop();

      var allowed_extns = ["jpeg", "JPEG", "PNG", "jpg", "png", "JPG", "img", "IMG", "bin", "BIN"];
      if (allowed_extns.indexOf(file_ext) == -1) {

        var allowed_extns_str = allowed_extns.join(", ");
        this.addError(this.language['Image_extension_will_be'] + allowed_extns_str + this.language['file_format']);
        return;
      }


      $.each(backgroundImage, function (i, file) {
        form_Data.append("backgroundImage", file);
      });
    } 
    // else {
    //   // this.addError(this.language['Please upload Back Ground Image']);
    //   // return;
    // }

    form_Data.append("name", params['name']);

    let logoIndex = params['header_bg'].indexOf('#');
    let bodyFontIndex = params['bodyFontColor'].indexOf('#');

    if (logoIndex === 0) {
      params['header_bg'] = params['header_bg'].replace('#', '');
    }

    if (bodyFontIndex === 0) {
      params['bodyFontColor'] = params['bodyFontColor'].replace('#', '');
    }


    form_Data.append("logoBgColor", params['header_bg']);
    form_Data.append("bodyFontColor", params['bodyFontColor']);
    form_Data.append("spid", this.SPID);

  //  this.hideError();
    this.loader = true;

    this.service.add(form_Data).subscribe((jdata: any) => {
      this.addResponse=jdata
      this.loader = false;
      this.modalRef = this.dialogService.open(this.successModal);
      this.successMsg = this.language['Block page added successfully'];
      setTimeout(() => {
        this.close();
        this.goToBlockPageList();
      }, 1000);

    }, (err: any) => {
      this.loader = false;
      this.addError(err.statusText);
    });


  }

  viewPreview() {
    let params = {};

    let logoImage: any, backgroundImage: any;

    params['name'] = this.name;
    params['logoBgColor'] = this.color;
    params['bodyFontColor'] = this.bodyFontColor;


    if (!params['logoBgColor']) {
      this.addError(this.language['Please enter the Logo Back Ground Color']);
      return;
    }

    var files = $("input[name='logo']").get(0).files;

    if (files.length) {
      var file_ext = files[0].name.split('.').pop();

      var allowed_extns = ["jpeg", "JPEG", "PNG", "jpg", "png", "JPG", "img", "IMG", "bin", "BIN"];
      if (allowed_extns.indexOf(file_ext) == -1) {

        var allowed_extns_str = allowed_extns.join(", ");
        this.addError(this.language['Image_extension_will_be'] + allowed_extns_str + this.language['file_format']);
        return;
      }

    } else {
      this.addError(this.language['Please upload Header Logo image']);
      return;
    }

    if (!params['bodyFontColor']) {
      this.addError(this.language['Please enter the Body Font Color']);
      return;
    }


    backgroundImage = $("input[name='body_bg_image']").get(0).files;

    if (backgroundImage.length) {
      var file_ext = backgroundImage[0].name.split('.').pop();

      var allowed_extns = ["jpeg", "JPEG", "PNG", "jpg", "png", "JPG", "img", "IMG", "bin", "BIN"];
      if (allowed_extns.indexOf(file_ext) == -1) {

        var allowed_extns_str = allowed_extns.join(", ");
        this.addError(this.language['Image_extension_will_be'] + allowed_extns_str + this.language['file_format']);
        return;
      }
    } else {
      this.addError(this.language['Please upload Back Ground Image']);
      return;
    }

    params["logoImage"] = localStorage.getItem("logo");
    params["bodyBgImage"] = localStorage.getItem("body_bg_image");

    localStorage.setItem('params', JSON.stringify(params));

    this.preview();
  }

  loadErrorModal(): any {
    this.modalRef = this.dialogService.open(this.errorModal);
  }

  close() {
    this.modalRef.close();
  }
  removeUnwantedSpace(input,value){
    this[input] = this.common.trimSpaceFromNonObjectInputs(value)
  }

}


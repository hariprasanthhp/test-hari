import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef, TemplateRef, OnDestroy } from '@angular/core';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { RouterService } from '../../../app-services/routing.services';
import { ActivatedRoute } from '@angular/router';
import { BlockPageService } from "../service/block-page.service";

import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OrganizationApiService } from 'src/app/sys-admin/services/organization-api.service';
import { Title } from '@angular/platform-browser';

declare var require: any;
const $: any = require('jquery');

@Component({
  selector: 'app-block-page-template-update',
  templateUrl: './block-page-template-update.component.html',
  styleUrls: ['./block-page-template-update.component.scss']
})
export class BlockPageTemplateUpdateComponent implements OnInit {
  // @ViewChild('errorModal', { static: true }) private errorModal: TemplateRef<any>;
  @ViewChild('successModal', { static: true }) private successModal: TemplateRef<any>;

  modalRef: any;
  timestamp: number;
  id: any;
  updateTemplateId: any;
  updateData: any;
  title = 'Update';
  name: any = '';
  public errorMsg: string;
  public successMsg: string;
  public showError: boolean = false;

  public color: string = '#e920e9';
  public bodyFontColor: string = '#FFDDDD';
  loader: boolean = false;
  showLogoImage: boolean = false;
  showBGImage: boolean = false;
  logoImageUrl: any = '';
  bGImageUrl: any = '';
  language: any;
  languageSubject;

  macAddressData: any[];
  isShad = true;
  ADMIN_MODULE: string;
  ADMIN_ORG_ID: string;
  SPID: any;
  getOrgInfoSubs: any;
  //REDIRECT_URL: string = 'cco-foundation/foundation-configuration/configuration-settings';
  REDIRECT_URL: string = '/organization-admin';
  //varibles for ngtest
  orgIdResponse: any;
  updateResponse:any;

  constructor(
    public vcRef: ViewContainerRef,
    private cpService: ColorPickerService,
    private routerService: RouterService,
    private route: ActivatedRoute,
    private service: BlockPageService,
    private dialogService: NgbModal,
    private router: Router,
    private translateService: TranslateService,
    private commonOrgService: CommonService,
    private sso: SsoAuthService,
    private organizationApiService: OrganizationApiService,
    private titleService: Title,

  ) {
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
    this.timestamp = new Date().getTime();

  }

  hideBGImage(): void {
    this.showBGImage = false;
  }

  hideLogoImage(): void {
    this.showLogoImage = false;
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
    this.id = this.route.snapshot.paramMap.get("id");
    if (!this.SPID && !this.isShad) {
      this.getOrgInfoSubs = this.organizationApiService.orgInformation(this.ADMIN_ORG_ID).subscribe((res: any) => {
        this.orgIdResponse=res;
        this.sso.setAdminOrgInfo(res);
        if (res && res.spId) {
          this.SPID = res.spId;
          this.getListById(this.id);
        }

      }, (err: HttpErrorResponse) => {
      })
    } else {
      this.getListById(this.id);
    }
    //this.getListById(this.id);


    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Update Block Template']} - ${this.REDIRECT_URL === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Update Block Template']} - ${this.REDIRECT_URL === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
  }

  ngOnDestroy() {
    if (this.languageSubject) this.languageSubject.unsubscribe();
    if (this.getOrgInfoSubs) this.getOrgInfoSubs.unsubscribe();
  }


  preview() {
    this.routerService.blockPageView()
  }

  goToBlockPageList() {
    if (this.isShad) {
      this.router.navigate([`/shad/block_page_template_list`]);
    } else {
      this.router.navigate([`/${this.REDIRECT_URL}/block_page_template_list`]);
    }
    //this.routerService.blockPageList();
  }

  getbodyFontColor(): void {
  }

  public addError(str: string): void {
    this.errorMsg = str;
    this.showError = true;
    // this.loadErrorModal();
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

  update() {
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
        this.addError(this.language["Please upload Header Logo image"]);
        return;
      }
    }
    if (backgroundInput) {
      let selectedbackground = backgroundInput.files?.[0];
      
      if (!selectedbackground) {
        this.addError(this.language["Please upload Back Ground Image"]);
        return;
      }
    }


    params['name'] = params['name'].replace(/['"]+/g, '');


    var form_Data = new FormData();

    var files = $("input[name='logo']").length ? $("input[name='logo']").get(0).files : '';

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
    } else {
      // this.addError("Please upload Header Logo image");
      // return;
    }

    if (!params['bodyFontColor']) {
      this.addError(this.language['Please enter the Body Font Color']);
      return;
    }


    backgroundImage = $("input[name='body_bg_image']").length ? $("input[name='body_bg_image']").get(0).files : '';

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
    } else {
      // this.addError("Please upload Back Ground Image");
      // return;
    }

    form_Data.append("spid", this.SPID);
    form_Data.append("id", this.updateTemplateId);
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

    this.loader = true;
    this.service.update(form_Data).subscribe((jdata: any) => {
      this.updateResponse=jdata
      this.loader = false;
      this.modalRef = this.dialogService.open(this.successModal);
      this.successMsg = this.language['Block page updated successfully'];
      setTimeout(() => {
        this.close();
        this.goToBlockPageList();
      }, 1000);
    }, (err: any) => {
      this.loader = false;
    });


  }

  viewPreview() {
    let params = {};

    // let logoImage: any, 
    let backgroundImage: any;

    params['name'] = this.name;
    params['logoBgColor'] = this.color;
    params['bodyFontColor'] = this.bodyFontColor;


    if (!params['logoBgColor']) {
      this.addError(this.language['Please enter the Logo Back Ground Color']);
      return;
    }

    var files = $("input[name='logo']").length ? $("input[name='logo']").get(0).files : '';

    if (files.length) {
      var file_ext = files[0].name.split('.').pop();

      var allowed_extns = ["jpeg", "JPEG", "PNG", "jpg", "png", "JPG", "img", "IMG", "bin", "BIN"];
      if (allowed_extns.indexOf(file_ext) == -1) {

        var allowed_extns_str = allowed_extns.join(", ");
        this.addError(this.language['Image_extension_will_be'] + allowed_extns_str + this.language['file_format']);
        return;
      }

    } else {
      // this.addError("Please upload Header Logo image");
      // return;
    }

    if (!params['bodyFontColor']) {
      this.addError(this.language['Please enter the Body Font Color']);
      return;
    }


    backgroundImage = $("input[name='body_bg_image']").length ? $("input[name='body_bg_image']").get(0).files : '';

    if (backgroundImage.length) {
      var file_ext = backgroundImage[0].name.split('.').pop();

      var allowed_extns = ["jpeg", "JPEG", "PNG", "jpg", "png", "JPG", "img", "IMG", "bin", "BIN"];
      if (allowed_extns.indexOf(file_ext) == -1) {

        var allowed_extns_str = allowed_extns.join(", ");
        this.addError(this.language['Image_extension_will_be'] + allowed_extns_str + this.language['file_format']);
        return;
      }
    } else {
      // this.addError("Please upload Back Ground Image");
      // return;
    }

    if (files.length) {
      params["logoImage"] = localStorage.getItem("logo");
    } else {
      params["logoImage"] = this.updateData?.logoImage;
    }

    if (backgroundImage.length) {
      params["bodyBgImage"] = localStorage.getItem("body_bg_image");
    } else {
      params["bodyBgImage"] = this.updateData?.bodyBgImage;
    }

    // params["logoImage"] = localStorage.getItem("logo");
    // params["bodyBgImage"] = localStorage.getItem("body_bg_image");

    localStorage.setItem('params', JSON.stringify(params));
    this.preview();
  }

  // loadErrorModal(): any {
  //   this.modalRef = this.dialogService.open(this.errorModal);
  // }

  close() {
    this.modalRef.close();
  }

  getListById(id: any) {
    this.service.getListByTemplateId(id, this.SPID).subscribe((jdata: any) => {
      if (jdata && jdata.results) {
        let data = jdata.results;

        var tdata = data[0];
        if (!tdata) {
          this.addError(this.language['No template found for template id'] + id);
        }

        this.updateTemplateId = id;
        this.updateData = tdata;

        this.name = tdata.name;
        if (tdata['logoBgColor'].indexOf('#') == -1) {
          this.color = '#' + tdata.logoBgColor;
        } else {
          this.color = tdata.logoBgColor;
        }

        if (tdata['bodyFontColor'].indexOf('#') == -1) {
          this.bodyFontColor = '#' + tdata.bodyFontColor;
        } else {
          this.bodyFontColor = tdata.bodyFontColor;
        }

        if (tdata.logoImage) {
          this.logoImageUrl = tdata.logoImage;
          this.showLogoImage = true;
        } else {
          this.showLogoImage = false;
        }

        if (tdata.bodyBgImage) {
          this.bGImageUrl = tdata.bodyBgImage;
          this.showBGImage = true;
        } else {
          this.showBGImage = false;
        }


      } else {
        this.addError(this.language['No template found for template id'] + id);
      }
    });
  }

  view(): void {
    if (!this.updateData) {
      this.addError(this.language['No template found for template id'] + this.updateTemplateId);
      return;
    }
    let params = {};
    if (this.updateData.logoBgColor.indexOf('#') == -1) {
      this.updateData.logoBgColor = "#" + this.updateData.logoBgColor;
    }

    if (this.updateData.bodyFontColor.indexOf('#') == -1) {
      this.updateData.bodyFontColor = "#" + this.updateData.bodyFontColor;
    }

    params["header_bg"] = this.updateData.logoBgColor;
    params["bodyFontColor"] = this.updateData.bodyFontColor;

    params["logo"] = this.updateData.logoImage;
    params["body_bg_image"] = this.updateData.bodyBgImage;

    localStorage.setItem('original_params', JSON.stringify(params));

    this.router.navigate([]).then(result => { window.open("/block_page_template_view?id=" + this.updateTemplateId, '_blank') });

  }

}

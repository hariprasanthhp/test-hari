import { Component, OnInit, ViewChild, ElementRef, TemplateRef, OnDestroy } from '@angular/core';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { BlockPageService } from "../service/block-page.service";
import { WhitelabelService } from 'src/app/shad/service/whitelabel.service';
import { SsoAuthService } from "src/app/shared/services/sso-auth.service";

import { RouterService } from 'src/app-services/routing.services';
import { TranslateService } from 'src/app-services/translate.service';
declare var require: any;
const $: any = require('jquery');
import { Router } from '@angular/router';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OrganizationApiService } from 'src/app/sys-admin/services/organization-api.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-commandiq-create',
  templateUrl: './commandiq-create.component.html',
  styleUrls: ['./commandiq-create.component.scss'],
  providers: [ColorPickerService]
})
export class CommandiqCreateComponent implements OnInit {
  @ViewChild('errorModal', { static: true }) private errorModal: TemplateRef<any>;
  @ViewChild('successModal', { static: true }) private successModal: TemplateRef<any>;

  loader: boolean = false;
  showCreateBtn = false;
  public appName: any = '';

  privacyPolicyLinkEnglish: any = '';
  privacyPolicyLinkFrench: any = '';
  public isActive: boolean = false;
  spid: any = '';
  modalRef: any;
  language;
  languageSubject;

  public primaryColor = '#0279ff';
  secondaryColor = '#FFDDDD';
  showSuccess = false;
  isShad = true;
  ADMIN_MODULE: string;
  ADMIN_ORG_ID: string;
  SPID: any;
  getOrgInfoSubs: any;
  logovisiblity: boolean = false;
  whitelogovisiblity: boolean = false;
  //REDIRECT_URL: string = 'cco-foundation/foundation-configuration/configuration-settings';
  REDIRECT_URL: string = '/organization-admin';

  selectOptions = [
    { label: 'True', value: true },
    { label: 'False', value: false }
  ];

  public errorMsg: string;
  public successMsg: string;
  public showError: boolean = false;
  public customAppName = {
    eiqLabel: '',
    piqLabel: ''
  }


  constructor(
    //private cpService: ColorPickerService,
    private service: WhitelabelService,
    private sso: SsoAuthService,
    private routerService: RouterService,
    private translateService: TranslateService,
    private router: Router,
    private commonOrgService: CommonService,
    private organizationApiService: OrganizationApiService,
    private titleService: Title,
  ) {
    this.commonOrgService.currentPageAdder('commandiq-create');
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
    this.titleService.setTitle(`CommandIQ - Mobile App - ${this.REDIRECT_URL === 'systemAdministration' ? 'System Administration' : 'Administration'} - Calix Cloud`);
  }



  ngOnInit(): void {
    this.spid = this.sso.getSPID();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })
  }

  readURL(input: any, key: any) {
    this.hideError();
    let res: any;
    if (key && key === 'white_logo') {
      $('#whitelogo_image').attr('src', ' ');
    } else {
      $('#logo_image').attr('src', ' ');
    }

    if (input.files && input.files[0]) {
      let reader = new FileReader();


      // $('#logo')[0].src = (window.URL ? URL : webkitURL).createObjectURL(input.files[0]);
      reader.onload = (e) => {
        if (key === "logo") {


          $('#logo_image').attr('src', e.target.result);
          this.logovisiblity = true
        }
        else {

          $('#whitelogo_image').attr('src', e.target.result);
          this.whitelogovisiblity = true
        }



        res = e.target['result'];
        localStorage.setItem(key, res);
      };

      reader.readAsDataURL(input.files[0]);
    }

  }

  readWhiteLogoURL(input: any, key: any) {
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
    //debugger
    //    let logoImage: any, backgroundImage: any;
    let appIcon: any, logo: any, eulaAndroidEnglish: any, eulaAndroidFrench: any, eulaIOSEnglish: any, eulaIOSFrench: any, aboutEnglish: any, aboutFrench: any;
    var params = {};

    if (this.loader) {
      return;
    }
    var saveFile = this.sso.getSPID()
    params['spid'] = this.SPID;
    //params['appName'] = this.appName;
    params['appName'] = this.appName;
    params['sellerName'] = this.appName;
    params['privacyPolicyLinkEnglish'] = this.privacyPolicyLinkEnglish;
    params['privacyPolicyLinkFrench'] = this.privacyPolicyLinkFrench;
    params['isActive'] = this.isActive;

    params['primaryColor'] = this.primaryColor;
    //params['secondaryColor'] = this.secondaryColor;

    /* if (!params['appName']) {
      this.addError(this.language['enter_the_App_Name']);
      return;
    } */
    if (!params['appName']) {
      this.addError(this.language['enter_the_Seller_Name']);
      return;
    }
    if (!params['primaryColor']) {
      this.addError(this.language['enter_the_Primary_Color']);
      return;
    }
    if (this.customAppName.eiqLabel && this.customAppName.piqLabel && this.customAppName.eiqLabel.toLowerCase() === this.customAppName.piqLabel.toLowerCase()) {
      this.addError(this.language['piq_eiq_similar_name_err']);
      return;
    }
    // if (!params['secondaryColor']) {
    //   this.addError("Please enter the Secondary Color");
    //   return;
    // }
    //  params['name'] = params['name'].replace(/['"]+/g, '');


    var form_Data = new FormData();

    // var files = $("input[name='logo']").get(0).files;

    // if (files.length) {
    //   var file_ext = files[0].name.split('.').pop();

    //   var allowed_extns = ["jpeg", "JPEG", "PNG", "jpg", "png", "JPG", "img", "IMG", "bin", "BIN"];
    //   if (allowed_extns.indexOf(file_ext) == -1) {

    //     var allowed_extns_str = allowed_extns.join(", ");
    //     this.addError("Image extension will be an " + allowed_extns_str + " file format");
    //     return;
    //   }


    //   $.each(files, function (i, file) {
    //     form_Data.append("logoImage", file);
    //   });
    // } else {
    //   this.addError("Please upload Header Logo image");
    //   return;
    // }
    //uncoment
    logo = $("input[name='logo']").get(0).files;

    if (logo.length) {
      var file_ext = logo[0].name.split('.').pop();
      var logoimg = logo[0].size;
      var logoimgsize = logoimg / 1024;


      var allowed_extns = ["jpeg", "JPEG", "PNG", "jpg", "png", "JPG", "img", "IMG", "bin", "BIN"];
      if (allowed_extns.indexOf(file_ext) == -1) {

        var allowed_extns_str = allowed_extns.join(", ");
        this.addError(this.language['Image_extension_will_be'] + allowed_extns_str + this.language['file_format']);
        return;
      }
      if (logoimgsize > 250) {
        this.addError(this.language['Primary_Logo_Upload_Size_Error'] + " 250KB");
        return;
      }

      $.each(logo, function (i, file) {
        form_Data.append("logo", file);
      });
    } else {
      this.addError(this.language['Please upload Primary Logo image']);
      return;
    }




    //uncoment
    // eulaAndroidEnglish = $("input[name='eulaAndroidEnglish']").get(0).files;

    // if (eulaAndroidEnglish.length) {
    //   var file_ext = eulaAndroidEnglish[0].name.split('.').pop();

    //   var allowed_extns = ["pdf", "doc", "docx", "DOCX", "DOC", "PDF"];
    //   if (allowed_extns.indexOf(file_ext) == -1) {

    //     var allowed_extns_str = allowed_extns.join(", ");
    //     this.addError(this.language['EULA Android English extension will be an '] + allowed_extns_str + this.language['file_format']);
    //     return;
    //   }


    //   $.each(eulaAndroidEnglish, function (i, file) {
    //     form_Data.append("eulaAndroidEnglish", file);
    //   });
    // } else {
    //   this.addError(this.language['Please upload EULA Android English']);
    //   return;
    // }

    //
    //uncoment
    // eulaAndroidFrench = $("input[name='eulaAndroidFrench']").get(0).files;

    // if (eulaAndroidFrench.length) {
    //   var file_ext = eulaAndroidFrench[0].name.split('.').pop();

    //   var allowed_extns = ["pdf", "doc", "docx", "DOCX", "DOC", "PDF"];
    //   if (allowed_extns.indexOf(file_ext) == -1) {

    //     var allowed_extns_str = allowed_extns.join(", ");
    //     this.addError(this.language['EULA Android French extension will be an '] + allowed_extns_str + this.language['file_format']);
    //     return;
    //   }


    //   $.each(eulaAndroidFrench, function (i, file) {
    //     form_Data.append("eulaAndroidFrench", file);
    //   });
    // } else {
    //   this.addError(this.language['Please upload EULA Android French']);
    //   return;
    // }
    //
    // eulaIOSEnglish = $("input[name='eulaIOSEnglish']").get(0).files;

    // if (eulaIOSEnglish.length) {
    //   var file_ext = eulaIOSEnglish[0].name.split('.').pop();

    //   var allowed_extns = ["pdf", "doc", "docx", "DOCX", "DOC", "PDF"];
    //   if (allowed_extns.indexOf(file_ext) == -1) {

    //     var allowed_extns_str = allowed_extns.join(", ");
    //     this.addError(this.language['EULA IOS English extension will be an '] + allowed_extns_str + this.language['file_format']);
    //     return;
    //   }


    //   $.each(eulaIOSEnglish, function (i, file) {
    //     form_Data.append("eulaIOSEnglish", file);
    //   });
    // } else {
    //   this.addError(this.language['Please upload EULA IOS English']);
    //   return;
    // }
    //
    // eulaIOSFrench = $("input[name='eulaIOSFrench']").get(0).files;

    // if (eulaIOSFrench.length) {
    //   var file_ext = eulaIOSFrench[0].name.split('.').pop();

    //   var allowed_extns = ["pdf", "doc", "docx", "DOCX", "DOC", "PDF"];
    //   if (allowed_extns.indexOf(file_ext) == -1) {

    //     var allowed_extns_str = allowed_extns.join(", ");
    //     this.addError(this.language['EULA IOS French extension will be an '] + allowed_extns_str + this.language['file_format']);
    //     return;
    //   }


    //   $.each(eulaIOSFrench, function (i, file) {
    //     form_Data.append("eulaIOSFrench", file);
    //   });
    // } else {
    //   this.addError(this.language['Please upload EULA IOS French']);
    //   return;
    // }
    //
    // aboutEnglish = $("input[name='aboutEnglish']").get(0).files;

    // if (aboutEnglish.length) {
    //   var file_ext = aboutEnglish[0].name.split('.').pop();

    //   var allowed_extns = ["pdf", "doc", "docx", "DOCX", "DOC", "PDF"];
    //   if (allowed_extns.indexOf(file_ext) == -1) {

    //     var allowed_extns_str = allowed_extns.join(", ");
    //     this.addError(this.language['About English extension will be an '] + allowed_extns_str + this.language['file_format']);
    //     return;
    //   }


    //   $.each(aboutEnglish, function (i, file) {
    //     form_Data.append("aboutEnglish", file);
    //   });
    // } else {
    //   this.addError(this.language['Please upload EULA About English']);
    //   return;
    // }
    //
    // aboutFrench = $("input[name='aboutFrench']").get(0).files;

    // if (aboutFrench.length) {
    //   var file_ext = aboutFrench[0].name.split('.').pop();

    //   var allowed_extns = ["pdf", "doc", "docx", "DOCX", "DOC", "PDF"];
    //   if (allowed_extns.indexOf(file_ext) == -1) {

    //     var allowed_extns_str = allowed_extns.join(", ");
    //     this.addError(this.language['EULA About French extension will be an '] + allowed_extns_str + this.language['file_format']);
    //     return;
    //   }


    //   $.each(aboutFrench, function (i, file) {
    //     form_Data.append("aboutFrench", file);
    //   });
    // } else {
    //   this.addError(this.language['Please upload EULA About French']);
    //   return;
    // }
    // if (!params['bodyFontColor']) {
    //   this.addError("Please enter the Body Font Color");
    //   return;
    // }


    // backgroundImage = $("input[name='body_bg_image']").get(0).files;

    // if (backgroundImage.length) {
    //   var file_ext = backgroundImage[0].name.split('.').pop();

    //   var allowed_extns = ["jpeg", "JPEG", "PNG", "jpg", "png", "JPG", "img", "IMG", "bin", "BIN"];
    //   if (allowed_extns.indexOf(file_ext) == -1) {

    //     var allowed_extns_str = allowed_extns.join(", ");
    //     this.addError("Image extension will be an " + allowed_extns_str + " file format");
    //     return;
    //   }

    //   $.each(backgroundImage, function (i, file) {
    //     form_Data.append("backgroundImage", file);
    //   });
    // } else {
    //   this.addError("Please upload Back Ground Image");
    //   return;
    // }


    //White Logo - 05-27-2021
    appIcon = $("input[name='white_logo']").get(0).files;

    if (appIcon.length) {

      var whitelogoimg = appIcon[0].size;
      var whitelogoimgsize = whitelogoimg / 1024;

      var file_ext = appIcon[0].name.split('.').pop();

      var allowed_extns = ["png", "PNG"];
      if (allowed_extns.indexOf(file_ext) == -1) {

        var allowed_extns_str = allowed_extns.join(", ");
        this.addError(this.language['Image extension will be an '] + allowed_extns_str + this.language['file_format']);
        return;
      }
      if (whitelogoimgsize > 250) {
        this.addError(this.language['WhitelogoImage_uploaderror'] + " 250KB");
        return;
      }

      $.each(appIcon, function (i, file) {
        form_Data.append("appIcon", file);
      });
    } else {
      this.addError(this.language["Please upload White Logo image"]);
      return;
    }
    // if (!params['privacyPolicyLinkEnglish']) {
    //   this.addError(this.language['Please enter the Privacy Policy Link English']);
    //   return;
    // }
    // if (!params['privacyPolicyLinkFrench']) {
    //   this.addError(this.language['Please enter the Privacy Policy Link French']);
    //   return;
    // }
    // form_Data.append("name", params['name']);
    //  form_Data.append("logoBgColor", params['header_bg']);
    // form_Data.append("bodyFontColor", params['bodyFontColor']);

    form_Data.append("spid", params['spid']);
    // form_Data.append("appName", 'calix');
    form_Data.append("primaryColor", params['primaryColor']);
    form_Data.append("secondaryColor", params['primaryColor']);
    form_Data.append("appName", params['appName']);
    form_Data.append("sellerName", params['appName']);
    // form_Data.append("privacyPolicyLinkEnglish", params['privacyPolicyLinkEnglish']);
    // form_Data.append("privacyPolicyLinkFrench", params['privacyPolicyLinkFrench']);
    form_Data.append("isActive", params['isActive']);

    this.hideError();
    this.loader = true;

    this.service.add(form_Data).subscribe((jdata: any) => {

      //
      this.loader = false;

      // if (this.customAppName.eiqLabel || this.customAppName.piqLabel) {
        this.updateCustomName();
      // } else {
        // this.goToWhiteLabelList();
      // } ;

      // this.modalRef = this.dialogService.open(this.successModal);
      // this.successMsg = 'White label added successfully';
      // setTimeout(() => {
      //   this.close();
      //   this.goToWhiteLabelList();
      // }, 1000);

    }, (err: any) => {
      this.loader = false;
      //this.addError(err.statusText);
      this.pageErrorHandle(err, true)
    });
  }

  cancel() {
    //this._location.back();
    if (this.isShad) {
      this.router.navigate([`/shad/commandiq`]);
    } else {
      this.router.navigate([`/${this.REDIRECT_URL}/mobile-app/commandiq`]);
    }
  }
  public addError(str: string): void {
    this.errorMsg = str;
    this.showError = true;
    //this.loadErrorModal();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }


  hideError() {
    this.showError = false;
    this.errorMsg = '';
  }
  close() {
    this.modalRef.close();
  }
  goToWhiteLabelList() {
    this.routerService.WhiteLabelList(true);
    if (this.isShad) {
      this.router.navigate([`/shad/commandiq`]);
    } else {
      this.router.navigate([`/${this.REDIRECT_URL}/mobile-app/commandiq`]);
    }
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.getOrgInfoSubs) this.getOrgInfoSubs.unsubscribe();
  }

  getAdminOrgInfo() {
    this.getOrgInfoSubs = this.organizationApiService.orgInformation(this.ADMIN_ORG_ID).subscribe((res: any) => {
      this.sso.setAdminOrgInfo(res);
      if (res && res.spId) {
        this.SPID = res.spId;
      }

    }, (err: HttpErrorResponse) => {
    })
  }

  pageErrorHandle(err: HttpErrorResponse, isAdd?: any) {
    let errorInfo = '';
    if (err.status == 400 && !isAdd) {
      this.errorMsg = this.commonOrgService.pageInvalidRqstErrorHandle(err);
      this.showError = true;
      $("html, body").animate({ scrollTop: 0 }, "slow");
    } else {
      if (err.status == 401) {
        this.errorMsg = this.language['Access Denied'];
      } else {
        this.errorMsg = this.commonOrgService.pageErrorHandle(err);
      }
      this.showError = true;
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }

  }
  clearInput(val:any){
    if(val == 'App Name'){
      this.appName = '';
    }
    if(val == 'Primary Color'){
      this.primaryColor = '#0279ff';
    }
    if(val == 'Preferred ProtectIQ Name'){
      this.customAppName.piqLabel = '';
    }
    if(val == 'Preferred ExperienceIQ Name'){
      this.customAppName.eiqLabel = '';
    }
  }
  
  updateCustomName() {
    this.loader = true;
    let params = {
      spid: this.SPID,
      customNames: []
    };
    // if (this.customAppName.eiqLabel) {
      params.customNames.push({
          appName: "CIES",
          customAppName: this.customAppName.piqLabel
        })
    // }

    // if (this.customAppName.piqLabel) {
      params.customNames.push({
          appName: "CIEP",
          customAppName: this.customAppName.eiqLabel
        })
    // }

    this.hideError();

    this.service.updateAppCustomName(params).subscribe((jdata: any) => {
      this.loader = false;
      this.goToWhiteLabelList();
    }, (err: any) => {
      this.loader = false;
      this.pageErrorHandle(err, true)
    });
  }
}

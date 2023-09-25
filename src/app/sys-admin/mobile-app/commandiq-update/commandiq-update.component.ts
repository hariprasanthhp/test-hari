import { Component, OnInit, ViewChild, ElementRef, TemplateRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { BlockPageService } from "../service/block-page.service";
import { WhitelabelService } from '../../../shad/service/whitelabel.service';
import { SsoAuthService } from "../../../shared/services/sso-auth.service";

import { RouterService } from '../../../../app-services/routing.services';
import { TranslateService } from 'src/app-services/translate.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { OrganizationApiService } from 'src/app/sys-admin/services/organization-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
declare var require: any;
const $: any = require('jquery');
import { catchError, map } from 'rxjs/operators';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';

@Component({
  selector: 'app-commandiq-update',
  templateUrl: './commandiq-update.component.html',
  styleUrls: ['./commandiq-update.component.scss']
})
export class CommandiqUpdateComponent implements OnInit {
  @ViewChild('errorModal', { static: true }) private errorModal: TemplateRef<any>;
  @ViewChild('successModal', { static: true }) private successModal: TemplateRef<any>;

  modalRef: any;
  ISappIcon: boolean;
  newWhitelabel: boolean;
  ISlogo: boolean;
  ISengandfile: boolean;
  ISAndroidFrench: boolean;
  ISIOSEnglish: boolean;
  ISIOSFrench: boolean;
  ISEnglish: boolean;
  ISFrench: boolean;
  calixspid: any;
  fileName: any = '';
  iconFile: any;
  logoFile: any;
  eulaAE: any;
  eulaAF: any;
  eulaIOSE: any;
  aboutE: any;
  aboutF: any;
  eulaIOSF: any;
  language;
  languageSubject;
  // primaryColor = '#e920e9';
  // secondaryColor = '#FFDDDD';

  isShad = true;
  ADMIN_MODULE: string;
  ADMIN_ORG_ID: string;
  SPID: any;
  getOrgInfoSubs: any;
  dataAvailable: boolean;
  timestamp: number;
  //REDIRECT_URL: string = 'cco-foundation/foundation-configuration/configuration-settings';
  REDIRECT_URL: string = '/organization-admin';

  selectOptions = [
    { label: 'True', value: true },
    { label: 'False', value: false }
  ];

  
  public errorMsg: string;
  public successMsg: string;
  public showError: boolean = false;
  loader: boolean = false;
  showCreateBtn = false;
  public appName: any = '';

  privacyPolicyLinkEnglish: any = '';
  privacyPolicyLinkFrench: any = '';
  public isActive: boolean = false;
  spid: any = '';
  //
  updateappIcon: any = '';
  updatelogo: any = '';
  eulaAndroidEnglish: any;
  engandfile: any
  AndroidFrench: any;
  IOSEnglish: any;
  IOSFrench: any;
  English: any;
  French: any;
  public primaryColor: any;
  secondaryColor: any;

  updateWhiteLogo: any = '';
  whiteLogoFile: any;
  combineLatest: Observable<unknown[]>;
  public customAppName = {
    eiqLabel: '',
    piqLabel: ''
  }
  parallelReqSubscribtion: any;
  updateCustomAppSub: any;

  constructor(
    private cpService: ColorPickerService,
    private service: WhitelabelService,
    private dialogService: NgbModal,
    private sso: SsoAuthService,
    private routerService: RouterService,
    private ref: ChangeDetectorRef,
    private translateService: TranslateService,
    private router: Router,
    private commonOrgService: CommonService,
    private organizationApiService: OrganizationApiService,
    private titleService: Title,
    private CommonFunctionsService:CommonFunctionsService,
  ) {
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
    
    this.commonOrgService.currentPageAdder('commandiq-update');
    this.titleService.setTitle(`CommandIQ - Mobile App - ${this.REDIRECT_URL === 'systemAdministration' ? 'System Administration' : 'Administration'} - Calix Cloud`);
  }


  ngOnInit(): void {
    if (!this.SPID && !this.isShad) {
      this.getOrgInfoSubs = this.organizationApiService.orgInformation(this.ADMIN_ORG_ID).subscribe((res: any) => {
        this.sso.setAdminOrgInfo(res);
        if (res && res.spId) {
          this.SPID = res.spId;
          this.getWhitelabel();
          this.getDetails()
          this.calixspid = this.SPID;
        }

      }, (err: HttpErrorResponse) => {
      })
    } else {
      this.getWhitelabel();
      this.getDetails()
      this.calixspid = this.SPID;
    }
    // this.getWhitelabel();
    // this.getDetails()
    // this.calixspid = this.SPID;

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })
  }
  validateError() {
    this.showError = false;
  }

  getWhitelabel() {
    var saveFile = this.sso.getSPID()
    this.service.spinfo(this.SPID).toPromise().then((response: any) => {

    }).catch((err: any) => {
    });
  }
  getDetails() {
    var saveFile = this.sso.getSPID()
    this.service.whiteLabellist(this.SPID).toPromise().then((res: any) => {
      this.timestamp = new Date().getTime();

      this.spid = res.body.spid;
      //this.appName = res.body.appName;
      this.updateappIcon = res.body.appIcon;
      if (this.updateappIcon) {
        this.ISappIcon = true;
      } else {
        this.ISappIcon = false;
      }
      this.updatelogo = res.body.theme.logo;
      if (this.updatelogo) {
        this.ISlogo = true;
      } else {
        this.ISlogo = false;
      }
      this.updateWhiteLogo = res.body.appIcon;

      this.dataAvailable = true;
      this.appName = res.body.appName;
      this.privacyPolicyLinkEnglish = res.body.privacyPolicyLinkEnglish;
      this.privacyPolicyLinkFrench = res.body.privacyPolicyLinkFrench;
      this.isActive = res.body.isActive;

      // this.eulaAndroidEnglish = res.body.eulaAndroidEnglish;
      this.engandfile = res.body.eulaAndroidEnglish;
      if (this.engandfile) {
        this.ISengandfile = true;
      } else {
        this.ISengandfile = false;
      }
      this.AndroidFrench = res.body.eulaAndroidFrench;
      if (this.AndroidFrench) {
        this.ISAndroidFrench = true;
      } else {
        this.ISAndroidFrench = false;
      }
      this.IOSEnglish = res.body.eulaIOSEnglish
      if (this.IOSEnglish) {
        this.ISIOSEnglish = true;
      } else {
        this.ISIOSEnglish = false;
      }
      this.IOSFrench = res.body.eulaIOSFrench
      if (this.IOSFrench) {
        this.ISIOSFrench = true;
      } else {
        this.ISIOSFrench = false;
      }
      this.English = res.body.aboutEnglish;
      if (this.English) {
        this.ISEnglish = true;
      } else {
        this.ISEnglish = false;
      }
      this.French = res.body.aboutFrench;
      if (this.French) {
        this.ISFrench = true;
      } else {
        this.ISFrench = false;
      }
      if (res.body.theme.primaryColor) {
        this.primaryColor = res.body.theme.primaryColor;
      }
      // if (res.body.theme.secondaryColor) {
      //   this.secondaryColor = res.body.theme.secondaryColor;
      // }
      this.getEIQandPIQName();

    }).catch((err: any) => {
      this.dataAvailable = true;
    });
  }

  readURL(input: any, key: any) {
    this.hideError();
    let res: any;
    if (key && key === 'white_logo') {
      this.whiteLogoFile = '';
      $('#white-logo-image-view').attr('src', ' ');
    } else {
      this.logoFile = '';
      $('#logo-image-view').attr('src', ' ');
    }

    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        if (key === "logo") {


          $('#logo-image-view').attr('src', e.target.result);

        }
        else {

          $('#white-logo-image-view').attr('src', e.target.result);

        }

        res = e.target['result'];
        localStorage.setItem(key, res);
      };

      reader.readAsDataURL(input.files[0]);
      var fileName = input.files[0].name;
      if (key == 'appIcon') {
        this.iconFile = fileName;
        this.updateappIcon = ''
      } else if (key == 'logo') {
        this.logoFile = fileName;
        this.updatelogo = '';
      } else if (key == 'eulaAndroidEnglish') {
        this.eulaAE = fileName;
        this.engandfile = ''
      } else if (key == 'eulaAndroidFrench') {
        this.eulaAF = fileName;
        this.AndroidFrench = ''
      } else if (key == 'eulaIOSEnglish') {
        this.eulaIOSE = fileName;
        this.IOSEnglish = ''
      } else if (key == 'eulaIOSFrench') {
        this.eulaIOSF = fileName;
        this.IOSFrench = ''
      } else if (key == 'aboutEnglish') {
        this.aboutE = fileName;
        this.English = ''
      } else if (key == 'aboutFrench') {
        this.aboutF = fileName;
        this.French = ''
      } else if (key == 'white_logo') {
        this.whiteLogoFile = fileName;
        this.updateWhiteLogo = '';
      }
    }
  }
  add() {
    //    let logoImage: any, backgroundImage: any;
    let appIcon: any, logo: any, eulaAndroidEnglish: any, eulaAndroidFrench: any, eulaIOSEnglish: any, eulaIOSFrench: any, aboutEnglish: any, aboutFrench: any, primaryColor: any, secondaryColor: any;
    var params = {};

    if (this.loader) {
      return;
    }
    params['spid'] = this.SPID
    //params['appName'] = this.appName;
    params['appName'] = this.appName;
    params['sellerName'] = this.appName;
    params['privacyPolicyLinkEnglish'] = this.privacyPolicyLinkEnglish;
    params['privacyPolicyLinkFrench'] = this.privacyPolicyLinkFrench;
    params['isActive'] = this.isActive;

    params['primaryColor'] = this.primaryColor;
    //params['secondaryColor'] = this.secondaryColor;

    /* if (!params['appName']) {
      this.addError("Please enter the App name");
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
    //   this.addError("Please enter the  secondary Color");
    //   return;
    // }
    //  params['name'] = params['name'].replace(/['"]+/g, '');


    var form_Data = new FormData();

    //comment app icon
    // if (this.updateappIcon != '') {
    //   form_Data.append("appIcon", this.updateappIcon);
    // } else {
    //   appIcon = $("input[name='appIcon']").get(0).files;

    //   if (appIcon.length) {
    //     var file_ext = appIcon[0].name.split('.').pop();

    //     var allowed_extns = ["jpeg", "JPEG", "PNG", "jpg", "png", "JPG", "img", "IMG", "bin", "BIN"];
    //     if (allowed_extns.indexOf(file_ext) == -1) {

    //       var allowed_extns_str = allowed_extns.join(", ");
    //       this.addError("App Icon extension will be an " + allowed_extns_str + " file format");
    //       return;
    //     }

    //     $.each(appIcon, function (i, file) {
    //       form_Data.append("appIcon", file);
    //     });
    //   } else {
    //     this.addError("Please upload App Icon");
    //     return;
    //   }
    // }
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
    if (this.updatelogo != '') {
      form_Data.append("logo", this.updatelogo);
    } else {
      logo = $("input[name='logo']").get(0).files;

      if (logo.length) {
        var file_ext = logo[0].name.split('.').pop();

        var logoimg = logo[0].size;
        var logoimgsize = logoimg / 1024;

        var allowed_extns = ["jpeg", "JPEG", "PNG", "jpg", "png", "JPG", "img", "IMG", "bin", "BIN"];

        if (allowed_extns.indexOf(file_ext) == -1) {

          var allowed_extns_str = allowed_extns.join(", ");
          this.addError("Logo Image extension will be an " + allowed_extns_str + " file format");
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
    }

    //Update white logo - 27-05-2021
    let white_logo: any;

    if (this.updateWhiteLogo != '') {
      form_Data.append("appIcon", this.updateWhiteLogo);
    } else {
      white_logo = $("input[name='white_logo']").get(0).files;

      if (white_logo.length) {
        var whitelogoimg = white_logo[0].size;
        var whitelogoimgsize = whitelogoimg / 1024;

        let file_ext = white_logo[0].name.split('.').pop();

        let allowed_extns = ["png", "PNG"];
        if (allowed_extns.indexOf(file_ext) == -1) {

          let allowed_extns_str = allowed_extns.join(", ");
          this.addError("White Logo Image extension will be an " + allowed_extns_str + " file format");
          return;
        }
        if (whitelogoimgsize > 250) {
          this.addError(this.language['WhitelogoImage_uploaderror'] + " 250KB");
          return;
        }


        $.each(white_logo, function (i, file) {
          form_Data.append("appIcon", file);
        });
      } else {
        this.addError(this.language['Please upload White Logo image']);
        return;
      }
    }

    //comment eula android english
    // if (this.engandfile != '') {
    //   form_Data.append("eulaAndroidEnglish", this.engandfile);
    // } else {
    //   eulaAndroidEnglish = $("input[name='eulaAndroidEnglish']").get(0).files;

    //   if (eulaAndroidEnglish.length) {
    //     var file_ext = eulaAndroidEnglish[0].name.split('.').pop();

    //     var allowed_extns = ["pdf", "doc", "docx", "DOCX", "DOC", "PDF"];
    //     if (allowed_extns.indexOf(file_ext) == -1) {

    //       var allowed_extns_str = allowed_extns.join(", ");
    //       this.addError("English for android extension will be an " + allowed_extns_str + " file format");
    //       return;
    //     }


    //     $.each(eulaAndroidEnglish, function (i, file) {
    //       form_Data.append("eulaAndroidEnglish", file);
    //     });
    //   } else {
    //     this.addError("Please upload EULA Android English");
    //     return;
    //   }
    // }
    //
    // comment eula android french 
    // if (this.AndroidFrench != '') {
    //   form_Data.append("eulaAndroidFrench", this.AndroidFrench);
    // } else {
    //   eulaAndroidFrench = $("input[name='eulaAndroidFrench']").get(0).files;

    //   if (eulaAndroidFrench.length) {
    //     var file_ext = eulaAndroidFrench[0].name.split('.').pop();

    //     var allowed_extns = ["pdf", "doc", "docx", "DOCX", "DOC", "PDF"];
    //     if (allowed_extns.indexOf(file_ext) == -1) {

    //       var allowed_extns_str = allowed_extns.join(", ");
    //       this.addError("EULA Android French extension will be an " + allowed_extns_str + " file format");
    //       return;
    //     }


    //     $.each(eulaAndroidFrench, function (i, file) {
    //       form_Data.append("eulaAndroidFrench", file);
    //     });
    //   } else {
    //     this.addError("Please upload EULA Android French");
    //     return;
    //   }
    // }
    // comment eula ios english
    // if (this.IOSEnglish != '') {
    //   form_Data.append("eulaIOSEnglish", this.IOSEnglish);
    // } else {
    //   eulaIOSEnglish = $("input[name='eulaIOSEnglish']").get(0).files;

    //   if (eulaIOSEnglish.length) {
    //     var file_ext = eulaIOSEnglish[0].name.split('.').pop();

    //     var allowed_extns = ["pdf", "doc", "docx", "DOCX", "DOC", "PDF"];
    //     if (allowed_extns.indexOf(file_ext) == -1) {

    //       var allowed_extns_str = allowed_extns.join(", ");
    //       this.addError("EULA IOS English extension will be an " + allowed_extns_str + " file format");
    //       return;
    //     }


    //     $.each(eulaIOSEnglish, function (i, file) {
    //       form_Data.append("eulaIOSEnglish", file);
    //     });
    //   } else {
    //     this.addError("Please upload EULA IOS English");
    //     return;
    //   }
    // }
    // comment eula ios french
    // if (this.IOSFrench != '') {
    //   form_Data.append("eulaIOSFrench", this.IOSFrench);
    // } else {
    //   eulaIOSFrench = $("input[name='eulaIOSFrench']").get(0).files;

    //   if (eulaIOSFrench.length) {
    //     var file_ext = eulaIOSFrench[0].name.split('.').pop();

    //     var allowed_extns = ["pdf", "doc", "docx", "DOCX", "DOC", "PDF"];
    //     if (allowed_extns.indexOf(file_ext) == -1) {

    //       var allowed_extns_str = allowed_extns.join(", ");
    //       this.addError("EULA IOSFrench extension will be an " + allowed_extns_str + " file format");
    //       return;
    //     }


    //     $.each(eulaIOSFrench, function (i, file) {
    //       form_Data.append("eulaIOSFrench", file);
    //     });
    //   } else {
    //     this.addError("Please upload EULA IOS French");
    //     return;
    //   }
    // }
    // comment about english
    // if (this.English != '') {
    //   form_Data.append("aboutEnglish", this.English);
    // } else {
    //   aboutEnglish = $("input[name='aboutEnglish']").get(0).files;

    //   if (aboutEnglish.length) {
    //     var file_ext = aboutEnglish[0].name.split('.').pop();

    //     var allowed_extns = ["pdf", "doc", "docx", "DOCX", "DOC", "PDF"];
    //     if (allowed_extns.indexOf(file_ext) == -1) {

    //       var allowed_extns_str = allowed_extns.join(", ");
    //       this.addError("EULA About English extension will be an " + allowed_extns_str + " file format");
    //       return;
    //     }


    //     $.each(aboutEnglish, function (i, file) {
    //       form_Data.append("aboutEnglish", file);
    //     });
    //   } else {
    //     this.addError("Please upload EULA About English");
    //     return;
    //   }
    // }
    // comment about french
    // if (this.French != '') {
    //   form_Data.append("aboutFrench", this.French);
    // } else {
    //   aboutFrench = $("input[name='aboutFrench']").get(0).files;

    //   if (aboutFrench.length) {
    //     var file_ext = aboutFrench[0].name.split('.').pop();

    //     var allowed_extns = ["pdf", "doc", "docx", "DOCX", "DOC", "PDF"];
    //     if (allowed_extns.indexOf(file_ext) == -1) {

    //       var allowed_extns_str = allowed_extns.join(", ");
    //       this.addError("EULA About French extension will be an " + allowed_extns_str + " file format");
    //       return;
    //     }


    //     $.each(aboutFrench, function (i, file) {
    //       form_Data.append("aboutFrench", file);
    //     });
    //   } else {
    //     this.addError("Please upload EULA About French");
    //     return;
    //   }
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


    // comment about privacy english and french
    // if (!params['privacyPolicyLinkEnglish']) {
    //   if (!params['privacyPolicyLinkFrench'] && !params['privacyPolicyLinkEnglish']) {
    //     this.addError("Please enter the Privacy Policy Link English and the Privacy Policy Link French");
    //     return;
    //   }
    //   this.addError("Please enter the Privacy Policy Link English");
    //   return;
    // }
    // if (!params['privacyPolicyLinkFrench']) {
    //   this.addError("Please enter the Privacy Policy Link French");
    //   return;
    // }



    // form_Data.append("name", params['name']);
    //  form_Data.append("logoBgColor", params['header_bg']);
    // form_Data.append("bodyFontColor", params['bodyFontColor']);

    form_Data.append("spid", this.SPID);
    // form_Data.append("appName", 'calix');
    form_Data.append("primaryColor", params['primaryColor']);
    //form_Data.append("secondaryColor", params['secondaryColor']);
    form_Data.append("appName", params['appName']);
    form_Data.append("sellerName", params['appName']);
    // form_Data.append("privacyPolicyLinkEnglish", params['privacyPolicyLinkEnglish']);
    // form_Data.append("privacyPolicyLinkFrench", params['privacyPolicyLinkFrench']);
    form_Data.append("isActive", params['isActive']);

    this.hideError();
    this.loader = true;
    this.service.update(form_Data).subscribe((jdata: any) => {

      //
      this.loader = false;
      // if (this.customAppName.eiqLabel || this.customAppName.piqLabel) {
        this.updateCustomName();
      // } else {
      //   this.goToWhiteLabelList();
      // }
      // this.modalRef = this.dialogService.open(this.successModal);
      // this.successMsg = 'White label added successfully';
      // setTimeout(() => {
      //   this.close();
      //   this.goToWhiteLabelList();
      // }, 1000);

    }, (err: any) => {
      this.loader = false;
      this.addError(err.statusText);
    });


  }

  public addError(str: string): void {
    this.errorMsg = str;
    this.showError = true;
    $("html, body").animate({ scrollTop: 0 }, "slow");
    this.ref.detectChanges();
    //this.loadErrorModal();
  }

  hideError() {
    this.showError = false;
    this.errorMsg = '';
  }
  close() {
    this.modalRef.close();
  }
  goToWhiteLabelList() {
    this.routerService.WhiteLabelList();

    if (this.isShad) {
      this.router.navigate([`/shad/whitelabel`]);
    } else {
      this.router.navigate([`/${this.REDIRECT_URL}/mobile-app/commandiq`]);
    }
  }
  hideAppicon(): void {
    // this.ISappIcon = false;
  }
  hidelogo() {
    // this.ISlogo = false;
  }
  hideAndroidFrench() {
    this.ISAndroidFrench = false;
  }
  hideengandfile() {
    this.ISengandfile = false;
  }
  hideIOSEnglish() {
    this.ISIOSEnglish = false;
  }
  hideIOSFrench() {
    this.ISIOSFrench = false;
  }
  hideEnglish() {
    this.ISEnglish = false;
  }
  hideFrench() {
    this.ISFrench = false;
  }
  cancel() {
    if (this.isShad) {
      this.router.navigate([`/shad/whitelabel`]);
    } else {
      this.router.navigate([`/${this.REDIRECT_URL}/mobile-app/commandiq`]);
    }
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.getOrgInfoSubs) this.getOrgInfoSubs.unsubscribe();
    if (this.parallelReqSubscribtion) this.parallelReqSubscribtion.unsubscribe();
    if (this.updateCustomAppSub) this.updateCustomAppSub.unsubscribe();


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
      this.customAppName.eiqLabel = ''
    }
  }

  updateCustomName() {
    this.loader = true;
    let params = {
      spid: this.SPID,
      customNames: []
    };
      params.customNames.push({
          appName: "CIES",
          customAppName: this.customAppName.piqLabel
        })
      params.customNames.push({
        appName: "CIEP",
        customAppName: this.customAppName.eiqLabel
        })
    this.hideError();
    this.updateCustomAppSub = this.service.updateAppCustomName(params).subscribe((jdata: any) => {
      this.loader = false;
      this.goToWhiteLabelList();
    }, (err: any) => {
      this.loader = false;
      this.addError(err?.statusText);
    });
  }

  getEIQandPIQName() {
    let requestEndpoints = [];
    requestEndpoints.push(
      (`${environment.apiHost}/admin/application/custom/name?spid=${this.SPID}&appName=CIES`),
      (`${environment.apiHost}/admin/application/custom/name?spid=${this.SPID}&appName=CIEP`)
    )
    const requests = [];
    requestEndpoints.forEach(endpoint => {
      const req = this.service.callRestApi(endpoint).pipe(map((res: any) => {
        return res;
      }),
        catchError((error: any) => {
          return of(error);
        }));
      requests.push(req);
    });
    this.combineLatest = combineLatest(requests);
    this.makeParallelRequest();
  }

  makeParallelRequest() {
    this.parallelReqSubscribtion = this.combineLatest.subscribe((response: any) => {
      if (response[0].length && response[0][0]?.customAppName) {
        this.customAppName.piqLabel = response[0][0]?.customAppName;
      }

      if (response[1].length && response[1][0]?.customAppName) {
        this.customAppName.eiqLabel = response[1][0]?.customAppName;
      }

    }, (err: HttpErrorResponse) => {
      this.loader = false;
      this.addError(err.statusText);
    })
  }
  removeUnwantedSpace(input,value){
    this[input] = this.CommonFunctionsService.trimSpaceFromNonObjectInputs(value)
  }
}

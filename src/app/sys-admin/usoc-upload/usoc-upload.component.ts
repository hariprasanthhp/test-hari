import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MycommunityIqService } from '../services/mycommunity-iq.service';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from '../services/common.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
@Component({
  selector: 'app-usoc-upload',
  templateUrl: './usoc-upload.component.html',
  styleUrls: ['./usoc-upload.component.scss']
})
export class USOCUploadComponent implements OnInit {
  uploadfile: any;
  file: any;
  uploadcsvFile: any;
  errorInfo: any;
  language: any;
  languageSubject: any;
  error: boolean;
  success: boolean;
  loader: boolean;
  successInfo:string;
  err: any;
  hideUpload: boolean;
  MODULE:any;
  constructor(
    private communityService:MycommunityIqService,
    private translateService: TranslateService,
    private commonOrgService: CommonService,
    private titleService: Title,
    private router: Router,
    private sso: SsoAuthService,
  ) {
    let url = this.router.url; 
    this.MODULE = this.sso.getRedirectModule(url);
    this.commonOrgService.currentPageAdder('USOC-Upload');

  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
        this.titleService.setTitle(`${this.language['USOC-Upload']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
      }
    );
    this.titleService.setTitle(`${this.language['USOC-Upload']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
  }
  fullImportUpload() {
    this.loader=true
    let formData = new FormData();

    formData.append("uploadfile", this.file, this.file?.name);
    this.uploadcsvFile= this.communityService.Uploadcsv(formData).subscribe((res: any) => {
      this.loader=false
      this.success=true;
      this.hideUpload= false;
      this.error=false;
      this.successInfo=`${this.uploadfile} has been uploaded successfully`
    }, (err: HttpErrorResponse) => {
      this.loader=false
      this.pageErrorHandle(err);
    })
  }
  GoInstruction(){
    /* CCL-49735 */
    /* window.open('https://community.calix.com/s/article/Updating-Service-Codes-for-Calix-Cloud', "_blank"); */ 
    /* CCL-51628
    window.open('https://community.calix.com/s/article/Success-Best-Practice-Updating-Billing-Service-Codes-USOCs-via-Calix-Cloud', "_blank"); */
    window.open('http://community.calix.com/s/article/Updating-Service-Codes-for-Calix-Cloud', "_blank");
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    }else if (err.status == 504) {
      this.errorInfo = "Gateway Timeout";
    }else if (err.status == 503) {
      this.errorInfo = "Service Temporarily Unavailable";
    } /* else if(typeof err.error == 'string') {
      // this.err = JSON.parse(err.error);
      // this.errorInfo = this.err.errorMessage
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    } */ else{
      this.errorInfo =this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
    this.success=false
    this.commonOrgService.pageScrollTop();
  }
  closeAlert(){
    this.error=false;
    this.success=false
  }
  readURL(e){
     this.file = e.target.files[0];
    this.uploadfile = this.file?.name;
    this.hideUpload= true;
    e.target.value = "";
  }
}

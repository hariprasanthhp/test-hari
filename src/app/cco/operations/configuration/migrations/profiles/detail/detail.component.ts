import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { ProfileService } from 'src/app/cco/operations/cco-subscriber-operations/cco-subscriber-profile/profile.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  loader: boolean;
  getProfileData: any;
  smpId: any;
  detail: any;
  errorInfo: any;
  error: boolean;
  language: any;
  languageSubject: any;
  deviceType: any;
  uploadCIR: string;
  downloadCIR: string;
  uploadCIRData: string;
  downloadCIRData: string;
    
    constructor(private service:ProfileService, private route: ActivatedRoute, private commonOrgService: CommonService, private translateService: TranslateService, private titleService: Title, private router: Router,) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Profiles']} - Migrations - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Profiles']} - Migrations - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    this.route.queryParams.subscribe(params => {
      if (params['smpId']) {
        this.smpId = params['smpId'];
        this.deviceType=params['type']
        this.getEditData()
      }
    })
    //this.getEditData()
  }
  getEditData(){
    this.loader=true
    this.getProfileData = this.service.GetProfile(this.smpId,this.deviceType).subscribe((res: any) => {
     this.detail = res? res:{};
    //  if(this.detail?.videoProfile?.X_CALIX_SXACC_BW_PROFILE){
    //   this.uploadCIR=this.detail?.videoProfile?.X_CALIX_SXACC_BW_PROFILE?.uploadCIR?`${this.detail?.videoProfile?.X_CALIX_SXACC_BW_PROFILE?.uploadCIR/1024}k`:''
    //   this.downloadCIR=this.detail?.videoProfile?.X_CALIX_SXACC_BW_PROFILE?.downloadCIR?`${this.detail?.videoProfile?.X_CALIX_SXACC_BW_PROFILE?.downloadCIR/1024}k`:''
    //  }
    //  if(this.detail?.dataProfile?.X_CALIX_SXACC_BW_PROFILE){
    //   this.uploadCIRData=this.detail?.dataProfile?.X_CALIX_SXACC_BW_PROFILE?.uploadCIR?`${this.detail?.dataProfile?.X_CALIX_SXACC_BW_PROFILE?.uploadCIR/1024}k`:''
    //     this.downloadCIRData=this.detail?.dataProfile?.X_CALIX_SXACC_BW_PROFILE?.downloadCIR?`${this.detail?.dataProfile?.X_CALIX_SXACC_BW_PROFILE?.downloadCIR/1024}k`:''
    //  }
  
      
      this.loader=false
    }, (err: HttpErrorResponse) => {
      this.loader=false
      this.pageErrorHandle(err);
    })
  }
  
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.error = true;
    this.loader = false;
  }
  closeDetail(){
    this.router.navigate(["/cco/operations/configuration/migrations/profiles/list"])
  }
}

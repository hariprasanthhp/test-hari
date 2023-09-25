import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { OutlierWorkflowService } from 'src/app/cco/outliers-workflow/outlier-workflow.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/cco/operations/cco-subscriber-operations/cco-subscriber-profile/profile.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import _ from 'lodash';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  loader = false;
  disableFinishBtn = false;
  selectedTabIndex: number = 0;
  isTabChange: boolean = true;
  disableNextBtn: boolean = false;
  error = false;
  activeTab: string = 'Start';
  errorInfo = '';
  language: any;
  languageSubject: any;
  FormData: any = {
    start: {
    },
    profile: {},
  }
  addProfileTab: Array<string> = ['Start', 'Build Profile'];
  success: boolean;
  successInfo: any;
  startdata: any;
  profileobj: any;
  ORG_ID: any;
  getProfileData: any;
  smpId: any;
  nameError: boolean;
  editData: boolean;
  finishError: boolean;
  deviceType: any;
  constructor(private translateService: TranslateService,
    private titleService: Title,
    private route: ActivatedRoute,
    private commonOrgService: CommonService,
    private http: HttpClient,
    private router: Router,
    private sso: SsoAuthService,
    private service: ProfileService
  ) {
    this.ORG_ID = this.sso.getOrgId();
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Profiles']} - Migrations - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Profiles']} - Migrations - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    this.onTabChange(0);
    this.route.queryParams.subscribe(params => {
      if (params['smpId']) {
        this.smpId = params['smpId'];
        this.deviceType = 'RG'
        this.getEditData()
      }
    })

  }
  closeAlert() {
    this.error = false;
    this.errorInfo = '';
  }
  nameValidation() {
    var regex = new RegExp("^[a-zA-Z0-9_.-]{1,48}$");
    let result = this.FormData?.start?.name ? this.FormData?.start?.name : this.startdata?.name
    if (regex.test(result)) {
      this.nameError = false
    } else {
      this.nameError = true
    }
  }
  getEditData() {
    this.loader = true
    this.getProfileData = this.service.GetProfile(this.smpId, this.deviceType).subscribe((res: any) => {
      console.log("GetProfile", res)

      this.FormData.profile = this.profileobj = res ? res : {};
      this.editData = true
      this.startdata = {
        name: this.profileobj?.name,
        description: this.profileobj?.description
      }
      this.FormData.start = this.startdata

      this.loader = false
    }, (err: HttpErrorResponse) => {
      this.loader = false
      this.pageErrorHandle(err);
    })
  }

  Onsave() {
    //this.nameValidation()
    if (!this.FormData?.start?.name || !this.FormData?.profile?.serviceType || !this.FormData?.profile?.serviceDefinitionName) {
      return
    }
    // if(this.FormData?.profile?.serviceType==='VOICE' && (!this.FormData?.profile?.voIPProtocol)){
    //   return
    // }
    // if(this.FormData?.profile?.voIPProtocol==='SIP' && (!this.FormData?.profile?.sipProfile || !this.FormData?.profile?.dialPlan)){
    //   return
    // }
    // if(this.FormData?.profile?.voIPProtocol==='H.248' && !this.FormData?.profile?.h248Profile){
    //   return
    // }
    // if(this.FormData?.profile?.serviceType==='VIDEO' && (!this.FormData?.profile?.multicastProfile || !this.FormData?.profile?.igmpProfile)){
    //   return
    // }

    this.loader = true;
    let params = this.FormData?.profile;

    params.name = this.FormData?.start?.name ? this.FormData?.start?.name : this.startdata?.name;
    params.description = this.FormData?.start?.description ? this.FormData?.start?.description : this.startdata?.description;
    params.deviceType = this.FormData?.start?.deviceType ? this.FormData?.start?.deviceType : this.startdata?.deviceType;
    //if(params?.voIPProtocol) delete params?.voIPProtocol
    params = _.pickBy(params, v => v !== null && v !== "");
    if (params.deviceType.includes('RG') && params?.serviceType === 'DATA') {
      if (params.dataProfile.FramingType == 'IPoE' || (params.dataProfile.FramingType == 'PPPoE' && params.dataProfile.ProductFamily == 'EXOS')) {
        params.dataProfile.version = params.dataProfile?.version
      } else {
        delete params.dataProfile?.version
      }
      if(!params.dataProfile.VlanTagAction){
        delete params.dataProfile?.X_000631_VlanMux8021p
      }
      if(params.dataProfile.X_CALIX_SXACC_BW_PROFILE?.downloadCIR){
        params.dataProfile.X_CALIX_SXACC_BW_PROFILE.downloadCIR=params.dataProfile.X_CALIX_SXACC_BW_PROFILE?.downloadCIR.includes('k')?parseInt(params.dataProfile.X_CALIX_SXACC_BW_PROFILE?.downloadCIR)*1024:params.dataProfile.X_CALIX_SXACC_BW_PROFILE?.downloadCIR.includes('m')?parseInt(params.dataProfile.X_CALIX_SXACC_BW_PROFILE?.downloadCIR)*1048576:''}
      if(params.dataProfile.X_CALIX_SXACC_BW_PROFILE?.uploadCIR){
        params.dataProfile.X_CALIX_SXACC_BW_PROFILE.uploadCIR=params.dataProfile.X_CALIX_SXACC_BW_PROFILE?.uploadCIR.includes('k')?parseInt(params.dataProfile.X_CALIX_SXACC_BW_PROFILE?.uploadCIR)*1024:params.dataProfile.X_CALIX_SXACC_BW_PROFILE?.uploadCIR.includes('m')?parseInt(params.dataProfile.X_CALIX_SXACC_BW_PROFILE?.uploadCIR)*1048576:''
      }
      delete params.videoProfile
      delete params.voiceH248Profile
      delete params.voiceMGCPProfile
      delete params.voiceSIPProfile
      delete params.voiceTDMGWProfile
    } else if (params.deviceType.includes('RG') && params?.serviceType === 'VIDEO') {
      if(params.videoProfile.X_CALIX_SXACC_BW_PROFILE?.downloadCIR){
        params.videoProfile.X_CALIX_SXACC_BW_PROFILE.downloadCIR=params.videoProfile.X_CALIX_SXACC_BW_PROFILE?.downloadCIR.includes('k')?parseInt(params.videoProfile.X_CALIX_SXACC_BW_PROFILE?.downloadCIR)*1024:params.videoProfile.X_CALIX_SXACC_BW_PROFILE?.downloadCIR.includes('m')?parseInt(params.videoProfile.X_CALIX_SXACC_BW_PROFILE?.downloadCIR)*1048576:''}
      if(params.videoProfile.X_CALIX_SXACC_BW_PROFILE?.uploadCIR){
        params.videoProfile.X_CALIX_SXACC_BW_PROFILE.uploadCIR=params.videoProfile.X_CALIX_SXACC_BW_PROFILE?.uploadCIR.includes('k')?parseInt(params.videoProfile.X_CALIX_SXACC_BW_PROFILE?.uploadCIR)*1024:params.videoProfile.X_CALIX_SXACC_BW_PROFILE?.uploadCIR.includes('m')?parseInt(params.videoProfile.X_CALIX_SXACC_BW_PROFILE?.uploadCIR)*1048576:''
      }
      if(!params.videoProfile.VlanTagAction){
        delete params.videoProfile?.X_000631_VlanMux8021p
      }
      delete params.dataProfile
      delete params.voiceH248Profile
      delete params.voiceMGCPProfile
      delete params.voiceSIPProfile
      delete params.voiceTDMGWProfile
    } else if (params.deviceType.includes('RG') && params?.serviceType === 'VOICE') {
      delete params.dataProfile
      delete params.videoProfile
      if (params?.voiceServiceType === 'SIP') {
        if(!params.voiceSIPProfile.VlanTagAction){
          delete params.voiceSIPProfile?.X_000631_VlanMux8021p
        }
        delete params.voiceH248Profile
        delete params.voiceMGCPProfile
        delete params.voiceTDMGWProfile
      } else if (params?.voiceServiceType === 'H.248') {
        if(!params.voiceH248Profile.VlanTagAction){
          delete params.voiceH248Profile?.X_000631_VlanMux8021p
        }
        delete params.voiceMGCPProfile
        delete params.voiceSIPProfile
        delete params.voiceTDMGWProfile
      } else if (params?.voiceServiceType === 'MGCP') {
        if(!params.voiceMGCPProfile.VlanTagAction){
          delete params.voiceMGCPProfile?.X_000631_VlanMux8021p
        }
        delete params.voiceH248Profile
        delete params.voiceSIPProfile
        delete params.voiceTDMGWProfile
      }
      else if (params?.voiceServiceType === 'X_000631_TDMGW') {
        if(!params.voiceTDMGWProfile.VlanTagAction){
          delete params.voiceTDMGWProfile?.X_000631_VlanMux8021p
        }
        delete params.voiceH248Profile
        delete params.voiceMGCPProfile
        delete params.voiceSIPProfile
      }
    }
    if (params?.dataProfile?.Mode === 'RG L2 Bridged') {
      delete params.dataProfile.NATEnabled;
      delete params.dataProfile.version;
      delete params.dataProfile.FramingType;
      delete params.dataProfile.defaultConnectionService;
    }
    params = this.removeNull(params)
    if (this.smpId) {
      //if(params?.id) params.smp_id=params?.id
      if (params?.id) delete params?.id
      this.service.UpdateProfile(this.ORG_ID, params, this.smpId, params.deviceType).subscribe((data: any) => {
        this.loader = false;
        this.success = true
        this.successInfo = data?.message ? data.message : 'Service migration profile updated successfully';
        setTimeout(() => {
          this.router.navigate(["/cco-foundation/foundation-configuration/configuration-settings/migrations-rg/profiles/list"])
        }, 3000)
      }, (err: HttpErrorResponse) => {
        this.loader = false
        this.pageErrorHandle(err);
      })
    } else {

      this.service.saveProfile(this.ORG_ID, params, params.deviceType).subscribe((data: any) => {
        this.loader = false;
        this.success = true
        this.successInfo = data?.message ? data.message : data;
        setTimeout(() => {
          this.router.navigate(["/cco-foundation/foundation-configuration/configuration-settings/migrations-rg/profiles/list"])
        }, 3000)
      }, (err: HttpErrorResponse) => {
        this.loader = false
        this.pageErrorHandle(err);
      })
    }

  }
  removeNull = (obj) => {

    Object.keys(obj).forEach(key =>
      (obj[key] && typeof obj[key] === 'object') && this.removeNull(obj[key]) ||
      (obj[key] === '' || obj[key] === null) && delete obj[key]
    );
    return obj;
  };
  OnFormData(key, buildMigForm) {
    this.FormData[key] = buildMigForm.value;
    if (key == 'start') {
      this.startdata = buildMigForm.value
    } else {
      // debugger
      // console.log("profileobj",buildMigForm.value)
      this.profileobj = buildMigForm.value
      this.profileobj.deviceType = this.startdata?.deviceType
      let type = this.profileobj.voiceServiceType

      if (!this.profileobj?.serviceType || !this.profileobj?.serviceDefinitionName || (this.startdata?.deviceType == 'RG' && (!this.profileobj?.cscProfileName
        || ((this.profileobj?.serviceType == 'DATA' && buildMigForm.get('dataProfile')?.invalid)
          || (this.profileobj?.serviceType == 'VIDEO' && (buildMigForm.get('videoProfile')?.invalid))
          || (this.profileobj?.serviceType == 'VOICE' && buildMigForm.get(type === 'SIP' ? 'voiceSIPProfile' : type === 'H.248' ? 'voiceH248Profile' : type === 'MGCP' ? 'voiceMGCPProfile' : type === 'X_000631_TDMGW' ? 'voiceTDMGWProfile' : '')?.invalid))))) {
        this.disableFinishBtn = true
      } else {
        this.disableFinishBtn = false
      }


      // if(!this.profileobj?.serviceType ||!this.profileobj?.serviceDefinitionName || (this.startdata?.deviceType =='RG'
      // &&(!this.profileobj?.cscProfileName || ((this.profileobj?.serviceType == 'DATA' && (!this.profileobj?.dataProfile?.VLANID && this.profileobj?.dataProfile.VlanTagAction))
      //  || (this.profileobj?.serviceType == 'VIDEO' && (!this.profileobj?.videoProfile?.VLANID && this.profileobj?.videoProfile.VlanTagAction)) 
      //  || (this.profileobj?.serviceType == 'VOICE' && (!this.profileobj?.voiceSIPProfile?.VLANID && this.profileobj?.voiceSIPProfile.VlanTagAction)
      //   && (!this.profileobj?.voiceH248Profile?.VLANID && this.profileobj?.voiceH248Profile.VlanTagAction) 
      //   && (!this.profileobj?.voiceMGCPProfile?.VLANID && this.profileobj?.voiceMGCPProfile.VlanTagAction) 
      //   && (!this.profileobj?.voiceTDMGWProfile?.VLANID && this.profileobj?.voiceTDMGWProfile.VlanTagAction)))))){
      //   this.disableFinishBtn=true
      // }else{
      //   this.disableFinishBtn=false
      // }
    }
  }
  onTabChange(index: number, type = null) {

    if ((this.profileobj?.name || this.FormData.start?.name) && (this.profileobj?.deviceType || this.FormData.start?.deviceType)) {
      this.activeTab = this.addProfileTab[index];
      this.selectedTabIndex = index;
    }
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

  setSuccessInfo(msg: any) {
    this.success = true;
    this.successInfo = msg;
    setTimeout(() => {
      this.success = false;
    }, 2000);
  }

}


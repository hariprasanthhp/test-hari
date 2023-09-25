import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { AddSubscriberService } from 'src/app/cco/system/cco-subscriber-system/add-service-system/add-subscriber.service';

@Component({
  selector: 'app-build-profile',
  templateUrl: './build-profile.component.html',
  styleUrls: ['./build-profile.component.scss']
})
export class BuildProfileComponent implements OnInit {
  language: any;
  languageSubject;

  serviceTypes = [
    { id: 'DATA', name: 'Data' },
    { id: 'VOICE', name: 'Voice' },
    { id: 'VIDEO', name: 'Video' },
  ];
  voIPProtocolOnt = [
    { id: 'H.248', name: 'H.248' },
    { id: 'SIP', name: 'SIP' },
  ]
  voIPProtocol = [
    { id: 'H.248', name: 'H.248' },
    { id: 'SIP', name: 'SIP' },
    { id: 'MGCP', name: 'MGCP' },
    { name: 'TDM GW', id: 'X_000631_TDMGW' }
  ]
  pBitList = [
    { id: 0, name: '0' },
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { name: '3', id: 3 },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
    { name: '7', id: 7 }
  ]
  productFamilyList = [
    {value:'GigaCenter',label:'GigaCenter & GigaHub & GigaSpire(GS4227E,GS4220E,GS4227,GS4227W,GS4237)',key:'GigaCenter & GigaHub & GigaSpire(GS4227E,GS4220E,GS4227,GS4227W,GS4237)'},
    {value:'T-Series',label:'T-Series',key:'T-Series'}
  ];
  serviceTypeData: boolean = false;
  serviceTypeVideo: boolean = false;
  serviceTypeVoice: boolean = false;
  voiceH_248: boolean = false
  voice_SIP: boolean = false
  voice_MGCP: boolean = false
  voice_TW: boolean = false
  getServiceDefinition: any;
  serviceDefinitionItems: any[];
  @Input() profiledata;
  @Input() data
  @Output() private isprofilevalue: EventEmitter<any> = new EventEmitter();
  ONTDevice: boolean = false;
  vlanDataValid: boolean = true;
  vlanVideoValid: boolean = true;
  deviceType: any;
  serviceProfileItems: any;
  serviceProfileItemData: any;
  serviceProfileItem: any;
  smpId: any;
  loading:boolean = false;
  // uploadCIR: string;
  // downloadCIR: string;
  constructor(private translateService: TranslateService, private service: AddSubscriberService, private route: ActivatedRoute,) { }
  buildMigForm: FormGroup;
  voiceDefinitionList:any[] =[];
  ngOnInit(): void {
    console.log("data",this.data)
    // if (this.data?.deviceType === 'ONT') {
    //   this.ONTDevice = true
    // }else{
    //   this.ONTDevice = false
    // }
    this.route.queryParams.subscribe(params => {
      if (params['smpId']) {
        this.deviceType = params['type']
        this.smpId = params['smpId'];
      }
    })
    if(!this.smpId ){
      this.getCSCServiceProfileList()
    }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.productFamilyList = this.productFamilyList.map(e=>{
        e.label = data[e.key]
        return e;
      });
    })
    this.buildMigForm = new FormGroup({
      "serviceType": new FormControl(''),
      "tagAction": new FormControl(''),
      "bandwidthProfile": new FormControl(''),
      "multicastProfile": new FormControl(''),
      "serviceDefinitionName": new FormControl(''),
      "h248Profile": new FormControl(''),
      "sipProfile": new FormControl(''),
      "dialPlan": new FormControl(''),
      "igmpProfile": new FormControl(''),
      "overrideVlan": new FormControl(''),
      "voiceServiceType": new FormControl(''),
      "cscProfileName": new FormControl(''),
      "dataProfile": new FormGroup({
        "VLANID": new FormControl('', [Validators.required, Validators.min(1), Validators.max(4093), Validators.maxLength(4)]),
        // "X_CALIX_SXACC_BW_PROFILE": new FormGroup({
        //   "downloadCIR": new FormControl(''),
        //   "uploadCIR": new FormControl('')
        // }),
        "ProductFamily": new FormControl('EXOS'),
        "Mode": new FormControl('RG Routed'),
        "defaultConnectionService": new FormControl(true),
        "FramingType": new FormControl('IPoE'),
        "version": new FormControl('v4'),
        "VlanTagAction": new FormControl(true),
        "NATEnabled": new FormControl(true),
        "X_000631_VlanMux8021p": new FormControl(0)
      }),
      "videoProfile": new FormGroup({
        "VLANID": new FormControl('', [Validators.required, Validators.min(1), Validators.max(4093), Validators.maxLength(4)]),
        // "X_CALIX_SXACC_BW_PROFILE": new FormGroup({
        //   "downloadCIR": new FormControl(''),
        //   "uploadCIR": new FormControl('')
        // }),
        "ProductFamily": new FormControl('EXOS'),
        "Mode": new FormControl('RG Routed'),
        "VlanTagAction": new FormControl(true),
        "QueryInterval": new FormControl('',[Validators.pattern(/^[-+]?[\d]+$/), Validators.min(10), Validators.max(3600)]),
        "MaxStreams": new FormControl(null,[Validators.pattern(/^[-+]?[\d]+$/), Validators.min(0), Validators.max(512)]),
        "X_000631_VlanMux8021p": new FormControl(4),
        "mcastFilterProfile": new FormGroup({
          "RangeNumberOfEntries": new FormControl(''),
          "Name": new FormControl(''),
          "RangeName": new FormControl(''),
          "RangeStart": new FormControl(''),
          "RangeEnd": new FormControl('')
        }),
        "mvrProfile": new FormGroup({
          "DefaultVLAN": new FormControl(''),
          "RangeNumberOfEntries": new FormControl(''),
          "RangeVLAN": new FormControl(''),
          "RangeStart": new FormControl(''),
          "RangeEnd": new FormControl('')
        })
      }),
      "voiceSIPProfile": new FormGroup({
        "VLANID": new FormControl('', [Validators.required, Validators.min(1), Validators.max(4093), Validators.maxLength(4)]),
        "ProductFamily": new FormControl('GigaCenter'),
        "ServiceFramingType": new FormControl('IPoE'),
        "ipType": new FormControl('IPv4'),
        "VlanTagAction": new FormControl(true),
        "X_000631_VlanMux8021p": new FormControl(6),
        "ProxyServer": new FormControl(''),
        "ProxyServerPort": new FormControl('5060'),
        "DNSPrimary": new FormControl(''),
        "DNSSecondary": new FormControl('')
      }),
      "voiceH248Profile": new FormGroup({
        "VLANID": new FormControl('', [Validators.required, Validators.min(1), Validators.max(4093), Validators.maxLength(4)]),
        "ProductFamily": new FormControl('GigaCenter'),
        "ServiceFramingType": new FormControl('IPoE'),
        "ipType": new FormControl('IPv4'),
        "VlanTagAction": new FormControl(true),
        "X_000631_VlanMux8021p": new FormControl(6),
        "RTPBasePort": new FormControl('49152'),
        "PrimaryGWController": new FormControl(''),
        "SecondaryGWController": new FormControl('')
      }),
      "voiceMGCPProfile": new FormGroup({
        "VLANID": new FormControl('', [Validators.required, Validators.min(1), Validators.max(4093), Validators.maxLength(4)]),
        "ProductFamily": new FormControl('GigaCenter'),
        "ServiceFramingType": new FormControl('IPoE'),
        "ipType": new FormControl('IPv4'),
        "VlanTagAction": new FormControl(true),
        "X_000631_VlanMux8021p": new FormControl(6),
        "PrimaryCallMainAgent": new FormControl(''),
        "SecondaryCallMainAgent": new FormControl('')
      }),
      "voiceTDMGWProfile": new FormGroup({
        "VLANID": new FormControl('', [Validators.required, Validators.min(1), Validators.max(4093), Validators.maxLength(4)]),
        "ProductFamily": new FormControl('GigaCenter'),
        "ServiceFramingType": new FormControl('IPoE'),
        "ipType": new FormControl('IPv4'),
        "VlanTagAction": new FormControl(true),
        "X_000631_VlanMux8021p": new FormControl(6),
        "ServerIP": new FormControl('')
      })
    });
    this.Initialise()

  }
  migrationControl(group) {
    return this.buildMigForm.get(group)
  }


  addRemoveValidator(action, group) {
    let field = (this.migrationControl(group).get('VLANID') as FormControl);
      field[action === 'add' ? 'setValidators' : 'clearValidators']([Validators.required, Validators.min(1), Validators.max(4093), Validators.maxLength(4)]);
    field.updateValueAndValidity();
    this.isprofilevalue.emit(this.buildMigForm)
  }

  Initialise() {
    this.buildMigForm.patchValue(this.profiledata);
    if (this.profiledata) {
      if (this.profiledata?.serviceType === 'DATA') {
        this.dataModeSelect();
        this.serviceTypeData = true
        this.serviceTypeVideo = false;
        this.serviceTypeVoice = false;
        this.buildMigForm.value.dataProfile = this.profiledata
        //this.uploadCIR=this.profiledata?.dataProfile?.X_CALIX_SXACC_BW_PROFILE?.uploadCIR?`${this.profiledata?.dataProfile?.X_CALIX_SXACC_BW_PROFILE?.uploadCIR/1024}k`:''
        //this.downloadCIR=this.profiledata?.dataProfile?.X_CALIX_SXACC_BW_PROFILE?.downloadCIR?`${this.profiledata?.dataProfile?.X_CALIX_SXACC_BW_PROFILE?.downloadCIR/1024}k`:''
        this.buildMigForm.patchValue({ serviceType: this.profiledata?.serviceType, serviceDefinitionName: this.profiledata?.serviceDefinitionName, dataProfile: this.profiledata?.dataProfile })
        //this.buildMigForm.patchValue({dataProfile:{X_CALIX_SXACC_BW_PROFILE:{uploadCIR:this.uploadCIR,downloadCIR:this.downloadCIR}}})
        this.addRemoveValidator(this.buildMigForm.value.dataProfile.VlanTagAction ? 'add' : 'clearValidators', 'dataProfile');
      } else if (this.profiledata?.serviceType === 'VIDEO') {
        this.serviceTypeVideo = true;
        this.serviceTypeVoice = false;
        this.serviceTypeData = false
        this.buildMigForm.value.videoProfile = this.profiledata
        //this.uploadCIR=this.profiledata?.videoProfile?.X_CALIX_SXACC_BW_PROFILE?.uploadCIR?`${this.profiledata?.videoProfile?.X_CALIX_SXACC_BW_PROFILE?.uploadCIR/1024}k`:''
        //this.downloadCIR=this.profiledata?.videoProfile?.X_CALIX_SXACC_BW_PROFILE?.downloadCIR?`${this.profiledata?.videoProfile?.X_CALIX_SXACC_BW_PROFILE?.downloadCIR/1024}k`:''
        this.buildMigForm.patchValue({ serviceType: this.profiledata?.serviceType, serviceDefinitionName: this.profiledata?.serviceDefinitionName, videoProfile: this.profiledata?.videoProfile })
        //this.buildMigForm.patchValue({videoProfile:{X_CALIX_SXACC_BW_PROFILE:{uploadCIR:this.uploadCIR,downloadCIR:this.downloadCIR}}})
        this.addRemoveValidator(this.buildMigForm.value.videoProfile.VlanTagAction ? 'add' : 'clearValidators', 'videoProfile');
      } else {
        this.serviceTypeVoice = true;
        this.serviceTypeVideo = false;
        this.serviceTypeData = false
        this.voiceDefinitionList = this.serviceDefinitionItems?.filter(a=> a.voiceType === this.profiledata?.voiceServiceType);
        if (this.profiledata?.voiceServiceType === 'SIP') {
          this.buildMigForm.patchValue({ voiceServiceType: 'SIP' })
          this.buildMigForm.patchValue({ serviceType: this.profiledata?.serviceType, serviceDefinitionName: this.profiledata?.serviceDefinitionName, voiceSIPProfile: this.profiledata?.voiceSIPProfile })
          this.addRemoveValidator(this.buildMigForm.value.voiceSIPProfile.VlanTagAction ? 'add' : 'clearValidators', 'voiceSIPProfile');
          this.voiceH_248 = false;
          this.voice_SIP = true;
          this.voice_MGCP = false;
          this.voice_TW = false
        } else if (this.profiledata?.voiceServiceType === 'H.248') {
          this.buildMigForm.patchValue({ voiceServiceType: 'H.248' })
          this.buildMigForm.patchValue({ serviceType: this.profiledata?.serviceType, serviceDefinitionName: this.profiledata?.serviceDefinitionName, voiceH248Profile: this.profiledata?.voiceH248Profile })
          this.addRemoveValidator(this.buildMigForm.value.voiceH248Profile.VlanTagAction ? 'add' : 'clearValidators', 'voiceH248Profile');
          this.voiceH_248 = true;
          this.voice_SIP = false;
          this.voice_MGCP = false;
          this.voice_TW = false
        } else if (this.profiledata?.voiceServiceType === 'MGCP') {
          this.buildMigForm.patchValue({ voiceServiceType: 'MGCP' })
          this.buildMigForm.patchValue({ serviceType: this.profiledata?.serviceType, serviceDefinitionName: this.profiledata?.serviceDefinitionName, voiceMGCPProfile: this.profiledata?.voiceMGCPProfile })
          this.addRemoveValidator(this.buildMigForm.value.voiceMGCPProfile.VlanTagAction ? 'add' : 'clearValidators', 'voiceMGCPProfile');
          this.voiceH_248 = false;
          this.voice_SIP = false;
          this.voice_MGCP = true;
          this.voice_TW = false
        } else if (this.profiledata?.voiceServiceType === 'X_000631_TDMGW') {
          this.buildMigForm.patchValue({ voiceServiceType: 'X_000631_TDMGW' })
          this.buildMigForm.patchValue({ serviceType: this.profiledata?.serviceType, serviceDefinitionName: this.profiledata?.serviceDefinitionName, voiceTDMGWProfile: this.profiledata?.voiceTDMGWProfile })
          this.addRemoveValidator(this.buildMigForm.value.voiceTDMGWProfile.VlanTagAction ? 'add' : 'clearValidators', 'voiceTDMGWProfile');
          this.voiceH_248 = false;
          this.voice_SIP = false;
          this.voice_MGCP = false;
          this.voice_TW = true
        }
        this.productFamilyList = this.buildMigForm.value.voiceServiceType==='SIP' ? [{value:'GigaCenter',label:this.language['GigaCenter & GigaHub & GigaSpire(GS4227E,GS4220E,GS4227,GS4227W,GS4237)'],key:'GigaCenter & GigaHub & GigaSpire(GS4227E,GS4220E,GS4227,GS4227W,GS4237)'}] : [  {value:'GigaCenter',label:this.language['GigaCenter & GigaHub & GigaSpire(GS4227E,GS4220E,GS4227,GS4227W,GS4237)'],key:'GigaCenter & GigaHub & GigaSpire(GS4227E,GS4220E,GS4227,GS4227W,GS4237)'},
        {value:'T-Series',label:this.language['T-Series'],key:'T-Series'}];
      }

      if (this.profiledata?.id || (this.buildMigForm.value.serviceType && !this.serviceProfileItems)) {
        this.getCSCServiceProfileList(true)
      }if (this.profiledata?.id || (this.buildMigForm.value.serviceType && !this.serviceDefinitionItems)) {
        this.getServiceDefinitionList()
      }
    } 
    else {
      this.buildMigForm.patchValue(this.profiledata);
      if (this.profiledata?.id || (this.buildMigForm.value.serviceType && !this.serviceDefinitionItems)) {
        this.getServiceDefinitionList()
        if (this.profiledata?.voiceServiceType === 'SIP') {
          this.buildMigForm.patchValue({ voiceServiceType: 'SIP' });
          this.voiceH_248 = false;
          this.voice_SIP = true;
        }
        if (this.profiledata?.voiceServiceType === 'H.248') {
          this.buildMigForm.patchValue({ voiceServiceType: 'H.248' })
          this.voiceH_248 = true;
          this.voice_SIP = false;
        }
        if (this.profiledata?.serviceType == "VOICE") {
          this.serviceTypeVoice = true;
          this.serviceTypeVideo = false;
        }
        else if (this.profiledata?.serviceType == "VIDEO") {
          this.serviceTypeVideo = true;
          this.serviceTypeVoice = false;
        } else if (this.profiledata?.serviceType == "DATA") {
          this.serviceTypeVideo = false;
          this.serviceTypeVoice = false;
        }
      }
    }


  }
  getServiceProfileList(val?) {
    if (val) {
      this.buildMigForm.patchValue({ cscProfileName: '', "dataProfile": {
        "VLANID": '',"ProductFamily":'EXOS',"Mode":'RG Routed',"defaultConnectionService":true,
"FramingType":'IPoE',"version":'v4',"VlanTagAction":true,"NATEnabled":true,"X_000631_VlanMux8021p":0},
"videoProfile":{"VLANID":'',"ProductFamily":'EXOS',"Mode":'RG Routed',"VlanTagAction":true,"QueryInterval":'',"MaxStreams":0,"X_000631_VlanMux8021p":4,"mcastFilterProfile":{"RangeNumberOfEntries":'',"Name":'',"RangeName":'',"RangeStart":'', "RangeEnd":''},
"mvrProfile":{"DefaultVLAN":'',"RangeNumberOfEntries":'',"RangeVLAN": '',"RangeStart":'',"RangeEnd": ''}},"voiceSIPProfile":{"VLANID": '',"ProductFamily": 'GigaCenter',"ServiceFramingType": 'IPoE',
"ipType": 'IPv4',"VlanTagAction": true,"X_000631_VlanMux8021p": 6,"ProxyServer": '',"ProxyServerPort": '5060',"DNSPrimary": '',"DNSSecondary": '',}, "voiceH248Profile":{ "VLANID": '',
"ProductFamily": 'GigaCenter',
"ServiceFramingType": 'IPoE',
"ipType": 'IPv4',
"VlanTagAction": true,
"X_000631_VlanMux8021p": 6,
"RTPBasePort": '49152',
"PrimaryGWController": '',
"SecondaryGWController": ''},"voiceMGCPProfile": { "VLANID": '',
"ProductFamily": 'GigaCenter',
"ServiceFramingType": 'IPoE',
"ipType": 'IPv4',
"VlanTagAction": true,
"X_000631_VlanMux8021p": 6,
"PrimaryCallMainAgent": '',
"SecondaryCallMainAgent": ''},
"voiceTDMGWProfile":{ "VLANID": '',
"ProductFamily": 'GigaCenter',
"ServiceFramingType": 'IPoE',
"ipType": 'IPv4',
"VlanTagAction": true,
"X_000631_VlanMux8021p": 6,
"ServerIP": ''} })
    }
    
    if(this.buildMigForm.value.serviceType==='DATA'){
      this.serviceProfileItems =this.serviceProfileItem?.filter((el) => el.configurations.some(e=> e.category ==='Data Service'));

    }else if(this.buildMigForm.value.serviceType==='VIDEO'){
      this.serviceProfileItems =this.serviceProfileItem?.filter((el) => el.configurations.some(e=> e.category ==='Data Service'));
    }else{
      this.serviceProfileItems =this.serviceProfileItem?.filter((el) => el.configurations.some(e=> e.category ==='Voice Service' &&  e.parameterValues.Type !== 'X_000631_TDMGW'));
    }
  }
  AutoPopulateServices(val){
    console.log("AutoPopulateServices",val)
    if(this.buildMigForm.value.serviceType==='DATA'){
      
      let obj =this.serviceProfileItem.find((el) => el.name ===val)?.configurations.find(e=> e.category === 'Data Service')
      console.log("obj",obj)
      obj.parameterValues.ProductFamily=obj.parameterValues?.productFamily?obj.parameterValues?.productFamily:'EXOS';
      obj.parameterValues.VLANID=obj.parameterValues?.X_000631_VlanMuxID;
      if(obj.parameterValues?.versionForPPPoE){
        obj.parameterValues.version=obj.parameterValues?.versionForPPPoE;
      }
      
      // if(obj.parameterValues?.X_CALIX_SXACC_BW_PROFILE){
      //   let bwObj =this.serviceProfileItem.filter((el) => el?._id ===obj.parameterValues?.X_CALIX_SXACC_BW_PROFILE)
      //   obj.parameterValues.downloadCIR=bwObj[0].configurations[0].parameterValues.DownstreamCIR
      // obj.parameterValues.uploadCIR=bwObj[0].configurations[0].parameterValues.UpstreamCIR
      // }
      if(obj.parameterValues.VlanTagAction == false && obj.parameterValues.VLANID == '-1'){
        obj.parameterValues.VLANID = ''
      }
      //this.buildMigForm.patchValue({dataProfile:{X_CALIX_SXACC_BW_PROFILE:{uploadCIR:obj.parameterValues?.uploadCIR,downloadCIR:obj.parameterValues?.downloadCIR}}})
      this.buildMigForm.patchValue({dataProfile:obj.parameterValues})
      this.addRemoveValidator(this.buildMigForm.value.dataProfile.VlanTagAction ? 'add' : 'clearValidators', 'dataProfile');
    }else if(this.buildMigForm.value.serviceType==='VIDEO'){
      let obj =this.serviceProfileItem.find((el) => el.name ===val)?.configurations.find(e=> e.category === 'Video Service')
      
      obj.parameterValues.VLANID=obj.parameterValues?.X_000631_VlanMuxID;
      obj.parameterValues.MaxStreams=obj.parameterValues?.X_000631_MaxStreams
      obj.parameterValues.ProductFamily=obj.parameterValues?.productFamily?obj.parameterValues?.productFamily:'EXOS';
      // if(obj.parameterValues?.X_CALIX_SXACC_BW_PROFILE){
      //   let bwObj =this.serviceProfileItem.filter((el) => el?._id ===obj.parameterValues?.X_CALIX_SXACC_BW_PROFILE)
      //   obj.parameterValues.downloadCIR=bwObj[0].configurations[0].parameterValues.DownstreamCIR
      // obj.parameterValues.uploadCIR=bwObj[0].configurations[0].parameterValues.UpstreamCIR
      // }
      if(obj.parameterValues.VlanTagAction == false && obj.parameterValues.VLANID == '-1'){
        obj.parameterValues.VLANID = ''
      }
      //this.buildMigForm.patchValue({videoProfile:{X_CALIX_SXACC_BW_PROFILE:{uploadCIR:obj.parameterValues?.uploadCIR,downloadCIR:obj.parameterValues?.downloadCIR}}})
      this.buildMigForm.patchValue({videoProfile:obj.parameterValues})
      this.addRemoveValidator(this.buildMigForm.value.videoProfile.VlanTagAction ? 'add' : 'clearValidators', 'videoProfile');
    }else if(this.buildMigForm.value.serviceType==='VOICE'){
      let obj =this.serviceProfileItem.find((el) => el.name ===val)?.configurations.find(e=> e.category === 'Voice Service')
      this.buildMigForm.patchValue({voiceServiceType:obj.parameterValues?.Type})
      this.chooseVoiceType(this.buildMigForm.value.voiceServiceType)
      obj.parameterValues.ProductFamily=obj.parameterValues?.productFamily?obj.parameterValues?.productFamily:'GigaCenter';
      obj.parameterValues.VLANID=obj.parameterValues?.X_000631_VlanMuxID;
      if(obj.parameterValues.VlanTagAction == false && obj.parameterValues.VLANID == '-1'){
        obj.parameterValues.VLANID = ''
      }
     
      if(this.buildMigForm.value.voiceServiceType==='SIP'){ 
        this.buildMigForm.patchValue({voiceSIPProfile:obj.parameterValues})
        this.addRemoveValidator(this.buildMigForm.value.voiceSIPProfile.VlanTagAction ? 'add' : 'clearValidators', 'voiceSIPProfile');
      }else if(this.buildMigForm.value.voiceServiceType==='H.248'){
        this.buildMigForm.patchValue({voiceH248Profile:obj.parameterValues})
        this.addRemoveValidator(this.buildMigForm.value.voiceH248Profile.VlanTagAction ? 'add' : 'clearValidators', 'voiceH248Profile');
      }else if(this.buildMigForm.value.voiceServiceType==='MGCP'){
        obj.parameterValues.SecondaryCallMainAgent=obj.parameterValues?.PrimaryCallBackupAgent;
        this.buildMigForm.patchValue({voiceMGCPProfile:obj.parameterValues})
        this.addRemoveValidator(this.buildMigForm.value.voiceMGCPProfile.VlanTagAction ? 'add' : 'clearValidators', 'voiceMGCPProfile');
      }else{
        this.buildMigForm.patchValue({voiceTDMGWProfile:obj.parameterValues})  
        this.addRemoveValidator(this.buildMigForm.value.voiceTDMGWProfile.VlanTagAction ? 'add' : 'clearValidators', 'voiceTDMGWProfile');
      }
      this.productFamilyList = this.buildMigForm.value.voiceServiceType==='SIP' ? [{value:'GigaCenter',label:this.language['GigaCenter & GigaHub & GigaSpire(GS4227E,GS4220E,GS4227,GS4227W,GS4237)'],key:'GigaCenter & GigaHub & GigaSpire(GS4227E,GS4220E,GS4227,GS4227W,GS4237)'}] : [  {value:'GigaCenter',label:this.language['GigaCenter & GigaHub & GigaSpire(GS4227E,GS4220E,GS4227,GS4227W,GS4237)'],key:'GigaCenter & GigaHub & GigaSpire(GS4227E,GS4220E,GS4227,GS4227W,GS4237)'},
      {value:'T-Series',label:this.language['T-Series'],key:'T-Series'}];
    }else{
      this.buildMigForm.patchValue({voiceServiceType:''})
    }
    this.isprofilevalue.emit(this.buildMigForm)
  }
  getCSCServiceProfileList(val?) {
    this.loading = true;
    this.getServiceDefinition = this.service.GetCscService().subscribe((res: any) => {
      // console.log("serviceProfileItemTDM",res.filter((el) => el.configurations[0].parameterValues.Type !== 'X_000631_TDMGW'))
      if (res) {
        this.serviceProfileItem = res ? res : [];
        if(val){
          this.getServiceProfileList()
        }
      }
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.loading=false
      //this.pageErrorHandle(err);
    })
  }

  getServiceDefinitionList(val?) {
    this.loading = true;
    if (val) {
      this.buildMigForm.patchValue({ serviceDefinitionName: '' })
    }
    this.getServiceDefinition = this.service.GetServiceDefinition(this.buildMigForm.value.serviceType).subscribe((res: any) => {
      if (res) {
        this.serviceDefinitionItems = res ? res.filter(a=> a.voiceType !== "X_000631_TDMGW") : [];
        this.voiceDefinitionList = this.buildMigForm.value.voiceServiceType ? res?.filter(a=> a.voiceType === this.buildMigForm.value.voiceServiceType) :  [];

      }
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.loading=false
      //this.pageErrorHandle(err);
    })
  }
  formvaluechange() {
    this.isprofilevalue.emit(this.buildMigForm)
    console.log("buildMigForm",this.buildMigForm)
  }
  dataProfileMode: any = [
    { id: 'RG - Routed', name: 'RG Routed' },
    { id: 'RG - L2 Bridged', name: 'RG L2 Bridged' }
  ]
  dataModeSelect() {
    if (this.buildMigForm.value.dataProfile.ProductFamily == 'GigaCenter') {
      this.dataProfileMode = [
        { id: 'RG - Routed', name: 'RG Routed' },
      ]
      if (this.buildMigForm.value.dataProfile.ProductFamily == 'GigaCenter' && this.buildMigForm.value.dataProfile.Mode == 'RG L2 Bridged') {
        this.buildMigForm.get('dataProfile').patchValue({ Mode: 'RG Routed' });
      }
    } else {
      //   if(this.buildMigForm.value.videoProfile.ProductFamily == 'GigaCenter' && this.buildMigForm.value.videoProfile.Mode == 'RG L2 Bridged'){
      //     this.buildMigForm.get('videoProfile').patchValue({Mode:'RG Routed'});
      //  }
      this.dataProfileMode = [
        { id: 'RG - Routed', name: 'RG Routed' },
        { id: 'RG - L2 Bridged', name: 'RG L2 Bridged' }
      ]

    }
  }

  chooseServiceType(e) {
    if (e.id == "VOICE") {
      this.serviceTypeVoice = true;
      this.serviceTypeVideo = false;
      this.serviceTypeData = false;
      this.buildMigForm.patchValue({ multicastProfile: '', igmpProfile: '' });
    }
    else if (e.id == "VIDEO") {
      this.serviceTypeVideo = true;
      this.serviceTypeVoice = false;
      this.serviceTypeData = false;
      this.buildMigForm.patchValue({ voiceServiceType: '', sipProfile: '', dialPlan: '', h248Profile: '' });
    } else if (e.id == "DATA") {
      this.serviceTypeVideo = false;
      this.serviceTypeVoice = false;
      this.serviceTypeData = true;
      this.buildMigForm.patchValue({ voiceServiceType: '', sipProfile: '', dialPlan: '', h248Profile: '', multicastProfile: '', igmpProfile: '' });
    }
    this.isprofilevalue.emit(this.buildMigForm)
  }
  chooseVoiceType(e) {
    this.voiceDefinitionList = this.serviceDefinitionItems.filter(a=> a.voiceType === e);
    this.buildMigForm.patchValue({serviceDefinitionName:null});
    if (e == "H.248") {
      this.voiceH_248 = true;
      this.voice_SIP = false;
      this.voice_MGCP = false;
      this.voice_TW = false
      this.buildMigForm.patchValue({ sipProfile: '', dialPlan: '' });
      this.buildMigForm.get('voiceH248Profile').reset({
        "VLANID": '',
        "ProductFamily": 'GigaCenter',
        "ServiceFramingType": 'IPoE',
        "ipType": 'IPv4',
        "VlanTagAction": true,
        "X_000631_VlanMux8021p": 6,
        "RTPBasePort": '49152',
        "PrimaryGWController": '',
        "SecondaryGWController": ''
      })
    }
    else if (e == "SIP") {
      this.voiceH_248 = false;
      this.voice_SIP = true;
      this.voice_MGCP = false;
      this.voice_TW = false
      this.buildMigForm.patchValue({ h248Profile: '' });
      this.buildMigForm.get('voiceSIPProfile').reset({
        "VLANID": '',
        "ProductFamily": 'GigaCenter',
        "ServiceFramingType": 'IPoE',
        "ipType": 'IPv4',
        "VlanTagAction": true,
        "X_000631_VlanMux8021p": 6,
        "ProxyServer": '',
        "ProxyServerPort": '5060',
        "DNSPrimary": '',
        "DNSSecondary": ''
      })
    } else if (e == 'MGCP') {
      this.voiceH_248 = false;
      this.voice_SIP = false;
      this.voice_MGCP = true;
      this.voice_TW = false
      this.buildMigForm.get('voiceMGCPProfile').reset({
        "VLANID": '',
        "ProductFamily": 'GigaCenter',
        "ServiceFramingType": 'IPoE',
        "ipType": 'IPv4',
        "VlanTagAction": true,
        "X_000631_VlanMux8021p": 6,
        "PrimaryCallMainAgent": '',
        "SecondaryCallMainAgent": '',
      })
    } else {
      this.voiceH_248 = false;
      this.voice_SIP = false;
      this.voice_MGCP = false;
      this.voice_TW = true
      this.buildMigForm.get('voiceTDMGWProfile').reset({
        "VLANID": '',
        "ProductFamily": 'GigaCenter',
        "ServiceFramingType": 'IPoE',
        "ipType": 'IPv4',
        "VlanTagAction": true,
        "X_000631_VlanMux8021p": 6,
        "ServerIP": '',
      })
    }
    this.isprofilevalue.emit(this.buildMigForm)
  }
  vlanVoiceValid: boolean = true;
  VlanValidation(value, field) {
    this[field === 'dataProfile' ? 'vlanDataValid' : field === 'videoProfile' ? 'vlanVideoValid' : 'vlanVoiceValid'] = (value == null || (value != undefined && value != 0 && value >= 1 && value <= 4093));
  }

  ProfileObj = {
    dataProfile: {
      vlanID: false,
      ProductFamily: false,
      mode: false,
      defaultWAN: false,
      framingType: false,
      ipVersion: false,
      vlanTagAction: false,
      ipv4Nat: false,
      priorityBits: false,
      //uploadCIR: false
    }, videoProfile: {
      vlanID: false,
      //downloadCIR: false,
      //uploadCIR: false,
      ProductFamily: false,
      mode: false,
      vlanTagAction: false,
      IGMPquery: false,
      multiCastStreams: false,
      priorityBits: false,
      multiCastEntries: false,
      name: false,
      rangeName: false,
      rangeStart1: false,
      rangeEnd1: false,
      defaultVlan: false,
      multiCastRangeFilters: false,
      rangeVlan: false,
      rangeStart2: false,
      rangeEnd2: false,
    }, voiceProfile: {
      voiceProfileSIP: {
        vlanID: false,
        ProductFamily: false,
        framingType: false,
        IPtype: false,
        vlanTagAction: false,
        priorityBits: false,
        proxyServer: false,
        proxyServerPort: false,
        primaryDNS: false,
        secondaryDNS: false
      }, voiceProfileH248: {
        vlanID: false,
        ProductFamily: false,
        framingType: false,
        IPtype: false,
        vlanTagAction: false,
        priorityBits: false,
        RTPbasePort: false,
        primaryGW: false,
        secondaryGW: false
      }, voiceProfileMGCP: {
        vlanID: false,
        ProductFamily: false,
        framingType: false,
        IPtype: false,
        vlanTagAction: false,
        priorityBits: false,
        primarycallAgent: false,
        secondarycallAgent: false
      }, voiceProfileTDMGW: {
        vlanID: false,
        ProductFamily: false,
        framingType: false,
        IPtype: false,
        vlanTagAction: false,
        priorityBits: false,
        serverIP: false
      }
    }

  }


}

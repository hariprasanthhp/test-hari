import { Component, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../../services/common.service';
import { MycommunityIqService } from '../../services/mycommunity-iq.service';
import { ValidatorService } from 'src/app-services/validator.services';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements OnInit, OnDestroy {
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('microSiteModal', { static: true }) private microSiteModal: TemplateRef<any>;
  @ViewChild('verifyMicrositeModel', { static: true }) private verifyMicrositeModel: TemplateRef<any>;
  language: any;
  languageSubject: any;
  bspForm: FormGroup;
  bspFormSubmitted : boolean = false;
  submitted: boolean = false;
  addMicroSite: FormGroup;
  addMicroSiteFormSubmitted: boolean = false;
  errorInfo:any;
  successInfo:any;
  editIndex:number;
  minimumErr= {
    community:false,
    bsp:false,
    wifi:false,
    description:false,
    friendlyName:false
  }
  communityError={
    community:false,
    bsp:false,
  }
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    dom: 'tipr',
    lengthChange: false,
    pageLength: 10,
    destroy: true,
    processing: false,
    columnDefs: [
      { orderable: false, targets: [5,6] },
      { targets: [0], orderable: true }
    ],
    order: [0, 'asc'],
    drawCallback: (settings) => {
      this._iDisplayStart=settings._iDisplayStart
      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
      }
    }
  };
  @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  tableDataAvailable: boolean;
  communityArr: any;
  tableData=[];
  buttonText: string="Bsp_Add_Microsite";
  primaryColor:string;
  secondaryColor:string;
  defaultLogo:any;
  loader: boolean;
  addBspsub: any;
  BspData: any;
  error: boolean;
  success: boolean;
  bspId: any;
  logoFile: any;
  ORG_ID: any;
  status: any;
  frTable: any;
  Modelloader: boolean;
  logo: any;
  micrositeId: any;
  EditmicrositeId: any;
  micrositeloader: boolean;
  disblemicrosite: boolean;
  ShowMicrosite: boolean;
  flag: any;
  Micrositelogo:any
  communityDesc: any;
  loading: boolean;
  disableCommunity: boolean;

  editLoader: boolean;
  errorInfoMicrosite: any;
  saveBSP: boolean;
  esTable:any;
  UrLError: boolean;
  refreshBack: boolean=false;
  bsploader: boolean;
  iserror: boolean;
  workFlowData: any;
  micrositeName: any;
  MicrositeData: any;
  MODULE:any;
  private _iDisplayStart: number;
  de_DETable: { emptyTable: string; info: string; infoEmpty: string; infoFiltered: string; infoPostFix: string; thousands: string; lengthMenu: string; loadingRecords: string; processing: string; search: string; zeroRecords: string; paginate: { first: string; last: string; next: string; previous: string; }; };
  constructor(
    private translateService: TranslateService,
    private router: Router,
    private titleService: Title,
    private sso: SsoAuthService,
    private formBuilder: FormBuilder,
    private dialogService: NgbModal,
    private commonOrgService: CommonService,
    private communityService:MycommunityIqService,
    private validatorService: ValidatorService,
  ) {
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.de_DETable = this.translateService.de_DE;
    this.ORG_ID = this.sso.getOrgId();
    let url = this.router.url;
    this.MODULE = this.sso.getRedirectModule(url);
    this.commonOrgService.currentPageAdder('SmartTown Wi-Fi');

   }
   restrictionArr=[
    {
      name: 'Child (0-9 yrs. old)',
      value: 'Child',
    },
    {
      name: 'Pre-Teen (9-12 yrs. old)',
      value: 'Pre-Teen',
    },
    {
      name: 'Teen (13-18 yrs. old)',
      value: 'Teen',
    },
    {
      name: 'None',
      value: 'None',
    },
  ];
  subscription:Subscription[] = [];
  ngOnDestroy(): void {
    this.subscription.forEach(e=> e?.unsubscribe());
  }
  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.subscription.push(this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.tableDataAvailable = false;
      this.restrictionArr=[
        {
          name:this.language['Child (0-8 yrs Old)'],
          value: 'Child',
        },
        {
          name:this.language['Pre-Teen (9-12 yrs Old)'],
          value: 'Pre-Teen',
        },
        {
          name:this.language['Teen (13-18 yrs Old)'],
          value: 'Teen',
        },
        {
          name: this.language['None'],
          value: 'None',
        },
      ]
      this.tableLanguageOptions();
              this.titleService.setTitle(`${this.language['Communities']} - ${this.language['SmartTown Wi-Fi']} - ${this.language['administration']} - ${this.language['Calix Cloud']}`);
      setTimeout(() => {
        this.tableDataAvailable = true;
      }, 100);
    }));
        this.titleService.setTitle(`${this.language['Communities']} - ${this.language['SmartTown Wi-Fi']} - ${this.language['administration']} - ${this.language['Calix Cloud']}`);
    this.GetMicrosites();
    this.getPredefinedCommunities();
    this.addMicroSite = this.formBuilder.group({
      // shortName: [null, [Validators.required]],
      isPredefinedCommunity: [true],
      communityType:['Permanent'],
      brandingType: ['Default'],
      restrictionLevel:['None'],
      communityName: [null, [Validators.required]],
      communityDesc: [''],
      logo: [''],
      primaryColor: ['#0279FF', Validators.required],
      secondaryColor: ['#CCCCCC', Validators.required]
    });
    this.GetBspProvider();
    this.restrictionArr=[
      {
        name:this.language['Child (0-8 yrs Old)'],
        value: 'Child',
      },
      {
        name:this.language['Pre-Teen (9-12 yrs Old)'],
        value: 'Pre-Teen',
      },
      {
        name:this.language['Teen (13-18 yrs Old)'],
        value: 'Teen',
      },
      {
        name: this.language['None'],
        value: 'None',
      },
    ]
  }
  GetBspProvider() {
    if(this.refreshBack){
      this.loader = false;
    }else{
      this.loader = true;
    }
    
    this.subscription.push(this.communityService.GetBspproviderInfo().subscribe((res: any) => {
      this.BspData = res ? res : {};
      this.bspId= res?.id
      if(this.BspData){
        this.refreshBack=true
        this.loader=false
      }
      this.status= res?.status;
      if(this.status === 'READY'){
        this.ShowMicrosite = true;
      }else{
        this.ShowMicrosite = false;
      }
      this.defaultLogo=this.BspData?.defaultLogo;
      this.bsploader=false;
      this.loader = false;
    }, (err: HttpErrorResponse) => {
      //this.pageErrorHandle(err);
      this.loader = false;
      this.bspId="";
      this.BspData=""
      this.status="";
      this.tableData=[];
      this.ShowMicrosite = false;
      this.bspFormSubmitted=false;
      this.defaultLogo="";

      this.bsploader=false
    }));
  }
  showNoDataAvailable(){
    setTimeout(()=>{
      let span=document.querySelector('.dataTables_empty') as HTMLElement;
      if(span){
        span.style.display='table-cell';
        span.classList.add('text-center');
      };
    },100);
  }
  GetMicrosites(){
    this.micrositeloader = true;
    this.subscription.push(this.communityService.GetMicrosite().subscribe((res: any) => {
      this.tableDataAvailable = false;
      this.tableData = res ? res : [];
      if(!this.tableData){
        setTimeout(()=>{
          this.showNoDataAvailable()
        },300)
      }
      this.dtOptions = {
        pagingType: 'full_numbers',
        dom: 'tipr',
        lengthChange: false,
        pageLength: 10,
        destroy: true,
        processing:true,

        displayStart: this._iDisplayStart?this._iDisplayStart:0,
        columnDefs: [
          { orderable: false, targets: [5,6] },
          { targets: [0], orderable: true }
        ],
        order: [0, 'asc'],
        drawCallback: (settings) => {
          this._iDisplayStart=settings._iDisplayStart
          let total = settings.aoData.length;
          let length = settings._iDisplayLength;
          if (total <= length) {
            $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
          }
        }
      };
      this.micrositeloader = false;
      this.closeAllModal()
        this.loadArloTables();
    }, (err: HttpErrorResponse) => {
      this.micrositeloader = false;
      this.loadArloTables();
      if(err.status == 404){
        setTimeout(()=>{
          this.showNoDataAvailable()
        },300)
      }
      this.pageErrorHandle(err,true);
    }));
  }
  closeAllModal() {
    this.error=false
    this.iserror=false
    this.dialogService.dismissAll();
  }
  addMicroSiteValue() {
    this.disblemicrosite = false;
    this.error = false;
    this.iserror=false;
    this.logo=""
    this.addMicroSiteFormSubmitted = false;
    this.EditmicrositeId = ""
    this.minimumErr.community=false;
    this.minimumErr.description=false;
    this.communityDesc="";
    this.communityError.community=false;
    this.Micrositelogo = '';
    if(this.communityArr?.length===0){
      this.disableCommunity = true;
      this.addMicroSite.patchValue({isPredefinedCommunity:false})
    }else{
      this.disableCommunity = false;
    }
    this.addMicroSite.reset({
      shortName: null,
      communityType:'Permanent',
      isPredefinedCommunity: this.disableCommunity ? false:true,
      brandingType: 'Default',
      restrictionLevel:'None',
      communityName: null,
      communityDesc: '',
      logo: null,
      primaryColor: '#0279FF',
      secondaryColor: '#CCCCCC'
    })
    this.dialogService.open(this.microSiteModal);
  }
  editMicroSite(value,index) {
    this.error = false;
    this.logo = ''
    this.iserror=false;
    this.EditmicrositeId = value.id
    this.disblemicrosite = true;
    this.disableCommunity=true
    this.minimumErr.description=false;
    this.minimumErr.community=false;
    this.editLoader=true;
    this.subscription.push(this.communityService.GetMicrositeForEdit(this.EditmicrositeId).subscribe((res: any) => {
      this.addMicroSite.patchValue(res);
      this.Micrositelogo = res?.logo;
      this.editLoader=false;
      this.dialogService.open(this.microSiteModal);
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err,false);
     
      this.editLoader=false;
    }));
    
    this.editIndex = index;
  }
  EditMicrositePreview(item?){
    this.editLoader=true;
    let id = item?.id
    this.subscription.push(this.communityService.GetMicrositeForEdit(id).subscribe((res: any) => {
      this.MicrositeData = res? res:{}
      this.editLoader=false;
      localStorage.setItem("calix.micrositeDetails", JSON.stringify(this.MicrositeData));
      this.router.navigate([]).then(result => { window.open('/microsite_preview', '_blank') });
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err,false);
     
      this.editLoader=false;
    }))
    
  }
  WarToDelMicrosite(item: any,){
    this.micrositeId = item.id;
    this.micrositeName= item?.communityName;
    let micrositeId = this.micrositeId
    this.micrositeloader=true;
    const data={
      "orgId":this.ORG_ID,
      "actions.passpointConfig.communities.micrositeId":micrositeId
    }
    this.subscription.push(this.communityService.WarToDelMicrosite(this.ORG_ID,JSON.stringify(data)).subscribe((res: any) => {
        this.workFlowData = res? res:[]
        this.micrositeloader=false;
        if(res?.length !== 0){
          this.dialogService.open(this.verifyMicrositeModel,{windowClass:'custom-alert-warn'});
        }else{
          this.dialogService.open(this.deleteModal)
        }
      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err,false);
        this.dialogService.open(this.deleteModal)
        this.micrositeloader=false;
      }))
    }
    loadArloTables() {
      this.tableLanguageOptions();
      setTimeout(() => {
        this.tableDataAvailable = true;
      }, 0);
  
    }
  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    }else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    }else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.de_DETable;
    }else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }
  pageErrorHandle(err: HttpErrorResponse, value: boolean) {
    if(value){
      this.iserror=true;
      if (err.status == 401) {
        this.errorInfoMicrosite = this.language['Access Denied'];
      } else {
        this.errorInfoMicrosite = this.commonOrgService.pageErrorHandle(err);
      }
      
    }else{
      this.error = true;
      if (err.status == 401) {
        this.errorInfo = this.language['Access Denied'];
      } else {
        this.errorInfo = this.commonOrgService.pageErrorHandle(err);
      }
    }
    
    //this.closeAlert();
    
  }
  onSubmit() {
    this.addMicroSiteFormSubmitted = true;
    let formdata = new FormData;
    if(this.EditmicrositeId){
      if(!this.addMicroSite.value.isPredefinedCommunity){
        if(!this.addMicroSite.value.communityDesc){
          return
        }
      }
      if(this.minimumErr.description){
        return
      }
      if(this.addMicroSite.value.brandingType === 'Custom'){
        this.micrositeloader = true;
        let logo;
        logo = ($("input[name='white_logo']") as any).get(0).files;
  
      if (logo.length) {
        var file_ext = logo[0].name.split('.').pop();
        var logoimg = logo[0].size;
        var logoimgsize = logoimg / 1024;
        var allowed_extns = ["jpeg", "JPEG", "PNG", "png","jpg", "JPG"];
        if (allowed_extns.indexOf(file_ext) == -1) {
          var allowed_extns_str = allowed_extns.join(", ");
          this.addError(this.language['Image_extension_will_be'] + allowed_extns_str + this.language['file_format'],true);
          return;
        }
        if (logoimgsize > 400) {
          this.addError(this.language['LogoImage_uploaderror'] + " 400 KB",true);
          return;
        } 
        $.each(logo, function (i, file) {
          formdata.append("logo", file);
          formdata.append('updateLogo', 'true');
        });
      } else {
        formdata.append("logo", '');
        formdata.append('updateLogo', 'false');
      }
      formdata.append("primaryColor", this.addMicroSite.value.primaryColor);
      formdata.append("secondaryColor", this.addMicroSite.value.secondaryColor);
      formdata.append("brandingType", this.addMicroSite.value.brandingType);
      formdata.append('communityDesc',this.addMicroSite.value.communityDesc);
      formdata.append("restrictionLevel", this.addMicroSite.value.restrictionLevel);
      }else{
        formdata.append("logo", '');
        formdata.append('updateLogo', 'false');
        formdata.append("primaryColor", '');
      formdata.append("secondaryColor", '');
      formdata.append('communityDesc',this.addMicroSite.value.communityDesc);
      formdata.append("brandingType", this.addMicroSite.value.brandingType);
      formdata.append("restrictionLevel", this.addMicroSite.value.restrictionLevel);
      }
    }else{
      if(!this.addMicroSite.value.brandingType || !this.addMicroSite.value.communityName){
        return
      }
      if(!this.addMicroSite.value.isPredefinedCommunity){
        if(!this.addMicroSite.value.communityDesc){
          return
        }
      }
      this.micrositeloader = true;
      if(this.addMicroSite.value.brandingType === 'Custom'){  
        let logo;
        logo = ($("input[name='white_logo']") as any ).get(0).files;
  
      if (logo.length) {
        var file_ext = logo[0].name.split('.').pop();
        var logoimg = logo[0].size;
        var logoimgsize = logoimg / 1024;
  
  
        var allowed_extns = ["jpeg", "JPEG", "PNG", "png","jpg", "JPG"];
        if (allowed_extns.indexOf(file_ext) == -1) {
  
          var allowed_extns_str = allowed_extns.join(", ");
          this.addError(this.language['Image_extension_will_be'] + allowed_extns_str + this.language['file_format'],true);
          return;
        }
        if (logoimgsize > 400) {
          this.addError(this.language['LogoImage_uploaderror'] + " 400 KB", true);
          return;
        }
  
        $.each(logo, function (i, file) {
          formdata.append("logo", file);
          formdata.append('updateLogo', 'true');
        });
      } else {
        // this.addError(this.language.upload_Logo_image);
        // return;
        formdata.append("logo", '');
        formdata.append('updateLogo', 'false');
      }
      formdata.append("primaryColor", this.addMicroSite.value.primaryColor);
      formdata.append("secondaryColor", this.addMicroSite.value.secondaryColor);
      }else{
        formdata.append("logo", '');
        formdata.append('updateLogo', 'false');
        formdata.append("primaryColor", '');
      formdata.append("secondaryColor", '');
      }
      if(!this.addMicroSite.value.isPredefinedCommunity){
        formdata.append("communityDesc", this.addMicroSite.value.communityDesc);
        this.clsAlphaNoOnly(this.addMicroSite.value.communityName);
        this.checkMaxMin(this.addMicroSite.value.communityName,'community');
        if(this.communityError.community || this.minimumErr.community || this.minimumErr.description){
          this.micrositeloader = false;
          return
        }
      }else{
        formdata.append("communityDesc", '');
      }
      
      formdata.append("isPredefinedCommunity", this.addMicroSite.value.isPredefinedCommunity);
      formdata.append("brandingType", this.addMicroSite.value.brandingType);
      formdata.append("communityName", this.addMicroSite.value.communityName.toLowerCase());
      formdata.append("communityType", this.addMicroSite.value.communityType);
      formdata.append("restrictionLevel", this.addMicroSite.value.restrictionLevel);
    }
   if(this.EditmicrositeId){
    this.subscription.push(this.communityService.EditMicrosite(formdata,this.EditmicrositeId).subscribe((res: any) => {
      this.closeAllModal();
     this.GetMicrosites();
     this.getPredefinedCommunities();

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err,true);
      this.micrositeloader = false;
    }))
   }else{
    this.subscription.push(this.communityService.AddMicrosite(formdata).subscribe((res: any) => {
      this.closeAllModal();
     this.GetMicrosites();
     this.getPredefinedCommunities();
  
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err,true);
      this.micrositeloader = false;
    }))
   }
   
  }
  onChangecommunity(value){
    if(this.addMicroSite.value.isPredefinedCommunity){
      this.addMicroSite.patchValue({restrictionLevel:'None'})
    }else{
      this.addMicroSite.patchValue({restrictionLevel:'None'})
    }
   }
  getPredefinedCommunities(){
    this.loading = true;
    this.subscription.push(this.communityService.GetpredefinedCommunities().subscribe((res: any) => {
      this.communityArr = res ? res : [];
      if(this.communityArr?.length===0){
        this.disableCommunity = true;
        this.addMicroSite.patchValue({isPredefinedCommunity:false})
      }else{
        this.disableCommunity = false;
      }
      this.loading = false;
     
    }, (err: HttpErrorResponse) => {
      
      this.loader = false;
    }));
  }
  public addError(str: string, value?): void {
    if(value){
      this.errorInfoMicrosite=str
      this.iserror=true
      this.error = false;
    }else{
      this.errorInfo = str;
      this.error = true;
      this.iserror=false
    }
    
    this.micrositeloader = false;
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }
  clsAlphaNoOnly(e,value?) {
    if(value === 'community'){
      var regex = new RegExp("^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
      let result = e.substring(0, 2);
      if (regex.test(e) && result !== 'c-') {
       this.communityError.community=false
      }else{
        this.communityError.community=true
      }
    }else{
      var regex = new RegExp("^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
      if (regex.test(e)) {
       this.communityError.bsp=false
      }else{
        this.communityError.bsp=true
      }
    }
   
  }
  checkMaxMin(e,value){
    if(value ==="community"){
      if(e.length > 0){
        if(e.length >= 4 && e.length <= 31){
          this.minimumErr.community=false
        }else{
          this.minimumErr.community=true
        }
      }
    }else if(value ==='bsp'){
      if(e.length > 0){
        if(e.length >= 4 && e.length <= 31){
          this.minimumErr.bsp=false
        }else{
          this.minimumErr.bsp=true
        }
      }
    }else if(value ==='description'){
      if(e.length > 0){
        if(e.length <= 32){
          this.minimumErr.description=false
        }else{
          this.minimumErr.description=true
        }
      }
    }else if(value ==='friendlyName'){
      if(e.length > 0){
        if(e.length >= 3 && e.length <= 32){
          this.minimumErr.friendlyName=false
        }else{
          this.minimumErr.friendlyName=true
        }
      }else{
        this.minimumErr.friendlyName=false
      }
    }else{
      if(e.length > 0){
        if(e.length >= 3 && e.length <= 32){
          this.minimumErr.wifi=false
        }else{
          this.minimumErr.wifi=true
        }
      }
    }
    
    
  }
  convertIntoFileBase(input) {
    let res: any;
  
      this.Micrositelogo = '';
      $('#logo-customimage-view').attr('src', ' ');

    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = (e:any) => {
        $('#logo-customimage-view').attr('src', e.target.result);
        this.logo=e.target.result;
        res = e.target['result'];
      };

      reader.readAsDataURL(input.files[0]);
      var fileName =input.files[0].name;
      //this.logo = fileName; 
    }
  }
  getColorByBgColor(bgColor) {
    if (!bgColor) { return true; }
    return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? true : false;
  }
  AddMicrositePreview(){
    const AddMicrosite={
      communityDesc:(this.addMicroSite.value.communityDesc && !this.addMicroSite.value.isPredefinedCommunity)? this.addMicroSite.value.communityDesc:(this.communityDesc && this.addMicroSite.value.isPredefinedCommunity) ? this.communityDesc:this.addMicroSite.value.communityDesc,
      logo:this.logo ? this.logo:this.addMicroSite.value.brandingType !== 'Custom' ? this.defaultLogo:'', 
      primaryColor:this.addMicroSite.value.brandingType === 'Custom' ? this.addMicroSite.value.primaryColor : this.BspData?.defaultPrimaryColor,
      secondaryColor:this.addMicroSite.value.brandingType === 'Custom'? this.addMicroSite.value.secondaryColor : this.BspData?.defaultSecondaryColor
    }
    localStorage.setItem("calix.micrositeDetails", JSON.stringify(AddMicrosite));
    this.router.navigate([]).then(result => { window.open('/microsite_preview', '_blank') });
  }
  EditMicroPreview(){
    const AddMicrosite={
      communityDesc:this.communityDesc? this.communityDesc:this.addMicroSite.value.communityDesc,
      logo:this.logo ? this.logo:this.addMicroSite.value.brandingType === 'Custom'?  this.Micrositelogo:this.defaultLogo, 
      primaryColor:this.addMicroSite.value.brandingType === 'Custom' ? this.addMicroSite.value.primaryColor : this.BspData?.defaultPrimaryColor,
      secondaryColor:this.addMicroSite.value.brandingType === 'Custom'? this.addMicroSite.value.secondaryColor : this.BspData?.defaultSecondaryColor
    }
    localStorage.setItem("calix.micrositeDetails", JSON.stringify(AddMicrosite));
    this.router.navigate([]).then(result => { window.open('/microsite_preview', '_blank') });
  }
  removeCommunity() {
    this.addMicroSite.patchValue({
      communityName: null,
      description: null,
      restrictionLevel:'None'
    })
  }
  patchCommunityDescription(event) {
    this.communityDesc= event.description
    if(this.addMicroSite.value.communityName ==='c-k12'){
      this.addMicroSite.patchValue({restrictionLevel:'Pre-Teen'})
    }else{
      this.addMicroSite.patchValue({restrictionLevel:'None'})
    }
  }
  closeAlert(){
    this.error=false;
    this.iserror=false;
    this.success=false
  }
  checkSpace(e){
    const v = e.value.toString().replace(/\ /g, '');
    if (v.length == 0 && e.which == 32) e.preventDefault();
  }
  checkColor(){
    if(this.addMicroSite.value.brandingType === 'Default'){
     this.addMicroSite.patchValue({primaryColor: '#0279FF',
     secondaryColor: '#CCCCCC'})
    }
 
  }
  deleteMicrosite(item: any,ind: any,content: any) {
    this.micrositeId = item.id
    this.dialogService.open(content,{size:'md'});
  }
  DeleteMicrosite(){
  let micrositeId = this.micrositeId
  this.micrositeloader=true;
  this.subscription.push(this.communityService.DeleteMicrosite(micrositeId).subscribe((res: any) => {
      this.GetMicrosites();
      this.getPredefinedCommunities();
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err,false);
     
      this.micrositeloader=false;
    }));
  }
}

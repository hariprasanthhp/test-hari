import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { OntCategoryConfigurationService } from 'src/app/cco/operations/cco-subscriber-operations/cco-subscriber-profile/ont-category-configuration.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { SubscriberService } from '../../../cco-subscriber-templates/subscriber-templates/subscribers/service/subscriber.service';
import { ProfileService } from '../../profile.service';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { ManagementService } from 'src/app/support/netops-management/subscriber-management/service/management.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { element } from 'protractor';
import { AddNewcategoriesOntComponent } from './add-newcategories-ont/add-newcategories-ont.component';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  @Output() private globleVlanErrMsg: EventEmitter<any> = new EventEmitter();

  @ViewChild(AddNewcategoriesOntComponent) childSubsDetails: AddNewcategoriesOntComponent;
  globleVlanErr: boolean = false;
  language: any;
  languageSubject: any;
  subscriberTemplateList: any = [{ name: "" }];
  serviceTemplateList: any = [];
  loading: boolean;
  error: boolean;
  bandWidthData: any = [{ name: "" }];
  errorInfo: any;
  successInfo: any;
  success: boolean = false;
  myForm: FormGroup;
  bandwidthForm: FormGroup;
  _addProfileObj: any = {};
  datatype: boolean = false;
  voicetype: boolean = false;
  videotype: boolean = false;
  submitted: boolean = false;
  issubscribertype: boolean = false;
  isbandwidthtype: boolean = false;
  isserviceDefinitiontype: boolean;
  isouimatch: boolean = false;
  name: boolean;
  dnsserver: boolean;
  list: any;
  ouiMatchData: any = [{ name: "" }];


  _buildProfileObj: any = {}
  categoryConfigurationSubject;
  categoryConfigData: any;
  groupOfCategory: [];
  selectedCategoryType: any;
  tableOptions: DataTables.Settings = {
    searching: false,
    lengthChange: false,
    scrollX: true,
    paging: false,
    info: false
  };
  categoryListData: any = [];
  selectedCategory: any;
  exisitingCategory: any = [];
  nonRemovableCategory: any = ['DNS Host Mapping', 'Set Parameter Value', 'QoS Rule', 'Wi-Fi SSID', 'Wi-Fi SSID For EXOS'];
  readonly NEW_CATEGORY_BUTTON_DISABLE = ['Bandwidth', 'DHCP Option82', 'Video - Multicast Range Filters', 'Video - Multicast VLAN Registration (MVR)'];
  showcevlan: boolean = true;
  voiceProfileList: any[];
  Showprofile: boolean = true;
  voiceService: any;
  getAllDialPlanSubscribe: any;
  dialPlanList: any;
  systemGetSubs: any;
  upstreamPir: '';
  downstreamPir: '';
  upstreamCir: '';
  downstreamCir: '';
  defaultBW: boolean = false;
  dev: boolean;
  subscriberList: any;


  //userselectedvalue: { DATA: number =; VOICE: number; VIDEO: number; };
  @Input()
  set buildProfileObj(value: any) {
    this._buildProfileObj = value;
  }
  get buildProfileObj() {
    return this._buildProfileObj;
  }


  isMulticastRange: boolean;
  MulticastRangeData: any = [{ name: "" }];
  MulticastVlansData: any = [{ name: "" }];
  MulticastRange = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }];
  MulticastVlans = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  MulticastRangetext = [{ 0: 'Filter #1 Starting IP Address', 1: 'Filter #1 Ending IP Address' }, { 0: 'Filter #2 Starting IP Address', 1: "Filter #2 Ending IP Address" },
  { 0: 'Filter #3 Starting IP Address', 1: 'Filter #3 Ending IP Address' }, { 0: 'Filter #4 Starting IP Address', 1: "Filter #4 Ending IP Address" },
  { 0: 'Filter #5 Starting IP Address', 1: 'Filter #5 Ending IP Address' }, { 0: 'Filter #6 Starting IP Address', 1: "Filter #6 Ending IP Address" },
  { 0: 'Filter #7 Starting IP Address', 1: 'Filter #7 Ending IP Address' }, { 0: 'Filter #8 Starting IP Address', 1: "Filter #8 Ending IP Address" }]
  MVRIdText = ['1st MVR VLAN ID', '2nd MVR VLAN ID', '3rd MVR VLAN ID', '4th MVR VLAN ID']
  MVRRangeText = ['1st VLAN - Total # of Range(s)', '2nd VLAN - Total # of Range(s)', '3rd VLAN - Total # of Range(s)', '4th VLAN - Total # of Range(s)']

  MulticastvlanRangestarttext = [{ 0: '1st VLAN - Range #1 Starting IP Address', 1: '1st VLAN - Range #2 Starting IP Address', 2: '1st VLAN - Range #3 Starting IP Address', 3: '1st VLAN - Range #4 Starting IP Address' },
  { 0: '2nd VLAN - Range #1 Starting IP Address', 1: '2nd VLAN - Range #2 Starting IP Address', 2: '2nd VLAN - Range #3 Starting IP Address', 3: '2nd VLAN - Range #4 Starting IP Address' },
  { 0: '3rd VLAN - Range #1 Starting IP Address', 1: '3rd VLAN - Range #2 Starting IP Address', 2: '3rd VLAN - Range #3 Starting IP Address', 3: '3rd VLAN - Range #4 Starting IP Address' },
  { 0: '4th VLAN - Range #1 Starting IP Address', 1: '4th VLAN - Range #2 Starting IP Address', 2: '4th VLAN - Range #3 Starting IP Address', 3: '4th VLAN - Range #4 Starting IP Address' }]
  MulticastvlanRangeendtext = [{ 0: '1st VLAN - Range #1 Ending IP Address', 1: '1st VLAN - Range #2 Ending IP Address', 2: '1st VLAN - Range #3 Ending IP Address', 3: '1st VLAN - Range #4 Ending IP Address' },
  { 0: '2nd VLAN - Range #1 Ending IP Address', 1: '2nd VLAN - Range #2 Ending IP Address', 2: '2nd VLAN - Range #3 Ending IP Address', 3: '2nd VLAN - Range #4 Ending IP Address' },
  { 0: '3rd VLAN - Range #1 Ending IP Address', 1: '3rd VLAN - Range #2 Ending IP Address', 2: '3rd VLAN - Range #3 Ending IP Address', 3: '3rd VLAN - Range #4 Ending IP Address' },
  { 0: '4th VLAN - Range #1 Ending IP Address', 1: '4th VLAN - Range #2 Ending IP Address', 2: '4th VLAN - Range #3 Ending IP Address', 3: '4th VLAN - Range #4 Ending IP Address' }]
  isMulticastVLAN: boolean;
  userselectedvalue = {
    DATA: null,
    VOICE: null,
    VIDEO: null
  }

  @Input()
  set addProfileObj(value: any) {
    this._addProfileObj = value;
    this.voiceService = value?.buildProfile?.voiceDataVideoServiceData?.parameterValues?.Type ? value?.buildProfile?.voiceDataVideoServiceData?.parameterValues?.Type : 'SIP'
    if (this.addProfileObj.buildProfile.property?.Vlans?.length != 0) {
      this.addProfileObj.buildProfile.property?.Vlans?.forEach(element => {
        this.createVlans.push(Number(element));
      });

    }
    this.myForm.patchValue({
      typeofprofile: this.addProfileObj.buildProfile.typeofprofile,
    })
    //  console.log(this._addProfileObj, "setsdfsd");
  }

  get addProfileObj() {
    return this._addProfileObj;
  }
  isCOC: boolean = false;
  constructor(private translateService: TranslateService,
    private subscriberService: SubscriberService,
    private formBuilder: FormBuilder,
    private commonOrgService: CommonService,
    private fb: FormBuilder,
    private service: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryConfigService: OntCategoryConfigurationService,
    private managementService: ManagementService, private ssoService: SsoAuthService,) {
    this.orgId = this.ssoService.getOrgId();
    this.getDialPlanList()
    let base = `${environment.API_BASE}`;
    this.isCOC = this.router.url.includes('cco/services')
    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.dev = true;
    }
    this.myForm = this.formBuilder.group({
      typeofprofile: ["", Validators.required],
      serviceType: ['', Validators.required],
      serviceTemplateName: ['', Validators.required],
      tierName: [''],
      ouiMatchListName: [''],
      multicastRangeName: [''],
      multicastVlanName: [''],
      //tagAction: [""]
    });
  }


  SubscriberForm = this.fb.group({
    serviceType: ['', Validators.required],
    ceVlan: ['', [Validators.required, Validators.pattern("^[1-9][0-9]*$"), Validators.max(4094)]],
    Type: ['SIP'],
    X_000631_MaxStreams:[0,[ Validators.max(512)]],
    vlans: [''],
    vlanMode: ['N2ONE'],
    vlanType: ['Static', Validators.required],
    globalVlan: [''],
    subscribersPerVlan: [''],
    h248Profile: [""],
    dialPlan: [""],
    sipProfile: [""],
    multicastProfile: [""],
    DNSservers: [""],
    domainname: [""],
    primaryDnsServer: ['', [ipaddressvalidation]],
    secondaryDnsServer: ['', [ipaddressvalidation]],
    dnsprimary: [""],
    dnssecondary: [""],
    igmpProfile: [""],
    VlanTagAction: true
  });

  MulticastVlanForm = this.fb.group({
    totalvlans: [1],
    vlans: this.formBuilder.array([])
  })

  addmulticastvlanItem(): void {
    const add = this.MulticastVlanForm.get('vlans') as FormArray;
    add.push(this.fb.group({
      vlanId: ['', [Validators.required, Validators.max(4095), Validators.min(1)]],
      totalrange: [1],
      ranges: this.formBuilder.array([])
    }));
  }
  addmultivlanrange(i): void {
    // const add = this.multicastvlansvalid[i].get('ranges') as FormArray;
    const add = this.ranges(i)
    add.push(this.fb.group({
      start: ['', [Validators.required, ip4addressvalidation]],
      end: ['', [Validators.required, ip4addressvalidation]]
    }, {
      validator: iprangevalidation.bind(add.length)
    }));
  }
  deletemulticastvlanItem(index: number) {
    const add = this.MulticastVlanForm.get('vlans') as FormArray;
    add.removeAt(index)
  }
  deleteaddmultivlanrange(index: number) {
    const add = this.ranges(index)
    add.removeAt(index)
  }
  ouimatchForm = this.fb.group({
    ouiListValues: this.formBuilder.array([])
  })
  MulticastRangeForm = this.fb.group({
    totalno: [1],
    filters: this.formBuilder.array([])
  })

  addmultirangeItem(): void {
    const add = this.MulticastRangeForm.get('filters') as FormArray;
    add.push(this.fb.group({
      start: ['', [Validators.required, ip4addressvalidation]],
      end: ['', [Validators.required, ip4addressvalidation]]
    }, {
      validator: iprangevalidation.bind(add.length)
    }));
    //console.log(add)
    // validator: iprangevalidation(add.controls[add.length], add.controls[add.length])
  }
  deletemultirangeItem(index: number) {
    const add = this.MulticastRangeForm.get('filters') as FormArray;
    add.removeAt(index)
  }
  orgId: any;
  getDialPlanList() {
    if (this.getAllDialPlanSubscribe) this.getAllDialPlanSubscribe.unsubscribe();
    this.getAllDialPlanSubscribe = this.managementService.getDialPlanList(this.orgId).subscribe((res: any) => {
      if (res) {
        this.dialPlanList = [];
        for (var i = 0; i < res?.length; i++) {
          let data = {
            "value": res[i]._id,
            "displayName": res[i].name
          }
          this.dialPlanList.push(data)
        }

      }
    }, (err: HttpErrorResponse) => {
    }, () => {
    });
  }
  patchlist() {
    let data = this.addProfileObj.buildProfile.property.oui ? this.addProfileObj.buildProfile.property.oui : [];

    this.ouimatchForm.get('ouiListValues').reset();
    this.list = this.ouimatchForm.get('ouiListValues') as FormArray;
    data.forEach(element => {
      this.list.push(this.fb.group({
        ouivalue: [element, [Validators.required, ouivalidation, duplicatevalidation.bind(this.addProfileObj)]]
      }));
    });
    return this.list;
  }
  patchmultirangelist() {
    let data = this.addProfileObj.buildProfile.property.multirange ? this.addProfileObj.buildProfile.property.multirange : [];
    this.addProfileObj.buildProfile.property.totalno = data?.length
    this.MulticastRangeForm.get('filters').reset();
    this.list = this.MulticastRangeForm.get('filters') as FormArray;
    data.forEach(element => {
      this.list.push(this.fb.group({
        start: [element.start, [Validators.required, ip4addressvalidation]],
        end: [element.end, [Validators.required, ip4addressvalidation]]
      }, {
        validator: iprangevalidation.bind(this.list.length)
      }));
    });
    return this.list;
  }
  voiceServiceType() {
    this.voiceService = this.SubscriberForm.value.Type
    //if(this.voiceService !== "H.248") this.SubscriberForm.controls['h248Profile'].clearValidators();
    this.selectedCategory = 'Voice Service';
    this.clearFormValue('VOICE')
    this.categoryChange()
    this.childSubsDetails.categoryTypeChange(this.selectedCategoryType);
  }
  patchmulticastVlanlist() {
    let data = this.addProfileObj.buildProfile.property.multicastvlans ? this.addProfileObj.buildProfile.property.multicastvlans : [];
    this.addProfileObj.buildProfile.property.totalvlans = data.length;
    this.MulticastVlanForm.get('vlans').reset();
    this.list = this.MulticastVlanForm.get('vlans') as FormArray;
    let i = 0;
    data.forEach(element => {
      let ranges;
      this.list.push(this.fb.group({
        vlanId: [element.vlanId, [Validators.required]],
        totalrange: [element.ranges.length],
        ranges: this.formBuilder.array([])
      }))
      element.ranges.forEach(element => {
        ranges = this.ranges(i)
        ranges.push(this.fb.group({
          start: [element.start, [Validators.required, ip4addressvalidation]],
          end: [element.end, [Validators.required, ip4addressvalidation]]
        }, {
          validator: iprangevalidation.bind(ranges.length)
        }));
      });
      i++;
    })
    return this.list;
  }
  addItem(): void {
    const add = this.ouimatchForm.get('ouiListValues') as FormArray;
    add.push(this.fb.group({
      ouivalue: ['', [Validators.required, ouivalidation, duplicatevalidation.bind(this.addProfileObj)]],
    }));
  }

  deleteItem(index: number) {
    const add = this.ouimatchForm.get('ouiListValues') as FormArray;
    add.removeAt(index)
  }

  createouiListValues(): FormGroup {
    return this.formBuilder.group({
      ouivalue: ['', [Validators.required, ouivalidation]],
    });
  }

  loadServices = true;

  ngOnInit(): void {
    this.getCategoryObj();
    this.globleVlanErrMsg.emit(true);
 
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    // this._addProfileObj.build.isvalid = false;

    // if (this.route.snapshot.paramMap.get("id")) {

    //   this.name = true;
    // }
    // else {
    //   this.name = false;
    // }
    this.route.queryParams.subscribe((params: any) => {
      if (params['name']) {
        this.name = true;
      } else {
        this.name = false;
      }
    }, err => {
      this.name = false;
    })



    this.ouimatchForm.valueChanges.subscribe(formValue => {
      this._addProfileObj.buildProfile.property.oui = [];
      formValue.ouiListValues.forEach(element => {
        this._addProfileObj.buildProfile.property.oui.push(element?.ouivalue)
      });
      
        this._addProfileObj.buildProfile.allfieldvalid = true;
    })

    this.MulticastRangeForm.valueChanges.subscribe(formValue => {
      this.addProfileObj.buildProfile.property.multirange = formValue.filters;
      if (!this.MulticastRangeForm.valid)
        this._addProfileObj.buildProfile.allfieldvalid = false;
      else
        this._addProfileObj.buildProfile.allfieldvalid = true;
    })
    this.MulticastVlanForm.valueChanges.subscribe(formValue => {
      this.addProfileObj.buildProfile.property.multicastvlans = formValue.vlans;
      if (!this.MulticastVlanForm.valid)
        this._addProfileObj.buildProfile.allfieldvalid = false;
      else
        this._addProfileObj.buildProfile.allfieldvalid = true;
    })

    this.bandwidthForm = this.formBuilder.group({
      upstreamPir: ["", [Validators.max(97656)]],
      downstreamPir: ['', [Validators.max(97656)]],
      upstreamCir: ['', [Validators.max(97656)]],
      downstreamCir: ["", [Validators.max(97656)]]
    });
    this.bandwidthForm.valueChanges.subscribe(formValue => {
      if (this.addProfileObj.buildProfile.typeofprofile == "bandWidth_profile") {
        this.addProfileObj.buildProfile.property.bandwidth = formValue;

        if (!this.bandwidthForm.valid || (this.bandwidthForm.controls.upstreamCir.value > (this.bandwidthForm.controls.upstreamPir.value || this.bandwidthForm.controls.upstreamPir.value == 'undefined'))
          || (this.bandwidthForm.controls.downstreamCir.value > (this.bandwidthForm.controls.downstreamPir.value || this.bandwidthForm.controls.downstreamPir.value == 'undefined'))) {
          this._addProfileObj.buildProfile.allfieldvalid = false;
        }
        else this._addProfileObj.buildProfile.allfieldvalid = true;
      }
    })

    this.myForm.valueChanges.subscribe(formValue => {
      //  console.log(formValue, "vlues of dserivve ")&& formValue.bandWidths  profileForm.valid
      if (this.addProfileObj.buildProfile.typeofprofile == "service_Definition_Profile") {
        this.addProfileObj.buildProfile.property.servicedefinition = formValue;
        if (formValue.serviceTemplateName) {
          this._addProfileObj.buildProfile.allfieldvalid = true;
        }
        else this._addProfileObj.buildProfile.allfieldvalid = false;
      }
    })


    this.SubscriberForm.valueChanges.subscribe(formValue => {
      //console.log(formValue, this.SubscriberForm.controls.value, "vlues of dserivve ", this.addProfileObj.buildProfile.property.CeVlan, this.addProfileObj.buildProfile.property.CeVlan?.value)
      // console.log(Object.entries(this.SubscriberForm.controls).map(([key, { errors }]) => [key, errors]))
      if (this.addProfileObj.buildProfile.typeofprofile == "subscriber_profile") {
        this.addProfileObj.buildProfile.property.servicetemplate = formValue;


        // if (!this.SubscriberForm.invalid && this.addProfileObj.buildProfile.property.Vlans.length != 0) {
        //   let cevlan = this.addProfileObj.buildProfile.property.CeVlan;
        //   if (cevlan) {
        //     if (this.addProfileObj.buildProfile.property.CeVlan <= 4094)
        //       this._addProfileObj.buildProfile.allfieldvalid = true;
        //     else
        //       this._addProfileObj.buildProfile.allfieldvalid = false;
        //     //this._addProfileObj.buildProfile.allfieldvalid = true;
        //   }

        //   else {
        //     this._addProfileObj.buildProfile.allfieldvalid = true;

        //   }

        // }
        if (this.SubscriberForm.invalid)
          this._addProfileObj.buildProfile.allfieldvalid = false;
        else this._addProfileObj.buildProfile.allfieldvalid = true;
      }
    })

    // else if (this.addProfileObj.buildProfile.typeofprofile == "subscriber_profile") {
    //   this._addProfileObj.buildProfile.isvalid = true;
    // }

    if (this.addProfileObj?.buildProfile?.typeofprofile) this.ontypechange(this.addProfileObj?.buildProfile?.typeofprofile);
    else this.myForm.patchValue({ typeofprofile: '' })
    // if(this.addProfileObj?.buildProfile?.typeofprofile=="service_Definition_Profile"){
    //   this.ShowProfile();
    // }
    this.getDetailsofTemplates();
    this.ShowProfile();
    this.bandWidthData.forEach(el => {
      if (el?.name === 'COC_VOICE_BW_TIER_DEFAULT') {
        this.defaultBW = true
      }
    })
    // this.myForm.patchValue({tierName:this.addProfileObj?.buildProfile?.property?.servicedefinition?.tierName?this.addProfileObj?.buildProfile?.property?.servicedefinition?.tierName:this.defaultBW?'COC_VOICE_BW_TIER_DEFAULT':''})
  }
  get ouivalid() {
    return this.ouimatchForm.controls;
  }
  get ouivalues() {
    return (this.ouimatchForm.get('ouiListValues') as FormArray).controls;
  }

  get multirangevalid() {
    return (this.MulticastRangeForm.get('filters') as FormArray).controls;
  }
  get multicastvlansvalid() {
    return (this.MulticastVlanForm.get('vlans') as FormArray).controls;
  }
  multicastvlans(): FormArray {
    return this.MulticastVlanForm.get('vlans') as FormArray;
  }
  ranges(empIndex: number): FormArray {
    return this.multicastvlans()
      .at(empIndex)
      .get('ranges') as FormArray;
  }

  MulticastRangeChange() {
    let count: number, selectednumber: number
    selectednumber = this.MulticastRangeForm.controls.totalno.value;
    let totalno = this.MulticastRangeForm.controls.filters.value;
    if (totalno.length < selectednumber) {
      count = selectednumber - totalno.length;
      for (let i = 0; i < count; i++)
        this.addmultirangeItem()
    }
    else if (totalno.length > selectednumber) {
      for (let i = totalno.length; i > selectednumber; i--)
        this.deletemultirangeItem(i - 1);
    }

  }
  MulticastvlansChange() {
    let noofvlans_selected: number, totalvlans, count;
    noofvlans_selected = this.MulticastVlanForm.controls.totalvlans.value;
    totalvlans = this.MulticastVlanForm.controls.vlans.value;
    if (totalvlans.length < noofvlans_selected) {
      count = noofvlans_selected - totalvlans;
      for (let i = totalvlans.length; i < noofvlans_selected; i++) {
        this.addmulticastvlanItem();
        this.addmultivlanrange(i);
      }
    }
    else if (totalvlans.length > noofvlans_selected) {
      for (let i = totalvlans.length; i > noofvlans_selected; i--) {
        // this.deleteaddmultivlanrange(i);
        this.deletemulticastvlanItem(i - 1);
      }
    }

  }
  MulticastvlansRangeChange(index) {
    let noofrange_selected: number, totalrange, count;
    totalrange = this.ranges(index).value.length
    noofrange_selected = this.multicastvlans().at(index).get('totalrange').value;
    if (totalrange < noofrange_selected) {
      count = noofrange_selected - totalrange;
      for (let i = totalrange; i < noofrange_selected; i++) {
        this.addmultivlanrange(index);
      }
    }
    else if (totalrange > noofrange_selected) {
      for (let i = totalrange; i > noofrange_selected; i--) {
        this.deleteaddmultivlanrange(index);
      }
    }
  }
  removevalidationforsip() {
    // if ((this.SubscriberForm.controls.priH248GwController.value).length != 0) {

    //   this.SubscriberForm.controls['sipProxyServerAddress'].clearValidators();
    //   this.SubscriberForm.controls['sipProxyServerAddress'].updateValueAndValidity();
    // }
    // else {

    //   this.SubscriberForm.controls['sipProxyServerAddress'].setValidators([Validators.required]);
    //   this.SubscriberForm.controls['sipProxyServerAddress'].updateValueAndValidity();
    // }

  }
  removevalidationforprimary() {
    // if ((this.SubscriberForm.controls.sipProxyServerAddress.value).length != 0) {
    //   this.dnsserver = false;
    //   this.SubscriberForm.controls['priH248GwController'].clearValidators();
    //   this.SubscriberForm.controls['priH248GwController'].updateValueAndValidity();
    // }
    // else {
    //   this.dnsserver = false;
    //   this.SubscriberForm.controls['priH248GwController'].setValidators([Validators.required]);
    //   this.SubscriberForm.controls['priH248GwController'].updateValueAndValidity();
    // }
  }

  getDetailsofTemplates() {
    this.loading = true;
    this.voiceProfileList = []
    this.bandWidthData = [];
    this.ouiMatchData = [];
    this.MulticastRangeData = [];
    this.MulticastVlansData = [];
    this.addProfileObj?.buildProfile?.allProfileData.forEach(element => {
      if (element.type == "Subscriber Template(Voice)" || element.type == "Subscriber Template(Data)" || element.type == "Subscriber Template(Video)")
        this.subscriberTemplateList.push(element);
      else if (element.type == "Bandwidth Tier")
        this.bandWidthData.push(element);
      else if (element.type == "Oui Match List")
        this.ouiMatchData.push(element);
      else if (element.type == "Multicast Range")
        this.MulticastRangeData.push(element);
      else if (element.type == "Multicast VLAN")
        this.MulticastVlansData.push(element);
      if (element.type == "Subscriber Template(Video)") {
        this.voiceProfileList.push(element)
      }
    });
    this.loading = false;
  }
  ShowProfile() {
    this.Showprofile = false
    this.voiceProfileList.forEach(element => {
      if (element.name === this.myForm.value.serviceTemplateName) {
        this.Showprofile = true;
      }
    })

  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
  }

  clearFormValue(event) {
    if (event) {
      this.buildProfileObj.voiceDataVideoServiceData = undefined;
      this.buildProfileObj.all_service_field_valid = true;
    }
  }

  servicetypechanged(event) {
    this.submitted = false;
    let types = {
      DATA: 'Data Service',
      VOICE: 'Voice Service',
      VIDEO: 'Video Service'
    }

    // let cEVLAN = {
    //   DATA: 7,
    //   VOICE: 2,
    //   VIDEO: 7
    // }
    if (event) {
      //this.SubscriberForm.get('VlanTagAction').setValue(true);
      this.selectedCategory = types[event];
      this.categoryChange();

      // if (!this.userselectedvalue[event])
      //   this.SubscriberForm.get('ceVlan').setValue(cEVLAN[event]);
      // else
      //this.SubscriberForm.get('ceVlan').setValue(this.userselectedvalue[event]);
      //this.addProfileObj.buildProfile.property.CeVlan = cEVLAN[event];
    }
    if (this.SubscriberForm.controls.serviceType.value == 'DATA') {
      this.datatype = true;
    } else {
      this.datatype = false;
    }
    if (this.SubscriberForm.controls.serviceType.value == 'VIDEO') {
      // this.SubscriberForm.controls['multicastProfile'].setValidators([Validators.required]);
      // this.SubscriberForm.controls['multicastProfile'].updateValueAndValidity();
      this.videotype = true;
    }
    else {
      // this.SubscriberForm.controls['multicastProfile'].clearValidators();
      // this.SubscriberForm.controls['multicastProfile'].updateValueAndValidity();
      this.videotype = false;
    }

    if (this.SubscriberForm.controls.serviceType.value == "VOICE") {
      this.voicetype = true;
      // if (this.name == true) {
      //   if (this.addProfileObj.buildProfile.property?.sipProxyServerAddress) {
      //     // this.SubscriberForm.controls['secH248GwController'].setValidators([Validators.required]);
      //     // this.SubscriberForm.controls['secH248GwController'].updateValueAndValidity();
      //     this.SubscriberForm.controls['sipProxyServerAddress'].setValidators([Validators.required]);
      //     this.SubscriberForm.controls['sipProxyServerAddress'].updateValueAndValidity();
      //   }
      //   else {
      //     this.SubscriberForm.controls['priH248GwController'].setValidators([Validators.required]);
      //     this.SubscriberForm.controls['priH248GwController'].updateValueAndValidity();
      //   }
      // }
      // else {
      //   // this.SubscriberForm.controls['priH248GwController'].setValidators([Validators.required]);
      //   // this.SubscriberForm.controls['priH248GwController'].updateValueAndValidity();
      //   // // this.SubscriberForm.controls['secH248GwController'].setValidators([Validators.required]);
      //   // // this.SubscriberForm.controls['secH248GwController'].updateValueAndValidity();
      //   // this.SubscriberForm.controls['sipProxyServerAddress'].setValidators([Validators.required]);
      //   // this.SubscriberForm.controls['sipProxyServerAddress'].updateValueAndValidity();
      // }

    }
    else {
      this.voicetype = false;
      this.SubscriberForm.controls['h248Profile'].clearValidators();
      this.SubscriberForm.controls['h248Profile'].updateValueAndValidity();
      this.SubscriberForm.controls['dialPlan'].clearValidators();
      this.SubscriberForm.controls['dialPlan'].updateValueAndValidity();
      this.SubscriberForm.controls['sipProfile'].clearValidators();
      this.SubscriberForm.controls['sipProfile'].updateValueAndValidity();
    }
  }

  servicetypeselected(event, val?) {
    if (!val) this.myForm.patchValue({ tierName: this.defaultBW && event === 'VOICE' ? 'COC_VOICE_BW_TIER_DEFAULT' : '' })
    if (!val) this.myForm.patchValue({ serviceTemplateName: '' })
    let value = event ? event : this.myForm.value.serviceType
    this.systemGetSubs = this.service.getServiceTemplateType(this.orgId, value).subscribe((res: any) => {
      if (!val) this.myForm.patchValue({ serviceTemplateName: '' })
      this.serviceTemplateList = res ? res : []

    }, (err: HttpErrorResponse) => {

      this.pageErrorHandle(err);

    })
  }

  ontypechange(type) {
    if (this.addProfileObj.buildProfile) {
      this.addProfileObj.buildProfile.isvalid = true;
      this.addProfileObj.buildProfile.typeofprofile = type;
    }


    if (type == "subscriber_profile") {
      //console.log(this.addProfileObj.buildProfile.property.Servicetype, "servicetype")
      // let tagaction;
      // tagaction = this.addProfileObj.buildProfile.voiceDataVideoServiceData?.parameterValues?.VlanTagAction ? this.addProfileObj.buildProfile.voiceDataVideoServiceData?.parameterValues?.VlanTagAction : true;
      // this.onChangeVLANTagAction(tagaction)
      if (this.name || this.addProfileObj.buildProfile.property.servicetemplate) {
        let data = this.addProfileObj.buildProfile.property.servicetemplate;
        if (typeof data.VlanTagAction !== "undefined") {
          this.VlanTagAction = data.VlanTagAction;
        }
        this.SubscriberForm.patchValue({
          serviceType: data.serviceType ? data.serviceType : "",
          ceVlan: data.ceVlan ? data.ceVlan : "",
          Type: this.addProfileObj?.buildProfile?.voiceDataVideoServiceData?.parameterValues?.Type ? this.addProfileObj?.buildProfile?.voiceDataVideoServiceData?.parameterValues?.Type : "SIP",
          X_000631_MaxStreams: this.addProfileObj?.buildProfile?.voiceDataVideoServiceData?.parameterValues?.X_000631_MaxStreams ?this.addProfileObj?.buildProfile?.voiceDataVideoServiceData?.parameterValues?.X_000631_MaxStreams:0,
          vlanMode: data.vlanMode ? data.vlanMode : "N2ONE",
          vlanType: data.vlanType ? data.vlanType : data?.acsJsonb?.vlanType ? data?.acsJsonb?.vlanType : 'Static',
          globalVlan: data.globalVlan ? data.globalVlan : data?.acsJsonb?.globalVlan ? data?.acsJsonb?.globalVlan : '',
          subscribersPerVlan: data.subscribersPerVlan === 0 ? 0 : data.subscribersPerVlan ? data.subscribersPerVlan : "",
          h248Profile: data.h248Profile ? data.h248Profile : "",
          dialPlan: data.dialPlan ? data.dialPlan : "",
          primaryDnsServer: data.primaryDnsServer ? data.primaryDnsServer : '',
          secondaryDnsServer: data.secondaryDnsServer ? data.secondaryDnsServer : '',
          sipProfile: data.sipProfile ? data.sipProfile : "",
          multicastProfile: data.multicastProfile ? data.multicastProfile : "",
          igmpProfile: data.igmpProfile ? data.igmpProfile : '',
          DNSservers: data.DNSservers ? data.DNSservers : "",
          domainname: data.domainname ? data.domainname : "",
          dnsprimary: data.dnsprimary ? data.dnsprimary : "",
          dnssecondary: data.dnssecondary ? data.dnssecondary : "",
          VlanTagAction: (typeof data.VlanTagAction !== "undefined") ? data.VlanTagAction : true

        })
        this.onChangeVLANTagAction(this.SubscriberForm.controls.VlanTagAction.value)
      }

      this.onchangecevlan(this.addProfileObj.buildProfile.property.servicetemplate);
      this.servicetypechanged(this.SubscriberForm.controls.serviceType.value)
      this.issubscribertype = true;
      this.isbandwidthtype = false;
      this.isserviceDefinitiontype = false;
      this.isMulticastRange = false;
      this.isouimatch = false;
      this.isMulticastVLAN = false;
    }
    else if (type == "bandWidth_profile") {
      this._addProfileObj.buildProfile.allfieldvalid = true;
      this.isbandwidthtype = true;
      this.issubscribertype = false;
      this.isserviceDefinitiontype = false;
      this.isMulticastRange = false;
      this.isouimatch = false;
      this.isMulticastVLAN = false;
      if (this.name || this.addProfileObj.buildProfile.property.bandwidth) {
        this.bandwidthForm.patchValue({
          upstreamPir: this.service.convert_kbps_to(this.addProfileObj.buildProfile.property.bandwidth.upstreamPir, 'mbps', this.addProfileObj),
          downstreamPir: this.service.convert_kbps_to(this.addProfileObj.buildProfile.property.bandwidth.downstreamPir, 'mbps', this.addProfileObj),
          upstreamCir: this.service.convert_kbps_to(this.addProfileObj.buildProfile.property.bandwidth.upstreamCir, 'mbps', this.addProfileObj),
          downstreamCir: this.service.convert_kbps_to(this.addProfileObj.buildProfile.property.bandwidth.downstreamCir, 'mbps', this.addProfileObj)
        })
        this.upstreamPir = this.bandwidthForm.value.upstreamPir
        this.downstreamPir = this.bandwidthForm.value.downstreamPir
        this.upstreamCir = this.bandwidthForm.value.upstreamCir
        this.downstreamCir = this.bandwidthForm.value.downstreamCir
      }
    }
    else if (type == "service_Definition_Profile") {
      this.getDetailsofTemplates();
      this.isserviceDefinitiontype = true;
      this.isbandwidthtype = false;
      this.issubscribertype = false;
      this.isMulticastVLAN = false;
      this.isMulticastRange = false;
      this.isouimatch = false;
      this.bandWidthData.forEach(el => {
        if (el?.name === 'COC_VOICE_BW_TIER_DEFAULT') {
          this.defaultBW = true
        }
      })
      if (this.name || this.addProfileObj.buildProfile.property.servicedefinition) {
        let type = this.addProfileObj.buildProfile.property.servicedefinition.serviceType
        this.myForm.patchValue({
          typeofprofile: this.addProfileObj.buildProfile.typeofprofile,
          serviceType: this.addProfileObj.buildProfile.property.servicedefinition.serviceType,
          serviceTemplateName: this.addProfileObj.buildProfile.property.servicedefinition.serviceTemplateName,
          tierName: this.addProfileObj.buildProfile.property.servicedefinition.tierName ? this.addProfileObj.buildProfile.property.servicedefinition.tierName : (this.defaultBW && type === 'VOICE') ? 'COC_VOICE_BW_TIER_DEFAULT' : '',
          ouiMatchListName: this.addProfileObj.buildProfile.property.servicedefinition.ouiMatchListName,
          multicastRangeName: this.addProfileObj.buildProfile.property.servicedefinition.multicastRangeName,
          multicastVlanName: this.addProfileObj.buildProfile.property.servicedefinition.multicastVlanName,
          tagAction: this.addProfileObj.buildProfile.property.servicedefinition.tagAction,
        })
        if (this.myForm.value.serviceType) {
          this.servicetypeselected(this.myForm.value.serviceType, true)
        }

      }
    }
    else if (type == "oui_profile") {
      this.isserviceDefinitiontype = false;
      this.isbandwidthtype = false;
      this.issubscribertype = false;
      this.isMulticastRange = false;
      this.isouimatch = true;
      this.isMulticastVLAN = false;
      let add = this.ouimatchForm.get('ouiListValues') as FormArray;
      add.clear();
      if (this.name || this.addProfileObj.buildProfile.property?.oui?.length) {
        this.patchlist();
      }
      else {
        this.addItem();
      }
    }
    else if (type == "Multicast_Range_Profile") {
      this.isserviceDefinitiontype = false;
      this.isbandwidthtype = false;
      this.issubscribertype = false;
      this.isouimatch = false;
      this.isMulticastRange = true;
      this.isMulticastVLAN = false;
      let add = this.MulticastRangeForm.get('filters') as FormArray;
      add.clear();
      this.addProfileObj.buildProfile.property.totalno = 1
      if (this.name || this.addProfileObj.buildProfile.property?.multirange?.length) {
        this.patchmultirangelist();
      }
      else {
        this.addmultirangeItem();
      }
    }
    else if (type == "Multicast_Vlan_Profile") {
      this.isserviceDefinitiontype = false;
      this.isbandwidthtype = false;
      this.issubscribertype = false;
      this.isouimatch = false;
      this.isMulticastRange = false;
      this.isMulticastVLAN = true;
      let add = this.MulticastVlanForm.get('vlans') as FormArray;
      add.clear();
      this.addProfileObj.buildProfile.property.totalvlans = 1
      if (this.name || this.addProfileObj.buildProfile.property?.multicastvlans?.length) {
        this.patchmulticastVlanlist();
      }
      else {
        this.addmulticastvlanItem();
        this.addmultivlanrange(0);
      }
    }
    if (this.addProfileObj.buildProfile)
      this.addProfileObj.start.count = this.addProfileObj.start?.count + 1;
  }

  buffer(show) {
    console.log(show)
    this.loading = show
  }
  addVlans(r) {
    let reserved_vlan = [1002, 1003, 1004, 1005]
    if ((this.SubscriberForm.value.vlans == "" || !this.SubscriberForm.value.vlans || this.SubscriberForm.value.vlans == null)) {
      this.vlanempty = true;
      if (this.SubscriberForm.value.vlans == 0) {
        this.vlanmsg = this.language["please enter a value within the range 1 to 4094"];
      }
      else
        this.vlanmsg = ""
      //this.vlanmsg = this.language["New_Profile_Validation2"];
      return;
    }
    else if (this.createVlans.includes(this.SubscriberForm.value.vlans)) {
      this.vlanmsg = this.language['Duplicate VLAN ID'];
      this.vlanempty = true;
      return;
    }
    else if (reserved_vlan.includes(this.SubscriberForm.value.vlans)) {
      this.vlanmsg = this.language['vlan_msg'];
      this.vlanempty = true; return;
    }
    else if (this.SubscriberForm.value.vlans > 4094 || this.SubscriberForm.value.vlans <= 0) {
      this.vlanmsg = this.language["please enter a value within the range 1 to 4094"];
      this.vlanempty = true;
      return;
    }
    if (r == "ischange") {
      this.vlanempty = false;
      this.vlanmsg = ""
      return
    }
    else {
      this.createVlans.push(this.SubscriberForm.value.vlans);
      this.addProfileObj.buildProfile.property.Vlans.push(this.SubscriberForm.value.vlans);
      this.SubscriberForm.controls["vlans"].reset();
      this.vlanempty = true;
      this.vlanmsg = ""
      //this.SubscriberForm.value.Vlans = ""

    }
  }
  removeVlans(rid) {
    this.createVlans.splice(rid, 1);
    this.addProfileObj.buildProfile.property.Vlans.splice(rid, 1);
    //this.SubscriberForm.patchValue({vlans:this.addProfileObj.buildProfile.property.Vlans})
  }

  createVlans: any = [];
  vlanempty: boolean = false;
  vlanmsg: string;

  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

    this.categoryConfigurationSubject.unsubscribe();
    this.buildProfileObj.addNewCategory = false;
  }

  onaddCategClicked() {
    // if (this.buildProfileObj.exisitingCategory.length > 0) {
    // this.selectedCategory = this.categoryConfigData['Services'].filter(category => {
    //   return (this.buildProfileObj.exisitingCategory.indexOf(category.displayName) === -1 || this.nonRemovableCategory.indexOf(category.displayName) !== -1);
    // })[0].displayName;
    this.categoryChange();
    // }
    // this.buildProfileObj.addNewCategory = !this.buildProfileObj.addNewCategory;
  }
  serviceTypeList = [
    { label: 'SIP', value: 'SIP' },
    { label: 'H.248', value: 'H.248' },
    { label: 'MGCP', value: 'MGCP' },
    { label: 'TDM GW', value: 'X_000631_TDMGW' }
  ];
  categoryChange() {
    this.selectedCategoryType = undefined;
    for (let key of Object.keys(this.categoryConfigData)) {
      if (!this.selectedCategoryType) {
        this.selectedCategoryType = this.categoryConfigData[key].filter(category => {
          return (category.displayName === this.selectedCategory);
        })[0];
      }
    }
    this.buildProfileObj.categoryType = this.selectedCategory;
    this.selectedCategoryType.parameters.forEach(element => {
      if (element.name === 'Type') {
        element.defaultValue = this.SubscriberForm.value.Type
      }
    })
    if (this.name) {
      this.selectedCategoryType = Object.assign(this.selectedCategoryType, {
        params: this.addProfileObj.buildProfile.property
      })
    }
  }

  filterCategory(categoryname): boolean {
    return (this.buildProfileObj.exisitingCategory.indexOf(categoryname) === -1 || this.nonRemovableCategory.indexOf(categoryname) !== -1);
  }
  allowInteger() {
    this.SubscriberForm.patchValue({ X_000631_MaxStreams: parseInt(this.SubscriberForm.value.X_000631_MaxStreams) })
  }
  getCategoryObj() {
    this.categoryConfigurationSubject = this.categoryConfigService.categoryConfigData().subscribe(data => {
      this.categoryListData = data;
      this.groupOfCategory = _.uniq(_.map(data, 'group')).sort();
      this.categoryConfigData = _.mapValues(_.groupBy(data, 'group'),
        groupList => groupList.map(group => _.omit(group, 'group')));
      console.log('113', this.categoryConfigData);
      this.buildProfileObj.categoryConfigData = this.categoryConfigData;
      // this.selectedCategoryType = this.categoryConfigData['IP Addressing'].filter(category => {
      //   return (category.displayName === this.selectedCategory);
      // })[0];

      //this.onaddCategClicked();
    });
  }

  onChangeVLANTagAction(show: boolean = true) {
    // console.log(show, "change VLAN Tag Action");
    this.SubscriberForm.get('VlanTagAction').setValue(show);
    this.VlanTagAction = show;
    if (show) {
      this.showcevlan = true;
      this.SubscriberForm.controls['ceVlan'].setValidators([Validators.required, Validators.pattern("^[1-9][0-9]*$"), Validators.max(4094)]);
      this.SubscriberForm.controls['ceVlan'].updateValueAndValidity();
      // this.SubscriberForm.controls['ceVlan'] = this.addProfileObj.buildProfile.property.servicetemplate.ceVlan;
    } else {
      this.showcevlan = false;
      //this.SubscriberForm.patchValue({ ceVlan: null })
      this.SubscriberForm.controls['ceVlan'].clearValidators();
      this.SubscriberForm.controls['ceVlan'].updateValueAndValidity();
    }
  }
  onchangecevlan(value) {
    this.userselectedvalue[this.addProfileObj.buildProfile.property.servicetemplate?.serviceType] = this.addProfileObj.buildProfile.property.servicetemplate?.ceVlan
  }

  VlanTagAction = true;
  // onchangeRadio(value) {
  //   console.log(value, "change VLAN Tag Action");
  //   this.SubscriberForm.get('VlanTagAction').setValue(value);
  //   this.VlanTagAction = value;
  // }10.01

  restrictFloat(event, val) {
    // if(event.key==='.'){event.preventDefault();}
    // this[val]=parseInt(this.bandwidthForm.value[val])
  }
  removespecialcharacter(event, string?) {

    // var key;
    // key = event?.keyCode ? event?.keyCode : event;  //key = event.charCode;
    // // if (string == 'avoid_zero') {
    // //   if (this.SubscriberForm.value.subscribersPerVlan <= 0 && key == 0) {
    // //     this.SubscriberForm.get('subscribersPerVlan').setValue(null);
    // //     return ((key > 48 && key < 58));
    // //   }
    // // }
    // return ((key > 46 && key < 58));
  }
  StaticVLANAction(show: boolean = true) {
    let value = this.SubscriberForm.value.vlanType

  }
  DynamicVLANAction(evshow: boolean = false) {

  }
  validateForm(val) {
    let value = this.SubscriberForm.value.globalVlan
    if (value.length > 0) {
      if (value.length >= 1 && value.length <= 64) {
        this.globleVlanErr = false;
        this.globleVlanErrMsg.emit(false);
      } else {
        this.globleVlanErr = true;
        this.globleVlanErrMsg.emit(true);
      }
    }
  }

}

export function ouivalidation(control: AbstractControl): { [key: string]: any } | null {
  let PATERN = /^([0-9a-fA-F]{2}[:]){2}([0-9a-fA-F]{2})$/;
  if (!PATERN.test(control.value)) {
    return { 'addressName': true };
  } if (control.value === '00:00:00') {
    return { 'addressName': true };
  }
  return null;
}

export function ipaddressvalidation(control: AbstractControl): { [key: string]: any } | null {
  let IP_ADDRESS_PATERN = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (!IP_ADDRESS_PATERN.test(control.value) && control.value) {
    return { 'ipaddress': true };
  }
  // let highestByte = parseInt(control.value.split(".")[0]);
  // if (!((highestByte & 240) === 224))
  //   return { 'ipv4': true };

  return null;
}
export function ip4addressvalidation(control: AbstractControl): { [key: string]: any } | null {
  let IP_ADDRESS_PATERN = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (!IP_ADDRESS_PATERN.test(control.value) && control.value) {
    return { 'ipaddress': true };
  }
  let highestByte = parseInt(control.value.split(".")[0]);
  if (!((highestByte & 240) === 224))
    return { 'ipv4': true };

  return null;
}

export function duplicatevalidation(control: AbstractControl): { [key: string]: any } | null {
  let value = this.buildProfile;
  if (value?.property?.oui?.includes(control.value)) {
    return { 'duplicate': true };
  }
  return null;

}
export function iprangevalidation(control: AbstractControl): { [key: string]: any } | null {
  let value = this;
  const convertToNumericWeight = ip => {
    const [octet1, octet2, octet3, octet4] = ip.split('.').map(Number);
    return octet4 + (octet3 * 256) + (octet2 * 256 * 256) + (octet1 * 256 * 256 * 256);
  };
  // console.log(convertToNumericWeight(control.value.start));
  // console.log(convertToNumericWeight(control.value.end));
  if (!control.value.start || !control.value.end) {
    return null
  }
  // else if (convertToNumericWeight(control.value.start) == convertToNumericWeight(control.value.end)) {
  //   return { 'ipcompare': false };
  // }
  else if (convertToNumericWeight(control.value.start) > convertToNumericWeight(control.value.end)) {
    return { 'ipcompare': true };
  }
  return null;


}

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormGroupName, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeoCodingService } from 'src/app/shared/geo-coding.service';
import { WorkflowService } from 'src/app/support/netops-management/operations/services/workflow.service';
import { IssueService } from 'src/app/cco/issues/service/issue.service';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  isDev = false;
  loading = false;
  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';

  language: any;
  languageSubject;

  idErrorMsg = '';
  isEditPage = false;
  id: any = '';
  name: any = '';

  cmsandCmcdbForm : any

  axosForm :any;

  validParams: any = {};
  submitted: boolean = false;
  hasWriteAccess = false;
  hidepwd: boolean = true;
  hidepwdcm: boolean = true;
  cmsid: any;
  editparams: any;
  @ViewChild('cmsUpdateModal', { static: true }) private cmsUpdateModal: TemplateRef<any>;

  errors = {
    cmsUpdate: {
      message: '',
      error: false
    },
    latitude: {
      message: '',
      error: false
    },
    longitude: {
      message: '',
      error: false
    }
  }

  modalRef: any;
  isCmsUpdateInprogress = false;
  isAxos = false;
  isCms = false;
  showServiceAddressInp = true;
  regionsSubject: any;
  regionsDataArray: any[];
  regions: {};
  locationsSubject: any;
  locationDataArray: any;
  pageAcceesObs: any;
  hasPageAccess: boolean = true;
  constructor(private http: HttpClient,
    private sso: SsoAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private commonOrgService: CommonService,
    private translateServie: TranslateService,
    private fb: FormBuilder,
    private dialogService: NgbModal,
    private geoService: GeoCodingService,
    private issueService: IssueService,
    private workflowService: WorkflowService,
    private commonService: CommonFunctionsService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.axosForm = this.fb.group({
      name: ['', Validators.required],
      region: ['', [Validators.required, regionValidator]],
      newNetworkGroupUuid: ['', [Validators.required, locationValidator]],
      ufLocation: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });
    this.cmsandCmcdbForm = this.fb.group({
      name: ['', Validators.required],
      SOAP: this.fb.group({
        //soapAddress: ['', [Validators.required, Validators.pattern(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)]],
        // soapAddress: ['', [Validators.required, addressValidator]],
        // port: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
      }),
      // location: this.fb.group({
      //   ufLocation: ['', Validators.required],
      // }),
      cmsid: ['', [Validators.required, twoDigitValidator]],
      initialIpfixstate: true
    });
    this.pageAcceesObs = this.sso.hasPageAccess$.subscribe((json: any) => {
      if (json.access) {
        this.hasPageAccess = true;
      } else {
        this.hasPageAccess = false;
      }
    })
    if (environment['API_BASE_URL'].indexOf('dev.api.calix.ai') !== -1) {
      this.isDev = true;
    }
    this.language = this.translateServie.defualtLanguage;
    this.languageSubject = this.translateServie.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.setPageTitle();
    });

    this.setPageTitle();

    let id = this.route.snapshot.paramMap.get("id");

    if (id) {
      this.id = id;
      this.isEditPage = true;
      this.getRecordbyId(id);
      // this.getRegions();
    } else {
      this.isCms = true;
      this.cmsandCmcdbForm.valueChanges.subscribe(val => {
        this.disableSubmit = false;
      });
    }



    let scopes = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE && window.location.href.indexOf('/cco/system/cco-network-system/') !== -1) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        if (scopes?.['cloud.rbac.coc.operations.systemonboarding.cmsexacallhome']?.indexOf('write') !== -1) {
          this.hasWriteAccess = true;
        }
      }

    } else {
      this.hasWriteAccess = true;
    }

  }

  get formControls() { return this.isAxos ? this.axosForm.controls : this.cmsandCmcdbForm.controls; }

  goToList() {
    let networkSystemsListFilters = history?.state?.networkSystemsListFilters;

    if (window.location.href.indexOf('/systemAdministration/cco-admin/') !== -1) {
      this.router.navigate(['/systemAdministration/cco-admin/network-systems/list']);
    } else if (window.location.href.indexOf('/organization-admin/cco-admin/') !== -1) {
      this.router.navigate(['/organization-admin/cco-admin/network-systems/list']);
    } else {
      if (this.isAxos) {
        this.router.navigate(['/cco/operations/system-onboarding/axos-callhome/axos/list'], { state: { networkSystemsListFilters: networkSystemsListFilters } });
      } else {
        this.router.navigate(['/cco/operations/system-onboarding/cms-exa/list'], { state: { networkSystemsListFilters: networkSystemsListFilters } });
      }

    }

  }

  disableSubmit = true;
  onSubmit() {
    // console.log(this.cmsandCmcdbForm.value);
    this.submitted = true;
    if (!this.hasWriteAccess) {
      return;
    }

    if (this.isAxos) {
      this.saveAxosSystem();
      return;
    }

    if (!this.cmsandCmcdbForm?.valid) {
      return;
    }

    let cmsIdError;
    if (this.cmsandCmcdbForm.value.cmsid != null && this.cmsandCmcdbForm.value.cmsid != undefined && !this.isEditPage) {
      this.doCustomValidation('cmsid');
      cmsIdError = !this.cmsIdValidate.cmsid;
    }
    if (!this.cmsandCmcdbForm.value.cmsid || !this.cmsandCmcdbForm.value.SOAP.username || !this.cmsandCmcdbForm.value.SOAP.password || !this.cmsandCmcdbForm.value.name) {
      return
    }
    this.disableSubmit = true;

    let fields = this.cmsandCmcdbForm.value;
    //console.log(this.f);
    // if (this.cmsandCmcdbForm.invalid) {
    //   console.log("invalid form")
    //   this.disableSubmit = false;
    //   return;
    // }

    let protocolParams = {
      DATABASE: {
        ...{
          protocolType: 'DATABASE',
          dbName: "postgres"
        }, ...fields['DATABASE']
      },
      SOAP: {
        ...{
          protocolType: 'SOAP',
          path: "cmsexc/ex/netconf",
        }, ...fields['SOAP']
      }

    };

    let name = fields['name'].replace('device=', '');
    name = name.replace('DEVICE=', '');

    name = `DEVICE=${name}`

    let params: any = {
      name: name,
      type: "MGMT_SYSTEM",
      // location: {
      //   ufLocation: this.cmsandCmcdbForm.value.location.ufLocation
      // },
      manufacturer: "Calix",
      deviceModel: "CMS",
      managementState: "MANAGED",
      cmSyncFunction: {
        syncDirection: "DEVICE_IS_MASTER"
      },
      protocolInfos: [],
      resourceNameList: [
        {
          valueName: "cmsid",
          value: fields['cmsid']
        }
      ],
      extension: {
        extension: [{
          valueName: "initialIpfixstate",
          value: this.cmsandCmcdbForm.get('initialIpfixstate').value ? true : false
        }]
      }
    };

    params['protocolInfos'].push(protocolParams['SOAP']);
    params['protocolInfos'].push(protocolParams['DATABASE']);

    if (this.isEditPage) {
      params['uuid'] = this.data['uuid'];
    }

    if (this.id) {
      // let base = `${environment.API_BASE}`;
      // if (base.indexOf('/dev.api.calix.ai') > -1) {
      //   this.editparams = {
      //     "soapUserName": fields['SOAP'].username,
      //     "soapUserPassword": fields['SOAP'].password,
      //     "location": {
      //       "ufLocation": this.cmsandCmcdbForm.value.location.ufLocation,
      //     }
      //   }
      // } else {
      this.editparams = {
        "soapUserName": fields['SOAP'].username,
        "soapUserPassword": fields['SOAP'].password,
        "initialIpfixstate": String(fields['initialIpfixstate'])
      }

      if (this.data.protocolInfos) {
        let extensions = {};
        this.data?.extension?.extension?.forEach((ext: any) => {
          extensions[ext.valueName] = ext?.value == 'true' ? true : false;
        });
        let soapData: any = this.findObject(this.data.protocolInfos, 'SOAP');
        if (soapData.username !== fields['SOAP'].username || soapData.password !== fields['SOAP'].password || extensions['initialIpfixstate'] !== fields['initialIpfixstate']) {
          //console.log(soapData); return;
          if (this.modalRef) {
            this.close();
          }
          this.disableSubmit = false;
          this.isCmsUpdateInprogress = false;
          this.errors['cmsUpdate'].error = false;
          this.errors['cmsUpdate'].message = '';
          this.modalRef = this.dialogService.open(this.cmsUpdateModal, { windowClass: 'cms-update-modal' });
          return;
        }

      }

      this.goToList();


      // this.http.patch(`${environment.API_BASE_URL}cnap/invmgr/devices/${this.id}`, this.editparams).subscribe((json: any) => {
      //   this.disableSubmit = false;
      //   this.goToList();
      // }, (err: any) => {
      //   this.disableSubmit = false;
      //   this.pageErrorHandle(err);
      // });

    } else {
      this.loading = true;
      this.http.post(`${environment.API_BASE_URL}cnap/invmgr/devices`, params).subscribe((json: any) => {
        this.disableSubmit = false;
        this.loading = false;
        this.goToList();
        this.commonService.trackPendoEvents('Operations_Cloud','system added')
      }, (err: any) => {
        this.disableSubmit = false;
        this.loading = false;
        this.pageErrorHandle(err);
      });
    }



  }

  data: any;
  getRecordbyId(id) {
    this.loading = true;
    this.http.get(`${environment.API_BASE_URL}cnap/invmgr/devices/${id}`).subscribe((json: any) => {
      this.data = json;

      if (json && !json?.parentuuid && json?.deviceModel !== 'CMS') {
        this.isAxos = true;
      } else {
        this.isCms = true;
      }

      this.setPageTitle();
      let name = json['name'].replace('device=', '');
      name = name.replace('DEVICE=', '')

      if (this.isAxos) {
        let obj: any = {
          name: name,
          ufLocation: json?.location?.ufLocation,
          latitude: (json?.location?.point?.latitude)?.toString(),
          longitude: (json?.location?.point?.longitude)?.toString()
        };


        //for CCL-52186 - dev condition
        // if(this.isDev){
        if (json?.location?.geoTypeUserSelection == 'GEO_COORDINATES') {
          this.showServiceAddressInp = false;
        } else {
          this.showServiceAddressInp = true;
        }
        // }else{
        //   if (json?.location?.point?.latitude && !json?.location?.ufLocation) {
        //     this.showServiceAddressInp = false;
        //   }
        // }
        this.axosForm.patchValue(obj);

        this.http.get(`${environment.API_BASE_URL}nfa/systems/details/${id}`).subscribe((resp: any) => {
          this.getRegions(resp);

        }, (err: any) => {
          this.loading = false;
          this.pageErrorHandle(err);
        }, () => {
          // this.axosForm.valueChanges.subscribe(val => {
          //   this.disableSubmit = false;
          // });
        });



      } else {
        if (json.resourceNameList?.length !== 0) {
          for (var i = 0; i < json.resourceNameList.length; i++) {
            if (json.resourceNameList[i].valueName === 'cmsid') {
              this.cmsid = json.resourceNameList[i].value;
            }
          }
        }

        let extensions = {};
        json?.extension?.extension?.forEach((ext: any) => {
          extensions[ext.valueName] = ext?.value == 'true' ? true : false;
        });

        let obj = {
          name: name,
          SOAP: this.findObject(json.protocolInfos, 'SOAP'),
          DATABASE: this.findObject(json.protocolInfos, 'DATABASE'),
          cmsid: this.cmsid,
          initialIpfixstate: extensions['initialIpfixstate']
        };

        this.cmsandCmcdbForm.patchValue(obj);

        this.cmsandCmcdbForm.valueChanges.subscribe(val => {
          this.disableSubmit = true;

          if (this.data.protocolInfos) {
            let fields = this.cmsandCmcdbForm.value;
            let soapData: any = this.findObject(this.data.protocolInfos, 'SOAP');

            if (soapData.username !== fields['SOAP'].username || soapData.password !== fields['SOAP'].password || extensions['initialIpfixstate'] !== fields['initialIpfixstate']) {
              this.disableSubmit = false;
            }

          }
        });
        this.loading = false;
      }

    }, (err: any) => {
      this.loading = false;
      this.pageErrorHandle(err);
    }, () => {
      // this.loading = false;
    });
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  showSuccess(msg): void {
    this.closeAlert();
    this.successInfo = msg;
    this.success = true;
  }

  showError(msg): void {
    this.closeAlert();
    this.errorInfo = msg;
    this.error = true;
  }

  findObject(jsObjects, value: any) {
    let rtrn = {};
    for (var i = 0; i < jsObjects.length; i++) {
      if (jsObjects[i]['protocolType'] == value) {
        rtrn = jsObjects[i];
        break;
      }
    }

    return rtrn;
  }
  showPass(type) {
    if (type == 'CMS-DB')
      this.hidepwd = !this.hidepwd;
    else if (type == 'CMS')
      this.hidepwdcm = !this.hidepwdcm;
  }

  soapAddressError = false;
  dbAddressError = false;
  cmsIdValidate = {
    cmsid: true
  }
  doCustomValidation(fieldName: any) {
    let value = this.cmsandCmcdbForm.value[fieldName];
    if (value) {
      this.cmsIdValidate[fieldName] = (value >= 1 && value <= 16);
    }


  }

  close(): void {
    this.dialogService.dismissAll();
    this.modalRef?.close();
  }

  doUpdateCmsSystem() {
    // this.loading = true;
    this.isCmsUpdateInprogress = true;
    this.http.patch(`${environment.API_BASE_URL}cnap/invmgr/devices/${this.id}`, this.editparams).subscribe((json: any) => {
      this.disableSubmit = false;
      this.isCmsUpdateInprogress = false;
      this.close();
      // this.loading = false;
      this.goToList();
    }, (err: any) => {
      this.disableSubmit = false;
      this.isCmsUpdateInprogress = false;
      // this.loading = false;
      this.errors['cmsUpdate'].error = true;
      this.errors['cmsUpdate'].message = this.getApiError(err);
    });
  }

  getApiError(err: HttpErrorResponse) {
    if (err.status == 401) {
      return this.language['Access Denied'];
    } else {
      return this.commonOrgService.pageErrorHandle(err);
    }
  }

  saveAxosSystem() {
    this.loading = true;
    this.clearErrors();
    let params: any = {
      location: {
        geoTypeUserSelection: this.showServiceAddressInp ? 'SERVICE_ADDRESS' : 'GEO_COORDINATES',
        ufLocation: this.axosForm?.get('ufLocation').value,
        point: {
          elevation: 0,
          latitude: 0,
          longitude: 0
        }
      }
    };

    //console.log(this.axosForm.valid); return;
    if (this.axosForm?.get('newNetworkGroupUuid').value) {
      params['newNetworkGroupUuid'] = this.axosForm?.get('newNetworkGroupUuid').value;
    } else {
      this.loading = false;
      return;
    }

    //for CCL-52186 dev condition added
    // if(this.isDev){
    // params.location['geoTypeUserSelection'] = this.showServiceAddressInp ? 'SERVICE_ADDRESS' : 'GEO_COORDINATES';
    // }
    let loc_coordinates, get_type;
    if (this.showServiceAddressInp) {
      if (!this.axosForm?.get('ufLocation').value?.trim()) {
        this.loading = false;
        return;
      }
      loc_coordinates = {
        address: this.axosForm?.get('ufLocation').value
      }
      get_type = 'coordinates';
    } else {
      if (!this.axosForm?.get('latitude').value?.trim()) {
        this.errors['latitude']['error'] = true;
        this.errors['latitude']['message'] = this.language['Please enter the Latitude'];
        this.loading = false;
        return;
      }

      if (isNaN(this.axosForm?.get('latitude').value)) {
        this.errors['latitude']['error'] = true;
        this.errors['latitude']['message'] = this.language['Please enter the valid Latitude'];
        this.loading = false;
        return;
      }

      if (!this.axosForm?.get('longitude').value?.trim()) {
        this.errors['longitude']['error'] = true;
        this.errors['longitude']['message'] = this.language['Please enter the Longitude'];
        this.loading = false;
        return;
      }

      if (isNaN(this.axosForm?.get('longitude').value)) {
        this.errors['longitude']['error'] = true;
        this.errors['longitude']['message'] = this.language['Please enter the valid Longitude'];
        this.loading = false;
        return;
      }

      loc_coordinates = {
        latitude: this.axosForm?.get('latitude').value,
        longitude: this.axosForm?.get('longitude').value
      }
      get_type = 'address';
    }

    // if (!this.axosForm.valid) {
    //   return;
    // }

    this.disableSubmit = true;
    let canSave = true;

    this.geoService.getLatLonglocations(loc_coordinates, get_type).subscribe((response) => {
      let results = [];
      let data = response;


      if (data &&
        data['resourceSets'] &&
        data['resourceSets'].length > 0 &&
        data['resourceSets'][0].resources?.length > 0) {

        results = data['resourceSets'][0].resources;

        if (results && results.length) {
          if (this.showServiceAddressInp) {
            if (results[0] && results[0].geocodePoints && results[0].geocodePoints.length > 0) {
              let coordinatePoints = [];

              //display points
              coordinatePoints = results[0].geocodePoints.find((el) => el['usageTypes'].findIndex(type => type?.toLowerCase() === 'display') != -1);


              // else alternate points
              if (coordinatePoints && Object.entries(coordinatePoints).length > 0) {
                coordinatePoints = results[0].geocodePoints[0];
              }

              console.log(results[0].geocodePoints[0].coordinates);
              params['location']['point']['latitude'] = coordinatePoints['coordinates'][0];
              params['location']['point']['longitude'] = coordinatePoints['coordinates'][1];
            }
          } else {
            params['location']['point']['latitude'] = this.axosForm?.get('latitude').value;
            params['location']['point']['longitude'] = this.axosForm?.get('longitude').value;
            params['location']['ufLocation'] = results && results[0] && results[0]['name'] ? results[0]['name'] : '';
          }

        }

      } else {
        results = [];

        if (!this.showServiceAddressInp) {
          canSave = false;
          this.loading = false;
          this.disableSubmit = true;
          this.error = true;
          this.errorInfo = this.language['The co-ordinates(Latitude/Longitude) are invalid. Please enter valid co-ordinates.'];
          return;
        }
      }
    }, (error: any) => {
      this.loading = false;
      this.disableSubmit = false;
      this.pageErrorHandle(error);
    }, () => {
      if (canSave) {
        this.http.patch(`${environment.API_BASE_URL}cnap/invmgr/devices/${this.id}`, params).subscribe((json: any) => {
          this.disableSubmit = false;
          this.loading = false;
          this.goToList();
          this.commonService.trackPendoEvents('Operations_Cloud','system updated')
        }, (err: any) => {
          this.disableSubmit = false;
          this.loading = false;
          this.pageErrorHandle(err);
        });
      }
    });

  }


  showServiceAddress(value: any) {
    this.showServiceAddressInp = value;
    this.disableSubmit = false;
  }

  clearErrors() {
    this.errors = {
      cmsUpdate: {
        message: '',
        error: false
      },
      latitude: {
        message: '',
        error: false
      },
      longitude: {
        message: '',
        error: false
      }
    }
    this.error = false;
  }
  enforceMinMax(event, controlName) {
    setTimeout(() => {
      let value = this.workflowService.enforceMinMax(event);
      if (value != -1) {
        this.axosForm.get(controlName)
          .setValue(value);
      }
    }, 1000);
  }

  getRegions(deviceData?) {
    this.regionsSubject = this.http.get(`${environment.API_BASE_URL}nfa/regions?excludeMgmtSystem=true`)
      .subscribe((res: any) => {


        if (res) {
          let counts = {};
          res.forEach((x) => {
            counts[x.name] = (counts[x.name] || 0) + 1;
          });
          res.forEach((element) => {
            if (counts[element['name']] > 1) {
              element.name = element.name + " (" + element.fqn?.split('=')[1].split(',')[0] + ")";
            }
          });
          res?.sort();
          this.regionsDataArray = res;
          console.log(this.regionsDataArray)
          let data = {};
          res?.forEach(element => {
            data[element.name] = element.id;
          });

          this.regions = data;

          this.axosForm.get('region').setValue(deviceData['regionuuid'] ? deviceData['regionuuid'] : '');

          if (deviceData['locationuuid']) {
            this.loadLocationValue();
            this.axosForm.get('newNetworkGroupUuid').setValue(deviceData['locationuuid'] ? deviceData['locationuuid'] : '');
          }else{
            this.loading = false;
          }
          if (this.isAxos) {
            this.axosForm.valueChanges.subscribe(val => {
              this.disableSubmit = false;
            });
          }
          // this.getRecordbyId(this.id);

        }else{
          this.loading = false;
        }
      }, (error) => {
        this.loading = false;
        console.log(error);
      })
  }

  loadLocationValue(event?: any, locationuuid?: any) {
    this.axosForm.get('newNetworkGroupUuid').setValue('');
    if (this.axosForm.get('region').value) {
      this.locationsSubject = this.http.get(`${environment.API_BASE_URL}nfa/locations?tenant=0&region=${this.axosForm.get('region').value}`)
        .subscribe((res: any) => {
          res = this.issueService.appendFqn(res);
          this.locationDataArray = res;
          if (this.data?.location) {
            this.locationDataArray.forEach((element: any) => {
              if (element.name == this.data?.location) {
                this.axosForm.get('networkGroupUuid').setValue(element.id);
                return;
              }
            })
          }

          if (locationuuid) {
            this.axosForm.get('newNetworkGroupUuid').setValue(locationuuid);
          }
          this.loading = false;
        }, (error) => {
          this.loading = false;
        })
    }else{
      this.loading = false;
    }

  }
  ngOnDestroy(): void {
    if (this.pageAcceesObs) {
      this.pageAcceesObs.unsubscribe();
    }
  }

  setPageTitle() {
    if (this.isAxos) {
      this.titleService.setTitle(`Systems - AXOS Systems - ${this.language['System Onboarding']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else {
      this.titleService.setTitle(`CMS/EXA Systems - ${this.language['System Onboarding']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    }
  }

}



export function addressValidator(control: AbstractControl): { [key: string]: any } | null {
  let IP_ADDRESS_PATERN = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  let HOSTNAME_VALIDATION = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
  if (!HOSTNAME_VALIDATION.test(control.value) && !IP_ADDRESS_PATERN.test(control.value)) {
    return { 'addressName': true };
  }
  return null;

}

export function twoDigitValidator(control: AbstractControl): { [key: string]: any } | null {
  let regex = /^\s*(\d{1,2}|-\d+)?\s*$/;
  if (!control?.value) {
    return { 'isrequired': true };
  }
  if (!(control?.value > 0 && control?.value <= 16)) {
    return { 'minMaxError': true };
  }
  if (!regex.test(control.value)) {
    return { 'invalidNumber': true };
  }

  return null;

}

export function regionValidator(control: AbstractControl): { [key: string]: any } | null {
  if (!control?.value || !control?.value?.trim()) {
    return { 'isrequired': true };
  }

  return null;

}

export function locationValidator(control: AbstractControl): { [key: string]: any } | null {
  if (!control?.value || !control?.value?.trim()) {
    return { 'isrequired': true };
  }

  return null;

}

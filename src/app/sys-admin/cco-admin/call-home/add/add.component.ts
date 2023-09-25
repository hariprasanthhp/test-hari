import { Component, OnDestroy, OnInit } from '@angular/core';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import * as isCidr from 'is-cidr';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { GeoCodingService } from 'src/app/shared/geo-coding.service';
import { WorkflowService } from 'src/app/support/netops-management/operations/services/workflow.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { IssueService } from 'src/app/cco/issues/service/issue.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {

  data: any = {};
  isDev = false;
  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';

  language: any;
  languageSubject;

  idErrorMsg = '';
  isEditPage = false;
  id: any = '';

  region: any = '';
  location: any = '';

  serviceAddressErrorMsg = '';
  ORG_ID: any;
  regionSelected: string;
  locationSelected: string;
  regionsSubject: any;
  regionsDataArray: any = [];
  locationsSubject: any;
  locationDataArray: any;
  regionName: any;
  locationName: any;

  regions = {};
  hidepwd: boolean = true;
  submitted = false;
  //ufLocation: any;
  loading = false;

  callHomeForm = this.fb.group({
    deviceNameFormat: ['', [Validators.required, deviceNameFormatValidator]],
    id: ['', [Validators.required, idValidator.bind(this)]],
    region: [null, [Validators.required, regionValidator]],
    networkGroupUuid: [null, [Validators.required, locationValidator]],
    ufLocation: [''],
    latitude: ['', [latLongValidator.bind(this)]],
    longitude: ['', [latLongValidator.bind(this)]],
    distributedOltName: [''],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    connectTimeoutSec: [5, [Validators.min(5), Validators.max(90), Validators.pattern('^[0-9]*$'), validTime]]
  });
  hasWriteAccess: boolean;

  constructor(private http: HttpClient,
    private sso: SsoAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private commonOrgService: CommonService,
    private translateServie: TranslateService,
    private geoService: GeoCodingService,
    private workflowService: WorkflowService,
    private fb: FormBuilder,
    private titleService: Title,
    private issueService: IssueService) { }


  ngOnInit(): void {
    let scopes = this.sso.getScopes();
    if (scopes?.['cloud.rbac.coc.operations.systemonboarding.axoscallhome']?.indexOf('write') !== -1) {
      this.hasWriteAccess = true;
    }

    if (environment['API_BASE_URL'].indexOf('dev.api.calix.ai') !== -1) {
      this.isDev = true;
    }
    this.geoService.getLatLonglocations('chennai');
    let url = this.router.url;
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.language = this.translateServie.defualtLanguage;
    this.languageSubject = this.translateServie.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.titleService.setTitle(`Call Home - AXOS Systems - ${this.language['System Onboarding']} - ${this.language['Operations']}  - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`Call Home - AXOS Systems - ${this.language['System Onboarding']} - ${this.language['Operations']}  - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);


    let id = this.route.snapshot.paramMap.get("id");

    if (id) {
      this.id = id;
      this.isEditPage = true;
      //this.getRegions();
    }
    this.getRegions();
    this.data = {
      "deviceNameFormat": "",
      "id": "",
      "configUrl": "",
      "format": "NETCONF_XML",
      "operation": "MERGE",
      //"networkGroupPath": "",
      "distributedOltName": "",
      "username": "",
      "password": "",
      "sshKey": "",
      "urlPassword": "",
      "connectTimeoutSec": 60,
      "heartbeatIntervalSec": 15,
      "orgId": this.sso.getOrgId(),
      "tenantId": "",
      "deviceOrgId": "",
      "deviceTenantId": "",
      "ufLocation": "",
      "latitude": "",
      "longitude": ""
    }


  }

  goToList() {
    if ((window.location.href).indexOf("/system-onboarding/") !== -1) {
      this.router.navigate([`/cco/operations/system-onboarding/axos-callhome/callhome/list`]);
    } else if ((window.location.href).indexOf("/systemAdministration/") !== -1) {
      this.router.navigate(['/systemAdministration/cco-admin/call-home']);
    } else {
      this.router.navigate(['/organization-admin/call-home']);
    }
  }

  showPass() {
    this.hidepwd = !this.hidepwd;
  }

  onSubmit() {
    this.submitted = true;
    let fields = this.callHomeForm.value;
    this.clearErrors();
    //console.log(this.callHomeForm.valid); return;
    if (!this.callHomeForm.valid) {
      return
    };

    let params: any = {
      "id": fields["id"],
      "networkGroupUuid": `${fields['networkGroupUuid'].trim()}`,
      "distributedOltName": fields["distributedOltName"],
      "username": fields["username"],
      "password": fields["password"],
      "deviceNameFormat": fields["deviceNameFormat"],
      "connectTimeoutSec": fields["connectTimeoutSec"] ? fields["connectTimeoutSec"] : 5,
      "deviceLocation": {
        "geoTypeUserSelection": this.showServiceAddressInp ? 'SERVICE_ADDRESS' : 'GEO_COORDINATES',
        "ufLocation": fields['ufLocation'],
        "point": {
          "elevation": 0,
          "latitude": 0,
          "longitude": 0
        }
      }
    };

    //for CCL-52186 dev condition added
    // if(this.isDev){
    //   params.deviceLocation['geoTypeUserSelection'] = this.showServiceAddressInp ? 'SERVICE_ADDRESS' : 'GEO_COORDINATES';
    // }

    let lat_coordinates, get_type;
    if (fields['ufLocation']?.trim() && this.showServiceAddressInp) {
      lat_coordinates = {
        address: fields['ufLocation']
      };
      get_type = 'coordinates';
    } else if (!this.showServiceAddressInp && fields['latitude'] && fields['longitude']) {
      lat_coordinates = {
        latitude: fields['latitude'],
        longitude: fields['longitude']
      };
      get_type = 'address';
    } else {
      params['deviceLocation'] = null;
      this.save(params);
      return;
    }
    let canSave = true;

    this.geoService.getLatLonglocations(lat_coordinates, get_type).subscribe((response) => {
      let results = [];
      let data = response;

      if (data &&
        data['resourceSets'] &&
        data['resourceSets'].length > 0 &&
        data['resourceSets'][0].resources?.length > 0) {

        results = data['resourceSets'][0].resources;

        if (results && results.length) {

          if (fields['ufLocation']?.trim() && this.showServiceAddressInp) {
            if (results[0] && results[0].geocodePoints && results[0].geocodePoints.length > 0) {
              let coordinatePoints = [];

              //display points
              coordinatePoints = results[0].geocodePoints.find((el) => el['usageTypes'].findIndex(type => type?.toLowerCase() === 'display') != -1);


              // else alternate points
              if (coordinatePoints && Object.entries(coordinatePoints).length > 0) {
                coordinatePoints = results[0].geocodePoints[0];
              }

              console.log(results[0].geocodePoints[0].coordinates);
              params['deviceLocation']['point']['latitude'] = coordinatePoints['coordinates'][0];
              params['deviceLocation']['point']['longitude'] = coordinatePoints['coordinates'][1];
            }
          } else if (!this.showServiceAddressInp && fields['latitude'] && fields['longitude']) {
            params['deviceLocation']['point']['latitude'] = fields['latitude'];
            params['deviceLocation']['point']['longitude'] = fields['longitude'];
            params['deviceLocation']['ufLocation'] = results && results[0] && results[0]['name'] ? results[0]['name'] : '';
          }

        }

      } else {
        results = [];
        if (!this.showServiceAddressInp) {
          canSave = false;
          this.error = true;
          this.errorInfo = this.language['The co-ordinates(Latitude/Longitude) are invalid. Please enter valid co-ordinates.'];
          return;
        }
      }
    }, (error: any) => {
    }, () => {
      if (canSave) {
        this.save(params);
      }

    });

  }

  save(params: any) {
    //console.log(params); return;
    this.loading = true;
    if (this.isEditPage) {
      delete this.data['ufLocation'];
      delete this.data['latitude'];
      delete this.data['longitude'];
      const headers = new HttpHeaders();
      if (this.callHomeForm.get('region').value) {
        this.data.region = this.callHomeForm.get('region').value
      }
      if (this.callHomeForm.get('networkGroupUuid').value) {
        this.data.location = this.callHomeForm.get('networkGroupUuid').value
      }

      console.log(params);
      params = { ...this.data, ...params };
      console.log(params);
      this.http.put(`${environment.API_BASE_URL}cnap/invmgr/callhome/actions/${this.id}`, params, { headers, responseType: 'text' }).subscribe((json: any) => {
        console.log(json);
        this.loading = false;
        this.goToList();
      }, (err: any) => {
        this.pageErrorHandle(err);
      });

    } else {
      this.http.get(`${environment.API_BASE_URL}cnap/invmgr/callhome/actions/${encodeURIComponent(params['id'])}`).subscribe((json: any) => {
        this.validId = false;
        this.errorInfo = `${params['id']} already exists`;
        this.error = true;
        this.loading = false;
        return;
      }, (err: any) => {
        this.http.post(`${environment.API_BASE_URL}cnap/invmgr/callhome/actions`, params).subscribe((json: any) => {
          console.log(json);
          this.goToList();
        }, (err: any) => {
          this.pageErrorHandle(err);
        });
      });
    }
  }

  pageErrorHandle(err: HttpErrorResponse) {
    this.loading = false;
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

  getRecordbyId(id) {
    this.loading = true;
    this.http.get(`${environment.API_BASE_URL}cnap/invmgr/callhome/actions/${encodeURIComponent(id)}`).subscribe((json: any) => {
      console.log(json);
      this.data = json;

      this.callHomeForm.patchValue({
        deviceNameFormat: json?.deviceNameFormat,
        id: json?.id,
        distributedOltName: json?.distributedOltName,
        ufLocation: json?.deviceLocation?.ufLocation,
        latitude: (json?.deviceLocation?.point?.latitude)?.toString(),
        longitude: (json?.deviceLocation?.point?.longitude)?.toString(),
        username: json?.username,
        connectTimeoutSec: json?.connectTimeoutSec,
      });

      //for CCL-52186 - dev condition
      // if(this.isDev){
      if (json?.deviceLocation?.geoTypeUserSelection == 'GEO_COORDINATES') {
        this.showServiceAddressInp = false;
      } else {
        this.showServiceAddressInp = true;
      }
      // }else{
      //   if (json?.deviceLocation?.point?.latitude && !json?.deviceLocation?.ufLocation) {
      //     this.showServiceAddressInp = false;
      //   }
      // }

      this.regionsDataArray.forEach((element: any) => {
        if (element.name == this.data.region) {
          this.callHomeForm.get('region').setValue(element.id);
        }
      })
      this.loadLocationValue(id);

      if (json.networkGroupPath) {
        let arr = json['networkGroupPath'].split('/');
        this.callHomeForm.get('region').setValue(this.regions[arr[0]]);
        this.callHomeForm.get('networkGroupUuid').setValue(arr[1] ? arr[1] : null);
      }
      this.loading = false;


    }, (err: any) => {
      this.pageErrorHandle(err);
    });
  }

  validId = true;
  validDeviceNameFormat = true;
  deviceNameFormatErrorMsg = '';

  validateIp(value: any) {
    let ipFormat =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (!ipFormat.test(value)) {

      return false;
    }

    return true;

  }

  validateMAc(value: any) {

    return (/^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/).test(value) ? true : false;

  }

  validateIpSubnet(value: any) {
    let ipFormat =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    let ipArr = value ? value.split("/") : [];
    if (ipArr && ipFormat.test(ipArr[0])) {
      return this.checkSubnet(value);

    }

    return false;

  }

  checkSubnet(subnet) {
    if (subnet) {
      var rtn = true;
      var cidrArr = subnet.split(",");

      cidrArr.forEach((cidr: any) => {
        rtn = rtn && (isCidr.v4(cidr));
      });

      return rtn;
    } else {
      return false;
    }
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }

  getRegions() {
    this.loading = true;
    this.regionsSubject = this.http.get(`${environment.API_BASE_URL}nfa/regions/details?offset=0&limit=5000&excludeMgmtSystem=true`)
      .subscribe((res: any) => {
        res.regions.sort();
        res.regions = this.issueService.appendFqn(res.regions);
        this.regionsDataArray = [...this.regionsDataArray, ...res.regions];
        console.log(this.regionsDataArray)

        if (res.regions) {
          let data = {};
          res.regions.forEach(element => {
            data[element.name] = element.id;
          });

          this.regions = data;
          let id = this.route.snapshot.paramMap.get("id");
          if (id) {
            this.getRecordbyId(decodeURIComponent(id));
          }

        }
        this.loading = false;

      }, (error) => {
        this.loading = false;
        console.log(error);
      })
  }

  loadLocationValue(event: any) {
    this.callHomeForm.get('networkGroupUuid').setValue(null);
    if (this.callHomeForm.get('region').value) {
      this.locationsSubject = this.http.get(`${environment.API_BASE_URL}nfa/locations?tenant=0&region=${this.callHomeForm.get('region').value}`)
        .subscribe((res: any) => {
          this.locationDataArray = res;
          if (this.data?.location) {
            this.locationDataArray.forEach((element: any) => {
              if (element.name == this.data?.location) {
                this.callHomeForm.get('networkGroupUuid').setValue(element.id);
                return;
              }
            })
          }

        }, (error) => {
        })
    }

  }

  showServiceAddressInp = true;
  showServiceAddress(value: any) {
    this.showServiceAddressInp = value;
    if (value) {
      this.callHomeForm.controls.latitude.setValidators(null);
      this.callHomeForm.controls.latitude.updateValueAndValidity();
      this.callHomeForm.controls.longitude.setValidators(null);
      this.callHomeForm.controls.longitude.updateValueAndValidity();
    } else {
      this.callHomeForm.controls.latitude.setValidators([latLongValidator.bind(this)]);
      this.callHomeForm.controls.latitude.updateValueAndValidity();
      this.callHomeForm.controls.longitude.setValidators([latLongValidator.bind(this)]);
      this.callHomeForm.controls.longitude.updateValueAndValidity();
    }
  }
  enforceMinMax(event, coordinate) {
    setTimeout(() => {
      let value = this.workflowService.enforceMinMax(event);
      if (value != -1) {
        if (coordinate == 'latitude') {
          this.data.latitude = value;
        } else if (coordinate == 'longitude') {
          this.data.longitude = value;
        }
      }
    }, 1000);
  }

  clearErrors() {
    this.serviceAddressErrorMsg = '';
    this.error = false;
  }

  get formControls() { return this.callHomeForm.controls; }

}

export function deviceNameFormatValidator(control: AbstractControl): { [key: string]: any } | null {
  if (!control?.value) {
    return { 'isrequired': true };
  }

  return null;

}

export function idValidator(control: AbstractControl): { [key: string]: any } | null {
  if (!control?.value) {
    return { 'isrequired': true };
  }

  if (this.validateIp(control.value) || this.validateIpSubnet(control.value) || this.validateMAc(control.value)) {
    //nothing todo
  } else {
    return { 'invalidId': true };
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

export function latLongValidator(control: AbstractControl): { [key: string]: any } | null {
  if (!this.showServiceAddressInp && (!control?.value || !control?.value?.trim())) {
    return { 'isrequired': true };
  }

  if (!this.showServiceAddressInp && isNaN(control?.value)) {
    return { 'invalidValue': true };
  }

  return null;

}

export function validTime(control: AbstractControl): { [key: string]: any } | null {
  if (control?.value && !isNaN(control?.value) && (control?.value < 5 || control?.value > 90)) {
    return { 'invalidValue': true };
  }
  return null;
}


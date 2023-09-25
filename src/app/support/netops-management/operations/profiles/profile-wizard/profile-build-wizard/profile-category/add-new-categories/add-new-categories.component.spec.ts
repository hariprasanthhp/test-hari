import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { IPv6AddressService } from 'src/app/shared/services/ipv6-address.service';
import { CategoryConfigurationService } from 'src/app/support/netops-management/operations/services/category-config.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { SCOPES } from 'src/assets/mockdata/shared/services/scopes';
import { buildProfileObj, formField, formFieldArray, formFieldRequires, formGroup, formValue, newCategory } from 'src/assets/mockdata/support/netops-management/operations/profiles/profiles.data';
import { environment } from 'src/environments/environment';
import { AddNewCategoriesComponent } from './add-new-categories.component';

describe('AddNewCategoriesComponent', () => {
  let component: AddNewCategoriesComponent;
  let fixture: ComponentFixture<AddNewCategoriesComponent>;
  let profileService: CategoryConfigurationService;
  let languageService: TranslateService;
  let route: ActivatedRoute;
  let router: Router;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewCategoriesComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule, NgSelectModule, FormsModule, ReactiveFormsModule
      ],
      providers: [
        TranslateService, IPv6AddressService
      ]
    })
      .compileComponents().then(() => {
        profileService = TestBed.inject(CategoryConfigurationService);
        fixture = TestBed.createComponent(AddNewCategoriesComponent);
        languageService = TestBed.inject(TranslateService);
        component = fixture.componentInstance;
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        httpTestingController = TestBed.inject(HttpTestingController);
        component.categoryType = newCategory;
        component.buildProfileObj = buildProfileObj;
        fixture.detectChanges();
        localStorage.setItem('calix.scopes', JSON.stringify(SCOPES));
      });
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(AddNewCategoriesComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    let eng = new EnglishJSON;
    languageService.selectedLanguage.next(of(eng));
    environment.VALIDATE_SCOPE = "true";
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should onSubmit', () => {
    // component.categoryType = newCategory
    // component.selectedCategoryName = "ProtectIQ Security Settings"
    // spyOn(component, 'onSubmit').and.callThrough();
    // var form = component.myFormGroup;
    // component.onSubmit(form);
    // expect(component.onSubmit).toHaveBeenCalled();
    // expect(component.onSubmit).toHaveBeenCalledTimes(1);

    component._buildProfileObj.categoryList = [];
    component.selectedCategoryName = 'ExperienceIQ Restrictions';
    component.onSubmit({});
    component._buildProfileObj.categoryList = [];
    component.selectedCategoryName = 'ACL Entry for Remote Access';
    component.onSubmit({});
    component._buildProfileObj.categoryList = [];
    component.selectedCategoryName = 'ACL Entry for VoIP';
    component.onSubmit({});

    // component._buildProfileObj.categoryList = [];
    // component.selectedCategoryName = 'Firewall';
    // component.categoryType = [newCategory];
    // component.onSubmit(formField);

    component.selectedCategoryName = 'DHCP Server';
    component._buildProfileObj.categoryList = [];
    component.isSameNetworkIpAdrs = true;
    component.onSubmit({});

    component._buildProfileObj.categoryList = [1, 2, 3];
    component.onSubmit({
      value: {
        type: 'Bridge'
      }
    });

    component.passpoint = [1, 2, 3];
    component.onSubmit({});

  });

  it('should displayFormField', () => {
    //   // component.categoryType = newCategory
    //   component.selectedCategoryName = "ProtectIQ Security Settings"
    //   spyOn(component, 'displayFormField').and.callThrough();
    //   var form = component.myFormGroup;
    //   var _formFieldArray = [];
    //   component.displayFormField(formField, _formFieldArray);
    //   expect(component.displayFormField).toHaveBeenCalled();
    //   expect(component.displayFormField).toHaveBeenCalledTimes(1);
  });

  it('should displayFormFieldRequires', () => {
    // component.categoryType = newCategory
    component.selectedCategoryName = "Video Service"
    spyOn(component, 'displayFormField').and.callThrough();
    var form = component.myFormGroup;

    component.displayFormField(formFieldRequires, formFieldArray);
    expect(component.displayFormField).toHaveBeenCalled();
    expect(component.displayFormField).toHaveBeenCalledTimes(1);
  });

  it('should videoServiceFieldDisplay', () => {
    // component.categoryType = newCategory
    component.selectedCategoryName = "Data Service";
    spyOn(component, 'videoServiceFieldDisplay').and.callThrough();
    var form = component.myFormGroup;
    component.videoServiceFieldDisplay(formFieldRequires, formFieldArray, true);
    expect(component.videoServiceFieldDisplay).toHaveBeenCalled();
    expect(component.videoServiceFieldDisplay).toHaveBeenCalledTimes(1);
  });

  it('should formValuemEnumData', () => {
    // component.categoryType = newCategory
    component.selectedCategoryName = "Data Service";
    spyOn(component, 'formValuemEnumData').and.callThrough();
    var form = component.myFormGroup;
    var categoryType = newCategory.parameters;
    //   {
    //     "name": "X_CALIX_SXACC_BW_PROFILE",
    //     "displayName": "BW Profile",
    //     "description": "BW Profile",
    //     "type": "innerProfile",
    //     "innerProfileCategory": "Bandwidth",
    //     "requires": {
    //         "productFamily": "GigaCenter"
    //     }
    // },

    let _formFieldRequires = formFieldRequires;
    component.allProfileData = [
      { innerProfileCategory: 'DHCP Option82' },
      { innerProfileCategory: 'Video - Multicast Range Filters' },
      { innerProfileCategory: 'Bandwidth' },
      { innerProfileCategory: 'Video - Multicast VLAN Registration (MVR)' },
    ];

    component.formValuemEnumData(_formFieldRequires, formFieldArray);

    _formFieldRequires['innerProfileCategory'] = 'Video - Multicast Range Filters';
    component.formValuemEnumData(_formFieldRequires, formFieldArray);

    _formFieldRequires['innerProfileCategory'] = 'Bandwidth';
    component.formValuemEnumData(_formFieldRequires, formFieldArray);

    _formFieldRequires['innerProfileCategory'] = 'Video - Multicast VLAN Registration (MVR)';
    component.formValuemEnumData(_formFieldRequires, formFieldArray);

    expect(component.formValuemEnumData).toHaveBeenCalled();
    expect(component.formValuemEnumData).toHaveBeenCalledTimes(4);
  });

  it('should buildFormGroup', () => {
    // component.categoryType = newCategory
    // component.selectedCategoryName = "Data Service";
    // spyOn(component, 'buildFormGroup').and.callThrough();
    // component.buildFormGroup(formGroup);
    // component.myFormGroup.patchValue(formValue);
    // expect(component.buildFormGroup).toHaveBeenCalled();
    // expect(component.buildFormGroup).toHaveBeenCalledTimes(1);

    // component.categoryType = [];
    // component.selectedCategoryName = 'Set Parameter Value';
    component.selectedCategoryName = "Data Service";
    component.myFormGroup.value["productFamily"] = 'EXOS';
    component.buildFormGroup(formGroup);
  });

  it('should check doCustomValidation function', () => {
    component.myFormGroup.value['6rdPrefix'] = '2001:db8:3333:4444:5555:6666:7777:8888/23/prefix';
    component.doCustomValidation('6rdPrefix');

    component.myFormGroup.value['Range1Start'] = '192.0.2.146';
    component.doCustomValidation('Range1Start');
    component.myFormGroup.value['Range1Start'] = '';
    component.doCustomValidation('Range1Start');

    component.myFormGroup.value['Range1End'] = '192.0.2.146';
    component.doCustomValidation('Range1End');
    component.myFormGroup.value['Range1End'] = '';
    component.doCustomValidation('Range1End');

    component.myFormGroup.value['Vlan1Range1Start'] = '192.0.2.146';
    component.doCustomValidation('Vlan1Range1Start');
    component.myFormGroup.value['Vlan1Range1Start'] = '';
    component.doCustomValidation('Vlan1Range1Start');

    component.myFormGroup.value['Vlan1Range1End'] = '192.0.2.146';
    component.doCustomValidation('Vlan1Range1End');
    component.myFormGroup.value['Vlan1Range1End'] = '';
    component.doCustomValidation('Vlan1Range1End');

    component.myFormGroup.value['HostName'] = 'test host';
    component.doCustomValidation('HostName');

    component.myFormGroup.value['DNSServers'] = 'test-server';
    component.doCustomValidation('DNSServers');
    component.myFormGroup.value['DNSServers'] = 'test server, , test server2';
    component.doCustomValidation('DNSServers');
    component.myFormGroup.value['DNSServers'] = '';
    component.doCustomValidation('DNSServers');

    component.myFormGroup.value['X_000631_IPv6DNSServers'] = 'test-server1, test-server2';
    component.doCustomValidation('X_000631_IPv6DNSServers');
    component.myFormGroup.value['IPv6DNSServers'] = ',test-server1, test-server2';
    component.doCustomValidation('IPv6DNSServers');
  });

  it('should call all validation functions', () => {
    component.myFormGroup.patchValue({
      Hostname: 'test',
      AnyPortAnyServiceEnabled: true
    });
    component.onCommaSeparateValidation('Hostname');

    component.buildProfileObj.categoryList = [
      {
        category: 'DNS Host Mapping',
        parameterValues: {
          HostName: 'test-host',
        }
      },
      {
        category: 'WiFi SSID',
        parameterValues: {
          WlanIndex: 'test',
        }
      },
      {
        category: 'QOS Rule',
        parameterValues: {
          X_000631_ClassName: 'test',
        }
      }
    ];
    component.myFormGroup.patchValue({
      'HostName': 'test-host',
    });
    component.selectedCategoryName = 'DNS Host Mapping';
    component.DNSValidation();

    component.myFormGroup.patchValue({
      WlanIndex: 'test',
    });
    component.selectedCategoryName = 'WiFi SSID';
    component.SSIDValidation();

    component.myFormGroup.patchValue({
      X_000631_ClassName: 'test',
    });
    component.onQosRuleNameValidation('X_000631_ClassName');

    component.selectedCategoryName = 'Set Parameter Value';

    component.myFormGroup.value.SetParamValueProfileType = 'int';
    component.setParameterValidation();

    component.myFormGroup.value.SetParamValueProfileType = 'dateTime';
    component.setParameterValidation();

    component.myFormGroup.value.SetParamValueProfileType = 'boolean';
    component.setParameterValidation();

    component.myFormGroup.value.SetParamValueProfileType = 'base64Binary';
    component.myFormGroup.value.SetParamValueProfileValue = 'test';
    component.setParameterValidation();

    component.myFormGroup.value.SetParamValueProfileType = 'default';
    component.setParameterValidation();
  });

  it('should load onchangeRadio function', () => {
    let _formField = formField;
    _formField.displayName = 'Revertive';
    component.myFormGroup.value['type1'] = true;
    component.onchangeRadio(_formField);

    component.myFormGroup.addControl('X_000631_OUI_Enable', new FormControl(''));
    component.selectedCategoryName = 'Video Service';
    component.myFormGroup.value["productFamily"] = "EXOS";
    _formField.name = "AnyPortAnyServiceEnabled";
    component.myFormGroup.value['AnyPortAnyServiceEnabled'] = true;
    component.onchangeRadio(_formField);

    component.myFormGroup.addControl('X_000631_OUI_Enable', new FormControl(''));
    component.selectedCategoryName = 'Video Service';
    component.myFormGroup.value["productFamily"] = "EXOS";
    _formField.name = "AnyPortAnyServiceEnabled";
    component.myFormGroup.value['AnyPortAnyServiceEnabled'] = false;
    component.onchangeRadio(_formField);

    component.myFormGroup.addControl('OUI_Enable', new FormControl(''));
    component.selectedCategoryName = 'Video Service';
    component.myFormGroup.value["productFamily"] = "GigaCenter";
    _formField.name = "AnyPortAnyServiceEnabled";
    component.myFormGroup.value['AnyPortAnyServiceEnabled'] = false;
    component.onchangeRadio(_formField);

    component.myFormGroup.addControl('OUI_Enable', new FormControl(''));
    component.selectedCategoryName = 'Video Service';
    component.myFormGroup.value["productFamily"] = "GigaCenter";
    _formField.name = "AnyPortAnyServiceEnabled";
    component.myFormGroup.value['AnyPortAnyServiceEnabled'] = true;
    component.onchangeRadio(_formField);
  });

  it('should test all change event functions', () => {
    component.selectedCategoryName = 'Data Service';
    let _formField = formField;
    _formField['implies'] = true;
    _formField['name'] = 'Mode';
    component.onChangeServiceDropDown(_formField);

    _formField['name'] = 'version';
    component.onChangeServiceDropDown(_formField);

    _formField['name'] = 'Model';
    component.myFormGroup.value['Model'] = 'T-Series';
    component.selectedCategoryName = 'Voice Service';
    component.onChangeServiceDropDown(_formField);

    _formField['name'] = 'Mode';
    component.onChangeServiceDropDown(_formField);

    component.selectedCategoryName = 'Data Service';
    _formField['implies'] = false;
    _formField['name'] = 'productFamily';
    component.onChangeServiceDropDown(_formField);

    _formField['name'] = 'MatchRule';
    component.onChangeServiceDropDown(_formField);

    // fix getWIFISSIDDefaultValue and uncomment this section
    // component.selectedCategoryName = 'WiFi SSID for EXOS';
    // component.myFormGroup.value['WlanIndex'] = '10';
    // component.onChangeServiceDropDown(_formField); 
    // ************************************************* //

    component.selectedCategoryName = 'QOS Rule';
    _formField['implies'] = true;
    _formField['name'] = 'QosType';
    component.onChangeDropDown(_formField);

    _formField['implies'] = false;
    component.onChangeDropDown(_formField);
  });

  it('should load all simple functions', () => {
    component.passwordedit();
    component.emitError({});
    component.ipZeroValidation({});
    component.getSPID();
    component.closeAlert();
    // component.categoryType = [
    //   {
    //     name: 'HostName'
    //   },
    // ];
    // component.setOptionsTimerSwitchDefaultValue('HostName');
    // component.categoryType = [
    //   {
    //     name: 'Hostname',
    //     defaultValue: [
    //       {
    //         condition: {
    //           WlanIndex: {
    //             '$in': 'serverName'
    //           }
    //         }
    //       }
    //     ]
    //   }
    // ]
    // component.tempGetWIFISSIDDefaultValue('Hostname');


    component.invert('0');
    component.OnDiscardCategory();
    component.iprangecalc('192.168.0.1', '123.456');
    component.buildProfileObj.dataModelCategoryObj.parameters = [{ defaultValue: '' }];
    component.patchupdatedValueForDataModeProfile();
    component.myFormGroup.value['Hostname'] = 'test';
    component.validateHostNAmeAndIPAddressForSIP('Hostname');
    component.validateHostNAmeAndIPAddress('Hostname');
    let _formField = formField;
    _formField['display'] = true;
    _formField['mandatory'] = true;
    _formField['isIPAddress'] = true;
    _formField['objectDefaultType'] = 'IPv6Address';
    component.addValidationForFormField(_formField);

    component.selectedCategoryName = 'Syslog';
    _formField['objectDefaultType'] = '';
    component.addValidationForFormField(_formField);

    component.selectedCategoryName = 'Data Service';
    component.addValidationForFormField(_formField);

    component.selectedCategoryName = 'Data Service';
    _formField['mandatory'] = false;
    _formField['objectDefaultType'] = 'IPv6Address';
    component.addValidationForFormField(_formField);

    _formField['objectDefaultType'] = '';
    component.addValidationForFormField(_formField);

    _formField['maxValue'] = 100;
    _formField['minValue'] = 0;
    _formField['mandatory'] = false;
    _formField['objectDefaultType'] = '';
    _formField['isIPAddress'] = false;
    component.addValidationForFormField(_formField);

    _formField['maxValue'] = 100;
    delete _formField['minValue'];
    _formField['mandatory'] = false;
    _formField['objectDefaultType'] = '';
    _formField['isIPAddress'] = false;
    component.addValidationForFormField(_formField);

    _formField['minValue'] = 10;
    delete _formField['maxValue'];
    _formField['mandatory'] = false;
    _formField['objectDefaultType'] = '';
    _formField['isIPAddress'] = false;
    component.addValidationForFormField(_formField);

    _formField['name'] = 'DestPortRangeMax';
    component.addValidationForFormField(_formField);

    delete _formField['maxValue'];
    delete _formField['minValue'];
    _formField['mandatory'] = true;
    component.buildProfileObj.isFromDataModel = true;
    _formField['name'] = 'HostName';
    component.addValidationForFormField(_formField);

    delete _formField['maxValue'];
    delete _formField['minValue'];
    _formField['mandatory'] = true;
    component.buildProfileObj.isFromDataModel = true;
    _formField['name'] = '';
    component.addValidationForFormField(_formField);

    // _formField['mandatory'] = false;
    // component.buildProfileObj.isFromDataModel = false;
    // _formField['stringPattern'] = true;
    // component.addValidationForFormField(_formField);


  });

});

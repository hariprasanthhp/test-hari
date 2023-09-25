import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BSPInformationComponent } from './bsp-information.component';
import { Router } from '@angular/router';
import { MycommunityIqService } from '../../services/mycommunity-iq.service';
import { TranslateService } from 'src/app-services/translate.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ValidatorService } from 'src/app-services/validator.services';
import { addBspProvider, bspProviderData, micrositesDetails, predefinedCommunities, updateMicrositesDetails } from 'src/assets/mockdata/admin/smartwifi/smartwifi.data';
import { of } from 'rxjs';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ajax } from 'jquery';
import { CommonService } from '../../services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
const $: any = require('jquery');

describe('BSPInformationComponent', () => {
  let component: BSPInformationComponent;
  let fixture: ComponentFixture<BSPInformationComponent>;
  let router: Router;
  let service: MycommunityIqService;
  let languageService: TranslateService;
  let validatorService: ValidatorService;
  let httpController: HttpTestingController,
   translateService: TranslateService,
     titleService: Title,
     sso: SsoAuthService,
     formBuilder: FormBuilder,
     dialogService: NgbModal,
     commonOrgService: CommonService,
     routerTest: RouterTestingModule;
     let routerSpy = { navigate: jasmine.createSpy('navigate'), url: '/organization-admin/SmartTownWi-Fi/bsp-information' };
     

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BSPInformationComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule,FormsModule,ReactiveFormsModule],
      providers:[
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BSPInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router)
    service = TestBed.inject(MycommunityIqService)
    languageService = TestBed.inject(TranslateService)
    httpController = TestBed.inject(HttpTestingController)
    fixture.detectChanges();
  });
  it('should initialize onInit()', () => {
    spyOn(component, 'GetBspProvider').and.callThrough()
    spyOn(component, 'GetMicrosites').and.callThrough()
    languageService.selectedLanguage.subscribe(data => {
      component.language = data;
      expect(component.language).toBe(data)
      expect(component.tableDataAvailable).toBeFalse()
      expect(component.tableLanguageOptions).toHaveBeenCalled()
    })
    component.ngOnInit()
    expect(component.GetBspProvider).toHaveBeenCalled();
    expect(component.GetMicrosites).toHaveBeenCalled();
  });

  it('should get preDefinedCommunities Details', () => {
    spyOn(service, 'GetpredefinedCommunities').and.returnValue(of(predefinedCommunities))
    spyOn(component, 'getPredefinedCommunities').and.callThrough()
    component.getPredefinedCommunities()
    expect(component.communityArr).toBeTruthy();
    expect(component.communityArr.length).toBeGreaterThan(1)
    expect(component.disableCommunity).toBeFalse()
    expect(component.getPredefinedCommunities).toHaveBeenCalled()
  });

  it('should getBspProvider Details ', () => {
    component.refreshBack = true
    spyOn(service, 'GetBspproviderInfo').and.returnValue(of(bspProviderData))
    spyOn(component, 'GetBspProvider').and.callThrough()
    component.GetBspProvider()
    expect(component.BspData).toBeTruthy()
    expect(component.loader).toBeFalse()
    expect(component.BspData).toBe(bspProviderData, 'value is match')
    expect(component.GetBspProvider).toHaveBeenCalled()
  })

  it('should getMicrosites Details ', () => {
    spyOn(service, 'GetMicrosite').and.returnValue(of(micrositesDetails))
    spyOn(component, 'GetMicrosites').and.callThrough()
    component.GetMicrosites()
    expect(component.tableData).toBeTruthy()
    expect(component.tableData).toBe(micrositesDetails, 'value is match')
    expect(component.GetMicrosites).toHaveBeenCalled()
  })

  it('should tableLanguage Details ', () => {
    component.language.fileLanguage = 'fr'
    spyOn(component, 'tableLanguageOptions').and.callThrough()
    component.tableLanguageOptions()
    expect(component.dtOptions.language).toBe(languageService.fr)
    expect(component.tableLanguageOptions).toHaveBeenCalled()
  })

  it('should call patchCommunityDescription details', () => {
    let communityDescription = {
      "name": "c-k12",
      "description": "Community for K12 students"
    }
    spyOn(component, 'patchCommunityDescription').and.callThrough()
    component.patchCommunityDescription(communityDescription)
    expect(component.communityDesc).toBe(communityDescription.description)
    expect(component.patchCommunityDescription).toHaveBeenCalled()

  })
  it('should valid url details', () => {
    const url = 'https://calix.com';
    spyOn(component, 'urlValidation').and.callThrough()
    component.urlValidation(url)
    expect(component.UrLError).toBe(false)
    expect(component.urlValidation).toHaveBeenCalled()

  })

  it('should handle closeAllModels ', () => {
    spyOn(component, 'closeAllModal').and.callThrough()
    component.closeAllModal()
    expect(component.error).toBeFalse()
    expect(component.iserror).toBeFalse()
    expect(component.closeAllModal).toHaveBeenCalled()

  })

  it('should handle closeAlert', () => {
    spyOn(component, 'closeAlert').and.callThrough()
    component.closeAlert()
    expect(component.error).toBeFalse();
    expect(component.iserror).toBeFalse();
    expect(component.success).toBeFalse()
    expect(component.closeAlert).toHaveBeenCalled()

  })
  it('should remove community', () => {
    spyOn(component, 'removeCommunity').and.callThrough()
    component.addMicroSite.patchValue({
      communityName: null,
      description: null,
    })
    component.removeCommunity()
    expect(component.removeCommunity).toHaveBeenCalled()
  })

  it('should handle error', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough()
    component.pageErrorHandle(errorStatus401, true)
    expect(component.errorInfoMicrosite).toMatch('Access Denied')
    expect(component.iserror).toBe(true)
    expect(component.pageErrorHandle).toHaveBeenCalled()
  })

  it('should read url details', () => {
    const blob = new Blob([''], { type: 'image/png' });
    let reader = new FileReader();
    spyOn(component, 'readURL').and.callThrough()
    reader.readAsDataURL(blob)
    component.readURL(blob)
    expect(component.defaultLogo).toBe('')
    expect(component.readURL).toHaveBeenCalled()
  })

  it('should EditMicroPreview details', () => {
    const AddMicrosite = {
      "communityDesc": "test1234",
      "logo": null,
      "PrimaryColor": "#0279FF",
      "SecondaryColor": "#CCCCCC",
    }
    localStorage.setItem("calix.micrositeDetails", JSON.stringify(AddMicrosite));
    spyOn(component, 'EditMicroPreview').and.callThrough()
    component.EditMicroPreview()
    expect(component.EditMicroPreview).toHaveBeenCalled()
  })

  it('should call EditMicrositePreview details', () => {
    spyOn(service, 'GetMicrositeForEdit').and.returnValue(of(updateMicrositesDetails))
    spyOn(component, 'EditMicrositePreview').and.callThrough()
    component.EditMicrositePreview(micrositesDetails[0])
    expect(component.MicrositeData).toBeTruthy()
    expect(component.MicrositeData).toBe(updateMicrositesDetails, 'value is mismatch')
    expect(component.EditMicrositePreview).toHaveBeenCalled()
  })

  it('should render checkColor', () => {
    component.addMicroSite.value.brandingType = 'Default'
    spyOn(component, 'checkColor').and.callThrough()
    component.checkColor()
    expect(component.addMicroSite.value.primaryColor).toBe('#0279FF')
    expect(component.addMicroSite.value.secondaryColor).toBe('#CCCCCC')
    expect(component.checkColor).toHaveBeenCalled()
  })

  it('should  add AddBspProvider details', () => {
    let formdata = new FormData()
    formdata.append('orgId ', '10009');
    formdata.append('shortName', 'testCalix');
    formdata.append('name', localStorage.getItem('calix.org_name'));
    formdata.append('timezone', 'Africa/Accra');
    formdata.append('wifiNetworkName', 'test1234');
    formdata.append('defaultPrimaryColor', '#0279FF');
    formdata.append('defaultSecondaryColor', '#CCCCCC');
    formdata.append('defaultTerms', 'https://calix.com');
    spyOn(service, 'AddBspInfo').and.returnValue(of(addBspProvider))
    service.AddBspInfo(formdata)
    spyOn(component, 'AddBspProvider').and.callThrough()
    component.AddBspProvider()
    expect(component.AddBspProvider).toHaveBeenCalled()
  })

  it('should call clsAlphaNoOnly details', () => {
    spyOn(component, 'clsAlphaNoOnly').and.callThrough()
    component.clsAlphaNoOnly('my-test', 'community')
    expect(component.communityError.community).toBeFalse()
    expect(component.communityError.bsp).toBeFalse()
    expect(component.clsAlphaNoOnly).toHaveBeenCalled()

  })

  it('should call checkMaxMin details', () => {
    spyOn(component, 'checkMaxMin').and.callThrough()
    component.checkMaxMin('my-test', 'community')
    expect(component.minimumErr.community).toBeFalse()
    expect(component.minimumErr.bsp).toBeFalse()
    expect(component.checkMaxMin).toHaveBeenCalled()

  })

  it('should call addError details', () => {
    spyOn(component, 'addError').and.callThrough()
    component.addError('Image extension will be an ', true)
    expect(component.errorInfoMicrosite).toMatch('Image extension will be an ')
    expect(component.iserror).toBe(true)
    expect(component.error).toBeFalse();
    expect(component.minimumErr.community).toBeFalse()
    expect(component.errorInfo).toBeUndefined()
    expect(component.addError).toHaveBeenCalled()

  })

  it('should call getColorByBgColor details', () => {
    let test = component.getColorByBgColor('#0279FF')
    spyOn(component, 'getColorByBgColor').and.callThrough()
    component.getColorByBgColor('#0279FF')
    expect(test).toBeFalse
    expect(component.getColorByBgColor).toHaveBeenCalled()

  })

  it('should call WarToDelMicrosite details', () => {
    spyOn(service, 'WarToDelMicrosite').and.returnValue(of(micrositesDetails))
    spyOn(component, 'WarToDelMicrosite').and.callThrough()
    component.WarToDelMicrosite(micrositesDetails[0])
    expect(component.workFlowData).toBe(micrositesDetails)
    expect(component.micrositeloader).toBeFalse()
    expect(component.WarToDelMicrosite).toHaveBeenCalled()
  });

  it('should call DeleteBspInfo details', () => {
    spyOn(service, 'DeleteBspInfo').and.returnValue(of(bspProviderData))
    spyOn(component, 'DeleteBSP').and.callThrough()
    spyOn(component, 'GetBspProvider').and.callThrough()
    component.DeleteBSP()
    expect(component.bsploader).toBeTruthy()
    expect(component.GetBspProvider).toHaveBeenCalled()
    expect(component.DeleteBSP).toHaveBeenCalled()

  });

  it('should call BSPresetErrorModal modal', () => {
    spyOn(component, 'BSPresetErrorModal').and.callThrough()
    component.BSPresetErrorModal()
    expect(component.BSPresetErrorModal).toHaveBeenCalled();
  });

  it('should call BSPInfoWarnModal modal', () => {
    spyOn(component, 'BSPInfoWarnModal').and.callThrough()
    component.BSPInfoWarnModal()
    expect(component.iserror).toBeFalse()
    expect(component.BSPInfoWarnModal).toHaveBeenCalled();
  });

  it('should call addbspSub details', () => {
    let formData = new FormData()
    formData.append("logo", '')
    component.EditmicrositeId = '796dd5fb-c0a2-45ed-914b-780af0e8a3c8'
    component.addMicroSite.value.brandingType = 'Custom'
    const blob = new Blob([''], { type: 'image/png' });
    let reader = new FileReader();
    component.logo = blob;
    spyOn(service, 'EditMicrosite').and.returnValue(of(updateMicrositesDetails))
    spyOn(service, 'AddMicrosite').and.returnValue(of(micrositesDetails))
    service.AddMicrosite(formData)
    service.EditMicrosite(formData, component.EditmicrositeId)
    spyOn(component, 'onSubmit').and.callThrough()
    spyOn(component, 'closeAllModal').and.callThrough()
    component.onSubmit()
    expect(component.closeAllModal).toHaveBeenCalled()
    expect(component.micrositeloader).toBe(true)
    expect(component.onSubmit).toHaveBeenCalled()
  })

  it('should call editMicrosite details', () => {
    component.EditmicrositeId = '796dd5fb-c0a2-45ed-914b-780af0e8a3c8'
    spyOn(service, 'GetMicrositeForEdit').and.returnValue(of(updateMicrositesDetails))
    spyOn(component, 'editMicroSite').and.callThrough()
    component.editMicroSite(updateMicrositesDetails, 0)
    expect(component.Micrositelogo).toBe(updateMicrositesDetails.logo)
    expect(component.editLoader).toBeFalse()
    expect(component.editMicroSite).toHaveBeenCalled()
  })

  it('should delete id details', () => {
    spyOn(component, 'deleteMicrosite').and.callThrough()
    component.deleteMicrosite(micrositesDetails[0], 0, '')
    expect(component.micrositeId).toBe(micrositesDetails[0].id)
    expect(component.deleteMicrosite).toHaveBeenCalled()
  })

  it('should add addMicroSiteValue', () => {
    component.communityArr = []
    spyOn(component, 'addMicroSiteValue').and.callThrough()
    component.addMicroSiteValue()
    expect(component.disableCommunity).toBe(true)
    expect(component.addMicroSiteValue).toHaveBeenCalled()
  })

  it('should call verifyBSPInfoModal ', () => {
    component.bspForm.value.defaultTerms = 'https://calix.com'
    component.bspForm.value.shortName = 'testcalix'
    component.bspForm.value.friendlyName = 'test1234'
    spyOn(component, 'verifyBSPInfoModal').and.callThrough()
    component.urlValidation(component.bspForm.value.defaultTerms)
    component.checkMaxMin(component.bspForm.value.shortName, 'shortName')
    component.checkMaxMin(component.bspForm.value.friendlyName, 'friendlyName')
    component.verifyBSPInfoModal()
    expect(component.UrLError).toBeFalse()
    expect(component.verifyBSPInfoModal).toHaveBeenCalled()

  })

  it('should call convertIntoFileBase', () => {
    const blob = new Blob([''], { type: 'image/png' });
    let reader = new FileReader();
    reader.readAsDataURL(blob)
    spyOn(component, 'convertIntoFileBase').and.callThrough()
    component.convertIntoFileBase(blob)
    expect(component.Micrositelogo).toBe('')
    expect(component.convertIntoFileBase).toHaveBeenCalled()
  })

  it('should delete id details', () => {
    component.micrositeId = micrositesDetails[0].id
    spyOn(service, 'DeleteMicrosite').and.returnValue(of(micrositesDetails))
    spyOn(component, 'DeleteMicrosite').and.callThrough()
    spyOn(component, 'getPredefinedCommunities').and.callThrough()
    component.DeleteMicrosite()
    expect(component.DeleteMicrosite).toHaveBeenCalled()
    expect(component.getPredefinedCommunities).toHaveBeenCalled()
  })

  it('should call bspPreview Details', () => {
    localStorage.setItem("calix.micrositeDetails", JSON.stringify(bspProviderData));
    spyOn(component, 'BSPPreview').and.callThrough()
    component.BSPPreview()
    expect(component.BSPPreview).toHaveBeenCalled()
  });

  it('should call AddMicrositePreview Details', () => {
    localStorage.setItem("calix.micrositeDetails", JSON.stringify(addBspProvider));
    spyOn(component, 'AddMicrositePreview').and.callThrough()
    component.AddMicrositePreview()
    expect(component.AddMicrositePreview).toHaveBeenCalled()
  });

  it('should edit bspProvider details', () => {
    component.bspForm.value.defaultTerms = 'https://calix.com'
    component.bspForm.value.friendlyName = 'test1234'
    spyOn(service, 'EditBspInfo').and.returnValue(of(updateMicrositesDetails))
    spyOn(component, 'EditBspProvider').and.callThrough()
    spyOn(component, 'closeAllModal').and.callThrough()
    component.checkMaxMin(component.bspForm.value.friendlyName, 'friendlyName')
    component.EditBspProvider()
    expect(component.UrLError).toBeFalse()
    expect(component.EditBspProvider).toHaveBeenCalled()
    expect(component.closeAllModal).toHaveBeenCalled()
  })

  it('should call dataTable details', () => {
    const settings: any = {
      onFeature: {
        bAutoWidth: true,
        bDeferRender: false,
        bFilter: true,
        bInfo: true,
        bLengthChange: false,
        bPaginate: true,
        bProcessing: false,
        bServerSide: false,
        bSort: true,
        bSortClasses: true,
        bSortMulti: true,
        bStateSave: null
      },
      ajax: null,
      _iDisplayStart: 0,
      aoData: [],
      _iDisplayLength: 0
    }
    spyOn(component.dtOptions, 'drawCallback').and.callThrough()
    component.dtOptions.drawCallback(settings)
    expect(component.dtOptions.drawCallback).toHaveBeenCalled()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});

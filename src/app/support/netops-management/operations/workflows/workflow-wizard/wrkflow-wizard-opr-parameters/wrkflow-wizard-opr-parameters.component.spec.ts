import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { FileService } from '../../../services/files.service';

import { WrkflowWizardOprParametersComponent } from './wrkflow-wizard-opr-parameters.component';
import * as opr_mock from 'src/assets/mockdata/support/netops-management/operations/workflow/workflow-wizard-opr-parameters/workflow-wizard-opr-parameters';
import { ActivatedRoute, Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { EnglishJSON } from 'src/assets/language/english.service';
import { entitle } from 'src/assets/mockdata/shared/Entitles';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { hsiRes } from 'src/assets/mockdata/support/netops-management/operations/workflow/workflow';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { MycommunityIqService } from 'src/app/sys-admin/services/mycommunity-iq.service';


describe('WrkflowWizardOprParametersComponent', () => {
  let component: WrkflowWizardOprParametersComponent;
  let fixture: ComponentFixture<WrkflowWizardOprParametersComponent>;

  let router: Router,
    commonOrgService: CommonService,
    api: NetopsServiceService,
    fileService: FileService,
    translateService: TranslateService,
    sso: SsoAuthService,
    commonFunctionsService: CommonFunctionsService,
    communityService: MycommunityIqService,

    mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/support/netops-management/operations/workflows/workflow-wizard' };
  // mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/cco-foundation/foundation-configuration/configuration-workflow/workflows' }
  // mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/cco/operations/cco-subscriber-operations/operations/workflows' }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrkflowWizardOprParametersComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgSelectModule,
        DataTablesModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        TranslateService,
        CustomTranslateService,
        CommonService,
        CommonFunctionsService,
        MycommunityIqService,
        NetopsServiceService,
        SsoAuthService,
        FileService,
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of({ id: '633039c1-d2a9-4ebb-bced-360aafff8ee4' })
          }
        },
        { provide: Router, useValue: mockUrl },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    })
      .compileComponents().then(() => {
        // router = TestBed.inject(Router);
        commonOrgService = TestBed.inject(CommonService);
        api = TestBed.inject(NetopsServiceService);
        sso = TestBed.inject(SsoAuthService);
        fileService = TestBed.inject(FileService);
        translateService = TestBed.inject(TranslateService);
        commonFunctionsService = TestBed.inject(CommonFunctionsService);
        communityService = TestBed.inject(MycommunityIqService);

        fixture = TestBed.createComponent(WrkflowWizardOprParametersComponent);
        component = fixture.componentInstance;
        component.workflowInputData = opr_mock.workflow_res;
        component.orgId = 470053;
        component.newOprtn = true;
        component.oprTypeValueSelected = 'Configuration File Download';
        component.categoryChoosed = 'Bandwidth';
        component.doneActive = true;
        // component.router = router;
        fixture.detectChanges();
        localStorage.setItem('calix.entitlements', JSON.stringify(entitle))
      })
  });

  afterEach (() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  it('Ng-OnInit test', () => {
    spyOn(component, 'checkSwCondition').and.callThrough();
    spyOn(component, 'getConfigFile').and.callThrough();
    component.workflowInputData = opr_mock.workflow_res;
    component.ngOnInit();
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
  });

  it('Ng-OnInit 1 test', () => {
    localStorage.setItem('calix.entitlements', JSON.stringify({}))
    spyOn(component, 'checkSwCondition').and.callThrough();
    spyOn(component, 'getConfigFile').and.callThrough();
    component.workflowInputData = opr_mock.workflow_res;
    component.ngOnInit();
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
  });

  it('newOprtnAdd new test', () => {
    localStorage.setItem('calix.entitlements', JSON.stringify(entitle))
    // mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/cco-foundation/foundation-configuration/configuration-workflow/workflows' }
    component.workflowInputData = opr_mock.workflow_res;
    component.editWorkflow = true;
    component.newOprtnAdd('new');
    component.checkSwCondition();
  });

  it('newOprtnAdd new else test', () => {
    // localStorage.setItem('calix.entitlements',JSON.stringify(entitle))
    component.workflowInputData = opr_mock.workflow_res;
    component.workflowInputData.actions = [];
    component.newOprtnAdd('new');
  });

  it('newOprtnAdd new group else test', () => {
    // localStorage.setItem('calix.entitlements',JSON.stringify(entitle))
    component.workflowInputData = opr_mock.workflow_res;
    component.workflowInputData.groups = [];
    component.newOprtnAdd('new');
  });

  it('newOprtnAdd edit test', () => {
    localStorage.setItem('calix.entitlements', JSON.stringify(entitle))
    // mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/cco-foundation/foundation-configuration/configuration-workflow/workflows' }
    component.workflowInputData = opr_mock.workflow_res;
    opr_mock.workflow_opr.actions.push(opr_mock.myCommunityIQ);
    component.editWorkflow = true;
    fixture.detectChanges();
    component.newOprtnAdd('edit', 0);
  });

  it('Configuration file Api test', () => {
    spyOn(api, 'getConfigFile').and.returnValue(of(opr_mock.workflow_config_res));
    component.getConfigFile();
  });

  it('Configuration file Api Error test', () => {
    spyOn(api, 'getConfigFile').and.returnValue(throwError(errorStatus401));
    component.getConfigFile();
  });

  it('Configuration profile Api test', () => {
    spyOn(api, 'getConfigProfile').and.returnValue(of(opr_mock.workflow_config_pro_res));
    component.getConfigProfile();
  });
  it('Configuration profile Api error test', () => {
    spyOn(api, 'getConfigProfile').and.returnValue(throwError(errorStatus401));
    component.getConfigProfile();
  });

  it('software image Api test', () => {
    spyOn(component.dtTrigger, 'next').and.callThrough();
    spyOn(fileService, 'getSwFilesList').and.returnValue(of(opr_mock.workflow_image_res));
    component.getSwImgFile();
  });
  it('software image Api error test', () => {
    spyOn(component.dtTrigger, 'next').and.callThrough();
    spyOn(fileService, 'getSwFilesList').and.returnValue(throwError(errorStatus401));
    component.getSwImgFile();
  });

  it('static device Api test', () => {
    spyOn(api, 'getStaticDevice').and.returnValue(of(opr_mock.workflow_static_group_res));
    component.getStaticDevice();
  });
  it('static device Api error test', () => {
    spyOn(api, 'getStaticDevice').and.returnValue(throwError(errorStatus401));
    component.getStaticDevice();
  });

  it('Replace service Api test', () => {
    spyOn(api, 'getReplaceService').and.returnValue(of(opr_mock.workflow_replace_res));
    component.getReplaceService(component.categoryChoosed);
  });
  it('Replace service Api error test', () => {
    spyOn(api, 'getReplaceService').and.returnValue(throwError(errorStatus401));
    component.getReplaceService(component.categoryChoosed);
  });

  it('New profile service Api test', () => {
    spyOn(api, 'getReplaceService').and.returnValue(of(opr_mock.workflow_replace_res));
    component.getNewProfileData(component.categoryChoosed);
  });
  it('New profile service Api error test', () => {
    spyOn(api, 'getReplaceService').and.returnValue(throwError(errorStatus401));
    component.getNewProfileData(component.categoryChoosed);
  });

  it('go_previous click test', () => {
    spyOn(component.workflowOprData, 'emit').and.callThrough();
    spyOn(component.activeTab, 'emit').and.callThrough();
    let clicked = fixture.nativeElement.querySelector('#previous');
    clicked.click();
  });

  it('go_next click test', () => {
    component.workflowInputData = opr_mock.workflow_opr;
    fixture.detectChanges();

    spyOn(component.workflowOprData, 'emit').and.callThrough();
    spyOn(component.activeTab, 'emit').and.callThrough();
    let clicked = fixture.nativeElement.querySelector('#next');
    clicked.click();
  });

  it('Done click test', () => {
    spyOn(component.workflowOprData, 'emit').and.callThrough();
    component.oprTypeValueSelected = 'Download SW/FW Image';
    component.doneClick();
    opr_mock.workflow_opr.actions.push({
      "fileId": "630d6b4a8f082689ee9b6399",
      "actionType": "Download SW/FW Image",
      "profileName": "FullRel_SIGNED_EXOS_PH_R22.3.0.0.img"
    })
  });

  it('Done click test1', () => {
    component.workflowInputData = opr_mock.workflow_opr;
    component.oprTypeValueSelected = 'Apply Configuration Profile';
    component.oprTypeValueSelected = 'Add Static Device Group';
    component.oprTypeValueSelected = 'Configuration File Download';
    component.actionType = 'Reboot';
    component.doneClick();
    opr_mock.workflow_opr.actions.push({
      "actionType": "Reboot"
    })
  });
  it('Done click test2', () => {
    component.workflowInputData = opr_mock.workflow_opr;
    component.oprTypeValueSelected = 'Replace Service Profile';
    component.operationCondition = 'some test case example';
    component.showEditButton = true;
    component.oprData = {
      "profileId": "222649a4-9639-46ac-a92b-c2bfe6ca2362",
      "actionType": "Replace Service Profile",
      "profileName": "bw 100 is replaced by BW_0",
      "replacedByProfileId": "97268d40-ebb9-41d4-aeef-87b5ecc9c55a"
    };
    component.newProValue = {id:'a5aa283c-02ea-4252-abcd-4714a7ae87f2',name:'margo_bw_5G'}
    component.oldProData = {id:'222649a4-9639-46ac-a92b-c2bfe6ca2362',name:'bw 100'}
    component.actionType = 'Replace Service Profile';
    component.doneClick();
    opr_mock.workflow_opr.actions.push({
      "profileId": "222649a4-9639-46ac-a92b-c2bfe6ca2362",
      "actionType": "Replace Service Profile",
      "profileName": "bw 100 is replaced by BW_0",
      "replacedByProfileId": "97268d40-ebb9-41d4-aeef-87b5ecc9c55a"
    })
  });
  it('Done click test3', () => {
    component.workflowInputData = opr_mock.workflow_opr;
    component.workFlowEdit = true;
    component.hotspotActivationObj.eduroam.enable = true;
    component.actionType = 'myCommunityIQ Bulk Activation';
    component.doneClick();
    opr_mock.workflow_opr.actions.push(opr_mock.myCommunityIQ)
  });
  it('Done click test3 else case', () => {
    component.actionType = 'myCommunityIQ Bulk Activation';
    component.doneClick();
    opr_mock.workflow_opr.actions.push(opr_mock.myCommunityIQ)
  });
  it('Done click test4', () => {
    component.workflowInputData = opr_mock.workflow_opr;
    component.actionType = 'Download Official Image';
    component.doneClick();
    opr_mock.workflow_opr.actions.push({
      "actionType": "Download Official Image"
    })
  });

  it('Done click test5', () => {
    component.workflowInputData = opr_mock.workflow_opr;
    component.actionType = 'SmartBiz Bulk Activation';
    component.doneClick();
    opr_mock.workflow_opr.actions.push({
      "actionType": "SmartBiz Bulk Activation",
      "actionConfig": {
        "enable": false
      }
    })
  });


  it('function test', () => {
    component.CancelCommunities();
    component.addCommunity();
    component.showPass();
    component.refreshHotspotActivation();
    component.changeEduroam();
    component.changePasspoint();
    component.workflowInputData = opr_mock.workflow_res;
    opr_mock.workflow_opr.actions.push(opr_mock.myCommunityIQ);
    component.removeOrAddUnwantedOptions();
    component.primaryServerPatternValidation();
    component.secondaryServerPatternValidation();
    component.radiousServerShoudNotMatchValidation();
    component.checkSubscribe({ target: { checked: true } },
      { "actionType": "ExperienceIQ Bulk Activation", "bulkActivationConfig": { "subscribe": false, "enable": false }, name: 'ExperienceIQ', description: "ExperienceIQ" });
    component.deleteWrkflw(1);

  });

  it('function test2', () => {
    component.communityArr = hsiRes.wifiSsidExos;
    component.showMicroSiteName(1);
    component.removeCommunity();
  });

  it('removeOrAddUnwantedOptions', () => {
    component.workflowInputData = opr_mock.workflow_res;
    opr_mock.workflow_opr.actions.push(opr_mock.myCommunityIQ);
    component.removeOrAddUnwantedOptions();
  })
  it('removeOrAddUnwantedOptions else', () => {
    component.workflowInputData = opr_mock.workflow_res;
    // opr_mock.workflow_opr.actions.push(opr_mock.myCommunityIQ);
    component.removeOrAddUnwantedOptions();
  })

  it('chooseCategory test', () => {
    component.categoryChoosed = 'Data Service';
    component.chooseCategory();
    component.bindReplaceData({ target: { checked: true } }, component.workflowInputData);
    component.bindReplaceNewData({ target: { checked: true } }, component.workflowInputData);
    fixture.detectChanges();
    component.categoryChoosed = 'Voice Service';
    component.chooseCategory();
    component.bindReplaceData({ target: { checked: true } }, component.workflowInputData);
    component.bindReplaceNewData({ target: { checked: true } }, component.workflowInputData);
    fixture.detectChanges();
    component.categoryChoosed = 'Video Service';
    component.chooseCategory();
    component.bindReplaceData({ target: { checked: true } }, component.workflowInputData);
    component.bindReplaceNewData({ target: { checked: true } }, component.workflowInputData);
    fixture.detectChanges();
    component.categoryChoosed = 'Bandwidth';
    component.chooseCategory();
    component.bindReplaceData({ target: { checked: true } }, component.workflowInputData);
    component.bindReplaceNewData({ target: { checked: true } }, component.workflowInputData);
    fixture.detectChanges();
  });

  it('optTypeValueChoose1 test', () => {
    component.oprTypeValueSelected = 'Download SW/FW Image';
    component.optTypeValueChoose();
  });
  it('optTypeValueChoose2 test', () => {
    component.oprTypeValueSelected = 'Apply Configuration Profile';
    component.optTypeValueChoose();
  });

  it('optTypeValueChoose3 test', () => {
    component.oprTypeValueSelected = 'Add Static Device Group';
    component.optTypeValueChoose();
  });

  it('optTypeValueChoose4 test', () => {
    component.oprTypeValueSelected = 'ExperienceIQ Provision';
    component.optTypeValueChoose();
  });
  it('optTypeValueChoose5 test', () => {
    component.oprTypeValueSelected = 'ProtectIQ Provision';
    component.optTypeValueChoose();
  });

  it('optTypeValueChoose6 test', () => {
    component.oprTypeValueSelected = 'myCommunityIQ Bulk Activation';
    component.optTypeValueChoose();
  });

  it('optTypeValueChoose7 test', () => {
    component.oprTypeValueSelected = 'Replace Service Profile';
    component.optTypeValueChoose();
  });

  it('optTypeValueChoose8 test', () => {
    component.oprTypeValueSelected = 'SmartBiz Bulk Activation';
    component.optTypeValueChoose();
  });

  it('bindConfigData1 test', () => {
    component.workflowInputData = opr_mock.workflow_res;
    component.actionType = 'Add to Static Device Group';
    component.bindConfigData({ target: { checked: true } }, component.workflowInputData);
  });

  it('bindConfigData2 test', () => {
    component.workflowInputData = opr_mock.workflow_res;
    component.actionType = 'Apply Configuration Profile';
    component.bindConfigData({ target: { checked: true } }, component.workflowInputData);
  });
  it('bindConfigData3 test', () => {
    component.workflowInputData = opr_mock.workflow_res;
    component.actionType = 'Edge Suites Bulk Activation';
    component.bindConfigData({ target: { checked: true } }, component.workflowInputData);
  });
  it('bindConfigData4 test', () => {
    component.workflowInputData = opr_mock.workflow_res;
    component.actionType = 'ExperienceIQ Bulk Activation';
    component.bindConfigData({ target: { checked: true } }, component.workflowInputData);
  });
  it('bindConfigData5 test', () => {
    component.workflowInputData = opr_mock.workflow_res;
    component.actionType = 'SmartBiz Bulk Activation';
    component.bindConfigData({ target: { checked: true } }, component.workflowInputData);
  });

  it('bindConfigData6 test', () => {
    component.workflowInputData = opr_mock.workflow_res;
    component.actionType = 'ExperienceIQ Bulk Activation';
    component.bindConfigData({ target: { checked: true } }, component.workflowInputData);
  });

  it('removeUnwantedSpace test', () => {
    spyOn(commonFunctionsService, 'trimSpaceFromNonObjectInputs').and.returnValue('123abc')
    component.removeUnwantedSpace('operationCondition', '123 abc');
    fixture.detectChanges();
    expect(component.operationCondition).toBe('123abc')
  });

  it('addEiqPiqToList else test', () => {
    let entitlement = JSON.parse(JSON.stringify(entitle));
    delete entitlement[205];
    localStorage.setItem('calix.entitlements', JSON.stringify(entitlement))
    component.addEiqPiqToList();
    fixture.detectChanges();
    expect(component.inputOperationType.filter((obj) => obj.name == 'ProtectIQ Provision')[0]).toBeTruthy();
  });

  it('addEiqPiqToList else => 2nd else if test', () => {
    let entitlement = JSON.parse(JSON.stringify(entitle));
    delete entitlement[205];
    delete entitlement[203];
    localStorage.setItem('calix.entitlements', JSON.stringify(entitlement))
    component.addEiqPiqToList();
  });

  it('addEiqPiqToList else => 1st else if test', () => {
    let entitlement = JSON.parse(JSON.stringify(entitle));
    delete entitlement[205];
    delete entitlement[204];    
    localStorage.setItem('calix.entitlements', JSON.stringify(entitlement))
    component.addEiqPiqToList();
  });

  it('GetMicrosites test', () => {
    spyOn(communityService, 'GetMicrosite').and.returnValue(of(opr_mock.communities));
    component.GetMicrosites();
    fixture.detectChanges();
    expect(component.micrositeLoader).toBeFalsy();
  });

  it('GetMicrosites error test', () => {
    spyOn(communityService, 'GetMicrosite').and.returnValue(throwError(errorStatus401));
    component.GetMicrosites();
  });


});

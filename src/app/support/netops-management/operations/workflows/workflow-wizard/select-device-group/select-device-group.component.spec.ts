import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef, Component } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTablesModule } from 'angular-datatables';
import { CalendarModule } from 'primeng/calendar';
import { of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';
import { workflow_start_data } from 'src/assets/mockdata/support/netops-management/operations/workflow/workflow';
import { WorkflowWizardComponent } from '../workflow-wizard.component';
import { SelectDeviceGroupComponent } from './select-device-group.component';

import * as systemData from 'src/assets/mockdata/support/netops-management/operations/workflow/select-device-group/select-device-group';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';


describe('SelectDeviceGroupComponent', () => {
    let component: SelectDeviceGroupComponent;
    let fixture: ComponentFixture<SelectDeviceGroupComponent>;

    let api: NetopsServiceService;
    let commonOrgService: CommonService;
    let translateService: TranslateService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SelectDeviceGroupComponent],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                CalendarModule,
                FormsModule,
                ReactiveFormsModule,
                DataTablesModule
            ],
            providers: [
                TranslateService, 
                NetopsServiceService, 
                SsoAuthService,
                CommonService,
                ChangeDetectorRef,
                CustomTranslateService
            ]
        })
            .compileComponents().then(()=>{
                api = TestBed.inject(NetopsServiceService);
                commonOrgService = TestBed.inject(CommonService);
                translateService = TestBed.inject(TranslateService);

                fixture = TestBed.createComponent(SelectDeviceGroupComponent);
                component = fixture.componentInstance;
                component.workflowInputData = systemData.workflow_Input_data;
                component.selectDeviceGrp = true;
                fixture.detectChanges();
            })
    });

    afterEach (() => {
        fixture.destroy();
        TestBed.resetTestingModule();
      });

    it('Ng-OnInit test', () => {
        spyOn(api,'GetDeviceGroup').and.returnValue(of(systemData.system_groups));
        component.ngOnInit();
        let eng = new EnglishJSON;
        translateService.selectedLanguage.next(of(eng));
        expect(component.deviceGrpData).toEqual(systemData.system_groups);
        fixture.detectChanges();
    });

    it('select group test', () => {
        spyOn(api,'GetDeviceGroup').and.returnValue(of(systemData.system_groups));
        spyOn(component,'bindDeviceData').and.callThrough();
        component.ngOnInit();
        fixture.detectChanges();
        //for selecting gruops
        let clicked1 = fixture.nativeElement.querySelector('#device-grp-table tbody tr:nth-child(2) td:nth-child(1) input');
        clicked1.click();
        fixture.detectChanges();
        let clicked2 = fixture.nativeElement.querySelector('#device-grp-table tbody tr:nth-child(3) td:nth-child(1) input');
        clicked2.click();
        fixture.detectChanges();
        expect(component.bindDeviceData).toHaveBeenCalled();
        expect(component.workflowInputData.groups).toEqual(['7f4b18d5-8c5e-4fe4-8741-0f0a15853c42', 'ffd0e2f2-546b-41d6-8784-6b6bb598d5f8']);
        fixture.detectChanges()
    });

    it('select group bindData else test', () => {
        spyOn(api,'GetDeviceGroup').and.returnValue(of(systemData.system_groups));
        spyOn(component,'bindDeviceData').and.callThrough();
        component.ngOnInit();
        fixture.detectChanges();
        //for selecting gruops
        component.bindDeviceData({},systemData.workflow_Input_data);
    });

    it('go_previous click test', () => {
        spyOn(api,'GetDeviceGroup').and.returnValue(of(systemData.system_groups));
        component.ngOnInit();
        fixture.detectChanges();

        spyOn(component.workflowDeviceData,'emit').and.callThrough();
        spyOn(component.activeTab,'emit').and.callThrough();
        let clicked = fixture.nativeElement.querySelector('#previous');
        clicked.click();
        fixture.detectChanges();
        expect(component.workflowDeviceData.emit).toHaveBeenCalled();
        expect(component.activeTab.emit).toHaveBeenCalledWith('Start');
    });

    it('go_next click test', () => {
        spyOn(api,'GetDeviceGroup').and.returnValue(of(systemData.system_groups));
        component.ngOnInit();
        component.workflowInputData = systemData.workflow_selected_input_data;
        fixture.detectChanges();

        spyOn(component.workflowDeviceData,'emit').and.callThrough();
        spyOn(component.activeTab,'emit').and.callThrough();
        let clicked = fixture.nativeElement.querySelector('#next');
        clicked.click();
        fixture.detectChanges();
    });

    it('go_next click else if test', () => {
        spyOn(api,'GetDeviceGroup').and.returnValue(of(systemData.system_groups));
        component.ngOnInit();
        component.workflowInputData = systemData.workflow_selected_input_data;
        fixture.detectChanges();
        component.selectDeviceGrp = false;
        spyOn(component.workflowDeviceData,'emit').and.callThrough();
        spyOn(component.activeTab,'emit').and.callThrough();
        let clicked = fixture.nativeElement.querySelector('#next');
        clicked.click();
    });

    it('go_next click else test', () => {
        spyOn(api,'GetDeviceGroup').and.returnValue(of(systemData.system_groups));
        component.ngOnInit();
        component.workflowInputData = systemData.workflow_selected_input_data;
        component.workflowInputData.groups = [];
        fixture.detectChanges();
        
        spyOn(component.workflowDeviceData,'emit').and.callThrough();
        spyOn(component.activeTab,'emit').and.callThrough();
        let clicked = fixture.nativeElement.querySelector('#next');
        clicked.click();
    });

    it('function test', () => {
        component.rerender();
        component.showform();
        component.deviceGrpData = systemData.system_groups;
        component.hideform();
        component.pageErrorHandle(errorStatus401);
        spyOn(api,'GetDeviceGroup').and.returnValue(throwError(errorStatus401));
        component.isRerender = true;
        component.getDeviceGroup();
        component.workflowInputData = systemData.workflow_selected_input_data;
        component.deviceaction();
        component.findObjIndex('6417c961-aced-472d-a570-14f3547cadc1',systemData.system_groups);
    });

});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule } from 'primeng/calendar';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { workflow_start_data } from 'src/assets/mockdata/support/netops-management/operations/workflow/workflow';
import { WorkflowWizardComponent } from '../workflow-wizard.component';

import { StartWizardComponent } from './start-wizard.component';


describe('StartWizardComponent', () => {
    let component: StartWizardComponent;
    let fixture: ComponentFixture<StartWizardComponent>;

    let translateService: TranslateService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StartWizardComponent],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                CalendarModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [
                TranslateService, 
                NetopsServiceService, 
                SsoAuthService
            ]
        })
            .compileComponents().then(()=>{
                fixture = TestBed.createComponent(StartWizardComponent);
                component = fixture.componentInstance;
                component.workflowInputData = workflow_start_data;
                fixture.detectChanges();

                translateService = TestBed.inject(TranslateService);

            })
    });

    afterEach (() => {
        fixture.destroy();
        TestBed.resetTestingModule();
    });


    it('Ng-OnInit test', () => {
        component.ngOnInit();
        let eng = new EnglishJSON;
        translateService.selectedLanguage.next(of(eng));
        expect(component.saveClicked).toBeFalsy();
    });

    it('go_next click test', () => {
        spyOn(component,'go_next').and.callThrough();
        spyOn(component,'validate').and.callFake(()=>{
            component.formError = false;
            if (!component.workflowInputData.name) {
                component.formError = true;
              return
            }
        });
        spyOn(component.workflowdata,'emit').and.callThrough();
        component.workflowInputData['name'] = 'ABCD';
        component.workflowInputData['description'] = 'some test might be here';
        component.go_next();
        fixture.detectChanges();
        expect(component.saveClicked).toBeTruthy();
        expect(component.workflowdata.emit).toHaveBeenCalled();
    });

    it('validate test', () => {
        component.validate();
    });

});

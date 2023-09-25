import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { DataService } from 'src/app/cco/cco-home/services/data.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { OrganizationApiService } from 'src/app/sys-admin/services/organization-api.service';
import { AddSubscriberService } from '../add-subscriber.service';

import { AddEdgeSuitesComponent } from './add-edge-suites.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { of } from 'rxjs';

describe('AddEdgeSuitesComponent', () => {
  let component: AddEdgeSuitesComponent;
  let fixture: ComponentFixture<AddEdgeSuitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEdgeSuitesComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        { provide: TranslateService, useClass: CustomTranslateService },
        {
          provide: SsoAuthService, useValue: {
            checFoundationScope: () => true,
            getOrgId: () => "",
            getEntitlements: () => "",
          }
        }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AddEdgeSuitesComponent);
        component = fixture.componentInstance;
        component.deviceInfoData = [];
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load ngOnDestroy', () => {
    //arrange
    fixture.detectChanges();
    component.languageSubject = { unsubscribe: () => { } };
    component.arloSmartListSubs = { unsubscribe: () => { } };
    component.deviceInfosub = { unsubscribe: () => { } };
    component.getAllSystemsSubs = { unsubscribe: () => { } };
    component.getAllSubscriberActiveSys = { unsubscribe: () => { } };
    spyOn(component.languageSubject, 'unsubscribe');
    spyOn(component.arloSmartListSubs, 'unsubscribe');
    spyOn((component as any).Out_EdgeSuites, 'emit');
    //act
    component.ngOnDestroy();
    //assert
    expect(component.languageSubject.unsubscribe).toHaveBeenCalled();
    expect(component.arloSmartListSubs.unsubscribe).toHaveBeenCalled();
    expect((component as any).Out_EdgeSuites.emit).toHaveBeenCalled();
  });
});

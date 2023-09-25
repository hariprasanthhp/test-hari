import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { NetworkTopologyComponent } from './network-topology.component';
import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { IssueService } from '../issues/service/issue.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('NetworkTopologyComponent', () => {
  let component: NetworkTopologyComponent;
  let fixture: ComponentFixture<NetworkTopologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworkTopologyComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        { provide: TranslateService, useClass: CustomTranslateService }
        , IssueService, HttpClient, CommonService, ChangeDetectorRef, FormBuilder
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(NetworkTopologyComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange
    spyOn(component, 'regionsApiLoader');
    //act
    fixture.detectChanges();
    //assert 
    expect(component.regionsApiLoader).toHaveBeenCalled();
  });

  it('should load regions ', () => {
    //arrange
    spyOn((component as any).issueService, 'getRegions').and.returnValue(of([{}]));
    //act
    component.regionsApiLoader();
    //assert 
    expect((component as any).issueService.getRegions).toHaveBeenCalled();
  });
});

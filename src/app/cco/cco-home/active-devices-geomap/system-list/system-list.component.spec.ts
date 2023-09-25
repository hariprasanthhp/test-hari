import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemListComponent } from './system-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { FormBuilder } from '@angular/forms';
import { HomeGeomapService } from '../../services/home-geomap.service';

describe('SystemListComponent', () => {
  let component: SystemListComponent;
  let fixture: ComponentFixture<SystemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemListComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      providers: [
        TranslateService, FormBuilder, HomeGeomapService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemListComponent);
    component = fixture.componentInstance;
    component.systemInfoData = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});

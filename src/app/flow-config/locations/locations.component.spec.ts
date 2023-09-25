import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { TranslateService } from 'src/app-services/translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { CommonFunctionsService } from '../services/common-functions.service';
import { DataTablecreatorService } from '../services/data-tablecreator.service';
import { LocationsApiService } from '../services/locations-api.service';

import { LocationsComponent } from './locations.component';

describe('LocationsComponent', () => {
  let component: LocationsComponent;
  let fixture: ComponentFixture<LocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationsComponent ],
      imports: [
        RouterTestingModule, HttpClientTestingModule
, DataTablesModule, FormsModule
      ],
      providers: [
        SsoAuthService, CommonFunctionsService, ExportExcelService, DataTablecreatorService, NgbModal, CommonService, TranslateService, LocationsApiService, Title
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

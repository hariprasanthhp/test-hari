import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { TranslateService } from 'src/app-services/translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { CommonFunctionsService } from '../../services/common-functions.service';
import { DataTablecreatorService } from '../../services/data-tablecreator.service';
import { NetworkSubnetsApiService } from '../../services/network-subnets-api.service';

import { StaticSubnetsComponent } from './static-subnets.component';

describe('StaticSubnetsComponent', () => {
  let component: StaticSubnetsComponent;
  let fixture: ComponentFixture<StaticSubnetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticSubnetsComponent ],
      imports: [
        RouterTestingModule, HttpClientTestingModule
, NgSelectModule, DataTablesModule, FormsModule
      ],
      providers: [
        SsoAuthService, CommonFunctionsService, NgbModal, CommonService, TranslateService, NetworkSubnetsApiService, ExportExcelService, DataTablecreatorService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticSubnetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

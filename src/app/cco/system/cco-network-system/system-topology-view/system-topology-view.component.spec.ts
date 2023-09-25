import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CcoCommonService } from 'src/app/cco/shared/services/cco-common.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';

import { SystemTopologyViewComponent } from './system-topology-view.component';

describe('SystemTopologyViewComponent', () => {
  let component: SystemTopologyViewComponent;
  let fixture: ComponentFixture<SystemTopologyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemTopologyViewComponent ],
      imports:[RouterTestingModule, HttpClientTestingModule
],
      providers: [TranslateService, CcoCommonService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemTopologyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

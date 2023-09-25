import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { AppModule } from '../app.module';
import { CommonService } from './services/common.service';

import { SysAdminComponent } from './sys-admin.component';
import { SysAdminModule } from './sys-admin.module';

describe('SysAdminComponent', () => {
  let component: SysAdminComponent;
  let fixture: ComponentFixture<SysAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SysAdminComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
, AppModule, SysAdminModule
      ],
      providers: [
        CommonService, TranslateService, Title
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

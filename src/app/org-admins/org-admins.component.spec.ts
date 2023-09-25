import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from '../app.module';
import { CommonService } from '../sys-admin/services/common.service';
import { SysAdminModule } from '../sys-admin/sys-admin.module';

import { OrgAdminsComponent } from './org-admins.component';
import { OrgAdminsModule } from './org-admins.module';

describe('OrgAdminsComponent', () => {
  let component: OrgAdminsComponent;
  let fixture: ComponentFixture<OrgAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgAdminsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, AppModule, SysAdminModule, OrgAdminsModule],
      providers: [
        CommonService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

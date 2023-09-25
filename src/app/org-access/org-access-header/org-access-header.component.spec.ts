import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';

import { OrgAccessHeaderComponent } from './org-access-header.component';

describe('OrgAccessHeaderComponent', () => {
  let component: OrgAccessHeaderComponent;
  let fixture: ComponentFixture<OrgAccessHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgAccessHeaderComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
, SharedUtilsModule],
      providers: [

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAccessHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

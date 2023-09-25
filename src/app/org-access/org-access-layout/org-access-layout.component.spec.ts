import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from 'src/app/app.module';
import { OrgAccessModule } from '../org-access.module';

import { OrgAccessLayoutComponent } from './org-access-layout.component';

describe('OrgAccessLayoutComponent', () => {
  let component: OrgAccessLayoutComponent;
  let fixture: ComponentFixture<OrgAccessLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgAccessLayoutComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
, AppModule, OrgAccessModule],
      providers: [

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAccessLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

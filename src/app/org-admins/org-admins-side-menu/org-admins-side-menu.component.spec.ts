import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OrgAdminsSideMenuComponent } from './org-admins-side-menu.component';

describe('OrgAdminsSideMenuComponent', () => {
  let component: OrgAdminsSideMenuComponent;
  let fixture: ComponentFixture<OrgAdminsSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgAdminsSideMenuComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
],
      providers: [

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAdminsSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

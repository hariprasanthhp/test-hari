import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';

import { OrgAccessSideMenuComponent } from './org-access-side-menu.component';

describe('OrgAccessSideMenuComponent', () => {
  let component: OrgAccessSideMenuComponent;
  let fixture: ComponentFixture<OrgAccessSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgAccessSideMenuComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
],
      providers: [
        CustomTranslateService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAccessSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

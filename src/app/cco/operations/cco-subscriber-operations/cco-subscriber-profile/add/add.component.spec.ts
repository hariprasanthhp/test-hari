import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CategoryConfigurationService } from 'src/app/support/netops-management/operations/services/category-config.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { SubscriberService } from '../../cco-subscriber-templates/subscriber-templates/subscribers/service/subscriber.service';
import { CcoSubscriberProfileComponent } from '../cco-subscriber-profile.component';
import { ProfileService } from '../profile.service';

import { AddComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'cco/operations/cco-subscriber-operations/operations/ONT-profile', component: CcoSubscriberProfileComponent },
        ]), HttpClientTestingModule
      ],
      providers: [
        TranslateService, Title, SsoAuthService, CategoryConfigurationService, ProfileService, CommonService, SubscriberService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add
  // it('on tab change', () => {
  //   spyOn(component, 'onTabChange').and.callThrough();
  //   expect(component.onTabChange).toHaveBeenCalled();
  // });
});

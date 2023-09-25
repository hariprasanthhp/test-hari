import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { editprofileData, profiles } from 'src/assets/mockdata/support/netops-management/operations/profiles/profiles.data';
import { of, Subscription } from 'rxjs';
import { ProfilesComponent } from './profiles.component';
import { ProfileWizardComponent } from './profile-wizard/profile-wizard.component';
import { ProfileService } from '../services/profile.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { EnglishJSON } from 'src/assets/language/english.service';
import { environment } from 'src/environments/environment';
import { SCOPES } from 'src/assets/mockdata/shared/services/scopes';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
describe('ProfilesComponent', () => {
  let component: ProfilesComponent;
  let fixture: ComponentFixture<ProfilesComponent>;
  let profileService: ProfileService;
  let languageService: TranslateService;
  let route: ActivatedRoute;
  let router: Router;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilesComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'support/netops-management/operations/profiles/profile-wizard', component: ProfileWizardComponent },
        ]),
        ReactiveFormsModule,
        FormsModule,
        DataTablesModule

      ],
      providers: [
        TranslateService, SsoAuthService, NgbModal, ProfileService
      ]
    })
      .compileComponents().then(() => {
        profileService = TestBed.inject(ProfileService);
        fixture = TestBed.createComponent(ProfilesComponent);
        languageService = TestBed.inject(TranslateService);
        component = fixture.componentInstance;
        component.enableMyCommunity = false;
        component.orgId = "470053";
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
        localStorage.setItem('calix.scopes', JSON.stringify(SCOPES));
      });
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ProfilesComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    let eng = new EnglishJSON;
    languageService.selectedLanguage.next(of(eng));
    environment.VALIDATE_SCOPE = "true";
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should get profiles data', fakeAsync(() => {
    spyOn(profileService, 'getProfileList').and.returnValue(of(profiles));
    spyOn(component, 'getProfileData').and.callThrough();
    fixture.detectChanges()
    component.getProfileData();
    flush(2000);
    expect(component.profileTableData).toBeTruthy("No data available");
    expect(component.profileTableData?.length).toBe(1, "Length is wrong");
    expect(component.profileTableData[0]?.configurations[0].category).toMatch("Data Service");
    fixture.destroy();
  }));

  it('should edit profiles data', () => {
    spyOn(profileService, 'getProfileDataById').and.returnValue(of(profiles));
    spyOn(component, 'editProfile').and.callThrough();
    component.editProfile(editprofileData);
    expect(component.editProfile).toHaveBeenCalled();
    expect(component.editProfile).toHaveBeenCalledTimes(1);
  });
  it('should profile count', () => {
    spyOn(profileService, 'getProfileCount').and.returnValue(of(34));
    spyOn(component, 'getProfileCount').and.callThrough();
    component.getProfileCount();
    // console.log(component.profileCountt)
    expect(component.profileCountt).toBe(34, "Length is wrong");
    expect(component.getProfileCount).toHaveBeenCalled();
    expect(component.getProfileCount).toHaveBeenCalledTimes(1);
  });
  it('should delete profile', () => {
    let data = {
      "numberOfRecords": 1
    }
    component.deleteProfileData = { _id: "a9989e31-9f1f-4c6c-ba37-eb4381f6ae7c" };
    spyOn(profileService, 'deleteProfileById').and.returnValue(of(data));
    spyOn(component, 'confirmDeleteSecleted').and.callThrough();
    component.confirmDeleteSecleted();
    // console.log(component.deleteRes);
    expect(component.deleteRes.numberOfRecords).toBe(1, "Length is wrong");
    expect(component.confirmDeleteSecleted).toHaveBeenCalled();
    expect(component.confirmDeleteSecleted).toHaveBeenCalledTimes(1);
  });
  it('should showOverView', () => {
    let item = {
      _id: "9dbd0067-c0b8-42a5-a256-d4f22efd9c9d"
    }
    spyOn(profileService, 'getProfileDataById').and.returnValue(of(editprofileData));
    spyOn(component, 'showOverView').and.callThrough();
    component.showOverView(editprofileData);
    expect(component.showOverView).toHaveBeenCalled();
    expect(component.showOverView).toHaveBeenCalledTimes(1);
  });
  it('should showOverView', () => {

    spyOn(component, 'onAddProfile').and.callThrough();
    component.onAddProfile();
    expect(component.onAddProfile).toHaveBeenCalled();
    expect(component.onAddProfile).toHaveBeenCalledTimes(1);
  });
  it('should deleteProfile', () => {

    spyOn(component, 'deleteProfile').and.callThrough();
    component.deleteProfile(editprofileData);
    expect(component.deleteProfile).toHaveBeenCalled();
    expect(component.deleteProfile).toHaveBeenCalledTimes(1);
  });
  it('pageErrorHandle function if case', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough();
    component.pageErrorHandle(errorStatus401);
    expect(component.pageErrorHandle).toHaveBeenCalled();
  });
  it('pageErrorHandle function else case', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough();
    component.pageErrorHandle(errorStatus500);
    expect(component.pageErrorHandle).toHaveBeenCalled();
  });

});

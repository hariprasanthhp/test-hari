import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { SCOPES } from 'src/assets/mockdata/shared/services/scopes';
import { category, profileReviewData } from 'src/assets/mockdata/support/netops-management/operations/profiles/profile.reviewdata';
import { CategoryConfigurationService } from '../../../services/category-config.service';
import { ProfileService } from '../../../services/profile.service';
import { ProfileReviewWizardComponent } from './profile-review-wizard.component';

describe('ProfileReviewWizardComponent', () => {
  let component: ProfileReviewWizardComponent;
  let fixture: ComponentFixture<ProfileReviewWizardComponent>;
  let profileService: ProfileService;
  let categoryConfigService: CategoryConfigurationService;
  let languageService: TranslateService;
  let route: ActivatedRoute;
  let router: Router;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileReviewWizardComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [
        TranslateService
      ]
    })
      .compileComponents().then(() => {
        categoryConfigService = TestBed.inject(CategoryConfigurationService);
        fixture = TestBed.createComponent(ProfileReviewWizardComponent);
        languageService = TestBed.inject(TranslateService);
        component = fixture.componentInstance;
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
        localStorage.setItem('calix.scopes', JSON.stringify(SCOPES));
      });;
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ProfileReviewWizardComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    let eng = new EnglishJSON;
    languageService.selectedLanguage.next(of(eng));
    component.addProfileObj = profileReviewData;
    component.ngOnInit();
    // let accordinToggle = fixture.nativeElement.querySelector('#daccordinToggle');
    // accordinToggle.click();
    expect(component).toBeTruthy();
  });

  it('should dualStack', () => {
    const item = [
      {
        category: "test",
        parameterValues: {
          version: "dualStack",

        },
        selectedCategory: [],
        buildCategoryFormData: []
      }]

    component.addProfileObj = {
      buildProfile: {
        reviewPageCategoryList: item,

      }
    };
    expect(component).toBeTruthy();
  });
  it('should VlanTagAction And Not Voice Service', () => {
    const item = [
      {
        category: "test",
        parameterValues: {
          VlanTagAction: false

        },
        selectedCategory: [],
        buildCategoryFormData: []
      }]

    component.addProfileObj = {
      buildProfile: {
        reviewPageCategoryList: item,

      }
    };
    expect(component).toBeTruthy();
  });
  it('should VlanTagAction And Not Voice Service', () => {
    const item = [
      {
        category: "Voice Service",
        parameterValues: {
          VlanTagAction: false

        },
        selectedCategory: [],
        buildCategoryFormData: []
      }]

    component.addProfileObj = {
      buildProfile: {
        reviewPageCategoryList: item,

      }
    };
    expect(component).toBeTruthy();
  });
  it('should Not QosType And QOS Rule', () => {
    const item = [
      {
        category: "QOS Rule",
        parameterValues: {
          QosType: "Test"

        },
        selectedCategory: [],
        buildCategoryFormData: []
      }]

    component.addProfileObj = {
      buildProfile: {
        reviewPageCategoryList: item,

      }
    };
    expect(component).toBeTruthy();
  });
  it('should  QosType And QOS Rule', () => {
    const item = [
      {
        category: "QOS Rule",
        parameterValues: {
          QosType: "Custom"

        },
        selectedCategory: [],
        buildCategoryFormData: []
      }]

    component.addProfileObj = {
      buildProfile: {
        reviewPageCategoryList: item,

      }
    };
    expect(component).toBeTruthy();
  });
  it('should Not QosType And Data Service', () => {
    const item = [
      {
        category: "Data Service",
        parameterValues: {
        },
        selectedCategory: [],
        buildCategoryFormData: []
      }]

    component.addProfileObj = {
      buildProfile: {
        reviewPageCategoryList: item,

      }
    };
    expect(component).toBeTruthy();
  });
  it('should Not QosType And Data Service', () => {
    const item = [
      {
        category: "Data Service",
        parameterValues: {
          Mode: "RG L2 Bridged",
          productFamily: "EXOS",
          AnyPortAnyServiceEnabled: true
        },
        selectedCategory: [{
          "name": "productFamily",
          "displayName": "Product Family(s)",
          "type": "dropDown",
          "valueEnums": [
            {
              "value": "GigaCenter",
              "displayName": "GigaCenter and GigaHub"
            },
            {
              "value": "EXOS",
              "displayName": "EXOS-Powered GigaFamily"
            }
          ],
        }],
        buildCategoryFormData: []
      }]

    component.addProfileObj = {
      buildProfile: {
        reviewPageCategoryList: item,

      }
    };
    expect(component).toBeTruthy();
  });

  it('should getRadioBtnLblValue', () => {
    spyOn(component, 'getRadioBtnLblValue').and.callThrough();
    var selectedCategory = [{
      "name": "productFamily",
      "displayName": "This hotspot has residential and SmartTown Wi-Fi users",
      "type": "dropDown",
      "valueEnums": [
        {
          "value": "GigaCenter",
          "displayName": "GigaCenter and GigaHub"
        },
        {
          "value": "EXOS",
          "displayName": "EXOS-Powered GigaFamily"
        }
      ]
    }];
    let btnVal = true;
    component.getRadioBtnLblValue(selectedCategory, btnVal);
    expect(component).toBeTruthy();
  });
});

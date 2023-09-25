import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPortalBrandingComponent } from './customer-portal-branding.component';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CustomerPortalBrandingComponent', () => {
  let component: CustomerPortalBrandingComponent;
  let fixture: ComponentFixture<CustomerPortalBrandingComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let ssoAuthService: SsoAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CustomerPortalBrandingComponent
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        FormGroupDirective,
        SsoAuthService,
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPortalBrandingComponent);
    component = fixture.componentInstance;
    ssoAuthService = TestBed.inject(SsoAuthService);
    component.parent.form = formBuilder.group({
      bgColor: '',
      fColor: '',
      pbColor: '',
      bfColor: '',
      logoImage: '',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
    component.ngOnInit();
    component.uploadLogo({
      target: {
        files: [
          { testData: 'testData' }
        ]
      }
    });
    component.deleteLogo();
    component.colorPickerChangedEvent('', 'fColor');
    component.submit();
  });
});

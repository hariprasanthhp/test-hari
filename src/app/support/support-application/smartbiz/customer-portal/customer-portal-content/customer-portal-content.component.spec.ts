import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPortalContentComponent } from './customer-portal-content.component';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

describe('CustomerPortalContentComponent', () => {
  let component: CustomerPortalContentComponent;
  let fixture: ComponentFixture<CustomerPortalContentComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CustomerPortalContentComponent,
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        FormGroupDirective,
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPortalContentComponent);
    component = fixture.componentInstance;
    component.parent.form = formBuilder.group({
      title: '',
      termsUrl: '',
      coverImage: '',
      buttonText: '',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    component.validateUrl();
    component.form.patchValue({
      termsUrl: 'https://www.youtube.com'
    });
    component.validateUrl();
    component.uploadCoverImage({
      target: {
        files: [
          { testData: 'testData' }
        ]
      }
    });
    component.deleteCoverImage();
    component.submit();

    const event: any = {
      key: '@#$%',
      clipboardData: {
        getData: (type: string) => '@#$%',
      },
      preventDefault: jasmine.createSpy('preventDefault')
    };
    component.validateString(event);
  });

  it('should return the correct title and buttonText', () => {
    component.form.patchValue({
      title: 'Test title',
      buttonText: 'Test button text',
    });

    expect(component.title).toEqual('Test title');
    expect(component.buttonText).toEqual('Test button text');
  });

});

import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { SmartbizComponent } from './smartbiz.component';
import { TranslateService } from 'src/app-services/translate.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('SmartbizComponent', () => {
  let component: SmartbizComponent;
  let fixture: ComponentFixture<SmartbizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmartbizComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [
        TranslateService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartbizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.translateService.selectedLanguage.next({});
    component.ngOnInit();
    component.ngOnDestroy();
  });
});

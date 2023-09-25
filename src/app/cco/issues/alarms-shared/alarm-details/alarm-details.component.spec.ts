import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlarmDetailsComponent } from './alarm-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { FormBuilder } from '@angular/forms';

describe('AlarmDetailsComponent', () => {
  let component: AlarmDetailsComponent;
  let fixture: ComponentFixture<AlarmDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmDetailsComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [FormBuilder,
        { provide: TranslateService, useClass: CustomTranslateService },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AlarmDetailsComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load ngOnDestroy', () => {
    //arrange
    (component as any).languageSubject = { unsubscribe: () => { } };
    //act
    component.ngOnDestroy();
  });

  it('should load error', () => {
    //arrange
    let emsg = "error"
    //act
    component.onErrorMsg(emsg);
    //assert
    expect(component.errorMsg).toEqual("error");
  });

  it('should enable loader', () => {
    //arrange
    let flag = true;
    //act
    component.onEnableLoader(flag);
    //assert
    expect(component.loader).toEqual(true);
  });
});

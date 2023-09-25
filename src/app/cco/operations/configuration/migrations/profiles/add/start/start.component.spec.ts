import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartComponent } from './start.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { FormBuilder } from '@angular/forms';

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        {
          provide: FormBuilder,
        },
        { provide: TranslateService, useClass: CustomTranslateService }
        ,
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of({ smpId: "121" })
          },
        }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(StartComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange
    (component as any).route = { queryParams: of({ smpId: "121" }) };
    spyOn(component, 'initialise');
    //act
    fixture.detectChanges();
    //assert
    expect(component.smpId).toEqual("121");
    expect(component.initialise).toHaveBeenCalled();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildProfileComponent } from './build-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';

describe('BuildProfileComponent', () => {
  let component: BuildProfileComponent;
  let fixture: ComponentFixture<BuildProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildProfileComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [TranslateService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});

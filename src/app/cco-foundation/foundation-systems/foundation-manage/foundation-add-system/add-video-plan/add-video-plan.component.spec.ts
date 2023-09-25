import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import { AddVideoPlanComponent } from './add-video-plan.component';

describe('AddVideoPlanComponent', () => {
  let component: AddVideoPlanComponent;
  let fixture: ComponentFixture<AddVideoPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVideoPlanComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, NgSelectModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, SsoAuthService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVideoPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

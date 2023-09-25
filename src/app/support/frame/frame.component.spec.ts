import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataServiceService } from '../data.service';
import { TranslateService } from 'src/app-services/translate.service';
import { FrameComponent } from './frame.component';
import { SsoAuthService } from './../../shared/services/sso-auth.service';

describe('FrameComponent', () => {
  let component: FrameComponent;
  let fixture: ComponentFixture<FrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameComponent ],
      imports:[RouterTestingModule,HttpClientTestingModule
],
      providers:[TranslateService,SsoAuthService,DataServiceService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from '../services/common.service';

import { CalixSupportCloudComponent } from './calix-support-cloud.component';

describe('CalixSupportCloudComponent', () => {
  let component: CalixSupportCloudComponent;
  let fixture: ComponentFixture<CalixSupportCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalixSupportCloudComponent ],
      imports: [
       HttpClientTestingModule
, RouterTestingModule
      ],
      providers: [
        CustomTranslateService, CommonService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalixSupportCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

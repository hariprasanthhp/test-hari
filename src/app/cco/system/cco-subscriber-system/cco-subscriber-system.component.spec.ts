import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { CcoCommonService } from '../../shared/services/cco-common.service';

import { CcoSubscriberSystemComponent } from './cco-subscriber-system.component';

describe('CcoSubscriberSystemComponent', () => {
  let component: CcoSubscriberSystemComponent;
  let fixture: ComponentFixture<CcoSubscriberSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcoSubscriberSystemComponent ],
      imports:[RouterTestingModule, HttpClientTestingModule
],
      providers:[TranslateService, NgbModal, CcoCommonService, Title]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoSubscriberSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

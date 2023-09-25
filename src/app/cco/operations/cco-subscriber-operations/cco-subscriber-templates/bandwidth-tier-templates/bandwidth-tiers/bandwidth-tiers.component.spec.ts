import {  HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';

import { BandwidthTiersComponent } from './bandwidth-tiers.component';

describe('BandwidthTiersComponent', () => {
  let component: BandwidthTiersComponent;
  let fixture: ComponentFixture<BandwidthTiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BandwidthTiersComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [
        HttpClient,
        CommonService,
        CustomTranslateService,
        NgbModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandwidthTiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

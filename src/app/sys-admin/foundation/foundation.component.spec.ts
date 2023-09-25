import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from '../services/common.service';

import { FoundationComponent } from './foundation.component';

describe('FoundationComponent', () => {
  let component: FoundationComponent;
  let fixture: ComponentFixture<FoundationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundationComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule
, NgSelectModule],
      providers: [TranslateService,CommonService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

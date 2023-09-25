import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';

import { LanSettingsComponent } from './lan-settings.component';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
describe('LanSettingsComponent', () => {
  let component: LanSettingsComponent;
  let fixture: ComponentFixture<LanSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanSettingsComponent],
      imports: [HttpClientTestingModule
, RouterTestingModule, NgSelectModule],
      providers: [TranslateService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

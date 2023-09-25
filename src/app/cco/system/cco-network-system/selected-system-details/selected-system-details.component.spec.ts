import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CcoCommonService } from 'src/app/cco/shared/services/cco-common.service';
import { CcoSystemService } from '../../services/cco-system.service';

import { SelectedSystemDetailsComponent } from './selected-system-details.component';

describe('SelectedSystemDetailsComponent', () => {
  let component: SelectedSystemDetailsComponent;
  let fixture: ComponentFixture<SelectedSystemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedSystemDetailsComponent ],
      imports:[RouterTestingModule, HttpClientTestingModule
],
      providers: [TranslateService, CcoCommonService, CcoSystemService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedSystemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

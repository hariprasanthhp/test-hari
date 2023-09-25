import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLimitComponent } from './time-limit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';

describe('TimeLimitComponent', () => {
  let component: TimeLimitComponent;
  let fixture: ComponentFixture<TimeLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeLimitComponent ],
      imports:[RouterTestingModule,HttpClientTestingModule
],
      providers:[TranslateService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

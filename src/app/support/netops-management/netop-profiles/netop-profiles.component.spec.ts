import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';

import { NetopProfilesComponent } from './netop-profiles.component';

describe('NetopProfilesComponent', () => {
  let component: NetopProfilesComponent;
  let fixture: ComponentFixture<NetopProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetopProfilesComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [
        TranslateService,

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetopProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

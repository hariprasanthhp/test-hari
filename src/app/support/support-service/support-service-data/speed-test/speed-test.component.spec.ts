import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SpeedTestComponent } from './speed-test.component';

describe('SpeedTestComponent', () => {
  let component: SpeedTestComponent;
  let fixture: ComponentFixture<SpeedTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeedTestComponent ],
      imports:[RouterTestingModule,HttpClientTestingModule
],
    })
    .compileComponents();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(SpeedTestComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

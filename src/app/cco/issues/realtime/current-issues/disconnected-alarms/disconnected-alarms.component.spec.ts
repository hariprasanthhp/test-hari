import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectedAlarmsComponent } from './disconnected-alarms.component';

describe('DisconnectedAlarmsComponent', () => {
  let component: DisconnectedAlarmsComponent;
  let fixture: ComponentFixture<DisconnectedAlarmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisconnectedAlarmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisconnectedAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

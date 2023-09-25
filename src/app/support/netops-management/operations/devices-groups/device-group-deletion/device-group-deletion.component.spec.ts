import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceGroupDeletionComponent } from './device-group-deletion.component';

describe('DeviceGroupDeletionComponent', () => {
  let component: DeviceGroupDeletionComponent;
  let fixture: ComponentFixture<DeviceGroupDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceGroupDeletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceGroupDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

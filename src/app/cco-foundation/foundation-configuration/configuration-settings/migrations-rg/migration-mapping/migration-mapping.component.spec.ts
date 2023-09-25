import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrationMappingComponent } from './migration-mapping.component';

describe('MigrationMappingComponent', () => {
  let component: MigrationMappingComponent;
  let fixture: ComponentFixture<MigrationMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigrationMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrationMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

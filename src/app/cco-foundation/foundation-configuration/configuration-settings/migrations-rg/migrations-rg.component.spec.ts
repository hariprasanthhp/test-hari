import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrationsRgComponent } from './migrations-rg.component';

describe('MigrationsRgComponent', () => {
  let component: MigrationsRgComponent;
  let fixture: ComponentFixture<MigrationsRgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigrationsRgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrationsRgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

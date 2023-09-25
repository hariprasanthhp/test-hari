import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcoNetworkConfigurationFilesComponent } from './cco-network-configuration-files.component';

describe('CcoNetworkConfigurationFilesComponent', () => {
  let component: CcoNetworkConfigurationFilesComponent;
  let fixture: ComponentFixture<CcoNetworkConfigurationFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcoNetworkConfigurationFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoNetworkConfigurationFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

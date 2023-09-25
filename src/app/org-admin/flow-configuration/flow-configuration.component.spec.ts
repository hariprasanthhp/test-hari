import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';

import { FlowConfigurationComponent } from './flow-configuration.component';

describe('FlowConfigurationComponent', () => {
  let component: FlowConfigurationComponent;
  let fixture: ComponentFixture<FlowConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowConfigurationComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule
],
      providers: [CommonService, CustomTranslateService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

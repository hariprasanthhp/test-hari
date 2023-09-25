import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonService } from '../sys-admin/services/common.service';

import { FlowConfigComponent } from './flow-config.component';

describe('FlowConfigComponent', () => {
  let component: FlowConfigComponent;
  let fixture: ComponentFixture<FlowConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowConfigComponent ],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [
        CommonService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

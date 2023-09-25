import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';

import { CcoNetworkWorkflowsComponent } from './cco-network-workflows.component';

describe('CcoNetworkWorkflowsComponent', () => {
  let component: CcoNetworkWorkflowsComponent;
  let fixture: ComponentFixture<CcoNetworkWorkflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule],
      providers: [TranslateService, HttpClient],
      declarations: [CcoNetworkWorkflowsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoNetworkWorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

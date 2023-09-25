
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';

import { CcoNetworkPolicesComponent } from './cco-network-polices.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CcoNetworkPolicesComponent', () => {
  let component: CcoNetworkPolicesComponent;
  let fixture: ComponentFixture<CcoNetworkPolicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcoNetworkPolicesComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [
        TranslateService, Title]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoNetworkPolicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

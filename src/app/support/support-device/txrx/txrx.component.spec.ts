import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataServiceService } from '../../data.service';

import { TXRXComponent } from './txrx.component';

describe('TXRXComponent', () => {
  let component: TXRXComponent;
  let fixture: ComponentFixture<TXRXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TXRXComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
],
      providers: [DataServiceService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TXRXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

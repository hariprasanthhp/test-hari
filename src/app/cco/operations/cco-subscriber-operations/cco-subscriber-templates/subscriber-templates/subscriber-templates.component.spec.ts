import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SubscriberTemplatesComponent } from './subscriber-templates.component';

describe('SubscriberTemplatesComponent', () => {
  let component: SubscriberTemplatesComponent;
  let fixture: ComponentFixture<SubscriberTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscriberTemplatesComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SubscriberTemplateComponent } from './subscriber-template.component';

describe('SubscriberTemplateComponent', () => {
  let component: SubscriberTemplateComponent;
  let fixture: ComponentFixture<SubscriberTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscriberTemplateComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

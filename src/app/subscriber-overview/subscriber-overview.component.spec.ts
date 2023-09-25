import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';

import { SubscriberOverviewComponent } from './subscriber-overview.component';

describe('SubscriberOverviewComponent', () => {
  let component: SubscriberOverviewComponent;
  let fixture: ComponentFixture<SubscriberOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscriberOverviewComponent],
      imports: [AppModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';

import { ShadFooterComponent } from './shad-footer.component';

describe('ShadFooterComponent', () => {
  let component: ShadFooterComponent;
  let fixture: ComponentFixture<ShadFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShadFooterComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule
],
      providers: [TranslateService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

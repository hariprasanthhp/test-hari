import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';

import { ShadHeaderComponent } from './shad-header.component';

describe('ShadHeaderComponent', () => {
  let component: ShadHeaderComponent;
  let fixture: ComponentFixture<ShadHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShadHeaderComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
, SharedUtilsModule],
      providers: [TranslateService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

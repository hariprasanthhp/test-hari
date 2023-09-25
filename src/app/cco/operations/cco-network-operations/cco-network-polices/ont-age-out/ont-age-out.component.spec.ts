import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';

import { OntAgeOutComponent } from './ont-age-out.component';

describe('OntAgeOutComponent', () => {
  let component: OntAgeOutComponent;
  let fixture: ComponentFixture<OntAgeOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OntAgeOutComponent],
      imports: [
        RouterTestingModule, HttpClientModule, FormsModule
      ], providers: [
        TranslateService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OntAgeOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

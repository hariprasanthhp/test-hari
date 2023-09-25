import { HttpClientModule
, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OrgAccessFooterComponent } from './org-access-footer.component';

describe('OrgAccessFooterComponent', () => {
  let component: OrgAccessFooterComponent;
  let fixture: ComponentFixture<OrgAccessFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgAccessFooterComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
],
      providers: [

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAccessFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

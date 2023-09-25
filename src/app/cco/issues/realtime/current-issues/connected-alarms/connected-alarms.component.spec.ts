import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectedAlarmsComponent } from './connected-alarms.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTablesModule } from 'angular-datatables';
import { Router } from '@angular/router';

describe('ConnectedAlarmsComponent', () => {
  let component: ConnectedAlarmsComponent;
  let fixture: ComponentFixture<ConnectedAlarmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectedAlarmsComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, DataTablesModule, FormsModule, RouterTestingModule, ReactiveFormsModule
      ],
      providers: [
        {
          provide: Router, useValue: {
            url: "",
          }
        }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ConnectedAlarmsComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load data', () => {
    //act
    component.ngOnInit();
    //assert
    expect(component.apiUrl).toEqual("analytics-engine/topAlarm");

    //act
    component.ngOnInit();
    //assert
    expect(component.apiUrl).toEqual("analytics-engine/cloudHealthRealTime");
  });
});

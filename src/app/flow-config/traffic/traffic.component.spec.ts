import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { TrafficComponent } from './traffic.component';

describe('TrafficComponent', () => {
  let component: TrafficComponent;
  let fixture: ComponentFixture<TrafficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrafficComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: TranslateService, useClass: CustomTranslateService },
        {
          provide: Router, useValue: {
            url: 'traffic',
          }
        },

        {
          provide: WebsocketService, useValue: {}
        },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(TrafficComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange

    //act
    fixture.detectChanges();
    //assert
    expect(component.menus[0].link).toEqual('network');
    expect(component.menus[1].link).toEqual('location');
    expect(component.menus[2].link).toEqual('application');
  });
});

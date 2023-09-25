import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';

import { AlarmGroupsDatatableComponent } from './alarm-groups-datatable.component';

describe('AlarmGroupsDatatableComponent', () => {
  let component: AlarmGroupsDatatableComponent;
  let fixture: ComponentFixture<AlarmGroupsDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmGroupsDatatableComponent],
      imports: [RouterTestingModule, NgSelectModule],
      providers: [TranslateService, CustomTranslateService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmGroupsDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

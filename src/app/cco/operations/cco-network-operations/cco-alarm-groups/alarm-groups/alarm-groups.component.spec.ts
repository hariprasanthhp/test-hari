import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';

import { AlarmGroupsComponent } from './alarm-groups.component';

describe('AlarmGroupsComponent', () => {
  let component: AlarmGroupsComponent;
  let fixture: ComponentFixture<AlarmGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmGroupsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, NgbModal, FormsModule],
      providers: [TranslateService, CommonService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

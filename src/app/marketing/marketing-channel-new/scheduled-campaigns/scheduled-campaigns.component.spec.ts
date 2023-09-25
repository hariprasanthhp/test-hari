import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledCampaignsComponent } from './scheduled-campaigns.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';

describe('ScheduledCampaignsComponent', () => {
  let component: ScheduledCampaignsComponent;
  let fixture: ComponentFixture<ScheduledCampaignsComponent>;
  // let dialogService: NgbModal;
  let dialogService: jasmine.SpyObj<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledCampaignsComponent ],
      imports: [RouterTestingModule, HttpClientModule, HttpClientTestingModule],
      providers: [HttpClient,NgbModal,TranslateService,
        { provide: TranslateService, useClass: CustomTranslateService },
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ScheduledCampaignsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });    

  it('should create', () => {
    const model = 'dialog-model';
    spyOn((component as any).dialogService,'open');
    component.modalOpen(model);
  });
});

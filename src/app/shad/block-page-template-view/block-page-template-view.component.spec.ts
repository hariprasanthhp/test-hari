import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';

import { BlockPageTemplateViewComponent } from './block-page-template-view.component';

describe('BlockPageTemplateViewComponent', () => {
  let component: BlockPageTemplateViewComponent;
  let fixture: ComponentFixture<BlockPageTemplateViewComponent>;
  let languageService: TranslateService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      declarations: [BlockPageTemplateViewComponent],
      providers: [DomSanitizer, TranslateService, CommonService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockPageTemplateViewComponent);
    languageService = TestBed.inject(TranslateService)
    router = TestBed.inject(Router)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize onInit()', () => {
    spyOn(component, 'getData').and.callThrough()
    languageService.selectedLanguage.subscribe(data => {
      component.language = data;
    })
    component.ngOnInit()
    expect(component.getData).toHaveBeenCalled()
    expect(component.getData).toHaveBeenCalledTimes(1)
  });

  it('should getData Details', () => {
    spyOn(component,'getData').and.callThrough()
    component.getData()
    expect(component.getData).toHaveBeenCalled()
    expect(component.getData).toHaveBeenCalledTimes(1)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

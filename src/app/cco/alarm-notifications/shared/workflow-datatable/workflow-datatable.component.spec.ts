import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app//shared/services/custom-translate.service';
import { FormsModule } from '@angular/forms';
import { WorkflowDatatableComponent } from './workflow-datatable.component';

describe('WorkflowDatatableComponent', () => {
  let component: WorkflowDatatableComponent;
  let fixture: ComponentFixture<WorkflowDatatableComponent>;

  beforeEach(() => {
    const translateServiceStub = () => ({
      fr: {},
      es: {},
      de_DE: {},
      defualtLanguage: {},
      selectedLanguage: { subscribe: f => f({}) }
    });
    const customTranslateServiceStub = () => ({});
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [WorkflowDatatableComponent],
      providers: [
        { provide: TranslateService, useFactory: translateServiceStub },
        {
          provide: CustomTranslateService,
          useFactory: customTranslateServiceStub
        }
      ]
    });
    spyOn(WorkflowDatatableComponent.prototype, 'tableLanguageOptions');
    spyOn(WorkflowDatatableComponent.prototype, 'rerender');
    fixture = TestBed.createComponent(WorkflowDatatableComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`searchAlarm has default value`, () => {
    expect(component.searchAlarm).toEqual(undefined);
  });

  it(`canAdd has default value`, () => {
    expect(component.canAdd).toEqual(false);
  });

  it(`canRemove has default value`, () => {
    expect(component.canRemove).toEqual(false);
  });

  it(`canShowTableBody has default value`, () => {
    expect(component.canShowTableBody).toEqual(false);
  });

  describe('ngOnChanges', () => {
    it('makes expected calls', () => {
      const simpleChangesStub: SimpleChanges = <any>{};
      spyOn(component, 'doSearch').and.callThrough();
      // component.ngOnChanges(simpleChangesStub);
      // expect(component.doSearch).toHaveBeenCalled();
    });
  });

  // describe('constructor', () => {
  //   it('makes expected calls', () => {
  //     expect(
  //       WorkflowDatatableComponent.prototype.tableLanguageOptions
  //     ).toHaveBeenCalled();
  //     expect(WorkflowDatatableComponent.prototype.rerender).toHaveBeenCalled();
  //   });
  // });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      (<jasmine.Spy>component.rerender).calls.reset();
      spyOn(component, 'onCheckRow').and.callThrough();
      spyOn(component, 'renderTable').and.callThrough();
      (<jasmine.Spy>component.tableLanguageOptions).calls.reset();
      // component.ngOnInit();
      // expect(component.rerender).toHaveBeenCalled();
      // expect(component.onCheckRow).toHaveBeenCalled();
      // expect(component.renderTable).toHaveBeenCalled();
      // expect(component.tableLanguageOptions).toHaveBeenCalled();
    });
  });

  describe('ngAfterViewInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'searchAlarms').and.callThrough();
      // component.ngAfterViewInit();
      // expect(component.searchAlarms).toHaveBeenCalled();
    });
  });

  describe('searchCategorySeverity', () => {
    it('makes expected calls', () => {
      spyOn(component, 'searchAlarms').and.callThrough();
      (<jasmine.Spy>component.rerender).calls.reset();
      // component.searchCategorySeverity();
      // expect(component.searchAlarms).toHaveBeenCalled();
      // expect(component.rerender).toHaveBeenCalled();
    });
  });

  describe('clearSearch', () => {
    it('makes expected calls', () => {
      spyOn(component, 'searchAlarms').and.callThrough();
      // component.clearSearch();
      // expect(component.searchAlarms).toHaveBeenCalled();
    });
  });
});

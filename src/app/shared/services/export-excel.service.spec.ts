import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ExportExcelService } from './export-excel.service';

describe('ExportExcelService', () => {
  let service: ExportExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(ExportExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

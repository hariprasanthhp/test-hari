import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { aggregationData, currentRuleData, deleteMappingItem, dhcpKeyData, getOrgListMappingSource, selectedList, subscribeRuleData } from 'src/assets/mockdata/admin/flowconfig/endpoint/mappingsource.data';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { EndpointMappingSourceService } from '../../services/endpoint-mapping-source.service';

import { MappingSourceComponent } from './mapping-source.component';

describe('MappingSourceComponent', () => {
  let component: MappingSourceComponent;
  let fixture: ComponentFixture<MappingSourceComponent>;
  let service: EndpointMappingSourceService;
  let languageService: TranslateService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MappingSourceComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , NgSelectModule, FormsModule
      ],
      providers: [SsoAuthService, NgbModal, CommonService, TranslateService, EndpointMappingSourceService, Title
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    languageService = TestBed.inject(TranslateService)
    service = TestBed.inject(EndpointMappingSourceService)
  });

  it('should call getData Details', () => {
    spyOn(service, 'getList').and.returnValue(of(getOrgListMappingSource))
    spyOn(component, 'getData').and.callThrough()
    component.getData()
    expect(component.loading).toBeFalsy()
    expect(component.new).toBeFalsy()
    expect(component.getData).toHaveBeenCalled()

  })

  it('should call getKeyConfigurations details', () => {
    spyOn(service, 'getDHCPKeyConfiguration').and.returnValue(of(dhcpKeyData))
    spyOn(component, 'getKeyConfigurations').and.callThrough()
    component.getKeyConfigurations()
    expect(component.keyConfigs).toBe(dhcpKeyData)
    expect(component.getKeyConfigurations).toHaveBeenCalled()
  })

  it('should call getKeyConfigurations no response', () => {
    spyOn(service, 'getDHCPKeyConfiguration').and.returnValue(of({}))
    spyOn(component, 'getKeyConfigurations').and.callThrough()
    component.getKeyConfigurations()
    expect(component.keyConfigDefaultObj.macAddress).toBeFalsy()
    expect(component.getKeyConfigurations).toHaveBeenCalled()
  })

  it('should call resetKeyConfigurations details', () => {
    spyOn(component, 'resetKeyConfigurations').and.callThrough()
    component.resetKeyConfigurations()
    expect(component.resetKeyConfigurations).toHaveBeenCalled()
  })

  it('should Handle the error 400', () => {
    let error: any = {
      "statusText": "Not Found",
      "ok": false,
      "name": "HttpErrorResponse",
      "error": "Not Found",
      "status": 400
    }
    spyOn(component, 'pageErrorHandle').and.callThrough()
    component.pageErrorHandle(error)
    expect(component.infoTitle).toBe('Error')
    expect(component.loading).toBeFalsy()
  })

  it('should Handle the error 401', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough()
    component.pageErrorHandle(errorStatus401)
    expect(component.pageErrorHandle).toHaveBeenCalled()
  })

  it('should closeModal', () => {
    spyOn(component, 'closeModal').and.callThrough()
    component.closeModal()
    expect(component.closeModal).toHaveBeenCalled()
  })

  it('should openInfoModal', () => {
    spyOn(component, 'openInfoModal').and.callThrough()
    component.openInfoModal()
    expect(component.openInfoModal).toHaveBeenCalled()
  })

  it('should openTab', () => {
    spyOn(component, 'openTab').and.callThrough()
    component.openTab()
    expect(component.showTab).toBe(true)
  })

  it('should cancel', () => {
    spyOn(component, 'cancel').and.callThrough()
    component.cancel()
    expect(component.edit).toBeFalsy()
  })

  it('should call cancelWithGet', () => {
    spyOn(component, 'cancelWithGet').and.callThrough()
    component.cancelWithGet()
    expect(component.selectList.length).toBe(0)
  })

  it('should submit', () => {
    spyOn(component, 'submit').and.callThrough()
    component.submit()
    expect(component.edit).toBeFalsy()
  })

  it('should doEdit', () => {
    spyOn(component, 'doEdit').and.callThrough()
    component.doEdit()
    expect(component.edit).toBe(true)
  })

  // it('should call deleteAttr Details', () => {
  //   component.currentRuleData = currentRuleData
  //   spyOn(component, 'deleteAttr').and.callThrough()
  //   component.deleteAttr('radiusUserName', 0)
  //   expect(component.deleteAttr).toHaveBeenCalled()
  // })

  it('should dropMappingSource', () => {
    let event: any = {
      previousIndex: 0,
      currentIndex: 0
    }
    spyOn(component, 'dropMappingSource').and.callThrough()
    component.dropMappingSource(event)
    expect(component.dropMappingSource).toHaveBeenCalled()
  })

  // it('should dropFiledToCurrentRuleData', () => {
  //   let event: any = {
  //     previousIndex: 0,
  //     currentIndex: 0
  //   }
  //   spyOn(component, 'dropFiledToCurrentRuleData').and.callThrough()
  //   component.currentRuleData = currentRuleData
  //   component.dropFiledToCurrentRuleData(event, 0)
  //   expect(component.dropFiledToCurrentRuleData).toHaveBeenCalled()
  // })

  // it('should dropFieledToCurrentAggreRuleData', () => {
  //   let event: any = {
  //     previousIndex: 0,
  //     currentIndex: 0
  //   }
  //   spyOn(component, 'dropFieledToCurrentAggreRuleData').and.callThrough()
  //   component.aggregationCurrentRuleData = aggregationData
  //   component.dropFieledToCurrentAggreRuleData(event, 0)
  //   expect(component.dropFieledToCurrentAggreRuleData).toHaveBeenCalled()
  // })

  it('should changeDelimiter', () => {
    let event: any = {
      previousIndex: 0,
      currentIndex: 0
    }
    spyOn(component, 'changeDelimiter').and.callThrough()
    component.changeDelimiter(event, 0)
    expect(component.changeDelimiter).toHaveBeenCalled()
  })

  it('should getTitle', () => {
    spyOn(component, 'getTitle').and.callThrough()
    component.getTitle('RADIUS')
    expect(component.getTitle).toHaveBeenCalled()
  })

  it('should call confirmAggregationRuleApply', () => {
    spyOn(component, 'confirmAggregationRuleApply').and.callThrough()
    component.confirmAggregationRuleApply()
    expect(component.showTab).toBeFalsy()
    expect(component.confirmAggregationRuleApply).toHaveBeenCalled()
  })

  it('should closeTab', () => {
    spyOn(component, 'closeTab').and.callThrough()
    component.closeTab()
    expect(component.closeTab).toHaveBeenCalled()
  })

  it('should deleteAggregationAttr details', () => {
    component.aggregationCurrentRuleData = aggregationData
    spyOn(component, 'deleteAggregationAttr').and.callThrough()
    component.deleteAggregationAttr('radiusUserName', 0)
    expect(component.deleteAggregationAttr).toHaveBeenCalled()
  })

  // it('should deleteSbscbrAttr details', () => {
  //   component.sbscbrCurrentRuleData = subscribeRuleData
  //   spyOn(component, 'deleteSbscbrAttr').and.callThrough()
  //   component.deleteSbscbrAttr('DHCP', 0)
  //   expect(component.deleteSbscbrAttr).toHaveBeenCalled()
  // })

  it('should deleteSbscbrRule details', () => {
    component.sbscbrCurrentRuleData = subscribeRuleData
    spyOn(component, 'deleteSbscbrRule').and.callThrough()
    component.deleteSbscbrRule('DHCP', 0)
    expect(component.deleteSbscbrRule).toHaveBeenCalled()
  })

  it('should deleteRule details', () => {
    component.currentRuleData = currentRuleData
    spyOn(component, 'deleteRule').and.callThrough()
    component.deleteRule('radiusUserName', 0)
    expect(component.deleteRule).toHaveBeenCalled()
  })

  it('should deleteMapping details', () => {
    component.selectList = selectedList
    spyOn(component, 'deleteMapping').and.callThrough()
    component.deleteMapping(deleteMappingItem)
    expect(component.deleteMapping).toHaveBeenCalled()
  })

  it('should cancelAggregationRuleApply', () => {
    component.aggregationCurrentRuleData = aggregationData
    spyOn(component, 'cancelAggregationRuleApply').and.callThrough()
    component.cancelAggregationRuleApply()
    expect(component.cancelAggregationRuleApply).toHaveBeenCalled()
  })

  it('should call dropCurrentRuleData', () => {
    let event: any = {
      previousIndex: 0,
      currentIndex: 0
    }
    component.currentRuleData = currentRuleData;
    spyOn(component, 'dropCurrentRuleData').and.callThrough()
    component.dropCurrentRuleData(event)
    expect(component.dropCurrentRuleData).toHaveBeenCalled()
  })

  // it('should call checkFieldsLength', () => {
  //   spyOn(component, 'checkFieldsLength').and.callThrough()
  //   component.mpngRuleObj = subscribeRuleData;
  //   component.checkFieldsLength('DHCP', 0)
  //   expect(component.checkFieldsLength).toHaveBeenCalled()
  // })

  // it('should call checkSbscbrFieldsLength', () => {
  //   component.sbscbrRuleObj = subscribeRuleData;
  //   spyOn(component, 'checkSbscbrFieldsLength').and.callThrough()
  //   component.checkSbscbrFieldsLength('DHCP', 0)
  //   expect(component.checkSbscbrFieldsLength).toHaveBeenCalled()
  // })

  // it('should call checkAggreFieldsLength', () => {
  //   component.aggregationRuleObj = subscribeRuleData;
  //   spyOn(component, 'checkAggreFieldsLength').and.callThrough()
  //   component.checkAggreFieldsLength('DHCP', 0)
  //   expect(component.checkAggreFieldsLength).toHaveBeenCalled()
  // })

  it('should save Details', () => {
    component.selectList = selectedList;
    spyOn(component, 'save').and.callThrough()
    component.save()
    expect(component.save).toHaveBeenCalled()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

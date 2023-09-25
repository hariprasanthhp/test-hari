import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { addSubnetData, compareJsonToTableData, deleteSubnetData, error417, getSubnetData, importedSubnetData, postparamsforImportSubnet, updateSubnetData } from 'src/assets/mockdata/admin/flowconfig/endpoint/subnet.data';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { CommonFunctionsService } from '../../services/common-functions.service';
import { DataTablecreatorService } from '../../services/data-tablecreator.service';
import { EndpointSubnetService } from '../../services/endpoint-subnet.service';

import { SubnetComponent } from './subnet.component';

describe('SubnetComponent', () => {
  let component: SubnetComponent;
  let fixture: ComponentFixture<SubnetComponent>;
  let languageService: TranslateService;
  let service: EndpointSubnetService;
  let router: Router;
  let dtableService: DataTablecreatorService;
  const org_Id = '10009';
  const item = {
    "uuid": "5681ccc0-42b6-4603-a0fd-b4a94a5e28f5",
    "orgId": 10009,
    "name": "Account Inquiry",
    "ctime": "2021-10-06T12:30:33.000+0000",
    "mtime": "2022-08-05T13:34:10.000+0000",
    "selection": "single",
    "categories": {
      "Customer on Phone": {
        "subcategories": null,
        "selection": "single"
      },
      "Customer in-person": {
        "subcategories": null,
        "selection": "single"
      },
      "Customer not present": {
        "subcategories": null,
        "selection": "single"
      },
      "Call center escalation": {
        "subcategories": null,
        "selection": "single"
      }
    }
  }
  const settings: any = {
    onFeature: {
      bAutoWidth: true,
      bDeferRender: false,
      bFilter: true,
      bInfo: true,
      bLengthChange: false,
      bPaginate: true,
      bProcessing: false,
      bServerSide: false,
      bSort: true,
      bSortClasses: true,
      bSortMulti: true,
      bStateSave: null
    },
    ajax: null,
    _iDisplayStart: 0,
    aoData: [],
    _iDisplayLength: 0,
    aaSorting: [1, 'asc', 0],
    aiDisplay: [0],
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubnetComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , DataTablesModule, FormsModule
      ],
      providers: [
        SsoAuthService, CommonFunctionsService, ExportExcelService, DataTablecreatorService, NgbModal, CommonService, TranslateService, EndpointSubnetService, Title
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnetComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(EndpointSubnetService)
    languageService = TestBed.inject(TranslateService)
    router = TestBed.inject(Router)
    dtableService = TestBed.inject(DataTablecreatorService)
    fixture.detectChanges();
  });

  it('should initialize onInit()', () => {
    spyOn(component, 'tableLanguageOptions').and.callThrough()
    languageService.selectedLanguage.subscribe(data => {
      component.language = data;
    })
    component.ngOnInit()
    expect(component.tableLanguageOptions).toHaveBeenCalled()
    expect(component.tableLanguageOptions).toHaveBeenCalledTimes(1)
  });

  it('should getSubnets Details', () => {
    spyOn(service, 'getSubnets').and.returnValue(of(getSubnetData))
    spyOn(component, 'getSubnets').and.callThrough()
    component.getSubnets()
    expect(component.subnetResponseData).toBeTruthy('value is not matched')
    expect(component.subnetResponseData.length).toBeGreaterThan(1)
    expect(component.getSubnets).toHaveBeenCalled()
    expect(component.getSubnets).toHaveBeenCalledTimes(1)
  });


  it('should create subnet Details', () => {
    spyOn(component, 'create').and.callThrough()
    component.create()
    expect(component.buttonVisible).toBeFalse();
    expect(component.formVisible).toBe(true);
  })

  it('should delete subnet Details', () => {
    component.deleteData = item
    let params = [{
      name: 't3',
      subnets: '43.0.0.30/30'
    }];
    spyOn(service, 'deleteSubnet').and.returnValue(of(deleteSubnetData))
    spyOn(component, 'confirmDelete').and.callThrough()
    service.deleteSubnet(params, org_Id)
    component.confirmDelete()
    expect(component.deleteResponse).toBeTruthy('value is not matched')
    expect(component.deleteResponse).toBe(deleteSubnetData, 'value mismatch')
    expect(component.confirmDelete).toHaveBeenCalled()
    expect(component.confirmDelete).toHaveBeenCalledTimes(1)
  })

  it('should call editData Details', () => {
    spyOn(component, 'edit').and.callThrough()
    component.edit(item)
    expect(component.edit).toHaveBeenCalled()
    expect(component.edit).toHaveBeenCalledTimes(1)
  })

  it('should call addsubnet Details', () => {
    component.createSubnet = 't3'
    spyOn(component, 'addSubnet').and.callThrough()
    component.addSubnet()
    expect(component.addSubnet).toHaveBeenCalled()
    expect(component.addSubnet).toHaveBeenCalledTimes(1)
  })

  it('should addSubnet Details', () => {
    const params = {
      orgId: '10009',
      name: 't3',
      subnets: '43.0.0.30/30'
    }
    spyOn(service, 'addSubnet').and.returnValue(of(addSubnetData))
    spyOn(component, 'submit').and.callThrough()
    service.addSubnet(params, org_Id)
    component.submit()
    expect(component.addSubnetResponse).toBeUndefined()
    expect(component.submit).toHaveBeenCalled()
    expect(component.submit).toHaveBeenCalledTimes(1)
  });

  it('should updateCancel details', () => {
    spyOn(component, 'updateCancel').and.callThrough()
    component.updateCancel()
    expect(component.editOnValue).toBeUndefined()
    expect(component.updateCancel).toHaveBeenCalled()
    expect(component.updateCancel).toHaveBeenCalledTimes(1)
  });

  it('should call cancel details', () => {
    spyOn(component, 'cancel').and.callThrough()
    component.cancel()
    expect(component.formVisible).toBeFalse();
    expect(component.buttonVisible).toBe(true);
    expect(component.tablePreview).toBeFalse();
    expect(component.editOnValue).toBeUndefined()
    expect(component.cancel).toHaveBeenCalled()
    expect(component.cancel).toHaveBeenCalledTimes(1)
  })

  it('should get fullImport details', () => {
    spyOn(component, 'fullImportUpload').and.callThrough()
    component.fullImportUpload()
    expect(component.fullImportUpload).toHaveBeenCalled()
    expect(component.fullImportUpload).toHaveBeenCalledTimes(1)
  })

  it('tableLanguageOptions', () => {
    spyOn(component, 'tableLanguageOptions').and.callThrough()
    component.language.fileLanguage = 'fr';
    component.tableLanguageOptions();
    component.language.fileLanguage = 'es';
    component.tableLanguageOptions();
    component.language.fileLanguage = 'de_DE';
    component.tableLanguageOptions();
    component.language.fileLanguage = 'en';
    component.tableLanguageOptions();
    expect(component.tableLanguageOptions).toHaveBeenCalled()
  });

  it('should close MultiDelete Modal', () => {
    spyOn(component, 'closeMultiDeleteModal').and.callThrough()
    spyOn(component, 'closeModal').and.callThrough()
    component.closeMultiDeleteModal()
    expect(component.deleteIds).toEqual([]);
    expect(component.deleteSubnets).toEqual([]);
    expect(component.closeModal).toHaveBeenCalled()
    expect(component.closeMultiDeleteModal).toHaveBeenCalled()
  })

  it('should close Delete Modal', () => {
    spyOn(component, 'closeDeleteModal').and.callThrough()
    component.closeDeleteModal()
    expect(component.deleteData).toBeUndefined();
  });

  it('should cancel delete method', () => {
    spyOn(component, 'cancelDelete').and.callThrough()
    component.cancelDelete()
    expect(component.deleteData).toBeUndefined();
  })

  it('should delete subnet', () => {
    let data = { name: "t2", subnets: "43.0.0.50/30" }
    spyOn(component, 'delete').and.callThrough()
    component.delete(data)
    expect(component.deleteData).toBe(data)
    expect(component.infoTitle).toBe('Delete endpoint subnet rule?')
    expect(component.infoBody).toBe(data.name)
    expect(component.delete).toHaveBeenCalled()
  })

  it('should update name details', () => {
    component.editName = '';
    spyOn(component, 'updateSave').and.callThrough()
    spyOn(component, 'openInfoModal').and.callThrough()
    component.openInfoModal(false)
    component.updateSave('1')
    expect(component.infoBody).toEqual('')
    expect(component.infoTitle).toBe("Invalid subnet" ? "Invalid subnet" : "Invalid name")
    expect(component.updateSave).toHaveBeenCalled()
    expect(component.openInfoModal).toHaveBeenCalled()
  })

  it('should call setTableOptions details', () => {
    spyOn(component.tableOptions, 'drawCallback').and.callThrough()
    component.tableOptions.drawCallback(settings)
    expect(component.tableOptions.drawCallback).toHaveBeenCalled()
  });

  it('should  validateSubnetv4 with subnet', () => {
    let subnet = '192.32.13.2/22';
    let ip = service.trimSubnet(subnet);
    spyOn(component, 'validateSubnetv4').and.callThrough()
    component.validateSubnetv4(subnet)
    expect(component.subnetError).toBeFalsy()
    expect(component.subnet).toBe(ip)
    expect(component.isIPv4).toBe(true)
    expect(component.validateSubnetv4).toHaveBeenCalled()
  })

  it('should  validateSubnetv4 without subnet', () => {
    spyOn(component, 'validateSubnetv4').and.callThrough()
    component.validateSubnetv4('')
    expect(component.subnetError).toBe(true)
    expect(component.validateSubnetv4).toHaveBeenCalled()
  })

  it('should  validateSubnetv6 with subnet', () => {
    let subnet = '10.121.25.0/24';
    spyOn(component, 'validateSubnetv6').and.callThrough()
    component.validateSubnetv6(subnet)
    expect(component.subnetError).toBe(true)
    expect(component.validateSubnetv6).toHaveBeenCalled()
  })

  it('should removeSubnet', () => {
    spyOn(component, 'removeSubnet').and.callThrough()
    component.removeSubnet('1')
    expect(component.removeSubnet).toHaveBeenCalled()
  })

  it('should showAllInnerCheckBox', () => {
    let event = {
      target: {
        id: 1
      }
    }
    spyOn(component, 'showAllInnerCheckBox').and.callThrough()
    component.selectDeselectAll(true);
    component.showAllInnerCheckBox(event)
    expect(component.deleteIds.length).toEqual(0);
    expect(component.deleteSubnets.length).toEqual(0);
    expect(component.showAllInnerCheckBox).toHaveBeenCalled()
  })

  it('should delete all selected', () => {
    spyOn(component, 'deleteAllSelected').and.callThrough()
    component.deleteAllSelected()
    expect(component.deleteAllSelected).toHaveBeenCalled()
  })

  it('confirmDeleteSecleted subnet', () => {
    let params = [{ "name": "t1", "subnets": "192.32.13.2/22" }]
    spyOn(service, 'deleteSubnet').and.returnValue(of(deleteSubnetData))
    spyOn(component, 'confirmDeleteSecleted').and.callThrough()
    service.deleteSubnet(params, org_Id)
    component.confirmDeleteSecleted()
    expect(component.selectedDelete).toBeTruthy('value is not matched')
    expect(component.selectedDelete).toBe(deleteSubnetData, 'value mismatch')
    expect(component.confirmDeleteSecleted).toHaveBeenCalled()
  })

  it('should export data', () => {
    spyOn(service, 'Export').and.returnValue(of(updateSubnetData))
    spyOn(component, 'export').and.callThrough()
    service.Export(org_Id)
    component.export()
    expect(component.exportData).toBeTruthy('value is not matched')
    expect(component.exportData).toBe(updateSubnetData, 'value mismatch')
    expect(component.export).toHaveBeenCalled()
  })

  it('should call proceed Import', () => {
    spyOn(component, 'proceedImport').and.callThrough()
    component.proceedImport()
    expect(component.proceedImport).toHaveBeenCalled()
  })

  it('should exportDataConvertor', () => {
    let data = [{ name: "t1", subnet: "43.0.0.50/30" }]
    spyOn(component, 'exportDataConvertor').and.callThrough()
    component.exportDataConvertor(data)
    expect(component.exportDataConvertor).toHaveBeenCalled()
  })

  it('should handle errors', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough()
    component.pageErrorHandle(errorStatus401, 'Create Fail!')
    expect(component.loading).toBeFalsy()
    expect(component.pageErrorHandle).toHaveBeenCalled()
  })

  it('should remove edit Subnet', () => {
    spyOn(component, 'removeEditSubnet').and.callThrough()
    component.removeEditSubnet('1')
    expect(component.removeEditSubnet).toHaveBeenCalled()
  })

  it('should addeditSubnet', () => {
    component.editSubnet = '43.0.0';
    spyOn(component, 'addEditSubnet').and.callThrough()
    component.subnetValidatorIpv4(component.editSubnet)
    component.subnetValidatorIpv6(component.editSubnet)
    component.addEditSubnet()
    expect(component.infoTitle).toBe('Invalid request');
    expect(component.infoBody).toBe('');
    expect(component.addEditSubnet).toHaveBeenCalled();
  });

  it('should addeditSubnet without subnet', () => {
    component.editSubnet = '';
    spyOn(component, 'addEditSubnet').and.callThrough()
    component.addEditSubnet()
    expect(component.editSubnet).toBe('');
  });

  it('should addeditSubnet duplicate subnet', () => {
    component.editSubnet = "43.0.0.50/30"
    component.editSubnetsList = ["43.0.0.50/30", "192.32.13.2/22"]
    spyOn(component, 'addEditSubnet').and.callThrough()
    component.editSubnetsList.includes(component.editSubnet)
    component.addEditSubnet()
    expect(component.infoTitle).toBe('Invalid request');
    expect(component.infoBody).toBe('Duplicate Subnet');
    expect(component.addEditSubnet).toHaveBeenCalled();
  });

  it('should call tableoptions', () => {
    let type = "language"
    spyOn(component, 'setTableOptions').and.callThrough()
    component.setTableOptions(type)
    component.tableOptions.drawCallback(settings)
    expect(component.currentTableRowCount).toBe(1)
    expect(component.setTableOptions).toHaveBeenCalled()
  })

  it('should call submit details with createName', () => {
    for (let i = 0; i < 65; i++) {
      component.createName = component.createName + 'a'
    }
    spyOn(component, 'submit').and.callThrough()
    component.submit()
    component.openInfoModal(false)
    expect(component.infoTitle).toBe('Invalid Value')
    expect(component.infoBody).toBe('undefined - Name should not exceed 64 characters.')
    expect(component.submit).toHaveBeenCalled()
  })

  it('should call submit details with subnet', () => {
    component.subnetData = getSubnetData
    component.createName = "t1"
    spyOn(component, 'submit').and.callThrough()
    component.submit()
    component.openInfoModal(false)
    expect(component.infoTitle).toBe('Name Cannot be duplicate')
    expect(component.infoBody).toBe('')
    expect(component.submit).toHaveBeenCalled()
  })

  it('should call submit details createsubnetlist', () => {
    component.createSubnet = ''
    component.createSubnetsList = []
    spyOn(component, 'submit').and.callThrough()
    component.submit()
    component.openInfoModal(false)
    expect(component.infoTitle).toBe('Name Cannot be empty')
    expect(component.infoBody).toBe('')
    expect(component.submit).toHaveBeenCalled()
  })

  it('should updateSave with editname', () => {
    for (let i = 0; i < 65; i++) {
      component.editName = component.editName + 'a'
    }
    spyOn(component, 'updateSave').and.callThrough()
    component.updateSave('1')
    expect(component.infoTitle).toBe('Invalid Value')
    expect(component.infoBody).toBe('undefined - Name should not exceed 64 characters.')
    expect(component.updateSave).toHaveBeenCalled()

  })

  it('should updateSave with editsubnet', () => {
    component.editSubnet = ""
    spyOn(component, 'updateSave').and.callThrough()
    component.updateSave('2')
    component.openInfoModal(false)
    expect(component.infoTitle).toBe('Invalid subnet')
    expect(component.infoBody).toBe('')
    expect(component.updateSave).toHaveBeenCalled()

  })

  it('should updateSave with incorrect subnet', () => {
    component.editSubnet = "43.0.0"
    spyOn(component, 'updateSave').and.callThrough()
    component.subnetValidatorIpv4(component.editSubnet)
    component.subnetValidatorIpv6(component.editSubnet)
    component.updateSave('2')
    component.openInfoModal(false)
    expect(component.infoTitle).toBe('Invalid subnet')
    expect(component.infoBody).toBe('43.0.0')
    expect(component.updateSave).toHaveBeenCalled()

  })

  it('should addSubnet with createsubnet details', () => {
    component.createSubnet = "43.0.0.50/30"
    component.createSubnetsList = ["43.0.0.50/30", "43.0.0.60/30"]
    spyOn(component, 'addSubnet').and.callThrough()
    component.addSubnet()
    component.openInfoModal(false)
    expect(component.infoTitle).toBe('Invalid request')
    expect(component.infoBody).toBe('Duplicate Subnet')
    expect(component.addSubnet).toHaveBeenCalled()

  })

  it('should call modifyeditData details', () => {
    component.newEditDataValue = ""
    spyOn(component, 'modifyEditData').and.callThrough()
    component.openInfoModal(false)
    component.modifyEditData()
    expect(component.infoTitle).toBe('Subnet cannot be empty')
    expect(component.infoBody).toBe('')
    expect(component.modifyEditData).toHaveBeenCalled()
  })

  it('should call modifyeditData incorrect details', () => {
    component.newEditDataValue = "43.0.0"
    spyOn(component, 'modifyEditData').and.callThrough()
    component.subnetValidatorIpv4(component.newEditDataValue)
    component.subnetValidatorIpv6(component.newEditDataValue)
    component.openInfoModal(false)
    component.modifyEditData()
    expect(component.infoTitle).toBe('Invalid Subnet format')
    expect(component.infoBody).toBe('43.0.0')
    expect(component.modifyEditData).toHaveBeenCalled()
  })

  it('should call modifyeditData duplicate details', () => {
    component.newEditDataValue = "43.0.0.50/30"
    component.editSubnetsList = ["43.0.0.50/30"]
    spyOn(component, 'modifyEditData').and.callThrough()
    component.openInfoModal(false)
    component.modifyEditData()
    expect(component.infoTitle).toBe('Duplicate Subnet')
    expect(component.infoBody).toBe('43.0.0.50/30')
    expect(component.modifyEditData).toHaveBeenCalled()
  })

  it('should call modifyeditData  edit value details', () => {
    component.newEditDataValue = ""
    spyOn(component, 'modifyEditData').and.callThrough()
    component.modifyEditData()
    component.hideEditDataInput()
    expect(component.newEditDataValue).toBe('')
    expect(component.modifyEditData).toHaveBeenCalled()
  })

  it('should call showEditDataInput  details', () => {
    let ind = 1;
    let type = 'subnet';
    let data = {
      index: ind,
      type: type
    }
    spyOn(component, 'showEditDataInput').and.callThrough()
    component.showEditDataInput(ind, type)
    expect(component.modifyDataInfo).toEqual(data)
    expect(component.showEditDataInput).toHaveBeenCalled()
  })

  it('should call checkDryrunData', () => {
    component.subnetData = getSubnetData
    spyOn(component, 'checkDryRunData').and.callThrough()
    component.checkDryRunData(importedSubnetData)
    expect(component.enableImportSubmit).toBe(true)
    expect(component.checkDryRunData).toHaveBeenCalled()
  })

  it('should call submitImport', () => {
    spyOn(service, 'importSubnets').and.returnValue(of(importedSubnetData))
    spyOn(component, 'submitImport').and.callThrough()
    service.importSubnets(postparamsforImportSubnet, '10009')
    component.submitImport(true)
    component.openInfoModal(false)
    expect(component.loading).toBeFalsy()
    expect(component.importData).toBe(importedSubnetData)
    expect(component.submitImport).toHaveBeenCalled()
  })

  it('should call getDeleteIds with id', () => {
    let e = { target: { checked: true } }
    let item = {
      "name": "t1",
      "subnets": "14.0.0.0/24",
      "newSubnets": [
        "14.0.0.0/24"
      ],
      "_id": "fff06fd56e1247bd983ea294520e05a1"
    }
    spyOn(component, 'getDeleteIds').and.callThrough()
    component.getDeleteIds(e, item)
    expect(component.getDeleteIds).toHaveBeenCalled()
  })

  it('should  disabledSubmitBtn', () => {
    component.isFullImport = false
    component.disableIcImportSubmitBtn = true
    spyOn(component, 'disabledSubmitBtn').and.callThrough()
    component.disabledSubmitBtn()
    expect(component.disabledSubmitBtn).toHaveBeenCalled()
  })

  it('should call dataTableservice', () => {
    component.subnetData = getSubnetData
    spyOn(component, 'compareJsonToTableData').and.callThrough()
    component.compareJsonToTableData(compareJsonToTableData)
    expect(component.loading).toBe(true)
    expect(component.compareJsonToTableData).toHaveBeenCalled()

  })

  it('should call updateSave mock api Details', () => {
    let id = '15f55b30d8df41a9a73d4b3d800e4fa6'
    let params = {
      "name": "t3",
      "subnets": "43.0.0.30/30"
    }
    spyOn(service, 'updateSubnet').and.returnValue(of(updateSubnetData))
    spyOn(component, 'updateSave').and.callThrough()
    component.updateSave(id)
    expect(component.updateSave).toHaveBeenCalled()
  })

  it('should handle page error',()=>{
   spyOn(component,'pageErrorHandle').and.callThrough()
   component.pageErrorHandle(error417)
   expect(component.infoBody).toBe('IP is not in Subnet')
   expect(component.pageErrorHandle).toHaveBeenCalled()

  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});




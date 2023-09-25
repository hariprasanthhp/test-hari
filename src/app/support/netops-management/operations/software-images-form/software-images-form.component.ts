import { FileService } from './../services/files.service';
import { FilesListModel, requestType } from './../model/files-list.model';
import { FilesModel } from './../model/files.model';
import { FileResponseModel } from './../model/file-response.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService, AcessModifiers } from 'src/app/shared/services/sso-auth.service';
import { exosModuleMap, ModuleMap } from '../services/utility-class';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { DeviceGroupService } from '../services/device-group.service';
import { Title } from '@angular/platform-browser';
import { error } from 'console';
@Component({
  selector: 'app-software-images-form',
  templateUrl: './software-images-form.component.html',
  styleUrls: ['./software-images-form.component.scss'],
  providers: [FileService, SsoAuthService]
})
export class SoftwareImagesFormComponent implements OnInit {
  language: any;
  languageSubject;
  orgId: string;
  loading: boolean = false;
  public errorMsg: string;
  public showError: boolean = false;
  public showSuccess: boolean = false;
  public successMsg: string;
  hasWriteAccess: boolean = false;
  fileRequired: boolean = false;
  scopes: string;
  showWarning;
  modalInfo;
  updateData: FilesModel = new FilesModel();
  @ViewChild('labelImport')
  labelImport: ElementRef;
  fileToUpload: File = null;
  swFileObj: FilesModel = new FilesModel();
  hasScopeAccess = false;
  throwerr: any;
  updateData1: FilesModel;
  hasCalixModel: boolean = false;
  constructor(private translateService: TranslateService, public ssoAuthService: SsoAuthService,
    private fileService: FileService, private router: Router, private titleService: Title,
    private _location: Location, private deviceGrp: DeviceGroupService) {
    this.orgId = this.ssoAuthService.getOrgId();
    this.scopes = this.ssoAuthService.getScopes();
  }
  setTitle(url) {
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('/cco/operations/configuration')) {
      this.titleService.setTitle(`${this.language['Software Images']} - ${this.language['Operations']}  - ${this.language['NetOps']}  - ${this.language['Service']}  - ${this.language['Calix Cloud']}`);
    } else if (this.router.url.includes('/cco/operations/configuration')) {
      this.titleService.setTitle(`${this.language['Software Images']} - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    } else {
      this.titleService.setTitle(`${this.language['Software Images']} - ${this.language['Workflow Prerequisites']} - ${this.language['configuration']}  - ${this.language['Deployment']}  - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.setTitle(this.router.url);
    });
    this.setTitle(this.router.url);
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco/operations/configuration/software')) {
      if (environment.VALIDATE_SCOPE) {
        this.scopes['cloud.rbac.csc.netops.operations.sw_images'] = this.scopes['cloud.rbac.csc.netops.operations.sw_images'] ? this.scopes['cloud.rbac.csc.netops.operations.sw_images'] : [];
        if (this.scopes && (this.scopes['cloud.rbac.csc.netops.operations.sw_images'] && this.scopes['cloud.rbac.csc.netops.operations.sw_images'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
        }
        if (this.scopes['cloud.rbac.csc.netops.operations.sw_images'].length) {
          this.hasScopeAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    } else if (this.router.url.includes('cco/operations/configuration/software')) {
      if (environment.VALIDATE_SCOPE) {
        if (this.scopes && (this.scopes['cloud.rbac.coc.operations.configuration.softwareimages']?.includes('write'))) {
          this.hasWriteAccess = true;
        }
        if (this.scopes?.['cloud.rbac.coc.operations.configuration.softwareimages']?.length) {
          this.hasScopeAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    } else {
      if (environment.VALIDATE_SCOPE) {
        let scopes = this.scopes;
        scopes['cloud.rbac.foundation.configurations'] = scopes['cloud.rbac.foundation.configurations'] ? scopes['cloud.rbac.foundation.configurations'] : [];
        if (scopes && (scopes['cloud.rbac.foundation.configurations'].includes('write'))) {
          this.hasWriteAccess = true;
        }
        if (this.scopes['cloud.rbac.foundation.configurations'].length) {
          this.hasScopeAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    }

  }
  resDetails: any = {}
  onSWFileSubmit() {
    this.loading = true;
    // this.swFileObj.orgId = this.orgId;
    this.swFileObj.type = requestType.SW_FW_Image;
    if (this.swFileObj.models.length == 0) {
      this.swFileObj.manufacturer = ""
    } else {
      this.swFileObj.manufacturer = "Calix"
    }
    //  this.swFileObj.models = this.swFileObj.models.toString()
    //   let models: any = this.swFileObj.models;
    //   this.swFileObj.models = models.split(",")
    // this.softwareModel =JSON.parse(JSON.stringify(this.swFileObj.models))
    let isArray = Array.isArray(this.swFileObj.models)
    if (!isArray) {
      let models: any = this.swFileObj.models;
      this.swFileObj.models = models.split(",")
    }

    this.fileService.uploadSwFile(this.swFileObj, this.orgId).subscribe((res: FileResponseModel) => {
      let responseDetails: FileResponseModel = res
      this.resDetails = res;
      this.uploadFile(this.fileToUpload, responseDetails);
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      if (err.status == 409) {
        this.showWarning = true;
        this.modalInfo = "Warning! "
        this.updateData = this.swFileObj;
        this.errorMsg = `The Software Image "${this.swFileObj.name}" already exists. Are you sure you want to Overwrite it?`
      } else if (err.status == 400) {
        // this.errorMsg = this.language['Invalid File Name!'];
        this.errorMsg = this.ssoAuthService.pageErrorHandle(err);
        this.showError = true;
        // this.showWarning = true;
        // this.updateData1 = this.swFileObj;
        // this.throwerr = this.updateData1.name.includes('(' && ')')
        // this.modalInfo = "Warning! "
        // this.errorMsg = `Invalid File Name`
      }
      else {
        this.errorMsg = this.pageErrorHandle(err);
        this.showError = true;
      }
    }
    )
  }
  pageErrorHandle(err: any) {
    let error = "";
    if (err.status === 401) {
      error = (err.hasPrefixedLabel ? err.hasPrefixedLabel : '') + 'Access Denied' + (err.hasPrefixedLabel ? ' due to scope CPE' : '');
    } else if (err.status === 504) {
      error = this.language['Gateway Timeout'];
    }
    else {
      error = this.ssoAuthService.pageErrorHandle(err);
    }
    document.getElementById("routerContentDiv").scrollIntoView();
    return error;
  }

  uploadFile(file: File, responseDetails: FileResponseModel) {
    this.fileService.fileUploadIntoUrl(file, responseDetails).subscribe(res => {
      this.loading = false;
      this.successMsg = "successfully uploaded!"
      this.showSuccess = true;
      if (window.location.href?.indexOf('/cco/operations/configuration/software/software-images-form') !== -1) {
        this.router.navigate(['/cco/operations/configuration/software/software-images-list']);
        return;
      }
      this.ssoAuthService.redirectByUrl([
        '/support/netops-management/operations/software-images-list',
        '/cco/operations/cco-system-operations/software-image',
        '/cco-foundation/foundation-configuration/configuration-prerequisites/software-images-list',
        '/cco/operations/cco-subscriber-operations/operations/software-images-list',
      ]);
    }, err => {
      console.log('Upload image error = ', err)
      this.reverseUpload(false);
      if (err.status == 413) {
        this.errorMsg = err.error;
        this.showError = true;
      } else if (err.statusText == "Unknown Error") {
        this.errorMsg = "Image Upload Failed!";
        this.showError = true;
      } else {
        if (err.error) {
          this.errorMsg = err.error;
        } else {
          this.errorMsg = err.statusText
        }
        this.showError = true;
      }
    });
  }

  reverseUpload(reUpload: boolean) {
    this.loading = true;
    if (this.swFileObj.name) {
      this.fileService.getSwFilesList(this.orgId, this.swFileObj.name, requestType.SW_FW_Image).subscribe((fileList: FilesListModel[]) => {
        fileList.forEach((file: FilesListModel) => {
          if (file.name == this.swFileObj.name) {
            this.fileService.deleteSwFileById(file._id).subscribe(res => {
              if (reUpload) {
                this.onSWFileSubmit();
                this.loading = false;
              }
            }, (err: HttpErrorResponse) => {

              this.loading = false;
              this.errorMsg = err.error.error;
              this.showError = true;
            })
          } this.loading = false;
        })
      }, (err: HttpErrorResponse) => {

        this.loading = false;
        this.errorMsg = err.error.error;
        this.showError = true;
      })
    } else {
      this.fileService.getSwFilesList(this.orgId, null, requestType.SW_FW_Image).subscribe((fileList: FilesListModel[]) => {
        fileList.forEach((file: FilesListModel) => {
          if (file.name == this.swFileObj.name) {
            this.fileService.deleteSwFileById(file._id).subscribe(res => {
              if (reUpload) {
                this.onSWFileSubmit();
                this.loading = false;
              }
            }, (err: HttpErrorResponse) => {

              this.loading = false;
              this.errorMsg = err.error.error;
              this.showError = true;
            })
          } this.loading = false;
        })
      }, (err: HttpErrorResponse) => {

        this.loading = false;
        this.errorMsg = err.error.error;
        this.showError = true;
      })
    }
  }

  confirmUpdateSecleted() {
    this.updateData = new FilesModel();
    this.reverseUpload(true);
  }
  closeModal(): void {
    this.updateData = new FilesModel();
  }
  onFileChange(files: FileList) {
    this.hasCalixModel = false;
    if (files.length > 0) {
      this.fileRequired = true;
      this.labelImport.nativeElement.innerText = Array.from(files)
        .map(f => f.name)
        .join(', ');
      this.fileToUpload = files.item(0);
      this.swFileObj.name = this.fileToUpload.name;
      if (this.swFileObj.name.endsWith('.oneimage')) {
        this.fetchVersionModel(this.fileToUpload)
      } else {
        var startPos = 0;
        var endPos = 4;
        var reader = new FileReader();
        var magicCalxBlob = this.fileToUpload.slice(startPos, endPos);
        var isSignedEXOS = false;
        reader.onload = () => {
          var magicNum = new DataView(<ArrayBuffer>reader.result).getUint32(0);
          if (magicNum == 0xca11fcfc) { // EXOS Signed Image
            isSignedEXOS = true;
            startPos = 5712;
            this.readEXOSVersion(startPos, startPos + 14, isSignedEXOS, reader);
          } else {
            this.readAfterCheckSigned(startPos, endPos, reader, isSignedEXOS, magicCalxBlob);
          }
        };
        reader.readAsArrayBuffer(magicCalxBlob);
      }
      // this.swFileObj.orgId = this.orgId;
      this.swFileObj.type = requestType.SW_FW_Image;
      this.swFileObj.manufacturer = "Calix"
    }
  }


  fetchVersionModel(file: File) {
    let name = file.name;
    var nameLength = name.length - '.oneimage'.length;
    var shortName = name.substring(0, nameLength);
    var nameArray = shortName.split("_");
    if (nameArray.length == 2) {
      var model = nameArray[0];
      var version = nameArray[1];
      this.swFileObj.models.push(model);
      this.hasCalixModel = true;
      if (/^\d+(\.\d+)+$/.test(version)) {
        this.swFileObj.version = version;
      }
    }
  }

  fillVersionAndName(curVer) {
    var name = this.swFileObj.name;
    var endIndex = curVer.indexOf('\0');
    var version = endIndex >= 0 ? curVer.substr(0, endIndex) : curVer;

    var versionPattern = /^\d[\d\.]+\d$/;
    if (!versionPattern.test(version)) {
      this.swFileObj.version = ""
      this.swFileObj.models = [];
      return false;
    } else {
      this.swFileObj.version = version;
      var lastIndex = name.lastIndexOf('.');
      var newName = '';
      if (lastIndex != -1) {
        newName = name.slice(0, lastIndex) + '_' + version + name.slice(lastIndex);
      } else {
        newName = name + '_' + version;
      }
      this.swFileObj.name = newName;
      return true;
    }
  }

  readEXOSModels(startPos, endPos, reader) {
    var moduleIdNumBlob = this.fileToUpload.slice(startPos, endPos);
    reader.onload = () => {
      var moduleIdNum = new DataView(reader.result).getUint32(0);
      startPos = endPos;
      endPos = startPos + 4 * moduleIdNum;
      var moduleIdBlob = this.fileToUpload.slice(startPos, endPos);
      reader.onload = () => {
        var moduleMap = exosModuleMap;
        var result = [];
        var finalRes = [];
        for (var i = 0; i < moduleIdNum; i++) {
          var value = new DataView(reader.result).getUint32(i * 4);
          if (moduleMap[value] != null)
            result.push(moduleMap[value]);
        }
        for (var i = 0; i < result.length; i++) {
          if (result[i].indexOf(',') != -1) {
            let strs = result[i].split(',');
            for (let j = 0; j < strs.length; j++) {
              finalRes.push(strs[j]);
            }
          } else {
            finalRes.push(result[i]);
          }
        }
        this.swFileObj.models = finalRes;
        this.hasCalixModel = true;
      };
      reader.readAsArrayBuffer(moduleIdBlob);
    }
    reader.readAsArrayBuffer(moduleIdNumBlob);
  }

  readEXOSVersion(startPos, endPos, isSignedEXOS, reader) {
    var versionBlob = this.fileToUpload.slice(startPos, endPos);
    reader.onload = () => {
      if (this.fillVersionAndName(reader.result)) {
        var modelStartPos = isSignedEXOS ? 5732 : 0x50;
        this.readEXOSModels(modelStartPos, modelStartPos + 4, reader);
      }
    };
    reader.readAsText(versionBlob);
  }

  readAfterCheckSigned(startPos, endPos, reader, isSignedEXOS, magicCalxBlob) {
    reader.onload = () => {

      if ("CALX" === reader.result) {
        // Unsigned EXOS Version Pos
        startPos = 0x10;
        endPos = 0x30;
        this.readEXOSVersion(startPos, endPos, isSignedEXOS, reader);
      } else {
        startPos = 20;
        endPos = 24;
        var versionLengthBlob = this.fileToUpload.slice(startPos, endPos);

        reader.onload = () => {
          var versionLength = new DataView(reader.result).getUint32(0);
          startPos = endPos;
          endPos = startPos + versionLength;
          var versionBlob = this.fileToUpload.slice(startPos, endPos);
          reader.onload = () => {
            if (this.fillVersionAndName(reader.result)) {
              startPos = endPos + 524;
              endPos = startPos + 4;
              var encrypted_w_imageLengthBlob = this.fileToUpload.slice(startPos, endPos);
              reader.onload = () => {
                var encrypted_w_imageLength = new DataView(reader.result).getUint32(0);
                startPos = endPos + encrypted_w_imageLength + 4;
                endPos = startPos + 4;
                var moduleLengthBob = this.fileToUpload.slice(startPos, endPos);
                reader.onload = () => {
                  var moduleLength = new DataView(reader.result).getUint32(0);
                  startPos = endPos;
                  endPos = startPos + moduleLength;
                  var moduleBlob = this.fileToUpload.slice(startPos, endPos);
                  reader.onload = () => {
                    var moduleMap = ModuleMap;
                    var result = [];
                    for (var i = 0; i < (endPos - startPos) / 4; i++) {
                      var value = new DataView(reader.result).getUint32(i * 4);
                      if (moduleMap[value] != null)
                        result.push(moduleMap[value]);
                    }
                    this.swFileObj.models = result;
                    this.hasCalixModel = true;
                  };
                  reader.readAsArrayBuffer(moduleBlob); //get module
                };
                reader.readAsArrayBuffer(moduleLengthBob);
              };
              reader.readAsArrayBuffer(encrypted_w_imageLengthBlob);
            }
          };
          reader.readAsText(versionBlob); //get version
        };
        reader.readAsArrayBuffer(versionLengthBlob);
      }
    };
    reader.readAsText(magicCalxBlob)
  }
  goBack() {
    //  this._location.back()
    if (window.location.href?.indexOf('/cco/operations/configuration/software/software-images-form') !== -1) {
      this.router.navigate(['/cco/operations/configuration/software/software-images-list']);
      return;
    }
    this.ssoAuthService.redirectByUrl([
      '/support/netops-management/operations/software-images-list',
      '/cco/operations/cco-system-operations/software-image',
      '/cco-foundation/foundation-configuration/configuration-prerequisites/software-images-list',
      '/cco/operations/cco-subscriber-operations/operations/software-images-list'
    ])
  }
  hideError() {
    this.showError = false;
    this.errorMsg = '';
  }
  hideSuccess() {
    this.showSuccess = false;
    this.successMsg = '';
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }
}

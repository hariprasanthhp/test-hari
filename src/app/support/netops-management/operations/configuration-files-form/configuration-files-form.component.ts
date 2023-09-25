import { FilesModel } from './../model/files.model';
import { FileService } from './../services/files.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import 'lodash';
import { environment } from '../../../../../environments/environment';
import { Title } from '@angular/platform-browser';

declare var _: any;

@Component({
  selector: 'app-configuration-files-form',
  templateUrl: './configuration-files-form.component.html',
  styleUrls: ['./configuration-files-form.component.scss']
})
export class ConfigurationFilesFormComponent implements OnInit {
  @ViewChild('inputFile') InputFile: ElementRef;
  language: any;
  languageSubject;
  orgId: string;
  configFile: FilesModel = new FilesModel();
  public errorMsg: string;
  public showError: boolean = false;
  public showSuccess: boolean = false;
  public successMsg: string;
  cardImageBase64: string;
  isFileValid: boolean = false;
  fileType = [];
  @ViewChild('labelImport')
  labelImport: ElementRef;
  fileValue
  fileToUpload: File = null;
  base64textString: string;
  showWarning: boolean = false;
  loading: boolean = false;
  hasWriteAccess: boolean = false;
  scopes: string;
  hasScopeAccess = false;
  constructor(private translateService: TranslateService, public ssoAuthService: SsoAuthService, private titleService: Title,
    private fileService: FileService, private router: Router) {
    this.orgId = this.ssoAuthService.getOrgId();
    this.fileType = fileService.getFileType();
    this.scopes = this.ssoAuthService.getScopes();
  }
  setTitle(url) {
    if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('cco/operations/configuration')) {
      this.titleService.setTitle(`${this.language['Config_Files']} - ${this.language['Operations']} - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    } else if (this.router.url.includes('cco/operations/configuration')) {
      this.titleService.setTitle(`${this.language['Config_Files']} - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {


    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      // document.getElementById("customimage").onchange= function(e: Event) {
      //   let file = (<HTMLInputElement>e.target).files[0];
      //   this.onFileChange(file);
      // }

      this.language = data;
      this.setTitle(this.router.url)
      if (this.confilesize) {
        this.errorMsg = this.language.invalidFileTypeErrorMsg(this.confilesize);

      }
      if (this.configFile?.type) this.configFile.type = this.language['Configuration File'];

    });
    this.setTitle(this.router.url)
    if (!this.router.url.includes('cco/operations/configuration')) {
      if (environment.VALIDATE_SCOPE) {
        this.scopes['cloud.rbac.csc.netops.operations.config_files'] = this.scopes['cloud.rbac.csc.netops.operations.config_files'] ? this.scopes['cloud.rbac.csc.netops.operations.config_files'] : [];
        if (this.scopes['cloud.rbac.csc.netops.operations.config_files'].length) {
          this.hasScopeAccess = true;
        }
        if (this.scopes && (this.scopes['cloud.rbac.csc.netops.operations.config_files'] && this.scopes['cloud.rbac.csc.netops.operations.config_files'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    } else {
      if (environment.VALIDATE_SCOPE) {
        if (this.scopes?.['cloud.rbac.coc.operations.configuration.configurationfiles']?.length) {
          this.hasScopeAccess = true;
        }
        if (this.scopes && (this.scopes['cloud.rbac.coc.operations.configuration.configurationfiles']?.includes('write'))) {
          this.hasWriteAccess = true;
        }
      } else {
        this.hasWriteAccess = true;
        this.hasScopeAccess = true;
      }
    }

    if (!this.hasScopeAccess) {
      this.ssoAuthService.setPageAccess(false);
      return;
    }


  }

  onFileSubmit() {
    this.loading = true;
    this.hideWarning();
    this.hideError();
    this.hideWarning();
    if (this.configFile.binaryContent) {
      this.fileService.uploadConfigFile(this.configFile, this.orgId).subscribe(res => {

        this.showSuccess = true;
        this.successMsg = "successfully updated"
        this.configFile = new FilesModel();
        this.loading = false;
        this.gotoList();
        // this.ssoAuthService.redirectByUrl([
        //   '/support/netops-management/operations/configuration-files-list',
        //   '/cco/operations/cco-system-operations/configuration-files', '',
        //   '/cco/operations/cco-subscriber-operations/operations/configuration-files-list'
        // ])
      }, (err: HttpErrorResponse) => {

        this.loading = false;
        if (err.status == 409) {
          this.showWarning = true;
          this.errorMsg = `The configuration "${this.configFile.name}" already exists. Please enter another name`
        } else if (err.status == 400) {
          this.errorMsg = this.ssoAuthService.pageErrorHandle(err);
          this.showError = true;
        }
        else {
          this.errorMsg = err.error.error;
          this.showError = true;
        }
      }
      )
    } else {
      this.errorMsg = "Invalid File Name!"
      this.showError = true;
      this.loading = false;
    }
  }
  confilesize: number;
  onFileChange(files: FileList) {

    if (files.length != 0) {
      this.labelImport.nativeElement.innerText = Array.from(files)
        .map(f => f.name)
      this.fileToUpload = files.item(0);
      var name = this.fileToUpload.name;
      var index = name.lastIndexOf('.');
      if (index != -1) {
        this.configFile.name = name.slice(0, index);
      }
      var size = this.fileToUpload.size;
      if (size > 2 * 1024 * 1024) {
        this.showError = true;
        this.confilesize = size / 1024 / 1024;
        //this.errorMsg = `Invalid File Type: too large size: ${size / 1024 / 1024} MB exceeds more than 2MB limitation`;
        this.errorMsg = this.language.invalidFileTypeErrorMsg(this.confilesize);
        this.isFileValid = false
        return;
      }
      this.confilesize = 0;
      this.configFile.version = "";
      // this.configFile.orgId = this.orgId;
      var reader = new FileReader();
      reader.onload = () => {
        var lines = reader.result.toString().split(/[\r\n]+/g);

        if (_.isArray(lines) && lines.length > 0) {
          // SXACC-5083, Remove Validation for 3rd-party Configuraion file
          var bType = true, bVersion = false;
          if (this.isGoldenFile(lines)) {
            bVersion = this.readVersionOfGoldenFile(lines);
          } else if (this.readVersionOfSipFile(lines)) {
            bVersion = true;
          } else if (this.isTSeriesFile(lines)) {
            bVersion = this.readVersionOfTSeriesFile(lines);
          } else if (this.isTSeriesSipFile(lines)) {
            bVersion = this.readVersionOfTSeriesSipFile(lines);
          } else {
            bType = false;
            this.configFile.type = this.language['Configuration File'];
          }
          this.isFileValid = true;
          // This is Calix Configuration File, but its version couldn't be read successfully
          if (bType && !bVersion) {
            this.showError = true;
            this.errorMsg = `Invalid configuration File: Cannot get Configuration file version`;
            this.isFileValid = false
          }
        }
      };
      reader.onerror = () => {
        this.showError = true;
        this.errorMsg = `The file couldn't be loaded.`;
        this.isFileValid = false
      };
      reader.readAsText(this.fileToUpload, 'UTF-8');
      this.createConfiguration();
    }
  }

  createConfiguration = function () {
    var reader, base64Content, match;

    if (this.fileToUpload) {
      reader = new FileReader();
      // Start reading.
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = () => {
        match = /^data:.*;base64,(.*)$/.exec(reader.result);
        if (match != null) {
          base64Content = match[1];
        } else {

        }
        this.configFile.binaryContent = base64Content;
      };
      reader.onerror = function () {
        this.showError = true;
        this.errorMsg = `The file couldn't be loaded.`;
        this.isFileValid = false
      };
    }
  };

  isGoldenFile(lines) {
    var firstLine = lines[0],
      pattern = /<!--CalixVersion="(.+?)".+/,
      result = false,
      match;

    if (firstLine.indexOf("<") !== 0 || !pattern.test(firstLine)) {
      // SXACC-5083, Apply this pattern firstly due to SR Configuration File also satisfies the next pattern
      return result;
    }

    pattern = /<DslCpeConfig\s(.+?)">/;
    result = _.find(lines, function (line) {
      match = pattern.exec(line);
      return (!!match);
    });
    if (!result) {
      var type_pattern = / type="(.+?)"/
      match = type_pattern.exec(firstLine);
      if (_.isArray(match) && match.length === 2 && match[1].toLowerCase() === 'golden') {
        return true;
      }
    }
    return result;
  };

  readVersionOfGoldenFile(lines) {
    var pattern, match, result = false, firstLine = lines[0];

    pattern = /<!--CalixVersion="(.+?)".+type="(.+?)".+/;
    match = pattern.exec(firstLine);
    if (_.isArray(match)) {
      if (match.length === 3) {
        var type = match[2].toLowerCase();
        if (type === 'golden') {
          this.configFile.type = 'Configuration File';
          this.configFile.version = match[1];
          result = true;
        }
      }
    } else {
      pattern = /<!--CalixVersion="(.+?)".+/;
      match = pattern.exec(firstLine);
      if (_.isArray(match)) {
        result = true;
        if (match.length === 2) {
          this.configFile.type = 'Configuration File';
          this.configFile.version = match[1];
        } else {
          this.configFile.type = 'Configuration File';
        }
      }
    }
    return result;
  };

  readVersionOfSipFile(lines) {
    var pattern, match, find, version;
    pattern = /;CalixVersion="(.+?)"/;
    find = _.find(lines, function (line) {
      match = pattern.exec(line);
      if (_.isArray(match) && match.length === 2) {
        version = match[1];
        return true;
      } else {
        return false;
      }
    });
    if (!find) {
      return false;
    }
    this.configFile.type = 'SIP Configuration File';
    this.configFile.version = version;
    return true;
  };

  readVersionOfTSeriesFile(lines) {
    var pattern, match, find, version, result = false;
    pattern = /<Version>(.+?)<.+>/;
    find = _.find(lines, function (line) {
      match = pattern.exec(line);
      if (_.isArray(match) && match.length === 2) {
        version = match[1];
        return true;
      } else {
        return false;
      }
    });
    if (!find) {
      return false;
    }
    this.configFile.type = 'Configuration File';
    this.configFile.version = version;
    return true;
  };

  isTSeriesFile(lines) {
    var firstLine = lines[0],
      pattern = /<Project\s(.+?)">/,
      result = false,
      match;

    if (firstLine.indexOf("<") !== 0) {
      return result;
    }

    result = _.find(lines, function (line) {
      match = pattern.exec(line);
      if (match) {
        return true;
      } else {
        return false;
      }
    });
    return result;
  };

  isTSeriesSipFile(lines) {
    var firstLine = lines[0],
      pattern = /VoIPProfileSigned/,
      result = false,
      match;
    if (firstLine.indexOf("<") !== 0) {
      return result;
    }

    result = _.find(lines, function (line) {
      match = pattern.exec(line);
      if (match) {
        return true;
      } else {
        return false;
      }
    });
    return result;
  }

  readVersionOfTSeriesSipFile(lines) {
    var pattern, match, find, version;
    pattern = /<ConfigVersion>(.+?)<.+>/;
    find = _.find(lines, function (line) {
      match = pattern.exec(line);
      if (_.isArray(match) && match.length === 2) {
        version = match[1];
        return true;
      } else {
        return false;
      }
    });
    if (!find) {
      return false;
    }
    this.configFile.type = 'T Series SIP Configuration File';
    this.configFile.version = version;
    return true;
  };

  hideError() {
    this.showError = false;
    this.errorMsg = '';
  }
  hideSuccess() {
    this.showSuccess = false;
    this.successMsg = '';
  }
  hideWarning() {
    this.showWarning = false;
    this.errorMsg = '';
  }

  gotoList() {
    if (window.location.href?.indexOf('/cco/operations/configuration/configuration-files-form') !== -1) {
      this.router.navigate(['./cco/operations/configuration/configuration-files-list']);
      return;
    }

    this.ssoAuthService.redirectByUrl([
      '/support/netops-management/operations/configuration-files-list',
      '/cco/operations/cco-system-operations/configuration-files', '',
      '/cco/operations/cco-subscriber-operations/operations/configuration-files-list'
    ])
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

}

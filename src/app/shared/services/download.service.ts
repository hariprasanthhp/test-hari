import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WindowRefService } from './window-ref.service'

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private windowRefService: WindowRefService) { }
  // Audit-Log-Reports

  saveToDisk(fileURL, changeFileName?: any, isAuditLogReport?: boolean) {
    let fileName;
    if (isAuditLogReport) {
      fileName = 'Audit-Log-Reports.csv';
    } 
    else if(fileURL.fileName && fileURL.fileName.includes('swapsystem')){
      fileName = fileURL.fileName.split('/').pop();
    }
    
    else {
      fileName = fileURL.split('/').pop();
      // let fileName = 'Audit-Log-Reports.csv';
    }
    if (changeFileName) {
      let tmpFileNameSplitArr = fileName.split('.');
      let tmpFileName = `${changeFileName}.${tmpFileNameSplitArr[tmpFileNameSplitArr.length - 1]}`;
      fileName = tmpFileName;
    };
    if(fileURL.fileName && fileURL.fileName.includes('swapsystem')){
      fileURL = fileURL.fileName;
    }
    else{
      fileURL = fileURL;
    }
    
    fileURL = `${environment.UI_ASSETS_URL}${fileURL}`;
    console.log(fileURL);

    let win: any = this.windowRefService.nativeWindow;

    // for non-IE
    if (!win.ActiveXObject) {
      var save = document.createElement('a');
      save.href = fileURL;
      save.target = '_blank';
      save.download = fileName || 'unknown';

      var evt = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': false
      });
      save.dispatchEvent(evt);

      console.log("save.href", save.href);

      (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE < 11
    else if (!!win.ActiveXObject && document.execCommand) {
      var _window = window.open(fileURL, '_blank');
      _window.document.close();
      _window.document.execCommand('SaveAs', true, fileName || fileURL)
      _window.close();
    }
  }


  saveToDiskwkflw(fileURL, changeFileName?: any, isWorkflowLogReport?: boolean,fileNm?:any) {
    let fileName;
    if (isWorkflowLogReport) {
      fileName = 'Workflow-Reports.csv';
    } else {
      fileName = fileNm + "-" +'Workflow-Reports.csv';
    }
    if (changeFileName) {
      let tmpFileNameSplitArr = fileName.split('.');
      let tmpFileName = `${changeFileName}.${tmpFileNameSplitArr[tmpFileNameSplitArr.length - 1]}`;
      fileName = tmpFileName;
    }

    fileURL = `${environment.UI_ASSETS_URL}${fileURL}`;
    let win: any = this.windowRefService.nativeWindow;

    // for non-IE
    if (!win.ActiveXObject) {
      var save = document.createElement('a');
      save.href = fileURL;
      save.target = '_blank';
      save.download = fileName || 'unknown';

      var evt = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': false
      });
      save.dispatchEvent(evt);

      console.log("save.href", save.href);

      (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE < 11
    else if (!!win.ActiveXObject && document.execCommand) {
      var _window = window.open(fileURL, '_blank');
      _window.document.close();
      _window.document.execCommand('SaveAs', true, fileName || fileURL)
      _window.close();
    }
  }



}

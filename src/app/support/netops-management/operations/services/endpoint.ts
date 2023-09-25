import { environment } from '../../../../../environments/environment';

const URL = environment.SUPPORT_URL;
export const sw_upload_Url = environment.UI_BASE_URL;
export const getConfigFileList:string = URL+"/netops-file/file";
//this api can only update description field
export const updateConfigFile:string = URL+"/netops-file/file";  
export const uploadConfigFile:string = URL+"/netops-file/file";
export const getConfigFileById:string = URL+"/netops-file/file";
export const deleteConfigFileById:string = URL+"/netops-file/file";
export const getConfigListCount:string = URL+"/netops-file/file/count";
/* software images api */
export const getSwFileList: string = URL+"/sw/image"
export const updateSwFile:string = URL+"/sw/image";
export const uploadSwFile:string = URL+"/sw/image";
export const getSwFileById:string = URL+"/sw/image";
export const deleteSwFileById:string = URL+"/sw/image";
export const getSwListCount:string = URL+"/sw/image/count";
export const makeOfficialImage:string = URL+"/sw/official-image";
export const makeUnOfficialImage:string = URL+"/sw/official-image";
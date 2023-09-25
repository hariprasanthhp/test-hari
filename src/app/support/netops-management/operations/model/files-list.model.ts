export enum requestType{
    SIP_Configuration_File = "SIP Configuration File",
    T_Series_SIP_Configuration_File ="T Series SIP Configuration File",
    Configuration_File = "Configuration File",
    SW_FW_Image = "SW/FW Image"
}
export class FilesListModel{
    _id?: string;
    name?: string;
    size?: number;
    version?:string;
    type?: requestType;
    orgId?: number;
    password?: string;
    username?: string;
    description?: string;
    models?:any;
    numberOfDownloads?: number;
    uploadUrl?: string;
    isOfficialImage?:boolean;
    isOfficialImageIligible?:boolean;
    isPublicImage?:boolean;
    constructor( _id?: string,name?: string,size?: number,type?: requestType,version?:string,
                orgId?: number,password?: string,username?: string,description?: string,
                numberOfDownloads?: number,uploadUrl?: string,models?:any,
                isOfficialImage?:boolean,isOfficialImageIligible?:boolean, isPublicImage?:boolean) {
        this._id = _id || null;
       this.name = name || null;
       this.version = version || null;
       this.size = size || null;
       this.type = type || null;
       this.orgId = orgId || null;
       this.password = password || null;
       this.username = username || null;
       this.description = description || null;
       this.numberOfDownloads = numberOfDownloads || null;
       this.uploadUrl= uploadUrl || null;
       this.isOfficialImage = isOfficialImage|| null;
       this.isOfficialImageIligible = isOfficialImage|| null;
       this.isPublicImage = isPublicImage|| null;
       this.models = models || [];
    }
}
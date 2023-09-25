export class FileResponseModel{
    _id:string;
    username:string;
    password:string;
    uploadUrl:string;
    constructor(_id:string,username:string,password:string,uploadUrl:string) {
        this._id = _id;
        this.username = username;
        this.password = password;
        this.uploadUrl = uploadUrl;
    }
}
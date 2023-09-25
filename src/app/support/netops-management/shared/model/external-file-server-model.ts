export class ExternalFileServerModel {
    // orgId?: string;
    name?: string;
    baseUrl?: string;
    password?: string;
    username?: string;
    description?: string;
    isSubcriberUpdatedByCSC?: string;

    constructor(name?: string, baseUrl?: string, isSubcriberUpdatedByCSC?: string,
        password?: string, username?: string, description?: string) {
        // this.orgId = orgId;
        this.name = name;
        this.baseUrl = baseUrl;
        this.password = password;
        this.username = username;
        this.description = description;
        this.isSubcriberUpdatedByCSC = isSubcriberUpdatedByCSC;
    }
}
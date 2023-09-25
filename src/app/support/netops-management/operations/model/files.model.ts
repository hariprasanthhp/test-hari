export class FilesModel {
    _id?: string;
    name?: string;
    description?: string;
    type?: string;
    binaryContent?: string;
    version?: string;
    models?: string[];
    // orgId?:string;
    manufacturer?: string;

    constructor(_id?: string, name?: string, description?: string, type?: string, manufacturer?: string,
        binaryContent?: string, version?: string, models?: string[], orgId?: string) {
        this.name = name || null;
        this.description = description || null;
        this.type = type || null;
        if (version) {
            this.version = version;
        }
        this._id = _id || null;
        this.models = models || null;
        // this.orgId = orgId || null;
        this.manufacturer = manufacturer || null;
        if (binaryContent) {
            this.binaryContent = binaryContent;
        }
    }
}
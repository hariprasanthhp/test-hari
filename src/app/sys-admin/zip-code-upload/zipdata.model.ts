export interface ZipUploadModel {
    list_name: string;
    zip_data: {
        zipcode: string;
        zipPlusFour: string;
        hasService?: string;
    }[]
}

export interface ZipFilterModel {
    listName: string;
    hasService: string;
    createdTime: Date;
}

export interface ZipDataModel {
    createdTime: Date;
    id: string;
    listName: string;
    orgId: number;
    zipPlusFour: string;
    zipcode: string;
    hasService: string;
}
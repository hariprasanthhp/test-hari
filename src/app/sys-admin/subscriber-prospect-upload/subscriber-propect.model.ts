export interface FileDataResponse {
    metaData: FileMetaData,
    fileData: FileDataItem[]
}

export interface FileDataItem {
    orgId: number,
    firstName: string,
    lastName: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    state: string,
    zip: string,
    email: string,
    listName: string,
    createdTime: string,
    matched: boolean,
    prospectId: null,
    matchingPerformed: boolean,
    matchedTime: null,
    id: string
}

export interface FileMetaData {
    id: string,
    listName: string,
    listType: string,
    orgId: number,
    processed: boolean,
    processedTime: string,
    totalRows: number,
    matchedCount: number,
}

export interface FileListItem {
    id: string,
    listName: string,
    listType: string,
    orgId: number,
    processed: boolean,
    createdTime: string,
}

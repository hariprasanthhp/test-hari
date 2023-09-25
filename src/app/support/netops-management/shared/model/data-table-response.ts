export class DataTablesResponse {
    data: any[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;

    constructor( data: any[],draw: number, recordsFiltered: number,recordsTotal: number){
        this.data = data;
        this.draw = draw;
        this.recordsFiltered = recordsFiltered;
        this.recordsTotal = recordsTotal;
    }
  }
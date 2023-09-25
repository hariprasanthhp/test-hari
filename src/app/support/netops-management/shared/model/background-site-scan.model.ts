export class BackgroundSiteScanModel{
    backgroundSiteScanEnabled?:boolean;
    constructor( params?:BackgroundSiteScanModel){
        this.backgroundSiteScanEnabled = params?.backgroundSiteScanEnabled;
    }
}
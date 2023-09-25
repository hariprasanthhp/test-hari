export class FeatureList{
safeSearch: boolean;
youtubeRestriction: boolean;

constructor(params?:FeatureList){
    this.safeSearch = params?.safeSearch || null;
    this.youtubeRestriction = params.youtubeRestriction || null;
}
}

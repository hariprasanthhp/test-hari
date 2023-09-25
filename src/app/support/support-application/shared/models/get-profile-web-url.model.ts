export class profileWebUrl{
    profileId?:string;
    webs?: Webs[];
    constructor(params?:profileWebUrl){
        this.profileId = params?.profileId || null;
        this.webs = params?.webs || [new Webs()];

    }
  }

 class Webs {
    id?:string;
    webUrl?:string;
    blocked?: boolean;
    constructor( params?:Webs){
        this.id = params?.id || null;
        this.webUrl = params?.webUrl || null;
        this.blocked = params?.blocked || null;
    }
  }
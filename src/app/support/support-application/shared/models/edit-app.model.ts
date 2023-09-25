export class EditAppModel{
    userId?:string;
    profileId?: string;
    id?: number;
    block?: boolean;
    duration?: string;
    categoryId?: number;
    blocked?:boolean;
    constructor( params?:EditAppModel ){
        this.userId = params?.userId || null;
        this.profileId = params?.profileId || null ;  
        this.id = params?.id || null;
        this.block = params?.block || null;
        this.blocked = params?.blocked || null;
        this.duration = params?.duration || null;
        this.categoryId = params?.categoryId || null;
    }
  }
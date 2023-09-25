export class ProfileAppsModel{
    profileId?: string;
    categories?: Categories[]
    constructor( params?:ProfileAppsModel){
        this.profileId = params?.profileId || null;
        this.categories = params?.categories || [new Categories()];
    }
  }

class Categories {
    category?: number;
    name?: string;
    allEnable?: boolean;
    apps?: Apps[ ]
    constructor( params?:Categories){
        this.category = params?.category || null;
        this.name = params?.name || null;
        this.allEnable = params?.allEnable || null;
        this.apps = params?.apps || [new Apps()];
    }
  }

  class Apps{
    id?: number;
    name?: string;
    blocked?: boolean;
    constructor( params?:Apps){
        this.id = params?.id;
        this.name = params?.name;
        this.blocked = params?.blocked;
    }
  }
import { param } from "jquery";

export class CategoriesModel{
    profileId?: string;
    categories?:Categories[]
    selectedGroup?:string;
    constructor( params?:CategoriesModel ){
        this.profileId = params?.profileId || null;
        this.categories = params?.categories || [new Categories()];
        this.selectedGroup = this.selectedGroup;
    }
  }

  class Categories {
    cid?: number;
    name?: string;
    blocked?: boolean
    constructor( params?:Categories ){
        this.cid = params?.cid;
        this.name = params?.name;
        this.blocked = params?.blocked;
    }
  }
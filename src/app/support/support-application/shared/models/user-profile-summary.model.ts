export class userProfileSummaryModel{
    userId?: string;
    profiles?: profile[];
    constructor(params?:userProfileSummaryModel){
      this.userId = params?.userId || null;
      this.profiles = params?.profiles || [new profile()];
    }
  }
  class profile{
    profileId?:string;
    name?: string;
    avatarUrl?:string;
    deviceCount?: number;
    usage?: string;
    isBlocked?: boolean;
    constructor(params?:profile){
        this.profileId = params?.profileId || null;
        this.name = params?.name || null;
        this.avatarUrl = params?.avatarUrl || null;
        this.deviceCount = params?.deviceCount || null;
        this.usage = params?.usage || null;
        this.isBlocked = params?.isBlocked || null;
    }
  }
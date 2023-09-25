export class ProfileModel{
    profileId?:string;
    name?: string;
    avatarUrl?:string;
    deviceCount?: number;
    usage?: string;
    isBlocked?: boolean;
    constructor(params?:ProfileModel){
        this.profileId = params?.profileId || null;
        this.name = params?.name || null;
        this.avatarUrl = params?.avatarUrl || null;
        this.deviceCount = params?.deviceCount || null;
        this.usage = params?.usage || null;
        this.isBlocked = params?.isBlocked || null;
    }
}
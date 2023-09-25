export class ExperianceIQUserModel{
    onboarded: boolean;
    email: string;
    userId: string;
    constructor(params?:ExperianceIQUserModel){
        this.onboarded = params.onboarded;
        this.email = params.email;
        this.userId = params.userId;
    }
  }
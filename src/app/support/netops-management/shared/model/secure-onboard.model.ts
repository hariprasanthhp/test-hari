export class SecureOnboardModel{
    secureOnboarding?: boolean;
    orgId?:string;

    constructor(secureOnboarding?: boolean,orgId?:string ) {
        this.secureOnboarding = secureOnboarding || null;
        this.orgId = orgId || null;
    }
}
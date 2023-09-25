export class SelfHealModel{
    selfHeal?: boolean;
    enableTime?: string;

    constructor(selfHeal?: boolean, enableTime?: string) {
        this.selfHeal = selfHeal;
        this.enableTime = enableTime;
    }
}
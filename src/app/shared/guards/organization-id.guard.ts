import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SsoAuthService } from "src/app/shared/services/sso-auth.service";

@Injectable({
    providedIn: 'root'
})
export class OrganizationIdGuard implements CanActivate {
    constructor(private sso: SsoAuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const url = state.url;
        const orgId = this.sso.getOrganizationID(url);
        if (orgId) {
            return true;
        }
        else {
            const module = this.sso.getRedirectModule(url);
            this.router.navigateByUrl(module);
        }
    }

}
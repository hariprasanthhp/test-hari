import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Component({
  selector: 'app-configuration-workflow',
  templateUrl: './configuration-workflow.component.html',
  styleUrls: ['./configuration-workflow.component.scss']
})
export class ConfigurationWorkflowComponent implements OnInit {

  constructor(public sso: SsoAuthService, public router: Router) { 
    this.router.events.subscribe(event=>{
     if(event instanceof NavigationEnd){
        let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      if( currentUrl == '/cco-foundation/foundation-configuration/configuration-workflow'  ){
        this.sso.redirectByUrl([
          ``,
          ``,
          `/cco-foundation/foundation-configuration/configuration-workflow/workflows`
        ]);
      }
      }
    })
  }

  ngOnInit(): void {}

}

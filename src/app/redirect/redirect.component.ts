import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit, OnDestroy {
  redirectUrl = '';
  countDown: Subscription;
  counter = 3;
  tick = 1000;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.countDown = timer(1000, this.tick)
      .subscribe(() => --this.counter)

    this.route.queryParams.subscribe(params => {

      if (!(params['redirectUrl'] && params['redirectUrl'].trim())) {
        this.router.navigate(['/login']);
        return;
      }

      if (params['redirectUrl'] && params['redirectUrl'].trim()) {
        this.redirectUrl = `${params['redirectUrl']}?isLocalUser=${params['isLocalUser']}&username=${params['username']}`;
        setTimeout(() => {
          this.redirect();
        }, 3000);

      } else {
        this.router.navigate(['/login']);
      }

    });
  }

  redirect() {
    window.location.href = this.redirectUrl;
  }

  ngOnDestroy() {
    this.countDown = null;
  }

}

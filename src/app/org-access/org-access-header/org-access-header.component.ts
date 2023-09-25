import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-org-access-header',
  templateUrl: './org-access-header.component.html',
  styleUrls: ['./org-access-header.component.scss']
})
export class OrgAccessHeaderComponent implements OnInit {

  constructor(    private router: Router,
    ) { }
    

  ngOnInit(): void {
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}

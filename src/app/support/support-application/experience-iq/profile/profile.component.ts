import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  language: any;
  languageSubject;


  isExperienceIQ = true;

  constructor(private route: Router,private translateService: TranslateService) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

  submitprofile() {
  }

  navigateTabs(tab) {
    this.route.navigate([`/support/application/experienceIQ/${tab}`]);
  }

}

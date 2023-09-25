import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-profile-detail-device',
  templateUrl: './profile-detail-device.component.html',
  styleUrls: ['./profile-detail-device.component.scss']
})
export class ProfileDetailDeviceComponent implements OnInit {


  language: any;
  languageSubject;



sectionToShow = "details";

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

}

import { Component, OnInit ,OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';


@Component({
  selector: 'app-shad-footer',
  templateUrl: './shad-footer.component.html',
  styleUrls: ['./shad-footer.component.scss']
})
export class ShadFooterComponent implements OnInit {
  language: any;
  languageSubject;

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

}

import { Component, OnInit, Input , OnDestroy} from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent implements OnInit {
  language: any;
  languageSubject;

  options: any;
  placeHolder = 'Custom Options';
  @Input() selectOption: any;
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    // this.options = this.selectOption.options;
    this.options = [
      { value: 'name', name: 'Name' },
      { value: 'address', name: 'Address' },
      { value: 'name', name: 'Name' },
      { value: 'name', name: 'Name' },
    ];
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

}

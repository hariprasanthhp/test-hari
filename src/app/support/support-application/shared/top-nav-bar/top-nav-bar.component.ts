import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { NavMenu } from '../models/nav-menu';

@Component({
  selector: 'top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit, OnDestroy {

  @Input() menus: NavMenu[] = [];
  @Output() activeTab = new EventEmitter<String>();

  language;
  languageSubscription;

  constructor(
    public translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubscription = this.translateService.selectedLanguage.subscribe(language => {
      this.language = language;
      this.initMenus();
    });
    this.initMenus();
  }

  ngOnDestroy() {
    if (this.languageSubscription) this.languageSubscription.unsubscribe();
  }

  initMenus() {
    this.menus = this.menus.map(menu => {
      let newMenu = new NavMenu;
      newMenu['label'] = menu.label;
      newMenu['value'] = menu.value;
      if (menu.hasOwnProperty('display')) newMenu['display'] = menu.display ?? false;
      if (menu.state) newMenu['state'] = menu.state;
      return newMenu;
    });
  }

  tabSelectedEvent(selectedTab) {
    this.activeTab.emit(selectedTab);
  }

}

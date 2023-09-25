import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-cco-network-polices',
  templateUrl: './cco-network-polices.component.html',
  styleUrls: ['./cco-network-polices.component.scss']
})
export class CcoNetworkPolicesComponent implements OnInit, OnDestroy {

  language;
  languageSubject;

  constructor(private translateService : TranslateService, private titleService: Title,) { }


  ngOnInit(): void {
    this.titleService.setTitle('Calix Cloud - Operations - Network Operations - Policies');
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data : any)=>{
      this.language = data;
    })
  }

  ngOnDestroy(): void {
    if(this.languageSubject){
      this.languageSubject.unsubscribe();
    }
  }

}

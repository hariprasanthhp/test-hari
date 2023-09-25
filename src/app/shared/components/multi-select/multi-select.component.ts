import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'multi-select-dropdown',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})

export class MultiSelectComponent implements OnInit {
  @ViewChild('multiNgSelect') cMultiNgSelect:NgSelectComponent;
  @Input() cItems:any = [];
  @Input() cName = 'Select Options';
  @Input() cBindValue:any;
  @Input() cBindLabel:any;
  @Input() cClearable:any;
  @Input() cSearchable:any;
  @Input() cShowCountOfItems:boolean = false;
  @Input('cShowSelectAll') cShowSelectAll:boolean = false;
  @Output() cSelectChange = new EventEmitter<any>();
  @Output() cBlurChange = new EventEmitter<any>();
  filterSearchInput='';
  @Input() cSelectedItems:any = [];
  @Input() allSelected:boolean = false;
  language:any;
  languageSubject:any;
  @Input() cPlaceHolder:any;
  constructor(private translateService:TranslateService) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data) => {
      this.language = data;
    });
  }
  ngAfterViewInit(){
    this.cMultiNgSelect.openEvent.subscribe(() => {
      this.searchFilter();
    })
  }
  resetSelect(){
    this.cMultiNgSelect.handleClearClick();
  }
  resetSearchFilter(){
    this.filterSearchInput = '';
  }
  searchFilter(){
    this.cMultiNgSelect.filter(this.filterSearchInput);
  }
  onChange(change) {
    this.cSelectChange.emit({event : change, selectedItems : this.cSelectedItems});
  }
  multiSelectBlur(change){
    this.cBlurChange.emit({event : change, selectedItems : this.cSelectedItems});
  }
  chooseAllOptions(event){
    if (event.target.checked) {
      this.cSelectedItems = [...new Set(this.cItems.map(x => x[this.cBindValue]))];
      this.allSelected = true;
    } else {
      this.cSelectedItems = [];
      this.allSelected = false;
    }
  } 
}

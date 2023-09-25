import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'customer-portal-visitors',
  templateUrl: './customer-portal-visitors.component.html',
  styleUrls: ['./customer-portal-visitors.component.scss']
})
export class CustomerPortalVisitorsComponent implements OnInit {

  @Input() language: any = {};
  @Output() submitForm: any = new EventEmitter();

  form: FormGroup;
  retentionDays: any = [];

  constructor(
    private parent: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.form = this.parent.form;
    this.retentionDays = [
      { id: '1 ' + this.language['day'], value: 1 },
      { id: '15 ' + this.language['days'], value: 15 },
      { id: '30 ' + this.language['days'], value: 30 },
      { id: '60 ' + this.language['days'], value: 60 },
      { id: '90 ' + this.language['days'], value: 90 },
    ];
  }

  loginRetentionChanged() {
    this.submitForm.emit('');
  }
}

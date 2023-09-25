import { Component, Input, OnInit, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'customer-portal-content',
  templateUrl: './customer-portal-content.component.html',
  styleUrls: ['./customer-portal-content.component.scss']
})
export class CustomerPortalContentComponent implements OnInit {

  @Input() language: any = {};
  @Output() submitForm: any = new EventEmitter();
  @Output() uploadImage: any = new EventEmitter();
  @Output() deleteImage: any = new EventEmitter();

  loading = true;
  invalidURL = false;
  errorValidation: any = {};

  form: FormGroup;

  constructor(
    public parent: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.form = this.parent.form;
    this.loading = false;
  }

  get title() {
    return this.form.value.title;
  }

  get termsUrl() {
    return this.form.value.termsUrl;
  }

  get coverImage() {
    return this.form.value.coverImage;
  }

  get buttonText() {
    return this.form.value.buttonText;
  }

  validateUrl() {
    if (!this.termsUrl) {
      this.invalidURL = false;
      return;
    }
    let pattern = /((h|H)ttp(s)?:\/\/)+(www\.)?(([^www\.][-a-zA-Z0-9@:%._\+~#=]{2,236})\.[a-z]{2,6})\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    this.invalidURL = (!pattern.test(this.termsUrl) || !this.termsUrl);
    return this.invalidURL;
  }

  validateString(event) {
    let allowedCharacters = /^[a-zA-Z0-9:—_"!&“/?\s…\-]*$/;
    let pastedText = '';
    if (event.clipboardData) pastedText = event.clipboardData.getData('text');
    if (!allowedCharacters.test(event.key || pastedText)) {
      event.preventDefault();
    }
  }

  uploadCoverImage(event) {
    let input = {
      file: event.target.files[0] ? event.target.files[0] : '',
      type: 'coverImage'
    }
    this.uploadImage.emit(input);
  }

  deleteCoverImage() {
    let input = {
      openDialog: true,
      type: 'coverImage'
    }
    this.deleteImage.emit(input);
  }

  submit() {
    if (!this.invalidURL) {
      this.submitForm.emit('');
    }
  }

}

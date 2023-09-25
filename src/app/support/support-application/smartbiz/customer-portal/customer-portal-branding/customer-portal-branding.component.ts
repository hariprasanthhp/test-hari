import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Component({
  selector: 'customer-portal-branding',
  templateUrl: './customer-portal-branding.component.html',
  styleUrls: ['./customer-portal-branding.component.scss']
})
export class CustomerPortalBrandingComponent implements OnInit {

  @Input() language: any = {};
  @Output() submitForm: any = new EventEmitter();
  @Output() uploadImage: any = new EventEmitter();
  @Output() deleteImage: any = new EventEmitter();

  invalidLogoImage = false;
  form: FormGroup;

  bgColorPicker = '';
  pbColorPicker = '';
  fColorPicker = '';
  bfColorPicker = '';

  constructor(
    public parent: FormGroupDirective,
    public ssoAuthService: SsoAuthService
  ) { }

  ngOnInit(): void {
    this.form = this.parent.form;
    this.bgColorPicker = this.bgColor;
    this.pbColorPicker = this.pbColor;
    this.fColorPicker = this.fColor;
    this.bfColorPicker = this.bfColor;
  }

  get logoImage() {
    return this.form.value.logoImage;
  }

  get bgColor() {
    return this.form.value.bgColor;
  }

  get pbColor() {
    return this.form.value.pbColor;
  }

  get fColor() {
    return this.form.value.fColor;
  }

  get bfColor() {
    return this.form.value.bfColor;
  }

  uploadLogo(event) {
    let input = {
      file: event.target.files[0] ? event.target.files[0] : '',
      type: 'logoImage'
    }
    this.uploadImage.emit(input);
  }

  deleteLogo() {
    let input = {
      openDialog: true,
      type: 'logoImage'
    }
    this.deleteImage.emit(input);
  }

  colorPickerChangedEvent(color, field) {
    this.bgColorPicker = color;
    this.form.get(field).patchValue(color);
  }

  submit() {
    this.submitForm.emit('');
  }

}

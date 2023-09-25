import { Component, OnInit } from '@angular/core';
import { CryptographyService } from 'src/app/shared/services/cryptography.service';

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.scss']
})
export class EncryptionComponent implements OnInit {
  showCryptoPopup = true;
  strInput = '';
  strOutput = '';
  constructor(private cryptoService: CryptographyService) { }

  ngOnInit(): void { }

  convertText(type) {
    if(type) {
    this.strOutput = this.cryptoService.encrypt(this.strInput);
    this.strInput = '';
    } else {
      this.strOutput = this.cryptoService.decrypt(this.strInput);
      this.strInput = '';
    }
  }

}

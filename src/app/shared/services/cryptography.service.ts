import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptographyService {
  encKey = 'cQxg~=PuAv!@m92S';
  // decKey = 'D(,r6hj?M:~gf6K.';
  constructor() { }

 encrypt(data: string) {
   return CryptoJS.AES.encrypt(data.trim(), this.encKey).toString(); ;
 }

 decrypt(data: string) {
  return CryptoJS.AES.decrypt(data.trim(), this.encKey).toString(CryptoJS.enc.Utf8);
 }

}

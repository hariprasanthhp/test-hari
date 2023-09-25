import { Injectable } from '@angular/core';
var CryptoJS = require('crypto-js');
declare let pendo: any;

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionsService {
  isSwapInProgress: boolean = false;
  swapInProgressData: any = {};
  constructor() { }

  getUniqueId(length: number) {
    var result = [];
    var characters = '_-ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() *
        charactersLength)));
    }
    return result.join('');
  }

  decryptKeys(encryptedTxt = '', secretKey = '*poj.ocj;l\iljoewapkm,cyju-taoil=yi76+l646_31237#$%x9!"@sh9853($)^') {
    const bytes = CryptoJS.AES.decrypt(encryptedTxt, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }

  encryptKeys(encryptedTxt = '', secretKey = '*poj.ocj;l\iljoewapkm,cyju-taoil=yi76+l646_31237#$%x9!"@sh9853($)^') {
    const encrpyt = CryptoJS.AES.encrypt(encryptedTxt, secretKey).toString();
    return encrpyt;
  }

  cdDecryptPwd(encryptedTxt = '', secretKey = '') {
    const salt = "dc0da04af8fee58593442bf834b30739";    //CryptoJS.lib.WordArray.random(128 / 8);
    const key128 = CryptoJS.PBKDF2(secretKey, CryptoJS.enc.Hex.parse(salt), { keySize: 128 / 32, iterations: 1000 });
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(encryptedTxt)
    });
    const bytes = CryptoJS.AES.decrypt(cipherParams, key128, { iv: CryptoJS.enc.Hex.parse(salt) });
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }

  decryptObj(encryptedTxt = '', secretKey = 'jygjy^)$%??//??jkD|";\|htdhscsacsfwrfiy~~`@!') {
    const bytes = CryptoJS.AES.decrypt(encryptedTxt, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }
  trimSpaceFromNonObjectInputs(value) {
    return value.trim();
  };
  trackPendoEvents(event: string, eventName: string) {
    pendo.track(eventName, {
      accountId: localStorage.getItem("calix.spid"),
      visitorId: localStorage.getItem("calix.userId"),
    });
  }
}

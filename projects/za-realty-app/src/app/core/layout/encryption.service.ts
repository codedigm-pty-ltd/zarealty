import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  //TODO: pass in key from environment file.
  SECRET_KEY = '0123456789123456';

  constructor() {
  }

  encrypt<T>(data: T) {
    let key = CryptoJS.enc.Utf8.parse(this.SECRET_KEY);
    let iv = CryptoJS.enc.Utf8.parse(this.SECRET_KEY);

    return CryptoJS.AES.encrypt(JSON.stringify(data), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
  }

  decrypt<T>(encryptedData: string) : T {
    let key = CryptoJS.enc.Utf8.parse(this.SECRET_KEY);
    let iv = CryptoJS.enc.Utf8.parse(this.SECRET_KEY);

    let decrypted = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(encryptedData,  key,
      {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        })));

    return decrypted as T;
  }
}

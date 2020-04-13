import { Injectable } from '@angular/core';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {

  constructor(private encryptionService: EncryptionService) {
  }

  setState<T>(key: string, data: T) {
    let encryptedValue = this.encryptionService.encrypt<T>(data);
    localStorage.setItem(key, encryptedValue);
  }

  getState<T extends Object>(key: string) : T | null {
    let encryptedValue: string = localStorage.getItem(key) || "";
    if (!encryptedValue)
      return null;

    return this.encryptionService.decrypt<T>(encryptedValue);
  }

  removeState(key : string) {
    localStorage.removeItem(key);
  }

  clearAllState() {
    localStorage.clear();
  }
}

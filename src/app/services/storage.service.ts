import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageKey = 'chat-system';

  constructor() {}

  setItem(key: string, value: any): void {
    let storage = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    storage[key] = value;
    localStorage.setItem(this.storageKey, JSON.stringify(storage));
  }

  getItem(key: string): any {
    let storage = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    return storage[key];
  }

  removeItem(key: string): void {
    let storage = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    delete storage[key];
    localStorage.setItem(this.storageKey, JSON.stringify(storage));
  }
}

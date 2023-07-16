import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  setCookie(name: string, value: any, daysToExpire: number = 7) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  getCookie(name: string): any {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  deleteCookie(name: string) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }

  setData(key: string, value: any, daysToExpire: number = 7) {
    const stringValue = JSON.stringify(value);
    this.setCookie(key, stringValue, daysToExpire);
  }

  getData(key: string): any {
    const stringValue = this.getCookie(key);
    if (stringValue) {
      return JSON.parse(stringValue);
    }
    return null;
  }

  deleteData(key: string) {
    this.deleteCookie(key);
  }
}

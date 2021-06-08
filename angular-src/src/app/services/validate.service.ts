import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.name === undefined || user.username === undefined || user.password === undefined || user.designation === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateUpdation(user) {
    if (user.name === undefined || user.username === undefined ||user.gender === undefined || user.subject === undefined ||user.email === undefined || user.designation === undefined || user.address === undefined || user.city === undefined || user.mobile_no === undefined || user.country === undefined ||user.pin_no === undefined) {
      return false;
    } else {
      return true;
    }
  }


  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

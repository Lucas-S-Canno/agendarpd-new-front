import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _isLoggedIn: boolean = false;
  private user!: UserModel
  private _token: string = '';

  constructor() { }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  get token(): string {
    return this._token;
  }
  set token(value: string) {
    console.log('Token set:', value);
    this._token = value;
  }

  get userData(): UserModel {
    return this.user;
  }
  set userData(value: UserModel) {
    this.user = value;
  }
}

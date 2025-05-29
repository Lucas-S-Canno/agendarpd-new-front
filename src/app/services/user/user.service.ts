import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/response';
import { UserModel } from '../../models/user';
import { StateService } from '../state/state.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = environment.apiUrl + `/user-app/user`;
  constructor(
    private http: HttpClient,
    private stateService: StateService
  ) { }

  getUserProfile(): Observable<ResponseModel<UserModel>> {
    const token = this.stateService.token // ajuste conforme seu StateService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ResponseModel<UserModel>>(
      `${this.API_URL}/me`,
      { headers }
    );
  }
}

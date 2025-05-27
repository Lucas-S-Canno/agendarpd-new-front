import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { EventModel } from '../../models/event';
import { ResponseModel } from '../../models/response';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  API_URL = environment.apiUrl + '/public/event';

  constructor(
    private http: HttpClient
  ) { }

  getAllEvents(): Observable<ResponseModel<EventModel[]>> {
    return this.http.get<ResponseModel<EventModel[]>>(`${this.API_URL}`);
  }

}

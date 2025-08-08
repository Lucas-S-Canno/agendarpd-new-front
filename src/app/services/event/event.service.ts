import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { EventModel } from '../../models/event';
import { ResponseModel } from '../../models/response';
import { StateService } from '../state/state.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  API_PUBLIC_URL = environment.apiUrl + '/public/event';
  API_URL = environment.apiUrl + '/user-app/event';

  constructor(
    private http: HttpClient,
    private stateService: StateService
  ) { }

  getAllEvents(): Observable<ResponseModel<EventModel[]>> {
    return this.http.get<ResponseModel<EventModel[]>>(`${this.API_PUBLIC_URL}`);
  }

  createEvent(event: EventModel): Observable<ResponseModel<EventModel>> {
    const token = this.stateService.token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<ResponseModel<EventModel>>(`${this.API_URL}`, event, { headers });
  }

  getMyEvents(): Observable<ResponseModel<EventModel[]>> {
    const token = this.stateService.token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<ResponseModel<EventModel[]>>(`${this.API_URL}/my-events`, { headers });
  }

  getRegisteredEvents(): Observable<ResponseModel<EventModel[]>> {
    const token = this.stateService.token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<ResponseModel<EventModel[]>>(`${this.API_URL}/registered-events`, { headers });
  }

  registerInEvent(eventId: string): Observable<ResponseModel<EventModel>> {
    const token = this.stateService.token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.patch<ResponseModel<EventModel>>(`${this.API_URL}/${eventId}/register`, {}, { headers });
  }

  unregisterFromEvent(eventId: string): Observable<ResponseModel<EventModel>> {
    const token = this.stateService.token;
    const headers = { Authorization: `Bearer ${token}` };
  return this.http.patch<ResponseModel<EventModel>>(`${this.API_URL}/${eventId}/unregister`, {}, { headers });
}

}

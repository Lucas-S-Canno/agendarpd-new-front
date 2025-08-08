import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventUpdateService {
  private eventUpdated = new Subject<void>();

  eventUpdated$ = this.eventUpdated.asObservable();

  notifyEventUpdated(): void {
    this.eventUpdated.next();
  }
}

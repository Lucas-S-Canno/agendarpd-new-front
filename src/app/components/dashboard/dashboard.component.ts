import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../models/event';
import { EventService } from '../../services/event/event.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [
    EventService
  ],
  imports: [
    HttpClientModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  events: EventModel[] = [];

  constructor(
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.getAllEvents();
    console.log('Dashboard initialized');
  }

  getAllEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (response) => {
        this.events = response.data;
        console.table(this.events);
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
  }

}

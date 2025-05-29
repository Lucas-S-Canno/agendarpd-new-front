import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../models/event';
import { EventService } from '../../services/event/event.service';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventCardComponent } from '../../shared/event-card/event-card.component';
import { CommonModule } from '@angular/common';
import { StateService } from '../../services/state/state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [
    EventService
  ],
  imports: [
    CommonModule,
    EventCardComponent,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  loading: boolean = true;
  events: EventModel[] = [];

  constructor(
    private eventService: EventService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.getAllEvents();
    console.log('Dashboard initialized');
    console.log('Is user logged: ' + this.stateService.isLoggedIn);
    if (this.stateService.isLoggedIn) {
      console.log(this.stateService.userData);
    }
  }

  getAllEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (response) => {
        this.events = response.data;
        console.table(this.events);
      },
      complete: () => {
        setTimeout(() => {
          console.log('Simulating delay for loading spinner');
          this.loading = false;
        }, 2000);
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
  }

}

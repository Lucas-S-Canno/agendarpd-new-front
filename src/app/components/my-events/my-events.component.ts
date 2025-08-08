import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { EventModel } from '../../models/event';
import { EventsByDate } from '../../models/eventsByDate';
import { EventService } from '../../services/event/event.service';
import { StateService } from '../../services/state/state.service';
import { EventCardComponent } from '../../shared/event-card/event-card.component';
import { EventUpdateService } from '../../services/event/event-update.service';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [
    CommonModule,
    EventCardComponent,
    MatProgressSpinnerModule,
    MatExpansionModule
  ],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss'
})
export class MyEventsComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  events: EventModel[] = [];
  eventsByDate: EventsByDate[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private eventService: EventService,
    private stateService: StateService,
    private eventUpdateService: EventUpdateService
  ) {}

  ngOnInit(): void {
    this.getMyEvents();

    // Escutar por atualizações de eventos
    this.subscription.add(
      this.eventUpdateService.eventUpdated$.subscribe(() => {
        console.log('Eventos atualizados, recarregando...');
        this.getMyEvents();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getMyEvents(): void {
    this.loading = true;
    this.eventService.getMyEvents().subscribe({
      next: (response) => {
        this.events = response.data;
        this.groupEventsByDate();
      },
      complete: () => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      },
      error: (error) => {
        console.error('Error fetching my events:', error);
        this.loading = false;
      }
    });
  }

  groupEventsByDate(): void {
    const grouped = this.events.reduce((acc, event) => {
      const date = event.data;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {} as { [key: string]: EventModel[] });

    this.eventsByDate = Object.keys(grouped)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map(date => ({
        date,
        displayDate: this.formatDateForDisplay(date),
        events: grouped[date].sort((a, b) => a.horario.localeCompare(b.horario))
      }));
  }

  formatDateForDisplay(dateString: string): string {
    const date = new Date(dateString + 'T00:00:00');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Normalizar datas para comparação (apenas dia/mês/ano)
    const eventDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const tomorrowNormalized = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());

    if (eventDate.getTime() === todayNormalized.getTime()) {
      return 'Hoje - ' + date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long'
      });
    } else if (eventDate.getTime() === tomorrowNormalized.getTime()) {
      return 'Amanhã - ' + date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long'
      });
    } else {
      return date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }
  }

  getEventCountText(count: number): string {
    return count === 1 ? '1 evento' : `${count} eventos`;
  }
}

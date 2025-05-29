import { Component, Input } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { MatCardModule }     from '@angular/material/card';
import { MatChipsModule }    from '@angular/material/chips';
import { EventModel }        from '../../models/event';
import { MatDialog } from '@angular/material/dialog';
import { EventModalComponent } from '../event-modal/event-modal.component';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [
    EventModalComponent,
    CommonModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
  @Input() event!: EventModel;

  constructor(private dialog: MatDialog) {}

  get vagasDisponiveis(): string {
    const ocupadas = this.event.jogadores.length;
    const total    = this.event.numeroDeVagas;
    return `Vagas: ${ocupadas}/${total}`;
  }

  openModal(): void {
    this.dialog.open(EventModalComponent, {
      data: this.event,
      maxWidth: '90vw',
      maxHeight: '90vh'
    });
  }
}

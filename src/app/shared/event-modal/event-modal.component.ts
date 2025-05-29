import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { EventModel } from '../../models/event';
import { StateService } from '../../services/state/state.service';

@Component({
  selector: 'app-event-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss']
})
export class EventModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public event: EventModel,
    private stateService: StateService
  ) {}

  get isLoggedIn(): boolean {
    return this.stateService.isLoggedIn;
  }

  get isUserRegistered(): boolean {
    if (!this.isLoggedIn || !this.stateService.userData?.id) return false;
    return this.event.jogadores.includes(this.stateService.userData.id);
  }

  get canRegister(): boolean {
    return this.isLoggedIn && !this.isUserRegistered && !this.isEventFull;
  }

  get isEventFull(): boolean {
    return this.event.jogadores.length >= this.event.numeroDeVagas;
  }

  get buttonText(): string {
    if (!this.isLoggedIn) return 'Para se cadastrar nesse evento, é necessário estar logado';
    if (this.isUserRegistered) return 'Você já está cadastrado neste evento';
    if (this.isEventFull) return 'Evento lotado';
    return 'Cadastrar-se no evento';
  }

  onRegister(): void {
    if (this.canRegister) {
      // TODO: implementar lógica de cadastro no evento
      console.log('Cadastrando usuário no evento:', this.event.id);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

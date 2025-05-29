import { Component, ViewChild }     from '@angular/core';
import { CommonModule }             from '@angular/common';
import { MatSidenav }               from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, take }    from 'rxjs';
import { Router, RouterModule }     from '@angular/router';
import { StateService }             from '../../services/state/state.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule }    from '@angular/material/icon';
import { MatListModule }    from '@angular/material/list';
import { MatButtonModule }  from '@angular/material/button';

@Component({
  selector: 'app-navi',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(res => res.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private stateService: StateService,
    private router: Router
  ) {}

  get isLoggedIn(): boolean {
    return this.stateService.isLoggedIn;
  }

  get userName(): string {
    return this.stateService.userData?.nomeCompleto || '';
  }

  get userType(): string {
    return this.stateService.userData?.tipo || '';
  }

  get canCreateEvents(): boolean {
    const allowedTypes = ['NRD', 'CRD', 'ADM'];
    return this.isLoggedIn && allowedTypes.includes(this.userType);
  }

  onLinkClick(): void {
    this.isHandset$.pipe(take(1)).subscribe(isHandset => {
      if (isHandset) this.drawer.close();
    });
  }

  logout(): void {
    this.stateService.isLoggedIn = false;
    this.stateService.token = '';
    this.stateService.userData = {} as any;
    this.onLinkClick();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}

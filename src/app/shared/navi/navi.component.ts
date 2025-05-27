import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, take } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navi',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.scss'
})
export class NaviComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(res => res.matches));

  constructor(private breakpointObserver: BreakpointObserver) {}

  // Nova função que fecha a gaveta apenas em handset
  onLinkClick(): void {
    this.isHandset$
      .pipe(take(1))
      .subscribe(isHandset => {
        if (isHandset) {
          this.drawer.close();
        }
      });
  }
}

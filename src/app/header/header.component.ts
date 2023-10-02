import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { DrawerService } from '../shared/services/drawer.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isAverageScreen$ = this.breakpointObserver
    .observe(['(max-width: 1024px)'])
    .pipe(map((result: any) => result.matches));
  public isDrawerOpen$: Observable<boolean> = this.drawer.isDrawerOpen$;

  constructor(
    private drawer: DrawerService,
    private breakpointObserver: BreakpointObserver
  ) {}

  public openDrawer(): void {
    this.drawer.openDrawer();
  }

  public closeDrawer(): void {
    this.drawer.closeDrawer();
  }
}

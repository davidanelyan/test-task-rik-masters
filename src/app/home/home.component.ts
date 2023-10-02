import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';

import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { DrawerService } from '../shared/services/drawer.service';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { AddFormComponent } from './add-form/add-form.component';
import { TableComponent } from './table/table.component';
import { UserService } from '../shared/services/user.service';
import { map } from 'rxjs';
import { SmallSideBarComponent } from './small-side-bar/small-side-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    SideBarComponent,
    SmallSideBarComponent,
    FilterFormComponent,
    AddFormComponent,
    TableComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public isOpen: boolean;
  public isAdd: boolean = true;

  public isAverageScreen$ = this.breakpointObserver
    .observe(['(max-width: 1024px)'])
    .pipe(map((result: any) => result.matches));

  public isSmallScreen$ = this.breakpointObserver
    .observe(['(max-width: 768px)'])
    .pipe(map((result: any) => result.matches));

  @ViewChild(MatDrawer) matdrawer: MatDrawer;

  constructor(
    private userSerivec: UserService,
    private breakpointObserver: BreakpointObserver,
    private drawer: DrawerService
  ) {
    this.drawer.isDrawerOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  public changeStatus(status: string): void {
    this.userSerivec.selectedUser.subscribe((users) => {
      users.map((item) => {
        item.status = status;
      });
      const usersFromLocalStorage = JSON.parse(localStorage.getItem('users'));
      for (const user of users) {
        const userIndex = usersFromLocalStorage.findIndex(
          (item) => item.id === user.id
        );

        if (userIndex !== -1) {
          usersFromLocalStorage[userIndex].status = status;
        }
      }
      localStorage.setItem('users', JSON.stringify(usersFromLocalStorage));
    });
  }
}

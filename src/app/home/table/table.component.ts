import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  FinallyUser,
  FilterUser,
} from 'src/app/shared/interfaces/user.interface';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { UserService } from 'src/app/shared/services/user.service';
import { PhoneNumberRuPipe } from 'src/app/shared/pipes/phone-number-ru.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    PhoneNumberRuPipe,
    FormsModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public dataSource: any;
  public isChecked: boolean = false;
  public isEmpty: boolean = false;
  public finallyResult: FinallyUser[];
  public displayedColumns: string[] = [
    'actions',
    'login',
    'email',
    'phone',
    'role',
    'updateDate',
    'creationDate',
    'status',
    'salary',
  ];
  public selectedUsers: string[] = [];

  public isSmallScreen$ = this.breakpointObserver
    .observe(['(max-width: 768px)'])
    .pipe(map((result: any) => result.matches));

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private breakpointObserver: BreakpointObserver
  ) {}

  public ngOnInit(): void {
    this.userService
      .getAllDataAndSaveToLocaleStorage()
      .subscribe((respData) => {
        this.finallyResult = respData;
        this.getDataSource();
      });

    this.userService.filterState$.subscribe((filters) => {
      if (filters) this.applyFilter(filters);
    });

    this.userService.addedUser$.subscribe((user) => {
      if (user) this.additionUser(user);
    });
  }

  public convertToDate(miliSeconds: number): string {
    let date = new Date(miliSeconds);
    return (
      ('0' + date.getDate()).slice(-2) +
      '.' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '.' +
      date.getFullYear()
    );
  }

  public syncPrimaryPaginator(event: PageEvent): void {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.paginator.page.emit(event);
  }

  public onCheckboxChange(element: string, event: Event): void {
    if (element === 'all') {
      if ((event.target as HTMLInputElement).checked) {
        this.userService.usersSelected.next(true);
        this.userService.selectedUser.next(this.finallyResult);
        this.finallyResult.map((user) => {
          this.selectedUsers.push(user.id.toString());
        });
      } else {
        this.selectedUsers = [];
        this.userService.usersSelected.next(false);
      }
    } else {
      const selectedUser = this.finallyResult.find((item) => {
        return item.id === +element;
      });
      this.userService.selectedUser.next([selectedUser]);
      if ((event.target as HTMLInputElement).checked) {
        this.selectedUsers.push(element);
        if (this.selectedUsers.length === this.finallyResult.length) {
          this.userService.selectedUser.next(this.finallyResult);
          this.isChecked = true;
        }
        this.userService.usersSelected.next(true);
      } else {
        this.selectedUsers = this.selectedUsers.filter((id) => id !== element);
        this.isChecked = false;
        if (this.selectedUsers.length === 0) {
          this.userService.usersSelected.next(false);
        }
      }
    }
  }

  private getDataSource(): void {
    this.dataSource = new MatTableDataSource(this.finallyResult);
    this.dataSource.paginator = this.paginator;
    this.translateMatPaginator(this.paginator);
  }

  private translateMatPaginator(paginator: MatPaginator): void {
    paginator._intl.itemsPerPageLabel = 'Отображать записей: ';
  }

  private applyFilter(filterValue: FilterUser): void {
    const filteredData = this.finallyResult.filter((item) => {
      for (let key in filterValue) {
        if (filterValue[key] !== null && item[key] !== filterValue[key]) {
          return false;
        }

        if (filterValue[key] === null) {
          continue;
        }
      }
      return true;
    });
    if (filteredData.length === 0) {
      this.isEmpty = true;
    }

    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.paginator = this.paginator;
    this.translateMatPaginator(this.paginator);
  }

  private additionUser(user: FinallyUser): void {
    const updateUser = {
      id: this.finallyResult.length + 1,
      ...user,
    };

    const updateData = this.finallyResult;
    updateData.push(updateUser);
    const users = JSON.parse(localStorage.getItem('users'));
    users.push(updateUser);
    localStorage.setItem('users', JSON.stringify(users));

    this.dataSource = new MatTableDataSource(updateData);
    this.dataSource.paginator = this.paginator;
    this.translateMatPaginator(this.paginator);
  }
}

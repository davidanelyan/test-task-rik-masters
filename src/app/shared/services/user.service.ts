import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';

import {
  DataForUser,
  FilterUser,
  FinallyUser,
  User,
  UserData,
} from '../interfaces/user.interface';
import { environment } from 'src/enviroment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public usersSelected = new BehaviorSubject<boolean>(false);
  public selectedUser = new BehaviorSubject<FinallyUser[]>(null);

  private filterState = new BehaviorSubject<FilterUser>(null);
  private addedUser = new BehaviorSubject<FinallyUser>(null);
  public filterState$ = this.filterState.asObservable();
  public addedUser$ = this.addedUser.asObservable();

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getAllDataAndSaveToLocaleStorage(): Observable<FinallyUser[]> {
    return forkJoin([this.getAllUsers(), this.getData()]).pipe(
      map(([respUsers, respData]) => {
        const users = respUsers;
        const data = respData;

        const mergedData = {};

        data.forEach((item) => {
          const userId = item.user_id;
          if (!mergedData[userId]) {
            mergedData[userId] = item;
          }
        });

        const finallyResult = users.map((user) => ({
          ...user,
          role: mergedData[user.id]?.is_admin,
          isEcp: mergedData[user.id]?.is_ecp,
          status: mergedData[user.id]?.status,
        }));

        localStorage.setItem('users', JSON.stringify(finallyResult));
        return finallyResult;
      })
    );
  }

  public setFilters(filters: FilterUser): void {
    this.filterState.next(filters);
  }

  public setAddedUser(user: FinallyUser): void {
    this.addedUser.next(user);
  }

  private getAllUsers(): Observable<User[]> {
    return this.http.get<UserData>(this.apiUrl).pipe(
      map((respData) => {
        return respData.users;
      })
    );
  }

  private getData(): Observable<DataForUser[]> {
    return this.http.get<UserData>(this.apiUrl).pipe(
      map((respData) => {
        return respData.data;
      })
    );
  }
}

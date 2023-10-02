import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private isDrawerOpenSubject = new BehaviorSubject<boolean>(false);

  isDrawerOpen$: Observable<boolean> = this.isDrawerOpenSubject.asObservable();

  constructor() {}

  openDrawer() {
    this.isDrawerOpenSubject.next(true);
  }

  closeDrawer() {
    this.isDrawerOpenSubject.next(false);
  }
}

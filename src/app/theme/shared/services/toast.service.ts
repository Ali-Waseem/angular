import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  private toastSubject = new Subject<{ message: string; type: 'success' | 'error'; duration: number }>();

  toastState$ = this.toastSubject.asObservable();

  showToast(message: string, type: 'success' | 'error' = 'success', duration: number = 3000) {
    this.toastSubject.next({ message, type, duration });
  }
}

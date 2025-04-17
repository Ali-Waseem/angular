import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  private loadingCount = signal(0);
  readonly isLoading = signal(false);

  show() {
    this.loadingCount.set(this.loadingCount() + 1);
    this.isLoading.set(true);
  }

  hide() {
    const count = Math.max(this.loadingCount() - 1, 0);
    this.loadingCount.set(count);
    this.isLoading.set(count > 0);
  }
}

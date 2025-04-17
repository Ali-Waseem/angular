import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toast.service';

import * as bootstrap from 'bootstrap';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  imports: [SharedModule],
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
  show: boolean = false;
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';
  @Input() duration: number = 3000;

  @ViewChild('toastRef', { static: true }) toastRef!: ElementRef;
  private toastSubscription: Subscription | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastSubscription = this.toastService.toastState$.subscribe((toast) => {
      this.show = true;
      this.message = toast.message;
      this.type = toast.type;
      this.duration = toast.duration;

      setTimeout(() => {
        this.show = false;
      }, this.duration);
    });
  }

  ngOnDestroy(): void {
    if (this.toastSubscription) {
      this.toastSubscription.unsubscribe();
    }
  }
}
// Angular Import
import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

// project import
import { LoadingScreenComponent } from './theme/shared/components/loading-screen/loading-screen.component';
import { LoadingService } from './theme/shared/services/loading.service';
import { SharedModule } from './theme/shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './theme/shared/interceptors/error.interceptor';
import { ToastComponent } from './theme/shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, LoadingScreenComponent,SharedModule],
  templateUrl: './app.component.html',
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private router = inject(Router);

  constructor(
    protected loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}

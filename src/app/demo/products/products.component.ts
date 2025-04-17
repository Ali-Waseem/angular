import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-products',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  constructor(
    private router: Router,
  ) {}

  route() {
    this.router.navigate(['products/details/1']);
  }
}

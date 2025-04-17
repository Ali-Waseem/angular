import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/theme/shared/services/http.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-product-details',
  imports: [SharedModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  readonly product = this.httpService.selectedProduct$;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.httpService.getProductById(id);
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

const routes: Routes = [

  {
    path: '',
    // component: ProductsComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./components/products-list/products-list.component').then(m => m.ProductsListComponent),
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./components/product-details/product-details.component').then(m => m.ProductDetailsComponent),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

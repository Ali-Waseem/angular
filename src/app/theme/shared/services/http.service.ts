import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Product } from '../models.ts/product.model'; // Adjust the path as needed
import { environment } from 'src/environments/environment';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  readonly GET_ALL_PRODUCTS = `${environment.apiUrl}products`;
  readonly GET_BY_ID = `${environment.apiUrl}products/`;
  
  private selectedProduct = signal<Product | null>(null);
  selectedProduct$ = this.selectedProduct.asReadonly();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
  ) { }

  getProductList(): Observable<Product[]> {
    this.loadingService.show();
    return this.http.get<Product[]>(this.GET_ALL_PRODUCTS).pipe(
      finalize(() => {
        this.loadingService.hide()
        console.log()
      })
    );
  }

  getProductById(ID: string | null) {
    this.loadingService.show();
    this.http.get<Product>(`${this.GET_BY_ID}${ID}`).pipe(
      finalize(() => this.loadingService.hide())
    ).subscribe(product => this.selectedProduct.set(product));
  }

  addProduct(product: Product): Observable<Product> {
    this.loadingService.show();
    return this.http.post<Product>(this.GET_ALL_PRODUCTS, product).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
  
  updateProduct(id: number | string, product: Product): Observable<Product> {
    this.loadingService.show();
    return this.http.put<Product>(`${this.GET_BY_ID}${id}`, product).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
  
  deleteProduct(id: number | string): Observable<void> {
    this.loadingService.show();
    return this.http.delete<void>(`${this.GET_BY_ID}${id}`).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
  

}

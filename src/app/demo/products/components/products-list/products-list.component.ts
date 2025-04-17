import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/theme/shared/models.ts/product.model';
import { HttpService } from 'src/app/theme/shared/services/http.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
import { ToastService } from 'src/app/theme/shared/services/toast.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  imports: [SharedModule],
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalProducts: number = 0;
  modalRef!: NgbModalRef;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private toastService: ToastService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.httpService.getProductList().subscribe((products: Product[]) => {
      this.products = products;
      this.totalProducts = products.length;
      this.loadCategories(products);
    });
  }

  get paginatedProducts() {
    const filtered = this.filteredProducts();
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return filtered.slice(startIndex, endIndex);
  }

  filteredProducts() {
    const term = this.searchTerm.toLowerCase().trim();
    return this.products.filter((product) => {
      const matchesTitle = product.title.toLowerCase().includes(term);
      const matchesCategory = this.selectedCategory
        ? product.category?.toLowerCase() === this.selectedCategory.toLowerCase()
        : true;
      return matchesTitle && matchesCategory;
    });
  }

  goToDetais(id: string | number) {
    this.router.navigate([`products/details/${id}`]);
  }

  loadCategories(products: Product[]) {
    this.categories = Array.from(
      new Set(products.map((product) => product.category).filter((category) => category !== undefined))
    );
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  get totalPages() {
    return Math.ceil(this.filteredProducts().length / this.pageSize);
  }

  deleteProduct(id: string | number): void {
    this.products = this.products.filter(product => product.id !== id);
    this.totalProducts = this.products.length;
    this.toastService.showToast('Product Deleted Successfully','error', 3000)
  }

  openModal(product: Product | null = null): void {
    this.modalRef = this.modalService.open(AddEditProductComponent, {
      ariaLabelledBy: 'modal-basic-title',
    });
    this.modalRef.componentInstance.product = product;
    this.modalRef.result.then((newProduct: Product) => {
      if (newProduct) {
        if (product) {
          const index = this.products.findIndex((p) => p.id === product.id);
          if (index !== -1) {
            this.products[index] = newProduct;
          }
        } else {
          this.products.unshift(newProduct);
      }
    }
    });
  }

}

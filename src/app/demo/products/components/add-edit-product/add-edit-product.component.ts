import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/theme/shared/models.ts/product.model';
import { HttpService } from 'src/app/theme/shared/services/http.service';
import { ToastService } from 'src/app/theme/shared/services/toast.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-add-edit-product',
  imports: [SharedModule],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss'
})
export class AddEditProductComponent {
  @Input() product: Product | null = null;
  productForm!: FormGroup;
  submitted = false;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private activeModal: NgbActiveModal,
    private httpService: HttpService
  ) { }


  ngOnInit(): void {
    this.formInit();
    if (this.product) {
      this.productForm.patchValue(this.product);
      this.imagePreview = this.product.image || null;
    }
  }

  close() {
    this.activeModal.close();
  }

  formInit() {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      description: ['', Validators.required],
      image: [null]
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      const base64Reader = new FileReader();
      base64Reader.readAsDataURL(file);
      base64Reader.onloadend = () => {
        this.productForm.get('image')?.setValue(base64Reader.result);
      };
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched()
      return;
    }
  
    const productData = this.productForm.value;
    productData.image = 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
    const newProduct = { ...productData, id: this.product?.id || Date.now() }; 

    const msg = this.product ? 'Product Updated successfully!' : 'Product Added successfully!';
    if(this.product) {
      this.httpService.updateProduct(this.product.id, newProduct).subscribe(() => {
        this.activeModal.close(newProduct);
        this.product = newProduct;
      })
      } else {
        this.httpService.addProduct(newProduct).subscribe((product: Product) => {
          this.activeModal.close(product);
          this.product = product;
        });
      }
    this.toastService.showToast(msg, 'success');
  }
  


}
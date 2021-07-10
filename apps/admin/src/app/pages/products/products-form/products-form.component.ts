import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService, Product, Category } from '@frontend/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { CategoriesService } from '@frontend/products';


@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html'
})
export class ProductsFormComponent implements OnInit {

  formProducts: FormGroup;
  isSubmited: boolean = false;
  editMode: boolean = false;
  currentProductId: string = '';
  categories: any = [];
  imageDisplay: any;

  constructor(private fb: FormBuilder, private routerAc: ActivatedRoute, private productsService: ProductsService, private categoriesService:CategoriesService, private messageService: MessageService, private router: Router, private location: Location) {
    this.formProducts = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
    });
  }

  ngOnInit(): void {
    this._checkEditMode();
    this._getCategories();
  }

  private _checkEditMode() {
    this.routerAc.params.subscribe(params => {
      if (params.productId) {
        this.editMode = true;
        this.currentProductId = params.productId;
        this.productsService.getProductsById(params.productId).subscribe(resp => {
           this.productForm.name.setValue(resp.name);
           this.productForm.category.setValue(resp.category?.id);
           this.productForm.brand.setValue(resp.brand);
           this.productForm.price.setValue(resp.price);
           this.productForm.countInStock.setValue(resp.countInStock);
           this.productForm.isFeatured.setValue(resp.isFeatured);
           this.productForm.description.setValue(resp.description);
           this.productForm.richDescription.setValue(resp.richDescription);
          this.imageDisplay = resp.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        })
      }
    })
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    this.isSubmited = true;

    if (this.formProducts.invalid) {
      return;
    }

    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });

    if (this.editMode) {
       this._updateProduct(productFormData)
    } else {
       this._addProduct(productFormData);
    }
  }

  private _addProduct(product : FormData) {
    this.productsService.createProduct(product).subscribe((resp: Product) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product ${resp.name} is Created` });
      timer(1000).toPromise().then(done => {
        this.location.back();
      });
    },(error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Product is not Created'});
    });
  }

  private _updateProduct(product: FormData) {
    this.productsService.updateProduct(product, this.currentProductId).subscribe((resp: any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is Updated!' });
      timer(1000).toPromise().then(done => {
        this.location.back();
      });
    },(error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Product is not Updated!'});
    });
  }

  get productForm() {
    return this.formProducts.controls;
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formProducts.patchValue({ image: file });
      this.formProducts.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result
      }
      fileReader.readAsDataURL(file);
    }
  }

}

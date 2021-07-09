import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService, Category } from '@frontend/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  formCategories: FormGroup;
  isSubmited: boolean = false;
  editMode: boolean = false;
  currentCategoryId: string = '';

  constructor(private fb: FormBuilder, private routerAc: ActivatedRoute, private categoriesService: CategoriesService, private messageService: MessageService, private router: Router, private location: Location) {
    this.formCategories = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });
  }

  ngOnInit(): void {
    this._checkEditMode();
  }

  private _checkEditMode() {
    this.routerAc.params.subscribe(params => {
      if (params.categoryId) {
        this.editMode = true;
        this.currentCategoryId = params.categoryId;
        console.log(this.currentCategoryId);
        this.categoriesService.getCategoriesById(params.categoryId).subscribe(resp => {
          this.categoryForm.name.setValue(resp.name);
          this.categoryForm.icon.setValue(resp.icon);
          this.categoryForm.color.setValue(resp.color);
        })
      }
    })
  }
  onSubmit() {
    this.isSubmited = true;

    if (this.formCategories.invalid) {
      return;
    }

    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value,
    }

    if (this.editMode) {
        this._updateCategory(category)
    } else {
      this._addCategory(category);
    }
  }

  private _addCategory(category : Category) {
    this.categoriesService.createCategory(category).subscribe((resp: Category) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category ${resp.name} is Created` });
      timer(1000).toPromise().then(done => {
        this.location.back();
      });
    },(error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Category is not Created'});
    });
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe((resp: any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is Updated!' });
      timer(1000).toPromise().then(done => {
        this.location.back();
      });
    },(error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Category is not Updated!'});
    });
  }

  get categoryForm() {
    return this.formCategories.controls;
  }

}

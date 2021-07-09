import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@frontend/products';
import { MessageService,ConfirmationService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private confirmationService: ConfirmationService, private router: Router, private categoriesService: CategoriesService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe(resp => {
      this.categories = resp;
      console.log(resp);
    })
  }

  deteleCategory(id: string) {
      this.confirmationService.confirm({
          message: 'Do you want to Delete this category?',
          header: 'Delete Category',
          icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.categoriesService.deleteCategory(id).subscribe(resp => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is Deleted!' });
              this.loadCategories();
            },(error) => {
              this.messageService.add({severity:'error', summary:'Error', detail:'Category is not Deleted!'});
            });
          },
          reject: (type: any) => {
          }
      });
  }
}

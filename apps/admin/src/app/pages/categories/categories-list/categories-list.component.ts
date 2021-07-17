import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@frontend/products';
import { MessageService,ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  endsubs$: Subject<any> = new Subject();

  constructor(private confirmationService: ConfirmationService, private router: Router, private categoriesService: CategoriesService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe((resp: any) => {
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
            this.categoriesService.deleteCategory(id).pipe(takeUntil(this.endsubs$)).subscribe(resp => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is Deleted!' });
              this.getCategories();
            },(error) => {
              this.messageService.add({severity:'error', summary:'Error', detail:'Category is not Deleted!'});
            });
          },
          reject: (type: any) => {
          }
      });
  }
}

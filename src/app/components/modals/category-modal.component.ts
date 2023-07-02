import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/category.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-category-modal',
  template: `<mat-dialog-content style="padding: 0 !important;">
    <div class="relative shadow bg-gray-800 sm:p-5">
      <button
        type="button"
        class="absolute top-2.5 right-2.5 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
        data-modal-toggle="deleteModal"
        mat-dialog-close
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="white"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Close modal</span>
      </button>
      <form [formGroup]="categoryForm">
        <div>
          <label for="name" [class]="labelStyle">Category Name</label>
          <input
            type="text"
            formControlName="name"
            id="name"
            [class]="inputStyle"
            placeholder="Category Name"
          />
        </div>
      </form>
      <button
        class="btn btn-primary my-[8px] btn-sm"
        (click)="createCategory()"
      >
        Add Category
      </button>

      <h3 class="text-white mb-[16px]">Category List</h3>
      <div
        class="w-48 text-sm font-medium border rounded-lg bg-gray-700 border-gray-600 text-white"
      >
        <a
          aria-current="true"
          [class]="listStyle"
          *ngFor="let category of categories"
        >
          {{ category.name }}
        </a>
      </div>
    </div>
  </mat-dialog-content> `,
})
export class CategoryModalComponent implements OnInit {
  public listStyle =
    'block w-full px-4 py-2 border-b rounded-t-lg cursor-pointer bg-gray-800 border-gray-600';
  public categories: any[] = [];
  public inputStyle =
    'border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500';
  public labelStyle = 'block mb-2 text-sm font-medium text-white';

  public categoryForm = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getUsers().subscribe((data) => {
      this.categories = data;
    });
  }

  createCategory() {
    this.categoryService
      .create(this.categoryForm.getRawValue())
      .then((category) => {
        this.categoryForm.reset();
        this.getCategories();
      });
  }

  deleteCategory() {
    this.categoryService.delete(this.data.id).then(() => {
      this.dialogRef.close();
    });
  }
}

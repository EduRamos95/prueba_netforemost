import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Observable, finalize, map, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MealService } from '../../../services/meal/meal.service';
import { SearchMeal, SearchMealResponse } from '../../../models/the-meal-db/mealByCategory.models';
import { CardMealComponent } from './components/card-meal/card-meal.component';
import { Category, CategoryResponse } from '../../../models/the-meal-db/mealAllCategory.models';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    CardMealComponent,
  ],
})
export class HomeComponent implements OnInit {

  public loading: boolean = false;
  public mealForm!: FormGroup;
  public meals: SearchMeal[] = [];

  // Controls
  private mealSearch: string = "mealSearch";

  // Category 
  public allCategories: Category[] = [];
  public selectedCategory: Category | null = null;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private mealService: MealService,
  ) {}


  public ngOnInit(): void {
    this.searchAllCategory();
    this.initializedForm();
  }

  private initializedForm(): void {
    this.mealForm = this.fb.group({
      mealSearch: new FormControl('')
    });
  }

  private searchByName(name:string):void {
    if (!name) return;
    this.mealService.searchByMealName(name).subscribe(
      {
        next: (res: HttpResponse<SearchMealResponse>) => {
          // loading=false;
          this.meals = res.body?.meals ?? [];
          this.selectedCategory = null;
          this.cdr.detectChanges();
        },
        error: (error: HttpErrorResponse) => {
          // loading=false;
        },
      }
    )
  }

  private searchAllCategory(): void {
    this.mealService.AllCategory().subscribe(
      {
        next: (res: HttpResponse<CategoryResponse>) => {
          // loading=false;
          this.allCategories = res.body?.categories ?? [];
          this.cdr.detectChanges();
        },
        error: (error: HttpErrorResponse) => {
          // loading=false;
        },
      }
    )
  }

  private searchByCategory(name:string): void {
    if (!name) return;
    // limpiar
    this.mealForm.get(this.mealSearch)?.setValue("");
    this.mealService.searchByCategoryName(name).subscribe(
      {
        next: (res: HttpResponse<SearchMealResponse>) => {
          // loading=false;
          let resBody:SearchMeal[] = res.body?.meals ?? [];
          resBody = resBody.map((e:SearchMeal) => ({...e, strCategory:name}));
          console.log(resBody);
          this.meals = resBody;
          this.cdr.detectChanges();
        },
        error: (error: HttpErrorResponse) => {
          // loading=false;
        },
      }
    )
  }

  public onCategorySelected(category: Category): void {
    this.searchByCategory(category.strCategory);
    this.selectedCategory = category;
  }


  public send(): void {
    const name:string = this.mealForm.get(this.mealSearch)?.value ?? "";
    this.searchByName(name);
  }
}

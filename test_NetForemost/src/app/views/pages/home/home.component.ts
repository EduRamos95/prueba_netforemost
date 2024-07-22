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
    ReactiveFormsModule,
    MatButtonModule,
    CardMealComponent,
  ],
})
export class HomeComponent implements OnInit {

  public loading: boolean = false;
  public mealForm!: FormGroup;
  public meals: SearchMeal[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private mealService: MealService,
  ) {}


  public ngOnInit(): void {
    this.initializedForm();
  }

  private initializedForm(): void {
    this.mealForm = this.fb.group({
      mealSearch: new FormControl('')
    });
  }

  public send(): void {
    console.log(this.mealForm.get("mealSearch")?.value);
    const name:string = this.mealForm.get("mealSearch")?.value ?? "";
    if (name) {
      this.mealService.searchByMealName(name).subscribe(
        {
          next: (res: HttpResponse<SearchMealResponse>) => {
            // loading=false;
            this.meals = res.body?.meals ?? [];
            this.cdr.detectChanges();
            
          },
          error: (error: HttpErrorResponse) => {
            // loading=false;
            
          },
        }
      )
    }

    console.log(`enviar: `)
  }
}

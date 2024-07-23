import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { DetailsService } from '../../../../../services/details/details.service';
import { Router } from '@angular/router';
import { MealService } from '../../../../../services/meal/meal.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MealDetailsResponse } from '../../../../../models/the-meal-db/mealById.models';
@Component({
  selector: 'app-card-meal',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './card-meal.component.html',
  styleUrl: './card-meal.component.scss'
})
export class CardMealComponent {
  @Input() id:string = "";
  @Input() name:string = "";
  @Input() img:string = "";
  @Input() category:string = "";

  public loading:boolean = false;

  constructor(
    private router: Router,
    private detailService: DetailsService,
    private mealService: MealService,
  ){}

  private searchByMealId(id:string): void {
    if(!id) return;
    this.mealService.searchByMealId(this.id).subscribe(
      {
        next: (res: HttpResponse<MealDetailsResponse>) => {
          this.loading=false;
          this.router.navigateByUrl("/details");
          this.detailService.setDetails(res.body?.meals[0] ?? []);
        },
        error: (error: HttpErrorResponse) => {
          this.loading=false;
        },
      }
    );
  }

  onDetails() {
    // cargar valor al servicio
    this.loading = true;
    this.searchByMealId(this.id);
    // navegar de pagina
    
  }
}

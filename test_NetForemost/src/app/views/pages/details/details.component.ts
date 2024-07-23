import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailsService } from '../../../services/details/details.service';
import { Meal_Details } from '../../../models/the-meal-db/mealById.models';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{

  public mealD:Meal_Details | null = null;

  constructor(
    private router: Router,
    private detailService: DetailsService,
  ){}

  ngOnInit(): void {
    this.detailService.dataToSidebar$.subscribe(data => {
      this.mealD = data;
    });
  }

  toBack() {
    // navegar de pagina
    this.router.navigateByUrl("/index");
  }

}

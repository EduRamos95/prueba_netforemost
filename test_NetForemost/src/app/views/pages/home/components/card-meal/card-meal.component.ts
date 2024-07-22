import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-card-meal',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './card-meal.component.html',
  styleUrl: './card-meal.component.scss'
})
export class CardMealComponent {
  @Input() name:string = "";
  @Input() img:string = "";
  @Input() category:string = "";
}

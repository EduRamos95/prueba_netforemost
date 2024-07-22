import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMealComponent } from './card-meal.component';

describe('CardMealComponent', () => {
  let component: CardMealComponent;
  let fixture: ComponentFixture<CardMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMealComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

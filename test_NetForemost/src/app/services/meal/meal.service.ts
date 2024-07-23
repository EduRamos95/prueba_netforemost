import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { SearchMeal, SearchMealResponse } from '../../models/the-meal-db/mealByCategory.models';
import { ApiRoutes_TheMealDB } from '../../utils/config/api/themealdb';
import { Category, CategoryResponse } from '../../models/the-meal-db/mealAllCategory.models';
import { Meal_Details } from '../../models/the-meal-db/mealById.models';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private properties;
  private appUrl: string;

  constructor(private http: HttpClient) {
    this.properties = environment;
    this.appUrl = this.properties.url_TheMealDB;
  }

  public searchByMealId(id:string): Observable<HttpResponse<Meal_Details>> {
    const ctrl: string = ApiRoutes_TheMealDB.searchByID;

    return this.http.get<Meal_Details>(`${this.appUrl}${ctrl}?i=${id}`, {observe: 'response'});
  }

  public searchByMealName(name:string): Observable<HttpResponse<SearchMealResponse>> {
    const ctrl: string = ApiRoutes_TheMealDB.searchByName;
    const encodeName = encodeURIComponent(name);

    return this.http.get<SearchMealResponse>(`${this.appUrl}${ctrl}?s=${encodeName}`, {observe: 'response'});
  }

  public searchByCategoryName(name:string): Observable<HttpResponse<SearchMealResponse>> {
    const ctrl: string = ApiRoutes_TheMealDB.searchByCategory;
    const encodeName = encodeURIComponent(name);

    return this.http.get<SearchMealResponse>(`${this.appUrl}${ctrl}?c=${encodeName}`, {observe: 'response'});
  }

  public AllCategory(): Observable<HttpResponse<CategoryResponse>> {
    const ctrl: string = ApiRoutes_TheMealDB.AllCategory;

    return this.http.get<CategoryResponse>(`${this.appUrl}${ctrl}`, {observe: 'response'});
  }
}

export interface SearchMeal {
  strMeal: string;
  strMealThumb: string;
  strCategory:string;
  idMeal: string;
}

export interface SearchMealResponse {
  meals: SearchMeal[];
}

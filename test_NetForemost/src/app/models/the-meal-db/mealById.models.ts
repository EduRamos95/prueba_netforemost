export interface Meal_Details {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
}

export interface MealDetailsResponse {
  meals: Meal_Details[];
}

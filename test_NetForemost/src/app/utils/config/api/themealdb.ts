export class ApiRoutes_TheMealDB {
  /** Version */
  public static v1: string = '/api/json/v1/1';

  /** routes */
  public static searchByName: string = `${this.v1}/search.php`;
  public static searchByID: string = `${this.v1}/lookup.php`;

  public static AllCategory: string = `${this.v1}/categories.php`;
  public static searchByCategory: string = `${this.v1}/filter.php`;
}

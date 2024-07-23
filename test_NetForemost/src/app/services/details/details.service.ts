import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor() { }

  private dataToSidebar = new BehaviorSubject<any>(null);
  public dataToSidebar$ = this.dataToSidebar.asObservable();

  public setDetails(data: any) {
    this.dataToSidebar.next(data);
  }

}

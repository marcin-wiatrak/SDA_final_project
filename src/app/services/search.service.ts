import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchPhrase: Subject<string> = new Subject();
  searchPhrase$: Observable<string> = this.searchPhrase.asObservable();

  setSearchPhrase(value: string) {
    console.log(value);
    this.searchPhrase.next(value);
  }

  constructor() { }
}

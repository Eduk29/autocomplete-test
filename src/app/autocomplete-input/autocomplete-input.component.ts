import { Component, OnDestroy } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { debounce, takeUntil, tap } from 'rxjs/operators';

import { ItemResponse } from '../model/item-response.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.css'],
})
export class AutocompleteInputComponent implements OnDestroy {
  public searchInput: string;
  public itemList: string[] = [];

  private destroySubject$: Subject<void> = new Subject();
  private searchCriteria: string = '';

  constructor(private apiService: ApiService) {}

  public ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  public searchByCriteria(): void {
    this.apiService
      .searchByCriteria(this.searchInput)
      .pipe(
        debounce(() => interval(500)),
        tap((searchList: ItemResponse[]) => {
          this.resetItemList();
          this.addToItemList(searchList);
        }),
        takeUntil(this.destroySubject$)
      )
      .subscribe();
  }

  private addToItemList(searchList: ItemResponse[]): void {
    searchList.forEach((element) => {
      this.itemList.push(element.name);
      this.searchCriteria = this.searchInput;
    });
  }

  private resetItemList(): void {
    if (this.searchInput !== this.searchCriteria) {
      this.itemList = [];
    }
  }
}

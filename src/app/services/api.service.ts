import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ItemResponse } from '../model/item-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlAPI: string;

  constructor(private httpRequest: HttpClient) {
    this.urlAPI = `${environment.urlAPI}`;
  }

  public searchByCriteria(criteria: string): Observable<ItemResponse[]> {
    const endpoint = `${this.urlAPI}/items?name_like=${criteria}`;
    return this.httpRequest.get<ItemResponse[]>(endpoint);
  }
}

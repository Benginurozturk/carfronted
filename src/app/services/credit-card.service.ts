import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  apiControllerUrl = `${environment.apiUrl}/creditcards/`;

  constructor(private httpClient: HttpClient) {}

  getAllByCustomerId(
    customerId: number
  ): Observable<ListResponseModel<CreditCard>> {
    console.log(this.apiControllerUrl)
    return this.httpClient.get<ListResponseModel<CreditCard>>(
      this.apiControllerUrl+"getallbycustomerid?customerId="+customerId
    );
  }

  saveCard(card: CreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'add',
      card
    );
  }


  delete(creditCard: CreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerUrl}/delete`,
      creditCard
    );
  }
}
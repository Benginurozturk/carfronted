import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { catchError } from 'rxjs/operators';
import { RentalAddDto } from '../models/rentalAddDto';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = `${environment.apiUrl}/rentals`;
  rentalCheckout?: Rental;

  constructor(private httpClient: HttpClient) {}

  addRental(addRentalDto:RentalAddDto): Observable<SingleResponseModel<number>> {
    return this.httpClient.post<SingleResponseModel<number>>(
      `${this.apiUrl}/adddto`, addRentalDto
    );
  }

  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(
      `${this.apiUrl}/getall`
    );
  }

  getById(id:number): Observable<SingleResponseModel<Rental>> {
    return this.httpClient.get<SingleResponseModel<Rental>>(
      `${this.apiUrl}/getbyid?id=`+ id
    );
  }

  isRentable(rental: Rental): Observable<ResponseModel> {
    return this.httpClient
      .post<ResponseModel>(`${this.apiUrl}/isrentable`, { ...rental })
      .pipe(catchError((error) => throwError(error)));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { catchError } from 'rxjs/operators';
import { RentalAddDto } from '../models/RentalAddDto';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = `${environment.apiUrl}/rentals`;
  rentalCheckout?: Rental;

  constructor(private httpClient: HttpClient) {}

  addRental(addRentalDto:RentalAddDto): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiUrl}/adddto`, addRentalDto
    );
  }

  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(
      `${this.apiUrl}/getall`
    );
  }

  isRentable(rental: Rental): Observable<ResponseModel> {
    return this.httpClient
      .post<ResponseModel>(`${this.apiUrl}/isrentable`, { ...rental })
      .pipe(catchError((error) => throwError(error)));
  }
}

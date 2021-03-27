import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CarDateCalculateDto } from '../models/carDateCalculateDto';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = `${environment.apiUrl}/cars`;
  //apiControllerUrl = `${environment.apiUrl}/cars`;

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(`${this.apiUrl}/getall`);
  }

  getCarById(carId: number): Observable<SingleResponseModel<Car>> {
    return this.httpClient.get<SingleResponseModel<Car>>(
      `${this.apiUrl}/getbyid?id=${carId}`
    );
  }

  getCarDetails(): Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(
      `${this.apiUrl}/getcardetails`
    );
  }

  getCarTotalPrice(carDateCalculateDto:CarDateCalculateDto): Observable<SingleResponseModel<number>> {
    return this.httpClient.post<SingleResponseModel<number>>(
      `${this.apiUrl}/calculateprice`, carDateCalculateDto
    );
  }
  getCarDetailsByBrand(
    brandName: string
  ): Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(
      `${this.apiUrl}/getcardetailsbybrandname?name=${brandName}`
    );
  }

  getCarDetailsByColor(
    colorName: string
  ): Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(
      `${this.apiUrl}/getcardetailsbycolorname?name=${colorName}`
    );
  }

  getCarDetailsByBrandNameAndColorName(
    brandName: string,
    colorName: string
  ): Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(
      `${this.apiUrl}/getcardetailsbybrandnameandcolorname?brandName=${brandName}&colorName=${colorName}`
    );
  }
  add(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiUrl}/add`,
      car
    );
  }

  update(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiUrl}/update`,
      car
    );
  }

  delete(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiUrl}/delete`,
      car
    );
  }
}
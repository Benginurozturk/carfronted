import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarImage } from '../models/carImage';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl = `${environment.apiUrl}/carImages`;
  //apiControllerUrl = `${environment.apiUrl}/carImages`;

  constructor(private httpClient: HttpClient) {}

  getImagesByCarId(id: number): Observable<ListResponseModel<CarImage>> {
    
    return this.httpClient.get<ListResponseModel<CarImage>>(
      `${this.apiUrl}/getimagesbycarid?id=`+ id
    );
  }

  getFileById(id: number): Observable<string> {
    return this.httpClient.get<string>(`${this.apiUrl}/getbyid?id=${id}`);
  }

  getCarImageUrl(id: number): string {
    return `${this.apiUrl}/getbyid?id=${id}`;
  }
  add(carId: number, file: File): Observable<ResponseModel> {
    const formData: FormData = new FormData();
    formData.append('CarId', carId.toString());
    formData.append('Image', file);

    return this.httpClient.post<ResponseModel>(
      `${this.apiUrl}/add`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
  }

  delete(carImage: CarImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiUrl}/delete`,
      carImage
    );
  }
}
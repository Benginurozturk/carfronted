import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = `${environment.apiUrl}/colors`;
  //apiControllerUrl = `${environment.apiUrl}/colors`;

  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(
      `${this.apiUrl}/getall`
    );
  }

  getBrandById(brandId: number): Observable<SingleResponseModel<Color>> {
    return this.httpClient.get<SingleResponseModel<Color>>(
      `${this.apiUrl}/getbyid?id=${brandId}`
    );
  }
  getColorById(colorId: number): Observable<SingleResponseModel<Color>> {
    return this.httpClient.get<SingleResponseModel<Color>>(
      `${this.apiUrl}/getbyid?id=${colorId}`
    );
  }
  add(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiUrl}/add`,
      color
    );
  }

  update(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiUrl}/update`,
      color
    );
  }

  delete(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiUrl}/delete`,
      color
    );
  }
}

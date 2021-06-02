import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserDetailDto } from '../models/userDetailDto';
import { UserDetailUpdateModelDto } from '../models/userDetailUpdateModelDto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiControllerUrl = `${environment.apiUrl}/users`;

  constructor(private httpClient: HttpClient) {}

  getUserDetailByEmail(userMail: string): Observable<SingleResponseModel<UserDetailDto>> {
    return this.httpClient.get<SingleResponseModel<UserDetailDto>>(`${this.apiControllerUrl}/getuserdetailbymail?userMail=`+ userMail);
  }

  updateUserDetails(
    userDetailUpdateModel: UserDetailUpdateModelDto
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerUrl}/updateuserdetails`,
      userDetailUpdateModel
    );
  }
}

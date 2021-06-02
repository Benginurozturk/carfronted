import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { UserDetailDto } from '../models/userDetailDto';
import { AppState } from '../store/app.reducer';
import { deleteUserDetail, setUserDetail } from '../store/auth/auth.actions';

import { LocalStorageService } from './localStorageService';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDetail$: Observable<UserDetailDto | undefined> = this.store
    .select((s) => s.appAuth)
    .pipe(map((b) => b.userDetail));

  apiUrl = 'https://localhost:44306/api/auth/';
  
  constructor(private httpClient:HttpClient,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }

    
  }

  register(user: RegisterModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'register',
      user
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    localStorage.removeItem('customerId');
    localStorage.removeItem('userFindex');
  }
  setUserDetail(userDetail: UserDetailDto) {
    this.store.dispatch(setUserDetail({ userDetailDto: userDetail }));
  }

  deleteUserDetail() {
    this.store.dispatch(deleteUserDetail());
  }

}
import { createReducer, on } from '@ngrx/store';
import { setUserDetail, deleteUserDetail } from './auth.actions';
import { UserDetailDto } from '../../models/userDetailDto';

export interface AuthState {
  userDetail?: UserDetailDto;
}

const initialAuthState: AuthState = { 
  userDetail: undefined,
};

export const AuthReducer = createReducer(
  initialAuthState,
  on(setUserDetail, (state: AuthState, { userDetailDto }) => ({
    ...state,
    userDetail: userDetailDto,
  })),
  on(deleteUserDetail, (state: AuthState) => ({
    ...state,
    userDetail: undefined,
  }))
);
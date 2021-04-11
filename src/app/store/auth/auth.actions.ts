import { createAction, props } from '@ngrx/store';
import { UserDetailDto } from '../../models/userDetailDto';

export const setUserDetail = createAction(
  'Set UserDetail',
  props<{ userDetailDto: UserDetailDto }>()
);

export const deleteUserDetail = createAction('Delete User Detail');
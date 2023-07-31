import { request } from '@/utils/request';

import { createAsyncThunkByCallback, createAsyncThunkByRequest } from '@/utils';

type UserType = { password: string; username: string };

export const fetchUserList = createAsyncThunkByRequest({ url: `mysql/users` });

export const fetchTokenTest = createAsyncThunkByRequest({ url: `profile` });

export const fetchLogin = createAsyncThunkByRequest<
  UserType,
  { code: number; access_token: string }
>({
  url: 'login',
  method: 'POST',
});

export const fetchAddUser = createAsyncThunkByRequest<UserType & { role: number }, unknown>({
  url: 'users',
  method: 'POST',
});

export const fetchUserInfo = createAsyncThunkByCallback(
  { url: `https://jsonplaceholder.typicode.com/users` },
  (id, o) => {
    return request({ url: `${o.url}/${id}` });
  }
);

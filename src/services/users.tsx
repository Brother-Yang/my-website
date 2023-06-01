import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from '@/util/request';
import { store } from '@/store';

type UserType = { password: string; username: string };

export const fetchUserList = (() => {
  const call = createAsyncThunk('users/fetchUserList', async () => {
    const res = await request({ url: `users` });
    return res;
  });
  return {
    call: () => store.dispatch(call()).unwrap(),
    type: call.fulfilled.type
  };
})();

export const fetchTokenTest = (() => {
  const call = createAsyncThunk('users/fetchTokenTest', async () => {
    const res = await request({ url: `profile` });
    return res;
  });
  return {
    call: () => store.dispatch(call()).unwrap(),
    type: call.fulfilled.type
  };
})();

export const fetchLogin = (() => {
  const call = createAsyncThunk(
    'users/fetchLogin',
    async (data: UserType): Promise<{ access_token: string; code: number }> => {
      const res = await request<{ access_token: string; code: number }>({
        url: 'login',
        method: 'POST',
        data
      });

      return res;
    }
  );

  return {
    call: (data: UserType) => store.dispatch(call(data)).unwrap(),
    type: call.fulfilled.type
  };
})();

export const fetchAddUser = (() => {
  const call = createAsyncThunk('users/fetchAddUser', async (data: UserType & { role: number }) => {
    const res = await request({
      url: 'users',
      method: 'POST',
      data
    });

    return res;
  });
  return {
    call: (data: UserType & { role: number }) => store.dispatch(call(data)).unwrap(),
    type: call.fulfilled.type
  };
})();

export const fetchUserInfo = (() => {
  const call = createAsyncThunk('users/fetchUserInfo', async (id: number) => {
    const res = await request({ url: `users/${id}` });
    return res;
  });
  return {
    call: (id: number) => store.dispatch(call(id)).unwrap(),
    type: call.fulfilled.type
  };
})();

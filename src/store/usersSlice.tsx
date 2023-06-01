import { createSlice } from '@reduxjs/toolkit';

import { fetchUserInfo } from '@/services/users';

interface Users {
  users: {
    name: string;
    email: string;
  };
}

const initialState: Users = {
  users: {
    name: '',
    email: '',
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserInfo.type]: (state, action) => {
      state.users = action.payload;
    },
  },
});

export default usersSlice.reducer;

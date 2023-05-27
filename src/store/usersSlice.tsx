import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { request } from '@/util/request'

// 异步
export const getUserInfo = createAsyncThunk('users/getUserInfo', async ({}, thunkAPI) => {
  console.log(thunkAPI, 'thunkAPI')
  const res = request({ url: 'users' })
  return res
})

export const fetchAddUser = createAsyncThunk('users/fetchAddUser', async (data: any) => {
  const res = request({ url: 'users', method: 'POST', data })

  return res
})

const initialState: {
  users: { id: number; name: string; password: string }[]
} = {
  users: [],
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserInfo.fulfilled as any]: (state, action) => {
      state.users = action.payload
    },
  },
})

export default usersSlice.reducer

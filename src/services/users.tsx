import { createAsyncThunk } from '@reduxjs/toolkit'

import { request } from '@/util/request'

export const fetchLogin = createAsyncThunk('users/fetchLogin', async (data: any) => {
  const res = await request({
    url: 'login',
    method: 'POST',
    data,
  })
  localStorage.setItem('token', res.access_token)
  return res
})

export const fetchAddUser = createAsyncThunk('users/fetchAddUser', async (data: any) => {
  const res = await request({
    url: 'users',
    method: 'POST',
    data,
  })
  return res
})

export const fetchUsersList = createAsyncThunk('users/fetchUsersList', async () => {
  const res = await request({ url: 'users' })
  return res
})

export const fetchTokenTest = createAsyncThunk('users/fetchTokenTest', async () => {
  const res = await request({ url: 'profile' })
  return res
})

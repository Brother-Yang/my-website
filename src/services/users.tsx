import { createAsyncThunk } from '@reduxjs/toolkit'

import { request } from '@/util/request'

export const fetchUserAdd = createAsyncThunk('users/fetchUserAdd', async (data: any) => {
  const res = request({ url: 'users', method: 'POST', data })
  return res
})

export const fetchUsersList = createAsyncThunk('users/fetchUsersList', () => {
  const res = request({ url: 'users' })
  return res
})

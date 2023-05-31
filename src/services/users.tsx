import { createAsyncThunk } from '@reduxjs/toolkit'

import { request } from '@/util/request'
import { store } from '@/store'

export const fetchUserList = (() => {
  const call = createAsyncThunk('users/fetchUserList', async () => {
    const res = await request({ url: `users` })
    return res
  })
  return {
    call: () => store.dispatch(call()),
    type: call.fulfilled.type,
  }
})()

export const fetchTokenTest = (() => {
  const call = createAsyncThunk('users/fetchTokenTest', async () => {
    const res = await request({ url: `profile` })
    return res
  })
  return {
    call: () => store.dispatch(call()),
    type: call.fulfilled.type,
  }
})()

export const fetchLogin = (() => {
  const call = createAsyncThunk('users/fetchLogin', async (data: any) => {
    const res = await request({
      url: 'login',
      method: 'POST',
      data,
    })

    return res
  })
  return {
    call: (data: any) => store.dispatch(call(data)),
    type: call.fulfilled.type,
  }
})()

export const fetchAddUser = (() => {
  const call = createAsyncThunk('users/fetchAddUser', async (data: any) => {
    const res = await request({
      url: 'users',
      method: 'POST',
      data,
    })

    return res
  })
  return {
    call: (data: any) => store.dispatch(call(data)),
    type: call.fulfilled.type,
  }
})()

export const fetchUserInfo = (() => {
  const call = createAsyncThunk('users/fetchUserInfo', async (id: number) => {
    const res = await request({ url: `users/${id}` })
    return res
  })
  return {
    call: (id: number) => store.dispatch(call(id)),
    type: call.fulfilled.type,
  }
})()

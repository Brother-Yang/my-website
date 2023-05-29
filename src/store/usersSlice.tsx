import { createSlice } from '@reduxjs/toolkit'

import { fetchUsersList } from '@/services/users'

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
    [fetchUsersList.fulfilled as any]: (state, action) => {
      state.users = action.payload
    },
  },
})

export default usersSlice.reducer

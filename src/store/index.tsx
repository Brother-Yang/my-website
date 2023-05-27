import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './usersSlice'

// 自定义中间件
// const myLog = (store) => (next) => (action) => {
//   console.log(store)
//   return next(action)
// }

// 官网的例子
export const store = configureStore({
  reducer: {
    usersState: usersReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myLog),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

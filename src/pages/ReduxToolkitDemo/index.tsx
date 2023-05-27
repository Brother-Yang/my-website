import React from 'react'

import { Button } from 'antd'

import { getUserInfo, fetchAddUser } from '@/store/usersSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const ReduxToolkitDemo = () => {
  const dispatch = useAppDispatch()

  const users = useAppSelector((state) => state.usersState.users)

  const getUserList = () => {
    dispatch(getUserInfo())
  }

  const addUser = () => {
    dispatch(fetchAddUser({ name: `${Math.random()}`.substring(0, 6), password: 123, role: '1' }))
  }

  return (
    <div style={{ padding: 10 }}>
      <div>
        <Button onClick={getUserList} type="primary">
          查询
        </Button>

        <Button onClick={addUser} type="primary">
          新增
        </Button>

        <h1>{users.map((item) => item.name)}</h1>
      </div>
    </div>
  )
}
export default ReduxToolkitDemo

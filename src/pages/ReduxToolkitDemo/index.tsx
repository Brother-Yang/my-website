import React from 'react'

import { Button } from 'antd'

import { fetchUsersList, fetchLogin, fetchTokenTest, fetchAddUser } from '@/services/users'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const ReduxToolkitDemo = () => {
  const dispatch = useAppDispatch()

  const users = useAppSelector((state) => state.usersState.users)

  const onGetUserList = () => {
    dispatch(fetchUsersList())
  }

  const onTokenTest = () => {
    dispatch(fetchTokenTest())
  }

  const onLogin = () => {
    dispatch(fetchLogin({ username: 'Mike', password: '123' }))
  }

  const onAddUser = () => {
    dispatch(fetchAddUser({ username: 'Mike', password: '123', role: 1 }))
  }

  return (
    <div style={{ padding: 10 }}>
      <div>
        <Button onClick={onGetUserList} type="primary">
          查询
        </Button>

        <Button onClick={onAddUser} type="primary">
          新增
        </Button>

        <Button onClick={onLogin} type="primary">
          登陆
        </Button>

        <Button onClick={onTokenTest} type="primary">
          测试
        </Button>

        <h1>{users.map((item) => item.name)}</h1>
      </div>
    </div>
  )
}
export default ReduxToolkitDemo

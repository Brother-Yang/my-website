import React from 'react'

import { Button } from 'antd'

import {
  fetchLogin,
  fetchTokenTest,
  fetchAddUser,
  fetchUserInfo,
  fetchUserList,
} from '@/services/users'
import { useAppSelector } from '@/store/hooks'

const ReduxToolkitDemo = () => {
  const users = useAppSelector((state) => state.usersState.users)

  const onGetUserList = async () => {
    // 1~9
    const id = Math.floor(Math.random() * 9) + 1
    const res = await fetchUserInfo.call(id)
    console.log(res, 'res')
  }

  const onGetUsersList = async () => {
    fetchUserList.call()
  }

  const onTokenTest = () => {
    fetchTokenTest.call()
  }

  const onLogin = () => {
    fetchLogin.call({ username: 'Mike', password: '123' }).then((res: any) => {
      localStorage.setItem('token', res.payload.access_token)
    })
  }

  const onAddUser = () => {
    fetchAddUser.call({ username: 'Mike', password: '123', role: 1 })
  }

  return (
    <div style={{ padding: 10 }}>
      <div>
        <Button onClick={onGetUsersList} type="primary">
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

        <h1>
          {users.email} ------- {users.name}
        </h1>
      </div>
    </div>
  )
}
export default ReduxToolkitDemo

import React from 'react';

import { Button } from 'antd';

import {
  fetchLogin,
  fetchTokenTest,
  fetchAddUser,
  fetchUserList,
  fetchUserInfo,
} from '@/services/users';
import { useAppSelector } from '@/store/hooks';

import styles from './index.less';

const ReduxToolkitDemo = () => {
  const users = useAppSelector((state) => state.usersState.users);

  const onGetUsersList = async () => {
    fetchUserList.call();
  };

  const onTokenTest = () => {
    fetchTokenTest.call();
  };

  const onLogin = () => {
    fetchLogin.call({ username: 'Mike', password: '123' }).then((res) => {
      console.log(res, 'res');
      localStorage.setItem('token', res.access_token);
    });
  };

  const onAddUser = () => {
    fetchAddUser.call({ username: 'Mike', password: '123', role: 1 });
  };

  const onUserInfo = () => {
    fetchUserInfo.call(1);
  };

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

        <Button onClick={onUserInfo} type="primary">
          详情
        </Button>

        <h1 className={styles.TextColor}>
          {users.email} ------- {users.name}
        </h1>
      </div>
    </div>
  );
};
export default ReduxToolkitDemo;

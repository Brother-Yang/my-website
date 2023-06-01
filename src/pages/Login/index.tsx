import React from 'react';

import { Button, Input } from 'antd';

import styles from './index.less';

const Login = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.LoginWrapper}>
        <div className={styles.Header}>Login</div>
        <div className={styles.FormWrapper}>
          <Input placeholder="username" size="large" className={styles.InputItem} />
          <Input.Password placeholder="password" className={styles.InputItem} size="large" />
          <Button className={styles.Btn} size="large">
            sign in
          </Button>
          <Button className={styles.Btn} size="large">
            sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;

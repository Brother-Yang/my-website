import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input, Form } from 'antd';
import _ from 'lodash';

import styles from './index.less';

const Login = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const user = {
    username: 'admin',
    password: '123',
  };

  const onFinish = (values: typeof user) => {
    if (_.isEqual(values, user)) {
      navigate('/reduxToolkitDemo');
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.LoginWrapper}>
        <div className={styles.Header}>Login</div>
        <div className={styles.FormWrapper}>
          <Form form={form} onFinish={onFinish} initialValues={user}>
            <Form.Item name={'username'}>
              <Input placeholder="username" size="large" className={styles.InputItem} />
            </Form.Item>

            <Form.Item name={'password'}>
              <Input.Password placeholder="password" className={styles.InputItem} size="large" />
            </Form.Item>

            <Form.Item>
              <Button className={styles.Btn} size="large" htmlType="submit">
                sign in
              </Button>
            </Form.Item>

            <Button className={styles.Btn} size="large">
              sign up
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

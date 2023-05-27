import React from 'react'

import { Input } from 'antd'

import SystemFormItemGridLayout, { Label, Value } from '@/components/SystemFormItemGridLayout'

import styles from './index.less'

const Login = () => {
  return (
    <div className={styles.Wraps}>
      <div className={styles.LoginBox}>
        <SystemFormItemGridLayout
          data={{
            width: '100%',
            columnCount: 1,
            colgroup: ['120px', '1fr'],
            children: [
              {
                key: 'account',
                label: <Label>账号</Label>,
                value: (
                  <Value>
                    <Input />
                  </Value>
                ),
              },
              {
                key: 'password',
                label: <Label>密码</Label>,
                value: (
                  <Value>
                    <Input />
                  </Value>
                ),
              },
            ],
          }}
        />
      </div>
    </div>
  )
}

export default Login

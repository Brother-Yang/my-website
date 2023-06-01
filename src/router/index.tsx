import React from 'react';

import { Navigate } from 'react-router-dom';

import Error from '@/pages/Error';
import ReduxToolkitDemo from '@/pages/ReduxToolkitDemo';
import Login from '@/pages/Login';

const routes = [
  {
    path: '/',
    index: true,
    element: <Navigate to="login" />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/reduxToolkitDemo',
    element: <ReduxToolkitDemo />
  },
  {
    path: '*',
    element: <Error />
  }
];

export default routes;

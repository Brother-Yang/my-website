import React, { Suspense, LazyExoticComponent, lazy } from 'react';

import { Navigate } from 'react-router-dom';

function lazyLoad(Component: LazyExoticComponent<any>): React.ReactNode {
  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );
}

const routes = [
  {
    path: '/',
    index: true,
    element: <Navigate to="login" />,
  },
  {
    path: '/login',
    element: lazyLoad(lazy(() => import('@/pages/Login'))),
  },
  {
    path: '/reduxToolkitDemo',
    element: lazyLoad(lazy(() => import('@/pages/ReduxToolkitDemo'))),
  },
  {
    path: '*',
    element: lazyLoad(lazy(() => import('@/pages/Error'))),
  },
];

export default routes;

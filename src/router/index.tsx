import React from 'react'

import { Navigate } from 'react-router-dom'

import Error from '@/pages/Error'
import ReduxToolkitDemo from '@/pages/ReduxToolkitDemo'

const routes = [
  {
    path: '/',
    index: true,
    element: <Navigate to="reduxToolkitDemo" />,
  },
  {
    path: '/reduxToolkitDemo',
    element: <ReduxToolkitDemo />,
  },
  {
    path: '*',
    element: <Error />,
  },
]

export default routes

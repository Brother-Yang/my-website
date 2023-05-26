import React from 'react'

import { Navigate } from 'react-router-dom'

import Error from '@/pages/Error'

const routes = [
  {
    path: '/',
    index: true,
    element: <Navigate to="rdeuxToolkitDemo" />,
  },
  {
    path: '*',
    element: <Error />,
  },
]

export default routes

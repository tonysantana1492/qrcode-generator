import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { RootLayout } from './layouts/RootLayout'
import { homeLoader } from './pages/Home'
import { RootBoundary } from './pages/RootBoundary'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootBoundary />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { QRCode } = await import('./pages/QRCode')
          return { Component: QRCode }
        },
      },
      {
        path: '/generate',
        lazy: async () => {
          const { Home } = await import('./pages/Home')
          return { Component: Home }
        },
        loader: homeLoader,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
}

export default App

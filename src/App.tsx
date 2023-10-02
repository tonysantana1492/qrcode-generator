import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { RootLayout } from './layouts/RootLayout'
import { qrCodeLoader } from './pages/QRCode'
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
          const { Home } = await import('./pages/Home')
          return { Component: Home }
        },
      },
      {
        path: '/generate',
        lazy: async () => {
          const { QRCode } = await import('./pages/QRCode')
          return { Component: QRCode }
        },
        loader: qrCodeLoader,
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

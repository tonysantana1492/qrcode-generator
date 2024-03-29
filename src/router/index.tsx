import { Navigate, createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '../layouts/RootLayout'
import { qrCodeLoader } from '../pages/QRCode'
import { RootBoundary } from '../components/RootBoundary'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootBoundary />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { Home } = await import('../pages/Home')
          return { Component: Home }
        },
      },
      {
        path: '/generate',
        lazy: async () => {
          const { QRCodePage } = await import('../pages/QRCode')
          return { Component: QRCodePage }
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

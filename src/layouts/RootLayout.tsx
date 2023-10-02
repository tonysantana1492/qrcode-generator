import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <main className="main-container flex h-screen flex-col items-center justify-start p-2">
      <Outlet />
    </main>
  )
}

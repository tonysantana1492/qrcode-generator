import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <main className="main-container flex h-full flex-col items-center justify-start p-2">
      <Outlet />
    </main>
  )
}

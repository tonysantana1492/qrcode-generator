import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'

export const RootBoundary = () => {
  const error = useRouteError()
  let message

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      message = "This page doesn't exist!"
    }
  }

  return (
    <section className="flex h-screen flex-col items-center justify-center gap-16 text-center text-white">
      <h1 className="text-2xl font-medium">{message ?? 'Something went wrong'}</h1>
      <Link to="/" className="button">
        Go Home
      </Link>
    </section>
  )
}

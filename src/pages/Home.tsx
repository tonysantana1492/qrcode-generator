import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { validateURL } from '../lib/utils'
import { Logo } from '../components/Icons'

export const Home = () => {
  const navigate = useNavigate()

  const handleSubmitForm = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const formElement = event.target as HTMLFormElement
      const formData = new FormData(formElement)

      const url = formData.get('url') as string

      const isValidURL = validateURL(url)

      if (!isValidURL) {
        toast.error('You must enter a valid url')
        return
      }

      navigate({ pathname: '/generate', search: `?url=${encodeURIComponent(url)}` })
    },
    [navigate],
  )

  return (
    <section className="mt-52 flex h-full w-full max-w-2xl flex-col items-center justify-start gap-8">
      <Logo className="h-12" />
      <form
        className="flex w-full max-w-2xl items-center justify-between rounded-xl border-2 border-principal bg-slate-950 p-1"
        onSubmit={handleSubmitForm}
      >
        <input
          name="url"
          className="h-[30px] w-[inherit] flex-grow bg-transparent px-8 text-light outline-none placeholder:text-alternative"
          placeholder="Enter an url"
          autoFocus
          autoComplete="do-not-autofill"
        />
        <button
          type="submit"
          className="button flex items-center justify-center gap-8 whitespace-nowrap max-sm:px-4"
        >
          QR code
        </button>
      </form>
    </section>
  )
}

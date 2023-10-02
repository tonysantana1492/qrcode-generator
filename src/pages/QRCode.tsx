import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { canParseURL } from '../lib/utils'
import { Download, Logo } from '../components/Icons'

export const QRCode = () => {
  const navigate = useNavigate()

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formElement = event.target as HTMLFormElement
    const formData = new FormData(formElement)

    const url = formData.get('url') as string

    const isValidURL = canParseURL(url)

    if (!isValidURL) return toast.error('You must enter a valid url')

    navigate(`/generate?url=${url}`)
  }

  return (
    <section className="mt-52 flex h-full w-full max-w-2xl flex-col items-center justify-start gap-8">
      <Logo className="h-12" />
      <form
        className="flex w-full max-w-2xl items-center justify-between rounded-2xl border-2 border-principal bg-slate-950 p-1"
        onSubmit={handleSubmitForm}
      >
        <input
          name="url"
          className="h-[30px] flex-grow bg-transparent px-8 text-light outline-none placeholder:text-alternative"
          placeholder="Enter an url"
          autoFocus
        />
        <button type="submit" className="button flex items-center justify-center gap-8">
          QR code
          <Download />
        </button>
      </form>
    </section>
  )
}

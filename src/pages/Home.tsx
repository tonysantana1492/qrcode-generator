import { Link, LoaderFunctionArgs, redirect, useLoaderData } from 'react-router-dom'
import { toast } from 'sonner'
import QRCode from 'qrcode'

import { canParseURL } from '../lib/utils'
import { Logo } from '../components/Icons'

export const homeLoader = async ({ request }: LoaderFunctionArgs<string>) => {
  const href = request.url

  const parseUrl = new URL(href)
  const url = parseUrl.searchParams.get('url')

  const isvalidURL = canParseURL(url)

  if (!isvalidURL) return redirect('/')

  const qrCode = await QRCode.toDataURL(url!)
  return qrCode
}

export const Home = () => {
  const qr = useLoaderData()

  const handleShare = () => {
    window.navigator.clipboard.writeText(window.location.href)
    toast.success('URL copied to clipboard!')
  }

  const handleDownloadQrCode = () => {
    const linkElement = document.createElement('a')
    linkElement.download = 'qr-code.png'
    linkElement.href = qr as string
    linkElement.click()
  }

  return (
    <>
      <header className="w-full">
        <Link to="/">
          <Logo className="m-6 h-8" />
        </Link>
      </header>
      <section className="mt-24 flex w-full max-w-xs flex-col items-center justify-start gap-8">
        <div className="relative flex items-center justify-center rounded-full bg-sky-950 p-6">
          <img
            className="rounded-2xl bg-light p-2"
            height="auto"
            width={200}
            src={qr as string}
            alt="qr-code"
          ></img>
        </div>
        <div className="mt-6 flex w-full items-center justify-between">
          <button className="button" onClick={handleDownloadQrCode}>
            Download
          </button>
          <button className="button" onClick={handleShare}>
            Share
          </button>
        </div>
      </section>
    </>
  )
}
import { Link, LoaderFunctionArgs, redirect, useLoaderData } from 'react-router-dom'
import QRCode from 'react-qr-code'

import { canParseURL } from '../lib/utils'
import { Download, Logo, Share } from '../components/Icons'

export const qrCodeLoader = async ({ request }: LoaderFunctionArgs<string>) => {
  const href = request.url

  const parseUrl = new URL(href)
  const url = parseUrl.searchParams.get('url')

  const isvalidURL = canParseURL(url)

  if (!isvalidURL) return redirect('/')

  return url
}

export const QRCodePage = () => {
  const url = useLoaderData()

  const handleShare = async () => {
    const svg = document.getElementById('QRCode')

    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const dataURL = `data:image/svg+xml;base64,${btoa(svgData)}`
    const blob = await (await fetch(dataURL)).blob()
    const file = new File([blob], 'qr-code.png', { type: blob.type })
    window.navigator.share({ files: [file] })
    // window.navigator.share({ url: window.location.href })
  }

  const handleDownloadQrCode = () => {
    const svg = document.getElementById('QRCode')

    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx!.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.download = 'QRCode'
      downloadLink.href = `${pngFile}`
      downloadLink.click()
    }

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
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
          {/* <img
            className="rounded-2xl bg-light p-2"
            height="auto"
            width={200}
            src={qr as string}
            alt="qr-code"
          ></img> */}
          <QRCode
            id="QRCode"
            className="rounded-2xl bg-white p-4"
            size={500}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={url as string}
            viewBox={`0 0 500 500`}
          />
        </div>
        <div className="mt-6 flex w-full items-center justify-between gap-2">
          <button
            className="button flex items-center justify-between gap-2"
            onClick={handleDownloadQrCode}
          >
            Download
            <Download />
          </button>
          <button className="button flex items-center justify-between gap-2" onClick={handleShare}>
            Share
            <Share />
          </button>
        </div>
      </section>
    </>
  )
}

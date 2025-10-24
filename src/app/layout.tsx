import '@/styles/main.css'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'PAW BUDDY',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko-KR">
      <body className="overflow-hidden">
        <Providers>
          <main>{children}</main>
          <Toaster position="top-center" richColors />
          <section id="modal-dialog-portal"></section>
        </Providers>
      </body>
    </html>
  )
}

import { Sidebar } from '@/components'
import '@/styles/main.css'
import { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'PAW BUDDY',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko-KR">
      <body>
        <Providers>
          <Sidebar></Sidebar>
          <main>{children}</main>
        </Providers>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}

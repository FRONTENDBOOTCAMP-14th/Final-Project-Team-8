import '@/styles/main.css'
import { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'PAW BUDDY',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko-KR">
      <body>
        <main>{children}</main>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}

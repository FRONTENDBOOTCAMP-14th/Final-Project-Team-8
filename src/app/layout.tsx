import '@/styles/main.css'
import { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'Next.js 프로젝트 템플릿',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko-KR">
      <body>
        <Providers>
          <main>{children}</main>
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  )
}

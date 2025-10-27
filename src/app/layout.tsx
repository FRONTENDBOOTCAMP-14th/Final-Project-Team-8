import '@/styles/main.css'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import ToasterPortal from '../components/ui/ToasterPortal/ToasterPortal'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'PAW BUDDY',
  description: '반려동물의 프로필을 만들고 통합 관리 사이트를 이용해보세요.',
  openGraph: {
    title: 'PAW BUDDY',
    description: '반려동물 종합 관리 사이트',
    url: 'https://pawbuddy.example.com',
    siteName: 'PAW BUDDY',
    type: 'website',
    // 추후변경
    images: ['/assets/logo/Logo-Paw-Buddy-col.svg'],
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko-KR">
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
      </head>
      <body className="overflow-hidden">
        <Providers>
          <main>{children}</main>
          <div id="modal-dialog-portal"></div>
          <ToasterPortal />
        </Providers>
      </body>
    </html>
  )
}

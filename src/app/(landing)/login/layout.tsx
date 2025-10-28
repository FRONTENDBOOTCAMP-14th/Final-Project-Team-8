import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: '로그인 - PAW BUDDY',
}

export default function LoginLayout({ children }: PropsWithChildren) {
  return <>{children}</>
}

import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: '계정 만들기 - PAW BUDDY',
}

export default function SignUpLayout({ children }: PropsWithChildren) {
  return <>{children}</>
}

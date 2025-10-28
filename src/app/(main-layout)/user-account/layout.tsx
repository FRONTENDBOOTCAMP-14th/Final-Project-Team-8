import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: '계정 - PAW BUDDY',
}

export default function UserAccountLayout({ children }: PropsWithChildren) {
  return <>{children}</>
}

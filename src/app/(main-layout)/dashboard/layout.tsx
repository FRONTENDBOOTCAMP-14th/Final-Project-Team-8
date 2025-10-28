import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: '대시보드 - PAW BUDDY',
}

export default function MainLayout({ children }: PropsWithChildren) {
  return <>{children}</>
}

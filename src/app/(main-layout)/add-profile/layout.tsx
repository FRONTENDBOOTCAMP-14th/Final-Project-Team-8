import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: '반려동물 추가 - PAW BUDDY',
}

export default function AddProfileLayout({ children }: PropsWithChildren) {
  return <>{children}</>
}

import '@/styles/main.css'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { Sidebar } from '@/components'

export const metadata: Metadata = {
  title: 'PAW BUDDY',
}

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-lvh w-full flex-row overflow-hidden bg-[#2D2A40] p-2.5">
      <Sidebar />
      <section className="relative flex min-w-300 grow rounded-xl bg-white p-[30px]">
        {children}
      </section>
    </div>
  )
}

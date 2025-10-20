import '@/styles/main.css'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { Sidebar } from '@/components'

export const metadata: Metadata = {
  title: 'PAW BUDDY',
}

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <section className="flex h-lvh w-full flex-row overflow-hidden bg-[#2D2A40] p-2.5">
      <Sidebar />
      <main className="relative flex grow rounded-xl bg-white p-10">
        {children}
      </main>
    </section>
  )
}

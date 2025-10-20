import '@/styles/main.css'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { Sidebar } from '@/components'

export const metadata: Metadata = {
  title: '대시보드 - PAW BUDDY',
}

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen bg-[#2D2A40] p-[10px]">
      <Sidebar></Sidebar>
      <main className="flex h-full w-full rounded-2xl bg-[white] p-10">
        {children}
      </main>
    </div>
  )
}

import { Button, CalendarSchedule, Sidebar } from '@/components'
import { Funnel } from 'lucide-react'
import { Suspense } from 'react'

export default function CalendarPage() {
  return (
    <section className="flex h-lvh w-full flex-row overflow-hidden bg-[#2D2A40] p-2.5">
      <Sidebar />
      <section className="relative grow rounded-l-xl bg-white p-7.5">
        <h2 className="text-[28px] font-bold text-[#3A394F]">캘린더</h2>
        <p className="mt-2 mb-7.5 font-medium text-[#80809A]">
          내 모든 활동 기록 보기
        </p>
        <Suspense
          fallback={
            <div className="mt-2 mb-7.5 text-lg font-semibold text-[#80809A]">
              캘린더 로딩...
            </div>
          }
        >
          <Button
            variant="white"
            className="absolute top-7.5 right-7.5 max-w-40 font-medium text-[#80809A] outline-[#80809A]"
          >
            <Funnel className="mr-2.5 aspect-square w-5" />
            필터
          </Button>
          <CalendarSchedule />
        </Suspense>
      </section>
      <section className="w-90 rounded-r-xl bg-[#F7F7FC] p-7.5">
        <h3 className="text-lg font-semibold text-[#3A394F]">다가오는 일정</h3>
      </section>
    </section>
  )
}

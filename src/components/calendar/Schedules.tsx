'use client'

import { ScheduleEvent } from '@/libs/api/schedules'
import { useScheduleStore } from '@/store/scheduleStore'
import { Plus } from 'lucide-react'
import { useMemo } from 'react'
import ScheduleListItem from './ScheduleListItem'

interface Props {
  currentYear: number
  currentMonth: number
  onAddSchedule?: () => void
  onScheduleClick?: (schedule: ScheduleEvent) => void
}

export default function ScheduleList({
  currentYear,
  currentMonth,
  onAddSchedule,
  onScheduleClick,
}: Props) {
  const { schedules, activeFilters, currentPetId } = useScheduleStore()

  // 현재 월 일정만 필터링
  const monthSchedules = useMemo(() => {
    // 필터링된 스케줄
    const filteredSchedules = schedules.filter(schedule =>
      activeFilters.includes(schedule.category)
    )

    // 현재 월의 스케줄만 선택
    return filteredSchedules
      .filter(schedule => {
        const scheduleDate = new Date(schedule.date)
        const scheduleYear = scheduleDate.getFullYear()
        const scheduleMonth = scheduleDate.getMonth() + 1

        // 반복 일정 처리
        if (schedule.isRecurring) {
          const [, month] = schedule.date.split('-').map(Number)
          return month === currentMonth
        }

        // 일반 일정
        return scheduleYear === currentYear && scheduleMonth === currentMonth
      })
      .sort((a, b) => {
        // 날짜순 정렬
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
  }, [schedules, activeFilters, currentYear, currentMonth, currentPetId])

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-semibold text-[#3A394F]">
        {currentYear}년 {currentMonth}월 일정
      </h3>

      {monthSchedules.length === 0 ? (
        <div className="flex items-center justify-center rounded-2xl border-dashed border-[#DAD9E6] bg-[#F7F7FC] py-3">
          <p className="text-sm text-[#A3A0C0]">이번 달 일정이 없습니다.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-5 overflow-y-auto pr-2">
          {monthSchedules.map(schedule => (
            <ScheduleListItem
              key={schedule.id}
              schedule={schedule}
              onClick={() => onScheduleClick?.(schedule)}
            />
          ))}
        </ul>
      )}

      {/* 일정 추가 버튼 */}
      <button
        type="button"
        onClick={onAddSchedule}
        className="flex w-full justify-center rounded-2xl border border-[#DAD9E6] bg-white p-4 transition-colors hover:bg-[#ECECF2] focus:outline-2 focus:outline-[#FF6000]"
        aria-label="일정 추가"
      >
        <Plus className="h-6 w-6 text-[#80809A]" />
      </button>
    </div>
  )
}

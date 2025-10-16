'use client'

import { ScheduleEvent } from '@/libs/api/schedules'
import { useCalendarStore } from '@/store/calendarStore'
import { useScheduleStore } from '@/store/scheduleStore'
import { Plus } from 'lucide-react'
import { useMemo } from 'react'
import ScheduleListItem from './ScheduleListItem'

interface Props {
  onAddSchedule?: () => void
  onScheduleClick?: (schedule: ScheduleEvent) => void
}

export default function ScheduleList({
  onAddSchedule,
  onScheduleClick,
}: Props) {
  const { schedules, activeFilters } = useScheduleStore()
  const { selectedDate } = useCalendarStore()

  // 선택된 날짜의 일정만 필터링
  const daySchedules = useMemo(() => {
    if (!selectedDate) return []

    // 필터링된 스케줄
    const filteredSchedules = schedules.filter(schedule =>
      activeFilters.includes(schedule.category)
    )

    const selectedYear = selectedDate.getFullYear()
    const selectedMonth = selectedDate.getMonth() + 1
    const selectedDay = selectedDate.getDate()

    const selectedMonthStr = String(selectedMonth).padStart(2, '0')
    const selectedDayStr = String(selectedDay).padStart(2, '0')

    // 선택된 날짜의 스케줄만 선택
    return filteredSchedules
      .filter(schedule => {
        const scheduleDate = new Date(schedule.date)
        const scheduleYear = scheduleDate.getFullYear()
        const scheduleMonth = scheduleDate.getMonth() + 1
        const scheduleDay = scheduleDate.getDate()

        // 정확한 날짜 매칭
        if (
          scheduleYear === selectedYear &&
          scheduleMonth === selectedMonth &&
          scheduleDay === selectedDay
        ) {
          return true
        }

        // 반복 일정 처리(월-일만 비교)
        if (schedule.isRecurring) {
          const [, scheduleMonthStr, scheduleDayStr] = schedule.date.split('-')

          if (
            scheduleMonthStr === selectedMonthStr &&
            scheduleDayStr === selectedDayStr
          ) {
            const originalYear = parseInt(schedule.date.slice(0, 4))
            if (selectedYear >= originalYear) {
              return true
            }
          }
        }

        return false
      })
      .sort((a, b) => {
        // 날짜순 정렬
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
  }, [schedules, activeFilters, selectedDate])

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
    : '날짜 미선택'

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-semibold text-[#3A394F]">
        {formattedDate}의 일정
      </h3>

      {daySchedules.length === 0 ? (
        <div className="flex items-center justify-center rounded-2xl border-dashed border-[#DAD9E6] bg-[#F7F7FC] py-3">
          <p className="text-sm text-[#A3A0C0]">일정이 없습니다.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-5 overflow-y-auto pr-2">
          {daySchedules.map(schedule => (
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

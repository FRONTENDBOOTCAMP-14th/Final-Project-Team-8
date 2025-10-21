'use client'

import { Plus } from 'lucide-react'
import { useCalendarStore } from '@/store/calendarStore'
import { useScheduleStore } from '@/store/scheduleStore'
import { DAYS_OF_WEEK } from './CalendarBase'
import { useScheduleFilter } from './hooks/useScheduleFilter'
import ScheduleListItem from './ScheduleListItem'
import type { ScheduleCategory, ScheduleEvent } from './types'

interface Props {
  onAddSchedule?: () => void
  onScheduleClick?: (schedule: ScheduleEvent) => void
}

export default function Schedules({ onAddSchedule, onScheduleClick }: Props) {
  const { schedules, activeFilters } = useScheduleStore()
  const { selectedDate } = useCalendarStore()

  // 필터링된 스케줄(카테고리 + 날짜)
  const daySchedules = useScheduleFilter(schedules, activeFilters, selectedDate)

  const formattedDate = selectedDate
    ? `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 ${DAYS_OF_WEEK[selectedDate.getDay()]}요일 일정`
    : '날짜 미선택'

  const isClickable = (category: ScheduleCategory) => {
    return category !== 'birthday' && category !== 'adoption'
  }

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-semibold text-[#3A394F]">{formattedDate}</h3>

      {daySchedules.length === 0 ? (
        <div className="flex items-center justify-center rounded-2xl border-dashed border-[#DAD9E6] bg-[#F7F7FC] py-3">
          <p className="text-sm text-[#A3A0C0]">일정이 없습니다.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-5 pr-2">
          {daySchedules.map(schedule => (
            <li
              key={schedule.id}
              title={
                !isClickable ? '생일과 입양일은 수정할 수 없습니다' : undefined
              }
            >
              <ScheduleListItem
                schedule={schedule}
                isClickable={isClickable(schedule.category)}
                onClick={() => {
                  if (isClickable(schedule.category)) {
                    onScheduleClick?.(schedule)
                  }
                }}
              />
            </li>
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

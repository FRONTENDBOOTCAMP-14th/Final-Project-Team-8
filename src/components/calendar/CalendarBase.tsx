'use client'

import type { CalendarControls } from './hooks/useCalendar'
import SelectDate from './SelectDate'
import type { ScheduleEvent } from './types'
import Week, { type DayComponentProps } from './Week' // ✅ DayComponentProps import

// ✅ 기존 DayComponentProps 삭제 (8-15번 줄)

interface Props extends CalendarControls {
  DayComponent: React.ComponentType<DayComponentProps> // ✅ 타입 추가
  getSchedulesForDate?:
    | ((year: number, month: number, day: number) => ScheduleEvent[])
    | undefined
}

export const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토']

export default function CalendarBase({
  currentYear,
  currentMonth,
  setCurrentYear,
  setCurrentMonth,
  calendar,
  selectedDate,
  handleDayClick,
  selectedDateRef,
  setDayButtonRef,
  focusDay,
  DayComponent,
  getSchedulesForDate,
}: Props) {
  return (
    <section>
      <SelectDate
        currentYear={currentYear}
        currentMonth={currentMonth}
        setCurrentYear={setCurrentYear}
        setCurrentMonth={setCurrentMonth}
      />
      <table className="mx-auto -mb-4 w-full table-fixed border-separate border-spacing-4 text-center">
        <thead className="text-sm font-bold text-[#80809A]">
          <tr>
            {DAYS_OF_WEEK.map((day, index) => (
              <td key={index} aria-label={`${day}요일`}>
                {day}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="text-[#636073]">
          {calendar.map((week, index) => {
            const weekProps = {
              week,
              weekIndex: index,
              DayComponent,
              currentYear,
              currentMonth,
              selectedDate,
              onDayClick: handleDayClick,
              selectedDateRef,
              setDayButtonRef,
              focusDay,
              ...(getSchedulesForDate && { getSchedulesForDate }),
            }
            return <Week key={index} {...weekProps} />
          })}
        </tbody>
      </table>
    </section>
  )
}

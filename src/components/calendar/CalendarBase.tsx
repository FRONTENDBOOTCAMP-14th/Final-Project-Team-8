'use client'

import type { CalendarControls, CalendarDay } from './hooks/useCalendar'
import SelectDate from './SelectDate'
import type { ScheduleEvent } from './types'
import Week from './Week'

export type DayComponentProps = CalendarControls & {
  week: CalendarDay[]
  weekIndex: number
  onDayClick: (date: number) => void
  getSchedulesForDate?:
    | ((year: number, month: number, day: number) => ScheduleEvent[])
    | undefined
}

interface Props extends CalendarControls {
  DayComponent: React.ComponentType<any>
  getSchedulesForDate?:
    | ((year: number, month: number, day: number) => ScheduleEvent[])
    | undefined
}

const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토']

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
      <hr className="mt-7.5 mb-3.5 border-[#DAD9E6]" />
      <table className="w-full border-separate border-spacing-4 text-center">
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
          {calendar.map((week, index) => (
            <Week
              key={index}
              week={week}
              weekIndex={index}
              DayComponent={DayComponent}
              currentYear={currentYear}
              currentMonth={currentMonth}
              selectedDate={selectedDate}
              onDayClick={handleDayClick}
              selectedDateRef={selectedDateRef}
              setDayButtonRef={setDayButtonRef}
              focusDay={focusDay}
              getSchedulesForDate={getSchedulesForDate}
            />
          ))}
        </tbody>
      </table>
    </section>
  )
}

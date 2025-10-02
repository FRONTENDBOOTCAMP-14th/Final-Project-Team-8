import { type RefObject } from 'react'
import { type CalendarDay } from './CalendarComponent'
import Day from './Day'

interface Props {
  week: CalendarDay[]
  currentYear: number
  currentMonth: number
  selectedDate: Date | null
  onDayClick: (date: number) => void
  selectedDateRef: RefObject<HTMLButtonElement | null>
}

export default function Week({
  week,
  currentYear,
  currentMonth,
  selectedDate,
  onDayClick,
  selectedDateRef,
}: Props) {
  return (
    <tr>
      {week.map((dayData, index) => (
        <Day
          key={index}
          dayData={dayData}
          currentYear={currentYear}
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDayClick={onDayClick}
          selectedDateRef={selectedDateRef}
          aria-label={`${dayData.date}일`}
        />
      ))}
    </tr>
  )
}

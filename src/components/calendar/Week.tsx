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
  weekIndex: number
  setDayButtonRef: (key: string, node: HTMLButtonElement | null) => void
  focusDay: (row: number, col: number) => void
}

export default function Week({
  week,
  currentYear,
  currentMonth,
  selectedDate,
  onDayClick,
  selectedDateRef,
  weekIndex,
  setDayButtonRef,
  focusDay,
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
          rowIndex={weekIndex}
          colIndex={index}
          setDayButtonRef={setDayButtonRef}
          focusDay={focusDay}
          aria-label={`${dayData.date}일`}
        />
      ))}
    </tr>
  )
}

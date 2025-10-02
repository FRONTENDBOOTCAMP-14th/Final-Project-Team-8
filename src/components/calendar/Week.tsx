import { type CalendarDay } from './CalendarComponent'
import Day from './Day'

interface Props {
  week: CalendarDay[]
  currentYear: number
  currentMonth: number
  selectedDate: Date | null
  onDayClick: (date: number) => void
}

export default function Week({
  week,
  currentYear,
  currentMonth,
  selectedDate,
  onDayClick,
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
          aria-label={`${dayData.date}일`}
        />
      ))}
    </tr>
  )
}

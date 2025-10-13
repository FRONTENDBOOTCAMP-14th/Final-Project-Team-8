import type { ScheduleEvent } from '@/libs/api/schedules'
import type { CalendarDay, DayProps } from './useCalendar'

interface Props extends DayProps {
  week: CalendarDay[]
  weekIndex: number
  DayComponent: React.ComponentType<any>
  getSchedulesForDate?:
    | ((year: number, month: number, day: number) => ScheduleEvent[])
    | undefined
}

export default function Week({
  week,
  weekIndex,
  DayComponent,
  getSchedulesForDate,
  ...allProps
}: Props) {
  const {
    currentYear,
    currentMonth,
    selectedDate,
    onDayClick,
    selectedDateRef,
    setDayButtonRef,
    focusDay,
  } = allProps

  return (
    <tr>
      {week.map((dayData, index) => (
        <DayComponent
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
          getSchedulesForDate={getSchedulesForDate}
        />
      ))}
    </tr>
  )
}

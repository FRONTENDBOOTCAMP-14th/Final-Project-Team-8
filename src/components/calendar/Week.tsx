import type { CalendarDay, DayProps } from './useCalendar'

interface Props extends DayProps {
  week: CalendarDay[]
  weekIndex: number
  DayComponent: React.ComponentType<any>
}

export default function Week({
  week,
  weekIndex,
  DayComponent,
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
          aria-label={`${dayData.date}일`}
        />
      ))}
    </tr>
  )
}

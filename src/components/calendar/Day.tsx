import { useMemo, type RefObject } from 'react'
import { type CalendarDay } from './CalendarComponent'

interface Props {
  dayData: CalendarDay
  currentYear: number
  currentMonth: number
  selectedDate: Date | null
  onDayClick: (date: number) => void
  selectedDateRef: RefObject<HTMLButtonElement | null>
  restProps?: boolean
}

export default function Day({
  dayData,
  currentYear,
  currentMonth,
  selectedDate,
  onDayClick,
  selectedDateRef,
  ...restProps
}: Props) {
  const { date, isCurrentMonth } = dayData

  const isSelected = selectedDate
    ? isCurrentMonth &&
      selectedDate.getFullYear() === currentYear &&
      selectedDate.getMonth() + 1 === currentMonth &&
      selectedDate.getDate() === date
    : false

  const isToday = useMemo(() => {
    const today = new Date()

    return (
      today.getFullYear() === currentYear &&
      today.getMonth() + 1 === currentMonth &&
      today.getDate() === date
    )
  }, [currentYear, currentMonth, date])

  const handleClick = () => {
    if (isCurrentMonth) {
      onDayClick(date)
    }
  }

  return (
    <td {...restProps}>
      <button
        type="button"
        onClick={handleClick}
        disabled={!isCurrentMonth}
        aria-disabled={!isCurrentMonth}
        ref={isSelected ? selectedDateRef : null}
        className={`aspect-square w-13.5 cursor-pointer rounded-xl border-1 border-[#DAD9E6] bg-white hover:border-[#FFA873] hover:text-[#FF6000] focus:border-2 focus:border-[#FFA873] focus:font-semibold focus:text-[#FF6000] focus:outline-0 ${
          isCurrentMonth
            ? ''
            : 'pointer-events-none bg-[#F7F7FC] text-[#A3A0C0]'
        } ${isSelected ? 'border-[#FF6000] !bg-[#FFD8C080] text-[#FF6000]' : ''} ${isToday ? 'border-[#FF6000] text-[#FF6000]' : ''}`}
      >
        {date}
      </button>
    </td>
  )
}

import { useCallback, useMemo, type RefObject } from 'react'
import type { CalendarDay } from './hooks/useCalendar'

interface Props {
  dayData: CalendarDay
  currentYear: number
  currentMonth: number
  selectedDate: Date | null
  onDayClick: (date: number) => void
  selectedDateRef: RefObject<HTMLButtonElement | null>
  rowIndex: number
  colIndex: number
  setDayButtonRef: (key: string, node: HTMLButtonElement | null) => void
  focusDay: (row: number, col: number) => void
  restProps?: boolean
}

export default function Day({
  dayData,
  currentYear,
  currentMonth,
  selectedDate,
  onDayClick,
  selectedDateRef,
  rowIndex,
  colIndex,
  setDayButtonRef,
  focusDay,
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

  const buttonRef = useCallback(
    (node: HTMLButtonElement | null) => {
      setDayButtonRef(`${rowIndex}-${colIndex}`, node)

      if (isSelected && node) {
        ;(selectedDateRef.current as any) = node
      }
    },
    [rowIndex, colIndex, setDayButtonRef, isSelected, selectedDateRef]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      return
    }

    e.preventDefault()

    let newRow = rowIndex
    let newCol = colIndex

    switch (e.key) {
      case 'ArrowRight':
        newCol += 1
        break
      case 'ArrowLeft':
        newCol -= 1
        break
      case 'ArrowUp':
        newRow -= 1
        break
      case 'ArrowDown':
        newRow += 1
        break
    }

    focusDay(newRow, newCol)
  }

  return (
    <td>
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={!isCurrentMonth}
        aria-disabled={!isCurrentMonth}
        aria-label={`${currentYear}년 ${currentMonth}월 ${date}일 ${isSelected ? '선택됨' : ''} ${isToday ? '오늘' : ''}`}
        ref={buttonRef}
        className={`h-13.5 w-full cursor-pointer rounded-xl border-1 border-[#C6C6D9] bg-white hover:border-[#FFA873] hover:text-[#FF6000] hover:outline-[#FFA873] focus:border-[#FFA873] focus:font-semibold focus:text-[#FF6000] focus:outline-2 ${
          isCurrentMonth
            ? ''
            : 'pointer-events-none border-[#DAD9E6] !bg-[#F7F7FC] text-[#A3A0C0]'
        } ${isSelected ? 'border-[#FF6000] !bg-[#FFD8C080] text-[#FF6000]' : ''} ${isToday ? 'border-[#FF6000] text-[#FF6000]' : ''}`}
      >
        {date}
      </button>
    </td>
  )
}

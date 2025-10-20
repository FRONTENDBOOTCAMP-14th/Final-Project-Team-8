import { useCallback, useMemo } from 'react'
import type { CalendarDay, DayProps } from './hooks/useCalendar'
import type { ScheduleEvent } from './types'

interface Props extends Omit<DayProps, 'restProps'> {
  dayData: CalendarDay
  rowIndex: number
  colIndex: number
  getSchedulesForDate?: (
    year: number,
    month: number,
    day: number
  ) => ScheduleEvent[]
}

const CATEGORY_COLORS: Record<string, string> = {
  birthday: 'bg-[#6AA9F3]',
  adoption: 'bg-[#A461D8]',
  vaccine: 'bg-[#897EE6]',
  antiparasitic: 'bg-[#FF9AD5]',
  medical: 'bg-[#FFC542]',
  otherTreatments: 'bg-[#FD8C8C]',
  walk: 'bg-[#82C43C]',
  otherActivities: 'bg-[#FF6000]',
}

export default function DaySchedule({
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
  getSchedulesForDate,
  ...restProps
}: Props) {
  const { date, isCurrentMonth } = dayData

  // 해당 날짜의 스케줄 가져오기
  const schedules = useMemo(() => {
    if (!getSchedulesForDate || !isCurrentMonth) return []
    return getSchedulesForDate(currentYear, currentMonth, date)
  }, [getSchedulesForDate, isCurrentMonth, currentYear, currentMonth, date])

  // 스캐줄 카테고리 목록(중복 제거, 최대 5개까지만 표시)
  const uniqueCategories = useMemo(() => {
    const categories = new Set(schedules.map(s => s.category))
    return Array.from(categories).slice(0, 5)
  }, [schedules])

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
    if (!['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
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

  // aria-label에 스케줄 정보 추가
  const ariaLabel = useMemo(() => {
    let label = `${currentYear}년 ${currentMonth}월 ${date}일`
    if (isSelected) label += ' 선택됨'
    if (isToday) label += ' 오늘'
    if (schedules.length > 0) label += `${schedules.length}개의 일정`
    return label
  }, [currentYear, currentMonth, date, isSelected, isToday, schedules.length])

  return (
    <td {...restProps}>
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={!isCurrentMonth}
        aria-disabled={!isCurrentMonth}
        aria-label={ariaLabel}
        ref={buttonRef}
        className={`flex h-22.5 w-full cursor-pointer flex-col items-center justify-between rounded-xl border-1 border-[#C6C6D9] bg-white p-2.5 hover:border-[#FFA873] hover:text-[#FF6000] focus:border-[#FFA873] focus:text-[#FF6000] focus:outline-2 focus:outline-[#FFA873] ${
          isCurrentMonth
            ? ''
            : 'pointer-events-none border-[#DAD9E6] !bg-[#F7F7FC] text-[#A3A0C0]'
        } ${isSelected ? 'border-[#FF6000] !bg-[#FFD8C080] text-[#FF6000]' : ''} ${isToday ? 'border-[#FF6000] text-[#FF6000]' : ''}`}
      >
        <span className="focus:font-semibold">{date}</span>
        {uniqueCategories.length > 0 && (
          <span className="flex gap-1" aria-hidden="true">
            {uniqueCategories.map((category, index) => (
              <span
                key={index}
                className={`aspect-square w-3 rounded-2xl ${CATEGORY_COLORS[category] ?? 'bg-[#A3A0C0]'}`}
                title={category}
              ></span>
            ))}
          </span>
        )}
      </button>
    </td>
  )
}

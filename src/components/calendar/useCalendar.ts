import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface CalendarDay {
  date: number
  isCurrentMonth: boolean
}

export interface CalendarControls {
  currentYear: number
  currentMonth: number
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>
  selectedDate: Date | null
  calendar: CalendarDay[][]
  handleDayClick: (date: number) => void
  selectedDateRef: React.RefObject<HTMLButtonElement | null>
  setDayButtonRef: (key: string, node: HTMLButtonElement | null) => void
  focusDay: (row: number, col: number) => void
}

export interface DayProps {
  currentYear: number
  currentMonth: number
  selectedDate: Date | null
  onDayClick: (date: number) => void
  selectedDateRef: React.RefObject<HTMLButtonElement | null>
  setDayButtonRef: (key: string, node: HTMLButtonElement | null) => void
  focusDay: (row: number, col: number) => void
}

interface Props {
  onDayClick?: (date: Date) => void
  initialSelectedDate?: Date | null
}

export const useCalendar = (props?: Props): CalendarControls => {
  const { onDayClick, initialSelectedDate = null } = props ?? {}

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialSelectedDate
  )

  const selectedDateRef = useRef<HTMLButtonElement>(null)
  const dayButtonRefs = useRef(new Map<string, HTMLButtonElement>())

  useEffect(() => {
    if (!initialSelectedDate && !selectedDate) {
      setSelectedDate(new Date())
    }

    if (selectedDateRef.current) {
      selectedDateRef.current.focus()
    }
  }, [initialSelectedDate, selectedDate])

  const setDayButtonRef = useCallback(
    (key: string, node: HTMLButtonElement | null) => {
      if (node) {
        dayButtonRefs.current.set(key, node)
      } else {
        dayButtonRefs.current.delete(key)
      }
    },
    []
  )

  const focusDay = useCallback((row: number, col: number) => {
    const targetKey = `${row}-${col}`
    const targetElement = dayButtonRefs.current.get(targetKey)

    if (targetElement) {
      targetElement.focus()
    }
  }, [])

  const calendar = useMemo(() => {
    // 이번 달 마지막 날짜 & 이번 달 총 일 수
    const lastDateOfCurrentMonth = new Date(
      currentYear,
      currentMonth,
      0
    ).getDate()
    // 이번 달 시작 요일
    const firstDayofCurrentMonth = new Date(
      currentYear,
      currentMonth - 1,
      1
    ).getDay()
    // 이번 달 마지막 요일
    const lastDayofCurrentMonth = new Date(
      currentYear,
      currentMonth - 1,
      lastDateOfCurrentMonth
    ).getDay()

    // 이전 달 날짜 채우기
    const prevMonthDays: CalendarDay[] = []
    const lastDateofPrevMonth = new Date(
      currentYear,
      currentMonth - 1,
      0
    ).getDate()
    const prevDaysToFill = lastDateofPrevMonth - firstDayofCurrentMonth + 1
    for (let i = 0; i < firstDayofCurrentMonth; i++) {
      prevMonthDays.push({
        date: prevDaysToFill + i,
        isCurrentMonth: false,
      })
    }

    // 이번 달 날짜 채우기
    const currentMonthDays: CalendarDay[] = []
    for (let i = 0; i < lastDateOfCurrentMonth; i++) {
      currentMonthDays.push({
        date: i + 1,
        isCurrentMonth: true,
      })
    }

    // 다음 달 날짜 채우기
    const nextMonthDays: CalendarDay[] = []
    if (lastDayofCurrentMonth < 6) {
      for (let i = 0; i < 6 - lastDayofCurrentMonth; i++) {
        nextMonthDays.push({
          date: i + 1,
          isCurrentMonth: false,
        })
      }
    }

    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
    const weeks: CalendarDay[][] = []
    for (let i = 0; i < allDays.length; i += 7) {
      weeks.push(allDays.slice(i, i + 7))
    }

    return weeks
  }, [currentYear, currentMonth])

  const handleDayClick = (date: number) => {
    const newSelectedDate = new Date(currentYear, currentMonth - 1, date)

    setSelectedDate(newSelectedDate)

    if (onDayClick) {
      onDayClick(newSelectedDate)
    }
  }

  return {
    currentYear,
    currentMonth,
    setCurrentYear,
    setCurrentMonth,
    selectedDate,
    calendar,
    handleDayClick,
    selectedDateRef,
    setDayButtonRef,
    focusDay,
  }
}

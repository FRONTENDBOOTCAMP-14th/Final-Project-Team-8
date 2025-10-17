import { useCallback, useEffect, useRef } from 'react'
import { useCalendarStore } from '@/store/calendarStore'
import { useCalendarGrid } from './useCalendarGrid'

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

  const {
    currentYear,
    currentMonth,
    selectedDate,
    setCurrentYear: setStoreYear,
    setCurrentMonth: setStoreMonth,
    setSelectedDate: setStoreSelectedDate,
  } = useCalendarStore()

  const selectedDateRef = useRef<HTMLButtonElement>(null)
  const dayButtonRefs = useRef(new Map<string, HTMLButtonElement>())

  useEffect(() => {
    if (!initialSelectedDate && !selectedDate) {
      setStoreSelectedDate(new Date())
    }
  }, [initialSelectedDate, selectedDate, setStoreSelectedDate])

  useEffect(() => {
    if (selectedDate) {
      setTimeout(() => {
        selectedDateRef.current?.focus()
      }, 0)
    }
  }, [selectedDate])

  const setCurrentYear = useCallback(
    (value: React.SetStateAction<number>) => {
      if (typeof value === 'function') {
        setStoreYear(value(currentYear))
      } else {
        setStoreYear(value)
      }
    },
    [currentYear, setStoreYear]
  )

  const setCurrentMonth = useCallback(
    (value: React.SetStateAction<number>) => {
      let newMonth: number

      if (typeof value === 'function') {
        newMonth = value(currentMonth)
      } else {
        newMonth = value
      }

      setStoreMonth(newMonth)

      // 오늘 날짜 확인
      const today = new Date()
      const todayYear = today.getFullYear()
      const todayMonth = today.getMonth() + 1
      const todayDate = today.getDate()

      // 이동한 월이 오늘이 포함된 월이면 선택된 날짜를 오늘로 설정
      // 아니면 선택된 날짜를 해당 월 1일로 자동 설정
      const isCurrentMonthToday =
        currentYear === todayYear && newMonth === todayMonth
      const newSelectedDate = isCurrentMonthToday
        ? new Date(currentYear, newMonth - 1, todayDate)
        : new Date(currentYear, newMonth - 1, 1)

      setStoreSelectedDate(newSelectedDate)
    },
    [currentYear, currentMonth, setStoreMonth, setStoreSelectedDate]
  )

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

  const calendar = useCalendarGrid(currentYear, currentMonth)

  const handleDayClick = (date: number) => {
    const newSelectedDate = new Date(currentYear, currentMonth - 1, date)

    setStoreSelectedDate(newSelectedDate)

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

'use client'

import { useEffect, useMemo, useState } from 'react'
import Week from './Week'

export interface CalendarDay {
  date: number
  isCurrentMonth: boolean
}

interface CalendarProps {
  onDayClick?: (date: Date) => void
  initialSelectedDate?: Date | null
}

export default function CalendarComponent({
  onDayClick,
  initialSelectedDate = null,
}: CalendarProps) {
  const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토']

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialSelectedDate
  )

  useEffect(() => {
    if (!initialSelectedDate && !selectedDate) {
      setSelectedDate(new Date())
    }
  }, [initialSelectedDate, selectedDate])

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

  return (
    <section>
      <h1 className="sr-only">캘린더 컴포넌트</h1>
      <p>
        {currentYear}년 {currentMonth}월
      </p>
      <table className="border-separate border-spacing-4 text-center">
        <thead className="text-sm font-bold text-[#80809A]">
          <tr>
            {DAYS_OF_WEEK.map((day, index) => (
              <td key={index} aria-label={`${day}요일`}>
                {day}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="text-[#636073]">
          {calendar.map((week, index) => (
            <Week
              key={index}
              week={week}
              currentYear={currentYear}
              currentMonth={currentMonth}
              selectedDate={selectedDate}
              onDayClick={handleDayClick}
            />
          ))}
        </tbody>
      </table>
    </section>
  )
}

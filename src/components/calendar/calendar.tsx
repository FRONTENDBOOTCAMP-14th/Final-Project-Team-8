'use client'

import { useMemo, useState } from 'react'
import Week from './week'

export default function CalendarComponent() {
  const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토']

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const calendar = useMemo(() => {
    const lastDateOfCurrentMonth = new Date(
      currentYear,
      currentMonth,
      0
    ).getDate()
    const firstDayofCurrentMonth = new Date(
      currentYear,
      currentMonth - 1,
      1
    ).getDay()
    const lastDayofCurrentMonth = new Date(
      currentYear,
      currentMonth - 1,
      lastDateOfCurrentMonth
    ).getDay()

    // 이전 달 날짜 채우기
    const prevMonthDays = []
    const lastDateofPrevMonth = new Date(
      currentYear,
      currentMonth - 1,
      0
    ).getDate()
    const prevDaysToFill = lastDateofPrevMonth - firstDayofCurrentMonth + 1
    for (let i = 0; i < firstDayofCurrentMonth; i++) {
      prevMonthDays.push(prevDaysToFill + i)
    }

    // 이번 달 날짜 채우기
    const currentMonthDays = []
    for (let i = 0; i < lastDateOfCurrentMonth; i++) {
      currentMonthDays.push(i + 1)
    }

    // 다음 달 날짜 채우기
    const nextMonthDays = []
    let nextDate = 1
    while (
      (firstDayofCurrentMonth + lastDateOfCurrentMonth + nextMonthDays.length) %
      7
    ) {
      nextMonthDays.push(nextDate)
      nextDate++
    }

    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
    const weeks = []
    for (let i = 0; i < allDays.length; i += 7) {
      weeks.push(allDays.slice(i, i + 7))
    }

    return weeks
  }, [currentYear, currentMonth])

  return (
    <section>
      <h1 className="sr-only">캘린더 컴포넌트</h1>
      <p>
        {currentYear}년 {currentMonth}월
      </p>
      <table className="border-separate border-spacing-4 text-center">
        <thead className="text-sm font-bold text-gray-600">
          <tr>
            {DAYS_OF_WEEK.map((day, index) => (
              <td key={index} aria-label={`${day}요일`}>
                {day}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {calendar.map((week, index) => (
            <Week key={index} week={week} />
          ))}
        </tbody>
      </table>
    </section>
  )
}

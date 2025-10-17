import { useMemo } from 'react'

export interface CalendarDay {
  date: number
  isCurrentMonth: boolean
}

/**
 * 캘린더 그리드 생성 훅
 * 주어진 년/월에 대한 캘린더 그리드를 생성합니다.
 * 이전 달과 다음 달의 날짜도 포함되어 6주 형식으로 반환합니다.
 *
 * @param year -
 * @param month -
 * @returns 6주 ✕ 7일 형식의 캘린더 그리드
 */
export const useCalendarGrid = (year: number, month: number) => {
  return useMemo(() => {
    // 현재 달 마지막 날짜
    const lastDateOfCurrentMonth = new Date(year, month, 0).getDate()

    // 현재 달 첫 날의 요일(0 = 일요일, 6 = 토요일)
    const firstDayofCurrentMonth = new Date(year, month - 1, 1).getDay()

    // 현재 달 마지막 날의 요일
    const lastDayofCurrentMonth = new Date(
      year,
      month - 1,
      lastDateOfCurrentMonth
    ).getDay()

    // 이전 달 날짜 채우기
    const prevMonthDays: CalendarDay[] = []
    const lastDateofPrevMonth = new Date(year, month - 1, 0).getDate()
    const prevDaysToFill = lastDateofPrevMonth - firstDayofCurrentMonth + 1

    for (let i = 0; i < firstDayofCurrentMonth; i++) {
      prevMonthDays.push({
        date: prevDaysToFill + i,
        isCurrentMonth: false,
      })
    }

    // 현재 달 날짜
    const currentMonthDays: CalendarDay[] = []
    for (let i = 0; i < lastDateOfCurrentMonth; i++) {
      currentMonthDays.push({
        date: i + 1,
        isCurrentMonth: true,
      })
    }

    // 다음 달 날짜 채우기
    const nextMonthDays: CalendarDay[] = []
    if (lastDateOfCurrentMonth < 6) {
      for (let i = 0; i < 6 - lastDayofCurrentMonth; i++) {
        nextMonthDays.push({
          date: i + 1,
          isCurrentMonth: false,
        })
      }
    }

    // 전체 날짜를 주 단위로 나누기
    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
    const weeks: CalendarDay[][] = []

    for (let i = 0; i < allDays.length; i += 7) {
      weeks.push(allDays.slice(i, i + 7))
    }

    return weeks
  }, [year, month])
}

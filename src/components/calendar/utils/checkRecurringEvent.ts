import type { ScheduleEvent } from '../types'

interface RecurringEventMatch {
  isRecurring: boolean
  isValid: boolean
}

/**
 * 반복 일정이 주어진 날짜에 표시되어야 하는지 확인
 *
 * @param schedule - 스케줄 객체
 * @param year - 확인할 연도
 * @param month - 확인할 월
 * @param day - 확인할 일
 * @returns 반복 일정 여부와 유효성
 *
 * @example
 * const schedule = { date: '2023-10-16', isRecurring: true, ... }
 * checkRecurringEvent(schedule, 2025, 10, 16) // { isRecurring: true, isValid: true }
 */
export const checkRecurringEvent = (
  schedule: ScheduleEvent,
  year: number,
  month: number,
  day: number
): RecurringEventMatch => {
  if (!schedule.isRecurring) {
    return { isRecurring: false, isValid: false }
  }

  const [scheduleYear, scheduleMonth, scheduleDay] = schedule.date
    .split('-')
    .map(Number)

  // 이 부분 확인 필요!!!!
  if (!scheduleYear || !scheduleMonth || !scheduleDay)
    return { isRecurring: false, isValid: false }

  const monthMatch = scheduleMonth === month
  const dayMatch = scheduleDay === day
  const yearValid = year >= scheduleYear

  return {
    isRecurring: true,
    isValid: monthMatch && dayMatch && yearValid,
  }
}

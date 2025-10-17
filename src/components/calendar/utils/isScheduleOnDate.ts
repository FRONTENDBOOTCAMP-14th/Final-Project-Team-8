import type { ScheduleEvent } from '../types'

/**
 * @param schedule - 스케줄 객체
 * @param year - 확인할 연도
 * @param month - 확인할 월
 * @param day - 확인할 일
 * @returns 일치 여부
 */
export const isScheduleOnDate = (
  schedule: ScheduleEvent,
  year: number,
  month: number,
  day: number
): boolean => {
  const [scheduleYear, scheduleMonth, scheduleDay] = schedule.date
    .split('-')
    .map(Number)

  return scheduleYear === year && scheduleMonth === month && scheduleDay === day
}

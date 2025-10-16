import { ScheduleEvent } from '../types'
import { checkRecurringEvent } from './checkRecurringEvent'
import { isScheduleOnDate } from './isScheduleOnDate'

/**
 * 주어진 날짜의 스케줄들을 필터링
 * 정확한 날짜 매칭과 반복 일정을 모두 처리합니다.
 *
 * @param schedules - 전체 스케줄 배열
 * @param year - 조회 연도
 * @param month - 조회 월
 * @param day - 조회 일
 * @returns 해당 날짜의 스케줄 배열
 */
export const getSchedulesForDate = (
  schedules: ScheduleEvent[],
  year: number,
  month: number,
  day: number
): ScheduleEvent[] => {
  return schedules.filter(schedule => {
    // 정확한 날짜 매칭
    if (isScheduleOnDate(schedule, year, month, day)) {
      return true
    }

    // 반복 일정 처리
    const { isRecurring, isValid } = checkRecurringEvent(
      schedule,
      year,
      month,
      day
    )

    return isRecurring && isValid
  })
}

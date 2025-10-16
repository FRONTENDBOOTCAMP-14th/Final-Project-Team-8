import { useMemo } from 'react'
import { ScheduleCategory, ScheduleEvent } from '../types'
import { getSchedulesForDate } from '../utils/getSchedulesForDate'

/**
 * 스케줄 필터링 훅(캘린더용)
 * 주어진 날짜와 필터 조건에 따라 스케줄을 필터링합니다.
 *
 * 처리 순서:
 * 1. 카테고리 필터링(activeFilters)
 * 2. 선택된 날짜의 스케줄만 추출
 * 3. 정렬(날짜순)
 *
 * @param schedules - 전체 스케줄 배열
 * @param activeFilters - 활성화된 카테고리 필터들
 * @param selectedDate - 선택된 날짜
 * @returns 필터링된 스케줄 배열(날짜순 정렬)
 *
 * @example
 * const filtered = useScheduleFilter(
 *   schedules,
 *   ['vaccine', 'medical'],
 *   new Date(2025, 10, 16)
 * )
 */
export const useScheduleFilter = (
  schedules: ScheduleEvent[],
  activeFilters: ScheduleCategory[],
  selectedDate: Date | null
) => {
  return useMemo(() => {
    if (!selectedDate) return []

    // 1. 카테고리 필터링
    const filteredByCategory = schedules.filter(schedule =>
      activeFilters.includes(schedule.category)
    )

    // 2. 선택된 날짜의 스케줄만 추출
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth() + 1
    const day = selectedDate.getDate()

    const filteredByDate = getSchedulesForDate(
      filteredByCategory,
      year,
      month,
      day
    )

    // 3. 날짜순 정렬(정렬되어 있지만, 명시적으로 처리)
    return filteredByDate.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  }, [schedules, activeFilters, selectedDate])
}

import { create } from 'zustand'

interface CalendarStore {
  // State
  currentYear: number
  currentMonth: number
  selectedDate: Date | null

  // Actions
  setCurrentYear: (year: number) => void
  setCurrentMonth: (month: number) => void
  setYearMonth: (year: number, month: number) => void
  setSelectedDate: (date: Date | null) => void
  resetCalendar: () => void
}

/**
 * Zustand CalendarStore
 *
 * 캘린더의 현재 년/월 상태 관리하여
 * CalendarSchedule과 SheduleList가 동일한 시점을 참조하도록 함
 */
export const useCalendarStore = create<CalendarStore>(set => ({
  // State - 현재 날짜로 초기화
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth() + 1,
  selectedDate: new Date(),

  // Actions
  setCurrentYear: (year: number) => set({ currentYear: year }),
  setCurrentMonth: (month: number) => set({ currentMonth: month }),
  setYearMonth: (year: number, month: number) =>
    set({ currentYear: year, currentMonth: month }),
  setSelectedDate: (date: Date | null) => set({ selectedDate: date }),

  /**
   * Calendar Store 초기화
   * - 로그아웃 시 현재 날짜로 리셋
   */
  resetCalendar: () => {
    const now = new Date()
    set({
      currentYear: now.getFullYear(),
      currentMonth: now.getMonth() + 1,
      selectedDate: now,
    })
  },
}))

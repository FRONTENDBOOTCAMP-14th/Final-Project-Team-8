'use client'

import { type ScheduleEvent } from '@/libs/api/schedules'
import { useMemo } from 'react'
import CalendarBase from './CalendarBase'
import DaySchedule from './DaySchedule'
import { useCalendar } from './useCalendar'

interface Props {
  schedules: ScheduleEvent[]
}

export default function CalendarScheduleClient({ schedules }: Props) {
  const controls = useCalendar()

  const getSchedulesForDate = useMemo(() => {
    return (year: number, month: number, day: number) => {
      const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const monthDay = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

      const result: ScheduleEvent[] = []

      schedules.forEach(schedule => {
        if (schedule.date === dateString) {
          result.push(schedule)
        } else if (
          schedule.isRecurring &&
          schedule.date.slice(5) === monthDay
        ) {
          const originalYear = parseInt(schedule.date.slice(0, 4))
          if (year >= originalYear) {
            result.push(schedule)
          }
        }
      })

      return result
    }
  }, [schedules])

  return (
    <CalendarBase
      {...controls}
      DayComponent={DaySchedule}
      getSchedulesForDate={getSchedulesForDate}
    />
  )
}

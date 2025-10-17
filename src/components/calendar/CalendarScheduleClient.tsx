'use client'

import { useMemo } from 'react'
import type { ScheduleEvent } from '@/libs/api/schedules'
import CalendarBase from './CalendarBase'
import DaySchedule from './DaySchedule'
import { useCalendar } from './hooks/useCalendar'
import type { ScheduleEvent } from './types'
import { getSchedulesForDate } from './utils/getSchedulesForDate'

interface Props {
  schedules: ScheduleEvent[]
}

export default function CalendarScheduleClient({ schedules }: Props) {
  const controls = useCalendar()

  const getSchedulesForDateMemo = useMemo(() => {
    return (year: number, month: number, day: number) => {
      return getSchedulesForDate(schedules, year, month, day)
    }
  }, [schedules])

  return (
    <CalendarBase
      {...controls}
      DayComponent={DaySchedule}
      getSchedulesForDate={getSchedulesForDateMemo}
    />
  )
}

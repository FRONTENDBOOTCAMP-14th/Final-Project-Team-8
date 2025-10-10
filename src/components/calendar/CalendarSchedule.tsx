'use client'

import CalendarBase from './CalendarBase'
import DaySchedule from './DaySchedule'
import { useCalendar } from './useCalendar'

export default function CalendarSchedule(props: any) {
  const controls = useCalendar(props)

  return <CalendarBase {...controls} DayComponent={DaySchedule} />
}

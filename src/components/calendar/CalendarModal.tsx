'use client'

import CalendarBase from './CalendarBase'
import DayModal from './DayModal'
import { useCalendar } from './hooks/useCalendar'

export default function CalendarModal(props: any) {
  const controls = useCalendar(props)

  return <CalendarBase {...controls} DayComponent={DayModal} />
}

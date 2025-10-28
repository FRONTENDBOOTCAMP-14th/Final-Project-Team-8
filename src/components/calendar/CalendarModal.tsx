'use client'

import CalendarBase from './CalendarBase'
import DayModal from './DayModal'
import { useCalendar } from './hooks/useCalendar'

interface CalendarModalProps {
  onDayClick?: (date: Date) => void
  initialSelectedDate?: Date | null
}

export default function CalendarModal(props?: CalendarModalProps) {
  const controls = useCalendar(props)

  return <CalendarBase {...controls} DayComponent={DayModal} />
}

export type ScheduleCategory =
  | 'birthday'
  | 'adoption'
  | 'vaccine'
  | 'antiparasitic'
  | 'medical'
  | 'other treatments'
  | 'walk'
  | 'other activities'

export interface ScheduleEvent {
  id: string
  date: string
  title: string
  category: ScheduleCategory
  isRecurring?: boolean
}

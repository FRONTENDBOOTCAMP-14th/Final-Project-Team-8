export type ScheduleCategory =
  | 'birthday'
  | 'adoption'
  | 'vaccine'
  | 'antiparasitic'
  | 'medical'
  | 'walk'

export interface ScheduleEvent {
  id: string
  date: string
  title: string
  category: ScheduleCategory
  isRecurring?: boolean
}

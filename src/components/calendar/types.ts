export type ScheduleCategory =
  | 'birthday'
  | 'adoption'
  | 'vaccine'
  | 'antiparasitic'
  | 'medical'
  | 'walk'

export type ScheduleEvent = {
  id: string
  date: string
  title: string
  category: ScheduleCategory
  isRecurring?: boolean
}

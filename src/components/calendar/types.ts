export type ScheduleCategory =
  | 'birthday'
  | 'adoption'
  | 'vaccine'
  | 'antiparasitic'
  | 'medical'
  | 'other treatments'
  | 'walk'
  | 'other activities'

export const API_TYPE_MAP = {
  vaccine: 'vaccines',
  antiparasitic: 'antiparasitic',
  medical: 'medical treatment',
  'other treatments': 'other treatments',
  walk: 'walks',
  'other activities': 'other activities',
} as const

export type ApiType = (typeof API_TYPE_MAP)[keyof typeof API_TYPE_MAP]

export interface ScheduleEvent {
  id: string
  date: string
  title: string
  category: ScheduleCategory
  isRecurring?: boolean
  notificationEnabled?: boolean
  notificationTime?: string
}

export const NOTIFICATION_TYPE_MAP: Record<ScheduleCategory, string> = {
  birthday: 'birthday',
  adoption: 'adoption',
  vaccine: 'vaccine',
  antiparasitic: 'antiparasitic',
  medical: 'medical',
  'other treatments': 'other_treatments',
  walk: 'walk',
  'other activities': 'other_activities',
}

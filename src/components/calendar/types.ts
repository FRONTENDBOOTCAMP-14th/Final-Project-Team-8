export type ScheduleCategory =
  | 'birthday'
  | 'adoption'
  | 'vaccine'
  | 'antiparasitic'
  | 'medical'
  | 'other treatments'
  | 'walk'
  | 'other activities'

export type AddableScheduleCategory = Exclude<
  ScheduleCategory,
  'birthday' | 'adoption'
>

export const API_TYPE_MAP: Record<
  AddableScheduleCategory,
  | 'vaccines'
  | 'antiparasitic'
  | 'medical treatment'
  | 'other treatments'
  | 'walks'
  | 'other activities'
> = {
  vaccine: 'vaccines',
  antiparasitic: 'antiparasitic',
  medical: 'medical treatment',
  'other treatments': 'other treatments',
  walk: 'walks',
  'other activities': 'other activities',
}

export interface ScheduleEvent {
  id: string
  date: string
  title: string
  category: ScheduleCategory
  isRecurring?: boolean
}

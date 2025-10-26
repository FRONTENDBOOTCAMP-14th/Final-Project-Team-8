import { toast } from 'sonner'
import { createClient } from '../supabase/client'

/**
 * 일정 알림 설정 타입
 */
export interface ScheduleNotification {
  id: string
  schedule_type: string
  schedule_id: string
  pet_id: string
  enabled: boolean
  notification_time: string
  created_at: string | null
  updated_at: string | null
}

export interface CreateNotificationData {
  schedule_type: string
  schedule_id: string
  pet_id: string
  enabled?: boolean
  notification_time?: string
}

export interface UpdateNotificationData {
  enabled?: boolean
  notification_time?: string
}

/**
 * 특정 일정의 알림 설정 조회
 */
export async function getScheduleNotification(
  scheduleType: string,
  scheduleId: string
): Promise<ScheduleNotification | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('schedule notifications')
    .select('*')
    .eq('schedule_type', scheduleType)
    .eq('schedule_id', scheduleId)
    .maybeSingle()

  if (error) {
    throw new Error(`알림 설정 조회 실패: ${error.message}`)
  }

  return data
}

/**
 * 반려동물의 모든 알림 설정 조회
 */
export async function getPetNotifications(
  petId: string
): Promise<ScheduleNotification[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('schedule notifications')
    .select('*')
    .eq('pet_id', petId)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`알림 목록 조회 실패: ${error.message}`)
  }

  return data ?? []
}

/**
 * 활성화된 알림만 조회(알림 발송용)
 */
export async function getEnabledNotifications(
  petId: string
): Promise<ScheduleNotification[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('schedule notifications')
    .select('*')
    .eq('pet_id', petId)
    .eq('enabled', true)

  if (error) {
    throw new Error(`활성 알림 조회 실패: ${error.message}`)
  }

  return data ?? []
}

/**
 * 알림 설정 생성 또는 업데이트(Upsert)
 */
export async function upsertNotification(
  data: CreateNotificationData
): Promise<ScheduleNotification> {
  const supabase = createClient()

  const { data: result, error } = await supabase
    .from('schedule notifications')
    .upsert(
      {
        schedule_type: data.schedule_type,
        schedule_id: data.schedule_id,
        pet_id: data.pet_id,
        enabled: data.enabled ?? false,
        notification_time: data.notification_time ?? '09:00:00',
      },
      {
        onConflict: 'schedule_type,schedule_id',
        ignoreDuplicates: false,
      }
    )
    .select()
    .single()

  if (error) {
    throw new Error(`알림 설정 저장 실패: ${error.message}`)
  }

  return result
}

/**
 * 알림 설정 업데이트
 */
export async function updateNotification(
  scheduleType: string,
  scheduleId: string,
  data: UpdateNotificationData
): Promise<ScheduleNotification> {
  const supabase = createClient()

  const { data: result, error } = await supabase
    .from('schedule notifications')
    .update(data)
    .eq('schedule_type', scheduleType)
    .eq('schedule_id', scheduleId)
    .select()
    .single()

  if (error) {
    throw new Error(`알림 설정 업데이트 실패: ${error.message}`)
  }

  return result
}

/**
 * 알림 설정 삭제
 */
export async function deleteNotification(
  scheduleType: string,
  scheduleId: string
): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase
    .from('schedule notifications')
    .delete()
    .eq('schedule_type', scheduleType)
    .eq('schedule_id', scheduleId)

  if (error) {
    throw new Error(`알림 설정 삭제 실패: ${error.message}`)
  }
}

/**
 * 일정 삭제 시 알림도 함께 삭제(CASCADE 되지만 명시적 호출용)
 */
export async function deleteScheduleNotifications(
  scheduleType: string,
  scheduleId: string
): Promise<void> {
  await deleteNotification(scheduleType, scheduleId)
}

/**
 * 배치로 여러 알림 설정 조회(성능 최적화)
 */
export async function batchGetNotifications(
  scheduleIds: Array<{ type: string; id: string }>
): Promise<Map<string, ScheduleNotification>> {
  if (scheduleIds.length === 0) {
    return new Map()
  }

  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('schedule notifications')
      .select('*')

    if (error) {
      return new Map()
    }

    // Map으로 변환(빠른 조회용)
    const notificationMap = new Map<string, ScheduleNotification>()

    data?.forEach(notification => {
      const key = `${notification.schedule_type}-${notification.schedule_id}`
      notificationMap.set(key, notification)
    })

    return notificationMap
  } catch (error) {
    toast.error(`배치 알림 조회 실패: ${error}`)
    return new Map()
  }
}

/**
 * 스케줄 타입 매핑 헬퍼
 */
export const SCHEDULE_TYPE_MAP = {
  vaccine: 'vaccine',
  antiparasitic: 'antiparasitic',
  medical: 'medical',
  'other treatments': 'other_treatments',
  walk: 'walk',
  'other activities': 'other_activities',
  birthday: 'birthday',
  adoption: 'adoption',
} as const

export type ScheduleType = keyof typeof SCHEDULE_TYPE_MAP

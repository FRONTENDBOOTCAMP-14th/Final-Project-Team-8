import { useEffect, useRef } from 'react'
import { useScheduleStore } from '@/store/scheduleStore'
import {
  initializeNotifications,
  type NotificationManager,
} from '../ui/MealTimeReminder/Notification'
import type { ScheduleEvent } from './types'

/**
 * 스케줄 알림 관리 컴포넌트
 * - schedule notifications 테이블의 설정을 기반으로 알림 생성
 * - 일회성/반복 알림 자동 처리
 */
export default function ScheduleNotificationManager() {
  const { schedules } = useScheduleStore()
  const managerRef = useRef<NotificationManager | null>(null)

  useEffect(() => {
    const setupNotifications = async () => {
      // 알림 매니저 초기화
      managerRef.current ??= await initializeNotifications()

      const manager = managerRef.current

      // 기존 알림 모두 취소
      manager.cancelAll()

      // 알림이 활성화된 스케줄만 처리
      const enabledSchedules = schedules.filter(
        s => s.notificationEnabled === true
      )

      enabledSchedules.forEach(schedule => {
        if (schedule.isRecurring) {
          // 생일, 입양일 반복 알림
          setupRecurringNotification(manager, schedule)
        } else {
          // 일회성 알림
          setupOneTimeNotification(manager, schedule)
        }
      })
    }

    setupNotifications()

    // 컴포넌트 언마운트 시 알림 취소
    return () => {
      managerRef.current?.cancelAll()
    }
  }, [schedules])

  return null
}

/**
 * 일회성 알림 설정
 */
function setupOneTimeNotification(
  manager: NotificationManager,
  schedule: ScheduleEvent
) {
  const time = formatTime(schedule.notificationTime ?? '09:00:00')

  manager.add({
    id: schedule.id,
    date: schedule.date,
    time,
    title: schedule.title,
    message: getCategoryMessage(schedule.category, schedule.title),
    enabled: true,
  })
}

/**
 * 반복 알림 설정(생일, 입양일 - 매년 반복)
 */
function setupRecurringNotification(
  manager: NotificationManager,
  schedule: ScheduleEvent
) {
  const time = formatTime(schedule.notificationTime ?? '09:00:00')

  // 원본 날짜에서 월/일 추출
  const [_, month, day] = schedule.date.split('-')
  const thisYear = new Date().getFullYear()

  // 올해 날짜로 변환
  const thisYearDate = `${thisYear}-${month}-${day}`

  const now = new Date()
  const targetDateTime = new Date(`${thisYearDate} ${time}:00`)

  // 올해 날짜가 지났는지 확인
  const notificationDate =
    targetDateTime > now ? thisYearDate : `${thisYear + 1}-${month}-${day}`

  manager.add({
    id: `${schedule.id}-${thisYear}`,
    date: notificationDate,
    time,
    title: schedule.title,
    message: getCategoryMessage(schedule.category, schedule.title),
    enabled: true,
  })
}

/**
 * 시간 포맷 변환(HH:MM:SS -> HH:MM)
 */
export function formatTime(time: string): string {
  if (time.length === 5) return time
  return time.substring(0, 5)
}

/**
 * 카테고리별 알림 메시지
 */
function getCategoryMessage(category: string, title: string): string {
  const messages: Record<string, string> = {
    birthday: `${title}! 생일을 축하해요!`,
    adoption: `${title}! 함께한 시간을 축하해요!`,
    vaccine: `예방접종 일정: ${title}`,
    antiparasitic: `구충제 복용: ${title}`,
    medical: `병원 방문: ${title}`,
    'other treatments': `치료 일정: ${title}`,
    walk: `산책 시간: ${title}`,
    'other activities': `활동 일정: ${title}`,
  }

  return messages[category] ?? title
}

import { toast } from 'sonner'

// 반복 알림용 타입
interface RepeatingNotificationConfig {
  id: string
  time: string // "HH:MM" 형식
  title: string
  message?: string
  enabled: boolean
  weekday: string // "매일", "월,수,금", "월", "화,목" 등
}

// 일회성 알림용 타입
interface OneTimeNotificationConfig {
  id: string
  date: string // "YYYY-MM-DD" 형식
  time: string // "HH:MM" 형식
  title: string
  message?: string
  enabled: boolean
}

// 통합 타입
export type NotificationConfig =
  | RepeatingNotificationConfig
  | OneTimeNotificationConfig

// 타입 가드
function isRepeatingNotification(
  config: NotificationConfig
): config is RepeatingNotificationConfig {
  return 'weekday' in config
}

// 요일 매핑
const weekdayMap: Record<string, number> = {
  일: 0,
  월: 1,
  화: 2,
  수: 3,
  목: 4,
  금: 5,
  토: 6,
}

// 알림 표시 함수
function showNotification(config: NotificationConfig) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(config.title, {
      body: config.message ?? '알림 시간입니다!',
      icon: '🔔',
    })
  }

  toast.info(`[${config.time}] ${config.title}`)
}

// 알림 시간 계산 (일회성)
function getNotificationTime(date: string, time: string): Date | null {
  try {
    const [year, month, day] = date.split('-').map(Number) as [
      number,
      number,
      number,
    ]
    const [hours, minutes] = time.split(':').map(Number) as [number, number]

    if (
      isNaN(year) ||
      isNaN(month) ||
      isNaN(day) ||
      isNaN(hours) ||
      isNaN(minutes)
    ) {
      throw new Error('Invalid date or time format')
    }

    return new Date(year, month - 1, day, hours, minutes, 0, 0)
  } catch (error: unknown) {
    toast.error('날짜/시간 파싱 오류:', error ?? '')
    return null
  }
}

// 요일 파싱
function parseWeekdays(weekday: string): number[] | null {
  if (weekday === '매일') {
    return [0, 1, 2, 3, 4, 5, 6]
  }

  const days = weekday.split(',').map(d => d.trim())
  const dayNumbers: number[] = []

  for (const day of days) {
    const dayNum = weekdayMap[day]
    if (dayNum !== undefined) {
      dayNumbers.push(dayNum)
    }
  }

  return dayNumbers.length > 0 ? dayNumbers : null
}

// 다음 알림 시간 계산 (반복 알림용)
function getNextNotificationTime(time: string, weekdays: number[]): Date {
  const now = new Date()
  const [hours, minutes] = time.split(':').map(Number) as [number, number]

  const currentDay = now.getDay()
  const currentTime = now.getHours() * 60 + now.getMinutes()
  const targetTime = hours * 60 + minutes

  // 오늘 해당 요일이고 아직 시간이 안 지났으면 오늘
  if (weekdays.includes(currentDay) && currentTime < targetTime) {
    const nextTime = new Date(now)
    nextTime.setHours(hours, minutes, 0, 0)
    return nextTime
  }

  // 다음 해당 요일 찾기
  for (let i = 1; i <= 7; i++) {
    const checkDay = (currentDay + i) % 7
    if (weekdays.includes(checkDay)) {
      const nextTime = new Date(now)
      nextTime.setDate(now.getDate() + i)
      nextTime.setHours(hours, minutes, 0, 0)
      return nextTime
    }
  }

  // 기본값 (다음 날)
  const nextTime = new Date(now)
  nextTime.setDate(now.getDate() + 1)
  nextTime.setHours(hours, minutes, 0, 0)
  return nextTime
}

// 반복 알림 예약
function scheduleRepeatingNotification(
  config: RepeatingNotificationConfig,
  onSchedule: (timeout: NodeJS.Timeout) => void
): NodeJS.Timeout | null {
  if (!config.enabled) {
    return null
  }

  const weekdays = parseWeekdays(config.weekday)
  if (!weekdays) {
    toast.error(`[${config.id}] 잘못된 요일 형식: ${config.weekday}`)
    return null
  }

  const nextTime = getNextNotificationTime(config.time, weekdays)
  const delay = nextTime.getTime() - Date.now()

  if (delay <= 0) {
    toast.error(`[${config.id}] 시간 계산 오류`)
    return null
  }

  const timeout = setTimeout(() => {
    showNotification(config)

    // 다음 알림 예약
    const nextTimeout = scheduleRepeatingNotification(config, onSchedule)
    if (nextTimeout) {
      onSchedule(nextTimeout)
    }
  }, delay)

  toast.info(
    `[${config.id}] ${config.title} 반복 알림 예약: ${nextTime.toLocaleString()}`
  )

  return timeout
}

// 단일 알림 예약
function scheduleOneTimeNotification(
  config: OneTimeNotificationConfig
): NodeJS.Timeout | null {
  if (!config.enabled) {
    toast.info(`[${config.id}] 알림이 비활성화되어 있습니다.`)
    return null
  }

  const notificationTime = getNotificationTime(config.date, config.time)

  if (!notificationTime) {
    toast.error(`[${config.id}] 날짜/시간 형식 오류`)
    return null
  }

  const now = new Date()
  const delay = notificationTime.getTime() - now.getTime()

  if (delay <= 0) {
    toast.info(`[${config.id}] 이미 지난 시간입니다.`)
    return null
  }

  const timeout = setTimeout(() => {
    showNotification(config)
  }, delay)

  toast.info(
    `[${config.id}] ${config.title} 알림 예약: ${notificationTime.toLocaleString()}`
  )

  return timeout
}

// 알림 관리 클래스
export class NotificationManager {
  private timeouts: Map<string, NodeJS.Timeout> = new Map()
  private repeatingConfigs: Map<string, RepeatingNotificationConfig> = new Map()

  // 알림 추가
  add(config: NotificationConfig): void {
    this.cancel(config.id)

    if (isRepeatingNotification(config)) {
      // 반복 알림
      this.repeatingConfigs.set(config.id, config)
      const timeout = scheduleRepeatingNotification(config, newTimeout => {
        this.timeouts.set(config.id, newTimeout)
      })

      if (timeout) {
        this.timeouts.set(config.id, timeout)
      }
    } else {
      // 일회성 알림
      const timeout = scheduleOneTimeNotification(config)
      if (timeout) {
        this.timeouts.set(config.id, timeout)
      }
    }
  }

  // 알림 취소
  cancel(id: string): void {
    const timeout = this.timeouts.get(id)
    if (timeout) {
      clearTimeout(timeout)
      this.timeouts.delete(id)
      this.repeatingConfigs.delete(id)
      toast.info(`[${id}] 알림 취소됨`)
    }
  }

  // 알림 업데이트
  update(config: NotificationConfig): void {
    this.add(config)
  }

  // 모든 알림 취소
  cancelAll(): void {
    this.timeouts.forEach((timeout, id) => {
      clearTimeout(timeout)
      toast.info(`[${id}] 알림 취소됨`)
    })
    this.timeouts.clear()
    this.repeatingConfigs.clear()
  }

  // 활성 알림 목록
  getActiveNotifications(): string[] {
    return Array.from(this.timeouts.keys())
  }

  // 반복 알림 목록
  getRepeatingNotifications(): string[] {
    return Array.from(this.repeatingConfigs.keys())
  }
}

// 알림 권한 요청
async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    toast.error('이 브라우저는 알림을 지원하지 않습니다.')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

// 초기화
export async function initializeNotifications(): Promise<NotificationManager> {
  await requestNotificationPermission()
  return new NotificationManager()
}

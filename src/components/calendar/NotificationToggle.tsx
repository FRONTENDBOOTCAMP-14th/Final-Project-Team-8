import { Bell, BellOff, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  getScheduleNotification,
  upsertNotification,
  type ScheduleType,
} from '@/libs/api/notification.api'
import { useScheduleStore } from '@/store/scheduleStore'
import { formatTime } from './ScheduleNotificationManager'

interface Props {
  scheduleId: string
  scheduleType: ScheduleType
  petId: string
}

/**
 * 일정 알림 설정 토글 컴포넌트
 * - schedule notifications 테이블에서 알림 설정 관리
 * - 알림 on/off 및 시간 설정
 */
export default function NotificationToggle({
  scheduleId,
  scheduleType,
  petId,
}: Props) {
  const [enabled, setEnabled] = useState(false)
  const [time, setTime] = useState('09:00')
  const [isTimeOpen, setIsTimeOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { refetchSchedules } = useScheduleStore()

  // 초기 알림 설정 로드
  useEffect(() => {
    const loadNotificationSettings = async () => {
      try {
        setIsLoading(true)
        const notification = await getScheduleNotification(
          scheduleType,
          scheduleId
        )

        if (notification) {
          setEnabled(notification.enabled)
          setTime(formatTime(notification.notification_time))
        }
      } catch (error) {
        toast.error(`알림 설정 로드 실패: ${error}`)
      } finally {
        setIsLoading(false)
      }
    }

    loadNotificationSettings()
  }, [scheduleId, scheduleType])

  const handleToggle = async () => {
    const newEnabled = !enabled

    try {
      setIsSaving(true)

      // schedule notifications 테이블에 저장
      await upsertNotification({
        schedule_type: scheduleType,
        schedule_id: scheduleId,
        pet_id: petId,
        enabled: newEnabled,
        notification_time: `${time}:00`,
      })

      setEnabled(newEnabled)
      toast.success(
        newEnabled ? '알림이 설정되었습니다' : '알림이 해제되었습니다'
      )

      // 스케줄 다시 불러와서 알림 매니저 업데이트
      await refetchSchedules(petId)
    } catch (error) {
      toast.error(`알림 설정에 실패했습니다: ${error}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handleTimeChange = async (newTime: string) => {
    if (!enabled) return

    try {
      setIsSaving(true)

      // schedule notifications 테이블 업데이트
      await upsertNotification({
        schedule_type: scheduleType,
        schedule_id: scheduleId,
        pet_id: petId,
        enabled,
        notification_time: `${newTime}:00`,
      })

      setTime(newTime)
      toast.success('알림 시간이 변경되었습니다')
      setIsTimeOpen(false)

      // 스케줄 다시 불러와서 알림 매니저 업데이트
      await refetchSchedules(petId)
    } catch (error) {
      toast.error(`시간 변경에 실패했습니다: ${error}`)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-xl bg-gray-50 p-4">
        <p className="text-sm text-gray-500">알림 설정 로딩 중...</p>
      </div>
    )
  }

  return (
    <div className="relative flex items-center gap-3 rounded-xl bg-gray-50 p-4">
      {/* 알림 상태 표시 */}
      <div className="flex flex-1 items-center gap-2">
        {enabled ? (
          <Bell height={20} width={20} className="h-5 w-5 text-[#FF6000]" />
        ) : (
          <BellOff height={20} width={20} className="h-5 w-5 text-gray-400" />
        )}
        <div>
          <p className="font-semibold text-gray-800">
            {enabled ? '알림 켜짐' : '알림 꺼짐'}
          </p>
          {enabled && (
            <p className="text-sm text-gray-500">{time}에 알림을 받습니다</p>
          )}
        </div>
      </div>

      {/* 시간 설정 버튼 */}
      {enabled && (
        <button
          type="button"
          onClick={() => setIsTimeOpen(!isTimeOpen)}
          disabled={isSaving}
          className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
        >
          <Clock height={16} width={16} className="h-4 w-4" />
          {time}
        </button>
      )}

      {/* 토글 버튼 */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={isSaving}
        className={`relative h-7 w-14 rounded-full transition-colors ${
          enabled ? 'bg-orange-500' : 'bg-gray-300'
        } ${isSaving ? 'opacity-50' : ''}`}
      >
        <span
          className={`absolute top-1 left-1 h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
            enabled ? 'translate-x-7' : 'translate-x-0'
          }`}
        />
      </button>

      {/* 시간 선택 드롭다운 */}
      {isTimeOpen && (
        <div className="absolute top-full right-0 z-10 mt-2 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
          <p className="mb-2 text-sm font-semibold text-gray-700">알림 시간</p>
          <input
            type="time"
            value={time}
            onChange={e => handleTimeChange(e.target.value)}
            disabled={isSaving}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none disabled:opacity-50"
          />
        </div>
      )}
    </div>
  )
}

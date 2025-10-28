import { Bell, BellOff, Clock, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  getScheduleNotification,
  upsertNotification,
} from '@/libs/api/notification.api'
import { useScheduleStore } from '@/store/scheduleStore'
import Button from '../ui/button/Button'
import { formatTime } from './ScheduleNotificationManager'
import type { ScheduleCategory } from './types'

interface Props {
  scheduleId?: string
  scheduleType: ScheduleCategory
  petId: string
  isShowToggle: boolean
  mode?: 'create' | 'edit'
  defaultEnabled?: boolean
  defaultTime?: string
  onChange?: (enabled: boolean, time: string) => void
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
  isShowToggle,
  mode = 'edit',
  defaultEnabled = false,
  defaultTime = '09:00',
  onChange,
}: Props) {
  const [enabled, setEnabled] = useState(defaultEnabled)
  const [time, setTime] = useState(defaultTime)
  const [isTimeOpen, setIsTimeOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(mode === 'edit')
  const { refetchSchedules } = useScheduleStore()
  const [tempTime, setTempTime] = useState(defaultTime)

  useEffect(() => {
    if (mode === 'edit' && scheduleId) {
      // 수정 모드일 때만 초기 알림 설정 로드
      const loadNotificationSettings = async () => {
        try {
          setIsLoading(true)
          const notification = await getScheduleNotification(
            scheduleType,
            scheduleId
          )

          if (notification) {
            const formattedTime = formatTime(notification.notification_time)
            setEnabled(notification.enabled)
            setTime(formatTime(formattedTime))
            setTempTime(formattedTime)
          }
        } catch (error) {
          toast.error(`알림 설정 로드 실패: ${error}`)
        } finally {
          setIsLoading(false)
        }
      }

      loadNotificationSettings()
    } else {
      // 생성 모드는 로딩 없음
      setIsLoading(false)
    }
  }, [scheduleId, scheduleType, mode])

  // 생성 모드일 때 부모에게 값 전달
  useEffect(() => {
    if (mode === 'create' && onChange) {
      onChange(enabled, time)
    }
  }, [enabled, time, mode, onChange])

  const handleToggle = async () => {
    const newEnabled = !enabled

    // 생성 모드: 로컬 상태만 변경
    if (mode === 'create') {
      setEnabled(newEnabled)
      if (onChange) {
        onChange(newEnabled, time)
      }
      return
    }

    // 수정 모드: DB에 저장
    if (!scheduleId) return

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

  const handleTimeOpen = () => {
    setTempTime(time)
    setIsTimeOpen(true)
  }

  const handleTimeCancel = () => {
    setTempTime(time)
    setIsTimeOpen(false)
  }

  const handleTimeConfirm = async () => {
    // 생성 모드: 로컬 상태만 변경
    if (mode === 'create') {
      setTime(tempTime)
      setIsTimeOpen(false)
      if (onChange) {
        onChange(enabled, tempTime)
      }
      return
    }

    // 수정 모드: DB에 저장
    if (!enabled || !scheduleId) {
      setIsTimeOpen(false)
      return
    }

    try {
      setIsSaving(true)

      await upsertNotification({
        schedule_type: scheduleType,
        schedule_id: scheduleId,
        pet_id: petId,
        enabled,
        notification_time: `${tempTime}:00`,
      })

      setTime(tempTime)
      toast.success('알림 시간이 변경되었습니다')
      setIsTimeOpen(false)

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
    <div className="relative mt-3 flex items-center gap-3 rounded-xl bg-gray-50 p-4">
      {/* 알림 상태 표시 */}
      <div className="flex flex-1 items-center gap-2">
        {enabled ? (
          <Bell
            aria-hidden="true"
            height={20}
            width={20}
            className="h-5 w-5 text-[#FF6000]"
          />
        ) : (
          <BellOff
            aria-hidden="true"
            height={20}
            width={20}
            className="h-5 w-5 text-gray-400"
          />
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
      {enabled && isShowToggle && (
        <button
          type="button"
          onClick={handleTimeOpen}
          disabled={isSaving}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
        >
          <Clock height={16} width={16} className="h-4 w-4" />
          {time}
        </button>
      )}

      {/* 토글 버튼 */}
      {isShowToggle && (
        <button
          type="button"
          onClick={handleToggle}
          disabled={isSaving}
          className={`relative h-7 w-14 cursor-pointer rounded-full transition-colors ${
            enabled ? 'bg-orange-500' : 'bg-gray-300'
          } ${isSaving ? 'opacity-50' : ''}`}
        >
          <span
            className={`absolute top-1 left-1 h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
              enabled ? 'translate-x-7' : 'translate-x-0'
            }`}
          />
        </button>
      )}

      {/* 시간 선택 드롭다운 */}
      {isTimeOpen && (
        <div className="absolute top-full right-0 z-10 mt-2 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
          <p className="mb-2 text-sm font-semibold text-gray-700">알림 시간</p>
          {/* 시간 입력 */}
          <input
            type="time"
            value={tempTime}
            onChange={e => setTempTime(e.target.value)}
            disabled={isSaving}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none disabled:opacity-50"
          />
          {/* 확인/취소 버튼 */}
          <div className="mt-3 flex gap-2">
            <Button
              variant="white"
              onClick={handleTimeCancel}
              disabled={isSaving}
            >
              취소
            </Button>
            <Button
              variant="orange"
              onClick={handleTimeConfirm}
              disabled={isSaving}
            >
              {isSaving ? '저장 중...' : '확인'}
            </Button>
          </div>
          {/* 닫기 버튼 */}
          <button
            type="button"
            onClick={handleTimeCancel}
            className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-gray-600"
            aria-label="닫기"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

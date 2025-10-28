'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import createActivity from '@/libs/api/activity.api'
import { usePetStore } from '@/store/petStore'
import { useScheduleStore } from '@/store/scheduleStore'
import { tw } from '@/utils/shared'
import { upsertNotification } from '../../../libs/api/notification.api'
import ListLoading from '../../accordion/ListLoading'
import NotificationToggle from '../../calendar/NotificationToggle'
import type { ScheduleCategory } from '../../calendar/types'
import Button from '../../ui/button/Button'
import type { ModalInputDataType } from '../ModalType/ModalType'
import type { ModalDetailInpuProps } from './ModalDetailType'

export function ModalDetailInput({
  type,
  title,
  fields,
  sectionTitle = '상세',
  noteLabel = '특이 사항',
  defaultNote = '특이 사항 없음',
  noteTextareaProps,
  onClose,
  onSaveSuccess,
  scheduleType,
}: ModalDetailInpuProps & {
  scheduleType?: ScheduleCategory
}) {
  const { register, handleSubmit, formState, getFieldState, reset } =
    useForm<ModalInputDataType>({
      mode: 'all',
      reValidateMode: 'onSubmit',
    })

  const { errors, isSubmitting } = formState

  const pet_id = usePetStore(s => s.selectedPetId) as string

  const queryClient = useQueryClient()

  const [notificationEnabled, setNotificationEnabled] = useState(false)
  const [notificationTime, setNotificationTime] = useState('09:00')

  const mutation = useMutation({
    mutationFn: (payload: ModalInputDataType) =>
      createActivity({ setData: payload, type, pet_id }),
    onSuccess: async data => {
      toast.success('저장 완료!')

      // 알림 설정
      if (notificationEnabled && scheduleType && data?.id) {
        try {
          await upsertNotification({
            schedule_type: scheduleType,
            schedule_id: data.id,
            pet_id,
            enabled: true,
            notification_time: `${notificationTime}:00`,
          })
          toast.success('알림이 설정되었습니다!')

          await new Promise(resolve => setTimeout(resolve, 100))
        } catch (error) {
          toast.error(`알림 설정에 실패했습니다. ${error}`)
        }
      }

      await queryClient.invalidateQueries({
        refetchType: 'active',
        queryKey: ['petTable', type, pet_id],
      })

      // 캘린더 갱신
      const { refetchSchedules } = useScheduleStore.getState()
      await refetchSchedules(pet_id)

      reset()

      if (onSaveSuccess) {
        onSaveSuccess()
      } else {
        onClose?.()
      }
    },
    onError: (err: unknown) => {
      // 서버에서 필드 에러 내주면 여기 매핑
      const message =
        err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.'
      toast.error(message)
    },
  })

  if (!pet_id) {
    toast.error('추가할 펫이 지정되지 않았습니다.')
  }

  if (isSubmitting || mutation.isPending) {
    return <ListLoading />
  }

  return (
    <form
      onSubmit={handleSubmit(setData => {
        mutation.mutate(setData)
      })}
    >
      {/* 알림 설정 */}
      {scheduleType && (
        <NotificationToggle
          mode="create"
          scheduleType={scheduleType}
          petId={pet_id}
          isShowToggle={true}
          defaultEnabled={notificationEnabled}
          defaultTime={notificationTime}
          onChange={(enabled, time) => {
            setNotificationEnabled(enabled)
            setNotificationTime(time)
          }}
        />
      )}
      <label htmlFor="text-input-title" className="sr-only">
        제목
      </label>
      <input
        id="text-input-title"
        type="text"
        defaultValue={title ?? ''}
        placeholder="제목을 입력해주세요"
        className={tw(
          'mt-3 w-full grow rounded-md border-2 border-gray-300 p-2 focus:border-amber-400 focus:outline-none',
          'h-15 pl-3 text-2xl',
          errors.title
            ? 'border-red-400 ring-red-300'
            : 'border-gray-300 ring-blue-300'
        )}
        {...register('title', { required: '제목을 작성해주세요.' })}
      />
      {errors.title && (
        <div
          role="alert"
          id="Modal-title-error"
          className="mt-2 ml-3 text-sm text-red-500"
        >
          {errors.title.message}
        </div>
      )}
      {/* 섹션 타이틀 */}
      <div className="mt-8 text-[18px] font-bold text-gray-800">
        {sectionTitle}
      </div>

      {/* 필드 리스트 */}
      <ul className="flex flex-wrap items-start gap-4">
        {fields.map(
          ({
            requiredSet,
            key,
            label,
            type,
            defaultValue,
            inputProps,
            min,
            max,
          }) => {
            const { error } = getFieldState(key, formState)
            return (
              <li
                key={key}
                className="mt-3 flex min-w-[220px] flex-1 basis-0 items-center"
              >
                {/* 각 컬럼 좌측 세로 구분선 */}
                <div className="mr-3 h-[70px] w-[2px] flex-shrink-0 rounded-xl bg-gray-200" />
                <div className="mt-1 flex w-full flex-col">
                  <div className="text-base text-gray-700">{label}</div>

                  {/* 모드별 렌더링 */}

                  <div className="mt-1">
                    {/* 입력 컨트롤 */}
                    <label htmlFor={key} className="sr-only">
                      {label} 입력
                    </label>
                    <input
                      id={key}
                      type={type}
                      defaultValue={defaultValue ?? ''}
                      className={tw(
                        'h-10 w-full rounded-md border-1 border-gray-400 p-1 pl-3 text-lg focus:border-amber-400 focus:outline-none',
                        error && 'border-red-400 ring-red-300'
                      )}
                      {...inputProps}
                      {...register(key, {
                        required: requiredSet ?? false,
                        ...(min !== undefined && {
                          min: {
                            value: min,
                            message: `${min} 이상의 값을 입력해주세요`,
                          },
                        }),
                        ...(max !== undefined && {
                          max: {
                            value: max,
                            message: `${max} 이하의 값을 입력해주세요`,
                          },
                        }),
                      })}
                    />

                    {error?.message && (
                      <div
                        role="alert"
                        id={`Modal-${key}-error`}
                        className="mt-2 ml-3 text-sm text-red-500"
                      >
                        {error.message}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            )
          }
        )}
      </ul>

      {type !== 'walks' && (
        <>
          {/* 특이 사항 섹션 */}
          <div className="mt-4 text-[18px] font-bold text-gray-800">
            {noteLabel}
          </div>

          <div className="relative mt-3 mb-3 flex w-full">
            {/* 왼쪽 세로 구분선 */}
            <span className="absolute left-0 inline-block h-full w-[2px] rounded-xl bg-gray-300" />

            <div className="ml-4 flex w-full">
              <label htmlFor="detail-note" className="sr-only">
                {noteLabel} 입력
              </label>
              <textarea
                defaultValue={defaultNote === '-' ? '' : defaultNote}
                className="w-full rounded-md border-1 border-gray-400 p-2 focus:border-amber-400 focus:outline-none"
                rows={3}
                {...noteTextareaProps}
                {...register('notes')}
              />
            </div>
          </div>
        </>
      )}
      <div className="mt-6 flex gap-5">
        <Button onClick={onClose}>취소</Button>
        <Button type="submit">저장</Button>
      </div>
    </form>
  )
}

'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Calendar, Clock } from 'lucide-react'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'sonner'
import {
  insertScheduledMeal,
  updateScheduledMeal,
} from '../../../libs/api/activity.api'
import type { ScheduledMeals } from '../../../libs/supabase'

type MealTimeModalProps =
  | {
      mode: 'create'
      petId: string
      onClose: () => void
      initialData?: never
    }
  | {
      mode: 'edit'
      initialData: ScheduledMeals
      onClose: () => void
      petId?: never
    }

type MealFormData = Omit<ScheduledMeals, 'id'>

export default function MealTimeModal(props: MealTimeModalProps) {
  const { mode, onClose } = props
  const queryClient = useQueryClient()

  // 초기 데이터 설정
  const getDefaultValues = (): MealFormData => {
    if (mode === 'edit') {
      const { ...rest } = props.initialData
      return rest
    }
    return {
      pet_id: props.petId,
      time: '09:00',
      title: '',
      toggle: true,
      weekday: '매일',
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<MealFormData>({
    defaultValues: getDefaultValues(),
    mode: 'onChange',
  })

  const weekdays = ['매일', '월', '화', '수', '목', '금', '토', '일']
  const currentWeekday = watch('weekday')

  const handleWeekdayToggle = (day: string) => {
    if (day === '매일') {
      setValue('weekday', '매일', { shouldValidate: true })
    } else {
      const currentWeekdays = currentWeekday
        ? currentWeekday.split(',').filter(d => d !== '매일')
        : []

      if (currentWeekdays.includes(day)) {
        const newWeekdays = currentWeekdays.filter(d => d !== day)
        setValue(
          'weekday',
          newWeekdays.length > 0 ? newWeekdays.join(',') : '매일',
          { shouldValidate: true }
        )
      } else {
        setValue('weekday', [...currentWeekdays, day].join(','), {
          shouldValidate: true,
        })
      }
    }
  }

  // Mutation 설정
  const mutation = useMutation({
    mutationFn: async (data: MealFormData) => {
      if (mode === 'create') {
        return await insertScheduledMeal(data)
      } else {
        return await updateScheduledMeal(data, props.initialData.id)
      }
    },
    onSuccess: () => {
      const message =
        mode === 'create'
          ? '식사 시간이 추가되었습니다!'
          : '식사 시간이 수정되었습니다!'
      toast.success(message)
      queryClient.invalidateQueries({
        queryKey: [
          'ScheduledMeals',
          props.mode === 'create' ? props.petId : props.initialData.pet_id,
        ],
      })
      onClose()
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : '저장 중 오류가 발생했습니다.'
      toast.error(message)
    },
  })

  const onSubmit = (data: MealFormData) => {
    mutation.mutate(data)
  }

  // weekday를 배열로 변환 (표시용)
  const selectedWeekdays = currentWeekday ? currentWeekday.split(',') : ['매일']

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">
          {mode === 'create' ? '식사 시간 추가' : '식사 시간 편집'}
        </h2>
      </div>

      {/* Body */}
      <div className="space-y-6 p-6">
        {/* 제목 입력 */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            식사 이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('title', {
              required: '식사 이름을 입력해주세요',
              minLength: {
                value: 1,
                message: '식사 이름은 최소 1글자 이상이어야 합니다',
              },
            })}
            className={`w-full rounded-xl border-2 px-4 py-3 transition-colors focus:outline-none ${
              errors.title
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-200 focus:border-orange-500'
            }`}
            placeholder="예: 아침, 점심, 저녁"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* 요일 선택 */}
        <div>
          <label className="mb-3 block text-sm font-semibold text-gray-700">
            <Calendar className="mr-2 inline" size={18} />
            요일 선택 <span className="text-red-500">*</span>
          </label>
          <input type="hidden" {...register('weekday', { required: true })} />
          <div className="flex flex-wrap gap-2">
            {weekdays.map(day => (
              <button
                key={day}
                type="button"
                onClick={() => handleWeekdayToggle(day)}
                className={`cursor-pointer rounded-lg px-4 py-2 font-medium transition-all ${
                  selectedWeekdays.includes(day)
                    ? 'scale-105 bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* 시간 선택 */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            <Clock className="mr-2 inline" size={18} />
            시간 설정 <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            {...register('time', {
              required: '시간을 설정해주세요',
            })}
            className={`w-full rounded-xl border-2 px-4 py-3 text-lg transition-colors focus:outline-none ${
              errors.time
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-200 focus:border-orange-500'
            }`}
          />
          {errors.time && (
            <p className="mt-1 text-sm text-red-500">{errors.time.message}</p>
          )}
        </div>

        {/* 알림 토글 */}
        <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
          <div>
            <p className="font-semibold text-gray-800">알림 활성화</p>
            <p className="text-sm text-gray-500">
              설정한 시간에 알림을 받습니다
            </p>
          </div>
          <Controller
            name="toggle"
            control={control}
            render={({ field }) => (
              <button
                type="button"
                onClick={() => field.onChange(!field.value)}
                className={`relative h-8 w-14 cursor-pointer rounded-full transition-colors ${
                  field.value ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform ${
                    field.value ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            )}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex gap-3 rounded-2xl bg-gray-50 px-6 py-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 cursor-pointer rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={mutation.isPending || isSubmitting}
          className="flex-1 transform cursor-pointer rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {mutation.isPending || isSubmitting
            ? '저장 중...'
            : mode === 'create'
              ? '추가'
              : '저장'}
        </button>
      </div>
    </form>
  )
}

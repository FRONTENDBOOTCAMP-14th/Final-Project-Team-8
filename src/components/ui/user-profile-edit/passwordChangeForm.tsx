'use client'

import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components'
import { tw } from '@/utils/shared'

interface PasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function PasswordChangeForm() {
  const { register, handleSubmit, formState, watch, reset } =
    useForm<PasswordFormData>()
  const { errors } = formState

  const mutation = useMutation({
    mutationFn: async (data: PasswordFormData) => {
      // 비밀번호 변경 API 호출
      // await updatePassword(data)
      console.log('비밀번호 변경:', data)

      // 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000))
    },
    onSuccess: () => {
      toast.success('비밀번호가 변경되었습니다.')
      reset()
    },
    onError: (err: unknown) => {
      const message =
        err instanceof Error
          ? err.message
          : '비밀번호 변경 중 오류가 발생했습니다.'
      toast.error(message)
    },
  })

  const onSubmit = (data: PasswordFormData) => {
    mutation.mutate(data)
  }

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <h2 className="text-[18px] font-bold text-[#3A394F]">비밀번호 변경</h2>

        {/* 현재 비밀번호 */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="currentPassword"
            className="text-sm font-medium text-[#3A394F]"
          >
            현재 비밀번호
          </label>
          <input
            type="password"
            id="currentPassword"
            className={tw(
              'rounded-lg border border-[#E0E0E8] bg-white px-4 py-2.5 text-sm text-[#3A394F] transition-colors placeholder:text-[#B8B8C8] focus:border-[#FF6B2C] focus:ring-1 focus:ring-[#FF6B2C] focus:outline-none',
              errors.currentPassword ? 'border-red-400' : ''
            )}
            placeholder="현재 비밀번호"
            {...register('currentPassword', {
              required: '현재 비밀번호를 입력해주세요',
            })}
          />
          {errors.currentPassword && (
            <div className="text-xs text-red-400">
              {errors.currentPassword.message}
            </div>
          )}
        </div>

        {/* 새 비밀번호 */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="newPassword"
            className="text-sm font-medium text-[#3A394F]"
          >
            새 비밀번호
          </label>
          <input
            type="password"
            id="newPassword"
            className={tw(
              'rounded-lg border border-[#E0E0E8] bg-white px-4 py-2.5 text-sm text-[#3A394F] transition-colors placeholder:text-[#B8B8C8] focus:border-[#FF6B2C] focus:ring-1 focus:ring-[#FF6B2C] focus:outline-none',
              errors.newPassword ? 'border-red-400' : ''
            )}
            placeholder="새 비밀번호"
            {...register('newPassword', {
              required: '새 비밀번호를 입력해주세요',
              minLength: {
                value: 8,
                message: '비밀번호는 최소 8자 이상이어야 합니다',
              },
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
                message: '비밀번호는 영문과 숫자를 포함해야 합니다',
              },
            })}
          />
          {errors.newPassword && (
            <div className="text-xs text-red-400">
              {errors.newPassword.message}
            </div>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-[#3A394F]"
          >
            비밀번호 확인
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={tw(
              'rounded-lg border border-[#E0E0E8] bg-white px-4 py-2.5 text-sm text-[#3A394F] transition-colors placeholder:text-[#B8B8C8] focus:border-[#FF6B2C] focus:ring-1 focus:ring-[#FF6B2C] focus:outline-none',
              errors.confirmPassword ? 'border-red-400' : ''
            )}
            placeholder="비밀번호 확인"
            {...register('confirmPassword', {
              required: '비밀번호를 다시 입력해주세요',
              validate: value =>
                value === watch('newPassword') ||
                '비밀번호가 일치하지 않습니다',
            })}
          />
          {errors.confirmPassword && (
            <div className="text-xs text-red-400">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-3 border-t border-[#E8E8F0] pt-5">
          <Button
            type="button"
            variant="gray"
            onClick={() => reset()}
            disabled={mutation.isPending}
          >
            초기화
          </Button>
          <Button type="submit" variant="orange" disabled={mutation.isPending}>
            {mutation.isPending ? '변경 중...' : '비밀번호 변경'}
          </Button>
        </div>
      </form>

      {/* 계정 삭제 */}
      <div className="rounded-lg border border-[#FFE5DC] bg-[#FFF5F1] p-5">
        <h3 className="mb-1 text-sm font-semibold text-[#D83A00]">계정 삭제</h3>
        <p className="mb-3 text-xs leading-relaxed text-[#FF6B2C]">
          계정 삭제 시 모든 데이터가 영구적으로 삭제됩니다.
        </p>
        <button
          type="button"
          className="rounded-lg border border-[#FFCDB8] bg-white px-4 py-2 text-sm font-medium text-[#D83A00] transition-colors hover:bg-[#FFF5F1]"
        >
          계정 삭제
        </button>
      </div>
    </div>
  )
}

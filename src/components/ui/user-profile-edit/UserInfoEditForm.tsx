'use client'

import { Mars, Venus } from 'lucide-react'
import { useEffect, useImperativeHandle, useState, type RefObject } from 'react'
import { useForm } from 'react-hook-form'
import type { Users } from '@/libs/supabase'
import { tw } from '@/utils/shared'

interface UserInfoEditFormProps {
  userData: Users
  ref: RefObject<HTMLFormElement> | RefObject<null> // null이 아니라 HTMLFormElement
  userDataSubmit: (data: Users) => void // 함수 타입 지정
}

export default function UserInfoEditForm({
  userData,
  ref,
  userDataSubmit,
}: UserInfoEditFormProps) {
  const { birthday, email, gender, id, nickname, phone, profile_img } = userData

  const { register, handleSubmit, setValue, formState, getFieldState, reset } =
    useForm<Users>()
  const [isGender, setGender] = useState<'남성' | '여성' | null>(null)

  const { errors, isLoading } = formState

  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(userDataSubmit)(),
  }))

  // userData가 로드되면 성별 상태 초기화
  useEffect(() => {
    if (userData?.gender === '남성' || userData?.gender === '남자') {
      setGender('남성')
    }
    if (userData?.gender === '여성' || userData?.gender === '여자') {
      setGender('여성')
    }
  }, [userData])
  return (
    <form
      ref={ref}
      onSubmit={handleSubmit(userDataSubmit)}
      className="mt-10 flex h-full flex-1 gap-10"
    >
      {/* 왼쪽 컬럼 */}
      <div className="flex w-full flex-col gap-6">
        {/* 프로필 사진 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-[18px] font-bold text-[#3A394F]">프로필 사진</h2>
          <div className="flex items-center gap-5">
            <div className="relative h-30 w-30 overflow-hidden rounded-full bg-[#E8E8F0]">
              {userData?.profile_img ? (
                <img
                  src={userData.profile_img}
                  alt="프로필"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                      fill="#8B8BA3"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                className="rounded-lg border border-[#E0E0E8] bg-white px-4 py-2 text-sm font-bold text-[#3A394F] transition-colors hover:bg-[#F8F8FA]"
              >
                사진 변경
              </button>
              <button
                type="button"
                className="text-sm font-bold text-[#FF6B2C] transition-colors hover:text-[#E55A1F]"
              >
                삭제
              </button>
            </div>
          </div>
        </div>

        {/* 기본 정보 */}
        <div className="flex flex-col gap-5">
          <h2 className="text-[18px] font-bold text-[#3A394F]">기본 정보</h2>

          {/* 이름 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nickname"
              className="text-sm font-bold text-[#3A394F]"
            >
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              defaultValue={nickname ?? ''}
              className={tw(
                'rounded-lg border border-[#E0E0E8] bg-white px-4 py-2.5 text-sm text-[#3A394F] transition-colors placeholder:text-[#B8B8C8] focus:border-[#FF6B2C] focus:ring-1 focus:ring-[#FF6B2C] focus:outline-none',
                errors.nickname ? 'border-1sdf border-red-400' : ''
              )}
              placeholder="이름을 입력하세요"
              {...register('nickname', { required: '닉네임을 작성해주세요' })}
            />
            {errors.nickname && (
              <div className="text-xs text-red-400">
                {errors.nickname.message}
              </div>
            )}
          </div>

          {/* 생년월일 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="birthdate"
              className="text-sm font-bold text-[#3A394F]"
            >
              생년월일
            </label>
            <input
              type="date"
              id="birthdate"
              defaultValue={birthday ?? ''}
              className={tw(
                'rounded-lg border border-[#E0E0E8] bg-white px-4 py-2.5 text-sm text-[#3A394F] transition-colors focus:border-[#FF6B2C] focus:ring-1 focus:ring-[#FF6B2C] focus:outline-none',
                errors.birthday ? 'border-red-400' : ''
              )}
              {...register('birthday', {
                required: '생년월일을 작성해주세요',
              })}
            />
            {errors.birthday && (
              <div className="text-xs text-red-400">
                {errors.birthday.message}
              </div>
            )}
          </div>

          {/* 이메일 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-bold text-[#3A394F]">
              이메일
            </label>
            <input
              type="email"
              id="email"
              defaultValue={email}
              className={tw(
                'rounded-lg border border-[#E0E0E8] bg-white px-4 py-2.5 text-sm text-[#3A394F] transition-colors focus:border-[#FF6B2C] focus:ring-1 focus:ring-[#FF6B2C] focus:outline-none',
                errors.email ? 'border-red-400' : ''
              )}
              placeholder="email@example.com"
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '올바른 이메일 형식이 아닙니다.',
                },
              })}
            />
            {errors.email && (
              <div className="text-xs text-red-400">{errors.email.message}</div>
            )}
          </div>

          {/* 전화번호 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm font-bold text-[#3A394F]">
              전화번호
            </label>
            <input
              type="tel"
              id="phone"
              defaultValue={phone ?? ''}
              className="rounded-lg border border-[#E0E0E8] bg-white px-4 py-2.5 text-sm text-[#3A394F] transition-colors placeholder:text-[#B8B8C8] focus:border-[#FF6B2C] focus:ring-1 focus:ring-[#FF6B2C] focus:outline-none"
              placeholder="010-0000-0000"
              {...register('phone', {
                validate: value =>
                  value === '' ||
                  /^01[0-9]-\d{3,4}-\d{4}$/.test(value as string) ||
                  '휴대폰 번호 형식(010-0000-0000)에 맞게 입력해주세요.',
              })}
            />
            {errors.phone && (
              <div className="text-xs text-red-400">{errors.phone.message}</div>
            )}
          </div>

          {/* 성별 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#3A394F]">성별</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setGender('남성')
                  setValue('gender', '남성')
                }}
                className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                  isGender === '남성'
                    ? 'border-[#FF6B2C] bg-[#FFF5F1] text-[#FF6B2C]'
                    : 'border-[#E0E0E8] bg-white text-[#80809A] hover:bg-[#F8F8FA]'
                }`}
              >
                <span className="flex h-full w-full items-center justify-center gap-2">
                  <Mars />
                  남자
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setGender('여성')
                  setValue('gender', '여성')
                }}
                className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                  isGender === '여성'
                    ? 'border-[#FF6B2C] bg-[#FFF5F1] text-[#FF6B2C]'
                    : 'border-[#E0E0E8] bg-white text-[#80809A] hover:bg-[#F8F8FA]'
                }`}
              >
                <span className="flex h-full w-full items-center justify-center gap-2">
                  <Venus />
                  여자
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

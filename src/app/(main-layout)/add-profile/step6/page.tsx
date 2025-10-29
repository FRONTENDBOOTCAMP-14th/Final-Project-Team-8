'use client'

import { Cake, House, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AddProfileLayout } from '@/components/add-profile/AddProfileLayout'
import CalendarModal from '@/components/calendar/CalendarModal'
import { NotLogin } from '@/components/ui/status/EmptyState'
import { Loading } from '@/components/ui/status/Loading'
import { usePageStatus } from '@/hooks/usePageStatus'
import { createClient } from '@/libs/supabase/client'
import { usePetStore } from '@/store/petStore'
import { useProfileCreationStore } from '@/store/profileCreationStore'

const supabase = createClient()

type DateType = 'birthdate' | 'adoption_date'

export default function Step6ImportantDatesPage() {
  const router = useRouter()
  const { draftPet, updateDraftPet, resetDraftPet, setCurrentStep } =
    useProfileCreationStore()
  const { fetchPetSummary } = usePetStore()

  const [birthdate, setBirthdate] = useState<Date | null>(
    draftPet.birthdate ? new Date(draftPet.birthdate) : null
  )
  const [adoptionDate, setAdoptionDate] = useState<Date | null>(
    draftPet.adoption_date ? new Date(draftPet.adoption_date) : null
  )
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [currentDateType, setCurrentDateType] = useState<DateType>('birthdate')
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setCurrentStep(6)
  }, [setCurrentStep])

  // 나이 계산 함수
  const calculateAge = (date: Date): string => {
    const today = new Date()
    const birth = new Date(date)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--
    }

    return `${age}살`
  }

  // 날짜 포맷팅 함수
  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}년 ${month}월 ${day}일`
  }

  // 캘린더 열기
  const openCalendar = (type: DateType) => {
    setCurrentDateType(type)
    setIsCalendarOpen(true)
  }

  // 날짜 선택 핸들러 (CalendarModal의 onDayClick에서 Date 객체를 받음)
  const handleDateSelect = (date: Date) => {
    if (currentDateType === 'birthdate') {
      setBirthdate(date)
    } else {
      setAdoptionDate(date)
    }
    setIsCalendarOpen(false)
  }

  // 최종 저장 및 완료
  const handleComplete = async () => {
    try {
      setIsUpdating(true)

      // 날짜를 ISO 문자열로 변환
      const birthdateISO = birthdate
        ? birthdate.toISOString().split('T')[0]
        : null
      const adoptionDateISO = adoptionDate
        ? adoptionDate.toISOString().split('T')[0]
        : null

      // Store 업데이트
      updateDraftPet({
        birthdate: birthdateISO as string | null,
        adoption_date: adoptionDateISO as string | null,
      })

      // 최종적으로 DB에 저장 (모든 데이터 일괄 저장)
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('사용자 인증 정보를 찾을 수 없습니다')
      }

      // 숫자 값을 정수로 변환하는 헬퍼 함수
      // Supabase의 size 필드는 int2(smallint, 즉 정수) 타입이므로
      // 문자열이나 소수점 값을 정수로 변환해야 함
      // 예 : '
      const toInteger = (
        value: number | string | null | undefined
      ): number | null => {
        if (value === null || value === undefined) return null
        const num = typeof value === 'string' ? parseFloat(value) : value
        return isNaN(num) ? null : Math.round(num)
      }

      const petData: {
        name: string
        profile_img: string | null
        species: string
        breed: string | null
        birthdate: string | null
        adoption_date: string | null
        weight: number | null
        size: number | null
      } = {
        name: draftPet.name ?? '이름 없음',
        profile_img: draftPet.profile_img ?? null,
        species: draftPet.species ?? '',
        breed: draftPet.breed ?? null,
        birthdate: birthdateISO ?? null,
        adoption_date: adoptionDateISO ?? null,
        weight: draftPet.weight ?? null,
        size: toInteger(draftPet.size),
      }

      if (draftPet.id) {
        const { error } = await supabase
          .from('pets')
          .update(petData)
          .eq('id', draftPet.id)

        if (error) {
          alert(`업데이트 오류: ${error.message}\n코드: ${error.code}`)
          throw error
        }
      } else {
        const { error } = await supabase.from('pets').insert({
          user_id: user.id,
          ...petData,
        })

        if (error) {
          // 에러 상세 정보 출력 (개발용)
          alert(`저장 오류: ${error.message}\n코드: ${error.code}`)
          throw error
        }
      }

      resetDraftPet()

      // 최신 반려동물 리스트 다시 불러오기
      await fetchPetSummary(user)

      router.push('/dashboard')
    } catch {
      alert('프로필 정보를 저장하는 중 문제가 발생했습니다')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleSkip = async () => {
    await handleComplete()
  }

  const { user, isLoading } = usePageStatus()

  if (isLoading) return <Loading />
  if (!user) return <NotLogin />

  return (
    <AddProfileLayout
      stepTitle="우리 아이의 기념일"
      onSkip={handleSkip}
      onComplete={handleComplete}
      nextDisabled={isUpdating}
    >
      <div className="flex flex-col items-center">
        {/* Profile Image */}
        <div className="mt-8 mb-12">
          <div className="relative flex items-center justify-center">
            <div
              aria-hidden="true"
              className="absolute h-40 w-40 rounded-full border border-gray-200"
            ></div>
            <div
              aria-hidden="true"
              className="absolute h-32 w-32 rounded-full border border-gray-100"
            ></div>

            <div className="relative z-10 h-24 w-24 overflow-hidden rounded-full bg-gray-100">
              {draftPet.profile_img ? (
                <Image
                  src={draftPet.profile_img}
                  alt={`${draftPet.name ?? '반려동물'}의 프로필 사진`}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                  <svg
                    aria-hidden="true"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8 text-center">
          <h3 className="mb-2 text-lg text-gray-900">
            우리 아이에게 특별한 날들은 언제인가요?
          </h3>
          <p className="text-sm text-gray-500">
            소중한 순간들을 기록하고 함께 축하해요
          </p>
        </div>

        {/* Date Selection Buttons */}
        <div className="w-full max-w-md space-y-4">
          {/* 생일 */}
          {birthdate ? (
            <button
              type="button"
              onClick={() => openCalendar('birthdate')}
              className="flex w-full items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#FF6000] hover:shadow-md focus:ring-2 focus:ring-[#FF6000] focus:ring-offset-2 focus:outline-none"
              aria-label="생일 수정하기"
            >
              <span
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50"
                aria-hidden="true"
              >
                <Cake className="text-[#FF6000]" />
              </span>
              <span className="flex flex-1 flex-col items-start">
                <span className="text-sm font-medium text-[#80809A]">생일</span>
                <span className="text-base font-bold text-[#3A394F]">
                  {formatDate(birthdate)}
                </span>
              </span>
              <span className="border-l-2 border-gray-100 py-2 pl-5">
                <span className="mr-1 text-2xl font-bold text-[#3A394F]">
                  {birthdate.getFullYear() !== new Date().getFullYear()
                    ? new Date().getFullYear() - birthdate.getFullYear()
                    : calculateAge(birthdate).replace('살', '')}
                </span>
                <span className="text-sm font-medium text-[#80809A]">살</span>
              </span>
            </button>
          ) : (
            // 날짜가 선택되지 않는 경우 - 버튼 형태
            <button
              type="button"
              onClick={() => openCalendar('birthdate')}
              className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-[#FF6000] bg-white p-4 transition-all hover:bg-orange-50 focus:ring-2 focus:ring-[#FF6000] focus:ring-offset-2 focus:outline-none"
            >
              <Cake className="text-[#FF6000]" aria-hidden="true" />
              <span className="text-base font-semibold text-[#FF6000]">
                생일 추가하기
              </span>
            </button>
          )}

          {/* 입양일 */}
          {adoptionDate ? (
            <button
              type="button"
              onClick={() => openCalendar('adoption_date')}
              className="flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:border-[#FF6000] focus:ring-2 focus:ring-[#FF6000] focus:ring-offset-2 focus:outline-none"
              aria-label="입양일 수정하기"
            >
              <span
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50"
                aria-hidden="true"
              >
                <House className="text-[#FF6000]" />
              </span>
              <span className="flex flex-1 flex-col items-start">
                <span className="text-sm font-medium text-gray-500">
                  입양일
                </span>
                <span className="text-base font-bold text-gray-900">
                  {formatDate(adoptionDate)}
                </span>
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => openCalendar('adoption_date')}
              className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-[#FF6000] bg-white p-4 transition-all hover:bg-orange-50 focus:ring-2 focus:ring-[#FF6000] focus:ring-offset-2 focus:outline-none"
            >
              <House className="text-[#FF6000]" aria-hidden="true" />
              <span className="text-base font-semibold text-[#FF6000]">
                입양일 추가하기
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Calendar Modal */}
      {isCalendarOpen && (
        <div
          role="presentation"
          className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsCalendarOpen(false)}
        >
          <div
            role="dialog"
            aria-modal
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                {currentDateType === 'birthdate' ? '생일' : '입양일'} 선택
              </h2>
              <button
                type="button"
                onClick={() => setIsCalendarOpen(false)}
                className="cursor-pointer rounded p-1 text-gray-400 transition-colors hover:text-gray-600 focus:ring-2 focus:ring-[#FF6000] focus:outline-none"
                aria-label="닫기"
                title="닫기"
              >
                <X aria-hidden="true" />
              </button>
            </div>

            {/* CalendarModal 컴포넌트 */}
            <CalendarModal
              onDayClick={handleDateSelect}
              initialSelectedDate={
                currentDateType === 'birthdate' ? birthdate : adoptionDate
              }
            />
          </div>
        </div>
      )}
    </AddProfileLayout>
  )
}

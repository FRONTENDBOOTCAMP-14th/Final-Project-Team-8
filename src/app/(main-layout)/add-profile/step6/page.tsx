'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AddProfileLayout } from '@/components/add-profile/AddProfileLayout'
import CalendarModal from '@/components/calendar/CalendarModal'
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
  const [isLoading, setIsLoading] = useState(false)

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
      setIsLoading(true)

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
      // Supabase의 weight, size 필드는 int2(smallint, 즉 정수) 타입이므로
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
        weight: toInteger(draftPet.weight),
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
      setIsLoading(false)
    }
  }

  const handleSkip = async () => {
    await handleComplete()
  }

  return (
    <AddProfileLayout
      stepTitle="우리 아이의 기념일"
      onSkip={handleSkip}
      onComplete={handleComplete}
      nextDisabled={isLoading}
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
              onClick={() => openCalendar('birthdate')}
              className="flex w-full items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#FF6000] hover:shadow-md focus:ring-2 focus:ring-[#FF6000] focus:ring-offset-2 focus:outline-none"
              aria-label="생일 수정하기"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50">
                <svg
                  aria-hidden="true"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.99609 14.803C3.30809 14.938 3.65009 15.007 4.00009 15C4.38959 15.0082 4.77522 14.9214 5.12367 14.7472C5.47212 14.5729 5.77292 14.3165 6.00009 14C6.22726 13.6835 6.52807 13.4271 6.87652 13.2529C7.22497 13.0786 7.6106 12.9918 8.00009 13C8.38959 12.9918 8.77522 13.0786 9.12367 13.2529C9.47212 13.4271 9.77292 13.6835 10.0001 14C10.2273 14.3165 10.5281 14.5729 10.8765 14.7472C11.225 14.9214 11.6106 15.0082 12.0001 15C12.3896 15.0082 12.7752 14.9214 13.1237 14.7472C13.4721 14.5729 13.7729 14.3165 14.0001 14C14.2273 13.6835 14.5281 13.4271 14.8765 13.2529C15.225 13.0786 15.6106 12.9918 16.0001 13C16.3896 12.9918 16.7752 13.0786 17.1237 13.2529C17.4721 13.4271 17.7729 13.6835 18.0001 14C18.2273 14.3165 18.5281 14.5729 18.8765 14.7472C19.225 14.9214 19.6106 15.0082 20.0001 15C20.3501 15.007 20.6921 14.938 21.0041 14.803M3.00012 20H21.0001V12C21.0001 11.2043 20.6841 10.4413 20.1214 9.87868C19.5588 9.31607 18.7958 9 18.0001 9H6.00012C5.20447 9 4.44141 9.31607 3.8788 9.87868C3.31619 10.4413 3.00012 11.2043 3.00012 12V20ZM12.0001 4L13.4651 5.638C13.7265 5.91903 13.9016 6.26935 13.9693 6.64715C14.0371 7.02495 13.9947 7.41426 13.8472 7.76862C13.6997 8.12298 13.4534 8.42742 13.1376 8.64561C12.8219 8.86379 12.45 8.98651 12.0664 8.99911C11.6828 9.0117 11.3036 8.91365 10.9742 8.71665C10.6448 8.51964 10.379 8.23202 10.2086 7.88809C10.0382 7.54417 9.9704 7.15848 10.0132 6.77705C10.056 6.39563 10.2077 6.03458 10.4501 5.737L12.0001 4Z"
                    stroke="#FF6000"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-1 flex-col items-start">
                <span className="text-sm font-medium text-[#80809A]">생일</span>
                <span className="text-base font-bold text-[#3A394F]">
                  {formatDate(birthdate)}
                </span>
              </div>
              <div className="border-l-2 border-gray-100 py-2 pl-5">
                <span className="mr-1 text-2xl font-bold text-[#3A394F]">
                  {birthdate.getFullYear() !== new Date().getFullYear()
                    ? new Date().getFullYear() - birthdate.getFullYear()
                    : calculateAge(birthdate).replace('살', '')}
                </span>
                <span className="text-sm font-medium text-[#80809A]">살</span>
              </div>
            </button>
          ) : (
            // 날짜가 선택되지 않는 경우 - 버튼 형태
            <button
              onClick={() => openCalendar('birthdate')}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-[#FF6000] bg-white p-4 transition-all hover:bg-orange-50 focus:ring-2 focus:ring-[#FF6000] focus:ring-offset-2 focus:outline-none"
              aria-label="생일 추가하기"
            >
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.99609 14.803C3.30809 14.938 3.65009 15.007 4.00009 15C4.38959 15.0082 4.77522 14.9214 5.12367 14.7472C5.47212 14.5729 5.77292 14.3165 6.00009 14C6.22726 13.6835 6.52807 13.4271 6.87652 13.2529C7.22497 13.0786 7.6106 12.9918 8.00009 13C8.38959 12.9918 8.77522 13.0786 9.12367 13.2529C9.47212 13.4271 9.77292 13.6835 10.0001 14C10.2273 14.3165 10.5281 14.5729 10.8765 14.7472C11.225 14.9214 11.6106 15.0082 12.0001 15C12.3896 15.0082 12.7752 14.9214 13.1237 14.7472C13.4721 14.5729 13.7729 14.3165 14.0001 14C14.2273 13.6835 14.5281 13.4271 14.8765 13.2529C15.225 13.0786 15.6106 12.9918 16.0001 13C16.3896 12.9918 16.7752 13.0786 17.1237 13.2529C17.4721 13.4271 17.7729 13.6835 18.0001 14C18.2273 14.3165 18.5281 14.5729 18.8765 14.7472C19.225 14.9214 19.6106 15.0082 20.0001 15C20.3501 15.007 20.6921 14.938 21.0041 14.803M3.00012 20H21.0001V12C21.0001 11.2043 20.6841 10.4413 20.1214 9.87868C19.5588 9.31607 18.7958 9 18.0001 9H6.00012C5.20447 9 4.44141 9.31607 3.8788 9.87868C3.31619 10.4413 3.00012 11.2043 3.00012 12V20ZM12.0001 4L13.4651 5.638C13.7265 5.91903 13.9016 6.26935 13.9693 6.64715C14.0371 7.02495 13.9947 7.41426 13.8472 7.76862C13.6997 8.12298 13.4534 8.42742 13.1376 8.64561C12.8219 8.86379 12.45 8.98651 12.0664 8.99911C11.6828 9.0117 11.3036 8.91365 10.9742 8.71665C10.6448 8.51964 10.379 8.23202 10.2086 7.88809C10.0382 7.54417 9.9704 7.15848 10.0132 6.77705C10.056 6.39563 10.2077 6.03458 10.4501 5.737L12.0001 4Z"
                  stroke="#FF6000"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-base font-semibold text-[#FF6000]">
                생일 추가하기
              </span>
            </button>
          )}

          {/* 입양일 */}
          {adoptionDate ? (
            <button
              onClick={() => openCalendar('adoption_date')}
              className="flex w-full items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:border-[#FF6000] focus:ring-2 focus:ring-[#FF6000] focus:ring-offset-2 focus:outline-none"
              aria-label="입양일 수정하기"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50">
                <svg
                  aria-hidden="true"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 21V15C9 14.4696 9.21071 13.9609 9.58579 13.5858C9.96086 13.2107 10.4696 13 11 13H13C13.5304 13 14.0391 13.2107 14.4142 13.5858C14.7893 13.9609 15 14.4696 15 15V21M5 12H3L12 3L21 12H19V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V12Z"
                    stroke="#FF6000"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-1 flex-col items-start">
                <span className="text-sm font-medium text-gray-500">
                  입양일
                </span>
                <span className="text-base font-bold text-gray-900">
                  {formatDate(adoptionDate)}
                </span>
              </div>
            </button>
          ) : (
            <button
              onClick={() => openCalendar('adoption_date')}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-[#FF6000] bg-white p-4 transition-all hover:bg-orange-50 focus:ring-2 focus:ring-[#FF6000] focus:ring-offset-2 focus:outline-none"
              aria-label="입양일 추가하기"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 21V15C9 14.4696 9.21071 13.9609 9.58579 13.5858C9.96086 13.2107 10.4696 13 11 13H13C13.5304 13 14.0391 13.2107 14.4142 13.5858C14.7893 13.9609 15 14.4696 15 15V21M5 12H3L12 3L21 12H19V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V12Z"
                  stroke="#FF6000"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

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
          className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsCalendarOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">
                {currentDateType === 'birthdate' ? '생일' : '입양일'} 선택
              </h3>
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="rounded p-1 text-gray-400 transition-colors hover:text-gray-600 focus:ring-2 focus:ring-[#FF6000] focus:outline-none"
                aria-label="닫기"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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

'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ImgCardButton } from '@/components'
import { AddProfileLayout } from '@/components/add-profile/AddProfileLayout'
import { NotLogin } from '@/components/ui/status/EmptyState'
import { Loading } from '@/components/ui/status/Loading'
import { usePageStatus } from '@/hooks/usePageStatus'
import { useProfileCreationStore } from '@/store/profileCreationStore'

const SPECIES_OPTIONS = [
  { id: 'dog', value: 'dog', label: '강아지' },
  { id: 'cat', value: 'cat', label: '고양이' },
  { id: 'fish', value: 'fish', label: '물고기' },
  { id: 'bird', value: 'bird', label: '새' },
  { id: 'hamster', value: 'hamster', label: '햄스터' },
  { id: 'rabbit', value: 'rabbit', label: '토끼' },
  { id: 'reptile', value: 'reptile', label: '파충류' },
  { id: 'other', value: 'other', label: '기타' },
] as const

export default function Step1SpeciesPage() {
  const router = useRouter()

  const draftPet = useProfileCreationStore(state => state.draftPet)
  const updateDraftPet = useProfileCreationStore(state => state.updateDraftPet)
  const nextStep = useProfileCreationStore(state => state.nextStep)
  const setCurrentStep = useProfileCreationStore(state => state.setCurrentStep)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(
    draftPet.species ?? null
  )
  const [showComingSoon, setShowComingSoon] = useState(false)

  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setCurrentStep(1)
  }, [setCurrentStep])

  // 모달 ESC 키 처리 및 포커스 복원
  useEffect(() => {
    if (!showComingSoon) return

    // 모달이 열리면 닫기 버튼에 포커스
    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC 키로 모달 닫기
      if (e.key === 'Escape') {
        setShowComingSoon(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'

      // 모달 닫힐 때 선택된 박스로 포커스 복원
      if (selectedSpecies) {
        // data-species 속성으로 선택된 버튼 찾기
        const selectedButton = document.querySelector(
          `[data-species="${selectedSpecies}"]`
        ) as HTMLElement
        selectedButton?.focus()
      }
    }
  }, [showComingSoon, selectedSpecies])

  // 검색 필터링
  const filteredSpecies = SPECIES_OPTIONS.filter(species =>
    species.label.includes(searchTerm)
  )

  const handleSpeciesSelect = (speciesLabel: string) => {
    setSelectedSpecies(speciesLabel)
    updateDraftPet({ species: speciesLabel })
  }

  const handleComplete = () => {
    if (!selectedSpecies) {
      alert('종을 선택해주세요')
      return
    }

    // 강아지가 아닌 경우 '준비 중' 모달 표시
    if (selectedSpecies !== '강아지') {
      setShowComingSoon(true)
      return
    }

    // 강아지인 경우에만 다음 단계로
    nextStep()
    router.push('/add-profile/step2')
  }

  const handleCloseModal = () => {
    setShowComingSoon(false)
  }

  // '지금은 건너뛰기' - 빈 함수로 유지하여 버튼은 보이되 비활성화 처리
  const handleSkip = () => {}

  const { user, isLoading } = usePageStatus()

  if (isLoading) return <Loading />
  if (!user) return <NotLogin />

  return (
    <>
      <AddProfileLayout
        stepTitle="반려동물 종"
        onSkip={handleSkip}
        skipDisabled={true}
        onComplete={handleComplete}
        nextDisabled={!selectedSpecies}
      >
        <div className="flex flex-col">
          {/* Header */}
          <div className="mt-5 mr-24 ml-24 flex items-center justify-between gap-8">
            <div className="flex-shrink-0">
              <h2 className="mb-2 text-2xl font-bold text-gray-800">
                우리 아이는?
              </h2>
              <p className="text-sm text-gray-500">
                반려동물의 종을 선택해주세요
              </p>
            </div>
            <div className="w-full max-w-md self-center">
              <div className="relative">
                <svg
                  aria-hidden="true"
                  className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z"
                    stroke="#A3A0C0"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  aria-label="동물 종 검색"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="동물 이름으로 검색"
                  className="w-full rounded-xl border-1 border-gray-200 py-3 pr-4 pl-12 focus:border-[#FF6000] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="m-15 grid max-h-[500px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] content-between gap-10">
            {filteredSpecies.map(species => {
              const isSelected = selectedSpecies === species.label

              return (
                <div key={species.id} className="group relative">
                  <ImgCardButton
                    kind="species"
                    variant={species.value}
                    onClick={() => handleSpeciesSelect(species.label)}
                    aria-pressed={isSelected}
                    aria-label={`${species.label} 선택`}
                    data-species={species.label}
                    className={`w-full ${
                      isSelected
                        ? 'rounded-[18px] border-2 border-[#FF6000] bg-orange-100 text-[#FF6000]'
                        : 'border border-gray-200 shadow hover:text-[#FF6000] hover:outline-2 hover:outline-[#FF6000]'
                    }`}
                  />
                </div>
              )
            })}
          </div>
          {filteredSpecies.length === 0 && (
            <div
              className="flex flex-col items-center justify-center py-16 text-gray-400"
              role="status"
              aria-live="polite"
            >
              <svg
                aria-hidden="true"
                className="mb-4 h-16 w-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg font-medium">검색 결과가 없습니다</p>
              <p className="mt-1 text-sm">다른 동물 이름을 입력해주세요</p>
            </div>
          )}
        </div>
      </AddProfileLayout>

      {/* 준비 중 모달 */}
      {showComingSoon && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              onClick={handleCloseModal}
              className="absolute top-4 right-4 rounded text-gray-400 transition-colors hover:text-gray-600 focus:ring-2 focus:ring-[#FF6000] focus:ring-offset-2 focus:outline-none"
              aria-label="닫기"
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <svg
                  aria-hidden="true"
                  className="h-8 w-8 text-[#FF6000]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3
                id="modal-title"
                className="mb-2 text-xl font-bold text-gray-800"
              >
                페이지 제작 중입니다
              </h3>
              <p className="mb-6 text-gray-600">
                {selectedSpecies} 품종 선택 페이지는 현재 준비 중이에요.
                <br />
                빠른 시일 내에 제공하겠습니다!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

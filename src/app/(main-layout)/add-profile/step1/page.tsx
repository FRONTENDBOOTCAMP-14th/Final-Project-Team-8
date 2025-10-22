'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ImgCardButton } from '@/components'
import { AddProfileLayout } from '@/components/add-profile/AddProfileLayout'
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

  useEffect(() => {
    setCurrentStep(1)
  }, [setCurrentStep])

  // 검색 필터링
  const filteredSpecies = SPECIES_OPTIONS.filter(species =>
    species.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSpeciesSelect = (speciesValue: string) => {
    setSelectedSpecies(speciesValue)
    updateDraftPet({ species: speciesValue })
  }

  const handleComplete = () => {
    if (!selectedSpecies) {
      alert('종을 선택해주세요')
      return
    }

    // store에만 저장, DB는 마지막 단계에서 저장
    nextStep()
    router.push('/add-profile/step2')
  }

  const handleSkip = () => {
    nextStep()
    router.push('/add-profile/step2')
  }

  return (
    <AddProfileLayout
      stepTitle="반려동물 종"
      onSkip={handleSkip}
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
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="동물 이름으로 검색"
                className="w-full rounded-xl border border-gray-300 py-3 pr-4 pl-12 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="m-15 grid max-h-[500px] grid-cols-4 place-items-center gap-6">
          {filteredSpecies.map(species => (
            <ImgCardButton
              key={species.id}
              kind="species"
              variant={species.value}
              onClick={() => handleSpeciesSelect(species.value)}
              className={
                selectedSpecies === species.value
                  ? 'ring-2 ring-orange-500 ring-offset-2'
                  : 'border border-gray-200 shadow'
              }
            />
          ))}
        </div>

        {filteredSpecies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <svg
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
  )
}

'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ImgCardButton } from '@/components'
import { AddProfileLayout } from '@/components/add-profile/AddProfileLayout'
import { createClient } from '@/libs/supabase/client'
import type { TablesInsert } from '@/libs/supabase/database.types'
import { useProfileCreationStore } from '@/store/profileCreationStore'

const supabase = createClient()

const BREED_OPTIONS = [
  { id: 'mixed', value: 'mixed', label: '믹스견' },
  { id: 'afghan-hound', value: 'afghan hound', label: '아프간 하운드' },
  { id: 'akita', value: 'akita', label: '아키타' },
  { id: 'beagle', value: 'beagle', label: '비글' },
  { id: 'maltese', value: 'maltese', label: '말티즈' },
  { id: 'border-collie', value: 'border collie', label: '보더 콜리' },
  { id: 'boxer', value: 'boxer', label: '복서' },
  { id: 'chow-chow', value: 'chow chow', label: '차우차우' },
  { id: 'dalmatian', value: 'dalmatian', label: '달마시안' },
  { id: 'dachshund', value: 'dachshund', label: '닥스훈트' },
  { id: 'golden-retriever', value: 'golden retriever', label: '골든 리트리버' },
  { id: 'samoyed', value: 'samoyed', label: '사모예드' },
] as const

export default function Step2BreedPage() {
  const router = useRouter()

  const draftPet = useProfileCreationStore(state => state.draftPet)
  const updateDraftPet = useProfileCreationStore(state => state.updateDraftPet)
  const nextStep = useProfileCreationStore(state => state.nextStep)
  const setCurrentStep = useProfileCreationStore(state => state.setCurrentStep)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBreed, setSelectedBreed] = useState<string | null>(
    draftPet.breed ?? null
  )

  useEffect(() => {
    setCurrentStep(2)
  }, [setCurrentStep])

  // Supabase에 사용자가 선택한 품종 저장
  const saveBreedToSupabase = async (breedLabel: string) => {
    try {
      const user = (await supabase.auth.getUser()).data.user
      if (!user) {
        alert('로그인이 필요합니다')
        return
      }

      // 이미 draftPet.id가 있으면 업데이트, 없으면 새로 생성
      if (draftPet.id) {
        const { error } = await supabase
          .from('pets')
          .update({ breed: breedLabel })
          .eq('id', draftPet.id)

        if (error) throw error
      } else {
        const newPet: TablesInsert<'pets'> = {
          name: draftPet.name ?? '이름 미정',
          species: draftPet.species ?? 'dog',
          breed: breedLabel,
          user_id: user.id,
        }

        const { data, error } = await supabase
          .from('pets')
          .insert(newPet)
          .select()
          .single()

        if (error) throw error

        updateDraftPet({ id: data.id, breed: data.breed })
      }
    } catch (err) {
      console.error('품종 저장 오류 : ', err)
      alert('품종 정보를 저장하는 중 문제가 발생했습니다')
    }
  }

  // 검색 필터링
  const filteredBreeds = BREED_OPTIONS.filter(breed =>
    breed.label.includes(searchTerm)
  )

  const handleBreedSelect = (breedLabel: string) => {
    setSelectedBreed(breedLabel)
    updateDraftPet({ breed: breedLabel })
  }

  const handleComplete = async () => {
    if (!selectedBreed) {
      alert('품종을 선택해주세요')
      return
    }

    await saveBreedToSupabase(selectedBreed)

    nextStep()
    router.push('/add-profile/step3')
  }

  const handleSkip = () => {
    nextStep()
    router.push('/add-profile/step3')
  }

  return (
    <AddProfileLayout
      stepTitle="품종"
      onSkip={handleSkip}
      onComplete={handleComplete}
      nextDisabled={!selectedBreed}
    >
      <div className="flex flex-col">
        {/* Header */}
        <div className="mt-5 mr-20 ml-20 flex items-center justify-between gap-8">
          <div className="flex-shrink-0">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              우리 아이는 어떤 품종인가요?
            </h2>
            <p className="text-sm text-gray-500">
              어떤 종류의 강아지인지 알려주세요
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
                placeholder="품종명으로 검색"
                className="w-full rounded-xl border border-gray-300 py-3 pr-4 pl-12 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[#FF6000]"
              />
            </div>
          </div>
        </div>

        <div className="m-15 grid max-h-[500px] grid-cols-5 place-items-center gap-6">
          {filteredBreeds.map(breed => (
            <ImgCardButton
              key={breed.id}
              kind="breeds"
              variant={breed.value}
              onClick={() => handleBreedSelect(breed.label)}
              className={
                selectedBreed === breed.value
                  ? 'ring-2 ring-[#FF6000] ring-offset-2'
                  : 'border border-gray-200 shadow'
              }
            />
          ))}
        </div>

        {filteredBreeds.length === 0 && (
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
            <p className="mt-1 text-sm">다른 품종명을 입력해주세요</p>
          </div>
        )}
      </div>
    </AddProfileLayout>
  )
}

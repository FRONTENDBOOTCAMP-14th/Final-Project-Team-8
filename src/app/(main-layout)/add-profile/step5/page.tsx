'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect, useState } from 'react'
import { AddProfileLayout } from '@/components/add-profile/AddProfileLayout'
import { createClient } from '@/libs/supabase/client'
import { useProfileCreationStore } from '@/store/profileCreationStore'
import '@/styles/slider.css'

const supabase = createClient()

export default function Step5WeightPage() {
  const router = useRouter()
  const { draftPet, updateDraftPet, nextStep, setCurrentStep } =
    useProfileCreationStore()

  const [weight, setWeight] = useState<number>(draftPet.weight ?? 10)
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg')

  useEffect(() => {
    setCurrentStep(5)
  }, [setCurrentStep])

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = parseFloat(e.target.value)
    setWeight(newWeight)
  }

  // 단위 변환 : 1kg = 2.20462lb
  const LB = 2.20462

  const handleUnitToggle = (selectedUnit: 'kg' | 'lb') => {
    if (selectedUnit === unit) return

    setUnit(selectedUnit)

    if (selectedUnit === 'lb') {
      setWeight(parseFloat((weight * LB).toFixed(1)))
    } else {
      setWeight(parseFloat((weight / LB).toFixed(1)))
    }
  }

  const handleComplete = async () => {
    try {
      // kg로 변환해서 저장
      const weightInKg = unit === 'lb' ? weight / LB : weight

      // draftPet.id가 존재하면 update
      if (draftPet.id) {
        const { error } = await supabase
          .from('pets')
          .update({
            weight: parseFloat(weightInKg.toFixed(1)),
          })
          .eq('id', draftPet.id)

        if (error) throw error
      }

      updateDraftPet({ weight: parseFloat(weightInKg.toFixed(1)) })
      nextStep()
      router.push('/add-profile/step6')
    } catch (err) {
      console.error('체중 업데이트 오류 : ', err)
      alert('체중 정보를 저장하는 중 문제가 발생했습니다')
    }
  }

  const handleSkip = () => {
    nextStep()
    router.push('/add-profile/step6')
  }

  return (
    <AddProfileLayout
      stepTitle="체중"
      onSkip={handleSkip}
      onComplete={handleComplete}
      nextDisabled={false}
    >
      <div className="flex flex-col items-center">
        {/* Profile Image */}
        <div className="mt-12 mb-12">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-40 w-40 rounded-full border border-gray-200"></div>
            <div className="absolute h-32 w-32 rounded-full border border-gray-100"></div>

            <div className="relative z-10 h-24 w-24 overflow-hidden rounded-full bg-gray-100">
              {draftPet.profile_img ? (
                <Image
                  src={draftPet.profile_img}
                  alt="Pet profile"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                  <svg
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

        {/* Question */}
        <div className="mt-6 mb-4 text-center">
          <p className="text-lg text-gray-800">
            우리 아이의 체중은 얼마인가요?
          </p>
          <p className="mt-2 text-sm text-gray-400">
            상단의 눈금을 좌우로 움직여
            <br />
            정확한 체중에 맞춰 주세요
          </p>
        </div>

        {/* Weight Display */}
        <div className="mt-6 mb-10">
          <p className="text-center text-5xl font-bold text-orange-500">
            {weight.toFixed(1)} {unit}
          </p>
        </div>

        {/* Slider */}
        <div className="mb-14 w-full max-w-full px-8">
          <div className="relative">
            {/* Custom Slider */}
            <div className="relative">
              <input
                type="range"
                min={unit === 'kg' ? '0' : '0'}
                max={unit === 'kg' ? '100' : '220'}
                step="0.1"
                value={weight}
                onChange={handleWeightChange}
                className="weight-slider"
              />
            </div>

            {/* Ruler marks */}
            <div className="pointer-events-none absolute top-2 right-0 left-0 flex -translate-y-1/2 items-center justify-between px-0">
              {Array.from({ length: 51 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`${i % 10 === 0 ? 'h-10 w-0.5 rounded-full bg-gray-400' : i % 5 === 0 ? 'h-6 w-0.5 bg-gray-400' : 'h-3 w-0.5 bg-gray-300'}`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center gap-3">
          <label htmlFor="weight-input" className="sr-only">
            반려동물 체중 입력
          </label>
          <input
            type="number"
            id="weight-input"
            name="weight"
            value={weight.toFixed(1)}
            onChange={e => {
              const value = parseFloat(e.target.value)
              if (!isNaN(value) && value >= 0) {
                setWeight(value)
              }
            }}
            className="w-24 rounded-lg border border-gray-300 px-4 py-2 text-center text-sm transition-all outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            step="0.1"
            min="0"
            max={unit === 'kg' ? '100' : '220'}
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleUnitToggle('kg')}
              className={`flex items-center gap-1 rounded-lg px-8 py-2 transition-all ${unit === 'kg' ? 'border border-orange-200 text-orange-500' : 'border border-gray-200 text-gray-400'}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                {unit === 'kg' && (
                  <circle cx="8" cy="8" r="3" fill="currentColor" />
                )}
              </svg>
              <span className="text-sm font-medium">kg</span>
            </button>

            <button
              type="button"
              onClick={() => handleUnitToggle('lb')}
              className={`flex items-center gap-1 rounded-lg px-8 py-2 transition-all ${unit === 'lb' ? 'border border-orange-500 text-orange-500' : 'border border-gray-200 text-gray-400'}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                {unit === 'lb' && (
                  <circle cx="8" cy="8" r="3" fill="currentColor" />
                )}
              </svg>
              <span className="text-sm font-medium">lb</span>
            </button>
          </div>
        </div>
      </div>
    </AddProfileLayout>
  )
}

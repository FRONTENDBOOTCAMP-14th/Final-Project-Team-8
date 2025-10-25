'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect, useState } from 'react'
import { AddProfileLayout } from '@/components/add-profile/AddProfileLayout'
import { useProfileCreationStore } from '@/store/profileCreationStore'
import '@/styles/slider.css'

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

  // Shift + 방향키로 1kg/2.2lb 단위 이동
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.shiftKey &&
      (e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown')
    ) {
      e.preventDefault()

      const increment = unit === 'kg' ? 1 : LB // kg일 때 1kg, lb일 때 약 2.2lb
      const maxValue = unit === 'kg' ? 100 : 200

      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        const newWeight = Math.min(weight + increment, maxValue)
        setWeight(parseFloat(newWeight.toFixed(1)))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        const newWeight = Math.max(weight - increment, 0)
        setWeight(parseFloat(newWeight.toFixed(1)))
      }
    }
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

  const handleComplete = () => {
    // kg로 변환해서 store에 저장 (DB 저장은 마지막 단계에서 일괄 처리)
    const weightInKg = unit === 'lb' ? weight / LB : weight

    updateDraftPet({ weight: parseFloat(weightInKg.toFixed(1)) })
    nextStep()
    router.push('/add-profile/step6')
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
                  width={80}
                  height={80}
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

        <div className="mb-4 text-center">
          <p className="text-lg text-gray-800">
            우리 아이의 체중은 얼마인가요?
          </p>
          <p className="mt-2 text-sm text-gray-400">
            슬라이더를 좌우로 움직여 정확한 체중에 맞춰 주세요
          </p>
        </div>

        <div className="mb-4 text-center">
          <p className="text-xs text-gray-500">
            <kbd className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-xs">
              Shift
            </kbd>
            {' + '}
            <kbd className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-xs">
              ←→
            </kbd>{' '}
            키로 1{unit} 단위 이동
          </p>
        </div>

        <div className="mb-5">
          <p
            className="text-center text-2xl font-bold text-[#FF6000]"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="sr-only">현재 선택된 체중 : </span>
            {weight.toFixed(1)} {unit === 'kg' ? 'kg' : 'lb'}
            <span className="sr-only">
              {unit === 'kg' ? '킬로그램' : '파운드'}
            </span>
          </p>
        </div>

        <div className="mb-8 w-full max-w-full px-8">
          <div className="relative">
            <div className="relative">
              <label htmlFor="weight-slider" className="sr-only">
                체중 조절 슬라이더. 방향키로 0.1 단위 이동, Shift와 방향키로 1
                {unit} 단위 이동 가능. 현재 {weight.toFixed(1)}{' '}
                {unit === 'kg' ? '킬로그램' : '파운드'}
              </label>
              <input
                type="range"
                id="weight-slider"
                name="weight-slider"
                min={unit === 'kg' ? '0' : '0'}
                max={unit === 'kg' ? '100' : '220'}
                step="0.1"
                value={weight}
                onChange={handleWeightChange}
                onKeyDown={handleKeyDown}
                className="weight-slider"
                style={{
                  outline: 'none',
                }}
                aria-label={`반려동물 체중 슬라이더. 방향키로 0.1 단위 이동, Shift와 방향키로 1${unit} 단위 이동. 현재 ${weight.toFixed(1)} ${unit === 'kg' ? '킬로그램' : '파운드'}`}
                aria-valuemin={unit === 'kg' ? 0 : 0}
                aria-valuemax={unit === 'kg' ? 100 : 220}
                aria-valuenow={weight}
                aria-valuetext={`${weight.toFixed(1)} ${unit === 'kg' ? '킬로그램' : '파운드'}`}
                aria-describedby="weight-instructions"
              />
            </div>

            {/* 슬라이더 눈금 */}
            <div
              className="pointer-events-none absolute top-2 right-0 left-0 flex -translate-y-1/2 items-center justify-between px-0"
              aria-hidden="true"
            >
              {Array.from({ length: 51 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`${i % 10 === 0 ? 'h-10 w-0.5 rounded-full bg-gray-400' : i % 5 === 0 ? 'h-6 w-0.5 bg-gray-400' : 'h-3 w-0.5 bg-gray-300'}`}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* 안내 텍스트 (스크린 리더용) */}
          <div id="weight-instructions" className="sr-only">
            슬라이더를 사용하여 반려동물의 체중을 설정할 수 있습니다. 방향키
            좌우 또는 상하로 0.1 단위씩 조절할 수 있으며, Shift 키를 누른 채로
            방향키를 사용하면 1{unit} 단위로 빠르게 이동할 수 있습니다.
          </div>
        </div>

        {/* 직접 입력 및 단위 선택 */}
        <div className="flex items-center gap-3">
          <label htmlFor="weight-input" className="sr-only">
            반려동물 체중 직접 입력 ({unit === 'kg' ? '킬로그램' : '파운드'})
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
            className="w-24 rounded-lg border border-gray-300 px-4 py-2 text-center text-sm transition-all outline-none focus:border-[#FF6000] focus:ring-2 focus:ring-orange-200"
            step="0.1"
            min="0"
            max={unit === 'kg' ? '100' : '220'}
            aria-describedby="weight-unit-group"
          />

          <div
            className="flex gap-3"
            role="group"
            aria-label="체중 단위 선택"
            id="weight-unit-group"
          >
            <button
              type="button"
              onClick={() => handleUnitToggle('kg')}
              aria-label="킬로그램 단위 선택"
              aria-pressed={unit === 'kg'}
              className={`flex items-center gap-1 rounded-lg px-8 py-2 transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none ${unit === 'kg' ? 'border border-orange-200 text-[#FF6000] focus:ring-[#FF6000]' : 'border border-gray-200 text-gray-400 focus:ring-gray-400'}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
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
              aria-label="파운드 단위 선택"
              aria-pressed={unit === 'lb'}
              className={`flex items-center gap-1 rounded-lg px-8 py-2 transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none ${unit === 'lb' ? 'border border-[#FF6000] text-[#FF6000] focus:ring-[#FF6000]' : 'border border-gray-200 text-gray-400 focus:ring-gray-400'}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
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

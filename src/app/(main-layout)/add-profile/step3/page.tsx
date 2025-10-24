'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { ChangeEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AddProfileLayout } from '@/components/add-profile/AddProfileLayout'
import { CameraButton } from '@/components/ui/button/IconButton'
import useImageUpload from '@/hooks/useImageUpload'
import { createClient } from '@/libs/supabase/client'
import { useProfileCreationStore } from '@/store/profileCreationStore'

export default function Step3NamePage() {
  const router = useRouter()
  const { draftPet, updateDraftPet, nextStep, setCurrentStep } =
    useProfileCreationStore()
  const [name, setName] = useState(draftPet.name ?? '')

  // 디바운스
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Step 3로 강제 설정
  useEffect(() => {
    setCurrentStep(3)
  }, [setCurrentStep])

  // 이미지 업로드
  const { imagePreview, inputRef, open, removeImage, uploadImage } =
    useImageUpload({
      initialUrl: draftPet.profile_img ?? null,
      onChange: imgRef => updateDraftPet({ profile_img: imgRef }),
    })

  // 디바운스된 이름 저장
  const debouncedSaveName = useCallback(
    (nameValue: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      debounceTimerRef.current = setTimeout(() => {
        updateDraftPet({ name: nameValue.trim() })
      }, 500)
    },
    [updateDraftPet]
  )

  const handleComplete = async () => {
    if (!name.trim()) {
      alert('반려동물의 이름을 입력해주세요.')
      return
    }

    updateDraftPet({ name: name.trim() })
    nextStep()
    router.push('/add-profile/step4')
  }

  const handleSkip = () => {
    nextStep()
    router.push('/add-profile/step4')
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)

    // 디바운스된 저장
    debouncedSaveName(newName)
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  return (
    <AddProfileLayout
      stepTitle="이름"
      onSkip={handleSkip}
      onComplete={handleComplete}
      nextDisabled={!name.trim()}
    >
      <div className="flex flex-col items-center">
        {/* Image Upload */}
        <div className="mb-10">
          <div className="flex flex-col items-center">
            {/* 이미지 영역 */}
            <div className="relative flex items-center justify-center">
              <div
                aria-hidden="true"
                className="absolute h-64 w-64 rounded-full border border-gray-200"
              ></div>
              <div
                aria-hidden="true"
                className="absolute h-52 w-52 rounded-full border border-gray-100"
              ></div>

              {/* Main profile circle */}
              <div className="relative z-10 m-15">
                <div
                  className="h-40 w-40 overflow-hidden rounded-full bg-gray-100"
                  role="img"
                  aria-label={
                    imagePreview
                      ? '반려동물 프로필 사진'
                      : '프로필 사진이 설정되지 않음'
                  }
                >
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="반려동물 프로필 미리보기"
                      width={160}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200">
                      <svg
                        aria-hidden="true"
                        className="h-16 w-16 text-gray-400"
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

                {/* Camera button */}
                <CameraButton
                  onClick={() => {
                    open()
                  }}
                  aria-label="프로필 사진 업로드"
                />

                {/* Delete button - only show when image exists */}
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      removeImage()
                      updateDraftPet({ profile_img: null })
                    }}
                    aria-label="프로필 사진 삭제"
                    className="absolute -top-0.5 -right-0.5 z-30 flex h-9 w-9 -translate-x-1 translate-y-1 items-center justify-center rounded-full bg-[#FF6000] text-white shadow-lg transition-colors hover:bg-orange-600"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
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
                )}
              </div>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <label htmlFor="pet-name" className="text-lg text-gray-800">
            우리 아이의 이름은 무엇인가요?
          </label>
        </div>

        {/* Name Input */}
        <div className="w-full max-w-md">
          <input
            id="pet-name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="반려동물 이름"
            aria-label="반려동물 이름"
            aria-required="true"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[#FF6000]"
            maxLength={20}
          />
        </div>
      </div>
    </AddProfileLayout>
  )
}

'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { ChangeEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AddProfileLayout } from '@/components/add-profile/AddProfileLayout'
import { useProfileCreationStore } from '@/store/profileCreationStore'

export default function Step3NamePage() {
  const router = useRouter()
  const { draftPet, updateDraftPet, nextStep, setCurrentStep } =
    useProfileCreationStore()
  const [name, setName] = useState(draftPet.name ?? '')
  const [imagePreview, setImagePreview] = useState<string | null>(
    draftPet.profile_img ?? null
  )
  const fileInputRef = useRef<HTMLInputElement>(null)
  const ImageUploadButtonRef = useRef<HTMLButtonElement>(null)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Step 3로 강제 설정
  useEffect(() => {
    setCurrentStep(3)
  }, [setCurrentStep])

  // 이미지 업로드
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        alert('이미지 크기는 5MB 이하여야 합니다.')
        return
      }

      // 이미지 파일 체크
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        updateDraftPet({ profile_img: result })
      }
      reader.readAsDataURL(file)
    }
  }

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

  const handleDeleteImage = () => {
    setImagePreview(null)
    updateDraftPet({ profile_img: null })
    // 파일 input 초기화
    if (fileInputRef.current) fileInputRef.current.value = ''

    // 이미지 삭제 후 이미지 업로드 버튼으로 포커스 이동
    setTimeout(() => {
      ImageUploadButtonRef.current?.focus()
    }, 0)
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
                <button
                  type="button"
                  ref={ImageUploadButtonRef}
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="프로필 사진 업로드"
                  className="absolute bottom-0 left-1/2 z-30 flex h-12 w-12 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-xl bg-white shadow-lg transition-colors hover:bg-gray-50"
                >
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4997 4.08771H10.508M1.33301 9.92101L4.66634 6.58767C5.04639 6.22197 5.4775 6.02944 5.91634 6.02944C6.35518 6.02944 6.78629 6.22197 7.16634 6.58767L11.333 10.7543M9.66634 9.08767L10.4997 8.25434C10.8797 7.88864 11.3108 7.69611 11.7497 7.69611C12.1885 7.69611 12.6196 7.88864 12.9997 8.25434L14.6663 9.92101M3.83301 0.754379H12.1663C13.5471 0.754379 14.6663 1.87367 14.6663 3.25438V11.5877C14.6663 12.9684 13.5471 14.0877 12.1663 14.0877H3.83301C2.4523 14.0877 1.33301 12.9684 1.33301 11.5877V3.25438C1.33301 1.87367 2.4523 0.754379 3.83301 0.754379Z"
                      stroke="#FF6000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Delete button - only show when image exists */}
                {imagePreview && (
                  <button
                    type="button"
                    onClick={handleDeleteImage}
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
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              aria-label="프로필 사진 파일 선택"
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

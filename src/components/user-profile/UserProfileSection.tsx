'use client'

import { SquarePen } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Button from '@/components/ui/button/Button'
import {
  CameraButton,
  CheckButton,
  XButton,
} from '@/components/ui/button/IconButton'
import useImageUpload from '@/hooks/useImageUpload'
import type { UserData } from '@/hooks/useUserData'
import { updateUserImg } from '@/libs/api/user'

export default function UserProfileSection(userData: Partial<UserData>) {
  const [currentImg, setCurrentImg] = useState(userData.profile_img)
  const {
    imagePreview,
    inputRef,
    open,
    removeImage,
    uploadImage,
    selectedFile,
  } = useImageUpload({
    initialUrl: userData.profile_img ?? null,
  })

  const getFilePath = (userId: string): string => {
    return `user-profile/${userId}.now`
  }

  async function handleSubmit() {
    if (!imagePreview || !userData.id || !selectedFile) return
    const filePath = getFilePath(userData.id)
    await updateUserImg({
      filePath,
      selectedFile,
      userId: userData.id,
    })
    alert('프로필 이미지가 업데이트되었습니다.')
    setCurrentImg(imagePreview)
    removeImage()
  }

  useEffect(() => {
    setCurrentImg(userData.profile_img)
  }, [userData])

  return (
    <section className="flex w-full items-center gap-8">
      {/* Main profile circle */}
      <div className="relative z-10">
        <div className="aspect-square w-30 overflow-hidden rounded-full bg-gray-100 outline-10 outline-gray-100">
          {imagePreview || currentImg ? (
            <Image
              src={imagePreview ?? currentImg ?? ''}
              alt="Pet profile preview"
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200">
              <svg
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

        {imagePreview ? (
          <CheckButton onClick={handleSubmit} />
        ) : (
          <CameraButton
            onClick={() => {
              open()
            }}
          />
        )}

        {/* Delete button - only show when image exists */}
        {imagePreview && <XButton onClick={removeImage} />}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={uploadImage}
          className="hidden"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold">{userData?.nickname}</div>
          <Button
            variant="white"
            className="max-w-fit min-w-fit rounded-[19px] p-0.5"
          >
            <SquarePen className="w-[20px]" />
          </Button>
        </div>
      </div>
    </section>
  )
}

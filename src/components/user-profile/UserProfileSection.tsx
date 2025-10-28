'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'
import {
  CameraButton,
  CheckButton,
  XButton,
} from '@/components/ui/button/IconButton'
import useImageUpload from '@/hooks/useImageUpload'
import { userKeys, type UserData } from '@/hooks/useUserDataQuery'
import type { updateProps } from '@/libs/api/user'
import { updateUserImg } from '@/libs/api/user'

export default function UserProfileSection(userData: Partial<UserData>) {
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
  const queryClient = useQueryClient()

  const userProfileMutation = useMutation<void, Error, updateProps>({
    mutationFn: updateUserImg,
    onSuccess: () => {
      if (userData.id) {
        queryClient.invalidateQueries({
          queryKey: userKeys.detail(userData.id),
        })

        toast.success('프로필 이미지가 업데이트되었습니다')
      }
    },
    onError: () => {
      toast.error('이미지 업데이트를 실패하였습니다')
    },
  })

  const getFilePath = (userId: string): string => {
    return `user-profile/${userId}.now`
  }

  async function handleSubmit() {
    if (!imagePreview || !userData.id || !selectedFile) return

    const filePath = getFilePath(userData.id)

    userProfileMutation.mutate({
      filePath,
      selectedFile,
      userId: userData.id,
    })
    removeImage()
  }
  const showImageUrl = imagePreview ?? userData.profile_img

  return (
    <div className="flex w-full items-center gap-8">
      {/* Main profile circle */}
      <div className="relative z-10">
        <div className="aspect-square w-30 overflow-hidden rounded-full bg-gray-100 outline-10 outline-gray-100">
          {showImageUrl ? (
            <Image
              src={showImageUrl}
              alt="프로필 미리보기"
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200">
              <User size={70} className="text-gray-600" />
            </div>
          )}
        </div>

        {selectedFile ? (
          <CheckButton onClick={handleSubmit} />
        ) : (
          <CameraButton
            onClick={() => {
              open()
            }}
          />
        )}

        {/* Delete button - only show when image exists */}
        {selectedFile && <XButton onClick={removeImage} />}

        <label htmlFor="user-profile-image" className="sr-only">
          프로필 이미지
        </label>
        <input
          id="user-profile-image"
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={uploadImage}
          className="hidden"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <p className="text-2xl font-bold">{userData?.nickname}</p>
        </div>
      </div>
    </div>
  )
}

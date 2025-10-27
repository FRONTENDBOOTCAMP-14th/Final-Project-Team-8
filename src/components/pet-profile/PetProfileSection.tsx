import type { User } from '@supabase/supabase-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SquarePen } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import PetProDetailEditSection from '@/components/pet-profile/edit-form/PetDetailEditSection'
import PetDetailSection from '@/components/pet-profile/PetDetailSection'
import Button from '@/components/ui/button/Button'
import {
  CameraButton,
  CheckButton,
  XButton,
} from '@/components/ui/button/IconButton'
import useImageUpload from '@/hooks/useImageUpload'
import { updatePetImg } from '@/libs/api/pet'
import type { updateProps } from '@/libs/api/pet'
import { petKeys } from '@/libs/qeury-key/petKey'
import { type Pet, usePetStore } from '@/store/petStore'

interface PetProfileSectionProps {
  user: User
  selectedPet: Pet
}

export default function PetProfileSection({
  user,
  selectedPet,
}: PetProfileSectionProps) {
  const {
    imagePreview,
    inputRef,
    open,
    removeImage,
    uploadImage,
    selectedFile,
  } = useImageUpload({
    initialUrl: selectedPet.profile_img ?? null,
  })
  const [isEditMode, setIsEditMode] = useState(false)

  const queryClient = useQueryClient()
  const { updatePetData, fetchPetSummary } = usePetStore()
  const petProfileMutation = useMutation<void, Error, updateProps>({
    mutationFn: updatePetImg,
    onSuccess: () => {
      if (selectedPet.id) {
        queryClient.invalidateQueries({
          queryKey: petKeys.detail(selectedPet.id),
        })
        updatePetData({ profile_img: imagePreview })
        fetchPetSummary(user)
        removeImage()
        toast.success('프로필 이미지가 업데이트되었습니다')
      }
    },
    onError: () => {
      toast.error('이미지 업데이트를 실패하였습니다')
    },
  })

  const isUpdating = petProfileMutation.isPending

  const getFilePath = (selectedPet: Pet): string => {
    return `pet-profile/${selectedPet.id}.now`
  }

  async function handleSubmit() {
    if (!imagePreview || !selectedPet || !selectedFile) return

    const filePath = getFilePath(selectedPet)

    petProfileMutation.mutate({
      filePath,
      selectedFile,
      petId: selectedPet.id,
    })
  }

  const showImageUrl =
    imagePreview ?? selectedPet.profile_img ?? '/assets/img/default-profile.png'

  function onCancel() {
    setIsEditMode(false)
  }

  return (
    <>
      {/* 프로필 사진 부분 */}
      <section className="flex w-full items-center gap-8">
        <div className="relative z-10">
          <div className="aspect-square w-30 overflow-hidden rounded-full bg-gray-100 outline-10 outline-gray-100">
            <Image
              src={showImageUrl}
              alt={selectedPet.name}
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={uploadImage}
            className="hidden"
          />
          {selectedFile ? (
            <CheckButton onClick={handleSubmit} />
          ) : (
            <CameraButton onClick={() => open()} />
          )}
          {/* Delete button - only show when image exists */}
          {selectedFile && <XButton onClick={removeImage} />}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold">{selectedPet.name}</div>
            <Button
              variant="white"
              className="max-w-fit min-w-fit rounded-[19px] p-0.5"
            >
              <SquarePen className="w-[20px]" />
            </Button>
          </div>
          <p className="text-gray-500">
            {selectedPet.species} | {selectedPet.breed}
          </p>
        </div>
      </section>

      {/* 상세정보 */}
      <div className="h-full w-full">
        {isEditMode ? (
          <PetProDetailEditSection
            petId={selectedPet.id}
            petData={selectedPet}
            onCancel={() => onCancel()}
          />
        ) : (
          <PetDetailSection selectedPet={selectedPet} />
        )}
        {!isEditMode && (
          <Button
            variant="white"
            onClick={() => {
              setIsEditMode(true)
            }}
            className="absolute bottom-0"
          >
            반려동물 정보 수정하기
          </Button>
        )}
      </div>
    </>
  )
}

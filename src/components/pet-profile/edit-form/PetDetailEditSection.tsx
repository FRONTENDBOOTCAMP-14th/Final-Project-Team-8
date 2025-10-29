'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Button from '@/components/ui/button/Button'
import { imgcardButtonVariants } from '@/components/ui/button/ImgCardButton'
import { updatePetDetail } from '@/libs/api/pet'
import { petKeys } from '@/libs/qeury-key/petKey'
import { type Pet, usePetStore } from '@/store/petStore'

interface PetDetailEditFormProps {
  petId: string
  petData?: Partial<Pet>
  onCancel: () => void
}

interface FormDataType {
  adoption_date: string | null
  bio: string | null
  birthdate: string | null
  breed: string | null
  species: string
  gender: string | null
  name: string
  size: number | null
  weight: number | null
  profile_img: string | null
}

const speciesOptions = Object.entries(imgcardButtonVariants.species)
const breedOptions = Object.entries(imgcardButtonVariants.breeds)

export default function PetDetailEditSection({
  petId,
  petData,
  onCancel,
}: PetDetailEditFormProps) {
  const { fetchSelectedPet } = usePetStore()
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<FormDataType>({
    defaultValues: {
      adoption_date: petData?.adoption_date ?? null,
      bio: petData?.bio ?? null,
      birthdate: petData?.birthdate ?? null,
      breed: petData?.breed ?? null,
      species: petData?.species ?? '강아지',
      gender: petData?.gender ?? null,
      name: petData?.name ?? '',
      size: petData?.size ?? null,
      weight: petData?.weight ?? null,
      profile_img: petData?.profile_img ?? null,
    },
    mode: 'onBlur',
  })
  const selectedSpecies = watch('species')

  const queryClient = useQueryClient()
  const mutation = useMutation<void, Error, FormDataType>({
    mutationFn: async data => {
      return updatePetDetail(data, petId)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: petKeys.detail(petId) })
      fetchSelectedPet(petId)
      toast.success('반려동물 정보가 업데이트되었습니다')
      onCancel()
    },
    onError: () => {
      toast.error('정보 업데이트를 실패했습니다, 다시 시도해주세요')
    },
  })

  const onSubmit = (data: FormDataType) => {
    const { ...updateData } = data
    mutation.mutate(updateData as FormDataType)
  }

  const isSaving = mutation.isPending

  if (isSaving) return <div>펫 정보를 불러오는 중...</div>
  if (!petData) return <div>등록된 펫 없음</div>

  return (
    <section className="mt-5 flex grow flex-col gap-4">
      {/* <div className="h-9/10 w-full max-w-2xl"> */}
      {/* Header */}
      <div>
        <h2 className="rounded-lg py-1 text-[18px] font-bold text-neutral-600">
          <span className="ml-3 text-xl font-bold text-[#FF6000]">
            {petData.name ?? '펫'}
          </span>{' '}
          정보 수정
        </h2>
        <h3 className="mt-1 ml-3 text-base font-bold text-gray-500">
          외모 및 특징
        </h3>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col items-center gap-5"
      >
        {/* Form Container */}
        <div className="w-full space-y-3">
          {/* 이름 + 성별 */}
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-neutral-700"
              >
                이름
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                placeholder="이름을 입력하세요"
                className="rounded-lg border border-gray-300 px-2 py-2 text-sm text-neutral-800 transition-all placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="gender"
                className="text-sm font-semibold text-neutral-700"
              >
                성별
              </label>
              <select
                id="gender"
                {...register('gender')}
                className="rounded-lg border border-gray-300 px-2 py-2 text-sm text-neutral-800 transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
              >
                <option value="">선택안함</option>
                <option value="수컷">수컷</option>
                <option value="암컷">암컷</option>
              </select>
            </div>
          </div>

          {/* 크기 + 체중 */}
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="size"
                className="text-sm font-semibold text-neutral-700"
              >
                크기
              </label>
              <select
                id="size"
                {...register('size')}
                className="rounded-lg border border-gray-300 px-2 py-2 text-sm text-neutral-800 transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
              >
                <option value="">선택안함</option>
                <option value="0">소형견</option>
                <option value="1">중형견</option>
                <option value="2">대형견</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="weight"
                className="text-sm font-semibold text-neutral-700"
              >
                체중
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  id="weight"
                  {...register('weight')}
                  placeholder="체중"
                  className="w-full rounded-lg border border-gray-300 px-2 py-2 text-sm text-neutral-800 transition-all placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                />
                <span className="text-sm whitespace-nowrap text-gray-600">
                  kg
                </span>
              </div>
            </div>
          </div>

          {/* 종 + 품종 */}
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="species"
                className="text-sm font-semibold text-neutral-700"
              >
                종
              </label>
              <select
                id="species"
                {...register('species')}
                className="rounded-lg border border-gray-300 px-2 py-2 text-sm text-neutral-800 transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
              >
                {speciesOptions.map(([key, value]) => (
                  <option key={key} value={value.title}>
                    {value.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="breed"
                className="text-sm font-semibold text-neutral-700"
              >
                품종
              </label>
              <select
                id="breed"
                {...register('breed')}
                className="rounded-lg border border-gray-300 px-2 py-2 text-sm text-neutral-800 transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
              >
                {selectedSpecies === '강아지' ? (
                  breedOptions.map(([key, value]) => (
                    <option key={key} value={value.title}>
                      {value.title}
                    </option>
                  ))
                ) : (
                  <option value=" ">개발중</option>
                )}
              </select>
            </div>
          </div>

          {/* 소개 */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="bio"
              className="text-sm font-semibold text-neutral-700"
            >
              소개
            </label>
            <textarea
              id="bio"
              {...register('bio')}
              rows={2}
              placeholder="반려동물에 대한 소개를 입력하세요"
              className="resize-none rounded-lg border border-gray-300 px-2 py-2 text-sm text-neutral-800 transition-all placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
            />
          </div>

          <div className="mt-5 border-t border-gray-200" />

          <div>
            <h3 className="mt-1 text-base font-bold text-gray-500">기념일</h3>
          </div>

          {/* 생일 + 입양일 */}
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="birthdate"
                className="text-sm font-semibold text-neutral-700"
              >
                생일
              </label>
              <input
                type="date"
                id="birthdate"
                {...register('birthdate')}
                className="rounded-lg border border-gray-300 px-2 py-2 text-sm text-neutral-800 transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="adoption_date"
                className="text-sm font-semibold text-neutral-700"
              >
                입양일
              </label>
              <input
                type="date"
                id="adoption_date"
                {...register('adoption_date')}
                className="rounded-lg border border-gray-300 px-2 py-2 text-sm text-neutral-800 transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className="sticky bottom-0 mt-auto flex w-full gap-4 bg-white px-1 pt-4 pb-2">
          <Button variant="white" onClick={onCancel} className="flex-1">
            취소
          </Button>
          <Button
            variant="orange"
            type="submit"
            disabled={isSubmitting && true}
            className="flex-1"
          >
            {isSubmitting ? '저장 중 ...' : '저장'}
          </Button>
        </div>
      </form>
      {/* </div> */}
    </section>
  )
}

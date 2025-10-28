'use client'

import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/button/Button'
import { imgcardButtonVariants } from '@/components/ui/button/ImgCardButton'
import { updatePetDetail } from '@/libs/api/pet'
import type { Pet } from '@/store/petStore'

interface PetDetailEditFormProps {
  petId: string
  petData?: Partial<Pet>
  onCancel: () => void
  onSaveSuccess: (updatedData: Partial<Pet>) => void
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
  onSaveSuccess,
}: PetDetailEditFormProps) {
  const { register, handleSubmit, reset, watch } = useForm<FormDataType>({
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
  })
  const selectedSpecies = watch('species')

  // petData 변경 시 폼 값 업데이트
  useEffect(() => {
    reset({
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
    })
  }, [petData, reset])

  const onSubmit: SubmitHandler<FormDataType> = async data => {
    if (!petId) {
      return
    }
    await updatePetDetail(data, petId)
    onSaveSuccess(data)
  }

  if (!petData) return <div>펫 정보를 불러오는 중...</div>

  return (
    <section className="mt-5 flex flex-col">
      <div className="flex flex-col gap-4 text-gray-500">
        <h3 className="text-[18px] font-bold text-neutral-600">
          {petData.name ?? '펫'} 정보 수정
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 whitespace-nowrap"
        >
          {/* 이름 + 성별 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="w-full font-bold text-neutral-600"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="gender">성별</label>
              <select
                id="gender"
                {...register('gender')}
                className="w-full font-bold text-neutral-600"
              >
                <option value="">선택안함</option>
                <option value="수컷">수컷</option>
                <option value="암컷">암컷</option>
              </select>
            </div>
          </div>
          <hr className="border-neutral-200" />
          {/* 크기 + 체중 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="size">크기</label>
              <select
                id="size"
                {...register('size')}
                className="w-full font-bold text-neutral-600"
              >
                <option value="">선택안함</option>
                <option value="0">소형견</option>
                <option value="1">중형견</option>
                <option value="2">대형견</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="weight">체중</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  id="weight"
                  {...register('weight')}
                  className="w-full font-bold text-neutral-600"
                />
                <span>kg</span>
              </div>
            </div>
          </div>
          <hr className="border-neutral-200" />
          {/* 생일 + 입양일 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="birthdate">생일</label>
              <input
                type="date"
                id="birthdate"
                {...register('birthdate')}
                className="w-full font-bold text-neutral-600"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="adoption_date">입양일</label>
              <input
                type="date"
                id="adoption_date"
                {...register('adoption_date')}
                className="w-full font-bold text-neutral-600"
              />
            </div>
          </div>
          <hr className="border-neutral-200" />
          {/* 종 + 품종 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="species">종</label>
              <select
                id="species"
                {...register('species')}
                className="w-full font-bold text-neutral-600"
              >
                {speciesOptions.map(([key, value]) => (
                  <option key={key} value={value.title}>
                    {value.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="breed">품종</label>
              <select
                id="breed"
                {...register('breed')}
                className="w-full font-bold text-neutral-600"
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
          <hr className="border-neutral-200" />
          {/* 소개 */}
          <div className="flex flex-col">
            <label htmlFor="bio">소개</label>
            <textarea
              id="bio"
              {...register('bio')}
              className="w-full font-bold text-neutral-600"
            />
          </div>
          {/* 버튼 */}
          <div className="absolute bottom-0 flex w-full flex-col gap-4">
            <Button variant="orange" type="submit">
              저장
            </Button>
            <Button variant="white" onClick={onCancel}>
              취소
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

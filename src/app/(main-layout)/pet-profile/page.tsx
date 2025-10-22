'use client'
import { Cake, House, SquarePen } from 'lucide-react'
import { useState } from 'react'
import AccordionBox from '@/components/ui/accordionBox'
import Button from '@/components/ui/button/Button'
import { usePetStore } from '@/store/petStore'

export default function PetProfilePage() {
  const { selectedPet } = usePetStore()
  const [activeTab, setActiveTab] = useState('health')

  if (!selectedPet) {
    return (
      <div className="relative mx-auto flex h-full w-full flex-col items-center justify-center gap-10">
        <div className="flex h-full flex-col items-center justify-center gap-[50px]">
          <div className="textBox flex flex-col items-center justify-center text-[18px] text-[#80809A]">
            <p className="text-[34px] font-bold text-[#3A394F]">
              반려동물 정보를 불러오고 있어요
            </p>
            <p>소중한 우리 아이들을 소개해주세요</p>
          </div>
          <div className="imgBox">
            <img src="/assets/img/noPets.svg" alt="반려동물을 등록하세요" />
          </div>
        </div>
      </div>
    )
  }

  // 나이 계산 함수
  const getAge = () => {
    if (!selectedPet.birthdate) return null
    const age =
      new Date().getFullYear() - new Date(selectedPet.birthdate).getFullYear()
    return age
  }

  return (
    <div className="flex h-full w-full gap-10">
      {/* 왼쪽 */}
      <div className="flex w-3/7 flex-col gap-5">
        <h1 className="w-full text-[28px] font-bold">반려동물 프로필</h1>

        {/* 프로필 사진 부분 */}
        <section className="flex w-full items-center gap-8">
          <img
            src={selectedPet.profile_img ?? '/assets/img/default-profile.png'}
            alt={selectedPet.name}
            className="aspect-square w-30 rounded-full outline-10 outline-gray-100"
          />
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
              {selectedPet.species} | {selectedPet.species}
            </p>
          </div>
        </section>

        {/* 상세정보 */}
        <section className="flex flex-col">
          <h2 className="sr-only">상세 정보</h2>
          <div className="flex flex-col gap-4 text-gray-500">
            <h3 className="text-[18px] font-bold text-neutral-600">
              외모 및 특징
            </h3>
            <p>{selectedPet.bio}</p>
            <dl className="flex flex-col gap-4">
              <div className="flex justify-between">
                <dt>성별</dt>
                <dd className="font-bold text-neutral-600">
                  {selectedPet.gender}
                </dd>
              </div>
              <hr className="border-neutral-200" />
              <div className="flex justify-between">
                <dt>크기</dt>
                <dd className="font-bold text-neutral-600">
                  {selectedPet.size === 0 && '소형견'}
                  {selectedPet.size === 1 && '중형견'}
                  {selectedPet.size === 2 && '대형견'}
                </dd>
              </div>
              <hr className="border-neutral-200" />
              <div className="flex justify-between">
                <dt>체중</dt>
                <dd className="font-bold text-neutral-600">
                  {selectedPet.weight} kg
                </dd>
              </div>
            </dl>
            {/* 기념일 */}
            <h3 className="text-[18px] font-bold text-neutral-600">기념일</h3>
            <dl className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Cake className="h-[50px] w-[50px] rounded-[18px] bg-[#FFD8C0]/50 p-3 text-[#FF6000]" />
                <div className="flex flex-col">
                  <dt>생일</dt>
                  <dd className="font-bold text-neutral-600">
                    {selectedPet.birthdate}
                  </dd>
                </div>
                <p className="ml-auto font-bold text-neutral-600">
                  {getAge()} 살
                </p>
              </div>
              <hr className="border-neutral-200" />
              <div className="flex gap-4">
                <House className="h-[50px] w-[50px] rounded-[18px] bg-[#FFD8C0]/50 p-3 text-[#FF6000]" />
                <div className="flex flex-col">
                  <dt>입양일</dt>
                  <dd className="font-bold text-neutral-600">
                    {selectedPet.adoption_date}
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </section>
      </div>
      <div className="mx-2 w-px bg-neutral-200"></div>
      {/* 오른쪽 */}
      <div className="flex w-4/7 flex-col gap-5">
        <h2 className="sr-only">추가 정보</h2>
        <nav className="flex w-full gap-5">
          <h3 className="w-full">
            <Button
              variant="gray"
              id="health"
              onClick={() => setActiveTab('health')}
              className={
                activeTab === 'health' ? '!bg-[#524984] !text-white' : ''
              }
            >
              <p className="text-xl font-bold">건강 관리</p>
            </Button>
          </h3>
          <h3 className="w-full">
            <Button
              variant="gray"
              id="nutrition"
              onClick={() => setActiveTab('nutrition')}
              className={
                activeTab === 'nutrition' ? '!bg-[#524984] !text-white' : ''
              }
            >
              <p className="text-xl font-bold">영양 관리</p>
            </Button>
          </h3>
          <h3 className="w-full">
            <Button
              variant="gray"
              id="activity"
              onClick={() => setActiveTab('activity')}
              className={
                activeTab === 'activity' ? '!bg-[#524984] !text-white' : ''
              }
            >
              <p className="text-xl font-bold">활동 기록</p>
            </Button>
          </h3>
        </nav>
        {/* 탭 컨텐츠 */}
        <div className="h-full overflow-y-scroll">
          <AccordionBox activeTab={activeTab}></AccordionBox>
        </div>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'
import PetProfileSection from '@/components/pet-profile/PetProfileSection'
import { usePetStore } from '@/store/petStore'
import { tw } from '../../../utils/shared'

interface Props {
  initialTab: 'health' | 'nutrition' | 'activity' | null
}

export default function PetProfilePage({ initialTab = 'health' }: Props) {
  const { selectedPet } = usePetStore()
  const [activeTab, setActiveTab] = useState<Props['initialTab']>(null)

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

  return (
    <div className="flex h-full w-full gap-[30px]">
      {/* 왼쪽 */}
      <div className="relative flex w-4/10 min-w-90 flex-col gap-5">
        <h1 className="w-full text-[28px] font-bold">반려동물 프로필</h1>
        <PetProfileSection selectedPet={selectedPet} />
      </div>

      <div className="w-px bg-neutral-200"></div>
      {/* 오른쪽 */}
      <div className="flex grow flex-col gap-5">
        <h2 className="sr-only">추가 정보</h2>
        <nav className="flex h-12.5 w-full min-w-100 gap-5">
          <h3 className="w-full">
            <Link href={'/pet-profile/health'} id="health" className={tw()}>
              <p
                className={tw(
                  'flex h-full w-full items-center justify-center rounded-2xl bg-[#ECECF2] text-lg font-bold text-[#80809A]',
                  activeTab === 'health' ? 'bg-[#524984] text-white' : ''
                )}
              >
                건강 관리
              </p>
            </Link>
          </h3>
          <h3 className="w-full">
            <Link href={'/pet-profile/nutrition'} id="nutrition">
              <p
                className={tw(
                  'flex h-full w-full items-center justify-center rounded-2xl bg-[#ECECF2] text-lg font-bold text-[#80809A]',
                  activeTab === 'nutrition' ? 'bg-[#524984] text-white' : ''
                )}
              >
                건강 관리
              </p>
            </Link>
          </h3>
          <h3 className="w-full">
            <Link href={'/pet-profile/activity'} id="activity">
              <p
                className={tw(
                  'flex h-full w-full items-center justify-center rounded-2xl bg-[#ECECF2] text-lg font-bold text-[#80809A]',
                  activeTab === 'activity' ? 'bg-[#524984] text-white' : ''
                )}
              >
                건강 관리
              </p>
            </Link>
          </h3>
        </nav>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'
import PetProfileSection from '@/components/pet-profile/PetProfileSection'
import {
  EmptyPet,
  NotLogin,
  NotSelectedPet,
} from '@/components/ui/status/EmptyState'
import { LoadingPet } from '@/components/ui/status/Loading'
import { usePageStatus } from '@/hooks/usePageStatus'
import { usePetStore } from '@/store/petStore'
import { useUserStore } from '@/store/userStore'
import { tw } from '@/utils/shared'

interface Props {
  initialTab: 'health' | 'nutrition' | 'activity' | null
}

export default function PetProfilePage() {
  const { selectedPet, petList } = usePetStore()
  const { user } = useUserStore()
  const [activeTab] = useState<Props['initialTab']>(null)

  const { isLoading } = usePageStatus()
  if (isLoading) return <LoadingPet />
  if (!user) return <NotLogin />
  if (petList.length === 0) return <EmptyPet />
  if (!selectedPet) return <NotSelectedPet />

  return (
    <div className="flex h-full w-full gap-[30px]">
      {/* 왼쪽 */}
      <div className="relative flex w-4/10 min-w-90 flex-col gap-5">
        <h1 className="w-full text-[28px] font-bold">반려동물 프로필</h1>
        <PetProfileSection user={user} selectedPet={selectedPet} />
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
                건강 카드
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
                영양 관리
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
                활동 기록
              </p>
            </Link>
          </h3>
        </nav>
      </div>
    </div>
  )
}

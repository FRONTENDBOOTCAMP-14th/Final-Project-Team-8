'use client'

import Link from 'next/link'
import PetProfileCardCarousel from '@/components/pet-profile/petProfileCardCarousel'
import { NotLogin, EmptyPet } from '@/components/ui/status/EmptyState'
import { LoadingPet } from '@/components/ui/status/Loading'
import { usePetStore } from '@/store/petStore'
import { usePageStatus } from '../../../hooks/usePageStatus'

export default function DashboardPage() {
  const { petList } = usePetStore()

  const hasPets = petList.length > 0

  const { user, isLoading } = usePageStatus()
  if (isLoading) return <LoadingPet />
  if (!user) return <NotLogin />

  return (
    <>
      {hasPets ? (
        <div className="flex h-full w-full flex-col gap-5">
          <div className="textBox">
            <div className="flex w-fit items-center gap-2">
              <h1 className="text-[28px] font-bold whitespace-nowrap">
                등록된 반려동물 프로필
              </h1>
              <div className="flex aspect-square h-fit items-center rounded-[10px] bg-gray-200 px-2 py-1">
                <span className="sr-only">총</span>
                {petList.length}
                <span className="sr-only">마리</span>
              </div>
            </div>
            <p className="text-gray-500">
              우리 아이들의 모든 정보를 확인해 보세요
            </p>
          </div>
          <section className="h-5/10 w-full">
            <h2 className="sr-only">반려동물 카드 목록</h2>
            <PetProfileCardCarousel />
          </section>
          <section className="cards relative flex h-4/10 w-full flex-col gap-5">
            <h2 className="sr-only">반려동물 관리</h2>
            <Link
              href={'/pet-profile/health'}
              className="h-4/7 rounded-[18px] p-[30px] shadow-md outline-1 outline-gray-100"
            >
              <div className="flex h-full flex-row">
                <div className="flex w-full flex-col justify-center text-gray-500">
                  <span className="pb-2 text-[18px] font-bold text-gray-700">
                    건강카드
                  </span>
                  <p>병원 예약과 우리 아이의 모든 의료 기록을</p>
                  <p>한 곳에서 관리하세요</p>
                </div>
                <img
                  src="/assets/dashboard/health.svg"
                  alt=""
                  className="h-full"
                />
              </div>
            </Link>
            <div className="flex h-3/7 flex-row gap-5">
              <Link
                href={'/pet-profile/nutrition'}
                className="h-full w-full rounded-[18px] p-[30px] text-[18px] font-bold text-gray-700 shadow-md outline-1 outline-gray-100"
              >
                <div className="flex h-full items-center gap-[30px]">
                  <img
                    src="/assets/dashboard/diet.svg"
                    alt=""
                    className="h-full"
                  />
                  영양 관리
                </div>
              </Link>
              <Link
                href={'/pet-profile/activity'}
                className="w-full rounded-[18px] p-[30px] text-[18px] font-bold text-gray-700 shadow-md outline-1 outline-gray-100"
              >
                <div className="flex h-full items-center gap-[30px]">
                  <img
                    src="/assets/dashboard/activities.svg"
                    alt=""
                    className="h-full"
                  />
                  활동 기록
                </div>
              </Link>
            </div>
          </section>
        </div>
      ) : (
        <EmptyPet />
      )}
    </>
  )
}

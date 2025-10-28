'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { PropsWithChildren } from 'react'
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

export default function PetProfilePage({ children }: PropsWithChildren) {
  const currentPath = usePathname()
  const { selectedPet, petList } = usePetStore()
  const { user } = useUserStore()

  const { isLoading } = usePageStatus()
  if (isLoading) <LoadingPet />
  if (!user) return <NotLogin />
  if (petList.length === 0) return <EmptyPet />
  if (!selectedPet) return <NotSelectedPet />

  return (
    <>
      <div className="flex grow flex-col gap-5">
        <nav>
          <ul className="flex h-12.5 min-h-12.5 w-full min-w-100 gap-5">
            <li className="w-full">
              <Link
                href={'/pet-profile/health'}
                id="health"
                className={tw(
                  'flex h-full w-full items-center justify-center rounded-2xl bg-[#ECECF2] text-lg font-bold text-[#80809A]',
                  currentPath.endsWith('health')
                    ? 'bg-[#524984] text-white'
                    : ''
                )}
              >
                건강 카드
              </Link>
            </li>
            <li className="w-full">
              <Link
                href={'/pet-profile/nutrition'}
                id="nutrition"
                className={tw(
                  'flex h-full w-full items-center justify-center rounded-2xl bg-[#ECECF2] text-lg font-bold text-[#80809A]',
                  currentPath.endsWith('nutrition')
                    ? 'bg-[#524984] text-white'
                    : ''
                )}
              >
                영양 관리
              </Link>
            </li>
            <li className="w-full">
              <Link
                href={'/pet-profile/activity'}
                id="activity"
                className={tw(
                  'flex h-full w-full items-center justify-center rounded-2xl bg-[#ECECF2] text-lg font-bold text-[#80809A]',
                  currentPath.endsWith('activity')
                    ? 'bg-[#524984] text-white'
                    : ''
                )}
              >
                활동 기록
              </Link>
            </li>
          </ul>
        </nav>
        <div className="overflow-y-auto">{children}</div>
      </div>
    </>
  )
}

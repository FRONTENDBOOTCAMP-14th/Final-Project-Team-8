'use client'

import { CalendarDays, LayoutDashboard, PawPrint, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { UserProfileCard } from '@/components'
import PetProfileList from '@/components/ui/sidebar/PetProfileList'
import {
  PetProfileListSkeleton,
  UserProfileCardSkeleton,
} from '@/components/ui/skeleton/SidebarSkeleton'
import { usePetStore } from '@/store/petStore'
import { useUserStore } from '@/store/userStore'

// 사이드바 메뉴
interface MenuOption {
  name: string
  icon: ReactNode
  path: string
}

export default function Sidebar() {
  const currentPath = usePathname()
  const { user, setUser } = useUserStore()
  const { petList, selectedPetId, setSelectedPetId, fetchPetSummary } =
    usePetStore()
  const [isLoading, setIsLoading] = useState(true)

  // user를 useUserStore로 가져옴
  useEffect(() => {
    if (!user) setUser()
    setIsLoading(false)
  }, [user, setUser])

  useEffect(() => {
    if (!user) return

    fetchPetSummary(user)
  }, [user, fetchPetSummary])

  const menuoptions: MenuOption[] = [
    {
      name: '프로필',
      icon: <PawPrint size={20} aria-hidden="true" />,
      path: '/pet-profile',
    },
    {
      name: '대시보드',
      icon: <LayoutDashboard size={20} aria-hidden="true" />,

      path: '/dashboard',
    },
    {
      name: '캘린더',
      icon: <CalendarDays size={20} aria-hidden="true" />,

      path: '/calendar',
    },
    {
      name: '계정',
      icon: <User size={20} aria-hidden="true" />,
      path: '/user-account',
    },
  ]

  return (
    <aside className="flex max-h-screen max-w-[3090px] min-w-[300px] flex-col gap-[42px] bg-[#2D2A40] px-[30px] pb-10 text-gray-200 md:w-72">
      <Link
        href="/dashboard"
        className="flex flex-row justify-center border-b-[2px] border-[#636073]"
      >
        <img
          src="/assets/logo/Logo-Paw-Buddy.svg"
          alt="Paw Buddy 대시보드"
          className="p-auto my-6"
        />
      </Link>
      {/* 등록된 반려동물 프로필버튼, 반려동물 추가등록 버튼 */}
      <div className="custom-scrollbar flex grow flex-col gap-[42px] overflow-y-auto pr-1">
        <div className="flex flex-col justify-center gap-3">
          <p>나의 반려동물</p>
          {isLoading ? (
            <PetProfileListSkeleton />
          ) : (
            <div className="max-h-[200px]">
              <PetProfileList
                pets={petList}
                selectedId={selectedPetId}
                onSelect={setSelectedPetId}
              />
            </div>
          )}
        </div>
        <div className="border-[1.5px] border-b border-[#636073]"></div>
        {/* 메뉴 영역 */}
        <nav>
          <ul className="flex flex-col justify-start gap-3">
            {menuoptions.map(option => {
              const isActive = currentPath.startsWith(option.path)
              return (
                <li
                  key={option.name}
                  className={`rounded-lg p-3 ${isActive ? 'bg-[#FFD8C0] font-bold text-[#FF6000]' : 'hover:text-[#FFD8C0]'}`}
                >
                  <Link
                    href={option.path}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <div className={'flex flex-row items-center gap-3'}>
                      {option.icon}
                      {option.name}
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
      {/* 유저 프로필영역 */}
      <div className="mt-auto flex items-center justify-center">
        {' '}
        {isLoading ? (
          <UserProfileCardSkeleton />
        ) : (
          user && <UserProfileCard user={user} />
        )}
      </div>
    </aside>
  )
}

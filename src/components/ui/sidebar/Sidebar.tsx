'use client'

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
      name: '대시보드',
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.66634 3.8335H14.6663M12.1663 1.3335V6.3335M2.16634 1.3335H5.49967C5.95991 1.3335 6.33301 1.70659 6.33301 2.16683V5.50016C6.33301 5.9604 5.95991 6.3335 5.49967 6.3335H2.16634C1.7061 6.3335 1.33301 5.9604 1.33301 5.50016V2.16683C1.33301 1.70659 1.7061 1.3335 2.16634 1.3335ZM2.16634 9.66683H5.49967C5.95991 9.66683 6.33301 10.0399 6.33301 10.5002V13.8335C6.33301 14.2937 5.95991 14.6668 5.49967 14.6668H2.16634C1.7061 14.6668 1.33301 14.2937 1.33301 13.8335V10.5002C1.33301 10.0399 1.7061 9.66683 2.16634 9.66683ZM10.4997 9.66683H13.833C14.2932 9.66683 14.6663 10.0399 14.6663 10.5002V13.8335C14.6663 14.2937 14.2932 14.6668 13.833 14.6668H10.4997C10.0394 14.6668 9.66634 14.2937 9.66634 13.8335V10.5002C9.66634 10.0399 10.0394 9.66683 10.4997 9.66683Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      path: '/dashboard',
    },
    {
      name: '캘린더',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.333 2.5V5.83333M6.66634 2.5V5.83333M3.33301 9.16667H16.6663M8.33301 13.3333H11.6663M9.99967 11.6667V15M4.99967 4.16667H14.9997C15.9201 4.16667 16.6663 4.91286 16.6663 5.83333V15.8333C16.6663 16.7538 15.9201 17.5 14.9997 17.5H4.99967C4.0792 17.5 3.33301 16.7538 3.33301 15.8333V5.83333C3.33301 4.91286 4.0792 4.16667 4.99967 4.16667Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      path: '/calendar',
    },
    {
      name: '계정',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 17.5V15.8333C5 14.9493 5.35119 14.1014 5.97631 13.4763C6.60143 12.8512 7.44928 12.5 8.33333 12.5H11.6667C12.5507 12.5 13.3986 12.8512 14.0237 13.4763C14.6488 14.1014 15 14.9493 15 15.8333V17.5M13.3333 5.83333C13.3333 7.67428 11.8409 9.16667 10 9.16667C8.15905 9.16667 6.66667 7.67428 6.66667 5.83333C6.66667 3.99238 8.15905 2.5 10 2.5C11.8409 2.5 13.3333 3.99238 13.3333 5.83333Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      path: '/user-account',
    },
  ]

  return (
    <aside className="flex max-h-screen max-w-[280px] min-w-[280px] flex-col gap-[42px] bg-[#2D2A40] px-[30px] pb-10 text-gray-200 md:w-72">
      <Link
        href="/dashboard"
        className="flex flex-row justify-center border-b-[2px] border-[#636073]"
        aria-label="메인 페이지 이동"
      >
        <img
          src="/assets/logo/Logo-Paw-Buddy.svg"
          alt="Paw Buddy 로고"
          className="p-auto my-6"
        />
      </Link>
      {/* 등록된 반려동물 프로필버튼, 반려동물 추가등록 버튼 */}
      <div className="flex flex-col justify-center gap-3">
        <div>Your Pets</div>
        {isLoading ? (
          <PetProfileListSkeleton />
        ) : (
          <PetProfileList
            pets={petList}
            selectedId={selectedPetId}
            onSelect={setSelectedPetId}
          ></PetProfileList>
        )}
      </div>
      <div className="border-[1.5px] border-b border-[#636073]"></div>
      {/* 메뉴 영역 */}
      <nav className="flex flex-col justify-start gap-3">
        {menuoptions.map(option => {
          const isActive = currentPath === option.path
          return (
            <Link
              key={option.name}
              href={option.path}
              className={`rounded-lg p-3 ${isActive ? 'bg-[#FFD8C0] font-bold text-[#FF6000]' : 'hover:text-[#FFD8C0]'}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className={'flex flex-row items-center gap-3'}>
                {option.icon}
                {option.name}
              </div>
            </Link>
          )
        })}
      </nav>
      {/* 유저 프로필영역 */}
      <div className="mt-auto flex items-center justify-center">
        {isLoading ? (
          <UserProfileCardSkeleton />
        ) : (
          user && <UserProfileCard user={user} />
        )}
      </div>
    </aside>
  )
}

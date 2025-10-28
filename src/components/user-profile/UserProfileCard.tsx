'use client'

import type { User } from '@supabase/supabase-js'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import useUserDataQuery from '@/hooks/useUserDataQuery'
import { createClient } from '@/libs/supabase/client'
import { useCalendarStore } from '@/store/calendarStore'
import { useModal } from '@/store/modalStore'
import { usePetStore } from '@/store/petStore'
import { useProfileCreationStore } from '@/store/profileCreationStore'
import { useScheduleStore } from '@/store/scheduleStore'
import { useUserStore } from '@/store/userStore'

interface UserProfileCardProps {
  user: User
}

export default function UserProfileCard({ user }: UserProfileCardProps) {
  const router = useRouter()

  const { data: userData } = useUserDataQuery(user)

  // Zustand stores
  const { resetUser } = useUserStore()
  const { resetPets } = usePetStore()
  const { resetSchedules } = useScheduleStore()
  const { resetCalendar } = useCalendarStore()
  const { resetModal } = useModal()
  const { resetDraftPet } = useProfileCreationStore()

  // user테이블에서 이름 가져오기
  // 없으면 이메일 앞부분 사용
  const displayName = userData?.nickname ?? user.email?.split('@')[0] ?? 'User'

  // 프로필 이미지
  const avatarUrl = userData?.profile_img ?? user.user_metadata?.avatar_url

  // 이름의 첫 글자 가져오기 (기본 프로필에 들어감)
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  const handleLogout = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      toast.error('로그아웃 실패')
      return
    }

    // 모든 Zustand store 초기화
    resetUser()
    resetPets()
    resetSchedules()
    resetCalendar()
    resetModal()
    resetDraftPet()

    toast.success('로그아웃되었습니다')
    router.push('/')
  }

  return (
    <div className="flex w-full items-center justify-between rounded-2xl bg-gray-500 p-4">
      <Link
        href={'/user-account'}
        aria-label={`${displayName}님의 계정 설정 페이지 이동`}
        className="flex items-center gap-3"
      >
        {avatarUrl ? (
          <Image
            height={100}
            width={100}
            src={avatarUrl}
            alt=""
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6000] text-xl font-bold text-white">
            {getInitial(displayName)}
          </div>
        )}
        <div className="text-white">
          <p className="text-sm opacity-80" lang="en">
            Hello
          </p>
          <p className="text-lg font-semibold">{displayName}</p>
        </div>
      </Link>

      <button
        onClick={handleLogout}
        className="ml-6 rounded-lg p-2 text-white transition-colors hover:bg-gray-700"
        aria-label="로그아웃"
        title="로그아웃"
      >
        <LogOut size={20} />
      </button>
    </div>
  )
}

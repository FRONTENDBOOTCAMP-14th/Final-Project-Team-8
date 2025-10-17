'use client'

import type { User } from '@supabase/supabase-js'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getUserData } from '@/libs/api/user'
import { createClient } from '@/libs/supabase/client'

interface UserProfileCardProps {
  user: User
}

interface UserData {
  nickname?: string | null
  profile_img?: string | null
}

export default function UserProfileCard({ user }: UserProfileCardProps) {
  const router = useRouter()

  // user 테이블에서 유저정보 가져오기
  const [userData, setUserData] = useState<UserData | null>(null)
  useEffect(() => {
    const fetchUSerData = async () => {
      try {
        const data = await getUserData(user)
        setUserData(data)
      } catch (error) {
        toast.error('로딩 실패')
      }
    }
    fetchUSerData()
  }, [user])

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

    toast.success('로그아웃되었습니다')
    router.push('/login')
  }

  return (
    <div className="flex w-full items-center justify-between rounded-2xl bg-gray-500 p-4">
      <div className="flex items-center gap-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-xl font-bold text-white">
            {getInitial(displayName)}
          </div>
        )}
        <div className="text-white">
          <div className="text-sm opacity-80">Hello</div>
          <div className="text-lg font-semibold">{displayName}</div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="ml-6 rounded-lg p-2 text-white transition-colors hover:bg-gray-700"
        aria-label="로그아웃"
      >
        <LogOut size={20} />
      </button>
    </div>
  )
}

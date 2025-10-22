'use client'

import Button from '@/components/ui/button/Button'
import {
  UserDetailSection,
  UserProfileSection,
  UserSettings,
} from '@/components/user-profile'
import useUserData from '@/hooks/useUserData'
import { useUserStore } from '@/store/userStore'

export default function UserAccountPage() {
  const { user } = useUserStore()
  const { userData } = useUserData(user)

  if (!user) {
    return (
      <div className="relative mx-auto flex h-full w-full flex-col items-center justify-center gap-10">
        <div className="flex h-full flex-col items-center justify-center gap-[50px]">
          <div className="textBox flex flex-col items-center justify-center text-[18px] text-[#80809A]">
            <p className="text-[34px] font-bold text-[#3A394F]">
              유저 정보를 불러오고 있어요
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
    <div className="flex w-full flex-col gap-8">
      <h1 className="w-full text-[28px] font-bold">계정</h1>
      {/* 프로필 사진 부분 */}
      <UserProfileSection {...userData} />
      <div className="flex h-full w-full gap-10">
        {/* 왼쪽 */}
        <main className="relative flex h-full w-3/7 flex-col gap-5">
          {/* 상세정보 */}
          <h2 className="sr-only">상세 정보</h2>
          <UserDetailSection {...userData} />
          <Button variant="transparent" className="absolute bottom-0">
            계정 정보 수정하기
          </Button>
        </main>
        <div className="mx-2 w-px bg-neutral-200"></div>
        {/* 오른쪽 */}
        <main className="flex w-4/7 flex-col gap-5">
          <h2 className="text-xl text-[18px] font-bold">환경 설정</h2>
          <UserSettings />
        </main>
      </div>
    </div>
  )
}

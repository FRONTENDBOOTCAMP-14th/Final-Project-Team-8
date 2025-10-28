'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/ui/button/Button'
import { NotLogin } from '@/components/ui/status/EmptyState'
import {
  UserDetailSection,
  UserProfileSection,
  UserSettings,
} from '@/components/user-profile'
import UserDetailEditSection from '@/components/user-profile/edit-form/UserDetailEditSection'
import type { UserData } from '@/hooks/useUserData'
import useUserData from '@/hooks/useUserData'
import { useUserStore } from '@/store/userStore'

export default function UserAccountPage() {
  const { user } = useUserStore()
  const { userData } = useUserData(user)
  const [localUserData, setLocalUserData] = useState<Partial<UserData>>(
    userData ?? {}
  )
  const [IsEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    if (userData) {
      setLocalUserData(userData)
    }
  }, [userData])

  if (!user) {
    return (
      <div className="relative mx-auto flex h-full min-h-150 w-full flex-col items-center justify-center gap-10">
        <NotLogin />
      </div>
    )
  }

  function onCancel() {
    setIsEditMode(false)
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="w-full text-[28px] font-bold">계정</h1>
      {/* 프로필 사진 부분 */}
      <UserProfileSection {...userData} />
      <div className="flex h-full w-full gap-10">
        {/* 왼쪽 */}
        <div className="relative flex h-full w-3/7 flex-col gap-5">
          {/* 상세정보 */}
          <h2 className="sr-only">상세 정보</h2>
          {IsEditMode && userData ? (
            <UserDetailEditSection
              userId={userData.id}
              userData={localUserData}
              onCancel={onCancel}
              onSaveSuccess={(updatedData: Partial<UserData>) => {
                setLocalUserData(updatedData)
                onCancel()
              }}
            />
          ) : (
            <UserDetailSection {...localUserData} />
          )}
          {!IsEditMode && (
            <Button
              variant="white"
              onClick={() => {
                setIsEditMode(true)
              }}
              className="absolute bottom-0"
            >
              계정 정보 수정하기
            </Button>
          )}
        </div>
        <div className="mx-2 w-px bg-neutral-200"></div>
        {/* 오른쪽 */}
        <div className="flex w-4/7 flex-col gap-5">
          <h2 className="text-xl text-[18px] font-bold">환경 설정</h2>
          <UserSettings />
        </div>
      </div>
    </div>
  )
}

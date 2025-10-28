'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import Button from '@/components/ui/button/Button'
import { NotLogin } from '@/components/ui/status/EmptyState'
import { LoadingUser, Loading } from '@/components/ui/status/Loading'
import {
  UserDetailSection,
  UserProfileSection,
  UserSettings,
} from '@/components/user-profile'
import UserDetailEditSection from '@/components/user-profile/edit-form/UserDetailEditSection'
import { usePageStatus } from '@/hooks/usePageStatus'
import type { UserData } from '@/hooks/useUserDataQuery'
import useUserDataQuery from '@/hooks/useUserDataQuery'
import { useUserStore } from '@/store/userStore'

export default function UserAccountPage() {
  const { user } = useUserStore()

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useUserDataQuery(user)

  const [IsEditMode, setIsEditMode] = useState(false)

  const currentUserData = userData as UserData

  function onCancel() {
    setIsEditMode(false)
  }

  const { isLoading } = usePageStatus()

  if (isLoading) return <Loading />
  if (isUserLoading) return <LoadingUser />
  if (!user) return <NotLogin />

  if (userError) toast.info('사용자 정보를 불러오지 못했습니다.')

  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="w-full text-[28px] font-bold">계정</h1>
      {/* 프로필 사진 부분 */}
      <UserProfileSection {...userData} />
      <div className="flex h-full w-full gap-10">
        {/* 왼쪽 */}
        <section className="relative flex h-full w-3/7 flex-col gap-5">
          {/* 상세정보 */}
          <h2 className="sr-only">상세 정보</h2>
          {IsEditMode && userData ? (
            <UserDetailEditSection
              userId={userData.id}
              userData={currentUserData}
              onCancel={onCancel}
            />
          ) : (
            <UserDetailSection {...currentUserData} />
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
        </section>
        <div className="mx-2 w-px bg-neutral-200"></div>

        {/* 오른쪽 */}
        <div className="flex w-4/7 flex-col gap-5">
          <UserSettings />
        </div>
      </div>
    </div>
  )
}

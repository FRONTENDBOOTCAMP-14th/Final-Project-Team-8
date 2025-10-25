'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components'
import UserInfoEditForm from '@/components/ui/user-profile-edit/UserInfoEditForm'
import useUserData from '@/hooks/useUserData'
import { insertUserData } from '@/libs/api/user'
import type { Users } from '@/libs/supabase'
import { useUserStore } from '@/store/userStore'

export default function UserAccountEditPage() {
  const formRef = useRef(null)

  const router = useRouter()
  const { user } = useUserStore()
  const { userData } = useUserData(user)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: Users) => {
      if (!userData?.id) throw new Error('사용자의 ID가 없습니다.')
      await insertUserData(data, data.id)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        refetchType: 'active',
        queryKey: ['userTable', id],
      })
      toast.success('사용자 정보 변경이 완료되었습니다.')
      router.push('/user-account')
    },
    onError: (err: unknown) => {
      const message =
        err instanceof Error ? err.message : '업데이트 중 오류가 발생했습니다.'
      toast.error(message)
    },
  })

  const userDataSubmit = (data: Users) => {
    mutation.mutate({ ...userData, ...data })
  }

  if (!user || !userData) {
    return (
      <div className="relative mx-auto flex h-full w-full flex-col items-center justify-center gap-10">
        <div className="flex h-full animate-pulse flex-col items-center justify-center gap-[40px]">
          <div className="textBox flex items-center justify-center gap-2 rounded-2xl p-5 text-[18px] text-[#80809A]">
            <LoaderCircle className="animate-spin" size={35} />
            <p className="text-[34px] font-bold text-[#3A394F]">
              유저 정보를 불러오고 있어요
            </p>
          </div>
          <p className="rounded-2xl border-1 border-gray-300 p-3 text-base font-bold text-gray-400">
            잠시만 기다려 주세요
          </p>
        </div>
      </div>
    )
  }

  const { id } = userData

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="flex h-full w-full flex-col">
      {/* 헤더 */}
      <div className="flex flex-col">
        <h1 className="text-[28px] font-bold text-orange-500">
          계정 정보 수정
        </h1>
      </div>
      <div className="flex h-full gap-10">
        <UserInfoEditForm
          userData={userData}
          ref={formRef}
          userDataSubmit={userDataSubmit}
        />

        {/* 구분선 */}
        <div className="w-px bg-[#E8E8F0]"></div>

        {/* 오른쪽 컬럼 */}
        <div className="flex w-1/2 flex-col justify-between">
          {/* 비밀번호 변경 */}
          <div className="flex flex-col gap-5">
            <h2 className="text-[18px] font-bold text-[#3A394F]">
              비밀번호 변경
            </h2>

            {/* 현재 비밀번호 */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="current_password"
                className="text-sm font-medium text-[#3A394F]"
              >
                현재 비밀번호
              </label>
              <input
                type="password"
                id="current_password"
                name="current"
                // value={passwordData.current}
                // onChange={handlePasswordChange}
                className="rounded-lg border border-[#E0E0E8] bg-white px-4 py-2.5 text-sm text-[#3A394F] transition-colors placeholder:text-[#B8B8C8] focus:border-[#FF6B2C] focus:ring-1 focus:ring-[#FF6B2C] focus:outline-none"
                placeholder="현재 비밀번호"
              />
            </div>

            {/* 새 비밀번호 */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="new_password"
                className="text-sm font-medium text-[#3A394F]"
              >
                새 비밀번호
              </label>
              <input
                type="password"
                id="new_password"
                name="new"
                // onChange={handlePasswordChange}
                className="rounded-lg border border-[#E0E0E8] bg-white px-4 py-2.5 text-sm text-[#3A394F] transition-colors placeholder:text-[#B8B8C8] focus:border-[#FF6B2C] focus:ring-1 focus:ring-[#FF6B2C] focus:outline-none"
                placeholder="새 비밀번호"
              />
            </div>

            {/* 비밀번호 확인 */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirm_password"
                className="text-sm font-medium text-[#3A394F]"
              >
                비밀번호 확인
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm"
                // value={passwordData.confirm}
                // onChange={handlePasswordChange}
                className="rounded-lg border border-[#E0E0E8] bg-white px-4 py-2.5 text-sm text-[#3A394F] transition-colors placeholder:text-[#B8B8C8] focus:border-[#FF6B2C] focus:ring-1 focus:ring-[#FF6B2C] focus:outline-none"
                placeholder="비밀번호 확인"
              />
            </div>

            {/* 계정 삭제 */}
            <div className="rounded-lg border border-[#FFE5DC] bg-[#FFF5F1] p-5">
              <h3 className="mb-1 text-sm font-semibold text-[#D83A00]">
                계정 삭제
              </h3>
              <p className="mb-3 text-xs leading-relaxed text-[#FF6B2C]">
                계정 삭제 시 모든 데이터가 영구적으로 삭제됩니다.
              </p>
              <button
                type="button"
                className="rounded-lg border border-[#FFCDB8] bg-white px-4 py-2 text-sm font-medium text-[#D83A00] transition-colors hover:bg-[#FFF5F1]"
              >
                계정 삭제
              </button>
            </div>
          </div>

          {/* 하단 영역 */}
          <div className="flex flex-col gap-5">
            {/* 저장/취소 버튼 */}
            <div className="flex justify-center gap-3 border-t border-[#E8E8F0] pt-5">
              <Button
                type="button"
                variant="gray"
                onClick={handleCancel}
                // disabled={isSubmitting}
              >
                취소
              </Button>
              <Button
                variant="orange"
                onClick={() => {
                  formRef.current
                }}
              >
                {/* {isSubmitting ? '저장 중...' : '저장하기'} */}
                저장하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

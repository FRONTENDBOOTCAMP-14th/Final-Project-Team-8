import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Button from '@/components/ui/button/Button'
import { userKeys, type UserData } from '@/hooks/useUserDataQuery'
import { updateUserDetail } from '@/libs/api/user'

interface UserDetailEditFormProps {
  userData: Partial<UserData>
  onCancel: () => void
  userId: string
}

interface FormDataType {
  gender?: string
  birthday?: string | null
  nickname?: string
  phone?: string
  email?: string
}

export default function UserDetailEditSection({
  userId,
  userData,
  onCancel,
}: UserDetailEditFormProps) {
  const queryClient = useQueryClient()
  const { register, handleSubmit } = useForm<FormDataType>({
    defaultValues: {
      gender: userData.gender ?? '',
      birthday: userData.birthday ?? null,
      nickname: userData.nickname ?? '',
      phone: userData.phone ?? '',
      email: userData.email ?? '',
    },
    mode: 'onBlur',
  })

  const mutation = useMutation<void, Error, FormDataType>({
    mutationFn: data => {
      return updateUserDetail({ userData: data, userId })
    },

    // 성공시
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) })
      toast.success('계정 정보가 업데이트되었습니다')
      onCancel()
    },

    onError: (error: Error) => {
      toast.error(
        `'계정 정보 업데이트를 실패했습니다 :  ${error.message}, 다시 시도해주세요'`
      )
    },
  })

  const onSubmit = (data: FormDataType) => {
    const { email: _, ...updateData } = data
    mutation.mutate({
      ...(updateData as FormDataType),
      birthday: data.birthday && data.birthday !== '' ? data.birthday : null,
    })
  }

  const isSaving = mutation.isPending

  return (
    <section className="mt-5 flex h-full flex-col gap-4">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-[18px] font-bold text-neutral-600">
          사용자 정보 수정
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          개인 정보를 안전하게 관리하세요
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex grow flex-col justify-between gap-4"
      >
        {/* Form Container */}
        <div className="rounded-xl bg-white">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-5">
              {/* 성별 */}
              <div className="flex grow flex-col gap-2">
                <label
                  htmlFor="gender"
                  className="text-sm font-semibold text-neutral-700"
                >
                  성별
                </label>
                <select
                  id="gender"
                  {...register('gender')}
                  className="rounded-lg border border-gray-300 bg-white px-2 py-2.5 text-sm text-neutral-800 transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                >
                  <option value="">선택안함</option>
                  <option value="남성">남성</option>
                  <option value="여성">여성</option>
                </select>
              </div>

              {/* 생일 */}
              <div className="flex grow flex-col gap-2">
                <label
                  htmlFor="birthday"
                  className="text-sm font-semibold text-neutral-700"
                >
                  생일
                </label>
                <input
                  type="date"
                  id="birthday"
                  {...register('birthday')}
                  className="rounded-lg border border-gray-300 bg-white px-2 py-2.5 text-sm text-neutral-800 transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                />
              </div>
            </div>

            {/* 별명 */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="nickname"
                className="text-sm font-semibold text-neutral-700"
              >
                별명
              </label>
              <input
                type="text"
                id="nickname"
                {...register('nickname', { required: '별명은 필수입력입니다' })}
                placeholder="별명을 입력하세요"
                className="rounded-lg border border-gray-300 bg-white px-2 py-2.5 text-sm text-neutral-800 transition-all placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
              />
            </div>

            {/* 전화번호 */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="text-sm font-semibold text-neutral-700"
              >
                전화번호
              </label>
              <input
                type="tel"
                id="phone"
                {...register('phone')}
                placeholder="010-0000-0000"
                className="rounded-lg border border-gray-300 bg-white px-2 py-2.5 text-sm text-neutral-800 transition-all placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
              />
            </div>

            <div className="border-t border-gray-200" />

            {/* 이메일(변경불가) */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-neutral-700"
              >
                가입 이메일
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={userData.email}
                  disabled
                  className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-2 py-2.5 text-sm text-gray-500"
                />
                <span className="absolute top-1/2 right-3 -translate-y-1/2 rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                  변경불가
                </span>
              </div>
              <p className="text-xs text-gray-500">
                이메일은 계정 보안을 위해 변경할 수 없습니다
              </p>
            </div>
          </div>
        </div>

        {/* 취소버튼 / 저장버튼 */}
        <div className="sticky bottom-0 mt-auto flex gap-4 bg-white px-1 pt-4 pb-2">
          {/* 취소 */}
          <Button variant="white" onClick={onCancel}>
            취소
          </Button>
          {/* 저장 */}
          <Button variant="orange" type="submit" disabled={isSaving}>
            {isSaving ? '저장 중...' : '저장'}
          </Button>
        </div>
      </form>
    </section>
  )
}

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
  gender: string
  birthday: string
  nickname: string
  phone: string
  email: string
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
      birthday: userData.birthday ?? '',
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

    onError: () => {
      toast.error('계정 정보 업데이트를 실패했습니다, 다시 시도해주세요')
    },
  })

  const onSubmit = (data: FormDataType) => {
    const { email: _, ...updateData } = data
    mutation.mutate(updateData as FormDataType)
  }

  const isSaving = mutation.isPending

  return (
    <section className="flex flex-col gap-4 text-gray-500">
      <h3 className="text-[18px] font-bold text-neutral-600">
        사용자 정보 수정
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 whitespace-nowrap"
      >
        {/* 성별 */}
        <div className="flex gap-4">
          <label htmlFor="gender">성별</label>
          <select
            id="gender"
            {...register('gender')}
            className="font-bold text-neutral-600"
          >
            <option value="">선택안함</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        </div>
        <hr className="border-neutral-200" />
        {/* 생일 */}
        <div className="flex gap-4">
          <label htmlFor="birthday">생일</label>
          <input
            type="date"
            id="birthday"
            {...register('birthday')}
            className="font-bold text-neutral-600"
          />
        </div>
        <hr className="border-neutral-200" />
        {/* 이름 */}
        <div className="flex gap-4">
          <label htmlFor="nickname" className="">
            별명
          </label>
          <input
            type="text"
            id="nickname"
            {...register('nickname')}
            className="w-full font-bold text-neutral-600"
          />
        </div>
        <hr className="border-neutral-200" />
        {/* 전화번호 */}
        <div className="flex flex-col gap-1">
          <label htmlFor="phone">전화번호</label>
          <input
            type="text"
            id="phone"
            {...register('phone')}
            className="w-full font-bold text-neutral-600"
          />
        </div>
        <hr className="border-neutral-200" />
        {/* 이메일(변경불가) */}
        <div className="flex flex-col">
          <label htmlFor="email">가입 이메일</label>
          <input
            type="text"
            id="email"
            {...register('email')}
            disabled
            className="font-bold text-gray-500"
          />
        </div>
        {/* 취소버튼 / 저장버튼 */}
        <div className="absolute bottom-0 flex w-full flex-col gap-4">
          {/* 저장 */}
          <Button variant="orange" type="submit" disabled={isSaving}>
            {isSaving ? '저장 중...' : '저장'}
          </Button>
          {/* 취소 */}
          <Button variant="white" onClick={onCancel}>
            취소
          </Button>
        </div>
      </form>
    </section>
  )
}

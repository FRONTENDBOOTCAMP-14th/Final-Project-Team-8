import { useState } from 'react'
import Button from '@/components/ui/button/Button'
import type { UserData } from '@/hooks/useUserData'
import { updateUserDetail } from '@/libs/api/user'

interface UserDetailEditFormProps {
  userData: Partial<UserData>
  onCancel: () => void
  onSaveSuccess: (updatedData: Partial<UserData>) => void
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
  userData,
  userId,
  onCancel,
  onSaveSuccess,
}: UserDetailEditFormProps) {
  const [formData, setFormData] = useState<FormDataType>({
    gender: userData.gender ?? '',
    birthday: userData.birthday ?? '',
    nickname: userData.nickname ?? '',
    phone: userData.phone ?? '',
    email: userData.email ?? '',
  })

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  async function onSave() {
    await updateUserDetail({ userData: formData, userId })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const updatePayload: Partial<UserData> = {
      birthday: formData.birthday ?? null,
      gender: formData.gender ?? null,
      nickname: formData.nickname ?? null,
      phone: formData.phone ?? null,
      email: formData.email ?? null,
    }

    await onSave()
    onSaveSuccess(updatePayload)
  }

  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-4 text-gray-500">
        <h3 className="text-[18px] font-bold text-neutral-600">
          사용자 정보 수정
        </h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 whitespace-nowrap"
        >
          {/* 성별 */}
          <div className="flex gap-4">
            <label htmlFor="gender">성별</label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
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
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
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
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
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
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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
              name="email"
              value={userData.email}
              disabled
              className="font-bold text-gray-500"
            />
          </div>
          {/* 취소버튼 / 저장버튼 */}
          <div className="absolute bottom-0 flex w-full flex-col gap-4">
            {/* 저장 */}
            <Button variant="orange" type="submit">
              저장
            </Button>
            {/* 취소 */}
            <Button variant="white" onClick={onCancel}>
              취소
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

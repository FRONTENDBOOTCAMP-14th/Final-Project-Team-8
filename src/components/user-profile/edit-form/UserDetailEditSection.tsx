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
    <section className="mt-5 flex h-full flex-col">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <div className="mb-2">
          <h3 className="text-[18px] font-bold text-neutral-600">
            사용자 정보 수정
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            개인 정보를 안전하게 관리하세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm text-neutral-800 transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                  >
                    <option value="">선택안함</option>
                    <option value="남성">남성</option>
                    <option value="여성">여성</option>
                  </select>
                </div>

                {/* <div className="border-t border-gray-200" /> */}

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
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className="rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm text-neutral-800 transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                  />
                </div>
              </div>
              {/* <div className="border-t border-gray-200" /> */}

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
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  placeholder="별명을 입력하세요"
                  className="rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm text-neutral-800 transition-all placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                />
              </div>

              {/* <div className="border-t border-gray-200" /> */}

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
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  className="rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm text-neutral-800 transition-all placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
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
                    className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-2 py-2 text-sm text-gray-500"
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

          {/* 버튼 그룹 */}
          <div className="flex gap-3">
            <Button variant="white" onClick={onCancel} className="flex-1">
              취소
            </Button>
            <Button variant="orange" type="submit" className="flex-1">
              저장
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

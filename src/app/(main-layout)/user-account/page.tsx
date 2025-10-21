'use client'

import { SquarePen } from 'lucide-react'
import Image from 'next/image'
import Button from '@/components/ui/button/Button'
import ToggleButton from '@/components/ui/button/toggleButton'
import useUserData from '@/hooks/useUserData'
import { useUserStore } from '@/store/userStore'

export default function UserAccountPage() {
  const { user } = useUserStore()
  const { userData } = useUserData(user)

  // 나이 계산 함수
  const getAge = () => {
    if (!userData?.birthday)
      return <div className="text-gray-400">등록 안함</div>
    const age =
      new Date().getFullYear() - new Date(userData.birthday).getFullYear()
    return age
  }

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

      <section className="flex w-full items-center gap-8">
        {/* Main profile circle */}
        <div className="relative z-10">
          <div className="aspect-square w-30 overflow-hidden rounded-full bg-gray-100 outline-10 outline-gray-100">
            {userData?.profile_img ? (
              <Image
                src={userData.profile_img}
                alt="Pet profile preview"
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <svg
                  className="h-16 w-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Camera button */}
          <button
            type="button"
            className="absolute bottom-0 left-1/2 z-30 flex h-12 w-12 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-xl bg-white shadow-lg transition-colors hover:bg-gray-50"
          >
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4997 4.08771H10.508M1.33301 9.92101L4.66634 6.58767C5.04639 6.22197 5.4775 6.02944 5.91634 6.02944C6.35518 6.02944 6.78629 6.22197 7.16634 6.58767L11.333 10.7543M9.66634 9.08767L10.4997 8.25434C10.8797 7.88864 11.3108 7.69611 11.7497 7.69611C12.1885 7.69611 12.6196 7.88864 12.9997 8.25434L14.6663 9.92101M3.83301 0.754379H12.1663C13.5471 0.754379 14.6663 1.87367 14.6663 3.25438V11.5877C14.6663 12.9684 13.5471 14.0877 12.1663 14.0877H3.83301C2.4523 14.0877 1.33301 12.9684 1.33301 11.5877V3.25438C1.33301 1.87367 2.4523 0.754379 3.83301 0.754379Z"
                stroke="#FF6000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold">{userData?.nickname}</div>
            <Button
              variant="white"
              className="max-w-fit min-w-fit rounded-[19px] p-0.5"
            >
              <SquarePen className="w-[20px]" />
            </Button>
          </div>
        </div>
      </section>
      <div className="flex h-full w-full gap-10">
        {/* 왼쪽 */}
        <main className="relative flex h-full w-3/7 flex-col gap-5">
          {/* 상세정보 */}
          <section className="relative flex flex-col">
            <h2 className="sr-only">상세 정보</h2>
            <div className="flex flex-col gap-4 text-gray-500">
              <h3 className="text-[18px] font-bold text-neutral-600">
                사용자 정보
              </h3>
              <dl className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <dt>성별</dt>
                  <dd className="font-bold text-neutral-600">
                    {userData?.gender}
                  </dd>
                </div>
                <hr className="border-neutral-200" />
                <div className="flex justify-between">
                  <dt>나이</dt>
                  <dd className="font-bold text-neutral-600">{getAge()}</dd>
                </div>
                <hr className="border-neutral-200" />
                <div className="flex justify-between">
                  <dt>별명</dt>
                  <dd className="font-bold text-neutral-600">
                    {userData?.nickname}
                  </dd>
                </div>
                <hr className="border-neutral-200" />
                <div className="flex flex-col gap-1">
                  <dt>전화번호</dt>
                  <dd className="font-bold text-neutral-600">
                    {userData?.phone}
                  </dd>
                </div>
                <hr className="border-neutral-200" />
                <div className="flex-col justify-between">
                  <dt>가입 이메일</dt>
                  <dd className="font-bold text-neutral-600">
                    {userData?.email}
                  </dd>
                </div>
              </dl>
            </div>
          </section>
          <Button variant="transparent" className="absolute bottom-0">
            계정 정보 수정하기
          </Button>
        </main>
        <div className="mx-2 w-px bg-neutral-200"></div>
        {/* 오른쪽 */}
        <main className="flex w-4/7 flex-col gap-5">
          <h2 className="text-xl text-[18px] font-bold">환경 설정</h2>
          <section>
            <ToggleButton title="라이트모드" />
          </section>
          <h3 className="text-xl text-[18px] font-bold">알림 설정</h3>
          <section className="flex flex-col gap-4">
            <ToggleButton title="푸시 알림" />
            <ToggleButton title="이메일 알림" />
          </section>
        </main>
      </div>
    </div>
  )
}
